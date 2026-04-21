'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Loader2, Sparkles, X, Zap } from 'lucide-react'
import { fetchBillingPlans, BILLING_INTERVAL, type BillingPlan } from '@/lib/api'

const PANEL_URL = process.env.NEXT_PUBLIC_PANEL_URL || ''

export function PricingSection() {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly')
  const [plans, setPlans] = useState<BillingPlan[]>([])
  const [currency, setCurrency] = useState('RUB')
  const [loading, setLoading] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  useEffect(() => {
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
  }, [])

  const handleSelectPlan = (planSlug: string) => {
    setSelectedPlan(planSlug)
    setShowAuthModal(true)
  }

  const buildAuthUrl = (path: 'login' | 'register') => {
    if (!PANEL_URL || !selectedPlan) return '#'
    const interval = billingInterval === 'monthly' ? BILLING_INTERVAL.MONTHLY : BILLING_INTERVAL.YEARLY
    const base = PANEL_URL.replace(/\/$/, '')
    const params = new URLSearchParams({
      plan_slug: selectedPlan,
      billing_interval: String(interval),
      next: '/billing/checkout/start',
    })
    return `${base}/${path}?${params.toString()}`
  }

  const getPrice = (plan: BillingPlan) => {
    const monthlyPrice = plan.monthlyPrice ?? plan.price
    const yearlyPrice = plan.yearlyPrice ?? Math.round(monthlyPrice * 10) // ~2 months free fallback
    return billingInterval === 'monthly' ? monthlyPrice : yearlyPrice
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
    return (
      <section id="pricing" className="py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
          <p className="text-muted-foreground">Загрузка тарифов...</p>
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
            Тарифы
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Прозрачные тарифы
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground">
            Выберите план под масштаб вашей команды и складских процессов.
          </p>
        </div>

        {/* Billing toggle */}
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
                      {formatPrice(plan.monthlyPrice ?? plan.price)} в месяц при оплате за год
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

      {/* Auth Modal - redirect to panel login/register */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-md p-4">
          <div
            className="bg-card rounded-3xl p-8 max-w-md w-full shadow-2xl border border-border animate-fade-up"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Продолжить оформление
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Войдите или создайте аккаунт, чтобы продолжить с тарифом {plans.find((p) => p.slug === selectedPlan)?.name}
                </p>
              </div>
              <button
                onClick={() => setShowAuthModal(false)}
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
                    Тариф {plans.find((p) => p.slug === selectedPlan)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(getPrice(plans.find((p) => p.slug === selectedPlan) || { slug: '', name: '', price: 0 }))} / {billingInterval === 'monthly' ? 'месяц' : 'год'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {PANEL_URL ? (
                <>
                  <Button
                    asChild
                    className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/25"
                  >
                    <a href={buildAuthUrl('register')}>
                      Создать аккаунт
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-12 text-base font-semibold"
                  >
                    <a href={buildAuthUrl('login')}>
                      Войти
                    </a>
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Не настроен адрес панели. Укажите `NEXT_PUBLIC_PANEL_URL` в окружении.
                </p>
              )}

              <button
                onClick={() => setShowAuthModal(false)}
                className="w-full py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
