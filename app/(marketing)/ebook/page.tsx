'use client'

import { useState } from 'react'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import { BookOpen, Check, ArrowRight } from 'lucide-react'

export default function EbookPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: integrate email provider (Resend / Mailchimp)
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-4xl mb-6 shadow-xl shadow-yellow-500/20">
            📘
          </div>
          <h1 className="text-4xl font-black mb-4">
            Obtiens ton ebook{' '}
            <span className="text-gradient">gratuitement</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            60 pages de stratégies concrètes pour poser les bases de ta liberté financière.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {[
            'Les 10 erreurs à éviter absolument',
            'Plan d\'action 90 jours',
            'Outils gratuits des investisseurs pros',
            'Stratégies fiscales légales',
            'Premiers 500€/mois passifs',
            'Mindset et habitudes des riches',
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <Check className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              <span className="text-sm text-zinc-300">{item}</span>
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="text-center p-8 rounded-2xl border border-green-500/30 bg-green-500/10">
            <div className="text-4xl mb-3">✅</div>
            <h2 className="text-xl font-bold mb-2">Vérifie ton email !</h2>
            <p className="text-zinc-400">Ton ebook a été envoyé à <strong className="text-white">{email}</strong></p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-yellow-500/30 bg-yellow-500/5">
            <h3 className="font-bold text-lg mb-5 text-center">Reçois l'ebook par email</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="ton@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-500 transition-colors"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Recevoir l'ebook
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-zinc-600 text-center mt-3">
              Aucun spam. Désabonnement en 1 clic.
            </p>
          </form>
        )}
      </main>
      <Footer />
    </>
  )
}
