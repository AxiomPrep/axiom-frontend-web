'use client'

import React, { useEffect, useState } from 'react'
import {
  getLeaderboard,
  getCoins,
  type LeaderboardEntry,
  type CoinWallet,
} from '@/lib/api'
import { Trophy, Medal, Crown, Coins } from 'lucide-react'

const medalColors: Record<number, string> = {
  1: 'from-yellow-400 to-amber-600 text-neutral-950',
  2: 'from-slate-200 to-slate-400 text-neutral-950',
  3: 'from-amber-700 to-orange-800 text-neutral-100',
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [wallet, setWallet] = useState<CoinWallet | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getLeaderboard(), getCoins()]).then(([lb, w]) => {
      setEntries(lb)
      setWallet(w)
      setLoading(false)
    })
  }, [])

  const top3 = entries.slice(0, 3)
  const rest = entries.slice(3)

  return (
    <div className="relative min-h-screen bg-neutral-950 py-12 px-4 sm:px-6">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-bold text-amber-400 mb-4">
            <Trophy className="h-4 w-4" />
            <span>AXIOM RANKINGS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Gold &amp; Silver Leaderboard</h1>
          <p className="mt-2 text-sm text-neutral-400">
            Ranked by Gold coins first, then Silver coins.
          </p>

          {/* User wallet */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-yellow-500/25 bg-neutral-900/70 px-4 py-2">
              <Coins className="h-4 w-4 text-yellow-400" />
              <span className="text-xs font-bold text-yellow-300">
                {wallet ? wallet.gold.toLocaleString() : '—'} Gold
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-300/20 bg-neutral-900/70 px-4 py-2">
              <Coins className="h-4 w-4 text-slate-300" />
              <span className="text-xs font-bold text-slate-300">
                {wallet ? wallet.silver.toLocaleString() : '—'} Silver
              </span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-neutral-500 text-sm">Loading rankings…</div>
        ) : (
          <>
            {/* Podium top 3 */}
            <div className="grid grid-cols-3 gap-3 mb-8 items-end">
              {[top3[1], top3[0], top3[2]].map((entry, idx) => {
                if (!entry) return <div key={`empty-${idx}`} />
                const position = entry.rank
                const isFirst = position === 1
                const Icon = position === 1 ? Crown : Medal
                return (
                  <div
                    key={entry.rank}
                    className={`relative rounded-2xl border p-4 text-center backdrop-blur-md ${
                      isFirst
                        ? 'border-amber-500/50 bg-linear-to-b from-amber-500/15 to-neutral-900 shadow-xl shadow-amber-500/10 py-8'
                        : 'border-white/10 bg-neutral-900/60 py-6'
                    }`}
                  >
                    <div
                      className={`mx-auto mb-3 flex items-center justify-center rounded-full bg-linear-to-br ${medalColors[position] ?? 'from-neutral-700 to-neutral-800 text-white'} ${
                        isFirst ? 'h-16 w-16' : 'h-12 w-12'
                      }`}
                    >
                      <Icon className={isFirst ? 'h-8 w-8' : 'h-6 w-6'} />
                    </div>
                    <div className="text-sm font-black text-white truncate">{entry.name}</div>
                    <div className="text-[11px] text-neutral-400">{entry.subject}</div>
                    <div className="mt-2 flex items-center justify-center gap-2 text-[11px] font-mono">
                      <span className="text-yellow-400 font-bold">{entry.gold.toLocaleString()} 🥇</span>
                      <span className="text-neutral-500">•</span>
                      <span className="text-slate-300">{entry.silver.toLocaleString()} 🥈</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Rest of the table */}
            <div className="rounded-3xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl overflow-hidden">
              <div className="grid grid-cols-12 gap-2 px-5 py-3 border-b border-white/5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                <span className="col-span-2">Rank</span>
                <span className="col-span-4">Student</span>
                <span className="col-span-3 text-right">Gold</span>
                <span className="col-span-3 text-right">Silver</span>
              </div>
              {rest.map((entry) => (
                <div
                  key={entry.rank}
                  className="grid grid-cols-12 gap-2 items-center px-5 py-3.5 border-b border-white/5 last:border-0 text-xs hover:bg-neutral-800/40 transition"
                >
                  <span className="col-span-2 font-mono text-neutral-400">#{entry.rank}</span>
                  <span className="col-span-4">
                    <span className="font-bold text-white">{entry.name}</span>
                    <span className="ml-2 text-[10px] text-neutral-500">{entry.subject}</span>
                  </span>
                  <span className="col-span-3 text-right font-mono text-yellow-400 font-bold">
                    {entry.gold.toLocaleString()}
                  </span>
                  <span className="col-span-3 text-right font-mono text-slate-300">
                    {entry.silver.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
