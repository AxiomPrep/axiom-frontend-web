'use client'

import React, { useState } from 'react'
import { Sparkles, CheckCircle2, XCircle, Award, HelpCircle, ArrowRight, RefreshCw } from 'lucide-react'

interface Question {
  subject: string
  year: string
  exam: string
  questionText: string
  options: string[]
  correctIndex: number
  explanation: string
}

const dailyQuestions: Record<string, Question> = {
  Physics: {
    subject: 'Physics',
    year: 'JEE Main 2024',
    exam: 'Physics Mechanics',
    questionText:
      'A particle moves along a straight line such that its displacement x at time t is given by x² = t² + 1. The acceleration of the particle is proportional to:',
    options: ['x⁻³', 'x⁻²', 'x⁻¹', 'x³'],
    correctIndex: 0,
    explanation:
      'Differentiating x² = t² + 1 with respect to t gives 2x(dx/dt) = 2t => v = t/x. Differentiating again: a = dv/dt = (x - t·v)/x² = (x - t²/x)/x² = (x² - t²)/x³ = 1/x³. Thus acceleration a ∝ x⁻³.',
  },
  Chemistry: {
    subject: 'Chemistry',
    year: 'JEE Advanced 2023',
    exam: 'Organic Chemistry',
    questionText:
      'Which of the following compounds undergoes fastest SN1 solvolysis reaction in aqueous ethanol?',
    options: [
      '2-Bromo-2-methylpropane (tert-Butyl bromide)',
      '1-Bromopropane',
      '2-Bromopropane',
      'Bromobenzene',
    ],
    correctIndex: 0,
    explanation:
      'SN1 solvolysis rate depends on the stability of the intermediate carbocation. tert-Butyl bromide forms a tertiary carbocation stabilized by hyperconjugation (9 α-hydrogens) and inductive effect.',
  },
  Mathematics: {
    subject: 'Mathematics',
    year: 'JEE Main 2024',
    exam: 'Calculus',
    questionText:
      'The value of the definite integral ∫₀^(π/2) (sin³x / (sin³x + cos³x)) dx is equal to:',
    options: ['π / 4', 'π / 2', 'π / 8', '0'],
    correctIndex: 0,
    explanation:
      'Using King’s Property ∫ₐᵇ f(x)dx = ∫ₐᵇ f(a+b-x)dx: Let I = ∫₀^(π/2) sin³x/(sin³x+cos³x) dx. Then I = ∫₀^(π/2) cos³x/(cos³x+sin³x) dx. Adding both gives 2I = ∫₀^(π/2) 1 dx = π/2 => I = π/4.',
  },
  Biology: {
    subject: 'Biology',
    year: 'NEET 2024',
    exam: 'Genetics',
    questionText:
      'In Mendel’s dihybrid cross between round yellow (RRYY) and wrinkled green (rryy) seeds, what is the expected phenotypic ratio in F2 generation?',
    options: ['9 : 3 : 3 : 1', '1 : 2 : 1', '3 : 1', '1 : 1 : 1 : 1'],
    correctIndex: 0,
    explanation:
      'In F2 generation of a classic Mendelian dihybrid cross with unlinked genes, independent assortment yields a 9:3:3:1 phenotypic ratio (9 Round Yellow : 3 Round Green : 3 Wrinkled Yellow : 1 Wrinkled Green).',
  },
}

export default function DailyChallenge() {
  const [selectedSubject, setSelectedSubject] = useState<string>('Physics')
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showSolution, setShowSolution] = useState<boolean>(false)
  const [earnedCoins, setEarnedCoins] = useState<boolean>(false)

  const currentQ = dailyQuestions[selectedSubject]

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx)
    setShowSolution(true)
    if (idx === currentQ.correctIndex && !earnedCoins) {
      setEarnedCoins(true)
    }
  }

  const handleSubjectChange = (sub: string) => {
    setSelectedSubject(sub)
    setSelectedOption(null)
    setShowSolution(false)
  }

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-neutral-900/80 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-amber-400 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Daily PYQ Challenge</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                Question of the Day
              </h2>
            </div>

            {/* Subject Selector Tabs */}
            <div className="flex flex-wrap gap-1.5 rounded-2xl bg-neutral-950 p-1.5 border border-white/10">
              {['Physics', 'Chemistry', 'Mathematics', 'Biology'].map((sub) => (
                <button
                  key={sub}
                  onClick={() => handleSubjectChange(sub)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                    selectedSubject === sub
                      ? 'bg-amber-500 text-neutral-950 shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Question Box */}
          <div className="mt-6">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400/90 mb-3">
              <span className="rounded-md bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[10px] uppercase">
                {currentQ.year}
              </span>
              <span>•</span>
              <span className="text-neutral-400">{currentQ.exam}</span>
            </div>

            <p className="text-base sm:text-lg font-semibold text-neutral-100 leading-relaxed">
              {currentQ.questionText}
            </p>

            {/* Options Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx
                const isCorrect = idx === currentQ.correctIndex
                let btnStyle = 'border-white/10 bg-neutral-950/70 text-neutral-200 hover:border-amber-500/40'

                if (showSolution) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-bold'
                  } else if (isSelected) {
                    btnStyle = 'border-red-500 bg-red-500/15 text-red-300'
                  }
                } else if (isSelected) {
                  btnStyle = 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold'
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`flex items-start gap-3 rounded-2xl border p-4 text-left text-sm transition-all duration-200 ${btnStyle}`}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/5 font-mono text-xs font-bold text-neutral-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {showSolution && isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    )}
                    {showSolution && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-red-400 shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Coin Reward Banner */}
            {earnedCoins && (
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 animate-fade-in-up">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-neutral-950 font-black">
                    +50
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-amber-300">Correct Answer! +50 Coins Earned</h4>
                    <p className="text-xs text-neutral-400">Added to your Axiom Reward Wallet balance.</p>
                  </div>
                </div>
                <Award className="h-6 w-6 text-amber-400" />
              </div>
            )}

            {/* Explanation Breakdown */}
            {showSolution && (
              <div className="mt-6 rounded-2xl border border-amber-500/20 bg-neutral-950 p-5 animate-fade-in-up">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-2">
                  <HelpCircle className="h-4 w-4 text-amber-400" />
                  <span>Step-by-Step Master Breakdown</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-mono bg-white/3 p-3 rounded-xl border border-white/5">
                  {currentQ.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
