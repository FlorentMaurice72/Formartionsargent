import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-black" />
              </div>
              <span className="text-gradient">FormationsArgent</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed">
              La plateforme qui transforme votre rapport à l'argent grâce aux 6 piliers de la liberté financière.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-zinc-300">Formations</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              {['Immobilier', 'Crypto & Web3', 'Bourse', 'Business en ligne', 'Business physique', 'Meta-Learning'].map((f) => (
                <li key={f}>
                  <Link href={`/modules/${f.toLowerCase().replace(/ /g, '-').replace('&', '').replace('--', '-')}`} className="hover:text-yellow-400 transition-colors">
                    {f}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-zinc-300">Ressources</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/ebook" className="hover:text-yellow-400 transition-colors">Ebook gratuit</Link></li>
              <li><Link href="/blog" className="hover:text-yellow-400 transition-colors">Blog</Link></li>
              <li><Link href="/#pricing" className="hover:text-yellow-400 transition-colors">Tarifs</Link></li>
              <li><Link href="/#testimonials" className="hover:text-yellow-400 transition-colors">Témoignages</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-zinc-300">Légal</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/mentions-legales" className="hover:text-yellow-400 transition-colors">Mentions légales</Link></li>
              <li><Link href="/cgu" className="hover:text-yellow-400 transition-colors">CGU</Link></li>
              <li><Link href="/politique-confidentialite" className="hover:text-yellow-400 transition-colors">Confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} FormationsArgent. Tous droits réservés.</p>
          <p>Les investissements comportent des risques. Les performances passées ne garantissent pas les résultats futurs.</p>
        </div>
      </div>
    </footer>
  )
}
