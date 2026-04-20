import Link from 'next/link'
import { Lock, Play, CheckCircle } from 'lucide-react'
import { ProgressBar } from './ProgressBar'
import { cn } from '@/lib/utils'
import { PILLARS } from '@/lib/constants'

interface ModuleCardProps {
  slug: string
  title: string
  totalVideos: number
  completedVideos: number
  isPremium: boolean
  userIsPremium: boolean
}

export function ModuleCard({
  slug,
  title,
  totalVideos,
  completedVideos,
  isPremium,
  userIsPremium,
}: ModuleCardProps) {
  const pillar = PILLARS.find((p) => p.slug === slug)
  const progress = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0
  const isLocked = isPremium && !userIsPremium

  return (
    <Link
      href={`/modules/${slug}`}
      className={cn(
        'group relative p-5 rounded-2xl border transition-all duration-300 overflow-hidden block',
        isLocked
          ? 'border-white/5 bg-white/2 opacity-70'
          : 'border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20'
      )}
    >
      {/* gradient blob */}
      {pillar && (
        <div className={`absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br ${pillar.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
      )}

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            'w-11 h-11 rounded-xl flex items-center justify-center text-xl',
            pillar ? `bg-gradient-to-br ${pillar.color}` : 'bg-white/10'
          )}>
            {pillar?.icon ?? '📚'}
          </div>
          {isLocked ? (
            <Lock className="w-4 h-4 text-zinc-600" />
          ) : completedVideos === totalVideos && completedVideos > 0 ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : null}
        </div>

        <h3 className="font-bold text-sm mb-1">{title}</h3>
        <p className="text-xs text-zinc-500 mb-4">
          {completedVideos}/{totalVideos} vidéos complétées
        </p>

        <ProgressBar value={progress} />

        <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500">
          <Play className="w-3 h-3" />
          {isLocked ? (
            <span className="text-yellow-400/70">Premium requis</span>
          ) : progress === 0 ? (
            <span>Commencer</span>
          ) : (
            <span>Continuer</span>
          )}
        </div>
      </div>
    </Link>
  )
}
