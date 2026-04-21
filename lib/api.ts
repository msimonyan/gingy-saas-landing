/**
 * Gingy SaaS API client - integrates with gingy-saas-api billing endpoints.
 * Uses Next.js API routes as proxy to avoid CORS (client -> /api/* -> backend).
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

// Billing interval values matching API BillingInterval enum
export const BILLING_INTERVAL = {
  MONTHLY: 1,
  YEARLY: 2,
  WEEKLY: 3,
} as const

export interface BillingPlanPrice {
  billing_interval: number
  billing_interval_label: string
  amount: number // in cents
  currency: string
  region_code: string
}

export interface ApiPlan {
  id: number
  slug: string
  name: string
  description: string | null
  prices: BillingPlanPrice[]
}

export interface BillingPlan {
  slug: string
  name: string
  price: number // in currency units (RUB), for display (monthly)
  monthlyPrice?: number
  yearlyPrice?: number // total yearly amount
  features?: string[]
  popular?: boolean
}

export interface PlansApiResponse {
  status: boolean
  currency: string
  plans: ApiPlan[]
}

// Mock pricing data for fallback when API is not configured
const mockPlans: BillingPlan[] = [
  {
    slug: 'starter',
    name: 'Starter',
    price: 990,
    monthlyPrice: 990,
    features: [
      'До 5 сотрудников',
      '1 склад',
      'Базовое управление задачами',
      'Доступ к мобильному приложению',
      'Поддержка по email',
    ],
    popular: false,
  },
  {
    slug: 'growth',
    name: 'Growth',
    price: 1990,
    monthlyPrice: 1990,
    features: [
      'До 25 сотрудников',
      'До 3 складов',
      'Расширенное управление задачами',
      'Учет остатков и поставок',
      'Панель аналитики',
      'Приоритетная поддержка',
      'Интеграционные возможности',
    ],
    popular: true,
  },
  {
    slug: 'enterprise',
    name: 'Enterprise',
    price: 4990,
    monthlyPrice: 4990,
    features: [
      'Безлимит по сотрудникам',
      'Безлимит по складам',
      'Индивидуальные интеграции',
      'Расширенная аналитика',
      'Выделенная поддержка',
      'SLA и сопровождение',
      'Индивидуальный онбординг',
    ],
    popular: false,
  },
]

/**
 * Transform API plan format to BillingPlan for the pricing UI.
 * Amount from API is in cents; we convert to display units.
 */
function transformApiPlanToBillingPlan(apiPlan: ApiPlan): BillingPlan {
  const monthlyPriceObj = apiPlan.prices.find((p) => p.billing_interval === BILLING_INTERVAL.MONTHLY)
  const yearlyPriceObj = apiPlan.prices.find((p) => p.billing_interval === BILLING_INTERVAL.YEARLY)

  const monthlyPrice = monthlyPriceObj ? monthlyPriceObj.amount / 100 : 0
  const yearlyPrice = yearlyPriceObj ? yearlyPriceObj.amount / 100 : monthlyPrice * 10 // ~2 months free

  return {
    slug: apiPlan.slug,
    name: apiPlan.name,
    price: monthlyPrice,
    monthlyPrice,
    yearlyPrice,
    features: getDefaultFeaturesForPlan(apiPlan.slug),
    popular: apiPlan.slug.toLowerCase().includes('growth') || apiPlan.slug.toLowerCase().includes('pro'),
  }
}

function getDefaultFeaturesForPlan(slug: string): string[] {
  const s = slug.toLowerCase()
  if (s.includes('starter')) {
    return ['До 5 сотрудников', '1 склад', 'Базовое управление задачами', 'Доступ к мобильному приложению', 'Поддержка по email']
  }
  if (s.includes('growth') || s.includes('pro')) {
    return ['До 25 сотрудников', 'До 3 складов', 'Расширенное управление задачами', 'Учет остатков и поставок', 'Панель аналитики', 'Приоритетная поддержка', 'Интеграционные возможности']
  }
  if (s.includes('enterprise')) {
    return ['Безлимит по сотрудникам', 'Безлимит по складам', 'Индивидуальные интеграции', 'Расширенная аналитика', 'Выделенная поддержка', 'SLA и сопровождение', 'Индивидуальный онбординг']
  }
  return []
}


export interface FetchPlansResult {
  plans: BillingPlan[]
  currency: string
}

/**
 * Fetch billing plans from the API.
 * GET /api/billing/plans
 * Response: { status: true, currency: string, plans: ApiPlan[] }
 */
export async function fetchBillingPlans(currency = 'RUB'): Promise<FetchPlansResult> {
  if (!API_BASE_URL) {
    return { plans: mockPlans, currency: 'RUB' }
  }

  try {
    // Use same-origin proxy to avoid CORS
    const response = await fetch(`/api/plans?currency=${currency}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch billing plans: ${response.status}`)
    }

    const data: PlansApiResponse = await response.json()

    if (!data.status || !Array.isArray(data.plans)) {
      return { plans: mockPlans, currency: data.currency ?? 'RUB' }
    }

    return {
      plans: data.plans.map(transformApiPlanToBillingPlan),
      currency: data.currency ?? 'RUB',
    }
  } catch (error) {
    console.error('Error fetching billing plans:', error)
    return { plans: mockPlans, currency: 'RUB' }
  }
}

