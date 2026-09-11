import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, Shield, Heart, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-amber-500/10 bg-neutral-950 text-neutral-400">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/nav-logo.jpg"
                alt="Axiom"
                width={36}
                height={36}
                className="rounded-lg object-contain shadow"
              />
              <span className="font-black tracking-tight text-white text-lg">AXIOM</span>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The high-yield precision practice engine built for serious JEE, NEET, and Olympiad aspirants.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-500/80 font-medium">
              <Sparkles className="h-3 w-3" />
              <span>Algorithmic Concept Reinforcement</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Curriculum</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/practice?subject=physics" className="hover:text-amber-400 transition-colors">
                  Physics Mechanics &amp; Electrodynamics
                </Link>
              </li>
              <li>
                <Link href="/practice?subject=chemistry" className="hover:text-amber-400 transition-colors">
                  Organic &amp; Physical Chemistry
                </Link>
              </li>
              <li>
                <Link href="/practice?subject=mathematics" className="hover:text-amber-400 transition-colors">
                  Calculus &amp; Vectors 3D
                </Link>
              </li>
              <li>
                <Link href="/practice?subject=biology" className="hover:text-amber-400 transition-colors">
                  Genetics &amp; Physiology
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/practice" className="hover:text-amber-400 transition-colors">
                  5-Tier Practice Engine
                </Link>
              </li>
              <li>
                <Link href="/pyq-bank" className="hover:text-amber-400 transition-colors">
                  Previous Year Papers (2015-2024)
                </Link>
              </li>
              <li>
                <Link href="/top-teachers" className="hover:text-amber-400 transition-colors">
                  Top Faculty Insights
                </Link>
              </li>
              <li>
                <Link href="/originals" className="hover:text-amber-400 transition-colors">
                  Axiom Originals
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-amber-400 transition-colors">
                  Gold & Silver Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Trust &amp; Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/subscription" className="hover:text-amber-400 transition-colors">
                  Subscription Plans
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-amber-400 transition-colors">
                  Student Portal Login
                </Link>
              </li>
              <li className="flex items-center gap-1 text-neutral-500">
                <Shield className="h-3 w-3 text-emerald-400" />
                <span>256-Bit Encrypted Platform</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-6 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} Axiom Science Technologies. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Crafted with precision for top 1% aspirants.
          </p>
        </div>
      </div>
    </footer>
  )
}
