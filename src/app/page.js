// src/app/page.jsx

"use client";

// You can keep `import Image from "next/image";` if you plan to use it, 
// otherwise, it can be removed if not used in this simplified page.
// For now, I'll remove it to keep it focused on our components.

// In src/app/page.js
import { auth } from '@/lib/firebaseConfig';
import React, { useState } from 'react'; 
import ResumeGeneratorForm from '@/components/ResumeGeneratorForm'; // Import your component
import EmailGeneratorForm from '@/components/EmailGeneratorForm'; 
export default function Home() {
  console.log("Firebase Auth object on client:", auth); 
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 my-10 text-center">
        AI Content Generators
      </h1>
      
      {/* Container for the forms - helps with layout */}
      <div className="w-full flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0 items-start justify-center"> {/* Flex container */}
        <ResumeGeneratorForm title="AI Resume Helper" />
        <EmailGeneratorForm title="AI Email Composer" /> {/* USE NEW COMPONENT & PASS PROP */}
      </div>

    </main>
  );
}