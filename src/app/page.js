// src/app/page.js (or .jsx)
"use client";
import React from 'react'; // Removed useState as it's not used directly in this page component anymore for form toggling

import ResumeGeneratorForm from '@/components/ResumeGeneratorForm';
import EmailGeneratorForm from '@/components/EmailGeneratorForm'; 
import AuthForm from '@/components/AuthForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800 flex flex-col items-center justify-center p-4 sm:p-8 selection:bg-indigo-500 selection:text-white">
      <header className="mb-10 sm:mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
          AI Content Generators
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Leverage AI to craft compelling resume points, professional emails, and more.
        </p>
      </header>

      {/* Main content area for generators */}
      <main className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <ResumeGeneratorForm title="AI Resume Helper" />
          <EmailGeneratorForm title="AI Email Composer" />
        </div>

        {/* Auth Form Section - can be styled further or conditionally rendered */}
        <section className="w-full max-w-md mx-auto">
          <AuthForm title="User Account" />
        </section>
      </main>

      <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} LimitlessFury AI MVP. All rights reserved (not really, its a demo!).</p>
      </footer>
    </div>
  );
}