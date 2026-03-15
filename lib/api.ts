const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export interface BillingPlan {
  slug: string
  name: string
  price: number
  features?: string[]
  popular?: boolean
}

export interface CheckoutResponse {
  confirmation_url: string
}

export interface CheckoutPayload {
  plan_slug: string
  billing_interval: 'monthly' | 'yearly'
  email: string
  return_url: string
}

// Mock pricing data for fallback
const mockPlans: BillingPlan[] = [
  {
    slug: 'starter',
    name: 'Starter',
    price: 990,
    features: [
      'Up to 5 workers',
      '1 warehouse',
      'Basic task management',
      'Email support',
      'Mobile app access',
    ],
    popular: false,
  },
  {
    slug: 'growth',
    name: 'Growth',
    price: 1990,
    features: [
      'Up to 25 workers',
      '3 warehouses',
      'Advanced task management',
      'Inventory tracking',
      'Analytics dashboard',
      'Priority support',
      'API access',
    ],
    popular: true,
  },
  {
    slug: 'enterprise',
    name: 'Enterprise',
    price: 4990,
    features: [
      'Unlimited workers',
      'Unlimited warehouses',
      'Custom integrations',
      'Advanced analytics',
      'Dedicated support',
      'SLA guarantee',
      'Custom onboarding',
    ],
    popular: false,
  },
]

export async function fetchBillingPlans(): Promise<BillingPlan[]> {
  if (!API_BASE_URL) {
    return mockPlans
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/billing/plans`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch billing plans')
    }

    const data = await response.json()
    return data.data || mockPlans
  } catch (error) {
    console.error('Error fetching billing plans:', error)
    return mockPlans
  }
}

export async function createCheckout(payload: CheckoutPayload): Promise<CheckoutResponse> {
  if (!API_BASE_URL) {
    // Mock checkout - redirect to a demo page
    return {
      confirmation_url: `${window.location.origin}/checkout/demo?plan=${payload.plan_slug}`,
    }
  }

  const response = await fetch(`${API_BASE_URL}/api/billing/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Failed to create checkout')
  }

  return response.json()
}
