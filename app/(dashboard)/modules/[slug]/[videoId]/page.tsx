import { auth } from '@clerk/nextjs'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Lock, CheckCircle } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { VideoPlayer } from '@/components/dashboard/VideoPlayer'
import { ProgressTracker } from '@/components/dashboard/ProgressTracker'

async function getVideoData(videoId: string, clerkId: string) {
  const [user, video] = await Promise.all([
    prisma.user.findUnique({
      where: { clerkId },
      include: { progress: { where: { videoId }, take: 1 } },
    }),
    prisma.video.findUnique({
      where: { id: videoId },
      include: {
        module: {
          include: { videos: { orderBy: { order: 'asc' }, select: { id: true, title: true, isFree: true, order: true } } },
        },
      },
    }),
  ])
  return { user, video }
}

export default async function VideoPage({
  params,
}: {
  params: { slug: string; videoId: string }
}) {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const { user, video } = await getVideoData(params.videoId, userId)
  if (!video) notFound()

  const isPremium = user?.isPremium ?? false
  const canAccess = video.isFree || isPremium

  if (!canAccess) {
    redirect(`/modules/${params.slug}?locked=true`)
  }

  const isCompleted = user?.progress[0]?.completed ?? false
  const allVideos = video.module.videos
  const currentIndex = allVideos.findIndex((v) => v.id === params.videoId)
  const prevVideo = currentIndex > 0 ? allVideos[currentIndex - 1] : null
  const nextVideo = currentIndex < allVideos.length - 1 ? allVideos[currentIndex + 1] : null

  return (
    <div className="max-w-4xl space-y-6">
      {/* Back */}
      <Link
        href={`/modules/${params.slug}`}
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        {video.module.title}
      </Link>

      {/* Video player */}
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video">
        {canAccess ? (
          <VideoPlayer url={video.url} title={video.title} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Lock className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-400">Cette vidéo est réservée aux membres Premium.</p>
              <Link href="/checkout?plan=premium" className="mt-4 inline-flex px-6 py-2.5 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-sm">
                Passer Premium →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Title + completion */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black mb-1">{video.title}</h1>
          {video.description && (
            <p className="text-zinc-400 text-sm">{video.description}</p>
          )}
        </div>
        {user && (
          <ProgressTracker
            userId={user.id}
            videoId={video.id}
            isCompleted={isCompleted}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        {prevVideo ? (
          <Link
            href={`/modules/${params.slug}/${prevVideo.id}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline truncate max-w-xs">{prevVideo.title}</span>
            <span className="sm:hidden">Précédent</span>
          </Link>
        ) : <div />}

        {nextVideo ? (
          <Link
            href={`/modules/${params.slug}/${nextVideo.id}`}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-colors ${
              nextVideo.isFree || isPremium
                ? 'border border-white/10 hover:bg-white/5'
                : 'border border-yellow-500/30 bg-yellow-500/10 text-yellow-400'
            }`}
          >
            <span className="hidden sm:inline truncate max-w-xs">{nextVideo.title}</span>
            <span className="sm:hidden">Suivant</span>
            {nextVideo.isFree || isPremium ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
          </Link>
        ) : (
          <Link
            href={`/modules/${params.slug}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-500/20 text-green-400 text-sm"
          >
            <CheckCircle className="w-4 h-4" />
            Module terminé !
          </Link>
        )}
      </div>
    </div>
  )
}
