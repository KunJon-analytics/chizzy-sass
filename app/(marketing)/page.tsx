import Calculator from "@/components/home/calculator";
import FAQ from "@/components/home/faq";
import Feature from "@/components/home/features";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import Pricing from "@/components/home/pricing";
import Stats from "@/components/home/stats";
import { MarketingLayout } from "@/components/layout/marketing-layout";

export default function Home() {
  return (
    <MarketingLayout>
      <div className="grid gap-12">
        <Hero />
        <Pricing />
        <Calculator />
        <HowItWorks />
        <Feature />
        <Stats />
        <FAQ />
      </div>
    </MarketingLayout>
  );
}
