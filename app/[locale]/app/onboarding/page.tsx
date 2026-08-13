"use client"

import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import { getLanguageCode, syncCourseDataWithSupabase } from '@/lib/course-data'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, ArrowRight, Check, User, Globe, BookOpen, 
  Zap, Trophy, Plane, Briefcase, Users, Palette, GraduationCap,
  Music, Utensils, Library, Film, Dumbbell, Map, Star
} from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const TOTAL_STEPS = 6

const COUNTRIES = [
  { id: 'Cameroun', name: 'Cameroun', flag: '🇨🇲', enabled: true },
  { id: 'Sénégal', name: 'Sénégal', flag: '🇸🇳', enabled: false },
  { id: "Côte d'Ivoire", name: "Côte d'Ivoire", flag: '🇨🇮', enabled: false },
]

const LANGUAGES = [
  { id: 'Anglais', name: 'Anglais', flag: '🇬🇧', enabled: true },
  { id: 'Français', name: 'Français', flag: '🇫🇷', enabled: false },
  { id: 'Ghomala', name: 'Ghomala', flag: '🇨🇲', enabled: false },
  { id: 'Duala', name: 'Duala', flag: '🇨🇲', enabled: false },
  { id: 'Bassa', name: 'Bassa', flag: '🇨🇲', enabled: false },
]

const LEVELS = [
  { id: 'Débutant', name: 'Débutant', subtitle: 'Je commence tout juste', Icon: Star },
  { id: 'Intermédiaire', name: 'Intermédiaire', subtitle: 'Je peux tenir une conversation simple', Icon: Zap },
  { id: 'Avancé', name: 'Avancé', subtitle: "Je m'exprime couramment", Icon: Trophy },
]

const MOTIVATIONS = [
  { id: 'Voyage', name: 'Voyage', Icon: Plane },
  { id: 'Carrière', name: 'Carrière / Travail', Icon: Briefcase },
  { id: 'Famille & Racines', name: 'Famille & Racines', Icon: Users },
  { id: 'Culture', name: 'Culture & Loisirs', Icon: Palette },
  { id: 'Études', name: 'Études', Icon: GraduationCap },
]

const INTERESTS = [
  { id: 'Musique', name: 'Musique', Icon: Music },
  { id: 'Cuisine', name: 'Cuisine', Icon: Utensils },
  { id: 'Histoire & Traditions', name: 'Histoire & Traditions', Icon: Library },
  { id: 'Cinéma', name: 'Cinéma & Séries', Icon: Film },
  { id: 'Sport', name: 'Sport', Icon: Dumbbell },
  { id: 'Voyage', name: 'Voyage', Icon: Map },
]

