// src/components/ResumeGeneratorForm.jsx

import React from 'react';

const ResumeGeneratorForm = () => {
  return (
    <div className="w-full max-w-lg p-6 mx-auto bg-white rounded-xl shadow-md"> {/* Outer container with some styling */}
      <form className="space-y-6"> {/* Increased spacing between form elements */}
        <div>
          <label 
            htmlFor="jobDescription" 
            className="block text-sm font-medium text-gray-700 mb-1" // Added margin-bottom
          >
            Job Description
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            rows={6} // Slightly more rows for better UX
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400"
            placeholder="Paste the full job description here to get tailored resume bullet points..."
          />
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out" // Added transition
          >
            Generate Resume Points
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeGeneratorForm;