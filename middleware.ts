import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  // Routes accessibles sans connexion
  publicRoutes: [
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
  ],
  // Routes ignorées par le middleware (assets, etc.)
  ignoredRoutes: [
    '/_next/(.*)',
    '/favicon.ico',
    '/api/modules',
  ],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