export default function OnboardingPage() {
  const { session, refreshProfile } = useAuth()
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string

  const [step, setStep] = useState(1)
  const [fullName, setFullName] = useState('')
  const [targetCountry, setTargetCountry] = useState('Cameroun')
  const [targetLanguage, setTargetLanguage] = useState('Anglais')
  const [languageLevel, setLanguageLevel] = useState('')
  const [selectedMotivations, setSelectedMotivations] = useState<string[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [direction, setDirection] = useState(1)

  const isStepValid = () => {
    switch (step) {
      case 1: return fullName.trim().length > 1
      case 2: return !!targetCountry
      case 3: return !!targetLanguage
      case 4: return !!languageLevel
      case 5: return selectedMotivations.length > 0
      case 6: return selectedInterests.length > 0
      default: return false
    }
  }

  const handleNext = async () => {
    if (step < TOTAL_STEPS) {
      setDirection(1)
      setStep(s => s + 1)
    } else {
      await handleSubmit()
    }
  }

  const handleBack = () => {
    setDirection(-1)
    setStep(s => s - 1)
  }

  const handleSubmit = async () => {
    if (!session?.user) return
    setSubmitting(true)
    try {
      const { error } = await supabase.from('profiles').upsert({
        id: session.user.id,
        full_name: fullName.trim(),
        target_country: targetCountry,
        target_language: targetLanguage,
        language_level: languageLevel,
        motivations: selectedMotivations,
        interests: selectedInterests,
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      const langCode = getLanguageCode(targetLanguage)
      syncCourseDataWithSupabase(langCode).catch(console.error)

      toast.success('Profil configuré avec succès !')
      await refreshProfile()
      router.push(`/${locale}/app/learn`)
    } catch (err: any) {
      toast.error(err.message || 'Une erreur est survenue')
    } finally {
      setSubmitting(false)
    }
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">Faisons connaissance</h2>
              <p className="mt-2 text-gray-500">Comment devons-nous vous appeler ?</p>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Votre nom complet"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#3C3489] focus:outline-none text-gray-900 text-base font-medium transition-colors"
                autoFocus
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">Choisissez un pays</h2>
              <p className="mt-2 text-gray-500">Sélectionnez le pays dont vous voulez apprendre les langues.</p>
            </div>
            <div className="space-y-3">
              {COUNTRIES.map(country => {
                const isSelected = targetCountry === country.id
                return (
                  <button
                    key={country.id}
                    disabled={!country.enabled}
                    onClick={() => country.enabled && setTargetCountry(country.id)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all duration-200 ${
                      !country.enabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:border-[#3C3489]/50'
                    } ${isSelected ? 'border-[#D4537E] bg-[#D4537E]/8' : 'border-gray-200 bg-white'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{country.flag}</span>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">{country.name}</p>
                        {!country.enabled && <p className="text-xs text-gray-400 mt-0.5">Bientôt disponible</p>}
                      </div>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-[#D4537E]" />}
                  </button>
                )
              })}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">Quelle langue voulez-vous apprendre ?</h2>
              <p className="mt-2 text-gray-500">Sélectionnez la langue de {targetCountry} à étudier.</p>
            </div>
            <div className="space-y-3">
              {LANGUAGES.map(lang => {
                const isSelected = targetLanguage === lang.id
                return (
                  <button
                    key={lang.id}
                    disabled={!lang.enabled}
                    onClick={() => lang.enabled && setTargetLanguage(lang.id)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all duration-200 ${
                      !lang.enabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:border-[#3C3489]/50'
                    } ${isSelected ? 'border-[#D4537E] bg-[#D4537E]/8' : 'border-gray-200 bg-white'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{lang.flag}</span>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">{lang.name}</p>
                        {!lang.enabled && <p className="text-xs text-gray-400 mt-0.5">Bientôt disponible</p>}
                      </div>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-[#D4537E]" />}
                  </button>
                )
              })}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">Quel est votre niveau ?</h2>
              <p className="mt-2 text-gray-500">Cela nous aide à adapter les leçons à vos compétences.</p>
            </div>
            <div className="space-y-3">
              {LEVELS.map(({ id, name, subtitle, Icon }) => {
                const isSelected = languageLevel === id
                return (
                  <button
                    key={id}
                    onClick={() => setLanguageLevel(id)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer hover:border-[#3C3489]/50
                      ${isSelected ? 'border-[#D4537E] bg-[#D4537E]/8' : 'border-gray-200 bg-white'}`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-[#D4537E]' : 'text-gray-400'}`} />
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">{name}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-[#D4537E]" />}
                  </button>
                )
              })}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">Quelles sont vos motivations ?</h2>
              <p className="mt-2 text-gray-500">Pourquoi apprenez-vous cette langue ? (au moins une)</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {MOTIVATIONS.map(({ id, name, Icon }) => {
                const isSelected = selectedMotivations.includes(id)
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedMotivations(prev =>
                      isSelected ? prev.filter(m => m !== id) : [...prev, id]
                    )}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer
                      ${isSelected
                        ? 'border-[#3C3489] bg-[#3C3489] text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-[#3C3489]/40'
                      }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-sm font-semibold text-center leading-tight">{name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">Quels sont vos centres d'intérêt ?</h2>
              <p className="mt-2 text-gray-500">Nous personnaliserons vos sujets de conversation.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {INTERESTS.map(({ id, name, Icon }) => {
                const isSelected = selectedInterests.includes(id)
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedInterests(prev =>
                      isSelected ? prev.filter(i => i !== id) : [...prev, id]
                    )}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer
                      ${isSelected
                        ? 'border-[#3C3489] bg-[#3C3489] text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-[#3C3489]/40'
                      }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-sm font-semibold text-center leading-tight">{name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with progress */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-0 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(212,83,126,0.2)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: '#3C3489' }}
            initial={false}
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          />
        </div>

        <span className="text-sm font-semibold text-gray-500 w-10 text-right">{step}/{TOTAL_STEPS}</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-6 py-8">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-5 border-t border-gray-100 bg-white">
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleNext}
            disabled={!isStepValid() || submitting}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold text-base transition-all duration-200 disabled:opacity-30"
            style={{ background: 'linear-gradient(135deg, #3C3489, #5046a8)' }}
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{step === TOTAL_STEPS ? 'Terminer' : 'Continuer'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
