'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  TrendingUp, LayoutDashboard, BookOpen, User,
  Settings, LogOut, ChevronRight
} from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { PILLARS } from '@/lib/constants'

const mainNav = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/profile', icon: User, label: 'Mon profil' },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 border-r border-white/10 bg-black/60 backdrop-blur-xl z-40">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-black" />
          </div>
          <span className="text-gradient text-sm">FormationsArgent</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto space-y-1">
        {/* Main nav */}
        {mainNav.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-yellow-500/15 text-yellow-400'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}

        {/* Modules */}
        <div className="pt-4 pb-2">
          <p className="px-3 text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
            Mes formations
          </p>
          {PILLARS.map((pillar) => (
            <Link
              key={pillar.slug}
              href={`/modules/${pillar.slug}`}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group',
                pathname.startsWith(`/modules/${pillar.slug}`)
                  ? 'bg-yellow-500/15 text-yellow-400'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              )}
            >
              <span className="text-base w-5 text-center">{pillar.icon}</span>
              <span className="flex-1 truncate">{pillar.title}</span>
              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </nav>

      {/* User */}
      <div className="p-4 border-t border-white/10 flex items-center gap-3">
        <UserButton afterSignOutUrl="/" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-zinc-400 truncate">Mon compte</p>
        </div>
        <Link href="/settings">
          <Settings className="w-4 h-4 text-zinc-600 hover:text-white transition-colors" />
        </Link>
      </div>
    </aside>
  )
}
