import React from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Target,
  Brain,
  ShieldCheck,
  Zap,
  BarChart3,
  Award,
  ArrowRight,
  BookOpen,
  Atom,
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 py-12 px-4 sm:px-6">
      <div className="relative mx-auto max-w-5xl">
        {/* Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[150px]"></div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-bold text-amber-400 mb-4">
            <Atom className="h-4 w-4" />
            <span>THE AXIOM PEDAGOGY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Built for Students Who Demand{' '}
            <span className="bg-linear-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              Flawless Precision
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
            Most aspirants solve thousands of random questions without building true conceptual invariants. Axiom was engineered to calibrate your speed, eliminate cognitive errors, and train your instincts for competitive exams.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 backdrop-blur-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">5-Tier Progressive Rigor</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every chapter is stratified into 5 distinct tiers. You do not touch Olympiad multi-concept twists until your fundamental formulas and speed benchmarks are verified.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 backdrop-blur-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Sub-Second AI Doubt Engine</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Trained on 10+ years of JEE Advanced &amp; NEET papers, Axiom AI diagnoses exactly which premise or algebra step you stumbled on, providing targeted conceptual hints rather than rote answers.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 backdrop-blur-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Real-Time Percentile Diagnostics</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Timing consistency matters as much as accuracy. Our CBT practice engine tracks millisecond pacing per question to predict your All India Percentile in real exam conditions.
            </p>
          </div>
        </div>

        {/* Detailed Story */}
        <div className="rounded-3xl border border-amber-500/20 bg-linear-to-b from-amber-500/5 via-neutral-900 to-neutral-950 p-8 md:p-10 mb-16 backdrop-blur-xl space-y-6">
          <h2 className="text-2xl font-black text-white">Why We Built Axiom</h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            In competitive examinations like JEE Advanced and NEET UG, having 90% syllabus completion is insufficient. What determines top ranks is <strong>zero calculation errors under 60-second time constraints</strong> and the ability to synthesize concepts from different domains.
          </p>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Traditional textbooks and test series present static answer keys with missing steps. Axiom bridges this void by offering dynamic, step-by-step mathematical reasoning, interactive parameter manipulation, and structured tier-based progression.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5">
            <div>
              <div className="text-2xl font-black text-white">50,000+</div>
              <div className="text-xs text-neutral-400">Curated PYQs &amp; Drills</div>
            </div>
            <div>
              <div className="text-2xl font-black text-amber-400">99.85</div>
              <div className="text-xs text-neutral-400">Top AIR Percentile</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-400">24/7</div>
              <div className="text-xs text-neutral-400">Instant AI Tutor</div>
            </div>
            <div>
              <div className="text-2xl font-black text-orange-400">100%</div>
              <div className="text-xs text-neutral-400">Official Exam Fidelity</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-amber-400 via-amber-500 to-orange-500 px-8 py-4 text-xs font-black text-neutral-950 shadow-lg shadow-amber-500/25 hover:scale-105 transition"
          >
            <span>Start Practicing on Axiom</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
