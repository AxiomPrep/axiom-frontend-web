import React from 'react'
import SubjectPills from './SubjectPills'
import ValidationSection from './ValidationSection'

const subjectTags = ['Physics', 'Chemistry', 'Mathematics', 'Biology']

const floatingFormulas = {
  left: [
    { text: 'F = ma', label: 'PHYSICS', top: '14%', left: '4%' },
    { text: '∫ f(x) dx', label: 'MATHEMATICS', top: '30%', left: '7%' },
    { text: 'pH = -log[H⁺]', label: '', top: '48%', left: '2%' },
    { text: 'mitosis · meiosis', label: 'BIOLOGY', top: '20%', left: '14%' },
    { text: 'NaCl', label: '', top: '68%', left: '9%' },
    { text: 'Krebs cycle', label: '', top: '58%', left: '5%' },
    { text: 'ΔG = ΔH - TΔS', label: '', top: '80%', left: '6%' },
  ],
  right: [
    { text: 'sin²θ + cos²θ = 1', label: '', top: '12%', right: '7%' },
    { text: 'ATP → ADP', label: '', top: '20%', right: '4%' },
    { text: 'E = mc²', label: '', top: '30%', right: '11%' },
    { text: 'dy/dx', label: 'CHEMISTRY', top: '42%', right: '5%' },
    { text: '2H₂ + O₂ → 2H₂O', label: '', top: '52%', right: '13%' },
    { text: 'C₆H₁₂O₆', label: '', top: '62%', right: '6%' },
    { text: 'λ = h / p', label: '', top: '74%', right: '9%' },
    { text: 'Σ n(n+1)/2', label: '', top: '85%', right: '15%' },
  ],
}

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-(--background) text-(--text)">
      {/* Ambient radial glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-24 h-104 w-104 rounded-full bg-amber-500/10 blur-[120px]"></div>
        <div className="absolute right-[10%] top-40 h-88 w-88 rounded-full bg-orange-500/10 blur-[120px]"></div>
        <div className="absolute left-1/2 bottom-0 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-600/5 blur-[100px]"></div>
      </div>

      {/* Grain texture */}
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-40"></div>

      {/* Background formulas - left */}
      {floatingFormulas.left.map((formula, idx) => (
        <div
          key={`left-${idx}`}
          className="pointer-events-none absolute hidden text-xs opacity-[0.15] lg:block animate-float"
          style={{ top: formula.top, left: formula.left, animationDelay: `${idx * 0.4}s` }}
        >
          {formula.label && (
            <div className="mb-1 text-[10px] uppercase tracking-wider text-neutral-500">
              {formula.label}
            </div>
          )}
          <div className="font-mono text-neutral-400">{formula.text}</div>
        </div>
      ))}

      {/* Background formulas - right */}
      {floatingFormulas.right.map((formula, idx) => (
        <div
          key={`right-${idx}`}
          className="pointer-events-none absolute hidden text-xs opacity-[0.15] lg:block animate-float-delayed"
          style={{ top: formula.top, right: formula.right, animationDelay: `${idx * 0.4}s` }}
        >
          {formula.label && (
            <div className="mb-1 text-[10px] uppercase tracking-wider text-neutral-500">
              {formula.label}
            </div>
          )}
          <div className="font-mono text-neutral-400">{formula.text}</div>
        </div>
      ))}

      {/* Main content */}
      <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-28">
        {/* Hero brand wordmark */}
        <div className="animate-fade-in-up mb-4 text-center" style={{ animationDelay: '0.05s' }}>
          <span className="text-sm font-bold tracking-[0.5em] text-amber-500/90">AXIOM</span>
        </div>

        {/* Subject nav tags */}
        <div
          className="animate-fade-in-up mb-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] font-medium uppercase tracking-[0.15em] text-amber-500/80"
          style={{ animationDelay: '0.15s' }}
        >
          {subjectTags.map((tag, idx) => (
            <React.Fragment key={tag}>
              {idx > 0 && <span className="text-neutral-700">·</span>}
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-amber-500"></span>
                {tag}
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Main headline */}
        <h1
          className="animate-fade-in-up mb-6 text-center text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          style={{ animationDelay: '0.25s' }}
        >
          Welcome to{' '}
          <span className="bg-linear-to-r from-amber-300 via-amber-500 to-orange-500 bg-clip-text text-transparent">
            Axiom
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="animate-fade-in-up mb-4 text-center text-xl text-neutral-300 md:text-2xl"
          style={{ animationDelay: '0.35s' }}
        >
          One place for all your science needs.
        </p>

        {/* Description */}
        <p
          className="animate-fade-in-up mx-auto mb-10 max-w-2xl text-center text-base leading-relaxed text-neutral-400 md:text-lg"
          style={{ animationDelay: '0.45s' }}
        >
          Achieve top ranks with expert-led courses, extensive practice, and personalized
          mentoring for JEE, NEET, and Olympiads.
        </p>

        {/* CTA buttons */}
        <div
          className="animate-fade-in-up mb-14 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: '0.55s' }}
        >
          <button className="group relative w-full overflow-hidden rounded-xl bg-linear-to-br from-amber-400 via-amber-500 to-orange-500 px-8 py-3.5 text-base font-semibold text-neutral-900 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-amber-500/40 sm:w-auto">
            Start free trial <span aria-hidden="true">→</span>
          </button>
          <button className="w-full rounded-xl border border-amber-500/30 bg-white/2 px-8 py-3.5 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-amber-500/60 hover:bg-white/6 hover:shadow-lg hover:shadow-amber-500/10 sm:w-auto">
            Explore practice engine <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Subject pills */}
        <div className="animate-fade-in-up mb-20" style={{ animationDelay: '0.65s' }}>
          <SubjectPills />
        </div>

        {/* Validation / testimonials */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.75s' }}>
          <ValidationSection />
        </div>
      </div>
    </section>
  )
}

export default Hero
