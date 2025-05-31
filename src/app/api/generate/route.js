// src/app/api/generate/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json(); // Parse the request body as JSON
    console.log("====== Backend API Received Data: ======");
    console.log(body);
    console.log("========================================");
    
    // For now, just echo back a success message and the data
    // DO NOT call OpenAI yet
    return NextResponse.json({ 
      message: "Success! Backend received your data.", 
      dataReceived: body 
    }, { status: 200 });

  } catch (error) {
    console.error("====== API Error: ======");
    console.error(error);
    console.error("========================");
    return NextResponse.json({ 
      error: 'Failed to process request on backend. Error: ' + error.message 
    }, { status: 500 });
  }
}