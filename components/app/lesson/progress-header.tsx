"use client"

import { X } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProgressHeaderProps {
  progress: number
  currentCount: number
  totalCount: number
  onClose: () => void
}

export function ProgressHeader({ progress, currentCount, totalCount, onClose }: ProgressHeaderProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 bg-white border-b border-gray-100">
      <button
        onClick={onClose}
        className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors flex-shrink-0"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #3C3489, #D4537E)' }}
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </div>

      <span className="text-sm font-bold text-gray-500 flex-shrink-0 w-12 text-right">
        {currentCount}/{totalCount}
      </span>
    </div>
  )
}
