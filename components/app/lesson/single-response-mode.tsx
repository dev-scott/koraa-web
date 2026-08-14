"use client"

import { QuestionOption } from '@/lib/course-data'
import { motion } from 'framer-motion'
import { Mic } from 'lucide-react'

interface SingleResponseModeProps {
  option: QuestionOption
}

export function SingleResponseMode({ option }: SingleResponseModeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-2xl border-2 bg-white"
      style={{ borderColor: '#3C3489', boxShadow: '0 0 0 3px rgba(60,52,137,0.10)' }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#D4537E' }}>
            Réponse attendue
          </p>
          <p className="text-base font-semibold text-gray-800">{option.translation}</p>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'rgba(60,52,137,0.10)' }}
        >
          <Mic className="w-5 h-5" style={{ color: '#3C3489' }} />
        </div>
      </div>
    </motion.div>
  )
}
