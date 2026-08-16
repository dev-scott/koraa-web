"use client"

import { useAuth } from '@/lib/auth-context'
import { BookOpen, MessageSquare, User, LogOut, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { styleEffect } from 'framer-motion'

const navItems = [
  { href: 'learn', icon: BookOpen, label: 'Leçons' },
  { href: 'conversations', icon: MessageSquare, label: 'Conversations' },
  { href: 'profile', icon: User, label: 'Profil' },
]

export function AppNavbar({ locale }: { locale: string }) {
  const { profile, signOut } = useAuth()
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-white border-r border-gray-100 fixed left-0 top-0 z-40">
        {/* Logo */}
        {/* <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3C3489, #D4537E)' }}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold" style={{ color: '#3C3489' }}>Koraa</span>
        </div> */}
        <div className='flex items-center flex-row justify-start px-6 pt-4 gap-2 '>
          <div
            className="w-14 h-14 rounded-2xl  flex items-center justify-center text-white shadow-xl rounded-xl "
            style={{ background: 'linear-gradient(135deg, #3C3489, #D4537E)' }}
          >
            <Image src="/brand/logo.png" alt="koraa logo" width="100" height="100" />
          </div>
          <span className=' text-xl font-bold text-primary'>Koraa</span>
        </div>

        {/* Profile snippet */}
        {profile && (
          <div className="px-4 py-3 mx-3 mt-4 rounded-xl" style={{ backgroundColor: 'rgba(60,52,137,0.06)' }}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Langue cible</p>
            <p className="text-sm font-bold mt-0.5" style={{ color: '#3C3489' }}>
              {profile.target_language || '—'}
            </p>
          </div>
        )}

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 mt-2">
          {navItems.map(({ href, icon: Icon, label }) => {
            const fullHref = `/${locale}/app/${href}`
            const isActive = pathname.includes(`/app/${href}`)
            return (
              <Link
                key={href}
                href={fullHref}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "text-white shadow-md"
                    : "text-gray-500 hover:text-gray-600 hover:bg-gray-50"
                )}
                style={isActive ? { background: 'linear-gradient(135deg, #3C3489, #5046a8)' } : {}}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Sign Out */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={signOut}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-400 flex items-center justify-around px-2 pb-safe">
        {navItems.map(({ href, icon: Icon, label }) => {
          const fullHref = `/${locale}/app/${href}`
          const isActive = pathname.includes(`/app/${href}`)
          return (
            <Link
              key={href}
              href={fullHref}
              className={cn(
                "flex flex-col items-center gap-1 py-3 px-4 rounded-xl transition-all duration-200 cursor-pointer ",
                isActive ? "scale-105 text-primary " : "text-gray-600 hover:text-gray-500 "

              )}

              style={isActive ? { backgroundColor: 'linear-gradient(135deg, #3C3489, #5046a8)' } : {}}
            >
              <Icon
                className="w-6 h-6"
                style={{ color: isActive ? '#3C3489' : '#9ca3af' }}
              />
              <span className="text-[10px] font-bold text-xl" >
                {label}
              </span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
