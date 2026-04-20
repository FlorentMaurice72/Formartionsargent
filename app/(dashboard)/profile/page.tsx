import { auth, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Crown, Mail, Calendar, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default async function ProfilePage() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const [clerkUser, dbUser] = await Promise.all([
    currentUser(),
    prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        progress: { where: { completed: true } },
        purchases: { where: { status: 'COMPLETED' } },
      },
    }),
  ])

  const isPremium = dbUser?.isPremium ?? false

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-black">Mon profil</h1>

      {/* Profile card */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/3 flex items-center gap-5">
        {clerkUser?.imageUrl ? (
          <img src={clerkUser.imageUrl} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-black text-2xl">
            {clerkUser?.firstName?.[0] ?? '?'}
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold">
            {clerkUser?.firstName} {clerkUser?.lastName}
          </h2>
          <p className="text-zinc-400 text-sm flex items-center gap-1.5 mt-1">
            <Mail className="w-3.5 h-3.5" />
            {clerkUser?.emailAddresses[0]?.emailAddress}
          </p>
          <p className="text-zinc-500 text-xs flex items-center gap-1.5 mt-1">
            <Calendar className="w-3 h-3" />
            Membre depuis {dbUser?.createdAt ? new Date(dbUser.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : '—'}
          </p>
        </div>
      </div>

      {/* Status */}
      <div className={`p-5 rounded-2xl border ${isPremium ? 'border-yellow-500/30 bg-yellow-500/10' : 'border-white/10 bg-white/3'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className={`w-5 h-5 ${isPremium ? 'text-yellow-400' : 'text-zinc-600'}`} />
            <div>
              <p className="font-semibold text-sm">{isPremium ? 'Membre Premium' : 'Compte Gratuit'}</p>
              <p className="text-xs text-zinc-500">{isPremium ? 'Accès illimité à toutes les formations' : '1 vidéo gratuite par module'}</p>
            </div>
          </div>
          {!isPremium && (
            <Link href="/checkout?plan=premium" className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold">
              Passer Premium
            </Link>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl border border-white/10 bg-white/3 text-center">
          <BookOpen className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
          <p className="text-3xl font-black">{dbUser?.progress.length ?? 0}</p>
          <p className="text-xs text-zinc-500 mt-1">Vidéos terminées</p>
        </div>
        <div className="p-5 rounded-2xl border border-white/10 bg-white/3 text-center">
          <Crown className="w-5 h-5 text-orange-400 mx-auto mb-2" />
          <p className="text-3xl font-black">{dbUser?.purchases.length ?? 0}</p>
          <p className="text-xs text-zinc-500 mt-1">Achats effectués</p>
        </div>
      </div>
    </div>
  )
}
