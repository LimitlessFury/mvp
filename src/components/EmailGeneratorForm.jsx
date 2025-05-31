// src/components/EmailGeneratorForm.jsx
import React, { useState } from 'react'; // CORRECTED IMPORT

const EmailGeneratorForm = (props) => {
  const [recipientGoal, setRecipientGoal] = useState('');
  const [keyInfo, setKeyInfo] = useState('');



const handleSubmit = async (event) => { // Make it async
  event.preventDefault();
  console.log("Submitting Email Info:", { recipientGoal, keyInfo });

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
    if (!response.ok) throw new Error(data.error || `Backend Error: ${response.status}`);
    console.log("====== Frontend Received from Backend (Email): ======");
    console.log(data);
    console.log("================================================");
  } catch (error) {
    console.error("====== Frontend Error during fetch (Email): ======");
    console.error(error);
    console.error("============================================");
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
          <label htmlFor="recipientGoal" className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Goal / Context
          </label>
          <input
            type="text"
            id="recipientGoal"
            name="recipientGoal"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400 text-black" // FULL CLASSES
            placeholder="e.g., Network with a hiring manager, Follow up on application" // FULL PLACEHOLDER
            value={recipientGoal}
            onChange={(e) => setRecipientGoal(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="keyInformation" className="block text-sm font-medium text-gray-700 mb-1">
            Key Information / Your Ask
          </label>
          <textarea
            id="keyInformation"
            name="keyInformation"
            rows={5}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400 text-black" // FULL CLASSES
            placeholder="Paste key details, your background, what you want to achieve..." // FULL PLACEHOLDER
            value={keyInfo}
            onChange={(e) => setKeyInfo(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out" // FULL CLASSES (using teal as discussed for distinction)
          >
            Generate Email Draft
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailGeneratorForm;