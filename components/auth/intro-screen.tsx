"use client"

import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Mail, Sparkles, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function IntroScreen() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSignInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidEmail || loading) return

    setLoading(true)
    try {
      const redirectTo = `${window.location.origin}/fr/app`
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      })

      if (error) {
        toast.error(error.message)
      } else {
        setSent(true)
        toast.success("Un lien de connexion a été envoyé à votre adresse email !")
      }
    } catch (err: any) {
      toast.error(err?.message || "Une erreur est survenue lors de la connexion.")
    } finally {
      setLoading(false)
    }
  }

  const handleSignInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/fr/app`,
        },
      })
      if (error) toast.error(error.message)
    } catch (err: any) {
      toast.error("Échec de la connexion avec Google.")
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden text-white">
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-pink-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full z-10 space-y-8">
        {/* Header / Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>100+ langues & dialectes</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Parlez la langue <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-pink-500">
              de vos racines
            </span>
          </h1>
          <p className="text-gray-400 text-sm">
            Apprenez les langues africaines à votre rythme, en toute liberté.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6"
        >
          <div>
            <h2 className="text-xl font-bold text-white">Commencer</h2>
            <p className="text-xs text-gray-400 mt-1">
              Entrez votre email pour créer un compte ou vous connecter
            </p>
          </div>

          {sent ? (
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-center space-y-2">
              <Mail className="w-8 h-8 text-purple-400 mx-auto" />
              <p className="font-semibold text-sm text-purple-200">Vérifiez vos emails !</p>
              <p className="text-xs text-gray-400">
                Nous avons envoyé un lien magique à <strong className="text-white">{email}</strong>. Cliquez dessus pour vous connecter.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-xs text-pink-400 underline mt-2 hover:text-pink-300"
              >
                Utiliser une autre adresse email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSignInWithEmail} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Adresse email"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!isValidEmail || loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Continuer avec l'email</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">ou</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social Sign-in */}
          <button
            onClick={handleSignInWithGoogle}
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-medium text-sm transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
              />
            </svg>
            <span>Continuer avec Google</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
