import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import { BackGround } from './BackGround';

export function SignUp() {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.dateOfBirth && formData.email) {
      signUp(formData);
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
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Jonas Khanwald"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">Date of Birth</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="11 December 1997"
                />
                <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-blue-500 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
                placeholder="jonas_kahnwald@gmail.com"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Get OTP
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