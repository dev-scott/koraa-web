"use client"

import { useAuth } from '@/lib/auth-context'
import { getChapters, syncCourseDataWithSupabase, Chapter, Lesson, getLanguageCode } from '@/lib/course-data'
import { getAllProgress } from '@/lib/lesson-progress'
import { motion } from 'framer-motion'
import {
  Mic, Headphones, Star, ChevronRight, CheckCircle2,
  TrendingUp, Sparkles, BookOpen
} from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'

const MAX_STARS = 3

function StarRating({ count }: { count: number }) {
  const stars = Math.min(count, MAX_STARS)
  const extra = count > MAX_STARS ? count - MAX_STARS : 0
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: MAX_STARS }).map((_, i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5"
          fill={i < stars ? '#FFD700' : 'none'}
          stroke={i < stars ? '#FFD700' : '#D1D5DB'}
          strokeWidth={1.5}
        />
      ))}
      {extra > 0 && (
        <span className="text-xs font-bold ml-1" style={{ color: '#D4537E' }}>+{extra}</span>
      )}
    </div>
  )
}

export default function LearnPage() {
  const { profile } = useAuth()
  const params = useParams()
  const locale = params.locale as string
  console.log("local value", locale)
  const router = useRouter()

  const [chapters, setChapters] = useState<Chapter[]>([])
  const [progress, setProgress] = useState<Record<string, number>>({})

  const targetLang = getLanguageCode(profile?.target_language || 'en')

  const loadData = useCallback(() => {
    const loaded = getChapters(targetLang)
    setChapters(loaded)
    setProgress(getAllProgress())
  }, [targetLang])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    if (targetLang) {
      syncCourseDataWithSupabase(targetLang).then(success => {
        if (success) loadData()
      })
    }
  }, [targetLang, loadData])

  const handleLessonPress = (lesson: Lesson) => {
    router.push(`/${locale}/app/learn/${lesson.id}`)
  }

  // Zigzag positions for the lesson path
  const zigzag = ['-translate-x-8', 'translate-x-0', 'translate-x-8']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-end sticky top-0 z-10">
        {/* <div className="flex items-center gap-3">
          <div
            className="w-10 h-10  rounded-2xl flex items-center justify-center text-white shadow-xl "
            style={{ background: 'linear-gradient(135deg, #3C3489, #D4537E)' }}
          >
            <Image src="/brand/logo.png" alt="koraa logo" width="100" height="100" className='rounded-lg' />
          </div>
          <h1 className="text-xl font-extrabold" style={{ color: '#3C3489' }}>Koraa</h1>
        </div> */}
        {profile?.target_language && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(60,52,137,0.08)' }}>
            <span className="text-base">🇬🇧</span>
            <span className="text-sm font-bold" style={{ color: '#3C3489' }}>{profile.target_language}</span>
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">

        {/* Weekly Stats Dashboard Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl p-5 text-white"
          style={{ background: 'linear-gradient(135deg, #3C3489 0%, #5046a8 100%)', boxShadow: '0 8px 32px rgba(60,52,137,0.25)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Activité Hebdomadaire
            </span>
            <TrendingUp className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.7)' }} />
          </div>
          <div className="h-px mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}>
                <Mic className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-extrabold">0 <span className="text-sm font-normal opacity-80">min</span></p>
                <p className="text-xs opacity-70">Parler</p>
              </div>
            </div>
            <div className="w-px h-10" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}>
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-extrabold">0 <span className="text-sm font-normal opacity-80">min</span></p>
                <p className="text-xs opacity-70">Écouter</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Empty state */}
        {chapters.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(60,52,137,0.08)' }}>
              <BookOpen className="w-10 h-10" style={{ color: '#3C3489' }} />
            </div>
            <p className="text-lg font-bold text-gray-700">Chargement des leçons…</p>
            <p className="text-sm text-gray-400 mt-1">Synchronisation depuis le serveur en cours</p>
          </motion.div>
        )}

        {/* Chapters */}
        {chapters.map((chapter, chapterIndex) => {
          const totalLessons = chapter.lessons.length
          const completedLessons = chapter.lessons.filter(l => (progress[l.id] || 0) > 0).length
          const progressPercent = totalLessons > 0 ? completedLessons / totalLessons : 0

          return (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + chapterIndex * 0.1 }}
            >
              {/* Chapter Banner */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-lg text-white"
                    style={{ backgroundColor: '#D4537E' }}
                  >
                    CHAPITRE {chapter.id}
                  </span>
                  <span className="text-xs font-bold" style={{ color: '#3C3489' }}>
                    {Math.round(progressPercent * 100)}% Complété
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-gray-900 mb-3">{chapter.title}</h2>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: '#D4537E' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + chapterIndex * 0.1 }}
                  />
                </div>
                <p className="text-xs text-gray-400 font-medium">
                  {completedLessons} sur {totalLessons} leçons commencées
                </p>
              </div>

              {/* Lessons Path */}
              <div className="relative flex flex-col items-center gap-0">
                {/* Vertical Path Line */}
                <div
                  className="absolute top-6 bottom-6 w-1.5 rounded-full"
                  style={{ backgroundColor: 'rgba(60,52,137,0.08)', left: '50%', transform: 'translateX(-50%)' }}
                />

                {chapter.lessons.map((lesson, lessonIndex) => {
                  const completionCount = progress[lesson.id] || 0
                  const isMastered = completionCount >= MAX_STARS
                  const isStarted = completionCount > 0
                  const offsetClass = zigzag[lessonIndex % 3]

                  return (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + chapterIndex * 0.1 + lessonIndex * 0.06 }}
                      className={`relative z-10 mb-4 w-full flex justify-center`}
                    >
                      <div className={`w-[82%] ${offsetClass}`}>
                        <button
                          onClick={() => handleLessonPress(lesson)}
                          className="w-full flex items-center gap-3 p-3 pr-4 rounded-2xl border-2 bg-white transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                          style={{
                            borderColor: isMastered ? '#D4537E' : isStarted ? '#3C3489' : '#E2E8F0',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          }}
                        >
                          {/* Icon Badge */}
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: isMastered ? '#D4537E' : isStarted ? '#3C3489' : '#F1F5F9',
                            }}
                          >
                            <BookOpen
                              className="w-5 h-5"
                              style={{ color: isMastered || isStarted ? '#fff' : '#94A3B8' }}
                            />
                          </div>

                          {/* Text */}
                          <div className="flex-1 text-left min-w-0">
                            <p
                              className="text-sm font-bold leading-tight truncate"
                              style={{ color: isMastered || isStarted ? '#1E1A47' : '#64748B' }}
                            >
                              {lesson.title}
                            </p>
                            <div className="mt-1">
                              <StarRating count={completionCount} />
                            </div>
                          </div>

                          {/* Arrow / Check */}
                          {isMastered ? (
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#4CD964' }} />
                          ) : (
                            <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: isStarted ? '#3C3489' : '#C7C7CC' }} />
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
