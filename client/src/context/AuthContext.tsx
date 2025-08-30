import { createContext, useContext, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const Backend_Url = import.meta.env.VITE_BACKEND_URL;

interface User {
  name: string;
  email?: string;
  dateOfBirth?: string;
}

interface AuthContextType {
  user: User | null;
  signUpData: Partial<User>;
  setSignUpData: (data: Partial<User>) => void;
  signUp: (userData: User) => void;
  signIn: (email: string) => void;
  verifyOTP: (otp: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [signUpData, setSignUpData] = useState<Partial<User>>({});
  const [OTP, setOTP] = useState("");
  const [flag, setFlag] = useState("");

  const navigate = useNavigate();

  const signUp = async (userData: User) => {
    setSignUpData(userData);
    setFlag("signup")
    const response = await sendOTP(userData.email, "user/sign-up/send-otp");
    if(!response) return;
    navigate('/otp');
  };

  const signIn = async (email: string) => {
    setSignUpData({ email });
    setFlag("signin")
    const response = await sendOTP(email, "user/sign-in/send-otp"); 
    if(!response) return;
    navigate('/otp');
  };

  const sendOTP = async (email: string | undefined, URL : string) : Promise<boolean> => {
    if (!email) {
      console.error("Email is missing for OTP sending");
      return false;
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setOTP(otp);

    try {
      const result = await axios.post(`${Backend_Url}/${URL}`, {
        email: email,
        otp: otp,
      });

      const response = result.data;
      if (response.success) {
        console.log("OTP sent to:", email);
        toast.success(response.message)
        return true;
      } else {
        console.log("Error in OTP sending");
        toast.error(response.message)
        return false;
      }
    } catch (err : any) {
      console.error("Error while sending OTP:", err);
      toast.error(err.response.data.message)
      return false;
    }
  };

  const verifyOTP = async (otp: string) => {
    if (otp === OTP) {
      setUser(signUpData as User);
      const URL = flag === "signin" ? "user/sign-in" : "user/sign-up";
      const result = await axios.post(`${Backend_Url}/${URL}`, {
        email : signUpData.email,
        dob: signUpData.dateOfBirth,
        name:signUpData.name
      });

      const response = await result.data;
       if (response.success) {
        toast.success(response.message)
        navigate('/dashboard');
      } else {
        toast.error(response.message)
        navigate(`/${flag}`);
      }

    } else {
      toast.error('Invalid OTP. Please try again.');
      navigate(`/${flag}`);
    }
  };

  const logout = () => {
    setUser(null);
    setSignUpData({});
    navigate('/signup');
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
