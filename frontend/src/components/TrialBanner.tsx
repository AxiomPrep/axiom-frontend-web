'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, Clock, ArrowRight, Zap } from 'lucide-react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function TrialBanner() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 6,
    hours: 23,
    minutes: 56,
    seconds: 44,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else if (days > 0) {
          days--
          hours = 23
          minutes = 59
          seconds = 59
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative z-40 w-full border-b border-amber-500/10 bg-linear-to-r from-amber-950/40 via-neutral-950 to-orange-950/40 px-4 py-2 text-xs">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-center">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-amber-400 border border-amber-500/20 font-medium">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>Trial Active</span>
          </div>

          <div className="flex items-center gap-2 text-neutral-300">
            <Clock className="h-3.5 w-3.5 text-amber-400/80" />
            <span className="hidden sm:inline">Free trial countdown:</span>
            <span className="sm:hidden">Ends:</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono font-bold">
            <span className="rounded-md border border-amber-500/20 bg-neutral-900/80 px-2 py-0.5 text-amber-400 shadow-inner">
              {String(timeLeft.days).padStart(2, '0')}d
            </span>
            <span className="text-amber-500/60">:</span>
            <span className="rounded-md border border-amber-500/20 bg-neutral-900/80 px-2 py-0.5 text-amber-400 shadow-inner">
              {String(timeLeft.hours).padStart(2, '0')}h
            </span>
            <span className="text-amber-500/60">:</span>
            <span className="rounded-md border border-amber-500/20 bg-neutral-900/80 px-2 py-0.5 text-amber-400 shadow-inner">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </span>
            <span className="text-amber-500/60">:</span>
            <span className="rounded-md border border-amber-500/20 bg-neutral-900/80 px-2 py-0.5 text-amber-400 shadow-inner">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/subscription"
            className="group flex items-center gap-1.5 font-semibold text-amber-400 transition-colors duration-200 hover:text-amber-300 cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400/30" />
            <span>Subscription</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
