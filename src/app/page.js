// src/app/page.jsx (or page.js)

import Image from "next/image"; // Keep this if you want, or remove if not using Next/Vercel logos for now
import ResumeGeneratorForm from '@/components/ResumeGeneratorForm'; // YOUR IMPORT

export default function Home() {
  return (
    // You can keep the outer div if you like its styling, or simplify it
    // For simplicity, let's use the <main> tag directly from the Next.js App Router examples
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100"> {/* Adjusted padding and background for clarity */}
      
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        AI Content Generators
      </h1>
      
      <ResumeGeneratorForm /> {/*  USE YOUR COMPONENT HERE  */}

      {/* All the previous default Next.js content with logos and links has been removed for now to focus on your component. 
          You can add back footers or other elements later if you wish. 
      */}
    </main>
  );
}