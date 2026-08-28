import React, { useState, useEffect } from 'react'

const TrialBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
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
    <div className="w-full border-b border-[var(--border)] bg-[var(--background)] px-6 py-2 text-xs">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 text-center">
        <span className="text-[var(--muted)]">Free trial ends in</span>
        <div className="flex items-center gap-1.5 font-mono font-semibold">
          <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-amber-400 ring-1 ring-[var(--border)]">
            {String(timeLeft.days).padStart(2, '0')}d
          </span>
          <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-amber-400 ring-1 ring-[var(--border)]">
            {String(timeLeft.hours).padStart(2, '0')}h
          </span>
          <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-amber-400 ring-1 ring-[var(--border)]">
            {String(timeLeft.minutes).padStart(2, '0')}m
          </span>
          <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-amber-400 ring-1 ring-[var(--border)]">
            {String(timeLeft.seconds).padStart(2, '0')}s
          </span>
        </div>
        <a
          href="#"
          className="ml-1 font-semibold text-amber-400 transition-colors duration-200 hover:text-amber-300"
        >
          Upgrade Plan →
        </a>
      </div>
    </div>
  )
}

export default TrialBanner
