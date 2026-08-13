"use client"

import { TargetWord } from '@/lib/course-data'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, HelpCircle, Volume2 } from 'lucide-react'
import { useState } from 'react'

interface SentenceBreakdownPanelProps {
  sentence: {
    translation: string
    phonetic: string
    text: string
    words?: TargetWord[]
    breakdown?: string
  }
  disabled?: boolean
}

export function SentenceBreakdownPanel({ sentence, disabled }: SentenceBreakdownPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedWord, setSelectedWord] = useState<TargetWord | null>(null)

  const words = sentence.words || []

  const playSentenceAudio = () => {
    if (!('speechSynthesis' in window)) return
    const textToSpeak = sentence.text || sentence.phonetic
    if (!textToSpeak) return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(textToSpeak)
    utter.lang = 'en-US'
    utter.rate = 0.85
    window.speechSynthesis.speak(utter)
  }

  return (
    <div className={`fixed bottom-16 md:bottom-0 left-0 right-0 md:left-64 z-30 transition-opacity ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Header bar / Drag handle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between shadow-lg cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2 text-gray-500">
          <HelpCircle className="w-5 h-5 text-[#D4537E]" />
          <span className="text-sm font-semibold text-gray-700">Décomposition de la phrase</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronUp className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      {/* Expandable panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-white border-t border-gray-100 overflow-hidden shadow-2xl"
          >
            <div className="max-w-2xl mx-auto p-6 space-y-5 max-h-[60vh] overflow-y-auto">
              {/* Word interaction hint */}
              {words.length > 0 && (
                <p className="text-xs font-semibold italic text-[#D4537E]">
                  Cliquez sur un mot pour voir sa traduction.
                </p>
              )}

              {/* Phonetic & Words */}
              {sentence.phonetic && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase text-[#D4537E]">Phonétique :</span>
                    <button
                      onClick={playSentenceAudio}
                      className="p-1 rounded-full bg-purple-50 text-[#3C3489] hover:bg-purple-100 transition-colors"
                      title="Écouter"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-lg font-bold text-gray-900">
                    {words.length > 0 ? (
                      words.map((word, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedWord(selectedWord === word ? null : word)}
                          className={`px-1.5 py-0.5 rounded transition-colors ${
                            selectedWord === word
                              ? 'bg-[#3C3489] text-white underline'
                              : 'hover:bg-gray-100 text-gray-900'
                          }`}
                        >
                          {word.phonetic || word.text}
                        </button>
                      ))
                    ) : (
                      <span>{sentence.phonetic}</span>
                    )}
                  </div>
                </div>
              )}

              {/* Selected word tooltip info */}
              <AnimatePresence>
                {selectedWord && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="p-3 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-[#3C3489]">{selectedWord.text || selectedWord.phonetic}</span>
                      <p className="text-sm font-semibold text-gray-800">{selectedWord.translation}</p>
                    </div>
                    <button
                      onClick={() => setSelectedWord(null)}
                      className="text-xs font-bold text-gray-400 hover:text-gray-600"
                    >
                      Fermer
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Original Text */}
              {sentence.text && (
                <div>
                  <span className="text-xs font-bold uppercase text-[#D4537E]">Texte original :</span>
                  <p className="text-base text-gray-800 font-medium mt-0.5">{sentence.text}</p>
                </div>
              )}

              {/* Translation */}
              {sentence.translation && (
                <div>
                  <span className="text-xs font-bold uppercase text-[#D4537E]">Traduction :</span>
                  <p className="text-base text-gray-900 font-semibold mt-0.5">{sentence.translation}</p>
                </div>
              )}

              {/* Explanation / Breakdown */}
              {sentence.breakdown && (
                <div>
                  <span className="text-xs font-bold uppercase text-[#D4537E]">Explication :</span>
                  <p className="text-sm text-gray-700 leading-relaxed mt-0.5">{sentence.breakdown}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
