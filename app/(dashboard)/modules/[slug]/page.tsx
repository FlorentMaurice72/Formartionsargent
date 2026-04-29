import { auth } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { Play, Lock, CheckCircle, Clock, ChevronLeft } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { ProgressBar } from '@/components/dashboard/ProgressBar'
import { formatDuration } from '@/lib/utils'
import { PILLARS } from '@/lib/constants'

async function getModuleData(slug: string, clerkId: string) {
  const [user, module] = await Promise.all([
    prisma.user.findUnique({
      where: { clerkId },
      include: { progress: { where: { completed: true }, select: { videoId: true } } },
    }),
    prisma.module.findUnique({
      where: { slug },
      include: { videos: { orderBy: { order: 'asc' } } },
    }),
  ])

  return { user, module }
}

export default async function ModulePage({ params }: { params: { slug: string } }) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const { user, module } = await getModuleData(params.slug, userId)
  if (!module) notFound()

  const isPremium = user?.isPremium ?? false
  const completedIds = new Set(user?.progress.map((p) => p.videoId) ?? [])
  const completedCount = module.videos.filter((v) => completedIds.has(v.id)).length
  const progress = (completedCount / module.videos.length) * 100
  const pillar = PILLARS.find((p) => p.slug === params.slug)

  return (
    <div className="max-w-4xl space-y-8">
      {/* Back */}
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
        <ChevronLeft className="w-4 h-4" />
        Retour au dashboard
      </Link>

      {/* Module header */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/3">
        <div className="flex items-start gap-5">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${pillar ? `bg-gradient-to-br ${pillar.color}` : 'bg-white/10'}`}>
            {pillar?.icon ?? '📚'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black">{module.title}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-zinc-400 capitalize">
                {module.level === 'BEGINNER' ? 'Débutant' : module.level === 'INTERMEDIATE' ? 'Intermédiaire' : 'Avancé'}
              </span>
            </div>
            <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{module.description}</p>
            <div className="flex items-center gap-4 text-xs text-zinc-500">
              <span>{module.videos.length} vidéos</span>
              <span>·</span>
              <span>{completedCount} terminées</span>
              <span>·</span>
              <span>{Math.round(progress)}% complété</span>
            </div>
          </div>
        </div>
        <ProgressBar value={progress} className="mt-5" size="md" showLabel />
      </div>

      {/* Premium upsell */}
      {!isPremium && (
        <div className="p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            <Lock className="inline w-4 h-4 text-yellow-400 mr-1.5" />
            <strong className="text-yellow-400">3 vidéos verrouillées</strong> — Passe Premium pour tout débloquer.
          </p>
          <Link
            href="/checkout?plan=premium"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-bold whitespace-nowrap"
          >
            Débloquer tout →
          </Link>
        </div>
      )}

      {/* Video list */}
      <div className="space-y-3">
        <h2 className="font-bold text-lg">Contenu du module</h2>
        {module.videos.map((video, index) => {
          const isAccessible = video.isFree || isPremium
          const isCompleted = completedIds.has(video.id)

          return (
            <div key={video.id}>
              {isAccessible ? (
                <Link
                  href={`/modules/${params.slug}/${video.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20 transition-all group"
                >
                  <VideoCardInner
                    index={index}
                    title={video.title}
                    description={video.description}
                    duration={video.duration}
                    isFree={video.isFree}
                    isCompleted={isCompleted}
                    isAccessible
                  />
                </Link>
              ) : (
                <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/2 opacity-60 cursor-not-allowed">
                  <VideoCardInner
                    index={index}
                    title={video.title}
                    description={video.description}
                    duration={video.duration}
                    isFree={video.isFree}
                    isCompleted={isCompleted}
                    isAccessible={false}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function VideoCardInner({
  index, title, description, duration, isFree, isCompleted, isAccessible,
}: {
  index: number; title: string; description: string | null; duration: number | null;
  isFree: boolean; isCompleted: boolean; isAccessible: boolean;
}) {
  return (
    <>
      {/* Number / icon */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold bg-white/10">
        {isCompleted ? (
          <CheckCircle className="w-5 h-5 text-green-400" />
        ) : isAccessible ? (
          <Play className="w-4 h-4" />
        ) : (
          <Lock className="w-4 h-4 text-zinc-600" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="font-semibold text-sm truncate">{title}</p>
          {isFree && (
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 flex-shrink-0">
              Gratuit
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-zinc-500 truncate">{description}</p>
        )}
      </div>

      {/* Duration */}
      {duration && (
        <div className="flex items-center gap-1 text-xs text-zinc-600 flex-shrink-0">
          <Clock className="w-3 h-3" />
          {formatDuration(duration)}
        </div>
      )}
    </>
  )
}
