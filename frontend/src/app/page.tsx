import Hero from '@/components/Hero'
import CoinWallet from '@/components/CoinWallet'
import { ShieldCheck, Award, Zap, Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Hero />

      {/* Wallet / balance strip */}
      <section className="relative border-y border-amber-500/10 bg-neutral-900/40 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-black text-white">Your Reward Wallet</h2>
            <p className="text-xs text-neutral-400">
              Earn coins on every attempt — climb the Gold &amp; Silver leaderboard.
            </p>
          </div>
          <CoinWallet />
        </div>
      </section>

      {/* Trust markers */}
      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
              Why aspirants trust Axiom
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: ShieldCheck, title: '256-bit secure', desc: 'Encrypted platform & safe checkout via Razorpay.' },
              { icon: Award, title: 'Official paper fidelity', desc: 'PYQs sourced from NTA & IIT official archives.' },
              { icon: Zap, title: 'Instant AI solutions', desc: 'Step-by-step reasoning for every answer.' },
              { icon: Users, title: '50,000+ aspirants', desc: 'Ranked against a nationwide cohort.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-amber-500/15 bg-neutral-900/50 p-5 backdrop-blur-md text-center transition hover:border-amber-500/40"
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-white">{title}</h3>
                <p className="mt-1 text-xs text-neutral-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
