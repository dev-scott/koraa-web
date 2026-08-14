"use client"

import { Question } from '@/lib/course-data'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Square, Mic, Pause, Eye, EyeOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface AudioPromptProps {
  currentQuestion: Question
  isRecognizing: boolean
  hasListenedToAudio: boolean
  showTarget: boolean
  selectedOption: number | null
  onFinishListening: () => void
  onStartRecord: () => void
  onStopRecord: () => void
  onToggleTarget: () => void
}

export function AudioPrompt({
  currentQuestion,
  isRecognizing,
  hasListenedToAudio,
  showTarget,
  selectedOption,
  onFinishListening,
  onStartRecord,
  onStopRecord,
  onToggleTarget,
}: AudioPromptProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Cancel speech when component unmounts or question changes
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [currentQuestion])

  const playAudio = () => {
    if (!('speechSynthesis' in window)) return

    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      return
    }

    const text = currentQuestion.target.text
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'en-US'
    utter.rate = 0.85
    utter.onend = () => {
      setIsPlaying(false)
      onFinishListening()
    }
    utter.onerror = () => setIsPlaying(false)
    utteranceRef.current = utter
    setIsPlaying(true)
    window.speechSynthesis.speak(utter)
  }

  // Button state logic
  const isListeningMode = !selectedOption
  const buttonAction = isListeningMode
    ? playAudio
    : (isRecognizing ? onStopRecord : onStartRecord)

  const buttonColor = isRecognizing
    ? '#ef4444'
    : (hasListenedToAudio && !selectedOption)
      ? '#D4537E'
      : '#3C3489'

  const ButtonIcon = selectedOption
    ? (isRecognizing ? Square : Mic)
    : (isPlaying ? Pause : Play)

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main action button */}
      <motion.button
        onClick={buttonAction}
        whileTap={{ scale: 0.92 }}
        className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-colors duration-200"
        style={{
          backgroundColor: buttonColor,
          boxShadow: `0 8px 24px ${buttonColor}44`,
        }}
      >
        <ButtonIcon className="w-9 h-9" />
      </motion.button>

      {/* Audio waveform / recording indicator */}
      {isRecognizing ? (
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm font-semibold text-red-500">Enregistrement...</span>
        </div>
      ) : isPlaying ? (
        <div className="flex items-end gap-1 h-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 rounded-full"
              style={{ backgroundColor: '#3C3489' }}
              animate={{ height: ['8px', '28px', '8px'] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
            />
          ))}
        </div>
      ) : (
        <div className="h-8" />
      )}

      {/* Instruction text */}
      <AnimatePresence mode="wait">
        {selectedOption ? (
          <motion.p
            key="record"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="text-sm font-medium text-center"
            style={{ color: '#3C3489' }}
          >
            {isRecognizing ? 'Parlez maintenant…' : 'Appuyez sur le micro pour vous enregistrer'}
          </motion.p>
        ) : !hasListenedToAudio ? (
          <motion.p
            key="listen"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="text-sm text-gray-400 text-center"
          >
            {isPlaying ? 'Écoutez attentivement…' : 'Appuyez pour écouter'}
          </motion.p>
        ) : showTarget ? (
          <motion.button
            key="target"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            onClick={onToggleTarget}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-lg font-bold text-gray-700">{currentQuestion.target.phonetic}</span>
            <span className="text-base font-semibold" style={{ color: '#D4537E' }}>{currentQuestion.target.text}</span>
          </motion.button>
        ) : (
          <motion.button
            key="reveal"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            onClick={onToggleTarget}
            className="flex items-center gap-1.5 text-sm font-medium"
            style={{ color: '#D4537E' }}
          >
            <Eye className="w-4 h-4" />
            Révéler ce qui a été dit
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
