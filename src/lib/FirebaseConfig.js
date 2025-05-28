// src/lib/firebaseConfig.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// IMPORTANT: We will populate these from environment variables on Day 6
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE_BUT_READ_FROM_ENV_LATER",
  authDomain: "YOUR_AUTH_DOMAIN_HERE_BUT_READ_FROM_ENV_LATER",
  projectId: "YOUR_PROJECT_ID_HERE_BUT_READ_FROM_ENV_LATER",
  storageBucket: "YOUR_STORAGE_BUCKET_HERE_BUT_READ_FROM_ENV_LATER",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE_BUT_READ_FROM_ENV_LATER",
  appId: "YOUR_APP_ID_HERE_BUT_READ_FROM_ENV_LATER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firebase services you want to use in your app
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };