"use client";

import type { Metadata } from "next";
import { Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/constants/LanguageContext";
import { usePathname } from "next/navigation";
import { AIChatbotProvider } from "@/components/AIChatbotProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-inter",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${hindSiliguri.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} bg-[#0b0c18] antialiased text-white flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <AIChatbotProvider>
            {/* Navbar only for public */}
            {!isAdmin && <Navbar />}

            <main className="grow relative z-10">{children}</main>

            {/* Footer সরিয়ে ফেলা হয়েছে - এখন PublicLayout handle করবে */}
          </AIChatbotProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}