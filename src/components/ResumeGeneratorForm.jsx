// src/components/ResumeGeneratorForm.jsx
import React from 'react';

// Accept `props` as an argument, or destructure to get `title` directly: const ResumeGeneratorForm = ({ title }) => {
const ResumeGeneratorForm = (props) => { 
  return (
    // Using a div as an outer container for the form, which can be styled
    <div className="w-full max-w-lg p-6 mx-auto bg-white rounded-xl shadow-xl"> 
      {/* Conditionally render the title if it's provided via props */}
      {props.title && ( 
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6"> {/* Added margin-bottom to title */}
          {props.title}
        </h2>
      )}
      <form className="space-y-6">
        <div>
          <label 
            htmlFor="jobDescription" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Job Description
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            rows={6}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400"
            placeholder="Paste the full job description here to get tailored resume bullet points..."
            // We will add value and onChange for state management on Day 4
          />
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            // We will add an onClick handler later
          >
            Generate Resume Points
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeGeneratorForm;