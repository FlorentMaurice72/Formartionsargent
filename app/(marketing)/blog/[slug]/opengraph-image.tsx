import { ImageResponse } from 'next/og'
import { getArticleBySlug, ARTICLES } from '@/lib/blog-data'

export const runtime = 'edge'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'FormationsArgent'

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Bourse:     { bg: '#052e16', text: '#4ade80', border: '#16a34a' },
  Immobilier: { bg: '#431407', text: '#fb923c', border: '#ea580c' },
  Crypto:     { bg: '#422006', text: '#fbbf24', border: '#d97706' },
  Business:   { bg: '#172554', text: '#60a5fa', border: '#2563eb' },
  Liberté:    { bg: '#3b0764', text: '#c084fc', border: '#9333ea' },
}

const DEFAULT_COLOR = { bg: '#18181b', text: '#a1a1aa', border: '#52525b' }

export default function Image({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  const colors = article ? (CATEGORY_COLORS[article.category] ?? DEFAULT_COLOR) : DEFAULT_COLOR

  const title = article?.title ?? 'FormationsArgent'
  const category = article?.category ?? ''
  const excerpt = article?.excerpt ?? 'Éducation financière pour la liberté financière.'
  const readTime = article?.readTime ?? ''

  return new ImageResponse(
    <div
      style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#09090b',
        fontFamily: 'sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradient top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: 'linear-gradient(90deg, #facc15, #f97316)',
        }}
      />

      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-120px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.border}22 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          height: '100%',
        }}
      >
        {/* Top: category + read time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {category && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: '999px',
                padding: '6px 18px',
                color: colors.text,
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              {category}
            </div>
          )}
          {readTime && (
            <div style={{ color: '#71717a', fontSize: '16px' }}>
              {readTime} de lecture
            </div>
          )}
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            style={{
              color: '#ffffff',
              fontSize: title.length > 60 ? '44px' : '52px',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: '#a1a1aa',
              fontSize: '20px',
              lineHeight: 1.5,
              maxWidth: '780px',
              overflow: 'hidden',
              display: '-webkit-box',
            }}
          >
            {excerpt.length > 120 ? excerpt.slice(0, 120) + '…' : excerpt}
          </div>
        </div>

        {/* Bottom: site name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #facc15, #f97316)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 900,
                color: '#000',
              }}
            >
              F
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#ffffff', fontSize: '20px', fontWeight: 700 }}>
                FormationsArgent
              </span>
              <span style={{ color: '#52525b', fontSize: '14px' }}>
                formationsargent.fr
              </span>
            </div>
          </div>
          <div
            style={{
              color: '#3f3f46',
              fontSize: '14px',
              borderLeft: '1px solid #27272a',
              paddingLeft: '24px',
            }}
          >
            Éducation financière
          </div>
        </div>
      </div>
    </div>,
    { ...size },
  )
}
