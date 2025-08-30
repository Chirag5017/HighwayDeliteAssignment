import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthCOntext';
import { Logo } from './Logo';
import { BackGround } from './BackGround';

export function OTPVerification() {
  const { verifyOTP, signUpData } = useAuth();
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp) {
      verifyOTP(otp);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-20">
        <div className="max-w-md w-full mx-auto md:mx-0">
          <Logo />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign up</h1>
            <p className="text-gray-500">Sign up to enjoy the feature of HD</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-500 mb-2">Your Name</label>
              <input
                type="text"
                value={signUpData.name || ''}
                disabled
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">Date of Birth</label>
              <input
                type="text"
                value={signUpData.dateOfBirth || ''}
                disabled
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">Email</label>
              <input
                type="email"
                value={signUpData.email || ''}
                disabled
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">OTP</label>
              <div className="relative">
                <input
                  type={showOtp ? "text" : "password"}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  placeholder="Enter OTP"
                />
                <button
                  type="button"
                  onClick={() => setShowOtp(!showOtp)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showOtp ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Sign up
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <BackGround />
    </div>
  );
}