import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Zap, Trophy, Flame, Play } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { ModuleCard } from '@/components/dashboard/ModuleCard'
import { ProgressBar } from '@/components/dashboard/ProgressBar'

async function getDashboardData(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      progress: { where: { completed: true }, select: { videoId: true } },
      purchases: { where: { status: 'COMPLETED' } },
    },
  })

  const modules = await prisma.module.findMany({
    orderBy: { order: 'asc' },
    include: {
      videos: { select: { id: true, isFree: true } },
    },
  })

  const totalVideos = modules.reduce((acc, m) => acc + m.videos.length, 0)
  const completedIds = new Set(user?.progress.map((p) => p.videoId) ?? [])
  const completedTotal = modules.reduce(
    (acc, m) => acc + m.videos.filter((v) => completedIds.has(v.id)).length,
    0
  )

  return {
    user,
    modules,
    completedIds,
    totalVideos,
    completedTotal,
    isPremium: user?.isPremium ?? false,
  }
}

export default async function DashboardPage() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const { user, modules, completedIds, totalVideos, completedTotal, isPremium } =
    await getDashboardData(userId)

  const globalProgress = totalVideos > 0 ? (completedTotal / totalVideos) * 100 : 0

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Premium upsell banner */}
      {!isPremium && (
        <div className="p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-yellow-400">Mode Gratuit</strong> — Débloque toutes les vidéos et l'ebook en passant Premium.
            </p>
          </div>
          <Link
            href="/checkout?plan=premium"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-bold whitespace-nowrap hover:opacity-90 transition-opacity"
          >
            Passer Premium →
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-white/10 bg-white/3">
          <Trophy className="w-5 h-5 text-yellow-400 mb-2" />
          <p className="text-2xl font-black">{completedTotal}</p>
          <p className="text-xs text-zinc-500 mt-0.5">Vidéos terminées</p>
        </div>
        <div className="p-5 rounded-2xl border border-white/10 bg-white/3">
          <Flame className="w-5 h-5 text-orange-400 mb-2" />
          <p className="text-2xl font-black">{modules.length}</p>
          <p className="text-xs text-zinc-500 mt-0.5">Modules disponibles</p>
        </div>
        <div className="col-span-2 sm:col-span-1 p-5 rounded-2xl border border-white/10 bg-white/3">
          <Play className="w-5 h-5 text-green-400 mb-2" />
          <p className="text-2xl font-black">{Math.round(globalProgress)}%</p>
          <p className="text-xs text-zinc-500 mt-0.5">Progression globale</p>
          <ProgressBar value={globalProgress} className="mt-2" size="sm" />
        </div>
      </div>

      {/* Modules grid */}
      <div>
        <h2 className="text-xl font-bold mb-5">Mes formations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module) => {
            const completed = module.videos.filter((v) => completedIds.has(v.id)).length
            return (
              <ModuleCard
                key={module.id}
                slug={module.slug}
                title={module.title}
                totalVideos={module.videos.length}
                completedVideos={completed}
                isPremium={false}
                userIsPremium={isPremium}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
