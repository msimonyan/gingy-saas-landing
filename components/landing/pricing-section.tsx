'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Loader2, Sparkles, X, Zap } from 'lucide-react'
import { fetchBillingPlans, createCheckout, type BillingPlan } from '@/lib/api'

export function PricingSection() {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly')
  const [plans, setPlans] = useState<BillingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  useEffect(() => {
    async function loadPlans() {
      try {
        const data = await fetchBillingPlans()
        setPlans(data)
      } catch (error) {
        console.error('Failed to load plans:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPlans()
  }, [])

  const handleSelectPlan = (planSlug: string) => {
    setSelectedPlan(planSlug)
    setShowEmailModal(true)
  }

  const handleCheckout = async () => {
    if (!selectedPlan || !email) return

    setCheckoutLoading(selectedPlan)
    try {
      const response = await createCheckout({
        plan_slug: selectedPlan,
        billing_interval: billingInterval,
        email,
        return_url: window.location.href,
      })
      window.location.href = response.confirmation_url
    } catch (error) {
      console.error('Checkout failed:', error)
      alert('Checkout failed. Please try again.')
    } finally {
      setCheckoutLoading(null)
      setShowEmailModal(false)
    }
  }

  const getPrice = (price: number) => {
    const monthlyPrice = price
    const yearlyPrice = Math.round(price * 10) // 2 months free
    return billingInterval === 'monthly' ? monthlyPrice : yearlyPrice
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price)
  }

  if (loading) {
    return (
      <section id="pricing" className="py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
          <p className="text-muted-foreground">Loading pricing plans...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="pricing" className="py-24 lg:py-36 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-4 py-2 text-sm font-medium text-accent mb-6">
            <Sparkles className="h-4 w-4" />
            Pricing
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground">
            Choose the plan that fits your operations. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center bg-card rounded-2xl p-1.5 border border-border shadow-sm">
            <button
              onClick={() => setBillingInterval('monthly')}
              className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                billingInterval === 'monthly'
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval('yearly')}
              className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                billingInterval === 'yearly'
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                billingInterval === 'yearly'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-accent/20 text-accent'
              }`}>
                -17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.slug}
              className={`relative group ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {/* Glow effect for popular plan */}
              {plan.popular && (
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/50 to-accent rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              )}
              
              <div
                className={`relative h-full bg-card rounded-2xl border-2 p-8 transition-all duration-300 ${
                  plan.popular
                    ? 'border-primary shadow-2xl shadow-primary/10'
                    : 'border-border hover:border-primary/30 hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg shadow-primary/25">
                      <Zap className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {index === 0 && 'Perfect for small teams'}
                    {index === 1 && 'For growing operations'}
                    {index === 2 && 'For large enterprises'}
                  </p>
                  <div className="mt-6">
                    <span className="text-5xl font-bold text-foreground">
                      {formatPrice(getPrice(plan.price))}
                    </span>
                    <span className="text-lg text-muted-foreground ml-1">
                      / {billingInterval === 'monthly' ? 'mo' : 'year'}
                    </span>
                  </div>
                  {billingInterval === 'yearly' && (
                    <p className="text-sm text-primary font-medium mt-2">
                      {formatPrice(plan.price)} / month, billed annually
                    </p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features?.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-primary/10 text-primary'
                      }`}>
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan.slug)}
                  disabled={checkoutLoading === plan.slug}
                  className={`w-full h-12 text-base font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5'
                      : 'hover:-translate-y-0.5'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {checkoutLoading === plan.slug ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Start Free Trial'
                  )}
                </Button>
                
                <p className="text-center text-xs text-muted-foreground mt-4">
                  No credit card required
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          All prices in RUB. VAT may apply. Cancel anytime during trial.
        </p>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-md p-4">
          <div 
            className="bg-card rounded-3xl p-8 max-w-md w-full shadow-2xl border border-border animate-fade-up"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Start Your Free Trial
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  14 days free, no credit card required
                </p>
              </div>
              <button 
                onClick={() => setShowEmailModal(false)}
                className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="bg-primary/5 rounded-xl p-4 mb-6 border border-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {plans.find((p) => p.slug === selectedPlan)?.name} Plan
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(getPrice(plans.find((p) => p.slug === selectedPlan)?.price || 0))} / {billingInterval === 'monthly' ? 'month' : 'year'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Work email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <Button
                onClick={handleCheckout}
                disabled={!email || checkoutLoading !== null}
                className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/25"
              >
                {checkoutLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  'Continue to Checkout'
                )}
              </Button>
              
              <button
                onClick={() => setShowEmailModal(false)}
                className="w-full py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
