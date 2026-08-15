"use client"

import { Sparkles } from 'lucide-react'
import Image from 'next/image'

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl rounded-xl animate-bounce"
          style={{ background: 'linear-gradient(135deg, #3C3489, #D4537E)' }}
        >
          <Image src="/brand/logo.png" alt="koraa logo" width="100" height="100"/>
        </div>
        <div className="w-8 h-8 border-3 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )
}
