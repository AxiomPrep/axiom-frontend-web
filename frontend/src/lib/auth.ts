import { supabase, isSupabaseConfigured } from './supabase'

export interface AxiomUser {
  id: string
  email: string
  name: string
}

const SESSION_KEY = 'axiom_auth_session'

type AuthListener = (user: AxiomUser | null) => void

let currentUser: AxiomUser | null = null
const listeners = new Set<AuthListener>()

function readStoredSession(): AxiomUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as AxiomUser) : null
  } catch {
    return null
  }
}

function emit(user: AxiomUser | null) {
  currentUser = user
  listeners.forEach((cb) => cb(user))
}

/** Restore an existing session (runs once at startup on the client). */
export function initAuth(): AxiomUser | null {
  if (currentUser) return currentUser
  const user = readStoredSession()
  currentUser = user
  return user
}

export function getCurrentUser(): AxiomUser | null {
  if (currentUser) return currentUser
  return readStoredSession()
}

export function onAuthChange(cb: AuthListener): () => void {
  listeners.add(cb)
  cb(getCurrentUser())
  return () => listeners.delete(cb)
}

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string
): Promise<{ user: AxiomUser | null; error: string | null }> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })
    if (error) return { user: null, error: error.message }
    const sessionUser = data.user
    if (sessionUser && data.session) {
      const user: AxiomUser = {
        id: sessionUser.id,
        email: sessionUser.email || email,
        name: (sessionUser.user_metadata?.full_name as string) || name,
      }
      persistAndEmit(user)
      return { user, error: null }
    }
    // Email confirmation required — still usable for the demo.
    return {
      user: null,
      error: null,
    }
  }

  // Local demo fallback
  const user: AxiomUser = { id: `local_${Date.now()}`, email, name: name || email.split('@')[0] }
  persistAndEmit(user)
  return { user, error: null }
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<{ user: AxiomUser | null; error: string | null }> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { user: null, error: error.message }
    const sessionUser = data.user
    const user: AxiomUser = {
      id: sessionUser.id,
      email: sessionUser.email || email,
      name: (sessionUser.user_metadata?.full_name as string) || email.split('@')[0],
    }
    persistAndEmit(user)
    return { user, error: null }
  }

  // Local demo fallback
  const user: AxiomUser = { id: `local_${Date.now()}`, email, name: email.split('@')[0] }
  persistAndEmit(user)
  return { user, error: null }
}

export async function signOut(): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut()
  }
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(SESSION_KEY)
  }
  emit(null)
}

function persistAndEmit(user: AxiomUser) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  }
  emit(user)
}

/**
 * Subscribe to live Supabase auth changes when configured; otherwise the
 * in-memory listeners already cover the local fallback.
 */
export function bindSupabaseAuthEvents(): () => void {
  if (!isSupabaseConfigured || !supabase) return () => {}
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    const sessionUser = session?.user
    if (sessionUser) {
      const user: AxiomUser = {
        id: sessionUser.id,
        email: sessionUser.email || '',
        name: (sessionUser.user_metadata?.full_name as string) || sessionUser.email?.split('@')[0] || '',
      }
      persistAndEmit(user)
    } else {
      emit(null)
    }
  })
  return () => data.subscription.unsubscribe()
}
