import React from 'react'
import Link from 'next/link'
import { Target, Award, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 py-16 px-4 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[160px]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 mb-6">
          About Axiom Science Engine
        </div>

        <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
          Empowering Top 1% Aspirants for{' '}
          <span className="bg-linear-to-r from-amber-300 via-amber-500 to-orange-500 bg-clip-text text-transparent">
            JEE, NEET & Olympiads
          </span>
        </h1>

        <p className="mt-6 text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto">
          Axiom is built to deliver unmatched question fidelity, algorithmic adaptive practice, and step-by-step problem breakdown engineered specifically for serious competitive exam aspirants.
        </p>
      </div>

      <div className="relative mx-auto max-w-5xl mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: Target,
            title: 'Precision PYQ Archives',
            desc: 'Over 50,000+ official past year questions from NTA, IIT JEE, and NEET archives, organized by topic weightage and difficulty level.',
          },
          {
            icon: Award,
            title: 'HOD Recommended',
            desc: 'Validated and recommended by HODs of Top 3 Institutes for structural accuracy and concept alignment.',
          },
          {
            icon: ShieldCheck,
            title: 'Rank-Focused Analytics',
            desc: 'Real-time percentile estimation, speed-accuracy metrics, and leaderboard rankings across nationwide cohorts.',
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl border border-amber-500/20 bg-neutral-900/60 p-6 backdrop-blur-md hover:border-amber-500/40 transition"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/20">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-3xl mt-16 text-center">
        <Link
          href="/practice"
          className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-amber-400 via-amber-500 to-orange-500 px-8 py-4 text-base font-bold text-neutral-950 shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition"
        >
          <span>Start Practicing Now</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  )
}
