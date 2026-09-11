import React from 'react'
import Link from 'next/link'
import { Timer, ArrowRight } from 'lucide-react'

export default function TimerPage() {
  return (
    <div className="relative min-h-screen bg-neutral-950 flex items-center justify-center py-20 px-4 sm:px-6">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[150px]" />

      <div className="relative max-w-md text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
          <Timer className="h-8 w-8" />
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-3">
          Coming Soon
        </div>
        <h1 className="text-2xl font-black text-white">Timer Hub</h1>
        <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
          The dedicated Timer Hub is owned by another developer and will land shortly. In the meantime,
          jump straight into a timed practice session.
        </p>
        <Link
          href="/practice"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-black text-neutral-950 shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition"
        >
          <span>Start a Timed Practice</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
