import {
  SUBJECTS,
  CHAPTERS,
  PRACTICE_TIERS,
  PYQ_EXAM_SETS,
  MOCK_QUESTIONS,
  type Subject,
  type Chapter,
  type PracticeTier,
  type PYQExamSet,
  type Question,
} from '@/data/mockCurriculum'

/**
 * Client-side API layer mirroring the MVP backend contract.
 *
 * The functions below intentionally expose the same shape as the backend
 * routes (see the MVP-A brief) so they can be swapped for real `fetch` calls
 * without touching the UI. Until the backend lands, they resolve against local
 * mock data + localStorage persistence.
 */

/* ------------------------------------------------------------------ *
 * Shared types
 * ------------------------------------------------------------------ */

export interface Plan {
  id: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  features: string[]
  highlight?: boolean
}

export interface LeaderboardEntry {
  rank: number
  name: string
  subject: string
  gold: number
  silver: number
}

export interface CoinWallet {
  gold: number
  silver: number
}

export interface Me {
  id: string
  name: string
  email: string
  plan: string | null
  trialDaysLeft: number
}

export interface AnnotationRecord {
  id: string
  setId: string
  page: number
  highlights: { text: string; color: string }[]
  strokes: { color: string; size: number; points: { x: number; y: number }[] }[]
  html?: string
  updatedAt: string
}

export interface AttemptAnswerPayload {
  questionId: number
  selectedOption: 'A' | 'B' | 'C' | 'D' | null
  timeSpentSeconds: number
  solutionViewSeconds: number
}

export interface AttemptRecord {
  id: string
  type: 'practice' | 'pyq'
  subjectId: string
  classLevel: '11' | '12'
  chapterId: string
  tierId?: number
  examSetId?: string
  startedAt: string
  submittedAt?: string
  totalSeconds: number
  answers: Record<number, AttemptAnswerPayload>
  result?: AttemptResult
}

export interface AttemptResult {
  score: number
  maxScore: number
  correct: number
  wrong: number
  unattempted: number
  accuracy: number
  timeTakenSeconds: number
  questions: QuestionResult[]
  chapterBreakdown: { topic: string; correct: number; total: number }[]
}

export interface QuestionResult {
  questionId: number
  questionText: string
  formula?: string
  options: { id: 'A' | 'B' | 'C' | 'D'; text: string }[]
  correctOption: 'A' | 'B' | 'C' | 'D'
  selectedOption: 'A' | 'B' | 'C' | 'D' | null
  isCorrect: boolean
  timeSpent: number
  solutionViewSeconds: number
  explanation: string
  difficulty: string
}

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

const delay = (ms = 220) => new Promise((res) => setTimeout(res, ms))

function readStore<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeStore<T>(key: string, value: T) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

export function makeId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

/* ------------------------------------------------------------------ *
 * Practice
 * ------------------------------------------------------------------ */

export async function getPracticeSubjects(): Promise<Subject[]> {
  await delay()
  return SUBJECTS
}

export async function getPracticeSubject(slug: string): Promise<Subject | null> {
  await delay()
  return SUBJECTS.find((s) => s.id === slug) ?? null
}

export async function getPracticeChapters(
  slug: string,
  classLevel: '11' | '12'
): Promise<Chapter[]> {
  await delay()
  return CHAPTERS.filter((c) => c.subjectId === slug && c.classNum === classLevel)
}

export async function getPracticeTiers(): Promise<PracticeTier[]> {
  await delay()
  return PRACTICE_TIERS
}

export async function createPracticeAttempt(payload: {
  subjectId: string
  classLevel: '11' | '12'
  chapterId: string
  tierId: number
  totalSeconds: number
}): Promise<AttemptRecord> {
  await delay()
  const attempt: AttemptRecord = {
    id: makeId('attempt'),
    type: 'practice',
    subjectId: payload.subjectId,
    classLevel: payload.classLevel,
    chapterId: payload.chapterId,
    tierId: payload.tierId,
    startedAt: new Date().toISOString(),
    totalSeconds: payload.totalSeconds,
    answers: {},
  }
  const attempts = readStore<AttemptRecord[]>('axiom_attempts', [])
  attempts.push(attempt)
  writeStore('axiom_attempts', attempts)
  return attempt
}

/* ------------------------------------------------------------------ *
 * PYQ
 * ------------------------------------------------------------------ */

export async function getPyqSubjects(): Promise<Subject[]> {
  await delay()
  return SUBJECTS
}

export async function getPyqExams(): Promise<PYQExamSet[]> {
  await delay()
  return PYQ_EXAM_SETS
}

export async function getPyqSetPages(setId: string): Promise<string[]> {
  await delay()
  const set = PYQ_EXAM_SETS.find((s) => s.id === setId)
  const questions = MOCK_QUESTIONS
  const pages = [
    `${set?.examName ?? 'PYQ Set'} — Official paper with ${set?.questionCount ?? 'N'} questions over ${set?.durationMinutes ?? 60} minutes. Use the highlight tool to mark key formulas and the pen to annotate as you solve.`,
    ...questions.map((q) => `Q. ${q.question}\n\n${q.formula ? `Formula: ${q.formula}\n\n` : ''}Options:\n${q.options.map((o) => `${o.id}) ${o.text}`).join('\n')}`),
    'Solution Notes — Revisit your highlighted formulas and drawings. These annotations persist across sessions.',
  ]
  return pages
}

