/*
 * Home Page — MEDES Church Urban Revival Design
 * Assembles all sections in order:
 * Navigation → Hero → Videos+Bible → Vision → CommunityGallery → Services → Visit → Giving → Footer
 */

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import VideosAndBible from "@/components/VideosAndBible";
import VisionSection from "@/components/VisionSection";
import CommunityGallery from "@/components/CommunityGallery";
import ServicesSection from "@/components/ServicesSection";
import VisitSection from "@/components/VisitSection";
import GivingSection from "@/components/GivingSection";
import Footer from "@/components/Footer";
import LiveStreamBanner from "@/components/LiveStreamBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Navigation />
      <HeroSection />
      <VideosAndBible />
      <CommunityGallery />
      <VisionSection />
      <ServicesSection />
      <VisitSection />
      <GivingSection />
      <Footer />
      <LiveStreamBanner />
    </div>
  );
}
