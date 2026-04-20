import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { plan, billing } = await req.json()

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  if (plan === 'premium') {
    const priceId =
      billing === 'yearly'
        ? process.env.STRIPE_PREMIUM_YEARLY_PRICE_ID!
        : process.env.STRIPE_PREMIUM_PRICE_ID!

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/dashboard?upgrade=success`,
      cancel_url: `${appUrl}/checkout?plan=premium&canceled=true`,
      metadata: { userId: user.id, plan: 'premium' },
      locale: 'fr',
    })

    return NextResponse.json({ url: session.url })
  }

  if (plan === 'ebook') {
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: process.env.STRIPE_EBOOK_PRICE_ID!, quantity: 1 }],
      success_url: `${appUrl}/dashboard?ebook=success`,
      cancel_url: `${appUrl}/checkout?plan=ebook&canceled=true`,
      metadata: { userId: user.id, plan: 'ebook' },
      locale: 'fr',
    })

    return NextResponse.json({ url: session.url })
  }

  return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
}
