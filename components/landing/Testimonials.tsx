import { Star } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-black mb-4">
          Ils ont transformé{' '}
          <span className="text-gradient">leur vie financière</span>
        </h2>
        <p className="text-zinc-400 text-lg">
          Rejoins les milliers d'apprenants qui construisent leur liberté financière.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="p-6 rounded-2xl border border-white/10 bg-white/3 flex flex-col gap-4"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed flex-1">
              "{t.text}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-bold text-black">
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-zinc-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
