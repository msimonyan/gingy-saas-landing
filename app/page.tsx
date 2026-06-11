import { Header } from '@/components/landing/header'
import { HeroSection } from '@/components/landing/hero-section'
import { TrustSection } from '@/components/landing/trust-section'
import { ProblemSection } from '@/components/landing/problem-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { HowItWorksSection } from '@/components/landing/how-it-works-section'
import { ComparisonSection } from '@/components/landing/comparison-section'
import { IntegrationsSection } from '@/components/landing/integrations-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { FaqSection } from '@/components/landing/faq-section'
import { CtaSection } from '@/components/landing/cta-section'
import { Footer } from '@/components/landing/footer'
import { fetchBillingPlansServer } from '@/lib/api'

export default async function LandingPage() {
  // Fetch plans on the server so the pricing cards are present in the initial
  // HTML. This avoids the client-side skeleton-to-cards swap that grew the
  // pricing section after load and dragged anchor-scroll targets downward.
  const { plans, currency } = await fetchBillingPlansServer()

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <TrustSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ComparisonSection />
      <IntegrationsSection />
      <PricingSection initialPlans={plans} initialCurrency={currency} />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
