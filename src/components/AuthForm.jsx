// src/components/AuthForm.jsx
import React, { useState } from 'react';
// Import Firebase auth functions
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '@/lib/firebaseConfig'; // Import the initialized Firebase app

const AuthForm = ({ title }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // --- START OF DAY 15 NEW CODE ---
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // --- END OF DAY 15 NEW CODE ---

  // Get the auth instance from our initialized app
  const auth = getAuth(app);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');
    console.log('Attempting Sign Up with:', { email, password });

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Signed up
      const user = userCredential.user;
      console.log("Successfully signed up:", user);
      // You could redirect or show a success message here
      // alert(`Welcome, ${user.email}!`);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Sign Up Error:", errorCode, errorMessage);
      setAuthError(errorMessage); // Display the error to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');
    console.log('Attempting Login with:', { email, password });

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Signed in
      const user = userCredential.user;
      console.log("Successfully logged in:", user);
      // You could redirect or show a success message here
      // alert(`Welcome back, ${user.email}!`);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Login Error:", errorCode, errorMessage);
      setAuthError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Not using handleReset for auth form for now, so removed it for simplicity

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 sm:p-8 transform transition-all hover:scale-[1.01] duration-300 ease-out">
      {title && <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-6 sm:mb-8">{title}</h2>}
      
      {/* --- DAY 15 MODIFICATION: Make this a real form --- */}
      {/* We can use one onSubmit and check which button was intended, but separate onClick is simpler for now */}
      <div className="space-y-6"> 
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
          <input
            type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400 dark:placeholder-gray-500 text-black dark:text-white bg-white dark:bg-slate-700 transition-colors duration-150"
            placeholder="you@example.com"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="password"className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input
            type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400 dark:placeholder-gray-500 text-black dark:text-white bg-white dark:bg-slate-700 transition-colors duration-150"
            placeholder="••••••••"
            disabled={isLoading}
          />
        </div>
        
        {/* Auth Error Display */}
        {authError && (
          <p className="text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 p-3 rounded-lg text-center">
            {authError}
          </p>
        )}

        <div className="flex flex-col space-y-3 pt-2">
          <button
            type="button" onClick={handleSignUp} disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-5 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-150 ease-in-out transform hover:scale-105 active:scale-95"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
          <button
            type="button" onClick={handleLogin} disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-5 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-all duration-150 ease-in-out transform hover:scale-105 active:scale-95"
          >
             {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;