/* ------------------------------------------------------------------ *
 * Attempts
 * ------------------------------------------------------------------ */

export async function getAttempt(id: string): Promise<AttemptRecord | null> {
  await delay(120)
  const attempts = readStore<AttemptRecord[]>('axiom_attempts', [])
  return attempts.find((a) => a.id === id) ?? null
}

export async function answerAttempt(
  id: string,
  payload: AttemptAnswerPayload
): Promise<AttemptRecord | null> {
  await delay(80)
  const attempts = readStore<AttemptRecord[]>('axiom_attempts', [])
  const attempt = attempts.find((a) => a.id === id)
  if (!attempt) return null
  attempt.answers[payload.questionId] = payload
  writeStore('axiom_attempts', attempts)
  return attempt
}

export async function submitAttempt(id: string, timeTakenSeconds?: number): Promise<AttemptRecord | null> {
  await delay()
  const attempts = readStore<AttemptRecord[]>('axiom_attempts', [])
  const attempt = attempts.find((a) => a.id === id)
  if (!attempt) return null
  attempt.submittedAt = new Date().toISOString()
  if (timeTakenSeconds !== undefined) attempt.totalSeconds = timeTakenSeconds
  attempt.result = computeResult(attempt)
  writeStore('axiom_attempts', attempts)
  return attempt
}

export async function getAttemptResult(id: string): Promise<AttemptResult | null> {
  await delay(120)
  const attempts = readStore<AttemptRecord[]>('axiom_attempts', [])
  const attempt = attempts.find((a) => a.id === id)
  return attempt?.result ?? null
}

function computeResult(attempt: AttemptRecord): AttemptResult {
  const questions = MOCK_QUESTIONS
  const chapter = CHAPTERS.find((c) => c.id === attempt.chapterId)
  const questionResults: QuestionResult[] = Object.entries(attempt.answers).map(([qid, ans]) => {
    const q = questions.find((qq) => qq.id === Number(qid))
    const fallbackQ = q ?? {
      id: Number(qid),
      subject: attempt.subjectId,
      classNum: attempt.classLevel,
      chapter: attempt.chapterId,
      tier: attempt.tierId ?? 1,
      tierName: 'Practice',
      difficulty: 'Medium',
      question: 'Question',
      options: [
        { id: 'A', text: 'Option A' },
        { id: 'B', text: 'Option B' },
        { id: 'C', text: 'Option C' },
        { id: 'D', text: 'Option D' },
      ],
      correctOption: 'A',
      explanation: '',
    }
    const isCorrect = ans.selectedOption === fallbackQ.correctOption
    return {
      questionId: fallbackQ.id,
      questionText: fallbackQ.question,
      formula: fallbackQ.formula,
      options: fallbackQ.options,
      correctOption: fallbackQ.correctOption,
      selectedOption: ans.selectedOption,
      isCorrect,
      timeSpent: ans.timeSpentSeconds,
      solutionViewSeconds: ans.solutionViewSeconds,
      explanation: fallbackQ.explanation,
      difficulty: fallbackQ.difficulty,
    }
  })

  const correct = questionResults.filter((q) => q.isCorrect).length
  const wrong = questionResults.filter((q) => q.selectedOption && !q.isCorrect).length
  const unattempted = questions.length - questionResults.length
  const score = correct * 4 - wrong * 1

  return {
    score,
    maxScore: questions.length * 4,
    correct,
    wrong,
    unattempted,
    accuracy: Math.round((correct / (correct + wrong || 1)) * 100),
    timeTakenSeconds: attempt.totalSeconds,
    questions: questionResults,
    chapterBreakdown: chapter
      ? [{ topic: chapter.name, correct, total: questions.length }]
      : [],
  }
}

/* ------------------------------------------------------------------ *
 * User / Subscription
 * ------------------------------------------------------------------ */

export async function getMe(): Promise<Me> {
  await delay(120)
  const stored = readStore<Me | null>('axiom_me', null)
  return (
    stored ?? {
      id: 'local_user',
      name: 'Aspirant',
      email: 'aspirant@axiom.app',
      plan: null,
      trialDaysLeft: 6,
    }
  )
}

