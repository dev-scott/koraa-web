"use client"

import { useAuth } from '@/lib/auth-context'
import { motion } from 'framer-motion'
import { User, Mail, Globe, BookOpen, Award, LogOut, Settings } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user, profile, loading, signOut } = useAuth()
  const params = useParams()
  const locale = params.locale as string
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#3C3489] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-2xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-gray-900">Profil</h1>
        <button
          onClick={() => router.push(`/${locale}/app/onboarding`)}
          className="text-xs font-bold px-3 py-1.5 rounded-xl border border-gray-200 text-[#3C3489] hover:bg-white transition-colors"
        >
          Modifier le profil
        </button>
      </div>

      {/* Main Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-5"
      >
        {/* User Avatar & Name Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold shadow-md"
            style={{ background: 'linear-gradient(135deg, #3C3489, #D4537E)' }}
          >
            {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">{profile?.full_name || 'Utilisateur Koraa'}</h2>
            <p className="text-sm text-gray-500 font-medium">{user?.email}</p>
          </div>
        </div>

        {/* Profile Info Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-gray-400 mb-1">
              <Mail className="w-4 h-4 text-[#3C3489]" />
              <span>Adresse Email</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.email || '—'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-gray-400 mb-1">
              <Globe className="w-4 h-4 text-[#3C3489]" />
              <span>Pays d'apprentissage</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">{profile?.target_country || 'Non spécifié'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-gray-400 mb-1">
              <BookOpen className="w-4 h-4 text-[#3C3489]" />
              <span>Langue Cible</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">{profile?.target_language || 'Non spécifié'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-gray-400 mb-1">
              <Award className="w-4 h-4 text-[#3C3489]" />
              <span>Niveau Actuel</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">{profile?.language_level || 'Non spécifié'}</p>
          </div>
        </div>

        {/* Motivations & Interests */}
        {profile?.motivations && profile.motivations.length > 0 && (
          <div className="pt-2">
            <p className="text-xs font-extrabold uppercase text-gray-400 mb-2">Motivations</p>
            <div className="flex flex-wrap gap-2">
              {profile.motivations.map((mot, idx) => (
                <span
                  key={idx}
                  className="text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: '#3C3489' }}
                >
                  {mot}
                </span>
              ))}
            </div>
          </div>
        )}

        {profile?.interests && profile.interests.length > 0 && (
          <div className="pt-1">
            <p className="text-xs font-extrabold uppercase text-gray-400 mb-2">Centres d'intérêt</p>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((int, idx) => (
                <span
                  key={idx}
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(212,83,126,0.12)', color: '#D4537E' }}
                >
                  {int}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Logout Action Button */}
      <button
        onClick={signOut}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white transition-all shadow-md hover:brightness-110 active:scale-98"
        style={{ backgroundColor: '#D4537E' }}
      >
        <LogOut className="w-5 h-5" />
        <span>Se déconnecter</span>
      </button>
    </div>
  )
}
