import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import { BackGround } from './BackGround';
import toast from 'react-hot-toast';

export function OTPVerification() {
  const { verifyOTP, signUpData, flag , sendOTP, isGetOtpLoading, setIsGetOtpLoading, isCheckSignLoading} = useAuth();
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp) {
      verifyOTP(otp);
    } else {
       toast.error("Please fill the OTP field")
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12 xl:px-16 py-12">
        <div className="max-w-md w-full mx-auto md:mx-0">
          <Logo />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{flag === "signup" ? "Sign up" : "Sign in"}</h1>
            <p className="text-gray-500">Sign up to enjoy the feature of HD</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            { flag === "signup" && <div>
              <label className="block text-sm text-gray-500 mb-2">Your Name</label>
              <input
                type="text"
                value={signUpData.name || ''}
                disabled
                className="w-full px-4 py-3 border border-blue-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-blue-50/30"
              />
            </div> }

           { flag === "signup" && <div>
              <label className="block text-sm text-gray-500 mb-2">Date of Birth</label>
              <input
                type="text"
                value={signUpData.dateOfBirth || ''}
                disabled
                className="w-full px-4 py-3 border border-blue-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-blue-50/30"
              />
            </div> }

            <div>
              <label className="block text-sm text-gray-500 mb-2">Email</label>
              <input
                type="email"
                value={signUpData.email || ''}
                disabled
                className="w-full px-4 py-3 border border-blue-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-blue-50/30"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">OTP</label>
              <div className="relative">
                <input
                  type={showOtp ? "text" : "password"}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-blue-50/30"
                  placeholder="Enter OTP"
                />
                <button
                  type="button"
                  onClick={() => setShowOtp(!showOtp)}
                  className="absolute right-3 top-3.5 text-gray-400 cursor-pointer hover:text-gray-600"
                >
                  {showOtp ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            {
              flag === 'signin' && (
                <button
                disabled={isGetOtpLoading}
                onClick={() => {
                  setIsGetOtpLoading(true);
                  sendOTP(signUpData.email, "user/sign-in/send-otp")
                }}
                className="text-blue-500 text-sm cursor-pointer underline"
                >
                {isGetOtpLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-blue" />
                ) : (
                  "Resend OTP"
                  )}
              </button>
            )}
            <button
              type="submit"
              disabled={isGetOtpLoading}
              className="w-full bg-blue-500 text-white py-3 px-4 cursor-pointer rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              {
                isCheckSignLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-blue" />
                ) : (
                  flag === "signup" ? "Sign up" : "Sign in"
                )
              }
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            {flag === 'signup' ? " Already have an account?" : "Dont't have account?"}{' '}

           { 
           flag === "signup" ?
            (<Link to="/signin" className="text-blue-500 hover:underline">
              Sign in
            </Link>) :
              (<Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>)
            }
          </p>
        </div>
      </div>

     <div className="hidden lg:flex items-center justify-center p-8 lg:w-1/2">
             <BackGround />
           </div>
    </div>
  );
}