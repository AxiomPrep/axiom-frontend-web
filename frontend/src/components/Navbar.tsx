'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Target,
  BookOpen,
  GraduationCap,
  Flame,
  Trophy,
  Timer,
  Menu,
  X,
  ArrowRight,
  Zap,
  LogIn,
  Home,
  Sun,
  Moon,
  Info,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

interface NavLink {
  label: string
  href: string
  icon?: LucideIcon
  badge?: string
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { label: 'Practice', href: '/practice', icon: Target },
  { label: "PYQ's", href: '/pyq-bank', icon: BookOpen },
  { label: 'Teachers', href: '/top-teachers', icon: GraduationCap },
  { label: 'Originals', href: '/originals', icon: Flame, badge: 'HOT' },
  { label: 'Timer', href: '/timer', icon: Timer },
  { label: 'About', href: '/about', icon: Info },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-amber-500/10 bg-neutral-950/80 backdrop-blur-xl transition-all duration-300">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-all duration-300 hover:opacity-90 shrink-0"
            aria-label="Axiom home"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-linear-to-r from-amber-500 to-orange-600 opacity-40 blur-sm transition duration-300 group-hover:opacity-75"></div>
              <Image
                src="/nav-logo.jpg"
                alt="Axiom"
                width={40}
                height={40}
                className="relative h-10 w-auto rounded-lg object-contain shadow-lg"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black tracking-tight text-white text-lg leading-none">
                AXIOM
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-500/90">
                Science Engine
              </span>
            </div>
          </Link>

          {/* Desktop Nav links */}
          <ul className="hidden items-center justify-center gap-1 rounded-full border border-white/5 bg-white/3 px-3 py-1.5 backdrop-blur-md lg:flex">
            {navLinks.map((link) => {
              const Icon = link.icon
              const active = isActive(link.href)
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`group relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
                      active
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                        : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {Icon && (
                      <Icon
                        className={`h-3.5 w-3.5 ${
                          active ? 'text-amber-400' : 'text-neutral-400 group-hover:text-amber-400'
                        }`}
                      />
                    )}
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="rounded-full bg-linear-to-r from-orange-500 to-amber-500 px-1.5 py-0.2 text-[9px] font-extrabold text-neutral-950 shadow-xs animate-pulse">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* CTAs & Theme Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Dark/Light Theme Switcher */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to Soft Oat Light Mode' : 'Switch to Dark Mode'}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400 transition-all duration-200 hover:border-amber-500/50 hover:bg-amber-500/20 hover:scale-105 active:scale-95"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Upgrade Button */}
            <Link
              href="/subscription"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-300 transition hover:bg-amber-500/20 hover:border-amber-500/60"
            >
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span>Upgrade</span>
            </Link>

            {/* Sign In Link */}
            <Link
              href="/login"
              className={`hidden items-center gap-1.5 text-xs font-semibold transition-colors px-2.5 py-1.5 min-[420px]:flex ${
                pathname === '/login'
                  ? 'text-amber-400 font-bold'
                  : 'text-neutral-300 hover:text-amber-400'
              }`}
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Login</span>
            </Link>

            {/* Start Free Trial CTA */}
            <Link
              href="/practice"
              className="group relative overflow-hidden rounded-full bg-linear-to-r from-amber-400 via-amber-500 to-orange-500 px-3 py-1.5 text-xs font-bold tracking-wide text-neutral-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:scale-105 hover:shadow-amber-500/35 active:scale-95 sm:px-4 sm:py-2"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Start Free</span>
                <ArrowRight className="hidden h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 sm:inline-block" />
              </span>
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/20 bg-white/5 text-neutral-300 transition-all duration-200 hover:border-amber-500/40 hover:bg-white/10 hover:text-white lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-amber-500/10 bg-neutral-950/98 px-6 py-4 backdrop-blur-2xl lg:hidden animate-fade-in-up">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon
                const active = isActive(link.href)
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                        active
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && <Icon className="h-4 w-4 text-amber-400" />}
                        <span>{link.label}</span>
                      </div>
                      {link.badge && (
                        <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-neutral-950">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}

              <li className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={toggleTheme}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 py-2.5 text-xs font-bold text-amber-300"
                >
                  {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                  <span>{theme === 'dark' ? 'Soft Oat Mode' : 'Dark Mode'}</span>
                </button>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-neutral-900 py-2.5 text-xs font-bold text-neutral-200"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Login</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  )
}
