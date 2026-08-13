"use client"

import { QuestionOption } from '@/lib/course-data'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, ArrowRight, RefreshCw, Lightbulb } from 'lucide-react'

interface FeedbackViewProps {
  correctOption: QuestionOption
  isCorrect: boolean | null
  onContinue: () => void
  onRetry?: () => void
  attemptCount: number
  maxAttempts: number
  transcription?: { expected: string; said: string }
}

export function FeedbackView({
  correctOption,
  isCorrect,
  onContinue,
  onRetry,
  attemptCount,
  maxAttempts,
  transcription,
}: FeedbackViewProps) {
  const showRetry = !!onRetry && !isCorrect && attemptCount < maxAttempts
  const showCorrectAnswer = !isCorrect && attemptCount >= maxAttempts

  const targetPhonetic = correctOption.target?.phonetic ?? ''
  const targetText = correctOption.target?.text ?? ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="rounded-3xl border-2 p-6 shadow-lg"
      style={{
        backgroundColor: isCorrect ? '#e8f5e9' : '#ffebee',
        borderColor: isCorrect ? '#34C759' : '#ef4444',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        {isCorrect ? (
          <CheckCircle2 className="w-10 h-10 flex-shrink-0 text-[#34C759]" />
        ) : (
          <XCircle className="w-10 h-10 flex-shrink-0 text-[#ef4444]" />
        )}
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {isCorrect ? 'Bravo !' : showRetry ? 'Pas tout à fait' : 'Continuez de vous entraîner'}
          </h3>
          {!isCorrect && showRetry && (
            <p className="text-sm mt-0.5" style={{ color: '#D4537E' }}>Réessayez, vous y êtes presque !</p>
          )}
          {showCorrectAnswer && (
            <p className="text-sm mt-0.5" style={{ color: '#D4537E' }}>Voici ce qu'il fallait dire :</p>
          )}
        </div>
      </div>

      {/* Transcription */}
      {transcription && (
        <div className="p-3 rounded-xl bg-black/5 mb-4 space-y-1.5">
          <div className="flex gap-3">
            <span className="text-sm font-bold w-28 flex-shrink-0" style={{ color: '#D4537E' }}>Attendu :</span>
            <span className="text-sm text-gray-700">{transcription.expected}</span>
          </div>
          <div className="flex gap-3">
            <span className="text-sm font-bold w-28 flex-shrink-0" style={{ color: '#D4537E' }}>Vous avez dit :</span>
            <span className="text-sm font-medium" style={{ color: isCorrect ? '#34C759' : '#ef4444' }}>
              {transcription.said
                ? transcription.said.charAt(0).toUpperCase() + transcription.said.slice(1)
                : '—'}
            </span>
          </div>
        </div>
      )}

      {/* Correct answer reveal */}
      {showCorrectAnswer && (
        <div className="p-4 rounded-2xl border mb-5" style={{ backgroundColor: 'rgba(255,73,0,0.08)', borderColor: 'rgba(255,73,0,0.25)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5" style={{ color: '#3C3489' }} />
            <span className="text-xs font-extrabold uppercase tracking-wide" style={{ color: '#3C3489' }}>
              Réponse correcte
            </span>
          </div>
          <p className="font-semibold text-gray-800 mb-2">{correctOption.translation}</p>
          {targetPhonetic && <p className="text-lg font-bold text-gray-700">{targetPhonetic}</p>}
          {targetText && <p className="text-base" style={{ color: '#D4537E' }}>{targetText}</p>}
        </div>
      )}

      {/* Attempt dots */}
      {!isCorrect && attemptCount > 0 && attemptCount < maxAttempts && (
        <div className="flex items-center justify-center gap-2 mb-4">
          {Array.from({ length: maxAttempts }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: i < attemptCount ? '#ef4444' : 'rgba(107,114,128,0.3)' }}
            />
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col gap-3">
        {showRetry ? (
          <>
            <button
              onClick={onRetry}
              className="flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #3C3489, #5046a8)', boxShadow: '0 4px 12px rgba(60,52,137,0.3)' }}
            >
              <RefreshCw className="w-5 h-5" />
              Réessayer ({maxAttempts - attemptCount} restant{maxAttempts - attemptCount > 1 ? 's' : ''})
            </button>
            <button
              onClick={onContinue}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold border-2 transition-colors"
              style={{ color: '#D4537E', borderColor: '#D4537E' }}
            >
              Passer
            </button>
          </>
        ) : (
          <button
            onClick={onContinue}
            className="flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold transition-all"
            style={{ background: 'linear-gradient(135deg, #3C3489, #5046a8)', boxShadow: '0 4px 12px rgba(60,52,137,0.3)' }}
          >
            {isCorrect ? 'Continuer' : 'Question suivante'}
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  )
}
