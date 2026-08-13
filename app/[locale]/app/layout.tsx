import { AuthProvider } from '@/lib/auth-context'
import { AppNavbar } from '@/components/app/app-navbar'

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <AppNavbar locale={locale} />

        {/* Main content — offset by sidebar on desktop */}
        <main className="md:ml-64 pb-20 md:pb-0 min-h-screen">
          {children}
        </main>
      </div>
    </AuthProvider>
  )
}
