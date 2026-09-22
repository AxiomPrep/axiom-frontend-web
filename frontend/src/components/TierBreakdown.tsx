'use client'

import React, { useState } from 'react'
import { Layers, ShieldCheck, Zap, Award, Target, ChevronRight } from 'lucide-react'

interface Tier {
  id: number
  name: string
  subtitle: string
  targetPercentile: string
  problemStyle: string
  recommendedFor: string
  color: string
  tagColor: string
  details: string[]
}

const tiers: Tier[] = [
  {
    id: 1,
    name: 'Tier 1 — Foundation & Direct Formulas',
    subtitle: 'NCERT Core & Direct Application',
    targetPercentile: 'Target: Board Mastery & Speed Warmup',
    problemStyle: 'Single formula substitution & fundamental definitions',
    recommendedFor: 'Class 11 & 12 Beginners, Concept Building',
    color: 'from-amber-400 to-yellow-500',
    tagColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    details: [
      'Direct numerical value substitution with single-step unit conversion.',
      'Definition-based organic reaction mechanisms and NCERT bio recall.',
      'Basic vector algebra, trigonometry ratios, and kinematics formulas.',
    ],
  },
  {
    id: 2,
    name: 'Tier 2 — JEE Main & NEET Speed Standard',
    subtitle: 'NTA Exam Speed & Moderate Calculations',
    targetPercentile: 'Target: 95+ Percentile in JEE Main / 620+ in NEET',
    problemStyle: 'Two-step calculations with moderate algebraic traps',
    recommendedFor: 'Standard JEE Main & NEET Aspirants',
    color: 'from-orange-400 to-amber-500',
    tagColor: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    details: [
      'NTA CBT exam style questions (Single Option Correct & Integer inputs).',
      'Physical chemistry stoichiometry combined with thermodynamics.',
      'Calculus integration by parts, differential equations, and vectors 3D.',
    ],
  },
  {
    id: 3,
    name: 'Tier 3 — JEE Advanced Multi-Concept',
    subtitle: 'Cross-Chapter Synthesis & Traps',
    targetPercentile: 'Target: Top 10,000 Rank in JEE Advanced',
    problemStyle: 'Multiple correct options, matching lists, and comprehensive paragraphs',
    recommendedFor: 'Serious JEE Advanced Aspirants',
    color: 'from-red-400 to-orange-500',
    tagColor: 'bg-red-500/15 text-red-400 border-red-500/30',
    details: [
      'Combines electrodynamics with rotational mechanics in a single question.',
      'Multi-step organic synthesis pathways requiring stereochemistry depth.',
      'Complex number geometry combined with coordinate geometry hyperbola.',
    ],
  },
  {
    id: 4,
    name: 'Tier 4 — Top 1% Rank Deciders',
    subtitle: 'High-Yield Rank Boosting Rigor',
    targetPercentile: 'Target: Top 1,000 AIR (All India Rank)',
    problemStyle: 'Unseen problem patterns & high algebraic precision',
    recommendedFor: 'Top Percentile Performers',
    color: 'from-purple-400 to-pink-500',
    tagColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    details: [
      'Calculus-based non-uniform field problems and variable mass dynamics.',
      'Advanced thermodynamics statistical mechanics & chemical equilibria.',
      'Matrices & determinants properties with limit evaluation.',
    ],
  },
  {
    id: 5,
    name: 'Tier 5 — Olympiad Benchmark Rigor',
    subtitle: 'INPhO, INChO, IMO & IPhO Level',
    targetPercentile: 'Target: International Olympiad Qualified',
    problemStyle: 'Deep conceptual proofs and theoretical research-level setups',
    recommendedFor: 'Olympiad Candidates & Top 100 Ranks',
    color: 'from-emerald-400 to-teal-500',
    tagColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    details: [
      'Lagrangian dynamics, special relativity transformations, and quantum wavepackets.',
      'Advanced synthesis mechanism proofs & spectroscopic analytical puzzles.',
      'Number theory proofs, combinatorics, and functional equations.',
    ],
  },
]

export default function TierBreakdown() {
  const [activeTierId, setActiveTierId] = useState<number>(2)

  const activeTier = tiers.find((t) => t.id === activeTierId) || tiers[1]

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[11px] font-extrabold tracking-widest text-amber-400 uppercase mb-3">
            <Layers className="h-3.5 w-3.5 text-amber-400" />
            <span>5-Tier Practice Engine</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Calibrated Difficulty Calibration
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            Progress systematically from NCERT foundation to Top 1% rank deciders and Olympiad benchmarks.
          </p>
        </div>

        {/* Tier Selector Buttons */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4">
          {tiers.map((t) => {
            const isActive = t.id === activeTierId
            return (
              <button
                key={t.id}
                onClick={() => setActiveTierId(t.id)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-neutral-900 border border-white/10 text-neutral-300 hover:border-amber-500/30 hover:text-white'
                }`}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-neutral-950/20 font-mono text-[11px] font-black">
                  {t.id}
                </span>
                <span>Tier {t.id}</span>
              </button>
            )
          })}
        </div>

        {/* Active Tier Display Card */}
        <div className="mt-6 rounded-3xl border border-amber-500/20 bg-neutral-950 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <span className={`inline-block text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${activeTier.tagColor} mb-2`}>
                {activeTier.subtitle}
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-white">
                {activeTier.name}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-amber-400 font-semibold">
                {activeTier.targetPercentile}
              </p>
            </div>

            <div className="rounded-2xl bg-neutral-900 border border-white/10 p-4 text-xs">
              <span className="text-neutral-400 font-medium">Recommended Cohort:</span>
              <div className="font-bold text-white mt-0.5">{activeTier.recommendedFor}</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                Question Characteristics & Problem Style
              </h4>
              <p className="text-sm font-medium text-neutral-200 leading-relaxed mb-4">
                {activeTier.problemStyle}
              </p>

              <div className="space-y-2.5">
                {activeTier.details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <ChevronRight className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Target className="h-6 w-6" />
              </div>
              <h4 className="text-sm font-black text-white">Master Tier {activeTier.id} PYQs</h4>
              <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                Filter the 50,000+ question catalog strictly by Tier {activeTier.id} level questions.
              </p>
              <a
                href={`/practice?tier=${activeTier.id}`}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-amber-400 to-orange-500 px-5 py-2.5 text-xs font-extrabold text-neutral-950 shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition"
              >
                <span>Practice Tier {activeTier.id} Now</span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
