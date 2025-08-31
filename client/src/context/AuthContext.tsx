import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Backend_Url = import.meta.env.VITE_BACKEND_URL;

interface User {
  name: string,
  email?: string,
  dateOfBirth?: string,
  checked?: boolean,
}

interface AuthContextType {
  user: User | null,
  signUpData: Partial<User>;
  setSignUpData: (data: Partial<User>) => void,
  signUp: (userData: User) => Promise<boolean> ,
  signIn: (email: string, checked: boolean) => Promise<boolean> ,
  verifyOTP: (otp: string) => void,
  logout: () => void,
  loading: boolean,
  setLoading: (loading: boolean) => void,
  flag: string,
  isGetOtpLoading: boolean,
  setIsGetOtpLoading : (loading: boolean) => void,
  sendOTP: (email: string | undefined, url: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [signUpData, setSignUpData] = useState<Partial<User>>({});
  const [OTP, setOTP] = useState("");
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(true);
  const [isGetOtpLoading, setIsGetOtpLoading] = useState(false);


  const navigate = useNavigate();

useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await axios.get(`${Backend_Url}/user/me`, { withCredentials: true });
      if (res.data.success) {
        setUser(res.data.user);
        navigate("/dashboard");
      } else {
        navigate(`/${flag}`);
      }
    } catch {
      navigate(`/${flag}`);
    } finally {
      setLoading(false);
    }
  };
  checkAuth();
}, []);


  const signUp = async (userData: User) : Promise<boolean> => {
    setSignUpData(userData);
    setFlag("signup");
    const response = await sendOTP(userData.email, "user/sign-up/send-otp");
    if (!response) return false;
    navigate("/otp");
    return true;
  };

  const signIn = async (email: string, checked: boolean) : Promise<boolean> => {
    setSignUpData({ email, checked });
    setFlag("signin");
    const response = await sendOTP(email, "user/sign-in/send-otp");
    if (!response) return false;
    navigate("/otp");
    return true;
  };

  const sendOTP = async (email: string | undefined, URL: string): Promise<boolean> => {
    if (!email) {
      toast.error("Email is missing");
      return false;
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setOTP(otp);

    try {
      const result = await axios.post(
        `${Backend_Url}/${URL}`,
        { email, otp },
        { withCredentials: true }
      );

      const response = result.data;
      if (response.success) {
        toast.success(response.message);
        setIsGetOtpLoading(false);
         return true;
        } else {
          toast.error(response.message);
          return false;
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Server error");
      return false;
    }
  };

  const verifyOTP = async (otp: string) => {
    if (otp === OTP) {
      setUser(signUpData as User);
      const URL = flag === "signin" ? "user/sign-in" : "user/sign-up";

      try {
        const result = await axios.post(
          `${Backend_Url}/${URL}`,
          {
            email: signUpData.email,
            dob: signUpData.dateOfBirth,
            name: signUpData.name,
            checked: signUpData.checked
          },
          { withCredentials: true }
        );

        const response = result.data;
        if (response.success) {
          toast.success(response.message);
          setUser(response.user);
          navigate("/dashboard");
        } else {
          toast.error(response.message);
          navigate(`/${flag}`);
        }
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Server error");
        navigate(`/${flag}`);
      }
    } else {
      toast.error("Invalid OTP. Please try again.");
      navigate(`/${flag}`);
    }
  };

  const logout = async () => {
    await axios.post(`${Backend_Url}/user/logout`, {}, { withCredentials: true });
    setUser(null);
    setSignUpData({});
    navigate("/signin");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUpData,
        setSignUpData,
        signUp,
        signIn,
        verifyOTP,
        logout,
        loading,
        setLoading,
        flag,
        isGetOtpLoading,
        setIsGetOtpLoading,
        sendOTP
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
