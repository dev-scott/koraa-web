"use client"

import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import { Trophy, CheckCircle2, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react'
import { useEffect } from 'react'

export interface WrongQuestion {
  translation: string
  target: {
    text: string
    phonetic: string
  }
  attempts: number
}

export interface LessonStats {
  correctAnswers: number
  totalQuestions: number
  accuracy: number
  wrongQuestions?: WrongQuestion[]
}

interface LessonCompleteScreenProps {
  lessonStats: LessonStats
  onContinue: () => void
  onReview: () => void
}

export function LessonCompleteScreen({ lessonStats, onContinue, onReview }: LessonCompleteScreenProps) {
  useEffect(() => {
    // Trigger confetti on render
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#3C3489', '#D4537E', '#4CD964', '#FFD700'],
    })
  }, [])

  const getPerformanceMessage = () => {
    if (lessonStats.accuracy >= 90) return "Exceptionnel ! 🌟"
    if (lessonStats.accuracy >= 75) return "Beau travail ! 🎉"
    if (lessonStats.accuracy >= 60) return "Bon effort ! 💪"
    return "Continuez de vous entraîner ! 📚"
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">

        {/* Trophy Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex flex-col items-center text-center"
        >
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center mb-4 shadow-xl text-white"
            style={{ background: 'linear-gradient(135deg, #3C3489, #D4537E)' }}
          >
            <Trophy className="w-14 h-14" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Leçon terminée !</h1>
          <p className="text-lg font-bold mt-1" style={{ color: '#D4537E' }}>
            {getPerformanceMessage()}
          </p>
        </motion.div>

        {/* Accuracy Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-5"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-green-50 text-green-500">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <p className="text-4xl font-extrabold text-gray-900">{lessonStats.accuracy}%</p>
            <p className="text-sm font-semibold text-gray-500 mt-0.5">
              {lessonStats.correctAnswers}/{lessonStats.totalQuestions} réponses correctes
            </p>
          </div>
        </motion.div>

        {/* Questions to review if any */}
        {lessonStats.wrongQuestions && lessonStats.wrongQuestions.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 text-red-500 font-bold text-lg">
              <AlertCircle className="w-5 h-5" />
              <h2>Questions à réviser</h2>
            </div>

            <div className="space-y-2">
              {lessonStats.wrongQuestions.map((q, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-red-100 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{q.translation}</p>
                    <p className="text-xs font-bold text-[#D4537E] mt-0.5">{q.target.phonetic} - {q.target.text}</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-red-50 text-red-500 rounded-lg">
                    {q.attempts} essai{q.attempts > 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 pt-2"
        >
          <button
            onClick={onContinue}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold text-base transition-all shadow-lg hover:brightness-110 active:scale-98"
            style={{ background: 'linear-gradient(135deg, #3C3489, #5046a8)' }}
          >
            <span>Continuer</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {lessonStats.wrongQuestions && lessonStats.wrongQuestions.length > 0 && (
            <button
              onClick={onReview}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm border-2 border-gray-200 text-[#3C3489] hover:bg-gray-100 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>S'entraîner à nouveau</span>
            </button>
          )}
        </motion.div>

      </div>
    </div>
  )
}
