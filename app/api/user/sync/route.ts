import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Called after Clerk sign-up to create the user in DB
export async function POST() {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const clerkUser = await currentUser()
  if (!clerkUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? ''

  const user = await prisma.user.upsert({
    where: { clerkId: userId },
    update: {
      email,
      name: `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim() || null,
      imageUrl: clerkUser.imageUrl,
    },
    create: {
      clerkId: userId,
      email,
      name: `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim() || null,
      imageUrl: clerkUser.imageUrl,
    },
  })

  return NextResponse.json(user)
}
