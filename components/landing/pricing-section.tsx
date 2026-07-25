'use client'

import { useMemo, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Loader2, Sparkles, X, Zap } from 'lucide-react'
import {
  fetchBillingPlans,
  startPublicCheckout,
  BILLING_INTERVAL,
  type BillingPlan,
} from '@/lib/api'

const PANEL_URL = process.env.NEXT_PUBLIC_PANEL_URL || ''

// Basic RFC5322-light email check. Final validation is done by the API.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface PricingSectionProps {
  /**
   * Plans fetched on the server and embedded in the initial HTML. When present,
   * the section renders the real cards immediately (no loading skeleton, no
   * layout shift). Falls back to a client fetch only when this is empty.
   */
  initialPlans?: BillingPlan[]
  initialCurrency?: string
}

export function PricingSection({ initialPlans, initialCurrency }: PricingSectionProps = {}) {
  const hasInitialPlans = Boolean(initialPlans && initialPlans.length > 0)
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly')
  const [plans, setPlans] = useState<BillingPlan[]>(initialPlans ?? [])
  const [currency, setCurrency] = useState(initialCurrency ?? 'RUB')
  const [loading, setLoading] = useState(!hasInitialPlans)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [emailConfirm, setEmailConfirm] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [emailConfirmError, setEmailConfirmError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // Server already provided the plans — nothing to fetch, and refetching
    // would risk a layout shift after hydration.
    if (hasInitialPlans) return

    async function loadPlans() {
      try {
        const { plans: data, currency: curr } = await fetchBillingPlans()
        setPlans(data)
        setCurrency(curr)
      } catch (error) {
        console.error('Failed to load plans:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPlans()
  }, [hasInitialPlans])

  const handleSelectPlan = (planSlug: string) => {
    setSelectedPlan(planSlug)
    setEmail('')
    setEmailConfirm('')
    setEmailError(null)
    setEmailConfirmError(null)
    setSubmitError(null)
    setShowAuthModal(true)
  }

  const closeModal = () => {
    if (submitting) return
    setShowAuthModal(false)
  }

  // Annual is offered only when EVERY plan has a real yearly price from the DB.
  // With no fallback, a plan whose yearly row was removed reports yearlyPrice as
  // undefined, so we hide the annual toggle entirely rather than advertise an
  // annual option that checkout can't fulfill ("No active price found").
  const annualAvailable = useMemo(
    () => plans.length > 0 && plans.every((p) => typeof p.yearlyPrice === 'number' && p.yearlyPrice > 0),
    [plans]
  )

  // If annual isn't available (e.g. plans loaded without yearly prices), make sure
  // we're not stuck on a hidden 'yearly' selection.
  useEffect(() => {
    if (!annualAvailable && billingInterval === 'yearly') {
      setBillingInterval('monthly')
    }
  }, [annualAvailable, billingInterval])

  const intervalValue = useMemo(
    () => (billingInterval === 'monthly' ? BILLING_INTERVAL.MONTHLY : BILLING_INTERVAL.YEARLY),
    [billingInterval]
  )

  const loginUrl = useMemo(() => {
    if (!PANEL_URL || !selectedPlan) return ''
    const base = PANEL_URL.replace(/\/$/, '')
    const params = new URLSearchParams({
      plan_slug: selectedPlan,
      billing_interval: String(intervalValue),
      next: '/billing/checkout/start',
    })
    return `${base}/login?${params.toString()}`
  }, [selectedPlan, intervalValue])

  /**
   * Pay-first funnel:
   *   1. create a public checkout session on the API (unauthenticated)
   *   2. redirect to the YooKassa confirmation URL
   *   3. YooKassa returns to the panel's `/register` page with checkout_id+email
   *      prefilled; after the user finishes registration the API auto-claims
   *      the pending session via email match.
   */
  const startCheckout = async () => {
    if (!selectedPlan) return
    const trimmed = email.trim()
    const trimmedConfirm = emailConfirm.trim()

    if (!EMAIL_REGEX.test(trimmed)) {
      setEmailError('Введите корректный email.')
      return
    }
    if (trimmed.toLowerCase() !== trimmedConfirm.toLowerCase()) {
      setEmailConfirmError('Email-адреса не совпадают.')
      return
    }
    if (!PANEL_URL) {
      setSubmitError('Не настроен адрес панели. Укажите `NEXT_PUBLIC_PANEL_URL` в окружении.')
      return
    }

    setEmailError(null)
    setEmailConfirmError(null)
    setSubmitError(null)
    setSubmitting(true)

    const returnUrlParams = new URLSearchParams({
      email: trimmed,
      next: '/subscription/claim',
    })
    const returnUrl = `${PANEL_URL.replace(/\/$/, '')}/register?${returnUrlParams.toString()}`

    const result = await startPublicCheckout({
      plan_slug: selectedPlan,
      billing_interval: intervalValue,
      email: trimmed,
      return_url: returnUrl,
    })

    if (result.status && result.confirmation_url) {
      window.location.href = result.confirmation_url
      return
    }

    setSubmitError(result.message || 'Не удалось запустить оплату. Попробуйте ещё раз.')
    setSubmitting(false)
  }

  const getPrice = (plan: BillingPlan) => {
    const monthlyPrice = plan.monthlyPrice ?? plan.price
    // The annual view only renders when annualAvailable (every plan has a real
    // yearlyPrice), so the `?? monthlyPrice` guard is just belt-and-suspenders.
    return billingInterval === 'monthly' ? monthlyPrice : (plan.yearlyPrice ?? monthlyPrice)
  }

  /** Effective monthly cost when paying for a year. */
  const getYearlyMonthlyEquivalent = (plan: BillingPlan) => {
    const monthlyPrice = plan.monthlyPrice ?? plan.price
    return (plan.yearlyPrice ?? monthlyPrice * 12) / 12
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    // Mirror the loaded layout (header + toggle + 3-card grid) so the section
    // reserves the same height. Otherwise the grid popping in shifts everything
    // below it down ~750px, which causes a visible flicker during scroll.
    return (
      <section id="pricing" className="py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-4 py-2 text-sm font-medium text-accent mb-6">
              <Sparkles className="h-4 w-4" />
              Тарифы
            </div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
              Прозрачные тарифы
            </h2>
            <p className="mt-6 text-lg lg:text-xl text-muted-foreground">
              Выберите план под масштаб вашей команды и складских процессов.
            </p>
          </div>

          <div className="flex justify-center mb-16">
            <div className="h-[60px] w-[220px] rounded-2xl border border-border bg-card animate-pulse" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="min-h-[512px] rounded-3xl border border-border bg-card animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  const selectedPlanData = plans.find((p) => p.slug === selectedPlan)

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
            Тарифы
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Прозрачные тарифы
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground">
            Выберите план под масштаб вашей команды и складских процессов.
          </p>
        </div>

        {/* Billing toggle — only shown when annual pricing is actually offered. */}
        {annualAvailable && (
          <div className="flex justify-center mb-16">
            <div className="inline-flex items-center bg-card rounded-2xl p-1.5 border border-border shadow-sm">
              <button
                onClick={() => setBillingInterval('monthly')}
                className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${billingInterval === 'monthly'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                Месяц
              </button>
              <button
                onClick={() => setBillingInterval('yearly')}
                className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${billingInterval === 'yearly'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                Год
                <span className={`text-xs px-2 py-0.5 rounded-full ${billingInterval === 'yearly'
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-accent/20 text-accent'
                  }`}>
                  -17%
                </span>
              </button>
            </div>
          </div>
        )}

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
                className={`relative h-full bg-card rounded-2xl border-2 p-8 transition-all duration-300 ${plan.popular
                    ? 'border-primary shadow-2xl shadow-primary/10'
                    : 'border-border hover:border-primary/30 hover:shadow-xl'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg shadow-primary/25">
                      <Zap className="w-4 h-4" />
                      Популярный
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {index === 0 && 'Для небольшой команды'}
                    {index === 1 && 'Для растущих операций'}
                    {index === 2 && 'Для крупных компаний'}
                  </p>
                  <div className="mt-6">
                    <span className="text-5xl font-bold text-foreground">
                      {formatPrice(getPrice(plan))}
                    </span>
                    <span className="text-lg text-muted-foreground ml-1">
                      / {billingInterval === 'monthly' ? 'мес' : 'год'}
                    </span>
                  </div>
                  {billingInterval === 'yearly' && (
                    <p className="text-sm text-primary font-medium mt-2">
                      {formatPrice(getYearlyMonthlyEquivalent(plan))} в месяц при оплате за год
                    </p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features?.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.popular
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
                  className={`w-full h-12 text-base font-semibold transition-all duration-300 ${plan.popular
                      ? 'shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5'
                      : 'hover:-translate-y-0.5'
                    }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  Выбрать тариф
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          НДС рассчитывается по правилам вашего региона. Подписку можно изменить позже.
        </p>
      </div>

      {/* Checkout modal - email first, pay now */}
      {showAuthModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-md p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div
            className="relative bg-card rounded-3xl p-8 max-w-md w-full shadow-2xl border border-border animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              disabled={submitting}
              className="absolute top-5 right-5 size-9 min-w-9 shrink-0 rounded-full bg-muted text-muted-foreground flex items-center justify-center p-0 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Закрыть"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6 pr-12">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Оформление подписки
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Введите email — оплатим прямо сейчас, аккаунт создадите после оплаты.
                </p>
              </div>
            </div>

            {selectedPlanData && (
              <div className="bg-primary/5 rounded-xl p-4 mb-6 border border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Тариф {selectedPlanData.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(getPrice(selectedPlanData))} / {billingInterval === 'monthly' ? 'месяц' : 'год'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {PANEL_URL ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  startCheckout()
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="checkout-email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (emailError) setEmailError(null)
                      if (emailConfirmError) setEmailConfirmError(null)
                    }}
                    disabled={submitting}
                    placeholder="you@company.com"
                    className={`w-full h-12 px-4 rounded-xl border bg-background text-foreground outline-none transition-colors ${
                      emailError ? 'border-destructive' : 'border-border focus:border-primary'
                    }`}
                  />
                  {emailError && (
                    <p className="text-xs text-destructive mt-1.5">{emailError}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="checkout-email-confirm" className="block text-sm font-medium text-foreground mb-2">
                    Подтверждение email
                  </label>
                  <input
                    id="checkout-email-confirm"
                    type="email"
                    inputMode="email"
                    autoComplete="off"
                    required
                    value={emailConfirm}
                    onChange={(e) => {
                      setEmailConfirm(e.target.value)
                      if (emailConfirmError) setEmailConfirmError(null)
                    }}
                    disabled={submitting}
                    placeholder="you@company.com"
                    className={`w-full h-12 px-4 rounded-xl border bg-background text-foreground outline-none transition-colors ${
                      emailConfirmError ? 'border-destructive' : 'border-border focus:border-primary'
                    }`}
                  />
                  {emailConfirmError && (
                    <p className="text-xs text-destructive mt-1.5">{emailConfirmError}</p>
                  )}
                </div>

                {submitError && (
                  <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                    {submitError}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/25"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Открываем оплату...
                    </>
                  ) : (
                    'Перейти к оплате'
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Нажимая «Перейти к оплате», вы соглашаетесь с условиями подписки.
                </p>

                <div className="text-center text-sm text-muted-foreground">
                  Уже есть аккаунт?{' '}
                  <a
                    href={loginUrl || '#'}
                    className="text-primary font-medium hover:underline"
                  >
                    Войти и оформить
                  </a>
                </div>
              </form>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                Не настроен адрес панели. Укажите `NEXT_PUBLIC_PANEL_URL` в окружении.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
