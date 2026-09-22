'use client'

import React from 'react'
import Link from 'next/link'
import { Target, Award, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react'

interface ExamTarget {
  id: string
  name: string
  badge: string
  pyqCount: string
  span: string
  tagline: string
  color: string
  borderColor: string
  bgGradient: string
  subjects: string[]
  href: string
}

const examTargets: ExamTarget[] = [
  {
    id: 'jee-main',
    name: 'JEE Main',
    badge: 'NTA CBT Standard',
    pyqCount: '18,400+ PYQs',
    span: '2015 – 2024 Archives',
    tagline: 'High-speed single choice & numerical accuracy drills',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-500/30 hover:border-amber-500/60',
    bgGradient: 'bg-neutral-900/60',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    href: '/practice?exam=jee-main',
  },
  {
    id: 'jee-advanced',
    name: 'JEE Advanced',
    badge: 'Multi-Concept Rigor',
    pyqCount: '12,200+ PYQs',
    span: '2010 – 2024 Archives',
    tagline: 'Multi-correct, matching lists, and comprehensive integer matrix problems',
    color: 'from-orange-500 to-red-500',
    borderColor: 'border-orange-500/30 hover:border-orange-500/60',
    bgGradient: 'bg-neutral-900/60',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    href: '/practice?exam=jee-advanced',
  },
  {
    id: 'neet-ug',
    name: 'NEET-UG',
    badge: 'NCERT High-Yield',
    pyqCount: '14,000+ PYQs',
    span: '2013 – 2024 Archives',
    tagline: 'NCERT line-by-line bio traps, physical chemistry & mechanics speed test',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
    bgGradient: 'bg-neutral-900/60',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    href: '/practice?exam=neet',
  },
  {
    id: 'olympiad',
    name: 'Olympiad & KVPY',
    badge: 'Top 0.1% Benchmark',
    pyqCount: '5,400+ PYQs',
    span: 'INPhO, INChO, IMO & NSEP',
    tagline: 'Deep conceptual proofs, advanced calculus & theoretical problem sets',
    color: 'from-yellow-400 to-amber-600',
    borderColor: 'border-yellow-500/30 hover:border-yellow-500/60',
    bgGradient: 'bg-neutral-900/60',
    subjects: ['Physics', 'Chemistry', 'Math', 'Bio'],
    href: '/practice?exam=olympiad',
  },
]

export default function ExamTargetGrid() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[11px] font-extrabold tracking-widest text-amber-400 uppercase mb-3">
            <Target className="h-3.5 w-3.5 text-amber-400" />
            <span>Targeted Exam Catalogs</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Choose Your Competitive Goal
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            Calibrated question banks sourced directly from official NTA, IIT, and Olympiad authority paper archives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {examTargets.map((target) => (
            <div
              key={target.id}
              className={`group relative flex flex-col justify-between rounded-3xl border ${target.borderColor} ${target.bgGradient} p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-500/10`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                    {target.badge}
                  </span>
                  <Sparkles className="h-4 w-4 text-amber-400 opacity-60 group-hover:opacity-100 transition" />
                </div>

                <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                  {target.name}
                </h3>
                
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-amber-400">{target.pyqCount}</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-medium">{target.span}</p>

                <p className="mt-4 text-xs text-neutral-300 leading-relaxed">
                  {target.tagline}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {target.subjects.map((sub) => (
                    <span
                      key={sub}
                      className="text-[10px] font-semibold text-neutral-400 bg-white/5 px-2 py-0.5 rounded-md"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-white/5 pt-4">
                <Link
                  href={target.href}
                  className="flex items-center justify-between text-xs font-bold text-white group-hover:text-amber-400 transition"
                >
                  <span>Start {target.name} PYQs</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
