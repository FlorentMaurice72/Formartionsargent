import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const PRICES = {
  PREMIUM_MONTHLY: process.env.STRIPE_PREMIUM_PRICE_ID!,
  EBOOK: process.env.STRIPE_EBOOK_PRICE_ID!,
}
