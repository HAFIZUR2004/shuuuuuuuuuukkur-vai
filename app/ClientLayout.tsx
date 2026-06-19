"use client";

import { usePathname } from "next/navigation";
import { useMemo, memo } from "react";
import { LanguageProvider } from "@/constants/LanguageContext";
import { AIChatbotProvider } from "@/components/AIChatbotProvider";
import Navbar from "@/components/Navbar";
import { LoadingProvider } from "@/components/LoadingProvider";

// Memoize Navbar to prevent re-renders on parent state changes
const MemoizedNavbar = memo(Navbar);

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  // Memoize navbar rendering decision
  const navbarElement = useMemo(
    () => (!isAdmin ? <MemoizedNavbar /> : null),
    [isAdmin],
  );

  return (
    <LoadingProvider>
      <LanguageProvider>
        <AIChatbotProvider>
          {navbarElement}
          <main className="grow relative z-10">{children}</main>
        </AIChatbotProvider>
      </LanguageProvider>
    </LoadingProvider>
  );
}
