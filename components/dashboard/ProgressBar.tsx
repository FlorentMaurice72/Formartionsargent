import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number // 0-100
  className?: string
  showLabel?: boolean
  size?: 'sm' | 'md'
}

export function ProgressBar({ value, className, showLabel = false, size = 'sm' }: ProgressBarProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className={cn(
        'w-full rounded-full bg-white/10 overflow-hidden',
        size === 'sm' ? 'h-1.5' : 'h-2.5'
      )}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-zinc-500 mt-1">{Math.round(value)}% complété</p>
      )}
    </div>
  )
}
