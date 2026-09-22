'use client'

import React from 'react'
import Link from 'next/link'
import { Trophy, Flame, Award, ArrowRight, Star, ShieldCheck } from 'lucide-react'

interface Ranker {
  rank: number
  badge: string
  name: string
  examTarget: string
  instituteCity: string
  solvedCount: number
  accuracy: string
  streakDays: number
  coins: number
  avatarGradient: string
  borderColor: string
}

const topRankers: Ranker[] = [
  {
    rank: 1,
    badge: '🥇 GOLD RANK 1',
    name: 'Aarav Sharma',
    examTarget: 'JEE Advanced 2025 Target',
    instituteCity: 'Kota / Rajasthan',
    solvedCount: 3420,
    accuracy: '98.4%',
    streakDays: 42,
    coins: 18450,
    avatarGradient: 'from-amber-400 to-yellow-600',
    borderColor: 'border-amber-400/50 shadow-amber-500/20',
  },
  {
    rank: 2,
    badge: '🥈 SILVER RANK 2',
    name: 'Ananya Verma',
    examTarget: 'NEET-UG 2025 Target',
    instituteCity: 'Delhi NCR',
    solvedCount: 3180,
    accuracy: '97.8%',
    streakDays: 38,
    coins: 16200,
    avatarGradient: 'from-slate-300 to-slate-500',
    borderColor: 'border-slate-300/40 shadow-slate-400/10',
  },
  {
    rank: 3,
    badge: '🥉 BRONZE RANK 3',
    name: 'Rohan Gupta',
    examTarget: 'JEE Advanced & Olympiad',
    instituteCity: 'Hyderabad',
    solvedCount: 2950,
    accuracy: '96.9%',
    streakDays: 31,
    coins: 14800,
    avatarGradient: 'from-amber-700 to-orange-800',
    borderColor: 'border-amber-700/40 shadow-amber-700/10',
  },
]

export default function LeaderboardSpotlight() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[11px] font-extrabold tracking-widest text-amber-400 uppercase mb-3">
              <Trophy className="h-3.5 w-3.5 text-amber-400" />
              <span>Weekly Aspirant Spotlight</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Top 3 Gold & Silver Leaderboard
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400">
              Ranked nationwide based on PYQ accuracy, speed consistency, and streak dedication.
            </p>
          </div>

          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-amber-400 hover:text-amber-300 transition"
          >
            <span>View Full Leaderboard Ranks</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topRankers.map((ranker) => (
            <div
              key={ranker.rank}
              className={`group relative flex flex-col justify-between rounded-3xl border bg-neutral-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${ranker.borderColor}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-200">
                    {ranker.badge}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                    <Flame className="h-3.5 w-3.5 fill-amber-400" />
                    <span>{ranker.streakDays}d Streak</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${ranker.avatarGradient} font-black text-xl text-neutral-950 shadow-md shrink-0`}
                  >
                    #{ranker.rank}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors">
                      {ranker.name}
                    </h3>
                    <p className="text-xs text-neutral-400 font-medium">{ranker.examTarget}</p>
                    <p className="text-[10px] text-neutral-500">{ranker.instituteCity}</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/5 pt-4">
                  <div className="rounded-xl bg-neutral-950 p-2.5 text-center border border-white/5">
                    <span className="text-[10px] text-neutral-400 uppercase font-semibold">Solved PYQs</span>
                    <div className="text-base font-black text-white">{ranker.solvedCount.toLocaleString()}</div>
                  </div>
                  <div className="rounded-xl bg-neutral-950 p-2.5 text-center border border-white/5">
                    <span className="text-[10px] text-neutral-400 uppercase font-semibold">Accuracy</span>
                    <div className="text-base font-black text-emerald-400">{ranker.accuracy}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs border-t border-white/5 pt-3">
                <span className="text-neutral-400 font-medium">Reward Coins</span>
                <span className="font-extrabold text-amber-400">🪙 {ranker.coins.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
