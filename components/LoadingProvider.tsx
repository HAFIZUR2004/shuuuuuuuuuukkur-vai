"use client";

import { createContext, useContext, useEffect, useState } from "react";
import PageLoader from "./PageLoader";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  // Show loader immediately on client render so the initial
  // UX displays the loader first, then the homepage underneath.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Minimum loader duration (adjustable). Shorten for snappier UX.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5s

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <PageLoader />}
      {/* While loading, keep children in the DOM (server-rendered) but
          prevent interaction so the loader visually takes precedence. */}
      <div
        aria-hidden={isLoading}
        style={{ pointerEvents: isLoading ? "none" : undefined }}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}
