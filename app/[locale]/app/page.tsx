"use client"

import { useAuth } from '@/lib/auth-context'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AppEntryPage() {
  const { profile, loading } = useAuth()
  const params = useParams()
  const locale = params.locale as string
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (!profile?.onboarding_completed) {
      router.replace(`/${locale}/app/onboarding`)
    } else {
      router.replace(`/${locale}/app/learn`)
    }
  }, [profile, loading, locale, router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl rounded-xl animate-bounce"
        style={{ background: 'linear-gradient(135deg, #3C3489, #D4537E)' }}
      >
        <Image src="/brand/logo.png" alt="koraa logo" width="100" height="100" />
      </div>    
      
      </div>
  )
}
