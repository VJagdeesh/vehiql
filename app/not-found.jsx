"use client";
import React from "react";
import { Ghost, HomeIcon, ArrowLeft } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="animate-float">
          <Ghost className="h-32 w-32 mx-auto text-gray-400 mb-8" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4 gradient-title">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 gradient-title">
          Page Not Found
        </h2>
        <p className="text-gray-600 text-lg mb-12 max-w-md mx-auto ">
          Oops! The page you're looking for seems to have vanished into thin
          air. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Go Home
          </a>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-gray-900 text-gray-900 hover:bg-gray-100 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
