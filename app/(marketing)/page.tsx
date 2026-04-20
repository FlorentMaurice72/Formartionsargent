import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import { Hero } from '@/components/landing/Hero'
import { Pillars } from '@/components/landing/Pillars'
import { EbookSection } from '@/components/landing/EbookSection'
import { Testimonials } from '@/components/landing/Testimonials'
import { PricingSection } from '@/components/landing/PricingSection'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Pillars />
        <EbookSection />
        <Testimonials />
        <PricingSection />
      </main>
      <Footer />
    </>
  )
}
