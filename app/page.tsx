"use client";

import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import EngineeringProtocol from "@/components/engineeringProtocol";
import SuccessSection from "@/components/SuccessSection";
import PremiumReviews from "./reviewSection/page";
import DynamicPortfolioPage from "./DynamicPortfolioPage/page";
import TeamSection from "@/components/TeamSection";
import { PublicLayout } from "./public-layout";

export default function Home() {
  return (
    <PublicLayout showFooter={true}>
      <Hero />
      <EngineeringProtocol />
      <SuccessSection />
      <TeamSection />
      <TechStack />
      <PremiumReviews />
      <DynamicPortfolioPage />
    </PublicLayout>
  );
}
