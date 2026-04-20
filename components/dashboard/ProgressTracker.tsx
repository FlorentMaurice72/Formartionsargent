'use client'

import { useState, useTransition } from 'react'
import { CheckCircle, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProgressTrackerProps {
  userId: string
  videoId: string
  isCompleted: boolean
}

export function ProgressTracker({ userId, videoId, isCompleted: initial }: ProgressTrackerProps) {
  const [completed, setCompleted] = useState(initial)
  const [isPending, startTransition] = useTransition()

  const toggle = () => {
    startTransition(async () => {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId, completed: !completed }),
      })
      if (res.ok) setCompleted(!completed)
    })
  }

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className={cn(
        'flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all',
        completed
          ? 'border-green-500/40 bg-green-500/15 text-green-400 hover:bg-green-500/25'
          : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10',
        isPending && 'opacity-50 cursor-not-allowed'
      )}
    >
      {completed ? (
        <CheckCircle className="w-4 h-4" />
      ) : (
        <Circle className="w-4 h-4" />
      )}
      {completed ? 'Terminée' : 'Marquer comme terminée'}
    </button>
  )
}
