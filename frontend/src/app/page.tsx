import Hero from '@/components/Hero'
import ExamTargetGrid from '@/components/ExamTargetGrid'
import DailyChallenge from '@/components/DailyChallenge'
import TimerSection from '@/components/TimerSection'
import TierBreakdown from '@/components/TierBreakdown'
import LeaderboardSpotlight from '@/components/LeaderboardSpotlight'
import StreakTracker from '@/components/StreakTracker'
import FaqSection from '@/components/FaqSection'
import ParticleBackground from '@/components/ParticleBackground'
import { ShieldCheck, Award, BookOpen, Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 bg-grid-pattern overflow-hidden">
      {/* Full Page Particle Constellation Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ParticleBackground />
      </div>

      {/* Ambient page-wide background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-linear-to-b from-amber-500/20 via-orange-600/10 to-transparent blur-[180px]"></div>
        <div className="absolute top-1/4 left-[-10%] h-[500px] w-[500px] rounded-full bg-amber-600/10 blur-[170px]"></div>
        <div className="absolute top-1/2 right-[-10%] h-[550px] w-[550px] rounded-full bg-orange-500/10 blur-[180px]"></div>
        <div className="absolute top-3/4 left-[20%] h-[500px] w-[500px] rounded-full bg-yellow-500/10 blur-[160px]"></div>
        <div className="absolute bottom-10 right-[15%] h-[600px] w-[600px] rounded-full bg-amber-500/10 blur-[180px]"></div>
      </div>

      {/* Main content sections with higher z-index */}
      <div className="relative z-10 space-y-4">
        {/* Hero Header & HOD Validation */}
        <Hero />

        {/* Target Exam Catalogs (JEE Main, Advanced, NEET, Olympiad) */}
        <ExamTargetGrid />

        {/* Interactive Question of the Day Challenge */}
        <DailyChallenge />

        {/* Precision Timers Section */}
        <TimerSection />

        {/* 5-Tier Difficulty Practice Engine */}
        <TierBreakdown />

        {/* Top 3 Weekly Leaderboard Spotlight */}
        <LeaderboardSpotlight />

        {/* Daily Goal & Streak Heatmap */}
        <StreakTracker />

        {/* Frequently Asked Questions */}
        <FaqSection />

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
                { icon: BookOpen, title: 'Step-by-step solutions', desc: 'Clear conceptual breakdowns for every problem.' },
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
    </div>
  )
}
