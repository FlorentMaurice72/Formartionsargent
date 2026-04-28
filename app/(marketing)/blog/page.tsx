import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { ARTICLES, CATEGORY_COLORS } from '@/lib/blog-data'

export const metadata = {
  title: 'Blog — Éducation Financière',
  description:
    'Stratégies, analyses et conseils pour construire ta liberté financière : bourse, immobilier, crypto, business.',
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-3">
            Blog — <span className="text-gradient">Éducation Financière</span>
          </h1>
          <p className="text-zinc-400">
            Stratégies, analyses et conseils pour construire ta liberté financière.
          </p>
        </div>

        <div className="space-y-5">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block p-6 rounded-2xl border border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20 transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        CATEGORY_COLORS[article.category] ?? ''
                      }`}
                    >
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-zinc-600">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h2 className="font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-zinc-400 leading-relaxed">{article.excerpt}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
