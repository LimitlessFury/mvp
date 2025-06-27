// src/app/api/generate/route.js
import { NextResponse } from 'next/server';
// Import the Google AI SDK
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key from environment variables
const geminiApiKey = process.env.GEMINI_API_KEY;
let generativeModel; // This will hold the initialized model client

// Initialize the Google Generative AI client
if (geminiApiKey) {
  try {
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    generativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    // console.log("Google Generative AI client initialized successfully.");
  } catch (e) {
    console.error("CRITICAL: Error initializing Google Generative AI client:", e.message);
    generativeModel = null;
  }
} else {
  console.error("CRITICAL: GEMINI_API_KEY not found in environment. Google client cannot be initialized.");
  generativeModel = null;
}

export async function POST(request) {
  // Early exit if the AI client isn't ready
  if (!generativeModel) {
    console.error("Google Generative AI model client is not initialized in POST handler.");
    return NextResponse.json({ error: 'AI model client not initialized. Check server logs for API key issues.' }, { status: 503 });
  }

  // Parse the request body
  let requestBody;
  try {
    requestBody = await request.json();
  } catch (e) {
    console.error("Error parsing request JSON:", e.message);
    return NextResponse.json({ error: 'Invalid JSON in request body.' }, { status: 400 });
  }

  const { inputType } = requestBody;

  // --- RESUME GENERATION LOGIC ---
  if (inputType === 'resume') {
    const { jobDescription } = requestBody;
    // Input validation
    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim() === '') {
      return NextResponse.json({ error: 'Job Description is required and must be a non-empty string.' }, { status: 400 });
    }
    
    // console.log("Processing RESUME Request for Gemini...");

    const prompt = `Generate 3 to 5 concise and impactful resume bullet points for a job application based on the following job description.
Each bullet point should highlight a relevant skill or achievement.
Start each bullet point with an action verb.
Format the output as a list of bullet points, with each bullet point on a new line (e.g., using a hyphen '-' or asterisk '*' at the start of each point).
Do not include any introductory or concluding phrases, just provide the bullet points directly.
Job Description: "${jobDescription}"`;
    
    try {
      // console.log("Sending request to Gemini API for resume...");
      const result = await generativeModel.generateContent(prompt);
      const response = result.response;
      const generatedText = response.text().trim();

      if (!generatedText) {
        console.error("Gemini generated empty text for resume.");
        return NextResponse.json({ error: 'AI generated empty text for resume.' }, { status: 500 });
      }

      return NextResponse.json({ 
        generatedText: generatedText
      }, { status: 200 });

    } catch (apiError) {
      console.error("Google Gemini API Call Error (Resume):", apiError.message);
      return NextResponse.json({ 
        error: `Google Gemini API error during resume generation: ${apiError.message || 'Failed to get a response from Gemini.'}` 
      }, { status: 502 });
    }
  } 
  
  // --- EMAIL GENERATION LOGIC ---
  else if (inputType === 'email') {
    const { goal, details } = requestBody;
    // Input validation
    if (!goal || !details || typeof goal !== 'string' || typeof details !== 'string' || goal.trim() === '' || details.trim() === '') {
      return NextResponse.json({ error: 'Both "Recipient Goal" and "Key Information" are required and must be non-empty strings.' }, { status: 400 });
    }

    // console.log("Processing EMAIL Request for Gemini...");

    const prompt = `
      Act as a professional communication assistant. Based on the user's goal and key information, write a clear, concise, and professional email draft.

      **User's Goal for this Email:**
      ${goal}

      **Key Information to Include:**
      ${details}

      **Instructions:**
      - The tone should be professional, respectful, and appropriate for the stated goal.
      - Structure the email with a clear subject line, a proper salutation (e.g., "Dear [Recipient Name],"), the email body, and a closing (e.g., "Sincerely," followed by "[Your Name]"). Use placeholders for names.
      - Ensure the email has a clear call to action if one is implied by the goal.
      - Do not add any explanatory text before or after the email draft itself. Just provide the complete email.
      - Start the output with "Subject:".
    `;

    try {
      // console.log("Sending request to Gemini API for email...");
      const result = await generativeModel.generateContent(prompt);
      const response = result.response;
      const generatedText = response.text().trim();

      if (!generatedText) {
        console.error("Gemini generated empty text for email.");
        return NextResponse.json({ error: 'AI generated empty text for email.' }, { status: 500 });
      }

      return NextResponse.json({
        generatedText: generatedText
      }, { status: 200 });

    } catch (apiError) {
      console.error("Google Gemini API Call Error (Email):", apiError.message);
      return NextResponse.json({ 
        error: `Google Gemini API error during email generation: ${apiError.message || 'Failed to get a response from Gemini.'}` 
      }, { status: 502 });
    }
  } 
  
  // --- FALLBACK FOR INVALID INPUT TYPE ---
  else {
    return NextResponse.json({ error: 'Invalid or missing inputType in request body.' }, { status: 400 });
  }
}