import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Backend_Url = import.meta.env.VITE_BACKEND_URL;

// send cookies on every request + set base URL once
axios.defaults.withCredentials = true;
axios.defaults.baseURL = Backend_Url;

interface User {
  name: string;
  email?: string;
  dateOfBirth?: string;
  checked?: boolean;
}

interface AuthContextType {
  user: User | null;
  signUpData: Partial<User>;
  setSignUpData: (data: Partial<User>) => void;
  signUp: (userData: User) => Promise<boolean>;
  signIn: (email: string, checked: boolean) => Promise<boolean>;
  verifyOTP: (otp: string) => void;
  logout: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  flag: string;
  isGetOtpLoading: boolean;
  setIsGetOtpLoading: (loading: boolean) => void;
  sendOTP: (email: string | undefined, url: string) => Promise<boolean>;
  isCheckSignLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [signUpData, setSignUpData] = useState<Partial<User>>({});
  const [OTP, setOTP] = useState("");
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(true);
  const [isGetOtpLoading, setIsGetOtpLoading] = useState(false);
  const [isCheckSignLoading, setIsCheckSignLoading] = useState(false);

  const navigate = useNavigate();

  // 1) Only set user based on cookie; DON'T navigate here
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await axios.get("/user/me");
        if (!cancelled && res.data?.success) {
          setUser(res.data.user);
        } else if (!cancelled) {
          setUser(null);
        }
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const signUp = async (userData: User): Promise<boolean> => {
    setSignUpData(userData);
    setFlag("signup");
    const ok = await sendOTP(userData.email, "user/sign-up/send-otp");
    if (!ok) return false;
    navigate("/otp");
    return true;
  };

  const signIn = async (email: string, checked: boolean): Promise<boolean> => {
    setSignUpData({ email, checked });
    setFlag("signin");
    const ok = await sendOTP(email, "user/sign-in/send-otp");
    if (!ok) return false;
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
      const { data } = await axios.post(`/${URL}`, { email, otp });
      if (data.success) {
        toast.success(data.message);
        setIsGetOtpLoading(false);
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Server error");
      return false;
    }
  };

  const verifyOTP = async (otp: string) => {
    if (otp !== OTP) {
      toast.error("Invalid OTP. Please try again.");
      navigate(`/${flag}`);
      return;
    }

    // 2) DO NOT optimistically set user before server cookie
    const URL = flag === "signin" ? "user/sign-in" : "user/sign-up";
    setIsCheckSignLoading(true)
    try {
      const { data } = await axios.post(`/${URL}`, {
        email: signUpData.email,
        dob: signUpData.dateOfBirth,
        name: signUpData.name,
        checked: signUpData.checked,
      });

      if (data.success) {
        // Ensure cookie is recognized, then hydrate user from /me
        const me = await axios.get("/user/me");
        if (me.data?.success) setUser(me.data.user);
        toast.success(data.message);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
        navigate(`/${flag}`);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Server error");
      navigate(`/${flag}`);
    } finally {
      setIsCheckSignLoading(false);
    }
  };

  const logout = async () => {
    await axios.post("/user/logout", {});
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
        sendOTP,
        isCheckSignLoading
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
