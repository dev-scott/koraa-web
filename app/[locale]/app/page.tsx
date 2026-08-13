"use client"

import { useAuth } from '@/lib/auth-context'
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
      <div className="w-8 h-8 border-3 border-[#3C3489] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
