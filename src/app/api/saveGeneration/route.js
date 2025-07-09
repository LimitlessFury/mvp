// src/app/api/saveGeneration/route.js
import { NextResponse } from 'next/server';
// Import our initialized Firestore instance (db) and necessary functions
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request) {
  try {
    // 1. Parse the incoming request body
    const body = await request.json();
    const { userId, type, inputData, generatedText } = body;

    // 2. Basic Validation: Ensure all required fields are present
    if (!userId || !type || !inputData || !generatedText) {
      return NextResponse.json({ error: 'Missing required fields for saving generation.' }, { status: 400 });
    }
    
    console.log(`Received request to save a generation of type: "${type}" for user: ${userId}`);

    // 3. Prepare the data object to be saved to Firestore
    const generationData = {
      userId: userId, // The UID of the user who created this
      type: type, // 'resume' or 'email'
      inputData: inputData, // An object containing the user's original inputs
      generatedText: generatedText, // The AI-generated output
      createdAt: serverTimestamp() // Let Firestore add the server-side timestamp
    };

    // 4. Add the new document to the 'generations' collection
    // 'collection(db, "generations")' creates a reference to our collection
    const docRef = await addDoc(collection(db, "generations"), generationData);

    console.log("Generation successfully saved to Firestore with document ID: ", docRef.id);

    // 5. Return a success response
    return NextResponse.json({ 
      message: 'Generation saved successfully!', 
      documentId: docRef.id 
    }, { status: 201 }); // 201 Created is a good status for successful creation

  } catch (error) {
    console.error("====== Error saving generation to Firestore: ======");
    console.error(error);
    return NextResponse.json({ 
      error: 'Failed to save generation to the database.',
      details: error.message
    }, { status: 500 });
  }
}