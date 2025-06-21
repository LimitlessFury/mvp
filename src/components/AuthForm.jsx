// src/components/AuthForm.jsx
import React, { useState } from 'react';

const AuthForm = ({ title }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // We'll add error/loading state here on Day 15

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sign Up attempt with:', { email, password });
    // Actual Firebase signup logic will be on Day 15
    // For now, maybe set a temporary message or clear fields
    // alert("Sign up functionality coming soon!");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    // Actual Firebase login logic will be on Day 15
    // alert("Login functionality coming soon!");
  };

  const handleReset = () => {
    setEmail('');
    setPassword('');
  }

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 sm:p-8 transform transition-all hover:scale-[1.01] duration-300 ease-out">
      {title && <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-6 sm:mb-8">{title}</h2>}
      <form className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400 dark:placeholder-gray-500 text-black dark:text-white bg-white dark:bg-slate-700 transition-colors duration-150"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400 dark:placeholder-gray-500 text-black dark:text-white bg-white dark:bg-slate-700 transition-colors duration-150"
            placeholder="••••••••"
          />
        </div>
        {/* For Day 15, we will add an auth error display here */}
        <div className="flex flex-col space-y-3 pt-2"> {/* Changed to flex-col for stacked buttons initially */}
          <button
            type="button"
            onClick={handleSignUp}
            className="w-full flex justify-center items-center py-3 px-5 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full flex justify-center items-center py-3 px-5 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Login
          </button>
           <button 
            type="button"
            onClick={handleReset}
            className="w-full flex justify-center py-3 px-5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
          >
            Clear Fields
          </button>
        </div>
      </form>
    </div>
  );
};
export default AuthForm;