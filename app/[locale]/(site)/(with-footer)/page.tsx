import HeroSection from "@/components/home/HeroSection/HeroSection";
import OfferTilesSection from "@/components/home/OfferTilesSection/OfferTilesSection";
import SpecialOfferSection from "@/components/home/SpecialOfferSection/SpecialOfferSection";
import FaqSection from "@/components/home/FaqSection/FaqSection";
import ReviewsSection from "@/components/home/ReviewsSection/ReviewsSection";
import CtaSection from "@/components/home/CtaSection/CtaSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <OfferTilesSection />
      <SpecialOfferSection />
      <FaqSection />
      <ReviewsSection />
      <CtaSection />
    </main>
  );
}
