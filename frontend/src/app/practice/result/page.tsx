'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  Sparkles,
  BarChart3,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Zap,
  Share2,
} from 'lucide-react'

interface QuestionResult {
  questionId: number
  questionText: string
  formula?: string
  options: { id: 'A' | 'B' | 'C' | 'D'; text: string }[]
  correctOption: 'A' | 'B' | 'C' | 'D'
  selectedOption: 'A' | 'B' | 'C' | 'D' | null
  isCorrect: boolean
  timeSpent: number
  explanation: string
  difficulty: string
}

interface StoredAttempt {
  subjectName: string
  chapterName: string
  tierName: string
  totalQuestions: number
  timeTakenSeconds: number
  attempts: QuestionResult[]
}

export default function AttemptResultPage() {
  const [data, setData] = useState<StoredAttempt | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('axiom_last_attempt')
      if (stored) {
        try {
          setData(JSON.parse(stored))
        } catch {
          // fallback
        }
      }
    }
  }, [])

  // Default fallback data if page is accessed directly
  const attemptData: StoredAttempt = data || {
    subjectName: 'Physics',
    chapterName: 'Rotational Dynamics & Torque',
    tierName: 'Rank Booster (Tier 3)',
    totalQuestions: 5,
    timeTakenSeconds: 340,
    attempts: [
      {
        questionId: 1,
        questionText:
          'A solid cylinder of mass M and radius R rolls without slipping down an inclined plane of angle θ. The coefficient of static friction required to prevent slipping is:',
        formula: 'a = g sinθ / (1 + I / MR²)',
        options: [
          { id: 'A', text: '(1/3) tan θ' },
          { id: 'B', text: '(1/2) tan θ' },
          { id: 'C', text: '(2/3) tan θ' },
          { id: 'D', text: 'tan θ' },
        ],
        correctOption: 'A',
        selectedOption: 'A',
        isCorrect: true,
        timeSpent: 62,
        explanation:
          'For rolling without slipping on an inclined plane: a = g sinθ / (1 + I/MR²). For a solid cylinder, I = (1/2) MR², so a = (2/3) g sinθ. The friction force f = I α / R = (1/2) M a = (1/3) M g sinθ. Since f ≤ μ_s N and N = M g cosθ, we have (1/3) M g sinθ ≤ μ_s M g cosθ ⇒ μ_s ≥ (1/3) tan θ.',
        difficulty: 'Hard',
      },
      {
        questionId: 2,
        questionText:
          'Two discs of moments of inertia I₁ and I₂, rotating with angular velocities ω₁ and ω₂ about their common coaxial axis in the same sense, are brought in contact face to face. The loss of kinetic energy in the process is:',
        formula: 'ΔK = (1/2) [I₁ I₂ / (I₁ + I₂)] (ω₁ - ω₂)²',
        options: [
          { id: 'A', text: '(1/2) [I₁ I₂ / (I₁ + I₂)] (ω₁ - ω₂)²' },
          { id: 'B', text: '[I₁ I₂ / (I₁ + I₂)] (ω₁ - ω₂)²' },
          { id: 'C', text: '(1/4) (I₁ + I₂) (ω₁ - ω₂)²' },
          { id: 'D', text: '(1/2) (I₁ - I₂) (ω₁ + ω₂)²' },
        ],
        correctOption: 'A',
        selectedOption: 'A',
        isCorrect: true,
        timeSpent: 75,
        explanation:
          'By conservation of angular momentum about the common axis: (I₁ + I₂) ω_f = I₁ ω₁ + I₂ ω₂. Initial KE = (1/2) I₁ ω₁² + (1/2) I₂ ω₂². Final KE = (1/2) (I₁ + I₂) ω_f². Computing ΔK = KE_initial - KE_final gives (1/2) [I₁ I₂ / (I₁ + I₂)] (ω₁ - ω₂)², which is strictly positive unless ω₁ = ω₂.',
        difficulty: 'Medium',
      },
      {
        questionId: 3,
        questionText:
          'A thin uniform rod of length L and mass M is free to rotate in a vertical plane about a horizontal axis through its one end. If it is released from the horizontal position, the angular velocity when it passes through the vertical is:',
        formula: 'M g (L/2) = (1/2) I ω²',
        options: [
          { id: 'A', text: '√(2g / L)' },
          { id: 'B', text: '√(3g / L)' },
          { id: 'C', text: '√(6g / L)' },
          { id: 'D', text: '√(g / 3L)' },
        ],
        correctOption: 'B',
        selectedOption: 'B',
        isCorrect: true,
        timeSpent: 68,
        explanation:
          'From conservation of mechanical energy: Loss in potential energy = Gain in rotational kinetic energy. The center of mass drops by L/2, so ΔU = M g (L/2). Rotational inertia about end is I = (1/3) M L². Thus, (1/2) [(1/3) M L²] ω² = M g L / 2  ⇒  ω² = 3g / L  ⇒  ω = √(3g / L).',
        difficulty: 'Hard',
      },
      {
        questionId: 4,
        questionText:
          'A particle of mass m moves along a line y = b, z = 0 with constant velocity v in the positive x-direction. Its angular momentum relative to the origin at any time t is:',
        formula: 'L = r × p',
        options: [
          { id: 'A', text: 'Zero' },
          { id: 'B', text: '- m v b k̂ (constant in time)' },
          { id: 'C', text: '+ m v b ĵ (increases with t)' },
          { id: 'D', text: '- m v b î (oscillates)' },
        ],
        correctOption: 'B',
        selectedOption: 'C',
        isCorrect: false,
        timeSpent: 80,
        explanation:
          'Position vector r(t) = x î + b ĵ. Linear momentum p = m v î. Angular momentum L = r × p = (x î + b ĵ) × (m v î) = b m v (ĵ × î) = - m v b k̂. Notice this is totally independent of x and time t, demonstrating that angular momentum about the origin is conserved for unaccelerated linear motion.',
        difficulty: 'Advanced',
      },
      {
        questionId: 5,
        questionText:
          'The radius of gyration of a uniform sphere of radius R about a tangent is:',
        formula: 'I = I_cm + M d²',
        options: [
          { id: 'A', text: '√(2/5) R' },
          { id: 'B', text: '√(7/5) R' },
          { id: 'C', text: '√(5/7) R' },
          { id: 'D', text: '√(3/5) R' },
        ],
        correctOption: 'B',
        selectedOption: 'B',
        isCorrect: true,
        timeSpent: 55,
        explanation:
          'Using the parallel axis theorem: I_tangent = I_cm + M R² = (2/5) M R² + M R² = (7/5) M R². The radius of gyration k is defined by I = M k². Equating gives M k² = (7/5) M R² ⇒ k = √(7/5) R.',
        difficulty: 'Medium',
      },
    ],
  }

  const correctCount = attemptData.attempts.filter((a) => a.isCorrect).length
  const wrongCount = attemptData.attempts.filter((a) => a.selectedOption && !a.isCorrect).length
  const unattempted = attemptData.attempts.filter((a) => !a.selectedOption).length
  const rawScore = correctCount * 4 - wrongCount * 1
  const maxScore = attemptData.attempts.length * 4
  const accuracy = Math.round((correctCount / (correctCount + wrongCount || 1)) * 100)
  const avgTimePerQ = Math.round(attemptData.timeTakenSeconds / attemptData.attempts.length)

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(
        `I just scored ${rawScore}/${maxScore} with ${accuracy}% accuracy on Axiom (${attemptData.chapterName})! Check it out at https://axiom.app`
      )
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 py-12 px-4 sm:px-6">
      <div className="relative mx-auto max-w-5xl">
        {/* Glow backdrop */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[130px]"></div>

        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Trophy className="h-3.5 w-3.5" />
              <span>PRACTICE DIAGNOSTIC COMPLETE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Performance Scorecard
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              {attemptData.subjectName} • {attemptData.chapterName} • {attemptData.tierName}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-neutral-900 px-3.5 py-2 text-xs font-bold text-neutral-200 hover:bg-neutral-800 transition"
            >
              <Share2 className="h-3.5 w-3.5 text-amber-400" />
              <span>{copied ? 'Link Copied!' : 'Share Score'}</span>
            </button>
            <Link
              href="/practice"
              className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-neutral-950 shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition"
            >
              Practice Another Chapter
            </Link>
          </div>
        </div>

        {/* Big Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Total Score */}
          <div className="rounded-2xl border border-amber-500/30 bg-linear-to-b from-amber-500/10 to-neutral-900/80 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-2">
              <span>SCORE</span>
              <Trophy className="h-4 w-4" />
            </div>
            <div className="text-3xl font-black text-white">
              {rawScore}{' '}
              <span className="text-xs text-neutral-400 font-medium">/ {maxScore}</span>
            </div>
            <div className="mt-2 text-[11px] text-emerald-400 font-semibold">
              +{correctCount * 4} Marks / -{wrongCount} Penalty
            </div>
          </div>

          {/* Accuracy */}
          <div className="rounded-2xl border border-emerald-500/20 bg-neutral-900/60 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-bold mb-2">
              <span>ACCURACY</span>
              <Target className="h-4 w-4" />
            </div>
            <div className="text-3xl font-black text-emerald-400">{accuracy}%</div>
            <div className="mt-2 text-[11px] text-neutral-400">
              {correctCount} Correct • {wrongCount} Incorrect
            </div>
          </div>

          {/* Speed / Pace */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-2">
              <span>AVG SPEED</span>
              <Clock className="h-4 w-4" />
            </div>
            <div className="text-3xl font-black text-white">{avgTimePerQ}s</div>
            <div className="mt-2 text-[11px] text-neutral-400">
              Total {Math.round(attemptData.timeTakenSeconds / 60)}m {attemptData.timeTakenSeconds % 60}s
            </div>
          </div>

          {/* Estimated Percentile */}
          <div className="rounded-2xl border border-orange-500/20 bg-neutral-900/60 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-orange-400 font-bold mb-2">
              <span>PERCENTILE EST.</span>
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="text-3xl font-black text-orange-400">99.1%</div>
            <div className="mt-2 text-[11px] text-neutral-400">Top 1% Nationwide Rank</div>
          </div>
        </div>

        {/* Chapter Breakdown Card */}
        <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8 backdrop-blur-xl mb-10">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">Chapter &amp; Topic Diagnostic</h2>
            </div>
            <span className="text-xs text-amber-400 font-semibold">High Mastery Status</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-neutral-200 mb-1.5">
                <span>Rotational Kinetic Energy &amp; Rolling Without Slipping</span>
                <span className="text-emerald-400">100% (2/2 Correct)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500 w-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-neutral-200 mb-1.5">
                <span>Angular Momentum Conservation &amp; Torque</span>
                <span className="text-amber-400">66% (2/3 Correct)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
                <div className="h-full rounded-full bg-amber-500 w-[66%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-neutral-200 mb-1.5">
                <span>Moment of Inertia &amp; Parallel Axis Theorem</span>
                <span className="text-emerald-400">100% (1/1 Correct)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500 w-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-white">Detailed Solution Review</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Step-by-step mathematical reasoning &amp; error analysis
              </p>
            </div>
            <div className="text-xs text-neutral-400">
              {attemptData.attempts.length} Questions Reviewed
            </div>
          </div>

          {attemptData.attempts.map((attempt, idx) => (
            <div
              key={attempt.questionId}
              className={`rounded-2xl border p-6 backdrop-blur-xl transition ${
                attempt.isCorrect
                  ? 'border-emerald-500/30 bg-neutral-900/50'
                  : 'border-rose-500/30 bg-rose-950/10'
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-neutral-800 px-2.5 py-0.5 font-mono text-xs font-bold text-white">
                    Q{idx + 1}
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">
                    Difficulty: {attempt.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-mono text-xs text-neutral-400">
                    <Clock className="h-3 w-3 text-amber-400" />
                    {attempt.timeSpent}s spent
                  </span>
                  {attempt.isCorrect ? (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Correct (+4)
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-rose-500/20 px-2.5 py-0.5 text-xs font-bold text-rose-400 border border-rose-500/30">
                      <XCircle className="h-3.5 w-3.5" />
                      {attempt.selectedOption ? 'Incorrect (-1)' : 'Unattempted (0)'}
                    </span>
                  )}
                </div>
              </div>

              {/* Question Body */}
              <p className="text-sm sm:text-base font-medium text-neutral-200 mb-4 leading-relaxed">
                {attempt.questionText}
              </p>

              {/* Options Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                {attempt.options.map((opt) => {
                  const isCorrect = opt.id === attempt.correctOption
                  const isUserChosen = opt.id === attempt.selectedOption

                  let optClass = 'border-white/5 bg-neutral-950/60 text-neutral-400'
                  if (isCorrect) {
                    optClass = 'border-emerald-500 bg-emerald-950/30 text-emerald-300 font-semibold'
                  } else if (isUserChosen && !isCorrect) {
                    optClass = 'border-rose-500 bg-rose-950/30 text-rose-300 font-semibold'
                  }

                  return (
                    <div
                      key={opt.id}
                      className={`flex items-center gap-3 rounded-xl border p-3 text-xs ${optClass}`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded font-mono font-bold">
                        {opt.id}
                      </span>
                      <span className="flex-1">{opt.text}</span>
                      {isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
                      {isUserChosen && !isCorrect && (
                        <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* AI Step-by-Step Solution */}
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Axiom Step-by-Step AI Solution</span>
                </div>
                <p className="font-mono text-xs text-neutral-300 leading-relaxed">
                  {attempt.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <Link
            href="/practice"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-neutral-900 px-5 py-3 text-xs font-bold text-neutral-200 hover:bg-neutral-800 transition"
          >
            <RotateCcw className="h-4 w-4 text-amber-400" />
            <span>Retake This Chapter Practice</span>
          </Link>

          <Link
            href="/pyq-bank"
            className="flex items-center gap-2 rounded-xl bg-linear-to-r from-amber-400 to-orange-500 px-6 py-3 text-xs font-black text-neutral-950 shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition"
          >
            <BookOpen className="h-4 w-4" />
            <span>Explore PYQ Exam Sets</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
