"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Ensure the loader is visible on mount
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 pointer-events-auto">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 rounded-full blur-3xl bg-linear-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 animate-pulse"></div>
        </div>
      </div>

      {/* Main loader content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Animated loader circle */}
        <div className="relative w-20 h-20">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"></div>

          {/* Middle pulsing ring */}
          <div className="absolute inset-2 rounded-full border-2 border-cyan-400/30 animate-pulse"></div>

          {/* Inner dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-linear-to-r from-blue-400 to-purple-400 animate-pulse"></div>
          </div>
        </div>

        {/* Loading text with animation */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-xl font-semibold tracking-widest text-white animate-fadeInScale">
            Grow Business
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-400 font-medium">Loading</p>
            <div className="flex gap-1">
              <span
                className="w-1 h-1 rounded-full bg-blue-400 animate-bounce"
                style={{ animationDelay: "0s" }}
              ></span>
              <span
                className="w-1 h-1 rounded-full bg-purple-400 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></span>
              <span
                className="w-1 h-1 rounded-full bg-cyan-400 animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></span>
            </div>
          </div>
        </div>

        {/* Progress bar simulation */}
        <div className="w-48 h-0.5 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-linear-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full animate-progressBar"></div>
        </div>
      </div>

      {/* CSS animations for the loader */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes progressBar {
          0% {
            width: 0%;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
          }
          50% {
            width: 100%;
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.8);
          }
          100% {
            width: 100%;
            box-shadow: 0 0 10px rgba(34, 211, 238, 0.8);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            opacity: 0.4;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}
