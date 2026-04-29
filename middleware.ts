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
  '/api/modules',
  '/mentions-legales',
  '/cgu',
  '/politique-confidentialite',
])

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth.protect()
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
