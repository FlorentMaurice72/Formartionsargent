import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'FormationsArgent — Liberté Financière en 6 Piliers',
    template: '%s | FormationsArgent',
  },
  description: 'La plateforme de formation en éducation financière qui transforme votre rapport à l\'argent. Immobilier, Crypto, Bourse, Business — maîtrisez les 6 piliers de la liberté financière.',
  keywords: ['formation financière', 'liberté financière', 'investissement', 'immobilier', 'crypto', 'bourse', 'business'],
  authors: [{ name: 'FormationsArgent' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'FormationsArgent — Liberté Financière en 6 Piliers',
    description: 'La plateforme de formation en éducation financière qui transforme votre rapport à l\'argent.',
    siteName: 'FormationsArgent',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FormationsArgent — Liberté Financière en 6 Piliers',
    description: 'Maîtrisez les 6 piliers de la liberté financière.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="fr" className="dark">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
