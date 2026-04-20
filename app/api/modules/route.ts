import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const modules = await prisma.module.findMany({
    orderBy: { order: 'asc' },
    include: {
      videos: {
        orderBy: { order: 'asc' },
        select: { id: true, title: true, isFree: true, duration: true, order: true },
      },
    },
  })
  return NextResponse.json(modules)
}
