// src/lib/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Remove the old placeholder comments if you like

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase (this part should already be there from Day 5)
let app;
let auth;
let db;

// Check if Firebase has already been initialized
// This is good practice to prevent re-initialization errors with HMR in Next.js dev mode
try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    console.log("Firebase initialized successfully!"); // For testing
} catch (error) {
    console.error("Error initializing Firebase:", error);
    // If already initialized, `error.code` might be 'firebase/duplicate-app'
    // In a real app, you might want to use getApps().length ? getApp() : initializeApp()
    // For now, a try-catch is fine for basic error visibility.
}

export { app, db, auth };