export async function getPlans(): Promise<Plan[]> {
  await delay()
  const plans: Plan[] = [
    {
      id: 'axiom-complete',
      name: 'Axiom Complete',
      price: 399,
      priceLabel: '₹399/mo',
      tagline: 'Full practice engine & PYQ bank',
      features: [
        'All 50,000+ PYQs (2015–2024)',
        '5-Tier practice unlocked',
        'Instant AI solutions & hints',
        'Chapter analytics & diagnostics',
      ],
    },
    {
      id: 'mentorship-a',
      name: 'Mentorship A',
      price: 249,
      priceLabel: '₹249/mo',
      tagline: 'Guided mentorship track A',
      features: [
        'Dedicated mentor check-ins',
        'Personalised study plan',
        'Weekly progress reviews',
        'Community access',
      ],
    },
    {
      id: 'mentorship-b',
      name: 'Mentorship B',
      price: 449,
      priceLabel: '₹449/mo',
      tagline: 'Guided mentorship track B',
      features: [
        'Everything in Mentorship A',
        '1:1 doubt sessions',
        'Priority mentor support',
        'Exam strategy calls',
      ],
    },
    {
      id: 'complete-mentorship-a',
      name: 'Complete + Mentorship A',
      price: 499,
      priceLabel: '₹499/mo',
      tagline: 'Best value for focused rankers',
      features: [
        'Everything in Axiom Complete',
        'Everything in Mentorship A',
        'Unlimited AI tutor',
        'Speed & accuracy diagnostics',
      ],
      highlight: true,
    },
    {
      id: 'complete-mentorship-b',
      name: 'Complete + Mentorship B',
      price: 899,
      priceLabel: '₹899/mo',
      tagline: 'Elite all-inclusive track',
      features: [
        'Everything in Axiom Complete',
        'Everything in Mentorship B',
        'Top faculty masterclasses',
        'Full exam simulation & analytics',
      ],
    },
  ]
  return plans
}

export interface CheckoutPayload {
  id: string
  planId: string
  orderId: string
  amount: number
  currency: string
  key: string
}

export async function createCheckout(planId: string): Promise<CheckoutPayload> {
  await delay()
  const plan = (await getPlans()).find((p) => p.id === planId)
  return {
    id: makeId('checkout'),
    planId,
    orderId: makeId('order'),
    amount: (plan?.price ?? 399) * 100,
    currency: 'INR',
    key: 'rzp_live_placeholder',
  }
}

export async function confirmCheckout(checkoutId: string): Promise<{ ok: boolean }> {
  await delay(300)
  writeStore('axiom_checkout_confirmed', checkoutId)
  const me = await getMe()
  writeStore('axiom_me', { ...me, plan: 'active' })
  return { ok: true }
}

/* ------------------------------------------------------------------ *
 * Coins / Leaderboard
 * ------------------------------------------------------------------ */

export async function getCoins(): Promise<CoinWallet> {
  await delay(120)
  return readStore<CoinWallet>('axiom_coins', { gold: 1240, silver: 3875 })
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  await delay()
  const base: LeaderboardEntry[] = [
    { rank: 1, name: 'Aarav Sharma', subject: 'Physics', gold: 14820, silver: 6400 },
    { rank: 2, name: 'Ishita Verma', subject: 'Chemistry', gold: 12980, silver: 8110 },
    { rank: 3, name: 'Rohan Mehta', subject: 'Mathematics', gold: 11750, silver: 9340 },
    { rank: 4, name: 'Sneha Iyer', subject: 'Biology', gold: 10210, silver: 11220 },
    { rank: 5, name: 'Kabir Singh', subject: 'Physics', gold: 9340, silver: 12980 },
    { rank: 6, name: 'Ananya Rao', subject: 'Chemistry', gold: 8410, silver: 14820 },
    { rank: 7, name: 'Vivaan Gupta', subject: 'Mathematics', gold: 7280, silver: 16210 },
    { rank: 8, name: 'Diya Patel', subject: 'Biology', gold: 6150, silver: 18150 },
    { rank: 9, name: 'Arjun Nair', subject: 'Physics', gold: 5020, silver: 20430 },
    { rank: 10, name: 'Myra Kulkarni', subject: 'Chemistry', gold: 3890, silver: 22180 },
  ]
  return base
}

/* ------------------------------------------------------------------ *
 * Annotations
 * ------------------------------------------------------------------ */

export async function getAnnotations(setId: string): Promise<AnnotationRecord[]> {
  await delay(120)
  const all = readStore<AnnotationRecord[]>('axiom_annotations', [])
  return all.filter((a) => a.setId === setId)
}

export async function saveAnnotation(
  input: Omit<AnnotationRecord, 'id' | 'updatedAt'>
): Promise<AnnotationRecord> {
  await delay(80)
  const all = readStore<AnnotationRecord[]>('axiom_annotations', [])
  const existing = all.find((a) => a.setId === input.setId && a.page === input.page)
  if (existing) {
    existing.highlights = input.highlights
    existing.strokes = input.strokes
    existing.html = input.html
    existing.updatedAt = new Date().toISOString()
    writeStore('axiom_annotations', all)
    return existing
  }
  const record: AnnotationRecord = {
    ...input,
    id: makeId('ann'),
    updatedAt: new Date().toISOString(),
  }
  all.push(record)
  writeStore('axiom_annotations', all)
  return record
}

export async function deleteAnnotation(id: string): Promise<void> {
  await delay(80)
  const all = readStore<AnnotationRecord[]>('axiom_annotations', [])
  writeStore(
    'axiom_annotations',
    all.filter((a) => a.id !== id)
  )
}
