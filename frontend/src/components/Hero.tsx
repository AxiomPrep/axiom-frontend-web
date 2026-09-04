'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'
import SubjectPills from './SubjectPills'
import ValidationSection from './ValidationSection'
import ParticleBackground from './ParticleBackground'
import {
  Sparkles,
  ArrowRight,
  Target,
  Zap,
  Star,
  BookOpen,
  Atom,
  FlaskConical,
  Calculator,
  Dna,
  Compass,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const subjectTags = ['Physics', 'Chemistry', 'Mathematics', 'Biology']

interface FloatingFormula {
  text: string
  label: string
  icon: LucideIcon
  top: string
  left?: string
  right?: string
}

const floatingFormulas: { left: FloatingFormula[]; right: FloatingFormula[] } = {
  left: [
    { text: 'F = m · a', label: 'PHYSICS', icon: Atom, top: '12%', left: '3%' },
    { text: '∫ f(x) dx', label: 'MATHEMATICS', icon: Calculator, top: '32%', left: '4%' },
    { text: 'pH = -log[H⁺]', label: 'CHEMISTRY', icon: FlaskConical, top: '54%', left: '2%' },
    { text: 'ATP ↔ ADP', label: 'BIOLOGY', icon: Dna, top: '74%', left: '4%' },
  ],
  right: [
    { text: 'E = m · c²', label: 'RELATIVITY', icon: Atom, top: '14%', right: '3%' },
    { text: 'sin²θ + cos²θ = 1', label: 'TRIGONOMETRY', icon: Calculator, top: '34%', right: '4%' },
    { text: 'PV = nRT', label: 'THERMODYNAMICS', icon: FlaskConical, top: '54%', right: '3%' },
    { text: 'ΔG = ΔH - TΔS', label: 'ENTROPY', icon: Atom, top: '74%', right: '4%' },
  ],
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 text-neutral-100 bg-grid-pattern pb-28">
      {/* Dynamic Animated Particle & Constellation Background */}
      <ParticleBackground />

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-linear-to-b from-amber-500/25 via-orange-600/15 to-transparent blur-[160px]"></div>
        <div className="absolute top-1/4 left-[3%] h-96 w-96 rounded-full bg-amber-600/15 blur-[150px]"></div>
        <div className="absolute top-1/2 right-[3%] h-[420px] w-[420px] rounded-full bg-orange-500/15 blur-[160px]"></div>
        <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-yellow-500/10 blur-[130px]"></div>
      </div>

      {/* Floating formulas — left */}
      {floatingFormulas.left.map((item, idx) => {
        const Icon = item.icon
        return (
          <div
            key={`left-${idx}`}
            className="pointer-events-none absolute hidden text-xs xl:block animate-float"
            style={{ top: item.top, left: item.left, animationDelay: `${idx * 0.9}s` }}
          >
            <div className="flex items-center gap-2.5 rounded-2xl border border-amber-500/20 bg-neutral-900/60 px-3.5 py-2.5 backdrop-blur-md opacity-60 shadow-lg shadow-amber-500/5 hover:opacity-100 transition-all duration-300">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-amber-500/80">{item.label}</div>
                <div className="font-mono text-xs font-semibold text-neutral-200">{item.text}</div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Floating formulas — right */}
      {floatingFormulas.right.map((item, idx) => {
        const Icon = item.icon
        return (
          <div
            key={`right-${idx}`}
            className="pointer-events-none absolute hidden text-xs xl:block animate-float-delayed"
            style={{ top: item.top, right: item.right, animationDelay: `${idx * 0.9}s` }}
          >
            <div className="flex items-center gap-2.5 rounded-2xl border border-amber-500/20 bg-neutral-900/60 px-3.5 py-2.5 backdrop-blur-md opacity-60 shadow-lg shadow-amber-500/5 hover:opacity-100 transition-all duration-300">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-amber-500/80">{item.label}</div>
                <div className="font-mono text-xs font-semibold text-neutral-200">{item.text}</div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Main container */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 md:pt-24">
        {/* Top Badge */}
        <div className="animate-fade-in-up mb-6 flex justify-center" style={{ animationDelay: '0.05s' }}>
          <Link
            href="/practice"
            className="group relative inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md transition-all duration-300 hover:border-amber-500/60 hover:bg-amber-500/20 hover:shadow-lg hover:shadow-amber-500/20"
          >
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span className="font-extrabold tracking-wide">AXIOM 2.0 IS LIVE</span>
            </span>
            <span className="text-amber-500/50">|</span>
            <span className="text-neutral-200 font-medium">Next-Gen Science Engine</span>
            <ArrowRight className="h-3.5 w-3.5 text-amber-400 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Subject indicator chips */}
        <div
          className="animate-fade-in-up mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400/90"
          style={{ animationDelay: '0.12s' }}
        >
          {subjectTags.map((tag, idx) => (
            <Fragment key={tag}>
              {idx > 0 && <span className="text-neutral-700">·</span>}
              <Link
                href={`/practice?subject=${tag.toLowerCase()}`}
                className="flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]"></span>
                <span>{tag}</span>
              </Link>
            </Fragment>
          ))}
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up mb-6 text-center text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-[1.06]"
          style={{ animationDelay: '0.2s' }}
        >
          Master Science with{' '}
          <span className="relative inline-block">
            <span className="bg-linear-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">
              Precision &amp; Speed
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-linear-to-r from-amber-400 to-orange-500 opacity-60 blur-xs"></span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-in-up mx-auto mb-4 max-w-3xl text-center text-lg font-medium text-neutral-300 sm:text-2xl"
          style={{ animationDelay: '0.3s' }}
        >
          One intelligent platform for JEE, NEET, &amp; Olympiad aspirants.
        </p>

        {/* Description */}
        <p
          className="animate-fade-in-up mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-neutral-400 sm:text-base"
          style={{ animationDelay: '0.4s' }}
        >
          Solve 50,000+ curated PYQs, get instant step-by-step AI doubt clearance, and master high-yield concepts across 5 calibrated difficulty tiers.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-in-up mb-14 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: '0.5s' }}
        >
          {/* Start Free Trial */}
          <Link
            href="/practice"
            className="group relative w-full overflow-hidden rounded-2xl bg-linear-to-r from-amber-400 via-amber-500 to-orange-500 px-8 py-4 text-base font-bold text-neutral-950 shadow-xl shadow-amber-500/25 transition-all duration-300 hover:scale-105 hover:shadow-amber-500/40 active:scale-95 sm:w-auto text-center"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>Start Free Trial</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
          </Link>

          {/* Explore Practice Funnel */}
          <Link
            href="/practice"
            className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-amber-500/40 bg-neutral-900/80 px-8 py-4 text-base font-semibold text-neutral-200 backdrop-blur-md transition-all duration-300 hover:border-amber-500/70 hover:bg-neutral-800 hover:text-white sm:w-auto shadow-lg shadow-neutral-950"
          >
            <Compass className="h-4 w-4 text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
            <span>Explore Practice</span>
          </Link>
        </div>

        {/* Stats bar */}
        <div className="animate-fade-in-up mb-20 grid grid-cols-2 gap-4 sm:grid-cols-4" style={{ animationDelay: '0.7s' }}>
          {[
            { icon: BookOpen, value: '50,000+', label: 'Verified PYQs' },
            { icon: Target, value: '99.8%', label: 'Top Percentiles' },
            { icon: Zap, value: '24/7', label: 'Instant AI Doubts' },
            { icon: Star, value: '4.9 / 5', label: 'Aspirant Rating', filled: true },
          ].map(({ icon: Icon, value, label, filled }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-2xl border border-amber-500/15 bg-neutral-900/50 p-5 backdrop-blur-md text-center transition hover:border-amber-500/40 hover:bg-neutral-900/80"
            >
              <div className="mb-2 rounded-xl bg-amber-500/10 p-2.5 text-amber-400">
                <Icon className={`h-5 w-5 ${filled ? 'fill-amber-400 text-amber-400' : ''}`} />
              </div>
              <div className="text-2xl font-black text-white sm:text-3xl">{value}</div>
              <div className="text-xs text-neutral-400 font-medium mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Subject pills with direct router links */}
        <div className="animate-fade-in-up mb-20" style={{ animationDelay: '0.8s' }}>
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Pick a Discipline</span>
            <h3 className="text-2xl font-black text-white mt-1">High-Yield Subject Catalogs</h3>
          </div>
          <SubjectPills />
        </div>

        {/* Testimonials */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
          <ValidationSection />
        </div>
      </div>
    </section>
  )
}
