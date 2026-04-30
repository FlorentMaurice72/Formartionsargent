'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Navbar } from '@/components/shared/Navbar'
import { Shield, Check, Loader2 } from 'lucide-react'
import { useUser, SignUpButton } from '@clerk/nextjs'

const PLANS = {
  premium: {
    name: 'Accès Premium',
    price: '49€/mois',
    features: ['24 vidéos de formation', 'Ebook inclus (valeur 19€)', 'Discord privé', 'Live Q&A mensuel'],
    cta: 'Passer Premium maintenant',
  },
  ebook: {
    name: 'Ebook — Les 6 Piliers',
    price: '19€',
    features: ['60 pages de stratégies', 'Accès PDF immédiat', "Plan d'action 90 jours", 'Mises à jour incluses'],
    cta: "Acheter l'ebook",
  },
}

export function CheckoutContent() {
  const searchParams = useSearchParams()
  const plan = (searchParams.get('plan') ?? 'premium') as keyof typeof PLANS
  const billing = searchParams.get('billing') ?? 'monthly'
  const { isSignedIn } = useUser()
  const [loading, setLoading] = useState(false)

  const planInfo = PLANS[plan] ?? PLANS.premium

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, billing }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="p-8 rounded-2xl border border-white/10 bg-white/3 space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-black mb-1">{planInfo.name}</h1>
              <p className="text-4xl font-black text-gradient">{planInfo.price}</p>
              {plan === 'premium' && billing === 'yearly' && (
                <p className="text-sm text-zinc-400 mt-1">ou 399€/an · économisez 189€</p>
              )}
            </div>

            <ul className="space-y-3">
              {planInfo.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span className="text-zinc-300">{f}</span>
                </li>
              ))}
            </ul>

            {isSignedIn ? (
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-base hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {loading ? 'Redirection...' : planInfo.cta}
              </button>
            ) : (
              <SignUpButton mode="modal">
                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-base hover:opacity-90 transition-opacity">
                  Créer un compte pour continuer
                </button>
              </SignUpButton>
            )}

            <div className="flex items-center justify-center gap-2 text-xs text-zinc-600">
              <Shield className="w-3.5 h-3.5" />
              <span>Paiement sécurisé SSL · Stripe · Remboursement 7 jours</span>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
