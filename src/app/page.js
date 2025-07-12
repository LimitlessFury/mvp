// src/app/page.js (or .jsx)
"use client";
import React from 'react'; // React is implicitly available in Next.js App Router client components

// --- START OF DAY 17 MODIFICATION ---
import { useAuth } from '@/context/AuthContext'; // Import our custom hook
import { auth } from '@/lib/firebaseConfig'; // Import auth for the logout function
import { signOut } from 'firebase/auth';
// --- END OF DAY 17 MODIFICATION ---

import ResumeGeneratorForm from '@/components/ResumeGeneratorForm';
import EmailGeneratorForm from '@/components/EmailGeneratorForm'; 
import AuthForm from '@/components/AuthForm';

export default function Home() {
  // --- START OF DAY 17 MODIFICATION ---
  const { currentUser } = useAuth(); // Consume the context to get the user

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  // --- END OF DAY 17 MODIFICATION ---

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800 flex flex-col items-center p-4 sm:p-8 selection:bg-indigo-500 selection:text-white">
      
      {/* Header and Logout Button Container */}
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center mb-10 sm:mb-16">
        <div className="text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
            AI Content Generators
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            {currentUser ? `Welcome, ${currentUser.email}!` : "Leverage AI to craft compelling content."}
          </p>
        </div>
        {currentUser && (
          <button 
            onClick={handleLogout}
            className="px-4 py-2 font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow transition-colors"
          >
            Logout
          </button>
        )}
      </header>

      <main className="w-full max-w-6xl mx-auto">
        {/* --- START OF DAY 17 CONDITIONAL RENDERING --- */}
        {currentUser ? (
          // If user is logged in, show the generator forms
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ResumeGeneratorForm title="AI Resume Helper" />
            <EmailGeneratorForm title="AI Email Composer" />
          </div>
        ) : (
          // If user is not logged in, show the AuthForm
          <section className="w-full max-w-md mx-auto">
            <AuthForm title="Login or Sign Up to Continue" />
          </section>
        )}
        {/* --- END OF DAY 17 CONDITIONAL RENDERING --- */}
      </main>

      <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} LimitlessFury AI MVP. All rights reserved (not really, its a demo!).</p>
      </footer>
    </div>
  );
}