import React from 'react'

const subjects = [
  { name: 'Physics', icon: '⚛' },
  { name: 'Chemistry', icon: '🧪' },
  { name: 'Mathematics', icon: '📐' },
  { name: 'Biology', icon: '🧬' },
]

const SubjectPills = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {subjects.map((subject) => (
        <div
          key={subject.name}
          className="group flex items-center gap-2.5 rounded-full border border-(--border) bg-white/3 px-5 py-2.5 text-sm shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-amber-500/40 hover:bg-white/6"
        >
          <span aria-hidden="true" className="text-base text-amber-400">{subject.icon}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_var(--color-amber-500)] animate-pulse-glow"></span>
          <span className="font-medium text-neutral-200">{subject.name}</span>
        </div>
      ))}
    </div>
  )
}

export default SubjectPills
