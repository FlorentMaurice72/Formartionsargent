import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft, Clock, Calendar } from 'lucide-react'
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

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const categoryColor = CATEGORY_COLORS[article.category] ?? 'bg-zinc-500/20 text-zinc-400'

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
          <h3 className="font-black text-lg mb-2">Passe à l'action</h3>
          <p className="text-zinc-400 text-sm mb-5">
            Rejoins la plateforme et accède aux formations vidéo sur ce sujet et bien plus.
          </p>
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Voir les formations →
          </Link>
        </div>

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
