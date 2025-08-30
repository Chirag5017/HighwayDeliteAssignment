import { createContext, useContext, useState, type ReactNode} from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
  email: string;
  dateOfBirth: string;
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
  const navigate = useNavigate();

  const signUp = (userData: User) => {
    setSignUpData(userData);
    navigate('/otp');
  };

  const signIn = (email: string) => {
    // Simulate finding existing user
    const existingUser = {
      name: 'Jonas Khanwald',
      email: email,
      dateOfBirth: '11 December 1997'
    };
    setSignUpData(existingUser);
    navigate('/otp');
  };

  const verifyOTP = (otp: string) => {
    // Simulate OTP verification
    if (otp === '1234') {
      setUser(signUpData as User);
      navigate('/dashboard');
    } else {
      alert('Invalid OTP. Please try 1234');
    }
  };

  const logout = () => {
    setUser(null);
    setSignUpData({});
    navigate('/signup');
  };

  return (
    <AuthContext.Provider value={{
      user,
      signUpData,
      setSignUpData,
      signUp,
      signIn,
      verifyOTP,
      logout
    }}>
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