import Link from 'next/link'
import { ArrowRight, Lock } from 'lucide-react'
import { PILLARS } from '@/lib/constants'

export function Pillars() {
  return (
    <section id="pillars" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-black mb-4">
          Les 6 piliers de la{' '}
          <span className="text-gradient">liberté financière</span>
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Chaque pilier est un module complet avec 4 vidéos, des exercices pratiques et une progression sauvegardée.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PILLARS.map((pillar, i) => (
          <Link
            key={pillar.slug}
            href={`/modules/${pillar.slug}`}
            className="group relative p-6 rounded-2xl border border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20 transition-all duration-300 overflow-hidden"
          >
            {/* Gradient blob */}
            <div className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${pillar.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />

            <div className="relative">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} text-2xl mb-4 shadow-lg`}>
                {pillar.icon}
              </div>

              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">{pillar.title}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-zinc-400">
                  4 vidéos
                </span>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                {pillar.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <div className="flex items-center gap-1 text-green-400">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    1 gratuite
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    3 premium
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-zinc-500 text-sm">
          ✓ Accès immédiat · ✓ Progression sauvegardée · ✓ Mobile & Desktop
        </p>
      </div>
    </section>
  )
}
