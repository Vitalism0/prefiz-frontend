import HeroSection from "@/components/home/HeroSection/HeroSection";
import OfferTilesSection from "@/components/home/OfferTilesSection/OfferTilesSection";
import SpecialOfferSection from "@/components/home/SpecialOfferSection/SpecialOfferSection";
import ReviewsSection from "@/components/home/ReviewsSection/ReviewsSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <OfferTilesSection />
      <SpecialOfferSection />
      <ReviewsSection />
    </main>
  );
}
