"use client"

import { motion } from 'framer-motion'
import { MessageSquare, Sparkles, Clock } from 'lucide-react'

export default function ConversationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center space-y-5 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
      >
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto text-white shadow-lg"
          style={{ background: 'linear-gradient(135deg, #3C3489, #D4537E)' }}
        >
          <MessageSquare className="w-10 h-10" />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Conversations</h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Mettez en pratique vos connaissances dans des scénarios de dialogue réels guidés par l'IA.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-[#3C3489] text-xs font-bold">
          <Clock className="w-4 h-4" />
          <span>Bientôt disponible</span>
        </div>
      </motion.div>
    </div>
  )
}
