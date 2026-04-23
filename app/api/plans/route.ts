import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export async function GET(request: NextRequest) {
  if (!API_BASE_URL) {
    return NextResponse.json({ status: false, plans: [] })
  }

  const { searchParams } = new URL(request.url)
  const currency = searchParams.get('currency') || 'RUB'

  try {
    const res = await fetch(`${API_BASE_URL}/api/billing/plans?currency=${currency}`, {
      headers: { Accept: 'application/json' },
      // Plans rarely change; cache at the edge for 5 minutes to keep the
      // landing page fast and avoid hammering the throttled billing route.
      next: { revalidate: 300 },
    })
    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('[api/plans] Proxy error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to fetch plans' },
      { status: 502 }
    )
  }
}
