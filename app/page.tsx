import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import EngineeringProtocol from "@/components/engineeringProtocol";
import TeamSection from "@/components/TeamSection";
import SuccessSection from "@/components/SuccessSection";
import PremiumReviews from "./reviewSection/page";
import DynamicPortfolioPage from "./DynamicPortfolioPage/page";

export default function Home() {
  return (
    <main>
      <Hero />
      <EngineeringProtocol />
      <SuccessSection />
      <TeamSection />
      <TechStack />
      <PremiumReviews />
      <DynamicPortfolioPage />
    </main>
  );
}
