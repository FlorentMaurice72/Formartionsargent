'use client'

import { useUser } from '@clerk/nextjs'
import { Bell, Search } from 'lucide-react'
import Link from 'next/link'

export function DashboardTopbar() {
  const { user } = useUser()

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-white/10 bg-black/60 backdrop-blur-xl flex items-center justify-between px-6 gap-4">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="search"
            placeholder="Rechercher une formation..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-500/50 transition-colors placeholder:text-zinc-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
          <Bell className="w-4 h-4 text-zinc-400" />
        </button>

        <Link
          href="/checkout?plan=premium"
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold hover:opacity-90 transition-opacity"
        >
          ⚡ Passer Premium
        </Link>
      </div>
    </header>
  )
}
