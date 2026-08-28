import React from 'react'
import TestimonialCard from './TestimonialCard'

const testimonials = [
  {
    id: 'ABJ',
    initials: 'ABJ',
    name: 'ABJ Sir',
    credentials: 'Co-founder, Competishun · IIT Delhi · 16+ yrs in Physics',
  },
  {
    id: 'GB',
    initials: 'GB',
    name: 'Gaveesh Bhardwaj (GB) Sir',
    credentials: 'Co-founder, IIT School · 24+ yrs experience',
  },
]

const ValidationSection = () => {
  return (
    <div>
      {/* Divider */}
      <div className="relative mb-14 flex items-center justify-center">
        <div className="h-px w-full bg-linear-to-r from-transparent via-amber-500/40 to-transparent"></div>
      </div>

      <div className="text-center">
        <h2 className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-amber-500/70">
          Validated &amp; appreciated by
        </h2>

        <div className="mx-auto flex max-w-4xl flex-wrap items-stretch justify-center gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              initials={testimonial.initials}
              name={testimonial.name}
              credentials={testimonial.credentials}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ValidationSection
