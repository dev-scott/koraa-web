// ─────────────────────────────────────────────────────────────────
// Types du système multi-langue Koraa (adaptés pour le web)
// ─────────────────────────────────────────────────────────────────

import { supabase } from './supabase'

export type QuestionType = "single_response" | "multiple_choice" | "listening_mc"

export interface TargetWord {
  text: string
  phonetic: string
  translation: string
}

export interface TargetPhrase {
  text: string
  phonetic: string
  native_script: string | null
  words?: TargetWord[]
  breakdown?: string
}

export interface QuestionOption {
  id: number
  translation: string
  target?: TargetPhrase
}

export interface Question {
  id: number
  type: QuestionType
  target: TargetPhrase
  options: QuestionOption[]
  correctOptionId?: number
}

export interface Lesson {
  id: string
  title: string
  icon: string
  completionCount: number
  questions: Question[]
  isFree?: boolean
}

export interface Chapter {
  id: number
  title: string
  lessons: Lesson[]
}

export interface ConversationPhrase {
  text: string
  phonetic: string
  translation: string
}

export interface ConversationScene {
  id: string
  title: string
  icon: string
  isFree: boolean
  description: string
  goal: string
  tasks: string[]
  difficulty: "Débutant" | "Intermédiaire" | "Avancé"
  phrases?: ConversationPhrase[]
}

export interface LanguageMeta {
  code: string
  name: string
  flag: string
  available: boolean
  coming_soon: boolean
  description: string
}

export interface LanguageContent {
  meta: LanguageMeta
  chapters: Chapter[]
  conversations?: ConversationScene[]
}

export interface CourseContentData {
  version: string
  meta: {
    description: string
    ui_language: string
    available_languages: string[]
    coming_soon: string[]
  }
  languages: Record<string, LanguageContent>
}

// ─────────────────────────────────────────────────────────────────
// Cache en mémoire — adapté pour le web (localStorage au lieu de AsyncStorage)
// ─────────────────────────────────────────────────────────────────

const STORAGE_KEY_PREFIX = "koraa_course_cache_"

let ACTIVE_CONTENT: Record<string, LanguageContent> = {}

/**
 * Initialise les données depuis le localStorage (cache local web).
 */
export function initializeCourseData(): void {
  if (typeof window === 'undefined') return
  try {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(STORAGE_KEY_PREFIX))
    for (const key of keys) {
      const langCode = key.substring(STORAGE_KEY_PREFIX.length)
      const cached = localStorage.getItem(key)
      if (cached) {
        ACTIVE_CONTENT[langCode] = JSON.parse(cached)
      }
    }
  } catch (error) {
    console.error("[CourseData] Erreur d'initialisation du cache :", error)
  }
}

/**
 * Synchronise les données d'une langue depuis Supabase.
 */
