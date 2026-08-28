import React from 'react'

const TestimonialCard = ({ initials, name, credentials }) => {
  return (
    <div className="group flex flex-1 min-w-70 items-center gap-5 rounded-2xl border border-(--border) bg-white/2 p-6 shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/40 hover:bg-white/4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-linear-to-br from-amber-500/15 to-orange-600/15 text-sm font-bold tracking-wide text-amber-400 shadow-inner transition-all duration-300 group-hover:border-amber-500/60">
        {initials}
      </div>
      <div className="text-left">
        <h3 className="mb-1 font-semibold text-white">{name}</h3>
        <p className="text-xs leading-relaxed text-neutral-400">{credentials}</p>
      </div>
    </div>
  )
}

export default TestimonialCard
