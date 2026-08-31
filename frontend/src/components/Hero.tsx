'use client'

import { useState, Fragment } from 'react'
import SubjectPills from './SubjectPills'
import ValidationSection from './ValidationSection'
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  XCircle,
  Brain,
  Target,
  BarChart3,
  Zap,
  Star,
  BookOpen,
  Atom,
  FlaskConical,
  Calculator,
  Dna,
  RotateCcw,
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
    { text: '∫ f(x) dx', label: 'MATHEMATICS', icon: Calculator, top: '32%', left: '5%' },
    { text: 'pH = -log[H⁺]', label: 'CHEMISTRY', icon: FlaskConical, top: '52%', left: '2%' },
    { text: 'ATP ↔ ADP', label: 'BIOLOGY', icon: Dna, top: '72%', left: '4%' },
  ],
  right: [
    { text: 'E = m · c²', label: 'RELATIVITY', icon: Atom, top: '14%', right: '3%' },
    { text: 'sin²θ + cos²θ = 1', label: 'TRIGONOMETRY', icon: Calculator, top: '34%', right: '5%' },
    { text: 'PV = nRT', label: 'THERMO', icon: FlaskConical, top: '54%', right: '3%' },
    { text: 'ΔG = ΔH - TΔS', label: 'ENTROPY', icon: Atom, top: '74%', right: '4%' },
  ],
}

interface Option {
  label: string
  text: string
  correct?: boolean
}

interface DemoQuestion {
  id: number
  subject: string
  topic: string
  difficulty: string
  question: string
  options: Option[]
  explanation: string
}

const demoQuestions: DemoQuestion[] = [
  {
    id: 1,
    subject: 'Physics',
    topic: 'Rotational Dynamics',
    difficulty: 'JEE Advanced',
    question:
      'A uniform disc of mass M and radius R rolls without slipping on a horizontal surface. What is the ratio of its rotational kinetic energy to total kinetic energy?',
    options: [
      { label: 'A', text: '1 : 2' },
      { label: 'B', text: '1 : 3', correct: true },
      { label: 'C', text: '2 : 3' },
      { label: 'D', text: '1 : 4' },
    ],
    explanation:
      'K_rot = 1/2 I w² = 1/4 M v². K_total = K_trans + K_rot = 3/4 M v². Therefore K_rot / K_total = (1/4) / (3/4) = 1/3.',
  },
]

type ActiveTab = 'pyq' | 'ai' | 'analytics'