export async function syncCourseDataWithSupabase(languageCode: string): Promise<boolean> {
  try {
    const { data: chaptersData, error: chaptersError } = await supabase
      .from('chapters')
      .select(`
        id,
        title,
        lessons (
          id,
          title,
          icon,
          is_free,
          questions (
            id,
            type,
            order_index,
            target_text,
            target_phonetic,
            target_native_script,
            target_breakdown,
            correct_option_id,
            question_options (
              option_id,
              translation,
              target_text,
              target_phonetic,
              target_native_script,
              target_breakdown,
              word_breakdowns (
                word_order,
                target_text,
                target_phonetic,
                translation
              )
            )
          )
        )
      `)
      .eq('language_code', languageCode)
      .order('order_index', { ascending: true })

    if (chaptersError) throw chaptersError

    const { data: conversationsData } = await supabase
      .from('conversation_scenes')
      .select(`
        id, title, icon, is_free, description, goal, tasks, difficulty,
        conversation_phrases ( phrase_order, target_text, phonetic, translation )
      `)
      .eq('language_code', languageCode)

    if (!chaptersData || chaptersData.length === 0) return false

    const formattedChapters: Chapter[] = chaptersData.map((ch: any) => ({
      id: ch.id,
      title: ch.title,
      lessons: (ch.lessons || []).map((les: any) => ({
        id: les.id,
        title: les.title,
        icon: les.icon || 'book-outline',
        completionCount: 0,
        isFree: les.is_free,
        questions: (les.questions || [])
          .sort((a: any, b: any) => a.order_index - b.order_index)
          .map((q: any) => ({
            id: q.id,
            type: q.type as QuestionType,
            correctOptionId: q.correct_option_id || undefined,
            target: {
              text: q.target_text,
              phonetic: q.target_phonetic || '',
              native_script: q.target_native_script || null,
              breakdown: q.target_breakdown || undefined,
            },
            options: (q.question_options || []).map((opt: any) => {
              const hasTarget = opt.target_text || opt.target_phonetic
              return {
                id: opt.option_id,
                translation: opt.translation,
                target: hasTarget ? {
                  text: opt.target_text,
                  phonetic: opt.target_phonetic || '',
                  native_script: opt.target_native_script || null,
                  breakdown: opt.target_breakdown || undefined,
                  words: (opt.word_breakdowns || [])
                    .sort((a: any, b: any) => a.word_order - b.word_order)
                    .map((w: any) => ({
                      text: w.target_text,
                      phonetic: w.target_phonetic || '',
                      translation: w.translation || '',
                    })),
                } : undefined,
              }
            }),
          })),
      })).sort((a: any, b: any) => a.id.localeCompare(b.id)),
    }))

    const formattedConversations: ConversationScene[] = (conversationsData || []).map((c: any) => ({
      id: c.id,
      title: c.title,
      icon: c.icon || 'basket',
      isFree: c.is_free,
      description: c.description || '',
      goal: c.goal || '',
      tasks: c.tasks || [],
      difficulty: c.difficulty || 'Débutant',
      phrases: (c.conversation_phrases || [])
        .sort((a: any, b: any) => a.phrase_order - b.phrase_order)
        .map((p: any) => ({
          text: p.target_text,
          phonetic: p.phonetic || '',
          translation: p.translation,
        })),
    }))

    const existingMeta = ACTIVE_CONTENT[languageCode]?.meta || {
      code: languageCode,
      name: languageCode === 'en' ? 'Anglais' : languageCode.toUpperCase(),
      flag: '🇨🇲',
      available: true,
      coming_soon: false,
      description: '',
    }

    const newContent: LanguageContent = {
      meta: existingMeta,
      chapters: formattedChapters,
      conversations: formattedConversations,
    }

    ACTIVE_CONTENT[languageCode] = newContent

    if (typeof window !== 'undefined') {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${languageCode}`, JSON.stringify(newContent))
    }

    return true
  } catch (error) {
    console.error(`[CourseData] Erreur de synchronisation pour ${languageCode} :`, error)
    return false
  }
}

// ─────────────────────────────────────────────────────────────────
// Helpers synchrones
// ─────────────────────────────────────────────────────────────────

export function getLanguageCode(displayName: string): string {
  const mapping: Record<string, string> = {
    Anglais: 'en',
    Ghomala: 'ghomala',
    Duala: 'duala',
    Bassa: 'bassa',
    en: 'en',
    ghomala: 'ghomala',
    duala: 'duala',
    bassa: 'bassa',
  }
  return mapping[displayName] || displayName.toLowerCase()
}

export function getLanguageContent(languageCodeOrName: string): LanguageContent | undefined {
  const code = getLanguageCode(languageCodeOrName)
  return ACTIVE_CONTENT[code]
}

export function getChapters(languageCodeOrName: string): Chapter[] {
  return getLanguageContent(languageCodeOrName)?.chapters ?? []
}

export function getConversations(languageCodeOrName: string): ConversationScene[] {
  return getLanguageContent(languageCodeOrName)?.conversations ?? []
}

export function getLesson(languageCodeOrName: string, lessonId: string): Lesson | undefined {
  const chapters = getChapters(languageCodeOrName)
  for (const chapter of chapters) {
    const lesson = chapter.lessons.find(l => l.id === lessonId)
    if (lesson) return lesson
  }
  return undefined
}
