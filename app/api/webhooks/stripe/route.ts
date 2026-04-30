import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { getStripe, isStripeConfigured } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  if (!isStripeConfigured() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
  }

  const body = await req.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId
      const plan = session.metadata?.plan

      if (!userId || !plan) break

      if (plan === 'premium') {
        await prisma.user.update({
          where: { id: userId },
          data: { isPremium: true },
        })
      }

      await prisma.purchase.create({
        data: {
          userId,
          type: plan === 'premium' ? 'PREMIUM' : 'EBOOK',
          stripeSessionId: session.id,
          stripePaymentId: session.payment_intent as string | undefined,
          amount: session.amount_total ?? 0,
          status: 'COMPLETED',
        },
      })
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      const sessions = await getStripe().checkout.sessions.list({ customer: customerId, limit: 1 })
      const userId = sessions.data[0]?.metadata?.userId
      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: { isPremium: false },
        })
      }
      break
    }

    case 'invoice.payment_failed': {
      break
    }
  }

  return NextResponse.json({ received: true })
}
