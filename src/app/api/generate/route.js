// src/app/api/generate/route.js
import { NextResponse } from 'next/server';

import OpenAI from 'openai'; 


const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 
// Initialize OpenAI client
// Ensure you only initialize it if the key is present
let openai; // Declare openai client variable at module scope

// Use the CORRECT variable name (all uppercase)
if (OPENAI_API_KEY) { 
  try {
    openai = new OpenAI({
      apiKey: OPENAI_API_KEY, // Use the CORRECT variable name here too
    });
    console.log("OpenAI client initialized successfully in API route.");
  } catch (e) {
    console.error("Error initializing OpenAI client in API route:", e.message);
    openai = null; 
  }
} else {
  console.error("OpenAI API Key not found in environment. OpenAI client not initialized.");
  openai = null; 
}

export async function POST(request) {

 //console.log("Attempting to read OpenAI API Key (first few chars):", OPENAI_API_KEY ? OPENAI_API_KEY.substring(0, 5) + "..." : "NOT FOUND"); 


  try {
    const body = await request.json();
    console.log("====== Backend API Received Full Body: ======");
    console.log(body);
    console.log("===========================================");

    let responseData = { message: "Success! Backend received your data.", dataReceived: body };

    if (body.inputType === 'resume') {
      const jobDescription = body.jobDescription;
      if (!jobDescription) {
        // If jobDescription is missing for a resume request, return an error
        return NextResponse.json({ error: 'Job Description is required for resume type.' }, { status: 400 });
      }
      console.log("====== Processing RESUME Request: ======");
      console.log("Job Description:", jobDescription);
      // Later, we will use this jobDescription to call OpenAI
      // For now, let's add it to the response for testing
      responseData.processedJobDescription = jobDescription; 
      console.log("======================================");
    } else if (body.inputType === 'email') {
      // We'll handle email specifics later (Day 11)
      console.log("====== Processing EMAIL Request: ======");
      console.log("Goal:", body.goal);
      console.log("Details:", body.details);
      console.log("====================================");
    } else {
      // Handle unknown inputType or requests without it
      return NextResponse.json({ error: 'Invalid or missing inputType.' }, { status: 400 });
    }


     if (!openai) {
     return NextResponse.json({ error: 'OpenAI client not initialized. Check API key.' }, { status: 500 });
  }

    
    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error("====== API Error: ======");
    console.error(error);
    console.error("========================");
    return NextResponse.json({ 
      error: 'Failed to process request on backend. Error: ' + error.message 
    }, { status: 500 });
  }
}