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
  entitlements?: ApiPlanEntitlement[]
}

export interface ApiPlanEntitlement {
  code: string
  name?: string | null
  description?: string | null
  unit?: string | null
  is_enabled: boolean
  limit_value: number | null
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
 *
 * Fallback policy when the yearly price is missing:
 *   yearly = monthly * 10  (i.e. ~2 months free / ~17% off)
 * Kept in a single place so the display label and the toggle badge agree.
 */
const YEARLY_DISCOUNT_MONTHS_EQUIVALENT = 10

function transformApiPlanToBillingPlan(apiPlan: ApiPlan): BillingPlan {
  const monthlyPriceObj = apiPlan.prices.find((p) => p.billing_interval === BILLING_INTERVAL.MONTHLY)
  const yearlyPriceObj = apiPlan.prices.find((p) => p.billing_interval === BILLING_INTERVAL.YEARLY)

  const monthlyPrice = monthlyPriceObj ? monthlyPriceObj.amount / 100 : 0
  const yearlyPrice = yearlyPriceObj
    ? yearlyPriceObj.amount / 100
    : monthlyPrice * YEARLY_DISCOUNT_MONTHS_EQUIVALENT

  return {
    slug: apiPlan.slug,
    name: apiPlan.name,
    price: monthlyPrice,
    monthlyPrice,
    yearlyPrice,
    features: apiPlan.entitlements?.length
      ? getFeaturesFromEntitlements(apiPlan.entitlements)
      : getDefaultFeaturesForPlan(apiPlan.slug),
    popular: apiPlan.slug.toLowerCase().includes('growth') || apiPlan.slug.toLowerCase().includes('pro'),
  }
}

function getFeaturesFromEntitlements(entitlements: ApiPlanEntitlement[]): string[] {
  const roleOrder = [
    'seats_owner',
    'seats_admin',
    'seats_warehouse_manager',
    'seats_staff',
    'seats',
    'storage_gb',
  ]

  const roleSpecificCodes = new Set(['seats_owner', 'seats_admin', 'seats_warehouse_manager', 'seats_staff'])
  const hasRoleSpecificLimits = entitlements.some((item) => roleSpecificCodes.has(item.code) && item.is_enabled)

  return entitlements
    .filter((item) => item.is_enabled)
    .filter((item) => !(item.code === 'seats' && hasRoleSpecificLimits))
    .sort((a, b) => {
      const aIndex = roleOrder.indexOf(a.code)
      const bIndex = roleOrder.indexOf(b.code)
      return (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) - (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex)
    })
    .map(formatEntitlementLabel)
    .filter(Boolean) as string[]
}

function formatEntitlementLabel(entitlement: ApiPlanEntitlement): string | null {
  switch (entitlement.code) {
    case 'seats_owner':
      return formatSeatLimit(entitlement.limit_value, ['владельца', 'владельцев'])
    case 'seats_admin':
      return formatSeatLimit(entitlement.limit_value, ['администратора', 'администраторов'])
    case 'seats_warehouse_manager':
      return formatSeatLimit(entitlement.limit_value, ['кладовщика', 'кладовщиков'])
    case 'seats_staff':
      return formatSeatLimit(entitlement.limit_value, ['сотрудника', 'сотрудников'])
    case 'seats':
      return formatSeatLimit(entitlement.limit_value, ['пользователя', 'пользователей'])
    case 'storage_gb':
      return entitlement.limit_value === null ? 'Хранилище: без лимита' : `Хранилище: ${entitlement.limit_value} ГБ`
    default:
      if (entitlement.name && entitlement.limit_value !== null) {
        return `${entitlement.name}: ${entitlement.limit_value}`
      }
      return entitlement.name || entitlement.description || null
  }
}

function formatSeatLimit(limit: number | null, forms: [string, string]): string {
  if (limit === null) {
    return `Без лимита по ${forms[1]}`
  }

  return `До ${limit} ${limit === 1 ? forms[0] : forms[1]}`
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

export const YEARLY_DISCOUNT_RATIO = YEARLY_DISCOUNT_MONTHS_EQUIVALENT / 12

export interface StartCheckoutInput {
  plan_slug: string
  billing_interval: number
  email: string
  return_url: string
}

export interface StartCheckoutResult {
  status: boolean
  message?: string
  checkout_id?: string
  confirmation_url?: string
  provider?: string
}

/**
 * Create an unauthenticated public checkout session and return the YooKassa
 * confirmation URL. The caller is expected to redirect the browser to
 * `confirmation_url` immediately on success.
 *
 * After the user pays, YooKassa redirects them to `return_url` (the panel),
 * which finalizes the subscription via the auto-claim mechanism in the API.
 */
export async function startPublicCheckout(input: StartCheckoutInput): Promise<StartCheckoutResult> {
  if (!API_BASE_URL) {
    return { status: false, message: 'API is not configured.' }
  }

  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(input),
    })

    const data = (await response.json().catch(() => ({}))) as StartCheckoutResult

    if (!response.ok || !data?.status) {
      return {
        status: false,
        message: data?.message || `Checkout failed (${response.status})`,
      }
    }

    return data
  } catch (error) {
    console.error('Error starting public checkout:', error)
    return { status: false, message: 'Network error. Please try again.' }
  }
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

/**
 * Server-side variant of {@link fetchBillingPlans}. Calls the upstream billing
 * endpoint directly (absolute URL, no same-origin proxy) so the landing page
 * can render the real pricing cards in the initial HTML.
 *
 * This removes the client-side loading skeleton entirely. The skeleton could
 * never perfectly mirror the loaded card heights (feature lists are variable),
 * so when the async fetch resolved the pricing section grew and pushed the
 * sections below it down. If that shift landed mid-flight during a footer
 * anchor's smooth scroll, the browser followed the moving target — the page
 * would reach the right section and then drift downward. Rendering on the
 * server keeps the layout stable, so anchor navigation is deterministic.
 */
export async function fetchBillingPlansServer(currency = 'RUB'): Promise<FetchPlansResult> {
  if (!API_BASE_URL) {
    return { plans: mockPlans, currency: 'RUB' }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/billing/plans?currency=${currency}`, {
      headers: { Accept: 'application/json' },
      // Plans rarely change; mirror the /api/plans proxy's 5-minute cache.
      next: { revalidate: 300 },
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
    console.error('Error fetching billing plans (server):', error)
    return { plans: mockPlans, currency: 'RUB' }
  }
}

