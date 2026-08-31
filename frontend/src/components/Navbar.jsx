import React, { useState } from 'react'
import { Target, BookOpen, GraduationCap, Flame, Info, Menu, X, ArrowRight, Sparkles } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#', active: true },
  { label: 'Practice', href: '#', icon: Target },
  { label: 'PYQ Bank', href: '#', icon: BookOpen },
  { label: 'Top Teachers', href: '#', icon: GraduationCap },
  { label: 'Originals', href: '#', icon: Flame, badge: 'HOT' },
  { label: 'About', href: '#', icon: Info },
]

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-500/10 bg-neutral-950/80 backdrop-blur-xl transition-all duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5">
        {/* Section 1: Logo */}
        <a 
          href="#" 
          className="group flex items-center gap-3 transition-all duration-300 hover:opacity-90" 
          aria-label="Axiom home"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-linear-to-r from-amber-500 to-orange-600 opacity-40 blur-sm transition duration-300 group-hover:opacity-70"></div>
            <img src="/nav-logo.jpg" alt="Axiom" className="relative h-11 w-auto rounded-lg object-contain shadow-lg" />
          </div>
        </a>

        {/* Section 2: Desktop Nav links */}
        <ul className="hidden items-center justify-center gap-1 rounded-full border border-white/5 bg-white/3 px-4 py-1.5 backdrop-blur-md md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`group relative flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
                    link.active
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {Icon && <Icon className={`h-3.5 w-3.5 ${link.active ? 'text-amber-400' : 'text-neutral-400 group-hover:text-amber-400'}`} />}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="rounded-full bg-linear-to-r from-orange-500 to-amber-500 px-1.5 py-0.2 text-[9px] font-bold text-neutral-950 shadow-xs animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Section 3: Login / Action CTA */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 transition-colors hover:text-amber-400 px-3 py-2">
            Sign In
          </button>

          <button className="group relative overflow-hidden rounded-full bg-linear-to-r from-amber-400 via-amber-500 to-orange-500 px-5 py-2 text-xs font-bold tracking-wide text-neutral-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:scale-105 hover:shadow-amber-500/35 active:scale-95">
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Start Free</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/20 bg-white/5 text-neutral-300 transition-all duration-200 hover:border-amber-500/40 hover:bg-white/10 hover:text-white md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-amber-500/10 bg-neutral-950/95 px-6 py-4 backdrop-blur-2xl md:hidden animate-fade-in-up">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                      link.active
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
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar

