import React from 'react'
import { Atom, FlaskConical, Calculator, Dna, Sparkles } from 'lucide-react'

const subjects = [
  { name: 'Physics', icon: Atom, count: '14,200+ Qs', formula: 'F = m·a', color: 'from-amber-500/20 to-orange-500/10' },
  { name: 'Chemistry', icon: FlaskConical, count: '11,800+ Qs', formula: 'PV = nRT', color: 'from-yellow-500/20 to-amber-500/10' },
  { name: 'Mathematics', icon: Calculator, count: '16,500+ Qs', formula: 'e^(iπ) + 1 = 0', color: 'from-amber-600/20 to-orange-600/10' },
  { name: 'Biology', icon: Dna, count: '12,900+ Qs', formula: 'ATP ↔ ADP', color: 'from-orange-500/20 to-amber-500/10' },
]

const SubjectPills = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3.5">
      {subjects.map((subject) => {
        const Icon = subject.icon
        return (
          <div
            key={subject.name}
            className="group relative flex cursor-pointer items-center gap-3 rounded-2xl border border-amber-500/20 bg-neutral-900/60 px-5 py-3 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:bg-neutral-800/80 hover:shadow-amber-500/15"
          >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${subject.color} border border-amber-500/30 text-amber-400 transition-transform duration-300 group-hover:scale-110`}>
              <Icon className="h-4 w-4" />
            </div>

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-100 group-hover:text-amber-400 transition-colors">
                  {subject.name}
                </span>
                <span className="font-mono text-[10px] text-amber-400/80 font-medium">
                  {subject.formula}
                </span>
              </div>
              <span className="text-[10px] font-medium text-neutral-400">
                {subject.count}
              </span>
            </div>

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-amber-500 opacity-60 shadow-[0_0_8px_#f59e0b] group-hover:opacity-100"></span>
          </div>
        )
      })}
    </div>
  )
}

export default SubjectPills

