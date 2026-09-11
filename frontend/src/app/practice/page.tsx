'use client'

import React, { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  SUBJECTS,
  CHAPTERS,
  PRACTICE_TIERS,
} from '@/data/mockCurriculum'
import {
  Atom,
  FlaskConical,
  Calculator,
  Dna,
  ArrowRight,
  BookOpen,
  Target,
  Clock,
  CheckCircle2,
  Search,
  Zap,
  Star,
  PenLine,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = { Atom, FlaskConical, Calculator, Dna }

function PracticeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const initSubject = searchParams.get('subject') || null
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(initSubject)
  const [selectedClass, setSelectedClass] = useState<'11' | '12' | null>(null)
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null)
  const [selectedTier, setSelectedTier] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState('')

  const currentSubject = SUBJECTS.find((s) => s.id === selectedSubjectId)

  const chaptersForSubject = CHAPTERS.filter((c) => {
    if (c.subjectId !== selectedSubjectId) return false
    if (selectedClass && c.classNum !== selectedClass) return false
    if (searchQuery.trim() && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const currentChapter = CHAPTERS.find((c) => c.id === selectedChapterId)

  const handleReset = () => {
    setSelectedSubjectId(null)
    setSelectedClass(null)
    setSelectedChapterId(null)
    setSelectedTier(1)
    setSearchQuery('')
  }

  const handleStartPractice = () => {
    const ch = selectedChapterId || chaptersForSubject[0]?.id || 'rotational-motion'
    router.push(
      `/practice/player?subject=${selectedSubjectId}&class=${selectedClass || '11'}&chapter=${ch}&tier=${selectedTier}`
    )
  }

  const openReader = (tier: number) => {
    const ch = selectedChapterId || chaptersForSubject[0]?.id || 'rotational-motion'
    router.push(
      `/reader?type=practice&subject=${selectedSubjectId}&class=${selectedClass || '11'}&chapter=${ch}&tier=${tier}`
    )
  }

  const step = !selectedSubjectId ? 0 : !selectedClass ? 1 : !selectedChapterId ? 2 : 3

  return (
    <div className="relative min-h-screen bg-neutral-950 py-10 px-4 sm:px-6">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl space-y-10">
        {/* ── PAGE HEADER ── */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              <Target className="h-3.5 w-3.5" />
              <span>Practice &amp; Testing Arena</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Build precision across<br className="hidden sm:block" /> a structured tier progression.
            </h1>
          </div>
          {step > 0 && (
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-neutral-400 hover:text-amber-400 border border-white/10 rounded-xl px-4 py-2 transition"
            >
              ← Start Over
            </button>
          )}
        </div>

        {/* ── STEP 1: SUBJECT ── */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Step 1 — Select Subject</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {SUBJECTS.map((sub) => {
              const Icon = iconMap[sub.iconName] || Atom
              const isSelected = sub.id === selectedSubjectId
              return (
                <div
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubjectId(sub.id)
                    setSelectedClass(null)
                    setSelectedChapterId(null)
                  }}
                  className={`group cursor-pointer rounded-2xl border p-5 transition-all duration-200 ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/10 shadow-xl shadow-amber-500/10'
                      : 'border-white/10 bg-neutral-900/40 hover:border-amber-500/30 hover:bg-neutral-900/80 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br ${sub.color} border border-amber-500/30 text-amber-400 transition-transform group-hover:scale-110`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    {isSelected && <CheckCircle2 className="h-5 w-5 text-amber-400" />}
                  </div>
                  <h3 className="font-black text-white text-base group-hover:text-amber-400 transition-colors">{sub.name}</h3>
                  <p className="text-xs text-amber-400/80 font-mono mt-0.5">{sub.formula}</p>
                  <p className="text-[11px] text-neutral-400 mt-2">{sub.totalQuestions.toLocaleString()}+ Questions</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── STEP 2: CLASS (11 / 12) ── */}
        {selectedSubjectId && (
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">
              <Star className="h-3.5 w-3.5" />
              <span>Step 2 — Select Class</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {(['11', '12'] as const).map((cls) => {
                const isSelected = selectedClass === cls
                const qCount = cls === '11' ? currentSubject?.class11Count : currentSubject?.class12Count
                return (
                  <div
                    key={cls}
                    onClick={() => {
                      setSelectedClass(cls)
                      setSelectedChapterId(null)
                    }}
                    className={`cursor-pointer rounded-2xl border-2 p-6 transition-all duration-200 ${
                      isSelected
                        ? 'border-amber-500 bg-linear-to-r from-amber-500/15 to-neutral-900 shadow-xl shadow-amber-500/10'
                        : 'border-white/10 bg-neutral-900/40 hover:border-amber-500/30 hover:bg-neutral-900/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`rounded-lg px-3 py-1 text-xs font-extrabold uppercase tracking-wider ${
                        isSelected ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-neutral-300'
                      }`}>
                        Class {cls}
                      </span>
                      {isSelected && <CheckCircle2 className="h-5 w-5 text-amber-400" />}
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      {cls === '11' ? 'Class XI' : 'Class XII'}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      {cls === '11'
                        ? 'Kinematics, Laws of Motion, Thermodynamics, Bonding, Mole Concept, Algebra & Functions'
                        : 'Electrostatics, Optics, Modern Physics, Calculus, Coordination Chemistry, Genetics'}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-amber-400">{(qCount || 0).toLocaleString()} Questions</span>
                      <span className="text-neutral-500">JEE • NEET • JEE Advanced</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── STEP 3: CHAPTER LIST ── */}
        {selectedClass && (
          <div className="animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                <Target className="h-3.5 w-3.5" />
                <span>Step 3 — Select Chapter</span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search chapters..."
                  className="rounded-xl border border-white/10 bg-neutral-900 pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none w-64"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {chaptersForSubject.map((ch) => {
                const isSelected = ch.id === selectedChapterId
                const pct = Math.round((ch.completedCount / ch.totalCount) * 100)

                return (
                  <div
                    key={ch.id}
                    onClick={() => setSelectedChapterId(ch.id)}
                    className={`group cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all duration-200 ${
                      isSelected
                        ? 'border-amber-500 bg-linear-to-r from-amber-500/15 to-neutral-900/60 shadow-lg shadow-amber-500/10'
                        : 'border-white/10 bg-neutral-900/40 hover:border-amber-500/30 hover:bg-neutral-900/70'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start sm:items-center gap-3">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition ${
                          isSelected ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-amber-400'
                        }`}>
                          {isSelected ? <CheckCircle2 className="h-4 w-4" /> : ch.id.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                              {ch.name}
                            </span>
                            {ch.highYield && (
                              <span className="rounded bg-amber-500/20 px-1.5 py-0.2 text-[9px] font-extrabold uppercase text-amber-400 border border-amber-500/30">
                                High Yield
                              </span>
                            )}
                          </div>
                          <div className="mt-1 h-1.5 w-full max-w-xs rounded-full bg-neutral-800 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-linear-to-r from-amber-500 to-orange-500 transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-[11px]">
                        {ch.jeeCount > 0 && (
                          <span className="rounded-md border border-white/10 bg-neutral-950 px-2.5 py-1 text-neutral-300">
                            JEE: <strong className="text-amber-400">{ch.jeeCount}</strong>
                          </span>
                        )}
                        {ch.neetCount > 0 && (
                          <span className="rounded-md border border-white/10 bg-neutral-950 px-2.5 py-1 text-neutral-300">
                            NEET: <strong className="text-emerald-400">{ch.neetCount}</strong>
                          </span>
                        )}
                        {ch.advCount > 0 && (
                          <span className="rounded-md border border-white/10 bg-neutral-950 px-2.5 py-1 text-neutral-300">
                            JEE Adv: <strong className="text-orange-400">{ch.advCount}</strong>
                          </span>
                        )}
                        <span className={`rounded-md px-2.5 py-1 text-xs font-bold transition-colors ${
                          isSelected
                            ? 'bg-amber-500 text-neutral-950'
                            : 'bg-amber-500/10 text-amber-300 group-hover:bg-amber-500 group-hover:text-neutral-950'
                        }`}>
                          {isSelected ? 'Selected ✓' : 'Select →'}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}

              {chaptersForSubject.length === 0 && (
                <div className="py-12 text-center text-neutral-500 text-sm">
                  No chapters found for &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 4: 5 TIERS ── */}
        {selectedChapterId && currentChapter && (
          <div className="animate-fade-in-up rounded-3xl border border-amber-500/30 bg-neutral-900/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
                <Zap className="h-3.5 w-3.5" />
                <span>Step 4 — Choose Practice Tier</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Structured Tier Progression
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                {currentChapter.name} • Class {selectedClass}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-8">
              {PRACTICE_TIERS.map((tier) => {
                const isSelected = selectedTier === tier.tier

                return (
                  <div
                    key={tier.tier}
                    onClick={() => setSelectedTier(tier.tier)}
                    className={`relative cursor-pointer rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/15 shadow-lg shadow-amber-500/15 scale-[1.02]'
                        : 'border-white/10 bg-neutral-950/60 hover:border-amber-500/30 hover:bg-neutral-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold ${
                          isSelected ? 'bg-amber-500 text-neutral-950' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {tier.badge}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openReader(tier.tier)
                          }}
                          title="Open in Annotation Reader"
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 transition hover:bg-amber-500 hover:text-neutral-950"
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-0.5 text-[10px] text-neutral-400 font-mono mb-1">
                        <Clock className="h-2.5 w-2.5 text-amber-400" />
                        {tier.timePerQuestion}
                      </div>
                      <h4 className="text-sm font-bold text-white leading-snug">{tier.name}</h4>
                      <p className="text-[11px] text-amber-300/80 mt-0.5 font-medium">{tier.subtitle}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                      <span className="text-neutral-400">{tier.questionCount} Qs</span>
                      <span className={`font-bold ${isSelected ? 'text-amber-400' : 'text-neutral-500'}`}>{tier.difficulty}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Launch Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div className="text-sm text-neutral-300">
                <span className="font-bold text-white">Tier {selectedTier}: {PRACTICE_TIERS[selectedTier - 1]?.name}</span>
                <span className="text-neutral-500 ml-2 text-xs">• {PRACTICE_TIERS[selectedTier - 1]?.questionCount} questions • {PRACTICE_TIERS[selectedTier - 1]?.timePerQuestion} per Q</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => openReader(selectedTier)}
                  className="flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-3.5 text-sm font-bold text-amber-300 transition hover:bg-amber-500/20"
                >
                  <PenLine className="h-4 w-4" />
                  <span>Annotate Reader</span>
                </button>
                <button
                  onClick={handleStartPractice}
                  className="group relative w-full sm:w-auto overflow-hidden rounded-2xl bg-linear-to-r from-amber-400 via-amber-500 to-orange-500 px-8 py-4 text-sm font-extrabold text-neutral-950 shadow-xl shadow-amber-500/25 transition-all duration-300 hover:scale-105 hover:shadow-amber-500/40 active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>Start Practice Session</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default function PracticePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center text-neutral-400 text-sm">
        Loading Practice Arena...
      </div>
    }>
      <PracticeContent />
    </Suspense>
  )
}
