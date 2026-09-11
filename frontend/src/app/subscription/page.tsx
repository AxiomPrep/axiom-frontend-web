'use client'

import React, { useEffect, useState } from 'react'
import { getPlans, createCheckout, confirmCheckout, type Plan } from '@/lib/api'
import {
  Sparkles,
  Check,
  Crown,
  X,
  ShieldCheck,
  Zap,
  Loader2,
  IndianRupee,
} from 'lucide-react'

export default function SubscriptionPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [checkoutState, setCheckoutState] = useState<'idle' | 'processing' | 'success'>('idle')

  useEffect(() => {
    getPlans().then((p) => {
      setPlans(p)
      setLoading(false)
    })
  }, [])

  const handleChoose = (plan: Plan) => {
    setSelectedPlan(plan)
    setCheckoutState('idle')
  }

  const handlePay = async () => {
    if (!selectedPlan) return
    setCheckoutState('processing')
    const checkout = await createCheckout(selectedPlan.id)
    // Simulate Razorpay checkout — replace with window.Razorpay when the live
    // key is configured. The backend confirm endpoint finalises the order.
    await new Promise((res) => setTimeout(res, 1400))
    await confirmCheckout(checkout.id)
    setCheckoutState('success')
  }

  return (
    <div className="relative min-h-screen bg-neutral-950 py-12 px-4 sm:px-6">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-bold text-amber-400 mb-4">
            <Crown className="h-4 w-4" />
            <span>AXIOM SUBSCRIPTIONS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Choose Your Plan</h1>
          <p className="mt-2 text-sm text-neutral-400 max-w-xl mx-auto">
            Every plan unlocks the precision prep engine. Secure checkout powered by Razorpay.
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center text-neutral-500 text-sm">Loading plans…</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {plans.map((plan) => {
              const isHighlight = plan.highlight
              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col justify-between rounded-2xl p-5 transition-all duration-200 ${
                    isHighlight
                      ? 'border-2 border-amber-500 bg-linear-to-b from-amber-500/10 to-neutral-900 shadow-xl shadow-amber-500/10'
                      : 'border border-white/10 bg-neutral-900/60 hover:border-amber-500/40 hover:bg-neutral-900'
                  }`}
                >
                  {isHighlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-amber-400 to-orange-500 px-3 py-0.5 text-[10px] font-black uppercase text-neutral-950 tracking-wider">
                      Best Value
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-bold text-white">{plan.name}</h3>
                      {isHighlight && <Sparkles className="h-4 w-4 text-amber-400" />}
                    </div>
                    <p className="text-[11px] text-neutral-400 mb-4 min-h-[28px]">{plan.tagline}</p>

                    <div className="flex items-baseline gap-1 mb-4">
                      <IndianRupee className="h-4 w-4 text-amber-400" />
                      <span className="text-2xl font-black text-white">{plan.price}</span>
                      <span className="text-xs text-neutral-400">/mo</span>
                    </div>

                    <ul className="space-y-2 text-[11px] text-neutral-300 mb-5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-1.5">
                          <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleChoose(plan)}
                    className={`w-full rounded-xl py-2.5 text-xs font-black transition ${
                      isHighlight
                        ? 'bg-linear-to-r from-amber-400 to-orange-500 text-neutral-950 shadow-md shadow-amber-500/20 hover:scale-[1.02]'
                        : 'border border-amber-500/30 bg-neutral-800 text-amber-300 hover:bg-neutral-700'
                    }`}
                  >
                    Choose Plan
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {/* Trust note */}
        <div className="mt-10 flex items-center justify-center gap-2 text-[11px] text-neutral-500">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Payments are secured via Razorpay with 256-bit encryption.</span>
        </div>
      </div>

      {/* Checkout modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in-up">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-amber-500/30 bg-neutral-950 p-6 shadow-2xl">
            {checkoutState !== 'success' && (
              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute right-4 top-4 rounded-full p-1 text-neutral-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            )}

            {checkoutState === 'success' ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black text-white">Subscription Activated!</h3>
                <p className="mt-2 text-sm text-neutral-300">
                  Welcome to <span className="font-bold text-amber-400">{selectedPlan.name}</span>.
                </p>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="mt-6 rounded-xl bg-linear-to-r from-amber-400 to-orange-500 px-6 py-2.5 text-xs font-black text-neutral-950 shadow-md hover:scale-105 transition"
                >
                  Start Practicing
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">Razorpay Checkout</h3>
                    <p className="text-xs text-neutral-400">Complete your subscription securely</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-neutral-900/60 p-4 text-xs space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Plan</span>
                    <span className="font-bold text-white">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Billing</span>
                    <span className="font-bold text-white">Monthly</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-2">
                    <span className="text-neutral-400">Total due</span>
                    <span className="font-black text-amber-400">₹{selectedPlan.price}/mo</span>
                  </div>
                </div>

                <button
                  onClick={handlePay}
                  disabled={checkoutState === 'processing'}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-amber-400 via-amber-500 to-orange-500 py-3 text-sm font-black text-neutral-950 shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 disabled:opacity-60 transition"
                >
                  {checkoutState === 'processing' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Processing Payment…</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      <span>Pay ₹{selectedPlan.price} with Razorpay</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
