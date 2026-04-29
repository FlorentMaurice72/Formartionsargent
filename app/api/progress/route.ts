import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { videoId, completed } = await req.json()
  if (!videoId) return NextResponse.json({ error: 'videoId required' }, { status: 400 })

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const progress = await prisma.progress.upsert({
    where: { userId_videoId: { userId: user.id, videoId } },
    update: { completed: Boolean(completed) },
    create: { userId: user.id, videoId, completed: Boolean(completed) },
  })

  return NextResponse.json(progress)
}

export async function GET(req: NextRequest) {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { progress: true },
  })

  return NextResponse.json(user?.progress ?? [])
}
