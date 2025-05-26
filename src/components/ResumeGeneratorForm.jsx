// src/components/ResumeGeneratorForm.jsx
import React, { useState } from 'react'; // CORRECTED IMPORT

const ResumeGeneratorForm = (props) => { 
  const [jobDesc, setJobDesc] = useState(''); // State for job description


  const handleSubmit = (event) => {
    event.preventDefault(); // This is the MAGIC LINE! It stops the default browser form submission (page refresh).
    console.log("Resume Form Submitted!");
    console.log("Current Job Description State:", jobDesc); 
    // In later days, we will add API call logic here.
  };
  // ---- END OF NEW CODE TO ADD ----


  return (
    <div className="w-full max-w-lg p-6 mx-auto bg-white rounded-xl shadow-xl"> 
      {props.title && ( 
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          {props.title}
        </h2>
      )}
        <form className="space-y-6" onSubmit={handleSubmit}> 
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400 text-black" // FULL CLASSES
            placeholder="Paste the full job description here to get tailored resume bullet points..." // FULL PLACEHOLDER
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out" // FULL CLASSES
          >
            Generate Resume Points
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeGeneratorForm;