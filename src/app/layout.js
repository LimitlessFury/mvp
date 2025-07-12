// src/app/layout.js (or .jsx)
import { Geist } from "next/font/google"; // I assume you meant 'GeistSans' but keeping your original import name
import { Geist_Mono } from "next/font/google";
import "./globals.css";

// --- START OF DAY 16 MODIFICATION ---
import { AuthProvider } from "@/context/AuthContext";
// --- END OF DAY 16 MODIFICATION ---

// Your existing Geist font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Your existing metadata
export const metadata = {
  title: "AI Content Generators", // I updated this from "Create Next App" for you
  description: "Generate resume points and professional emails with AI.", // I updated this for you
};

// You had an unused 'Inter' import here, I'm removing it to keep the code clean.
// const inter = Inter({ subsets: ["latin"] }); 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Your existing body tag with your font variables */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* --- START OF DAY 16 MODIFICATION --- */}
        {/* Wrap the children with the AuthProvider */}
        <AuthProvider>
          {children}
        </AuthProvider>
        {/* --- END OF DAY 16 MODIFICATION --- */}
      </body>
    </html>
  );
}