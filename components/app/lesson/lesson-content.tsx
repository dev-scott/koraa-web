"use client"

import { Question, QuestionOption } from '@/lib/course-data'
import { incrementLessonProgress } from '@/lib/lesson-progress'
import { supabase } from '@/lib/supabase'
import { AnimatePresence, motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import stringSimilarity from 'string-similarity'
import { toast } from 'sonner'

import { AudioPrompt } from './audio-prompt'
import { FeedbackView } from './feedback-view'
import { LessonCompleteScreen, LessonStats, WrongQuestion } from './lesson-complete-screen'
import { ListeningMcMode } from './listening-mc-mode'
import { MultipleChoiceMode } from './multiple-choice-mode'
import { ProgressHeader } from './progress-header'
import { SentenceBreakdownPanel } from './sentence-breakdown-panel'
import { SingleResponseMode } from './single-response-mode'

const MAX_ATTEMPTS = 3

interface LessonContentProps {
  questions: Question[]
  lessonId: string
}

export function LessonContent({ questions, lessonId }: LessonContentProps) {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [hasListenedToAudio, setHasListenedToAudio] = useState(false)
  const [showTarget, setShowTarget] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [attemptCount, setAttemptCount] = useState(0)
  const [isRecognizing, setIsRecognizing] = useState(false)
  const [transcription, setTranscription] = useState<{ expected: string; said: string } | null>(null)

  // Lesson completion states
  const [showCompleteScreen, setShowCompleteScreen] = useState(false)
  const [lessonStats, setLessonStats] = useState<LessonStats | null>(null)
  const [questionAttempts, setQuestionAttempts] = useState<Record<number, number>>({})
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [wrongQuestions, setWrongQuestions] = useState<Set<number>>(new Set())

  // MediaRecorder refs for Web Audio recording
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex])

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const selectedOptionData = useMemo((): QuestionOption | null => {
    if (currentQuestion.type === 'listening_mc') {
      if (showResult) {
        return currentQuestion.options.find(opt => opt.id === currentQuestion.correctOptionId) ?? null
      }
      return null
    }
    if (!selectedOption) return null
    return currentQuestion.options.find(opt => opt.id === selectedOption) ?? null
  }, [selectedOption, currentQuestion, showResult])

  // Track answer results
  useEffect(() => {
    if (showResult) {
      if (isCorrect) {
        if (attemptCount === 0 || (attemptCount > 0 && wrongQuestions.has(currentQuestion.id))) {
          setCorrectAnswersCount(prev => prev + 1)
        }
      } else {
        setQuestionAttempts(prev => ({
          ...prev,
          [currentQuestion.id]: (prev[currentQuestion.id] || 0) + 1,
        }))
        if (attemptCount === 0) {
          setWrongQuestions(prev => new Set(prev).add(currentQuestion.id))
        }
      }
    }
  }, [showResult, isCorrect, attemptCount, currentQuestion.id, wrongQuestions])

  // Auto-select expected option for single response mode once listened
  useEffect(() => {
    if (currentQuestion.type === 'single_response' && currentQuestion.options.length > 0 && hasListenedToAudio) {
      setSelectedOption(currentQuestion.options[0].id)
    }
  }, [currentQuestion, hasListenedToAudio])

  // MediaRecorder functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.start()
      setIsRecognizing(true)
    } catch (err) {
      console.error('Microphone permission denied:', err)
      toast.error('Accès au microphone requis pour cet exercice.')
    }
  }

  const stopRecording = async () => {
    const mediaRecorder = mediaRecorderRef.current
    if (!mediaRecorder) return

    setIsLoading(true)
    setIsRecognizing(false)

    mediaRecorder.onstop = async () => {
      // Stop all audio tracks
      mediaRecorder.stream.getTracks().forEach(track => track.stop())

      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
      const reader = new FileReader()

      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1]

        try {
          const { data, error } = await supabase.functions.invoke('transcribe-audio', {
            body: {
              inputAudio: {
                data: base64Audio,
                format: 'wav',
              },
            },
          })

          if (error) throw error

          if (data?.transcript) {
            processSpeechResult(data.transcript)
          } else {
            throw new Error('Aucune transcription retournée')
          }
        } catch (err: any) {
          console.error('Transcription error:', err)
          setIsLoading(false)
          toast.error('Erreur de transcription audio', {
            description: err?.message || 'Impossible de transcrire votre voix.',
          })
        }
      }

      reader.readAsDataURL(audioBlob)
    }

    mediaRecorder.stop()
  }

  const processSpeechResult = (transcript: string) => {
    setIsLoading(false)
    setShowResult(true)

    const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()?]/g
    const rawExpected = currentQuestion.target.text || ''
    const expected = rawExpected.toLowerCase().replace(punctuationRegex, '').replace(/\s+/g, '').trim()
    const said = transcript.toLowerCase().replace(punctuationRegex, '').replace(/\s+/g, '').trim()

    setTranscription({ expected: rawExpected, said: transcript })

    if (!said || !expected) {
      setIsCorrect(false)
    } else {
      const similarity = stringSimilarity.compareTwoStrings(expected, said)
      const isSimilarEnough = similarity >= 0.75
      setIsCorrect(isSimilarEnough)
    }
  }

  const handleOptionPress = (id: number) => {
    if (currentQuestion.type === 'listening_mc') {
      setSelectedOption(id)
      setIsCorrect(id === currentQuestion.correctOptionId)
      setShowResult(true)
      return
    }

    setSelectedOption(prev => (prev === id ? null : id))
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      resetState()
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      const accuracy = Math.round((correctAnswersCount / questions.length) * 100)
      const wrongQuestionsList: WrongQuestion[] = questions
        .filter(q => wrongQuestions.has(q.id))
        .map(q => {
          let translation = ''
          if (q.type === 'listening_mc') {
            translation = q.options.find(opt => opt.id === q.correctOptionId)?.translation || ''
          } else {
            translation = q.options[0]?.translation || ''
          }
          return {
            translation,
            target: { text: q.target.text, phonetic: q.target.phonetic },
            attempts: questionAttempts[q.id] || 1,
          }
        })

      // Increment progress in local storage
      incrementLessonProgress(lessonId)

      setLessonStats({
        correctAnswers: correctAnswersCount,
        totalQuestions: questions.length,
        accuracy,
        wrongQuestions: wrongQuestionsList.length > 0 ? wrongQuestionsList : undefined,
      })
      setShowCompleteScreen(true)
    }
  }

  const handleRetry = () => {
    setShowResult(false)
    setIsCorrect(null)
    setAttemptCount(prev => prev + 1)

    if (currentQuestion.type === 'listening_mc') {
      setSelectedOption(null)
    } else {
      setIsLoading(false)
      setHasListenedToAudio(true)
      if (currentQuestion.type === 'multiple_choice') {
        setSelectedOption(null)
      }
    }
  }

  const resetState = () => {
    setSelectedOption(null)
    setShowResult(false)
    setHasListenedToAudio(false)
    setShowTarget(false)
    setAttemptCount(0)
    setIsLoading(false)
    setTranscription(null)
  }

  if (showCompleteScreen && lessonStats) {
    return (
      <LessonCompleteScreen
        lessonStats={lessonStats}
        onContinue={() => router.push(`/${locale}/app/learn`)}
        onReview={() => {
          setShowCompleteScreen(false)
          setLessonStats(null)
          setCurrentQuestionIndex(0)
          setQuestionAttempts({})
          setCorrectAnswersCount(0)
          setWrongQuestions(new Set())
          resetState()
        }}
      />
    )
  }

  const breakdownSentence = {
    translation:
      selectedOptionData?.translation ||
      (currentQuestion.type === 'listening_mc'
        ? currentQuestion.options.find(o => o.id === currentQuestion.correctOptionId)?.translation || ''
        : currentQuestion.options[0]?.translation || ''),
    text: currentQuestion.target.text,
    phonetic: currentQuestion.target.phonetic,
    words: currentQuestion.target.words,
    breakdown: currentQuestion.target.breakdown,
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between pb-28">
      {/* Header */}
      <ProgressHeader
        progress={progress}
        currentCount={currentQuestionIndex + 1}
        totalCount={questions.length}
        onClose={() => router.push(`/${locale}/app/learn`)}
      />

      {/* Main Content Area */}
      <div className="max-w-md mx-auto w-full px-4 py-6 flex-1 flex flex-col justify-center space-y-6">
        {/* Audio prompt section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
          <AudioPrompt
            currentQuestion={currentQuestion}
            isRecognizing={isRecognizing}
            hasListenedToAudio={hasListenedToAudio}
            showTarget={showTarget}
            selectedOption={selectedOption}
            onFinishListening={() => setHasListenedToAudio(true)}
            onStartRecord={startRecording}
            onStopRecord={stopRecording}
            onToggleTarget={() => setShowTarget(!showTarget)}
          />
        </div>

        {/* Options section */}
        {hasListenedToAudio && !showResult && !isLoading && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            {currentQuestion.type === 'multiple_choice' && (
              <MultipleChoiceMode
                options={currentQuestion.options}
                selectedOption={selectedOption}
                onOptionPress={handleOptionPress}
                disabled={isLoading}
              />
            )}
            {currentQuestion.type === 'listening_mc' && (
              <ListeningMcMode
                options={currentQuestion.options}
                selectedOption={selectedOption}
                onOptionPress={handleOptionPress}
                disabled={isLoading}
              />
            )}
            {currentQuestion.type === 'single_response' && (
              <SingleResponseMode option={currentQuestion.options[0]} />
            )}
          </motion.div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="py-8 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-[#3C3489] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold text-[#D4537E]">Analyse de votre prononciation...</p>
          </div>
        )}

        {/* Result Feedback */}
        {showResult && selectedOptionData && (
          <FeedbackView
            correctOption={selectedOptionData}
            isCorrect={isCorrect}
            onContinue={nextQuestion}
            onRetry={attemptCount < MAX_ATTEMPTS && !isCorrect ? handleRetry : undefined}
            attemptCount={isCorrect ? attemptCount : attemptCount + 1}
            maxAttempts={MAX_ATTEMPTS}
            transcription={transcription || undefined}
          />
        )}
      </div>

      {/* Sentence Breakdown Panel */}
      {!isLoading && hasListenedToAudio && (
        <SentenceBreakdownPanel sentence={breakdownSentence} disabled={showResult} />
      )}
    </div>
  )
}
