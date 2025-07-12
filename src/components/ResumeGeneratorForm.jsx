// src/components/ResumeGeneratorForm.jsx
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook

const ResumeGeneratorForm = (props) => { 
  const [jobDesc, setJobDesc] = useState('');
  const [resumeResult, setResumeResult] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false); // State for save feedback

  const { currentUser } = useAuth(); // Get the current logged-in user

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setResumeResult('');
    setError('');
    setSaveSuccess(false); // Reset save success message on new generation

    if (!jobDesc.trim()) {
      setError("Please enter a job description.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputType: 'resume', jobDescription: jobDesc }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Backend Error: ${response.status} ${response.statusText}`);
      }
      if (data.generatedText) {
        setResumeResult(data.generatedText);
      } else {
        setError("Received a response, but no generated text was found.");
      }
    } catch (err) {
      console.error("Frontend Error during fetch or processing:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentUser) {
      setError("You must be logged in to save a generation.");
      return;
    }
    if (!resumeResult) {
      setError("There is no result to save. Please generate some points first.");
      return;
    }

    console.log("Saving generation for user:", currentUser.uid);
    setSaveSuccess(false); // Reset for new save attempt
    setError(''); // Clear previous errors

    try {
      const response = await fetch('/api/saveGeneration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.uid,
          type: 'resume',
          inputData: { jobDescription: jobDesc },
          generatedText: resumeResult
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to save generation.");
      }

      console.log("Save successful:", data);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000); // Hide success message after 3 seconds

    } catch (err) {
      console.error("Error saving generation:", err);
      setError(err.message);
    }
  };

  const handleReset = () => {
    setJobDesc('');
    setResumeResult('');
    setError('');
    setIsLoading(false);
    setSaveSuccess(false);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 sm:p-8 transform transition-all hover:scale-[1.01] duration-300 ease-out"> 
      {props.title && ( 
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-6 sm:mb-8">
          {props.title}
        </h2>
      )}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Job Description
          </label>
          <textarea
            id="jobDescription" name="jobDescription" rows={8}
            className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400 dark:placeholder-gray-500 text-black dark:text-white bg-white dark:bg-slate-700 transition-colors duration-150"
            placeholder="Paste the complete job description here..."
            value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} disabled={isLoading}
          />
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button type="submit" disabled={isLoading} className="flex-1 w-full flex justify-center items-center py-3 px-5 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-in-out transform hover:scale-105 active:scale-95">
            {isLoading ? ( <>{/* SVG Spinner */} Generating...</> ) : "Generate Resume Points"}
          </button>
          <button type="button" onClick={handleReset} disabled={isLoading} className="flex-1 w-full flex justify-center py-3 px-5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150">
            Reset
          </button>
        </div>
      </form>
      
      {isLoading && (<div className="mt-6 text-center"><p className="text-indigo-600 dark:text-indigo-400 animate-pulse">Crafting your points...</p></div>)}
      {error && !isLoading && (<div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500/50 text-red-700 dark:text-red-300 rounded-lg shadow"><p className="font-bold">Oops! An error occurred:</p><p className="text-sm">{error}</p></div>)}

      {resumeResult && !error && !isLoading && (
        <div className="mt-8 p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-lg shadow-inner">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3 sm:mb-4">Generated Resume Points:</h3>
          <pre className="whitespace-pre-wrap break-words text-sm sm:text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700/50 p-3 sm:p-4 rounded-md shadow">{resumeResult}</pre>
          <div className="mt-4 text-center">
            <button onClick={handleSave} className="px-6 py-2 font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow transition-colors disabled:opacity-50" disabled={!currentUser || isLoading}>
              Save this Generation
            </button>
            {saveSuccess && (<p className="mt-2 text-sm text-green-600 dark:text-green-400">✓ Saved successfully!</p>)}
          </div>
        </div>
      )}
    </div>
  );
};
export default ResumeGeneratorForm;