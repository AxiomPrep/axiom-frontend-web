'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SUBJECTS, CHAPTERS, PRACTICE_TIERS, MOCK_QUESTIONS } from '@/data/mockCurriculum'
import { getPyqSetPages } from '@/lib/api'
import BookReader from '@/components/BookReader'
import { ChevronLeft } from 'lucide-react'

function buildPracticePages(subjectId: string, chapterId: string, tierId: number): string[] {
  const questions = MOCK_QUESTIONS.filter(
    (q) => q.chapter === chapterId && (!tierId || q.tier === tierId)
  )
  const chapter = CHAPTERS.find((c) => c.id === chapterId)
  const tier = PRACTICE_TIERS.find((t) => t.tier === tierId)
  const pages: string[] = [
    `${chapter?.name ?? 'Chapter'} — ${tier?.name ?? 'Practice Set'}\n\n${tier?.description ?? ''}\n\nUse the highlight tool to mark formulas and the pen to annotate as you solve. Annotations are saved automatically and persist across sessions.`,
  ]
  if (questions.length === 0) {
    pages.push(
      `Q. Sample problem for ${chapter?.name ?? 'this chapter'} (${tier?.name ?? 'Tier'} difficulty).\n\nSolve it on paper, then annotate your approach below.`
    )
  } else {
    questions.forEach((q, i) => {
      pages.push(
        `Q${i + 1}. ${q.question}\n\n${q.formula ? `Formula: ${q.formula}\n\n` : ''}Options:\n${q.options.map((o) => `${o.id}) ${o.text}`).join('\n')}`
      )
    })
  }
  pages.push(`Solution Notes — revisit your highlights and drawings. Good luck!`)
  return pages
}

function ReaderContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'practice'
  const subjectId = searchParams.get('subject') || 'physics'
  const classLevel = searchParams.get('class') || '11'
  const chapterId = searchParams.get('chapter') || 'rotational-motion'
  const tierId = parseInt(searchParams.get('tier') || '1', 10)
  const setIdParam = searchParams.get('set') || ''

  const [pages, setPages] = useState<string[]>([])
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')

  useEffect(() => {
    if (type === 'pyq') {
      getPyqSetPages(setIdParam).then((p) => {
        setPages(p)
        setTitle('PYQ Exam Set')
        setSubtitle(setIdParam.replace(/-/g, ' ').toUpperCase())
      })
      return
    }
    const subject = SUBJECTS.find((s) => s.id === subjectId)
    const chapter = CHAPTERS.find((c) => c.id === chapterId)
    const tier = PRACTICE_TIERS.find((t) => t.tier === tierId)
    setPages(buildPracticePages(subjectId, chapterId, tierId))
    setTitle(`${subject?.name ?? 'Subject'} · ${tier?.name ?? 'Tier'}`)
    setSubtitle(`${chapter?.name ?? 'Chapter'} • Class ${classLevel}`)
  }, [type, setIdParam, subjectId, classLevel, chapterId, tierId])

  const setId = type === 'pyq' ? `pyq-${setIdParam}` : `practice-${subjectId}-${classLevel}-${chapterId}-${tierId}`

  return (
    <div className="relative min-h-screen bg-neutral-950 py-10 px-4 sm:px-6">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[150px]" />

      <div className="relative mx-auto">
        <Link
          href={type === 'pyq' ? '/pyq-bank' : '/practice'}
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-amber-400 transition"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </Link>

        {pages.length > 0 ? (
          <BookReader title={title} subtitle={subtitle} pages={pages} setId={setId} />
        ) : (
          <div className="py-24 text-center text-neutral-500 text-sm">Loading reader…</div>
        )}
      </div>
    </div>
  )
}

export default function ReaderPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-neutral-400 text-sm">Loading Reader…</div>}>
      <ReaderContent />
    </Suspense>
  )
}
