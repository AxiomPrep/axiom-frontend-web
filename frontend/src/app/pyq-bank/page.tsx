'use client'

import React, { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  SUBJECTS,
  CHAPTERS,
  PYQ_EXAM_SETS,
  PYQExamSet,
  Subject,
  Chapter,
} from '@/data/mockCurriculum'
import {
  BookOpen,
  Target,
  Clock,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Filter,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
} from 'lucide-react'

function PYQBankContent() {
  const router = useRouter()

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('physics')
  const [selectedClass, setSelectedClass] = useState<'11' | '12' | null>(null)
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null)
  const [examTypeFilter, setExamTypeFilter] = useState<'all' | 'mains' | 'neet' | 'adv'>('all')

  const currentSubject = SUBJECTS.find((s) => s.id === selectedSubjectId) || SUBJECTS[0]
  const chaptersForSubject = CHAPTERS.filter((c) => {
    if (c.subjectId !== selectedSubjectId) return false
    if (selectedClass && c.classNum !== selectedClass) return false
    return true
  })
  const currentChapter = CHAPTERS.find((c) => c.id === selectedChapterId)

  // Filter exam sets
  const filteredExamSets = PYQ_EXAM_SETS.filter((set) => {
    if (examTypeFilter === 'mains' && !set.examName.includes('JEE Main')) return false
    if (examTypeFilter === 'neet' && !set.examName.includes('NEET')) return false
    if (examTypeFilter === 'adv' && !set.examName.includes('JEE Advanced')) return false
    return true
  })

  const handleStartExamSet = (set: PYQExamSet) => {
    router.push(
      `/practice/player?subject=${set.subject}&class=${set.classNum}&chapter=${set.chapter}&pyq=${set.id}`
    )
  }

  return (
    <div className="relative min-h-screen bg-neutral-950 py-10 px-4 sm:px-6">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[150px]"></div>

      <div className="relative mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-400">
          <Link href="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-neutral-600" />
          <span className="text-amber-400 font-bold">PYQ Bank Archive</span>
          {selectedClass && (
            <>
              <ChevronRight className="h-3.5 w-3.5 text-neutral-600" />
              <button
                onClick={() => setSelectedChapterId(null)}
                className="hover:text-amber-400 text-neutral-300"
              >
                Class {selectedClass}
              </button>
            </>
          )}
          {currentChapter && (
            <>
              <ChevronRight className="h-3.5 w-3.5 text-neutral-600" />
              <span className="text-amber-400 font-bold">{currentChapter.name}</span>
            </>
          )}
        </div>

        {/* Funnel Step 1: Subject Selection */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                <BookOpen className="h-3.5 w-3.5" />
                <span>STEP 1: CHOOSE PYQ SUBJECT</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Official Previous Year Question Bank
              </h1>
            </div>
            <span className="text-xs text-neutral-400 font-mono">
              2015 – 2024 Official NTA &amp; IIT Papers
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {SUBJECTS.map((sub) => {
              const isSelected = sub.id === selectedSubjectId
              return (
                <div
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubjectId(sub.id)
                    setSelectedChapterId(null)
                  }}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/15 shadow-lg shadow-amber-500/10'
                      : 'border-white/10 bg-neutral-900/50 hover:border-amber-500/40 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-black text-white">{sub.name}</span>
                    {isSelected && <CheckCircle2 className="h-4 w-4 text-amber-400" />}
                  </div>
                  <div className="text-[11px] text-neutral-400">{sub.totalQuestions.toLocaleString()} PYQs</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Funnel Step 2: Class Pick */}
        <div className="mb-12">
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              STEP 2: SELECT CLASS LEVEL
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => {
                setSelectedClass('11')
                setSelectedChapterId(null)
              }}
              className={`cursor-pointer rounded-2xl border p-5 transition ${
                selectedClass === '11'
                  ? 'border-amber-500 bg-amber-500/10 shadow-lg'
                  : 'border-white/10 bg-neutral-900/40 hover:border-amber-500/40 hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Class 11 PYQs</h3>
                <span className="font-mono text-xs text-amber-400">
                  {currentSubject.class11Count.toLocaleString()} Questions
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Kinematics, Thermodynamics, Mole Concept, Quadratic Equations
              </p>
            </div>

            <div
              onClick={() => {
                setSelectedClass('12')
                setSelectedChapterId(null)
              }}
              className={`cursor-pointer rounded-2xl border p-5 transition ${
                selectedClass === '12'
                  ? 'border-amber-500 bg-amber-500/10 shadow-lg'
                  : 'border-white/10 bg-neutral-900/40 hover:border-amber-500/40 hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Class 12 PYQs</h3>
                <span className="font-mono text-xs text-amber-400">
                  {currentSubject.class12Count.toLocaleString()} Questions
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Electrodynamics, Optics, Calculus, Coordination Chemistry, Genetics
              </p>
            </div>
          </div>
        </div>

        {/* Funnel Step 3: Chapter Select */}
        {selectedClass && (
          <div className="mb-12 animate-fade-in-up">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                STEP 3: SELECT CHAPTER ARCHIVE
              </span>
              <span className="text-xs text-neutral-400">{chaptersForSubject.length} Chapters</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {chaptersForSubject.map((ch) => {
                const isSelected = ch.id === selectedChapterId
                return (
                  <div
                    key={ch.id}
                    onClick={() => setSelectedChapterId(ch.id)}
                    className={`cursor-pointer rounded-xl border p-4 transition ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/15 shadow-md shadow-amber-500/10'
                        : 'border-white/10 bg-neutral-900/40 hover:border-amber-500/40 hover:bg-neutral-900'
                    }`}
                  >
                    <div className="text-xs font-bold text-white truncate">{ch.name}</div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-400">
                      <span>Mains: {ch.jeeCount}</span>
                      <span>NEET: {ch.neetCount}</span>
                      <span>Adv: {ch.advCount}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Funnel Step 4: Exam Sets (Mains / NEET / Adv) */}
        <div className="animate-fade-in-up rounded-3xl border border-amber-500/30 bg-neutral-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                <Target className="h-3.5 w-3.5" />
                <span>STEP 4: SELECT EXAM SET &amp; LAUNCH</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Official Exam Papers &amp; Shifts
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 rounded-xl bg-neutral-950 p-1 border border-white/5">
              {(
                [
                  ['all', 'All Exams'],
                  ['mains', 'JEE Main'],
                  ['neet', 'NEET UG'],
                  ['adv', 'JEE Advanced'],
                ] as const
              ).map(([fKey, fLabel]) => (
                <button
                  key={fKey}
                  onClick={() => setExamTypeFilter(fKey)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    examTypeFilter === fKey
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {fLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Exam Sets List */}
          <div className="space-y-3">
            {filteredExamSets.map((examSet) => (
              <div
                key={examSet.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-neutral-950/60 p-5 transition hover:border-amber-500/40 hover:bg-neutral-900/60"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{examSet.examName}</h4>
                      <span className="rounded bg-neutral-800 px-2 py-0.5 font-mono text-[10px] text-amber-400">
                        {examSet.year}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
                      <span>{examSet.shift}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="h-3 w-3 text-amber-400" />
                        {examSet.durationMinutes} mins
                      </span>
                      <span>•</span>
                      <span>{examSet.questionCount} Questions</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden md:inline-block rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-semibold text-amber-300 border border-amber-500/20">
                    {examSet.difficulty}
                  </span>
                  <button
                    onClick={() => router.push(`/reader?type=pyq&set=${examSet.id}`)}
                    title="Open in Annotation Reader"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 transition hover:bg-amber-500 hover:text-neutral-950"
                  >
                    <BookOpen className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleStartExamSet(examSet)}
                    className="flex items-center gap-1.5 rounded-xl bg-linear-to-r from-amber-400 to-orange-500 px-5 py-2.5 text-xs font-black text-neutral-950 shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition"
                  >
                    <span>Start Exam Set</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PYQBankPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-neutral-400">Loading PYQ Bank...</div>}>
      <PYQBankContent />
    </Suspense>
  )
}
