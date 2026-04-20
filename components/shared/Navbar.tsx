'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { Menu, X, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { isSignedIn } = useUser()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: '/#pillars', label: 'Formations' },
    { href: '/#pricing', label: 'Tarifs' },
    { href: '/ebook', label: 'Ebook' },
    { href: '/blog', label: 'Blog' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-black" />
            </div>
            <span className="text-gradient">FormationsArgent</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-yellow-400',
                  pathname === link.href ? 'text-yellow-400' : 'text-zinc-400'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    Connexion
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:opacity-90 transition-opacity">
                    Commencer gratuitement
                  </button>
                </SignUpButton>
              </>
            )}
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/95 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-zinc-400 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            {isSignedIn ? (
              <Link href="/dashboard" className="text-sm font-medium text-center px-4 py-2 rounded-lg bg-white/10">
                Dashboard
              </Link>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="w-full text-sm font-medium py-2 rounded-lg bg-white/10">
                    Connexion
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full text-sm font-medium py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                    Commencer gratuitement
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
