'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, TrendingUp, LayoutDashboard, User, ChevronRight } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { PILLARS } from '@/lib/constants'

const mainNav = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/profile', icon: User, label: 'Mon profil' },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close drawer on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Ouvrir le menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={cn(
          'fixed top-0 left-0 bottom-0 z-50 w-72 flex flex-col',
          'bg-zinc-950 border-r border-white/10',
          'transition-transform duration-300 ease-in-out lg:hidden',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-black" />
            </div>
            <span className="text-gradient text-sm">FormationsArgent</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-4 overflow-y-auto space-y-1">
          {mainNav.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors',
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
          <div className="pt-4">
            <p className="px-3 text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
              Mes formations
            </p>
            {PILLARS.map((pillar) => (
              <Link
                key={pillar.slug}
                href={`/modules/${pillar.slug}`}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                  pathname.startsWith(`/modules/${pillar.slug}`)
                    ? 'bg-yellow-500/15 text-yellow-400'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                )}
              >
                <span className="text-base w-5 text-center">{pillar.icon}</span>
                <span className="flex-1 truncate">{pillar.title}</span>
                <ChevronRight className="w-3 h-3 text-zinc-700" />
              </Link>
            ))}
          </div>

          {/* Ebook link */}
          <div className="pt-2">
            <Link
              href="/ebook"
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <span className="text-base w-5 text-center">📘</span>
              <span>Ebook gratuit</span>
            </Link>
          </div>
        </nav>

        {/* Footer: user + premium CTA */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <Link
            href="/checkout?plan=premium"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-bold hover:opacity-90 transition-opacity"
          >
            ⚡ Passer Premium
          </Link>
          <div className="flex items-center gap-3 px-1">
            <UserButton afterSignOutUrl="/" />
            <p className="text-xs text-zinc-500">Mon compte</p>
          </div>
        </div>
      </aside>
    </>
  )
}
