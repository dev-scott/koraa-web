"use client"

import { QuestionOption } from '@/lib/course-data'
import { motion } from 'framer-motion'
import { Mic } from 'lucide-react'

interface MultipleChoiceModeProps {
  options: QuestionOption[]
  selectedOption: number | null
  onOptionPress: (id: number) => void
  disabled: boolean
}

export function MultipleChoiceMode({ options, selectedOption, onOptionPress, disabled }: MultipleChoiceModeProps) {
  return (
    <div className="space-y-3">
      <p className="text-center text-sm font-semibold text-gray-500 mb-4">
        {selectedOption ? 'Maintenant, prononcez-le :' : 'Choisissez votre réponse :'}
      </p>

      {options.map((option, i) => {
        const isSelected = selectedOption === option.id
        return (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: selectedOption ? (isSelected ? 1 : 0.4) : 1,
              scale: selectedOption && !isSelected ? 0.97 : 1,
              y: 0
            }}
            transition={{ delay: i * 0.05 }}
            onClick={() => !disabled && onOptionPress(option.id)}
            disabled={disabled}
            className="w-full flex items-center justify-between p-5 rounded-2xl border-2 bg-white transition-all duration-200 text-left"
            style={{
              borderColor: isSelected ? '#3C3489' : '#e5e7eb',
              boxShadow: isSelected ? '0 0 0 3px rgba(60,52,137,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          >
            <span className="text-base font-semibold text-gray-800">{option.translation}</span>
            {isSelected && (
              <Mic className="w-5 h-5 flex-shrink-0 ml-3" style={{ color: '#3C3489' }} />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
