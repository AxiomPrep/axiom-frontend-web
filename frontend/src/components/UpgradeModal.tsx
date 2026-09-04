'use client'

import React, { useState } from 'react'
import { X, Check, Zap, Sparkles, ShieldCheck, Crown } from 'lucide-react'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'ultimate'>('ultimate')
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen) return null

  const handleUpgrade = (plan: 'pro' | 'ultimate') => {
    setSelectedPlan(plan)
    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
      onClose()
    }, 2200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in-up">
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-amber-500/30 bg-neutral-950 p-6 md:p-8 shadow-2xl shadow-amber-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full border border-white/10 bg-neutral-900/80 p-2 text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {isSuccess ? (
          <div className="py-16 text-center animate-fade-in-up">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-black text-white">Upgrade Activated!</h3>
            <p className="mt-2 text-sm text-neutral-300">
              Welcome to <span className="font-bold text-amber-400">{selectedPlan.toUpperCase()} Pass</span>. Unlimited PYQs, 5-tier drills, and AI doubt clearing are now active.
            </p>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 mb-3">
                <Crown className="h-3.5 w-3.5" />
                <span>UPGRADE AXIOM MEMBERSHIP</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Unlock Uncapped High-Yield Practice
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-xs md:text-sm text-neutral-400">
                Supercharge your JEE / NEET / Olympiad prep with unlimited attempts, full step-by-step video solutions, and 24/7 AI tutor guidance.
              </p>

              {/* Billing Toggle */}
              <div className="mt-5 inline-flex items-center rounded-full border border-white/10 bg-neutral-900 p-1">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`rounded-full px-4 py-1 text-xs font-semibold transition ${
                    billingCycle === 'monthly'
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-semibold transition ${
                    billingCycle === 'yearly'
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span>Yearly</span>
                  <span className="rounded-full bg-orange-600 px-1.5 py-0.2 text-[9px] font-bold text-white">
                    SAVE 25%
                  </span>
                </button>
              </div>
            </div>

            {/* Plans Grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Pro Plan */}
              <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-neutral-900/60 p-6 backdrop-blur-md transition hover:border-amber-500/30">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white">Axiom Pro</h4>
                      <p className="text-xs text-neutral-400">Targeting JEE Mains &amp; NEET 99+ %ile</p>
                    </div>
                    <Zap className="h-5 w-5 text-amber-400" />
                  </div>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">
                      {billingCycle === 'yearly' ? '₹799' : '₹999'}
                    </span>
                    <span className="text-xs text-neutral-400">/ month</span>
                  </div>

                  <ul className="mt-5 space-y-2.5 text-xs text-neutral-300">
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span>All 50,000+ PYQs (2015 - 2024)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span>Tiers 1 to 4 Full Practice unlocked</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span>Speed &amp; Accuracy Diagnostics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span>150 AI Doubt credits / month</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleUpgrade('pro')}
                  className="mt-6 w-full rounded-xl border border-amber-500/30 bg-neutral-800/80 py-2.5 text-xs font-bold text-neutral-200 transition hover:bg-neutral-700 hover:text-white"
                >
                  Choose Axiom Pro
                </button>
              </div>

              {/* Ultimate Plan (Recommended) */}
              <div className="relative flex flex-col justify-between rounded-2xl border-2 border-amber-500 bg-linear-to-b from-amber-500/10 via-neutral-900 to-neutral-950 p-6 shadow-xl shadow-amber-500/10">
                <div className="absolute -top-3 right-6 rounded-full bg-linear-to-r from-amber-400 to-orange-500 px-3 py-0.5 text-[10px] font-black uppercase text-neutral-950 tracking-wider">
                  Most Popular
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white">Ultimate Ranker</h4>
                      <p className="text-xs text-amber-300/80">JEE Advanced &amp; Top AIR Aspirants</p>
                    </div>
                    <Sparkles className="h-5 w-5 text-amber-400" />
                  </div>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-amber-400">
                      {billingCycle === 'yearly' ? '₹1,299' : '₹1,599'}
                    </span>
                    <span className="text-xs text-neutral-400">/ month</span>
                  </div>

                  <ul className="mt-5 space-y-2.5 text-xs text-neutral-300">
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span className="font-semibold text-white">Everything in Pro Plan</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Tier 5 Advanced &amp; Olympiad Challenges</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Unlimited 24/7 AI Tutor Doubts &amp; Hints</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Top Faculty Masterclass Original Sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Full Exam Timing Simulation &amp; Analytics</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleUpgrade('ultimate')}
                  className="mt-6 w-full rounded-xl bg-linear-to-r from-amber-400 via-amber-500 to-orange-500 py-3 text-xs font-black text-neutral-950 shadow-lg shadow-amber-500/25 transition hover:scale-[1.02] hover:shadow-amber-500/40 active:scale-95"
                >
                  Get Ultimate Ranker Pass
                </button>
              </div>
            </div>

            {/* Guarantee footer */}
            <div className="mt-6 flex flex-wrap items-center justify-between border-t border-white/5 pt-4 text-[11px] text-neutral-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                100% Risk-Free 14-Day Money Back Guarantee
              </span>
              <span>Cancel anytime with 1-click in account settings</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
