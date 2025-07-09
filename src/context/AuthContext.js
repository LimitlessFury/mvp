// src/context/AuthContext.js
"use client"; // This is a client-side context, so it needs this directive.

import { useState, useEffect, useContext, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig'; // Import your initialized auth object

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // To store the user object
  const [loading, setLoading] = useState(true); // To handle initial loading state

  // 3. Use useEffect to set up the listener
  useEffect(() => {
    // onAuthStateChanged returns an unsubscribe function
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        // You can optionally enrich the user object here if needed
        setCurrentUser(user);
      } else {
        // User is signed out.
        setCurrentUser(null);
      }
      // Set loading to false once we have a user or know there isn't one.
      setLoading(false); 
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this runs only once on mount

  // The value prop is what we pass down to consuming components
  const value = {
    currentUser,
    loading,
  };

  // We don't render anything until the initial loading is complete
  return (
    <AuthContext.Provider value={value}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};

// src/context/AuthContext.js
// ... (after the AuthProvider component) ...

// 5. Create a custom hook for easy context consumption
export const useAuth = () => {
  return useContext(AuthContext);
};