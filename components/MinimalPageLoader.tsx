"use client";

/**
 * Alternative minimalist loader component
 * Use this if you prefer a simpler design
 * Just import and use this instead of PageLoader
 */

export default function MinimalPageLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-950 pointer-events-auto">
      {/* Minimal animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-600/10 to-transparent animate-pulse"></div>
      </div>

      {/* Main loader content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6">
        {/* Minimalist animation circles */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20"></div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin"></div>
          <div className="absolute inset-3 rounded-full border border-purple-500/30 animate-pulse"></div>
        </div>

        {/* Company name */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Grow{" "}
            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Business
            </span>
          </h1>
        </div>

        {/* Loading indicator */}
        <div className="flex gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce"
            style={{ animationDelay: "0.15s" }}
          ></div>
          <div
            className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
