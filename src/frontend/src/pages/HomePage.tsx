import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { GallerySection } from "@/components/GallerySection";
import { Hero } from "@/components/Hero";
import { ValueCards } from "@/components/ValueCards";

export function HomePage() {
  return (
    <>
      <Hero />
      <ValueCards />
      <AboutSection />
      <GallerySection />
      <ContactSection />
    </>
  );
}
