"use client";

import { ReactNode } from "react";
import Footer from "@/components/Footer";

interface PublicLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function PublicLayout({
  children,
  showFooter = true,
}: PublicLayoutProps) {
  return (
    <>
      {children}
      {showFooter && <Footer />}
    </>
  );
}
