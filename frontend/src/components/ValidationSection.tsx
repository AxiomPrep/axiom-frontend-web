import TestimonialCard from './TestimonialCard'
import { ShieldCheck, Award } from 'lucide-react'

interface Testimonial {
  id: string
  initials: string
  name: string
  credentials: string
  quote: string
}

const testimonials: Testimonial[] = [
  {
    id: 'ABJ',
    initials: 'ABJ',
    name: 'ABJ Sir',
    credentials: 'Co-founder, Competishun · IIT Delhi Alumnus · 16+ yrs in Physics',
    quote: 'Axiom provides students with precisely curated question sets and analytical rigor needed to clear JEE Advanced physics with top ranks.',
  },
  {
    id: 'GB',
    initials: 'GB',
    name: 'Gaveesh Bhardwaj (GB) Sir',
    credentials: 'Co-founder, IIT School · 24+ yrs Experience in Mathematics',
    quote: 'The PYQ categorization and step-by-step problem breakdown in Axiom make organic revision fast and bulletproof.',
  },
]

export default function ValidationSection() {
  return (
    <div className="relative mt-8">
      <div className="relative mb-12 flex items-center justify-center">
        <div className="h-px w-full bg-linear-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="absolute rounded-full border border-amber-500/30 bg-neutral-950 px-4 py-1 text-[11px] font-bold tracking-widest text-amber-400 uppercase shadow-md flex items-center gap-1.5">
          <Award className="h-3.5 w-3.5 text-amber-400" />
          <span>Faculty Endorsed</span>
        </div>
      </div>

      <div className="text-center">
        <div className="mb-8 flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4 text-amber-400" />
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400/90">
            Validated &amp; Recommended By Top Educators
          </h2>
        </div>

        <div className="mx-auto flex max-w-5xl flex-wrap items-stretch justify-center gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              initials={testimonial.initials}
              name={testimonial.name}
              credentials={testimonial.credentials}
              quote={testimonial.quote}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
