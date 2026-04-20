import Link from 'next/link'
import { BookOpen, Check, ArrowRight } from 'lucide-react'

const highlights = [
  'Les 10 erreurs qui empêchent 90% des gens de s\'enrichir',
  'Le plan d\'action en 90 jours pour ton premier investissement',
  'Les outils gratuits utilisés par les investisseurs pros',
  'Les stratégies fiscales légales pour payer moins d\'impôts',
  'Comment générer tes premiers 500€/mois passifs',
]

export function EbookSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Book mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-64 h-80 rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 shadow-2xl shadow-yellow-500/30 flex flex-col items-center justify-center p-8 text-black">
                <BookOpen className="w-16 h-16 mb-4" />
                <h3 className="font-black text-xl text-center leading-tight mb-2">
                  Les 6 Piliers de la Liberté Financière
                </h3>
                <p className="text-sm text-black/70 text-center">Guide complet 2024</p>
                <div className="mt-6 px-4 py-2 bg-black/20 rounded-lg text-sm font-bold">
                  EBOOK GRATUIT
                </div>
              </div>
              {/* Shadow */}
              <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/30 rounded-full blur-xl" />
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-xs font-medium mb-6">
              📚 LEAD MAGNET GRATUIT
            </div>
            <h2 className="text-4xl font-black mb-4">
              Télécharge ton guide gratuit et commence{' '}
              <span className="text-gradient">dès aujourd'hui</span>
            </h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Un ebook de 60 pages qui condense tout ce que tu dois savoir pour poser les bases de ta liberté financière, même en partant de zéro.
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-yellow-400" />
                  </div>
                  <span className="text-sm text-zinc-300">{h}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/ebook"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:opacity-90 transition-opacity shadow-lg shadow-yellow-500/20"
            >
              Obtenir l'ebook gratuit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="mt-3 text-xs text-zinc-600">
              Sans carte bancaire · Accès immédiat par email
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
