// Gestion de la progression des leçons (localStorage)
// Miroir de lib/lessonProgress.ts de l'app mobile

const PROGRESS_KEY = "koraa_lesson_progress"
const MAX_STARS = 3

function loadAllProgress(): Record<string, number> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveAllProgress(progress: Record<string, number>): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
  } catch {
    // ignore
  }
}

export function getAllProgress(): Record<string, number> {
  return loadAllProgress()
}

export function getLessonProgress(lessonId: string): number {
  const all = loadAllProgress()
  return all[lessonId] || 0
}

export function incrementLessonProgress(lessonId: string): number {
  const all = loadAllProgress()
  const current = all[lessonId] || 0
  all[lessonId] = current + 1
  saveAllProgress(all)
  return all[lessonId]
}

export function isLessonMastered(lessonId: string): boolean {
  return getLessonProgress(lessonId) >= MAX_STARS
}

export function isLessonStarted(lessonId: string): boolean {
  return getLessonProgress(lessonId) > 0
}
