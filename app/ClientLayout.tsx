"use client";

import { usePathname } from "next/navigation";
import { LanguageProvider } from "@/constants/LanguageContext";
import { AIChatbotProvider } from "@/components/AIChatbotProvider";
import Navbar from "@/components/Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <LanguageProvider>
      <AIChatbotProvider>
        {!isAdmin && <Navbar />}
        <main className="grow relative z-10">{children}</main>
      </AIChatbotProvider>
    </LanguageProvider>
  );
}
