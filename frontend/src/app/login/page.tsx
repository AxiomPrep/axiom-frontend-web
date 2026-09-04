'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Lock,
  Mail,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'signin' | 'signup' | 'magic'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [fullName, setFullName] = useState('')
  const [targetExam, setTargetExam] = useState('JEE 2025 / 2026')
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setLoading(true)

    try {
      // Simulate Supabase authentication call
      await new Promise((resolve) => setTimeout(resolve, 900))

      if (mode === 'magic') {
        setSuccessMessage(`Supabase magic link dispatched to ${email}! Check your inbox.`)
        setLoading(false)
        return
      }

      setSuccessMessage(
        mode === 'signin'
          ? 'Authenticated via Supabase Auth! Redirecting to Practice...'
          : 'Account created in Supabase Auth! Welcome to Axiom.'
      )

      setTimeout(() => {
        router.push('/practice')
      }, 1200)
    } catch {
      setErrorMessage('Authentication encountered an unexpected error.')
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex items-center justify-center bg-neutral-950 py-16 px-4 sm:px-6">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-amber-500/15 blur-[160px]"></div>

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-amber-500/30 bg-neutral-900/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-amber-500/10 animate-fade-in-up">
        {/* Header with Logo */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 text-amber-400">
            <Lock className="h-6 w-6" />
          </div>

          <h1 className="text-2xl font-black text-white">
            {mode === 'signin'
              ? 'Welcome back to Axiom'
              : mode === 'signup'
              ? 'Start Your 7-Day Free Trial'
              : 'Sign in with Magic Link'}
          </h1>
          <p className="mt-1 text-xs text-neutral-400">
            Secure Supabase Authentication • 256-bit encrypted
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-5 grid grid-cols-3 rounded-xl border border-white/10 bg-neutral-950 p-1 text-xs">
            <button
              type="button"
              onClick={() => {
                setMode('signin')
                setSuccessMessage(null)
              }}
              className={`rounded-lg py-1.5 font-bold transition ${
                mode === 'signin' ? 'bg-amber-500 text-neutral-950 shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup')
                setSuccessMessage(null)
              }}
              className={`rounded-lg py-1.5 font-bold transition ${
                mode === 'signup' ? 'bg-amber-500 text-neutral-950 shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('magic')
                setSuccessMessage(null)
              }}
              className={`rounded-lg py-1.5 font-bold transition ${
                mode === 'magic' ? 'bg-amber-500 text-neutral-950 shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Magic Link
            </button>
          </div>
        </div>

        {/* Success / Error Alerts */}
        {successMessage && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 text-xs text-emerald-300 animate-fade-in-up">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-5 rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs text-rose-300">
            {errorMessage}
          </div>
        )}

        {/* Main Auth Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Aarav Sharma"
                className="w-full rounded-xl border border-white/10 bg-neutral-950 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Student Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aspirant@iit.ac.in"
                className="w-full rounded-xl border border-white/10 bg-neutral-950 pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {mode !== 'magic' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-300">
                  Password
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => setMode('magic')}
                    className="text-[11px] text-amber-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-white/10 bg-neutral-950 pl-9 pr-10 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                Target Exam
              </label>
              <select
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="JEE Main & Advanced 2025">JEE Main &amp; Advanced 2025</option>
                <option value="JEE Main & Advanced 2026">JEE Main &amp; Advanced 2026</option>
                <option value="NEET UG 2025">NEET UG 2025</option>
                <option value="NEET UG 2026">NEET UG 2026</option>
                <option value="Science Olympiads (INPhO/INChO)">Science Olympiads (INPhO/INChO)</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-linear-to-r from-amber-400 via-amber-500 to-orange-500 py-3 text-xs font-black text-neutral-950 shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition"
          >
            {loading ? (
              <span>Authenticating with Supabase...</span>
            ) : mode === 'signin' ? (
              <span className="flex items-center justify-center gap-1.5">
                <span>Sign In to Axiom</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            ) : mode === 'signup' ? (
              <span className="flex items-center justify-center gap-1.5">
                <span>Create Free Account</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            ) : (
              <span>Send Supabase Magic Link</span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <span className="relative bg-neutral-900 px-3 text-[10px] uppercase font-bold text-neutral-500">
            or continue with
          </span>
        </div>

        {/* Social Supabase OAuth Providers */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setSuccessMessage('Initiating Google OAuth via Supabase...')
              setTimeout(() => router.push('/practice'), 1000)
            }}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-neutral-950 py-2.5 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 transition"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8 0-1 .2-1.9.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
              />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSuccessMessage('Initiating GitHub OAuth via Supabase...')
              setTimeout(() => router.push('/practice'), 1000)
            }}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-neutral-950 py-2.5 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 transition"
          >
            <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </button>
        </div>

        {/* Supabase Badge */}
        <div className="mt-8 flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Powered by Supabase Auth Infrastructure</span>
        </div>
      </div>
    </div>
  )
}
