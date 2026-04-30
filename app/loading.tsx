"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loading() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    const texts = ["Fetching Data", "Processing Assets", "Preparing Interface", "Almost Ready"];
    let textIndex = 0;
    const textInterval = setInterval(() => {
      if (textIndex < texts.length) {
        setLoadingText(texts[textIndex]);
        textIndex++;
      }
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0b0c18] via-[#0f0f1a] to-[#0b0c18] flex flex-col items-center justify-center z-[200]">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full"
          animate={{ x: [-300, 300], y: [-300, 300] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full bottom-0 right-0"
          animate={{ x: [300, -300], y: [300, -300] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main Spinner - Quantum Ring */}
      <motion.div
        className="relative w-32 h-32 mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-500 border-r-purple-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-cyan-400 border-l-purple-400"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border-4 border-transparent border-t-pink-500 border-r-blue-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-md" />
        </motion.div>
      </motion.div>

      {/* Logo Container - Your Company Logo */}
      <motion.div
        className="relative w-20 h-20 mb-6"
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity },
        }}
      >
        {/* Gradient Border Ring for Premium Look */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-[2px]">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0b0c18] to-[#0f0f1a] flex items-center justify-center overflow-hidden">
            {/* Your Company Logo */}
            <img 
              src="/logo.png" 
              alt="Company Logo" 
              className="w-16 h-16 object-contain rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Loading Text */}
      <motion.div
        className="text-center space-y-3"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          {loadingText}
        </p>
        <p className="text-cyan-400/50 font-mono text-[10px] tracking-[0.3em] uppercase">
          Please wait
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-64 md:w-80 mt-8">
        <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <motion.p
          className="text-[10px] text-white/30 text-center mt-2 font-mono"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {loadingProgress}% Complete
        </motion.p>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{
              x: "50%",
              y: "50%",
              scale: 0,
            }}
            animate={{
              x: `${50 + (Math.random() - 0.5) * 100}%`,
              y: `${50 + (Math.random() - 0.5) * 100}%`,
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}