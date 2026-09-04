import React from 'react'
import Link from 'next/link'
import {
  Flame,
  Play,
  Sparkles,
  Clock,
  Zap,
  ArrowRight,
  BookOpen,
  Atom,
  FlaskConical,
  Calculator,
} from 'lucide-react'

interface OriginalSeries {
  id: string
  title: string
  subject: string
  category: string
  episodesCount: number
  duration: string
  difficulty: string
  description: string
  tag: string
  bgLinear: string
}

const originalsList: OriginalSeries[] = [
  {
    id: 'rotational-visualized',
    title: 'Rotational Motion: 3D Torque & Gyroscope Invariants',
    subject: 'Physics',
    category: '3D Simulation Masterclass',
    episodesCount: 6,
    duration: '2h 15m',
    difficulty: 'JEE Advanced / Olympiad',
    description:
      'Watch rolling friction, precession, and instantaneous center of rotation come alive through interactive 3D physics simulations.',
    tag: 'MOST POPULAR',
    bgLinear: 'from-amber-500/20 via-neutral-900 to-orange-500/10',
  },
  {
    id: 'organic-arrow-pushing',
    title: 'The Arrow Pushing Codex: All Reaction Mechanisms',
    subject: 'Chemistry',
    category: 'High-Yield Blueprint',
    episodesCount: 8,
    duration: '3h 10m',
    difficulty: 'JEE Mains & Advanced',
    description:
      'Never memorize an organic reaction again. Master resonance stabilization, carbocation shifts, and elimination cascades.',
    tag: 'MUST WATCH',
    bgLinear: 'from-yellow-500/20 via-neutral-900 to-amber-500/10',
  },
  {
    id: 'calculus-leibniz-tricks',
    title: 'Leibniz Integral Rule & Multi-Variable Symmetry Tricks',
    subject: 'Mathematics',
    category: 'Rank Decider Series',
    episodesCount: 5,
    duration: '1h 50m',
    difficulty: 'JEE Advanced Rankers',
    description:
      'Demystifying differentiating under the integral sign and exploiting polar symmetry for solving complex JEE Advanced definite integrals in minutes.',
    tag: 'AIR 1-100 LEVEL',
    bgLinear: 'from-orange-500/20 via-neutral-900 to-amber-600/10',
  },
  {
    id: 'electrodynamics-maxwell',
    title: 'Electromagnetic Induction: Poynting Vector & Field Flux',
    subject: 'Physics',
    category: 'Conceptual Deep Dive',
    episodesCount: 7,
    duration: '2h 40m',
    difficulty: 'JEE Advanced',
    description:
      'Trace energy transport in electric circuits and understand why energy flows through empty space outside wires.',
    tag: 'NEW RELEASE',
    bgLinear: 'from-amber-600/20 via-neutral-900 to-neutral-950',
  },
]

export default function OriginalsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 py-12 px-4 sm:px-6">
      <div className="relative mx-auto max-w-6xl">
        {/* Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[150px]"></div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-xs font-bold text-orange-400 mb-4">
            <Flame className="h-4 w-4 fill-orange-400" />
            <span>AXIOM ORIGINALS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Cinematic Science{' '}
            <span className="bg-linear-to-r from-amber-200 via-orange-400 to-rose-500 bg-clip-text text-transparent">
              Concept Masterclasses
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
            Exclusive high-production walkthroughs, 3D physics engines, and rank-deciding mathematical reductions created exclusively for Axiom members.
          </p>
        </div>

        {/* Featured Card */}
        <div className="mb-14 overflow-hidden rounded-3xl border border-amber-500/30 bg-linear-to-r from-amber-500/15 via-neutral-900 to-orange-500/15 p-8 md:p-10 backdrop-blur-2xl shadow-2xl relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-amber-500 px-2.5 py-0.5 text-[10px] font-black uppercase text-neutral-950">
                  Featured Series
                </span>
                <span className="text-xs text-amber-300 font-bold">Rotational Dynamics in 3D</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                Rolling Without Slipping &amp; Conservation Invariants
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Step inside the rotating reference frame with 360-degree vector graphics. Watch angular momentum vectors precess in real time with interactive parametric sliders.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pt-2">
                <span className="flex items-center gap-1.5 font-mono">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  6 Master Episodes (2h 15m)
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">Includes 45 Guided Practice Drills</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
              <Link
                href="/practice?subject=physics"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-amber-400 via-amber-500 to-orange-500 px-7 py-3.5 text-xs font-black text-neutral-950 shadow-lg shadow-amber-500/25 hover:scale-105 transition"
              >
                <Play className="h-4 w-4 fill-neutral-950" />
                <span>Watch &amp; Practice</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Series Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {originalsList.map((series) => (
            <div
              key={series.id}
              className={`rounded-3xl border border-white/10 bg-linear-to-b ${series.bgLinear} p-6 sm:p-8 backdrop-blur-xl transition hover:border-amber-500/40 hover:scale-[1.01] shadow-xl flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-neutral-900/80 px-3 py-1 text-[10px] font-extrabold uppercase text-amber-400 border border-amber-500/20">
                    {series.tag}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                    <Clock className="h-3 w-3 text-amber-400" />
                    <span>{series.duration}</span>
                  </div>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  {series.subject} • {series.category}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 leading-snug">{series.title}</h3>
                <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                  {series.description}
                </p>
              </div>

              <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-medium">
                  {series.episodesCount} Episodes • {series.difficulty}
                </span>
                <Link
                  href={`/practice?subject=${series.subject.toLowerCase()}`}
                  className="flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition"
                >
                  <span>Start Series</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
