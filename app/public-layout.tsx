"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

interface PublicLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function PublicLayout({ children, showFooter = true }: PublicLayoutProps) {
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    // সামান্য delay দিয়ে Footer দেখানোর জন্য
    const timer = setTimeout(() => {
      setIsPageReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {children}
      {showFooter && isPageReady && <Footer />}
    </>
  );
}