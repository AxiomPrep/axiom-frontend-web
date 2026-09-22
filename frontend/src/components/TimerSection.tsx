'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Timer, Play, Pause, RotateCcw, Zap, ArrowRight, CheckCircle2, Clock } from 'lucide-react'

interface Preset {
  id: string
  title: string
  minutes: number
  desc: string
  tag: string
}

const presets: Preset[] = [
  {
    id: 'pomodoro',
    title: '25-Min Pomodoro Focus Sprint',
    minutes: 25,
    desc: 'High-intensity burst for solving 10-15 targeted PYQs without distraction.',
    tag: 'Recommended',
  },
  {
    id: 'speed-drill',
    title: '60-Min Speed Drill',
    minutes: 60,
    desc: 'Timed subject test simulation to improve speed and question selection.',
    tag: 'Subject Sprint',
  },
  {
    id: 'full-mock',
    title: '180-Min Full Exam Simulation',
    minutes: 180,
    desc: 'Simulate full 3-hour JEE Main / NEET NTA CBT exam atmosphere.',
    tag: 'Full Exam',
  },
]

export default function TimerSection() {
  const [selectedPreset, setSelectedPreset] = useState<Preset>(presets[0])
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(25 * 60)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  useEffect(() => {
    setTimeLeftSeconds(selectedPreset.minutes * 60)
    setIsRunning(false)
  }, [selectedPreset])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((prev) => prev - 1)
      }, 1000)
    } else if (timeLeftSeconds === 0) {
      setIsRunning(false)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeftSeconds])

  const formatTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600)
    const mins = Math.floor((totalSecs % 3600) / 60)
    const secs = totalSecs % 60
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeftSeconds(selectedPreset.minutes * 60)
  }

  const progressPercent = Math.max(
    0,
    Math.min(100, ((selectedPreset.minutes * 60 - timeLeftSeconds) / (selectedPreset.minutes * 60)) * 100)
  )

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[11px] font-extrabold tracking-widest text-amber-400 uppercase mb-3">
            <Clock className="h-3.5 w-3.5 text-amber-400" />
            <span>Precision Timers</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Exam Atmosphere & Speed Timers
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            Train your time-per-question pace with dedicated exam presets engineered to build speed and accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Preset Selector Cards */}
          <div className="lg:col-span-6 space-y-4">
            {presets.map((preset) => {
              const isSelected = selectedPreset.id === preset.id
              return (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/15 shadow-lg shadow-amber-500/10'
                      : 'border-white/10 bg-neutral-900/60 hover:border-amber-500/30 hover:bg-neutral-900'
                  }`}
                >
                  <div className={`p-3 rounded-xl shrink-0 ${isSelected ? 'bg-amber-500 text-neutral-950 font-black' : 'bg-white/5 text-amber-400'}`}>
                    <Timer className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-white">{preset.title}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isSelected ? 'bg-amber-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'}`}>
                        {preset.tag}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-neutral-400 leading-relaxed">{preset.desc}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Interactive Live Timer Card */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-neutral-950 p-8 shadow-2xl text-center">
              <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-800">
                <div
                  className="h-full bg-linear-to-r from-amber-400 via-amber-500 to-orange-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">
                <Zap className="h-4 w-4" />
                <span>{selectedPreset.title}</span>
              </div>

              {/* Digital Clock Display */}
              <div className="my-4 font-mono text-5xl sm:text-6xl font-black tracking-wider text-white drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                {formatTime(timeLeftSeconds)}
              </div>

              <p className="text-xs text-neutral-400 font-medium mb-6">
                {isRunning ? 'Timer Running — Stay Focused!' : 'Ready to start practice session'}
              </p>

              {/* Timer Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-amber-400 via-amber-500 to-orange-500 px-6 py-3 text-sm font-black text-neutral-950 shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition"
                >
                  {isRunning ? (
                    <>
                      <Pause className="h-4 w-4 fill-neutral-950" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 fill-neutral-950" />
                      <span>Start Timer</span>
                    </>
                  )}
                </button>

                <button
                  onClick={resetTimer}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-neutral-900 px-5 py-3 text-sm font-semibold text-neutral-300 hover:border-amber-500/40 hover:text-white transition"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="mt-6 border-t border-white/5 pt-4 flex items-center justify-between text-xs">
                <span className="text-neutral-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Auto-sync with PYQ sessions</span>
                </span>
                <Link
                  href="/timer"
                  className="text-amber-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Open Full Timer Hub</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
