// src/components/AuthForm.jsx
import React, { useState } from 'react';

const AuthForm = ({ title }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sign Up attempt with:', { email, password });
    // Actual Firebase signup logic will be on Day 15
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    // Actual Firebase login logic will be on Day 15
  };

  return (
    <div className="w-full max-w-md p-6 mx-auto bg-white rounded-xl shadow-xl">
      {title && <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">{title}</h2>}
      <form className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400 text-black"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password"className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400 text-black"
            placeholder="••••••••"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="button" // Important: type="button" if not submitting the outer form directly
            onClick={handleSignUp}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
          <button
            type="button" // Important: type="button"
            onClick={handleLogin}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default AuthForm;