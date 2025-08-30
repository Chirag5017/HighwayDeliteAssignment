import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import { BackGround } from './BackGround';

export function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      signIn(email);
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
              <label className="block text-sm text-black mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
                placeholder="jonas_kahnwald@gmail.com"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-500">
                Keep me signed in
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 cursor-pointer rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Continue
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