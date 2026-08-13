"use client"

import { LessonContent } from '@/components/app/lesson/lesson-content'
import { getChapters, getLesson, syncCourseDataWithSupabase, Lesson, getLanguageCode } from '@/lib/course-data'
import { useAuth } from '@/lib/auth-context'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PractisePage() {
  const params = useParams()
  const lessonId = params.lessonId as string
  const locale = params.locale as string
  const router = useRouter()

  const { profile } = useAuth()
  const targetLang = getLanguageCode(profile?.target_language || 'en')

  const [lesson, setLesson] = useState<Lesson | undefined>(undefined)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!lessonId) return

    const l = getLesson(targetLang, lessonId)
    setLesson(l)
    setLoaded(true)

    // Background sync from Supabase
    syncCourseDataWithSupabase(targetLang).then(success => {
      if (success) {
        setLesson(getLesson(targetLang, lessonId))
      }
    })
  }, [lessonId, targetLang])

  if (!loaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#3C3489] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!lesson || !lesson.questions || lesson.questions.length === 0) {
    router.replace(`/${locale}/app/learn`)
    return null
  }

  return <LessonContent questions={lesson.questions} lessonId={lessonId} />
}
