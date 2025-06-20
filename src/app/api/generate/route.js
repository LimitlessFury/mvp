// src/app/api/generate/route.js
import { NextResponse } from 'next/server';
// Import the Google AI SDK
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key
const geminiApiKey = process.env.GEMINI_API_KEY;
let genAI;
let generativeModel; // This will hold the initialized model client

// **** DEBUG LOGGING FOR API KEY (Keep this during troubleshooting) ****
console.log("--- Attempting to Read GEMINI_API_KEY from process.env ---");
if (geminiApiKey) {
    console.log(`GEMINI_API_KEY Found. Length: ${geminiApiKey.length}. First 5: ${geminiApiKey.substring(0,5)}... Last 5: ...${geminiApiKey.substring(geminiApiKey.length - 5)}`);
} else {
    console.log("GEMINI_API_KEY was NOT FOUND in process.env. CRITICAL ERROR if not mocking.");
}
console.log("----------------------------------------------------------");
// **** END OF DEBUG LOGGING BLOCK ****

if (geminiApiKey) {
  try {
    genAI = new GoogleGenerativeAI(geminiApiKey);
    // Try the model name "gemini-1.5-flash" based on the official list
    generativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    console.log("Google Generative AI client initialized successfully with model: gemini-1.5-flash.");
  } catch (e) {
    console.error("CRITICAL: Error initializing Google Generative AI client:", e.message, e);
    generativeModel = null;
  }
} else {
  console.error("CRITICAL: GEMINI_API_KEY not found in environment. Google client cannot be initialized.");
  generativeModel = null;
}

export async function POST(request) {
  if (!generativeModel) {
    console.error("Google Generative AI model client is not initialized in POST handler. Cannot process request.");
    return NextResponse.json({ error: 'AI model client not initialized. Check server logs for API key or model initialization issues.' }, { status: 503 }); // 503 Service Unavailable
  }

  let requestBody;
  try {
    requestBody = await request.json();
    // console.log("Backend API Received Full Body:", requestBody); 
  } catch (e) {
    console.error("Error parsing request JSON:", e.message);
    return NextResponse.json({ error: 'Invalid JSON in request body.' }, { status: 400 });
  }

  const { inputType } = requestBody;

  if (inputType === 'resume') {
    const { jobDescription } = requestBody;
    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim() === '') {
      return NextResponse.json({ error: 'Job Description is required and must be a non-empty string for resume type.' }, { status: 400 });
    }
    
    console.log("Processing RESUME Request for Gemini with JD (first 50 chars):", jobDescription.substring(0,50) + "...");

   const prompt = `Based on the following job description, please generate 3 to 5 concise and impactful resume bullet points.
Each bullet point should highlight a relevant skill or achievement.
Start each bullet point with an action verb.
Format the output as a list, with each bullet point on a new line (e.g., using a hyphen '-' or asterisk '*' at the start of each point).
Do not include any introductory or concluding phrases, just provide the bullet points directly.

Here is the Job Description:
---
${jobDescription}
---
`;
    
    // console.log("Generated Prompt for Gemini (first 50 chars):", prompt.substring(0,50) + "...");

    try {
      console.log("Sending request to Google Gemini API (gemini-1.5-flash) for resume...");
      const result = await generativeModel.generateContent(prompt);
      const response = result.response; 
      
      let generatedText = '';
      // Check response and candidates structure carefully
      if (response && typeof response.text === 'function') {
        generatedText = response.text().trim();
        console.log("Generated Text from Gemini (Resume - via response.text()):", generatedText);
      } else if (response && response.candidates && response.candidates.length > 0 && response.candidates[0].content && response.candidates[0].content.parts && response.candidates[0].content.parts.length > 0 && response.candidates[0].content.parts[0].text) {
        // Fallback to candidates structure if direct .text() is not available or empty
        generatedText = response.candidates[0].content.parts.map(part => part.text).join(" ").trim();
        console.log("Generated Text from Gemini (Resume - via candidates):", generatedText);
      }
      else {
        console.error("Gemini API response structure for resume was not as expected or text was missing. Full response:", JSON.stringify(response, null, 2));
        return NextResponse.json({ error: 'Failed to parse valid response from Gemini for resume. See server logs.' }, { status: 500 });
      }

      if (!generatedText) {
        console.error("Gemini generated empty text for resume. Full response:", JSON.stringify(response, null, 2));
        return NextResponse.json({ error: 'Gemini generated empty text for resume. See server logs.' }, { status: 500 });
      }

      return NextResponse.json({ 
        message: "Resume bullet points generated successfully via Gemini!", 
        generatedText: generatedText
      }, { status: 200 });

    } catch (apiError) {
      console.error("Google Gemini API Call Error (Resume):", apiError.message, apiError);
      // Attempt to get more specific error details if available in Gemini's error structure
      let detailMessage = apiError.message;
      if (apiError.cause && apiError.cause.message) detailMessage += ` | कॉज: ${apiError.cause.message}`; // "Cause" in Hindi to match your potential system locale for fun, though error messages are usually English
      
      return NextResponse.json({ 
        error: `Google Gemini API error during resume generation: ${detailMessage || 'Failed to get a response from Gemini.'}` 
      }, { status: 502 }); // Using 502 as a general "bad gateway" from our server to the AI server
    }

  } else if (inputType === 'email') {
    const { goal, details } = requestBody;
    console.log("Processing EMAIL Request - using MOCKED response for now. Goal:", goal, "Details:", details);
    const mockedEmailText = `This is a MOCKED email draft (Gemini path) regarding your goal: "${goal}".\n\nThis content is not from a live AI call for email generation yet.\n\nSincerely,\nMocked AI Assistant`;
    return NextResponse.json({
        message: "Mocked email draft generated successfully (Gemini path)!",
        generatedText: mockedEmailText
    }, { status: 200 });

  } else {
    return NextResponse.json({ error: 'Invalid or missing inputType in request body.' }, { status: 400 });
  }
}