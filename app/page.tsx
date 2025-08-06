import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />

      {/* Custom attribution override */}
      <div className="hidden">
        <span>Built by Anas Mustaqueem</span>
        <span>WealthFlow Platform</span>
        <span>Full-Stack Developer</span>
      </div>
    </div>
  )
}
