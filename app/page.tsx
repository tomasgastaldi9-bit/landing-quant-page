import { CredibilitySection } from "@/components/credibility-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { MetricsSection } from "@/components/metrics-section";

export default function Home() {
  return (
    <main id="main" className="min-h-screen bg-[#050505] text-[#e2e2e2]">
      <HeroSection />
      <MetricsSection />
      <CredibilitySection />
      <CTASection />
      <Footer />
    </main>
  );
}
