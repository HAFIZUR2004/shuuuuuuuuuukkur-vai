"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import client-only components with ssr: false
const PremiumReviews = dynamic(() => import("@/app/reviewSection/page"), {
  ssr: false,
  loading: () => <div className="h-screen w-full animate-pulse bg-gray-900/20" />,
});

const DynamicPortfolioPage = dynamic(() => import("@/app/DynamicPortfolioPage/page"), {
  ssr: false,
  loading: () => <div className="h-screen w-full animate-pulse bg-gray-900/20" />,
});

interface ClientSectionsProps {
  t: any;
  lang: string;
}

export default function ClientSections({ t, lang }: ClientSectionsProps) {
  return (
    <>
      <Suspense fallback={<div className="h-screen w-full" />}>
        <PremiumReviews t={t} lang={lang} />
      </Suspense>
      <Suspense fallback={<div className="h-screen w-full" />}>
        <DynamicPortfolioPage t={t} lang={lang} />
      </Suspense>
    </>
  );
}
