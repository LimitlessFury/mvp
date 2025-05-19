// src/app/page.jsx

// You can keep `import Image from "next/image";` if you plan to use it, 
// otherwise, it can be removed if not used in this simplified page.
// For now, I'll remove it to keep it focused on our components.

import ResumeGeneratorForm from '@/components/ResumeGeneratorForm'; // Import your component

export default function Home() { // Renamed to Home for convention, HomePage is also fine
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100"> {/* A light gray background */}
      
      <h1 className="text-4xl font-bold text-gray-800 my-10 text-center"> {/* Added margin top/bottom and centered */}
        AI Content Generators
      </h1>
      
      {/* Use the ResumeGeneratorForm component and pass the 'title' prop */}
      <ResumeGeneratorForm title="AI Resume Helper" /> 

      {/* We will add the EmailGeneratorForm here on Day 4 */}

    </main>
  );
}