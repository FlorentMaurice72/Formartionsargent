'use client'

import Link from 'next/link'
import { SignUpButton, useUser } from '@clerk/nextjs'
import { ArrowRight, Play, Star, Users, BookOpen } from 'lucide-react'

export function Hero() {
  const { isSignedIn } = useUser()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-orange-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-sm font-medium mb-8">
          <Star className="w-3.5 h-3.5 fill-yellow-400" />
          <span>La plateforme #1 d'éducation financière en France</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
          Atteins ta{' '}
          <span className="text-gradient">liberté financière</span>
          <br />
          en maîtrisant les{' '}
          <span className="relative inline-block">
            6 piliers
            <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Immobilier, Crypto, Bourse, Business — des formations vidéo concrètes,
          sans jargon inutile, pour construire ta richesse dès aujourd'hui.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          {isSignedIn ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-yellow-500/20"
            >
              Accéder à mes formations
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <SignUpButton mode="modal">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-yellow-500/20">
                Commencer gratuitement
                <ArrowRight className="w-4 h-4" />
              </button>
            </SignUpButton>
          )}
          <Link
            href="#pillars"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-medium text-base hover:bg-white/5 transition-colors"
          >
            <Play className="w-4 h-4 fill-white" />
            Voir les formations
          </Link>
        </div>

        {/* Social proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-yellow-400" />
            <span><strong className="text-white">+2 400</strong> apprenants actifs</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-yellow-400" />
            <span><strong className="text-white">6 modules</strong> · 24 vidéos</span>
          </div>
          <div className="flex items-center gap-1.5">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-1"><strong className="text-white">4.9/5</strong> — 180 avis</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  )
}
