import React, { useState } from 'react';
import { Calendar, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import { BackGround } from './BackGround';
import toast from 'react-hot-toast';

export function SignUp() {
  const { signUp, isGetOtpLoading, setIsGetOtpLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response : boolean | undefined;
    if (formData.name && formData.dateOfBirth && formData.email) {
      setIsGetOtpLoading(true);
      response = await signUp(formData);
    } else {
      toast.error("Please fill all the fields")
    }
    if(response === false) {
      setIsGetOtpLoading(false);
       setFormData({
        name: '',
        dateOfBirth: '',
        email: ''
    })
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12 xl:px-16 py-12">
        <div className="max-w-md w-full mx-auto md:mx-0">
         <Logo />

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign up</h1>
            <p className="text-gray-500">Sign up to enjoy the feature of HD</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs text-gray-500 mb-2 font-medium">Your Name</label>
              <input
                type="text"
                value={formData.name}
                placeholder="Jonas Khanwald"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-blue-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-blue-50/30"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-2 font-medium">Date of Birth</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder='11 December 1997'
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-blue-50/30"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-2 font-medium">Email</label>
              <input
                type="email"
                placeholder='jonas_kahnwald@gmail.com'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-blue-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-blue-50/30"
              />
            </div>
             <button
              type="submit"
              disabled={isGetOtpLoading}
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-3 px-4 cursor-pointer rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              {isGetOtpLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : (
               "Get OTP"
               )}
            </button>
          </div>

          <div className="text-center mt-8">
            <span className="text-gray-500 text-sm">Already have an account? </span>
              <Link to="/signin" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center p-8 lg:w-1/2">
        <BackGround />
      </div>
    </div>
  );
}