import React from 'react'

const navLinks = [
  { label: 'Home', href: '#', active: true },
  { label: 'Practice', href: '#', icon: '🎯' },
  { label: 'PYQ Bank', href: '#', icon: '📘' },
  { label: 'Top Teachers', href: '#', icon: '🎓' },
  { label: 'Originals', href: '#', icon: '🔥'},
  { label: 'About', href: '#' },
]

const Navbar = () => {
  return (
    <header className="w-full border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-lg">
      <nav className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-6 py-3">
        {/* Section 1: Logo */}
        <a href="#" className="flex items-center transition-transform duration-300 hover:scale-[1.03]" aria-label="Axiom home">
          <img src="/logo.png" alt="Axiom" className="h-10 w-auto" />
        </a>

        {/* Section 2: Nav links */}
        <ul className="hidden items-center justify-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`flex items-center gap-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 ${
                  link.active
                    ? 'text-amber-500'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {link.icon && <span aria-hidden="true">{link.icon}</span>}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Section 3: Login / actions */}
        <div className="flex items-center gap-4 justify-self-end">
          <span className="hidden text-xl sm:inline" aria-hidden="true">😴</span>
          <button className="rounded-full bg-linear-to-br from-amber-400 via-amber-500 to-orange-500 px-6 py-2 text-sm font-semibold text-neutral-900 shadow-md shadow-amber-500/25 transition-all duration-300 hover:scale-[1.05] hover:shadow-amber-500/40">
            Login
          </button>
          <button
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-white transition-colors duration-200 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-5 w-5"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