export default function Hero() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('pyq')
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showSolution, setShowSolution] = useState(false)

  const currentQ = demoQuestions[0]

  const handleOptionClick = (index: number) => {
    setSelectedOption(index)
    setShowSolution(true)
  }

  const resetDemo = () => {
    setSelectedOption(null)
    setShowSolution(false)
  }

  return (
    <section className="relative overflow-hidden bg-neutral-950 text-neutral-100 bg-grid-pattern pb-24">
      {/* Background ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-linear-to-b from-amber-500/20 via-orange-600/10 to-transparent blur-[140px]"></div>
        <div className="absolute top-1/3 left-[5%] h-80 w-80 rounded-full bg-amber-600/10 blur-[130px]"></div>
        <div className="absolute top-1/2 right-[5%] h-96 w-96 rounded-full bg-orange-500/10 blur-[140px]"></div>
      </div>

      <div className="bg-grain pointer-events-none absolute inset-0 opacity-30"></div>

      {/* Floating formulas — left */}
      {floatingFormulas.left.map((item, idx) => {
        const Icon = item.icon
        return (
          <div
            key={`left-${idx}`}
            className="pointer-events-none absolute hidden text-xs lg:block animate-float"
            style={{ top: item.top, left: item.left, animationDelay: `${idx * 0.7}s` }}
          >
            <div className="flex items-center gap-2 rounded-xl border border-amber-500/15 bg-neutral-900/40 px-3 py-2 backdrop-blur-md opacity-40 hover:opacity-100 transition-opacity">
              <Icon className="h-3.5 w-3.5 text-amber-400" />
              <div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-amber-500/70">{item.label}</div>
                <div className="font-mono text-xs text-neutral-300">{item.text}</div>
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
            className="pointer-events-none absolute hidden text-xs lg:block animate-float-delayed"
            style={{ top: item.top, right: item.right, animationDelay: `${idx * 0.7}s` }}
          >
            <div className="flex items-center gap-2 rounded-xl border border-amber-500/15 bg-neutral-900/40 px-3 py-2 backdrop-blur-md opacity-40 hover:opacity-100 transition-opacity">
              <Icon className="h-3.5 w-3.5 text-amber-400" />
              <div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-amber-500/70">{item.label}</div>
                <div className="font-mono text-xs text-neutral-300">{item.text}</div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Main container */}
      <div className="relative mx-auto max-w-6xl px-6 pt-16 md:pt-20">

        {/* Hero pill badge */}
        <div className="animate-fade-in-up mb-6 flex justify-center" style={{ animationDelay: '0.05s' }}>
          <a
            href="#demo"
            className="group relative inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md transition-all duration-300 hover:border-amber-500/60 hover:bg-amber-500/20 hover:shadow-lg hover:shadow-amber-500/15"
          >
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>AXIOM 2.0 IS LIVE</span>
            </span>
            <span className="text-amber-500/60">|</span>
            <span className="text-neutral-200">Next-Gen Science Engine</span>
            <ArrowRight className="h-3.5 w-3.5 text-amber-400 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Subject tags */}
        <div
          className="animate-fade-in-up mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400/80"
          style={{ animationDelay: '0.12s' }}
        >
          {subjectTags.map((tag, idx) => (
            <Fragment key={tag}>
              {idx > 0 && <span className="text-neutral-700">·</span>}
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]"></span>
                {tag}
              </span>
            </Fragment>
          ))}
        </div>

        {/* Main headline */}
        <h1
          className="animate-fade-in-up mb-6 text-center text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05]"
          style={{ animationDelay: '0.2s' }}
        >
          Master Science with{' '}
          <span className="block bg-linear-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">
            Precision &amp; Speed
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
          Solve 50,000+ curated PYQs, get instant step-by-step AI doubt clearance, and master high-yield concepts with top faculty insights.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-in-up mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: '0.5s' }}
        >
          <button className="group relative w-full overflow-hidden rounded-2xl bg-linear-to-r from-amber-400 via-amber-500 to-orange-500 px-8 py-4 text-base font-bold text-neutral-950 shadow-xl shadow-amber-500/25 transition-all duration-300 hover:scale-105 hover:shadow-amber-500/40 active:scale-95 sm:w-auto">
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>Start 7-Day Free Trial</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
          </button>

          <a
            href="#demo"
            className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-amber-500/30 bg-neutral-900/80 px-8 py-4 text-base font-semibold text-neutral-200 backdrop-blur-md transition-all duration-300 hover:border-amber-500/60 hover:bg-neutral-800 hover:text-white sm:w-auto"
          >
            <Play className="h-4 w-4 text-amber-400 fill-amber-400 transition-transform duration-300 group-hover:scale-110" />
            <span>Interactive Demo</span>
          </a>
        </div>

        {/* Interactive demo mockup */}
        <div
          id="demo"
          className="animate-fade-in-up relative mx-auto mb-20 max-w-4xl"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="absolute -inset-1.5 rounded-3xl bg-linear-to-r from-amber-500/30 via-orange-500/20 to-amber-600/30 opacity-70 blur-xl"></div>

          <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-neutral-900/90 shadow-2xl backdrop-blur-2xl">
            {/* Header bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/15 bg-neutral-950/80 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="ml-2 font-mono text-[11px] font-medium text-neutral-400 hidden sm:inline-block">
                  axiom.app/practice-engine
                </span>
              </div>

              <div className="flex items-center gap-1 rounded-xl bg-neutral-900 p-1 border border-white/5">
                {([['pyq', Target, 'JEE Practice'], ['ai', Brain, 'AI Solver'], ['analytics', BarChart3, 'Analytics']] as const).map(
                  ([tab, Icon, label]) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                        activeTab === tab
                          ? 'bg-amber-500 text-neutral-950 shadow-md'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{label}</span>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Body content */}
            <div className="p-6 md:p-8">
              {activeTab === 'pyq' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-amber-500/20 px-2.5 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
                        {currentQ.subject}
                      </span>
                      <span className="text-xs text-neutral-400">• {currentQ.topic}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-amber-300 font-medium border border-amber-500/20">
                        {currentQ.difficulty}
                      </span>
                      {selectedOption !== null && (
                        <button
                          onClick={resetDemo}
                          className="flex items-center gap-1 text-neutral-400 hover:text-amber-400 transition-colors"
                        >
                          <RotateCcw className="h-3 w-3" />
                          <span>Reset</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-sm font-medium leading-relaxed text-neutral-100 sm:text-base">
                    {currentQ.question}
                  </p>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {currentQ.options.map((opt, idx) => {
                      const isSelected = selectedOption === idx
                      const isCorrect = opt.correct

                      let buttonStyle =
                        'border-white/10 bg-neutral-800/40 text-neutral-200 hover:border-amber-500/40 hover:bg-neutral-800'
                      if (selectedOption !== null) {
                        if (isSelected && isCorrect) {
                          buttonStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                        } else if (isSelected && !isCorrect) {
                          buttonStyle = 'border-rose-500 bg-rose-950/40 text-rose-300'
                        } else if (isCorrect) {
                          buttonStyle = 'border-emerald-500/60 bg-emerald-950/20 text-emerald-300'
                        }
                      }

                      return (
                        <button
                          key={opt.label}
                          onClick={() => handleOptionClick(idx)}
                          className={`flex items-center gap-3 rounded-xl border p-3.5 text-left text-xs sm:text-sm font-medium transition-all ${buttonStyle}`}
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-neutral-900 font-mono text-xs font-bold text-amber-400">
                            {opt.label}
                          </span>
                          <span className="flex-1">{opt.text}</span>
                          {selectedOption !== null && isSelected && isCorrect && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          )}
                          {selectedOption !== null && isSelected && !isCorrect && (
                            <XCircle className="h-4 w-4 text-rose-400" />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {showSolution ? (
                    <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 animate-fade-in-up">
                      <div className="mb-1 flex items-center gap-2 font-bold text-amber-400 text-xs uppercase tracking-wider">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Axiom Step-by-Step Solution</span>
                      </div>
                      <p className="font-mono text-xs leading-relaxed text-neutral-300">
                        {currentQ.explanation}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center text-xs text-neutral-500 italic">
                      💡 Click any option above to test Axiom&apos;s instant feedback system.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-amber-500/20 bg-neutral-950 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                        <Brain className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        readOnly
                        value="Explain Lenz's Law and conservation of energy in electromagnetic induction..."
                        className="w-full bg-transparent text-xs text-neutral-200 focus:outline-none"
                      />
                      <button className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-neutral-950">
                        Ask
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-amber-500/20 bg-neutral-800/40 p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-amber-400 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5" />
                        Axiom AI Tutor Response
                      </span>
                      <span className="text-[10px] text-neutral-400">Confidence: 99.4%</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Lenz&apos;s Law states that the induced electromotive force (emf) always creates a current whose magnetic field opposes the change in magnetic flux that produced it:{' '}
                      <code className="mx-1 rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-amber-300">ε = -dΦ/dt</code>.
                    </p>
                    <div className="rounded-lg bg-neutral-900 p-3 border border-white/5 text-[11px] font-mono text-amber-400/90">
                      Step 1: Calculate dΦ/dt → Step 2: Apply Right Hand Grip Rule → Step 3: Verify mechanical work equals electrical power output.
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-xl border border-amber-500/20 bg-neutral-950 p-3">
                      <div className="text-[10px] font-semibold text-neutral-400 uppercase">Accuracy</div>
                      <div className="text-lg font-black text-emerald-400">92.4%</div>
                    </div>
                    <div className="rounded-xl border border-amber-500/20 bg-neutral-950 p-3">
                      <div className="text-[10px] font-semibold text-neutral-400 uppercase">Speed / Q</div>
                      <div className="text-lg font-black text-amber-400">1m 12s</div>
                    </div>
                    <div className="rounded-xl border border-amber-500/20 bg-neutral-950 p-3">
                      <div className="text-[10px] font-semibold text-neutral-400 uppercase">Percentile Est.</div>
                      <div className="text-lg font-black text-orange-400">99.85</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-neutral-300 font-medium">
                      <span>Physics Mechanics &amp; Electrodynamics</span>
                      <span className="text-amber-400 font-bold">95%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
                      <div className="h-full rounded-full bg-linear-to-r from-amber-500 to-orange-500 w-[95%]"></div>
                    </div>

                    <div className="flex justify-between text-xs text-neutral-300 font-medium pt-2">
                      <span>Organic &amp; Physical Chemistry</span>
                      <span className="text-amber-400 font-bold">88%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
                      <div className="h-full rounded-full bg-linear-to-r from-amber-500 to-orange-500 w-[88%]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
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
              className="flex flex-col items-center rounded-2xl border border-amber-500/15 bg-neutral-900/50 p-5 backdrop-blur-md text-center"
            >
              <div className="mb-2 rounded-xl bg-amber-500/10 p-2.5 text-amber-400">
                <Icon className={`h-5 w-5 ${filled ? 'fill-amber-400 text-amber-400' : ''}`} />
              </div>
              <div className="text-2xl font-black text-white sm:text-3xl">{value}</div>
              <div className="text-xs text-neutral-400 font-medium mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Subject pills */}
        <div className="animate-fade-in-up mb-20" style={{ animationDelay: '0.8s' }}>
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
