'use client'

import { useState } from 'react'
import { SignUpButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Check, Zap, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

const FREE_FEATURES = [
  '1 vidéo gratuite par module (6 vidéos)',
  'Accès au blog et aux articles',
  'Téléchargement de l\'ebook gratuit',
  'Tableau de bord personnel',
]

const PREMIUM_FEATURES = [
  'Toutes les vidéos de tous les modules (24 vidéos)',
  'Ebook premium inclus (valeur 19€)',
  'Progression et badges sauvegardés',
  'Nouvelles formations chaque mois',
  'Accès au Discord privé',
  'Q&A mensuel en live',
  'Support prioritaire',
]

export function PricingSection() {
  const { isSignedIn } = useUser()
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <h2 className="text-4xl sm:text-5xl font-black mb-4">
          Simple, transparent,{' '}
          <span className="text-gradient">sans surprise</span>
        </h2>
        <p className="text-zinc-400 text-lg mb-8">
          Commence gratuitement, passe premium quand tu es prêt.
        </p>

        {/* Billing toggle */}
        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
          {(['monthly', 'yearly'] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              className={cn(
                'px-5 py-2 rounded-lg text-sm font-medium transition-all',
                billing === b
                  ? 'bg-white text-black shadow'
                  : 'text-zinc-400 hover:text-white'
              )}
            >
              {b === 'monthly' ? 'Mensuel' : 'Annuel'}
              {b === 'yearly' && (
                <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400">
                  -32%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Free */}
        <div className="p-8 rounded-2xl border border-white/10 bg-white/3 flex flex-col">
          <div className="mb-6">
            <p className="text-sm font-medium text-zinc-400 mb-1">Gratuit</p>
            <div className="flex items-end gap-1">
              <span className="text-5xl font-black">0€</span>
            </div>
            <p className="text-sm text-zinc-500 mt-1">Pour toujours, sans carte</p>
          </div>

          <ul className="space-y-3 mb-8 flex-1">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
                <span className="text-zinc-300">{f}</span>
              </li>
            ))}
          </ul>

          {isSignedIn ? (
            <Link
              href="/dashboard"
              className="w-full py-3 rounded-xl border border-white/20 text-center text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              Accéder au dashboard
            </Link>
          ) : (
            <SignUpButton mode="modal">
              <button className="w-full py-3 rounded-xl border border-white/20 text-sm font-semibold hover:bg-white/5 transition-colors">
                Commencer gratuitement
              </button>
            </SignUpButton>
          )}
        </div>

        {/* Premium */}
        <div className="relative p-8 rounded-2xl border border-yellow-500/50 bg-gradient-to-b from-yellow-500/10 to-orange-500/5 flex flex-col overflow-hidden">
          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400 text-black text-xs font-bold">
            <Zap className="w-3 h-3" />
            POPULAIRE
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-zinc-400 mb-1">Premium</p>
            <div className="flex items-end gap-1">
              <span className="text-5xl font-black text-gradient">
                {billing === 'monthly' ? '49€' : '33€'}
              </span>
              <span className="text-zinc-400 mb-2">/mois</span>
            </div>
            <p className="text-sm text-zinc-500 mt-1">
              {billing === 'yearly' ? 'Facturé 399€/an · économisez 189€' : 'Sans engagement · résiliable à tout moment'}
            </p>
          </div>

          <ul className="space-y-3 mb-8 flex-1">
            {PREMIUM_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-zinc-200">{f}</span>
              </li>
            ))}
          </ul>

          <Link
            href={`/checkout?plan=premium&billing=${billing}`}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-center text-sm font-bold text-black hover:opacity-90 transition-opacity shadow-lg shadow-yellow-500/20"
          >
            Passer Premium →
          </Link>
          <p className="text-center text-xs text-zinc-600 mt-3">
            Paiement sécurisé par Stripe · Satisfait ou remboursé 7 jours
          </p>
        </div>
      </div>

      {/* Ebook upsell */}
      <div className="mt-8 max-w-4xl mx-auto p-5 rounded-xl border border-white/10 bg-white/3 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
            📘
          </div>
          <div>
            <p className="font-semibold text-sm">Ebook « Les 6 Piliers »</p>
            <p className="text-xs text-zinc-400">Guide PDF complet · 60 pages · Accès immédiat</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg font-black">19€</span>
          <Link
            href="/checkout?plan=ebook"
            className="px-5 py-2 rounded-lg border border-white/20 text-sm font-semibold hover:bg-white/5 transition-colors whitespace-nowrap"
          >
            Acheter l'ebook
          </Link>
        </div>
      </div>
    </section>
  )
}
