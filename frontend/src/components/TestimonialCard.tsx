import { CheckCircle2, Star, Quote } from 'lucide-react'

interface TestimonialCardProps {
  initials: string
  name: string
  credentials: string
  quote: string
}

export default function TestimonialCard({ initials, name, credentials, quote }: TestimonialCardProps) {
  return (
    <div className="group relative flex flex-1 min-w-[280px] max-w-lg flex-col justify-between rounded-2xl border border-amber-500/20 bg-neutral-900/60 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500/50 hover:bg-neutral-800/70 hover:shadow-amber-500/10">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <Quote className="h-5 w-5 text-amber-500/30 transition-colors group-hover:text-amber-500/60" />
      </div>

      {quote && (
        <p className="mb-5 text-xs leading-relaxed text-neutral-300 italic">
          &quot;{quote}&quot;
        </p>
      )}

      <div className="flex items-center gap-4 border-t border-white/5 pt-4">
        <div className="relative">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-linear-to-br from-amber-500/20 via-orange-600/15 to-neutral-950 text-sm font-extrabold tracking-wider text-amber-400 shadow-inner transition-all duration-300 group-hover:scale-105 group-hover:border-amber-500/70">
            {initials}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 rounded-full bg-neutral-950 p-0.5 text-amber-400">
            <CheckCircle2 className="h-4 w-4 fill-amber-500 text-neutral-950" />
          </div>
        </div>

        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-neutral-100 group-hover:text-amber-400 transition-colors text-sm">
              {name}
            </h3>
          </div>
          <p className="text-[11px] leading-snug text-neutral-400">{credentials}</p>
        </div>
      </div>
    </div>
  )
}
