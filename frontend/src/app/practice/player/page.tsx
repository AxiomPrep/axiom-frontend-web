'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  MOCK_QUESTIONS,
  Question,
  CHAPTERS,
  SUBJECTS,
  PRACTICE_TIERS,
} from '@/data/mockCurriculum'
import {
  Clock,
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Send,
  Pause,
  Play,
  HelpCircle,
  X,
} from 'lucide-react'

type QuestionStatus = 'answered' | 'marked' | 'marked-answered' | 'unanswered' | 'not-visited'

interface UserAttempt {
  selectedOption: 'A' | 'B' | 'C' | 'D' | null
  isMarked: boolean
  timeSpentSeconds: number
  visited: boolean
}

function PlayerContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const subjectId = searchParams.get('subject') || 'physics'
  const chapterId = searchParams.get('chapter') || 'rotational-motion'
  const tierNum = parseInt(searchParams.get('tier') || '3', 10)

  const subject = SUBJECTS.find((s) => s.id === subjectId) || SUBJECTS[0]
  const chapter = CHAPTERS.find((c) => c.id === chapterId) || CHAPTERS[3]
  const tier = PRACTICE_TIERS.find((t) => t.tier === tierNum) || PRACTICE_TIERS[2]

  const questions: Question[] = MOCK_QUESTIONS

  const [currentIndex, setCurrentIndex] = useState(0)
  const [attempts, setAttempts] = useState<Record<number, UserAttempt>>({
    0: { selectedOption: null, isMarked: false, timeSpentSeconds: 0, visited: true },
    1: { selectedOption: null, isMarked: false, timeSpentSeconds: 0, visited: false },
    2: { selectedOption: null, isMarked: false, timeSpentSeconds: 0, visited: false },
    3: { selectedOption: null, isMarked: false, timeSpentSeconds: 0, visited: false },
    4: { selectedOption: null, isMarked: false, timeSpentSeconds: 0, visited: false },
  })

  // Global Timer (15 minutes = 900 seconds)
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(900)
  const [isPaused, setIsPaused] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  // Timer Tick
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setTotalSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          handleSubmitTest()
          return 0
        }
        return prev - 1
      })

      // Track time on current question
      setAttempts((prev) => ({
        ...prev,
        [currentIndex]: {
          ...prev[currentIndex],
          timeSpentSeconds: (prev[currentIndex]?.timeSpentSeconds || 0) + 1,
        },
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [currentIndex, isPaused])

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60)
    const rem = secs % 60
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`
  }

  const currentQ = questions[currentIndex]
  const currentAttempt = attempts[currentIndex] || {
    selectedOption: null,
    isMarked: false,
    timeSpentSeconds: 0,
    visited: true,
  }

  const handleSelectOption = (optId: 'A' | 'B' | 'C' | 'D') => {
    setAttempts((prev) => ({
      ...prev,
      [currentIndex]: {
        ...prev[currentIndex],
        selectedOption: prev[currentIndex]?.selectedOption === optId ? null : optId,
        visited: true,
      },
    }))
  }

  const handleClearResponse = () => {
    setAttempts((prev) => ({
      ...prev,
      [currentIndex]: {
        ...prev[currentIndex],
        selectedOption: null,
      },
    }))
  }

  const handleToggleMark = () => {
    setAttempts((prev) => ({
      ...prev,
      [currentIndex]: {
        ...prev[currentIndex],
        isMarked: !prev[currentIndex]?.isMarked,
      },
    }))
  }

  const handleSaveAndNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1
      setAttempts((prev) => ({
        ...prev,
        [nextIdx]: {
          ...(prev[nextIdx] || { selectedOption: null, isMarked: false, timeSpentSeconds: 0 }),
          visited: true,
        },
      }))
      setCurrentIndex(nextIdx)
    } else {
      setShowSubmitModal(true)
    }
  }

  const handleMarkAndNext = () => {
    setAttempts((prev) => ({
      ...prev,
      [currentIndex]: {
        ...prev[currentIndex],
        isMarked: true,
      },
    }))
    handleSaveAndNext()
  }

  const handleJumpToQuestion = (index: number) => {
    setAttempts((prev) => ({
      ...prev,
      [index]: {
        ...(prev[index] || { selectedOption: null, isMarked: false, timeSpentSeconds: 0 }),
        visited: true,
      },
    }))
    setCurrentIndex(index)
  }

  const getQuestionStatus = (idx: number): QuestionStatus => {
    const att = attempts[idx]
    if (!att || !att.visited) return 'not-visited'
    if (att.isMarked && att.selectedOption) return 'marked-answered'
    if (att.isMarked) return 'marked'
    if (att.selectedOption) return 'answered'
    return 'unanswered'
  }

  // Summary counts
  const answeredCount = Object.values(attempts).filter((a) => a.selectedOption).length
  const markedCount = Object.values(attempts).filter((a) => a.isMarked).length
  const unattemptedCount = questions.length - answeredCount

  const handleSubmitTest = () => {
    // Save attempt in localStorage for Results page
    if (typeof window !== 'undefined') {
      const resultPayload = {
        subjectName: subject.name,
        chapterName: chapter.name,
        tierName: tier.name,
        totalQuestions: questions.length,
        timeTakenSeconds: 900 - totalSecondsLeft,
        attempts: Object.entries(attempts).map(([idxStr, att]) => {
          const idx = parseInt(idxStr, 10)
          const q = questions[idx]
          return {
            questionId: q.id,
            questionText: q.question,
            formula: q.formula,
            options: q.options,
            correctOption: q.correctOption,
            selectedOption: att.selectedOption,
            isCorrect: att.selectedOption === q.correctOption,
            timeSpent: att.timeSpentSeconds,
            explanation: q.explanation,
            difficulty: q.difficulty,
          }
        }),
      }
      localStorage.setItem('axiom_last_attempt', JSON.stringify(resultPayload))
    }
    router.push('/practice/result')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between">
      {/* Top Test Player Header */}
      <div className="sticky top-0 z-30 border-b border-amber-500/20 bg-neutral-950/95 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/practice"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-neutral-900 text-neutral-400 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400">{subject.name}</span>
                <span className="text-neutral-500">•</span>
                <span className="text-xs text-neutral-300 font-medium truncate max-w-[200px] sm:max-w-md">
                  {chapter.name}
                </span>
                <span className="rounded bg-amber-500/20 px-1.5 py-0.2 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                  {tier.name}
                </span>
              </div>
              <div className="text-[11px] text-neutral-400">
                Question {currentIndex + 1} of {questions.length}
              </div>
            </div>
          </div>

          {/* Timer & Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-neutral-900 px-3.5 py-1.5 shadow-inner">
              <Clock className="h-4 w-4 text-amber-400 animate-pulse" />
              <div className="font-mono text-sm font-bold text-amber-400">
                {formatTime(totalSecondsLeft)}
              </div>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="text-neutral-400 hover:text-white ml-1"
                title={isPaused ? 'Resume' : 'Pause'}
              >
                {isPaused ? <Play className="h-3.5 w-3.5 text-emerald-400" /> : <Pause className="h-3.5 w-3.5" />}
              </button>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="rounded-xl bg-linear-to-r from-amber-400 to-orange-500 px-4 py-2 text-xs font-black text-neutral-950 shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition"
            >
              Submit Practice
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace: Question Area + Palette */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col lg:flex-row gap-6 p-4 sm:p-6">
        {/* Left / Center: Question & Options */}
        <div className="flex-1 flex flex-col justify-between rounded-3xl border border-white/10 bg-neutral-900/60 p-6 md:p-8 backdrop-blur-xl">
          <div>
            {/* Question Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-amber-500/20 px-3 py-1 font-mono text-xs font-bold text-amber-400 border border-amber-500/30">
                  Question {currentIndex + 1}
                </span>
                <span className="text-xs text-neutral-400">Single Choice Objective</span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-neutral-300 font-mono">
                  +4 / -1 Marks
                </span>
                <span className="text-neutral-400 font-mono text-[11px]">
                  Time on Q: {formatTime(currentAttempt.timeSpentSeconds)}
                </span>
              </div>
            </div>

            {/* Question Prompt */}
            <div className="space-y-4 mb-8">
              <p className="text-base sm:text-lg font-medium leading-relaxed text-neutral-100">
                {currentQ.question}
              </p>

              {currentQ.formula && (
                <div className="rounded-xl border border-amber-500/20 bg-neutral-950/80 p-3 font-mono text-xs text-amber-300/90 inline-block">
                  <span className="text-[10px] uppercase text-neutral-500 block mb-0.5">Relevant Formula:</span>
                  <code>{currentQ.formula}</code>
                </div>
              )}
            </div>

            {/* Options List */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((option) => {
                const isSelected = currentAttempt.selectedOption === option.id

                return (
                  <div
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`group flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all duration-200 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/15 shadow-lg shadow-amber-500/10'
                        : 'border-white/10 bg-neutral-950/60 hover:border-amber-500/30 hover:bg-neutral-800/60'
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold transition-colors ${
                        isSelected
                          ? 'bg-amber-500 text-neutral-950'
                          : 'bg-neutral-800 text-neutral-300 group-hover:bg-neutral-700'
                      }`}
                    >
                      {option.id}
                    </div>
                    <div className="flex-1 text-sm font-medium text-neutral-200 group-hover:text-white">
                      {option.text}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Action Buttons Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-5">
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearResponse}
                disabled={!currentAttempt.selectedOption}
                className="rounded-xl border border-white/10 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-neutral-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Clear Response
              </button>

              <button
                onClick={handleToggleMark}
                className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                  currentAttempt.isMarked
                    ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                    : 'border-white/10 bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>{currentAttempt.isMarked ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleJumpToQuestion(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-1 rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Prev</span>
              </button>

              <button
                onClick={handleMarkAndNext}
                className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition hidden sm:inline-block"
              >
                Mark &amp; Next
              </button>

              <button
                onClick={handleSaveAndNext}
                className="flex items-center gap-1.5 rounded-xl bg-linear-to-r from-amber-400 to-orange-500 px-5 py-2 text-xs font-black text-neutral-950 shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition"
              >
                <span>{currentIndex === questions.length - 1 ? 'Save & Review' : 'Save & Next'}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Question Palette & Status */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-5 backdrop-blur-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
              Question Palette
            </h3>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] mb-5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-md bg-emerald-500 inline-block"></span>
                <span className="text-neutral-300">Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-md bg-purple-500 inline-block"></span>
                <span className="text-neutral-300">Marked ({markedCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-md bg-neutral-800 inline-block border border-white/10"></span>
                <span className="text-neutral-300">Unanswered ({unattemptedCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-md bg-amber-500/40 inline-block border border-amber-500"></span>
                <span className="text-neutral-300">Current Q</span>
              </div>
            </div>

            {/* Question Buttons Grid */}
            <div className="grid grid-cols-5 gap-2.5">
              {questions.map((q, idx) => {
                const status = getQuestionStatus(idx)
                const isCurrent = idx === currentIndex

                let colorClasses = 'border-white/10 bg-neutral-800/80 text-neutral-400'
                if (status === 'answered') {
                  colorClasses = 'bg-emerald-500 text-neutral-950 font-bold border-emerald-400'
                } else if (status === 'marked' || status === 'marked-answered') {
                  colorClasses = 'bg-purple-600 text-white font-bold border-purple-400'
                }

                if (isCurrent) {
                  colorClasses += ' ring-2 ring-amber-400 ring-offset-2 ring-offset-neutral-950'
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => handleJumpToQuestion(idx)}
                    className={`flex h-10 w-full items-center justify-center rounded-xl border font-mono text-xs transition hover:scale-105 ${colorClasses}`}
                  >
                    {idx + 1}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Exam Summary Box */}
          <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-5 backdrop-blur-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Sparkles className="h-4 w-4" />
              <span>Axiom Diagnostic Engine</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every answer is cross-referenced with past 10 years JEE &amp; NEET scoring patterns to compute your exact percentile estimate on the results screen.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in-up">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-amber-500/30 bg-neutral-950 p-6 shadow-2xl">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-neutral-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                <Send className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Submit Practice Session?</h3>
                <p className="text-xs text-neutral-400">Review your attempt breakdown below</p>
              </div>
            </div>

            <div className="my-6 space-y-2.5 rounded-2xl border border-white/5 bg-neutral-900/60 p-4 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Total Questions:</span>
                <span className="font-bold text-white">{questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Answered:</span>
                <span className="font-bold text-emerald-400">{answeredCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Marked for Review:</span>
                <span className="font-bold text-purple-400">{markedCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Unanswered:</span>
                <span className="font-bold text-rose-400">{unattemptedCount}</span>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-2">
                <span className="text-neutral-400">Time Remaining:</span>
                <span className="font-mono font-bold text-amber-400">{formatTime(totalSecondsLeft)}</span>
              </div>
            </div>

            {unattemptedCount > 0 && (
              <div className="mb-6 flex items-start gap-2 text-xs text-amber-400/90 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>You still have {unattemptedCount} unanswered questions. Are you sure you want to submit?</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white"
              >
                Resume Practice
              </button>
              <button
                onClick={handleSubmitTest}
                className="rounded-xl bg-linear-to-r from-amber-400 to-orange-500 px-5 py-2.5 text-xs font-black text-neutral-950 shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition"
              >
                Confirm &amp; View Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function PlayerPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-neutral-400">Loading Practice Player...</div>}>
      <PlayerContent />
    </Suspense>
  )
}
