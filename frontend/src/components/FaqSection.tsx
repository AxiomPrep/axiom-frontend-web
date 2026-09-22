'use client'

import React, { useState } from 'react'
import { HelpCircle, ChevronDown, ShieldCheck, Sparkles } from 'lucide-react'

interface FaqItem {
  id: string
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Are the PYQs sourced from official NTA, IIT, and NEET archives?',
    answer:
      'Yes, 100% of our question bank is extracted directly from official NTA JEE Main CBT papers (2019-2024), IIT JEE Advanced official archives (2010-2024), NEET-UG papers (2013-2024), and official Olympiad authority tests. Every question is double-audited for diagram accuracy and numerical fidelity.',
  },
  {
    id: 'faq-2',
    question: 'How do Axiom Reward Coins work and how do I climb the Leaderboard?',
    answer:
      'You earn Reward Coins on every correct PYQ attempt (+10 to +50 coins depending on difficulty tier). Maintaining daily streaks grants up to 1.5x coin multipliers. Your accumulated coins automatically determine your Gold, Silver, or Bronze position on the nationwide leaderboard.',
  },
  {
    id: 'faq-3',
    question: 'How is the 5-Tier Difficulty system calibrated?',
    answer:
      'Our practice engine categorizes questions across 5 distinct tiers: Tier 1 (NCERT Core), Tier 2 (JEE Main / NEET Standard), Tier 3 (JEE Advanced Multi-Concept Traps), Tier 4 (Top 1% Rank Deciders), and Tier 5 (Olympiad Rigor). This ensures a smooth learning curve without hitting conceptual walls.',
  },
  {
    id: 'faq-4',
    question: 'Can I start practicing for free without entering payment details?',
    answer:
      'Absolutely! All new aspirants get immediate free access to sample sets across Physics, Chemistry, Math, and Bio, as well as the Daily Question Challenge and Precision Timers, with no credit card required.',
  },
  {
    id: 'faq-5',
    question: 'Can I use Axiom on both mobile phones and desktop browsers?',
    answer:
      'Yes! Axiom is fully optimized for responsive mobile browsers, tablets, and desktop screens, allowing seamless practice on any device with real-time sync across sessions.',
  },
]

export default function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1')

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id)
  }

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[11px] font-extrabold tracking-widest text-amber-400 uppercase mb-3">
            <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            Everything you need to know about Axiom paper archives, reward coins, and exam preparation.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openFaqId === faq.id
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-amber-500/40 bg-neutral-900/80 shadow-lg shadow-amber-500/5'
                    : 'border-white/10 bg-neutral-900/40 hover:border-amber-500/20'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left transition"
                >
                  <span className="text-sm sm:text-base font-extrabold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 border-t border-white/5 mt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed animate-fade-in-up">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
