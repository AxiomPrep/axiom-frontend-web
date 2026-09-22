import React from 'react'
import { ShieldCheck, Award, CheckCircle2, GraduationCap, Building2 } from 'lucide-react'

interface HODValidation {
  id: string
  subject: string
  role: string
  institute: string
  experience: string
  badge: string
}

const hodValidations: HODValidation[] = [
  {
    id: 'hod-physics',
    subject: 'Physics Department',
    role: 'HOD Physics',
    institute: 'Premier National Coaching Inst. (Kota)',
    experience: '18+ Years Pedagogy',
    badge: 'Curriculum & Question Rigor Validated',
  },
  {
    id: 'hod-maths',
    subject: 'Mathematics Department',
    role: 'HOD Mathematics',
    institute: 'Top Apex Academy (Delhi NCR)',
    experience: '22+ Years Pedagogy',
    badge: 'PYQ Accuracy & Solutions Validated',
  },
  {
    id: 'hod-chemistry',
    subject: 'Chemistry Department',
    role: 'HOD Organic & Physical Chemistry',
    institute: 'Premier Olympiad Inst. (Hyderabad)',
    experience: '16+ Years Pedagogy',
    badge: 'Pattern & Weightage Mapping Validated',
  },
]

export default function ValidationSection() {
  return (
    <div className="relative mt-12 mb-8">
      {/* Divider pill */}
      <div className="relative mb-10 flex items-center justify-center">
        <div className="h-px w-full bg-linear-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="absolute rounded-full border border-amber-500/30 bg-neutral-950 px-4 py-1 text-[11px] font-extrabold tracking-widest text-amber-400 uppercase shadow-md flex items-center gap-1.5">
          <Award className="h-3.5 w-3.5 text-amber-400" />
          <span>Faculty & HOD Endorsed</span>
        </div>
      </div>

      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-3 flex items-center justify-center gap-2">
          <ShieldCheck className="h-5 w-5 text-amber-400" />
          <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-400">
            Official Endorsement
          </span>
        </div>

        {/* Highlighted exact copy as requested */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
          RECOMMENDED AND VALIDATED BY{' '}
          <span className="bg-linear-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            HODs OF TOP 3 INSTITUTES
          </span>
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto">
          Reviewed, audited, and approved for official question bank accuracy, topic distribution, and JEE & NEET exam alignment.
        </p>

        {/* HOD Validation Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {hodValidations.map((hod) => (
            <div
              key={hod.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-amber-500/20 bg-neutral-900/60 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:bg-neutral-900/80 hover:shadow-lg hover:shadow-amber-500/10"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">
                    {hod.subject}
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>

                <h3 className="text-base font-extrabold text-white group-hover:text-amber-400 transition-colors">
                  {hod.role}
                </h3>
                
                <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-300 font-medium">
                  <Building2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>{hod.institute}</span>
                </div>

                <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-neutral-400">
                  <GraduationCap className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                  <span>{hod.experience}</span>
                </div>
              </div>

              <div className="mt-5 border-t border-white/5 pt-3">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{hod.badge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
