import React from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  Star,
  Sparkles,
  Award,
  BookOpen,
  ArrowRight,
  Play,
  CheckCircle,
} from 'lucide-react'

interface Teacher {
  name: string
  role: string
  subject: string
  credentials: string
  rankersProduced: string
  rating: string
  experience: string
  quote: string
  masterclassTopic: string
}

const teachers: Teacher[] = [
  {
    name: 'Dr. Vikramaditya Sen',
    role: 'Head of Physics & Quantum Mechanics',
    subject: 'Physics',
    credentials: 'B.Tech IIT Bombay (AIR 14), Ph.D. Caltech',
    rankersProduced: '120+ in Top 100 AIR',
    rating: '4.98',
    experience: '16+ Years',
    quote:
      'Physics is not about remembering 50 formulas; it is about writing Newton’s 2nd Law in rotating frames and conserving invariants.',
    masterclassTopic: 'Non-Inertial Reference Frames & Pseudo Forces Decoded',
  },
  {
    name: 'Prof. Ananya Mukherjee',
    role: 'Chair of Organic & Inorganic Chemistry',
    subject: 'Chemistry',
    credentials: 'M.Sc Delhi University, Ex-Kota Senior HOD',
    rankersProduced: '85+ in Top 100 AIR',
    rating: '4.95',
    experience: '14+ Years',
    quote:
      'Mechanism arrows in Organic Chemistry are electron flows, not guesswork. Once you master electrophilic attack, JEE Advanced is effortless.',
    masterclassTopic: 'Nucleophilic Substitution & Carbocation Rearrangement Masterclass',
  },
  {
    name: 'Dr. Raghavendra Rao',
    role: 'Chief of Advanced Calculus & Vectors',
    subject: 'Mathematics',
    credentials: 'B.Tech IIT Kanpur, National Olympiad Coach',
    rankersProduced: '140+ in Top 100 AIR',
    rating: '4.99',
    experience: '18+ Years',
    quote:
      'Calculus problems in JEE Advanced are geometric questions dressed in algebra. Visualize the curve, and the integral collapses in 3 lines.',
    masterclassTopic: 'Definite Integrals using Leibniz Rule & Symmetry Reductions',
  },
  {
    name: 'Dr. Priya Nambiar',
    role: 'Director of Human Biology & Genetics',
    subject: 'Biology',
    credentials: 'MBBS AIIMS New Delhi (Gold Medalist)',
    rankersProduced: '210+ NEET 700+ Scorers',
    rating: '4.97',
    experience: '12+ Years',
    quote:
      'NEET Biology tests line-by-line NCERT deductions combined with clinical physiological intuition. Every question has a precise biological trigger.',
    masterclassTopic: 'Pedigree Analysis & Molecular Basis of Inheritance Traps',
  },
]

export default function TopTeachersPage() {
  return (
    <div className="min-h-screen bg-neutral-950 py-12 px-4 sm:px-6">
      <div className="relative mx-auto max-w-6xl">
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[150px]"></div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-semibold text-amber-400 mb-4">
            <GraduationCap className="h-4 w-4" />
            <span>ELITE PEDAGOGICAL FACULTY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Learn from India&apos;s Top{' '}
            <span className="bg-linear-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              AIR Ranker Mentors
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
            Every question, tier challenge, and diagnostic hint on Axiom is curated directly by faculty with proven track records of training single-digit AIRs.
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {teachers.map((teacher) => (
            <div
              key={teacher.name}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8 backdrop-blur-xl transition hover:border-amber-500/40 hover:bg-neutral-900/90 shadow-xl"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-amber-400 border border-amber-500/30">
                      {teacher.subject}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">{teacher.name}</h3>
                    <p className="text-xs text-amber-300/80 font-medium">{teacher.role}</p>
                  </div>

                  <div className="flex items-center gap-1 rounded-xl bg-neutral-950 px-2.5 py-1 text-xs font-bold text-amber-400 border border-white/5">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{teacher.rating}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-neutral-400 border-t border-white/5 pt-3 mb-4">
                  <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
                    <Award className="h-3.5 w-3.5 text-amber-400" />
                    <span>{teacher.credentials}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                    <span>{teacher.rankersProduced} • {teacher.experience} Teaching</span>
                  </div>
                </div>

                <blockquote className="rounded-2xl border border-white/5 bg-neutral-950/70 p-4 text-xs italic text-neutral-300 leading-relaxed mb-5">
                  &ldquo;{teacher.quote}&rdquo;
                </blockquote>
              </div>

              {/* Masterclass Sneak Peek */}
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase text-amber-400 flex items-center gap-1">
                    <Play className="h-3 w-3 fill-amber-400" />
                    <span>Original Masterclass</span>
                  </div>
                  <div className="text-xs font-semibold text-white mt-0.5 line-clamp-1">
                    {teacher.masterclassTopic}
                  </div>
                </div>

                <Link
                  href={`/practice?subject=${teacher.subject.toLowerCase()}`}
                  className="shrink-0 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-neutral-950 hover:bg-amber-400 transition"
                >
                  Solve Set
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="rounded-3xl border border-amber-500/30 bg-linear-to-r from-amber-500/10 via-neutral-900 to-orange-500/10 p-8 text-center backdrop-blur-xl">
          <h2 className="text-2xl font-black text-white">Experience Faculty-Curated Practice Now</h2>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-neutral-400">
            Start solving the exact question tiers designed by our senior HODs and track your performance against All India toppers.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-amber-400 via-amber-500 to-orange-500 px-8 py-3.5 text-xs font-black text-neutral-950 shadow-lg shadow-amber-500/25 hover:scale-105 transition"
            >
              <span>Explore Practice Tiers</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
