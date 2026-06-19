"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import { PublicLayout } from "./public-layout";
import ClientSections from "@/components/ClientSections";
import CTABridgeSection from "@/components/CTABridgeSection";
import { translations } from "@/constants/translations";
import { useLanguage } from "@/constants/LanguageContext";

// Minimal loading fallback for faster perceived performance
const LoadingFallback = () => <div className="h-screen bg-transparent" />;

// Dynamically import heavy components - defer non-critical sections
const EngineeringProtocol = dynamic(
  () => import("@/components/engineeringProtocol"),
  {
    ssr: true,
    loading: LoadingFallback,
  },
);

const SuccessSection = dynamic(() => import("@/components/SuccessSection"), {
  ssr: true,
  loading: LoadingFallback,
});

const TeamSection = dynamic(() => import("@/components/TeamSection"), {
  ssr: true,
  loading: LoadingFallback,
});

const TechStack = dynamic(() => import("@/components/TechStack"), {
  ssr: true,
  loading: LoadingFallback,
});

export default function Home() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <PublicLayout showFooter={true}>
      {/* Above-the-fold: Hero (static, renders immediately) */}
      <Hero t={t} lang={lang} />

      {/* Below-the-fold: Lazy-loaded sections with minimal suspense overhead */}
      <Suspense fallback={<LoadingFallback />}>
        <EngineeringProtocol t={t} lang={lang} />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <SuccessSection t={t} lang={lang} />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <TeamSection teamData={t.teamHorizontal} lang={lang} />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <TechStack t={t} lang={lang} />
      </Suspense>

      {/* Bridge CTA Section - Creative Transition to Projects */}
      <CTABridgeSection t={t} lang={lang} />

      {/* Client-only sections with dynamic import */}
      <Suspense fallback={<LoadingFallback />}>
        <ClientSections t={t} lang={lang} />
      </Suspense>
    </PublicLayout>
  );
}
