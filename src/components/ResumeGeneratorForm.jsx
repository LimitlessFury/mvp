// src/components/ResumeGeneratorForm.jsx
import React, { useState } from 'react'; // CORRECTED IMPORT

const ResumeGeneratorForm = (props) => { 
  const [jobDesc, setJobDesc] = useState(''); // State for job description


  const handleSubmit = async (event) => { // Make it async
  event.preventDefault();
  console.log("Submitting Job Description:", jobDesc);

  try {
    const response = await fetch('/api/generate', { // Call your new API route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        inputType: 'resume', // To identify the type of request
        jobDescription: jobDesc 
      }),
    });

    const data = await response.json(); // Parse the JSON response from the backend

    if (!response.ok) { // Check if response status is 2xx
      throw new Error(data.error || `Backend Error: ${response.status}`);
    }

    console.log("====== Frontend Received from Backend: ======");
    console.log(data);
    // Later, you'll set this data to a state variable to display it
    console.log("==========================================");

  } catch (error) {
    console.error("====== Frontend Error during fetch: ======");
    console.error(error);
    // Later, you'll set an error state to display to the user
    console.error("=======================================");
  }
};


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