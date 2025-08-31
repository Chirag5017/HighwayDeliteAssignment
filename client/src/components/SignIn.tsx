import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import { BackGround } from './BackGround';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export function SignIn() {
  const { signIn, isGetOtpLoading, setIsGetOtpLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== "") {
       setIsGetOtpLoading(true);
      const response = await signIn(email, checked);
      if(!response) setEmail("");
    } else {
      toast.error("Email is missing");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12 xl:px-16 py-12">
        <div className="max-w-md w-full mx-auto md:mx-0">
          <Logo />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
            <p className="text-gray-500">Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs text-gray-500 mb-2 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-blue-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-blue-50/30"
                placeholder="jonas_kahnwald@gmail.com"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                onChange={(e) => setChecked(e.target.checked)}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-gray-500 block text-xs font-medium">
                Keep me signed in
              </label>
            </div>

            <button
              type="submit"
              disabled={isGetOtpLoading}
              className="w-full bg-blue-500 text-white py-3 px-4 cursor-pointer rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              {isGetOtpLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : (
               "Get OTP"
               )}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

     <div className="hidden lg:flex items-center justify-center p-8 lg:w-1/2">
                  <BackGround />
                </div>
    </div>
  );
}