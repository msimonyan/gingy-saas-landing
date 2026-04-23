import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

/**
 * Server-side proxy for the public checkout endpoint.
 *
 * Keeps browser -> same-origin to avoid CORS and lets us forward the client IP
 * so the `throttle:billing` group on the Laravel API can rate-limit effectively.
 */
export async function POST(request: NextRequest) {
  if (!API_BASE_URL) {
    return NextResponse.json(
      { status: false, message: 'API is not configured.' },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { status: false, message: 'Invalid JSON payload.' },
      { status: 400 }
    )
  }

  const forwardedFor =
    request.headers.get('x-forwarded-for') ??
    request.headers.get('x-real-ip') ??
    ''

  try {
    const res = await fetch(`${API_BASE_URL}/api/billing/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(forwardedFor ? { 'X-Forwarded-For': forwardedFor } : {}),
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    })

    const data = await res.json().catch(() => ({}))
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.error('[api/checkout] Proxy error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to start checkout.' },
      { status: 502 }
    )
  }
}
