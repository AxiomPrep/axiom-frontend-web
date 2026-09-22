'use client'

import React from 'react'
import { Flame, CheckCircle2, Zap, Target, Award } from 'lucide-react'

export default function StreakTracker() {
  const daysOfWeek = [
    { day: 'Mon', active: true, count: 25 },
    { day: 'Tue', active: true, count: 30 },
    { day: 'Wed', active: true, count: 20 },
    { day: 'Thu', active: true, count: 35 },
    { day: 'Fri', active: true, count: 40 },
    { day: 'Sat', active: true, count: 18 },
    { day: 'Sun', active: false, count: 0, today: true },
  ]

  const todaySolved = 14
  const dailyTarget = 20
  const percentage = Math.min(100, Math.round((todaySolved / dailyTarget) * 100))

  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-amber-500/25 bg-neutral-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Column: Streak Info */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-extrabold tracking-widest text-amber-400 uppercase">
              <Flame className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>Streak & Daily Goal</span>
            </div>

            <h3 className="text-2xl font-black text-white">
              6-Day Active Practice Streak 🔥
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md">
              Maintain your daily PYQ momentum to unlock <span className="text-amber-400 font-bold">1.5x Reward Coin multiplier</span> and climb the national leaderboard.
            </p>

            {/* Daily Goal Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-neutral-400">Today&apos;s Target ({todaySolved}/{dailyTarget} PYQs)</span>
                <span className="text-amber-400">{percentage}%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-neutral-950 border border-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-linear-to-r from-amber-400 via-amber-500 to-orange-500 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: 7-Day Heatmap */}
          <div className="rounded-2xl border border-white/10 bg-neutral-950 p-5 text-center min-w-[280px]">
            <div className="text-xs font-extrabold uppercase tracking-wider text-neutral-400 mb-4">
              This Week&apos;s Consistency
            </div>

            <div className="flex items-center justify-center gap-2">
              {daysOfWeek.map((d) => (
                <div key={d.day} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold text-xs transition ${
                      d.active
                        ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                        : d.today
                        ? 'border-2 border-dashed border-amber-500 text-amber-400 bg-amber-500/10'
                        : 'bg-neutral-900 border border-white/10 text-neutral-600'
                    }`}
                  >
                    {d.active ? <CheckCircle2 className="h-4 w-4" /> : d.day.charAt(0)}
                  </div>
                  <span className="text-[10px] text-neutral-400 font-semibold">{d.day}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Weekly Total</span>
              <span className="font-extrabold text-white">168 PYQs Solved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
