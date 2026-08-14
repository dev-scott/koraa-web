"use client"

import { AuthProvider, useAuth } from '@/lib/auth-context'
import { AppNavbar } from '@/components/app/app-navbar'
import { IntroScreen } from '@/components/auth/intro-screen'
import { LoadingScreen } from '@/components/loading/loading-screen'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, use } from 'react'

function AppContent({ children, locale }: { children: React.ReactNode; locale: string }) {
  const { session, loading, profile } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!loading && session) {
      if (!profile || !profile.onboarding_completed) {
        const inOnboarding = pathname.includes('/app/onboarding')
        if (!inOnboarding) {
          router.replace(`/${locale}/app/onboarding`)
        }
      }
    }
  }, [session, loading, profile, pathname, locale, router])

  if (loading) {
    return <LoadingScreen />
  }

  if (!session) {
    return <IntroScreen />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavbar locale={locale} />
      <main className="md:ml-64 pb-20 md:pb-0 min-h-screen">
        {children}
      </main>
    </div>
  )
}

export default function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = use(params)

  return (
    <AuthProvider>
      <AppContent locale={resolvedParams.locale}>{children}</AppContent>
    </AuthProvider>
  )
}
