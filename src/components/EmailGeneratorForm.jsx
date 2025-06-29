// src/components/EmailGeneratorForm.jsx
import React, { useState } from 'react';

const EmailGeneratorForm = (props) => {
  const [recipientGoal, setRecipientGoal] = useState('');
  const [keyInfo, setKeyInfo] = useState('');
  // --- START OF DAY 12 NEW CODE ---
  const [emailResult, setEmailResult] = useState(''); // To store generated email
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // We'll use this in the next step (Day 13)
  // --- END OF DAY 12 NEW CODE ---

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Set loading state and clear previous results
    setIsLoading(true);
    setEmailResult('');
    setError('');

    if (!recipientGoal.trim() || !keyInfo.trim()) {
      setError("Please fill in both 'Recipient Goal' and 'Key Information'.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputType: 'email',
          goal: recipientGoal,
          details: keyInfo,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Backend Error: ${response.status} ${response.statusText}`);
      }
      
      // --- START OF DAY 12 MODIFICATION ---
      // Store the result in state instead of just logging it
      if (data.generatedText) {
        setEmailResult(data.generatedText);
      } else {
        setError("Received a response, but no generated email text was found.");
      }
      // --- END OF DAY 12 MODIFICATION ---

    } catch (err) {
      console.error("Frontend Error during fetch (Email):", err);
      setError(err.message || "An unexpected error occurred while generating the email.");
    } finally {
      setIsLoading(false); // This will be used in Day 13
    }
  };

  const handleReset = () => {
    setRecipientGoal('');
    setKeyInfo('');
    setEmailResult('');
    setError('');
    setIsLoading(false);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 sm:p-8 transform transition-all hover:scale-[1.01] duration-300 ease-out">
      {props.title && (
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-6 sm:mb-8">
          {props.title}
        </h2>
      )}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* ... your existing input fields for goal and keyInfo ... */}
        {/* They should already be connected to useState */}
        <div>
          <label htmlFor="recipientGoal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Recipient Goal / Context
          </label>
          <input
            type="text"
            id="recipientGoal"
            name="recipientGoal"
            className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm placeholder-gray-400 dark:placeholder-gray-500 text-black dark:text-white bg-white dark:bg-slate-700 transition-colors duration-150"
            placeholder="e.g., Network with a hiring manager"
            value={recipientGoal}
            onChange={(e) => setRecipientGoal(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="keyInformation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Key Information / Your Ask
          </label>
          <textarea
            id="keyInformation"
            name="keyInformation"
            rows={5}
            className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm placeholder-gray-400 dark:placeholder-gray-500 text-black dark:text-white bg-white dark:bg-slate-700 transition-colors duration-150"
            placeholder="Paste key details, your background, what you want to achieve..."
            value={keyInfo}
            onChange={(e) => setKeyInfo(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* --- START OF DAY 13 MODIFICATIONS (We'll do them now) --- */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 w-full flex justify-center items-center py-3 px-5 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-in-out transform hover:scale-105 active:scale-95"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : "Generate Email Draft"}
          </button>
          <button 
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="flex-1 w-full flex justify-center py-3 px-5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            Reset
          </button>
        </div>
        {/* --- END OF DAY 13 MODIFICATIONS --- */}

      </form>

      {/* --- START OF DAY 12/13 NEW JSX --- */}
      {isLoading && (
        <div className="mt-6 text-center">
          <p className="text-teal-600 dark:text-teal-400 animate-pulse">Drafting your email...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500/50 text-red-700 dark:text-red-300 rounded-lg shadow">
          <p className="font-bold">Oops! An error occurred:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {emailResult && !error && !isLoading && (
        <div className="mt-8 p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-lg shadow-inner">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3 sm:mb-4">Generated Email Draft:</h3>
          <pre className="whitespace-pre-wrap break-words text-sm sm:text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700/50 p-3 sm:p-4 rounded-md shadow">
            {emailResult}
          </pre>
        </div>
      )}
      {/* --- END OF DAY 12/13 NEW JSX --- */}
    </div>
  );
};

export default EmailGeneratorForm;