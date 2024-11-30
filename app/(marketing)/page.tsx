import Hero from "@/components/home/hero";
import Pricing from "@/components/home/pricing";
import { MarketingLayout } from "@/components/layout/marketing-layout";

export default function Home() {
  return (
    <MarketingLayout>
      <div className="grid gap-12">
        <Hero />
        <Pricing />
      </div>
    </MarketingLayout>
  );
}
