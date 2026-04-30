import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/ebook',
  '/blog',
  '/blog/(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/checkout',
  '/api/webhooks/stripe',
  '/api/webhooks/clerk',
  '/mentions-legales',
  '/cgu',
  '/politique-confidentialite',
  '/api/modules',
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
