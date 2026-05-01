import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft, Clock, Calendar, ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import { getArticleBySlug, ARTICLES, CATEGORY_COLORS } from '@/lib/blog-data'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticleBySlug(params.slug)
  if (!article) return { title: 'Article introuvable' }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
    },
  }
}

const CTAS: Record<string, { title: string; description: string; label: string; href: string; secondary?: { label: string; href: string } }> = {
  Bourse: {
    title: 'Prêt à investir en bourse ?',
    description: 'Accède aux formations vidéo sur les ETF, le PEA, la stratégie DCA et la construction d\'un portefeuille solide.',
    label: 'Voir la formation Bourse →',
    href: '/checkout?plan=premium',
    secondary: { label: 'Télécharger l\'ebook gratuit', href: '/checkout?plan=ebook' },
  },
  Immobilier: {
    title: 'Lance ton premier investissement locatif',
    description: 'Nos formations t\'accompagnent de la recherche du bien jusqu\'à la gestion du locataire, étape par étape.',
    label: 'Voir la formation Immobilier →',
    href: '/checkout?plan=premium',
    secondary: { label: 'Télécharger l\'ebook gratuit', href: '/checkout?plan=ebook' },
  },
  Crypto: {
    title: 'Maîtrise Bitcoin et les cryptomonnaies',
    description: 'Formations vidéo sur Bitcoin, la stratégie DCA, la sécurisation de tes actifs et la gestion du risque.',
    label: 'Voir la formation Crypto →',
    href: '/checkout?plan=premium',
    secondary: { label: 'Télécharger l\'ebook gratuit', href: '/checkout?plan=ebook' },
  },
  Business: {
    title: 'Crée ton premier revenu en ligne',
    description: 'De l\'idée au premier euro : freelance, affiliation, produit digital. Nos formations couvrent chaque modèle en détail.',
    label: 'Voir la formation Business →',
    href: '/checkout?plan=premium',
    secondary: { label: 'Télécharger l\'ebook gratuit', href: '/checkout?plan=ebook' },
  },
  Liberté: {
    title: 'Construis ton plan vers la liberté financière',
    description: 'L\'ebook Les 6 Piliers + toutes les formations vidéo : un plan complet et actionnable pour reprendre le contrôle de tes finances.',
    label: 'Télécharger l\'ebook — 19 € →',
    href: '/checkout?plan=ebook',
    secondary: { label: 'Voir toutes les formations', href: '/checkout?plan=premium' },
  },
}

const DEFAULT_CTA = {
  title: 'Passe à l\'action',
  description: 'Rejoins la plateforme et accède aux formations vidéo sur ce sujet et bien plus.',
  label: 'Voir les formations →',
  href: '/checkout?plan=premium',
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const categoryColor = CATEGORY_COLORS[article.category] ?? 'bg-zinc-500/20 text-zinc-400'
  const related = ARTICLES.filter(
    (a) => a.category === article.category && a.slug !== article.slug
  ).slice(0, 3)
  const cta = CTAS[article.category] ?? DEFAULT_CTA

  // Convert markdown-like content to paragraphs for display
  const sections = article.content
    .trim()
    .split('\n\n')
    .filter(Boolean)

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 max-w-3xl mx-auto px-4">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-10"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryColor}`}>
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-zinc-600">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
            <span className="flex items-center gap-1 text-xs text-zinc-600">
              <Calendar className="w-3 h-3" />
              {article.publishedAt}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-yellow-500/40 via-orange-500/40 to-transparent mb-10" />

        {/* Article body */}
        <article className="prose-custom space-y-5">
          {sections.map((block, i) => {
            if (block.startsWith('## ')) {
              return (
                <h2 key={i} className="text-xl font-bold text-white mt-10 mb-3 first:mt-0">
                  {block.replace('## ', '')}
                </h2>
              )
            }
            if (block.startsWith('> ')) {
              return (
                <blockquote
                  key={i}
                  className="border-l-2 border-yellow-500 pl-4 py-1 text-zinc-300 italic text-sm"
                >
                  {block.replace('> ', '')}
                </blockquote>
              )
            }
            if (block.startsWith('- ')) {
              const items = block.split('\n').filter((l) => l.startsWith('- '))
              return (
                <ul key={i} className="space-y-2">
                  {items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-zinc-300 text-sm">
                      <span className="text-yellow-400 mt-1 flex-shrink-0">→</span>
                      <span dangerouslySetInnerHTML={{ __html: formatInline(item.replace('- ', '')) }} />
                    </li>
                  ))}
                </ul>
              )
            }
            if (/^\d+\./.test(block)) {
              const items = block.split('\n').filter((l) => /^\d+\./.test(l))
              return (
                <ol key={i} className="space-y-2">
                  {items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-zinc-300 text-sm">
                      <span className="text-yellow-400 font-bold flex-shrink-0">{j + 1}.</span>
                      <span dangerouslySetInnerHTML={{ __html: formatInline(item.replace(/^\d+\.\s*/, '')) }} />
                    </li>
                  ))}
                </ol>
              )
            }
            if (block.startsWith('```')) {
              const code = block.replace(/```[\w]*/g, '').trim()
              return (
                <pre key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-zinc-300 overflow-x-auto font-mono">
                  {code}
                </pre>
              )
            }
            return (
              <p
                key={i}
                className="text-zinc-300 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatInline(block) }}
              />
            )
          })}
        </article>

        {/* CTA */}
        <div className="mt-16 p-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 text-center">
          <h3 className="font-black text-lg mb-2">{cta.title}</h3>
          <p className="text-zinc-400 text-sm mb-5">{cta.description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-sm hover:opacity-90 transition-opacity"
            >
              {cta.label}
            </Link>
            {cta.secondary && (
              <Link
                href={cta.secondary.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-zinc-300 text-sm hover:bg-white/5 transition-colors"
              >
                {cta.secondary.label}
              </Link>
            )}
          </div>
        </div>

        {/* Articles liés */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="font-bold text-lg mb-5">
              Dans la même catégorie —{' '}
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryColor}`}>
                {article.category}
              </span>
            </h3>
            <div className="space-y-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl border border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20 transition-all group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm group-hover:text-yellow-400 transition-colors truncate">
                      {rel.title}
                    </p>
                    <span className="flex items-center gap-1 text-xs text-zinc-600 mt-1">
                      <Clock className="w-3 h-3" />
                      {rel.readTime}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back bottom */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Tous les articles
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/10 text-yellow-300 text-xs font-mono">$1</code>')
}
