"use client"

import { FadeInUp, FadeInUpChild, HoverCard, StaggerContainer } from "@/components/motion-wrapper"
import { StoreBadges } from "@/components/store-badges"
import { LanguageProfile } from "@/lib/languages-data"
import { LANGUAGE_PROFILES } from "@/lib/languages-data"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Globe,
  Headphones,
  Lock,
  MapPin,
  Sparkles,
  Users,
  Volume2,
  Zap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import Footer from "@/components/footer"
import Header from "@/components/header"

interface Props {
  lang: LanguageProfile
  locale: string
}

export default function LanguageProfileClient({ lang, locale }: Props) {
  const isFr = locale !== "en"
  const [activePhrase, setActivePhrase] = useState<string | null>(null)

  const name = lang.name
  const region = isFr ? lang.region_fr : lang.region_en
  const family = isFr ? lang.family_fr : lang.family_en
  const description = isFr ? lang.description_fr : lang.description_en
  const curiosity = isFr ? lang.curiosity_fr : lang.curiosity_en

  const relatedLangs = lang.relatedLangs
    .map((id) => LANGUAGE_PROFILES[id])
    .filter(Boolean)

  const handleSpeak = (text: string) => {
    setActivePhrase(text)
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.85
      utterance.onend = () => setActivePhrase(null)
      utterance.onerror = () => setActivePhrase(null)
      window.speechSynthesis.speak(utterance)
    } else {
      setTimeout(() => setActivePhrase(null), 1200)
    }
  }

  return (
    <div className="relative overflow-x-hidden bg-background text-foreground">
      <Header />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative bg-background pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[600px] rounded-full opacity-10 blur-[120px]"
          style={{ background: lang.colorHex }}
        />

        <div className="mx-auto max-w-6xl px-6">
          {/* Breadcrumb */}
          <FadeInUp>
            <Link
              href={`/${locale}#languages`}
              className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="size-3.5" />
              <span>{isFr ? "Toutes les langues" : "All languages"}</span>
            </Link>
          </FadeInUp>

          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
            {/* Left */}
            <div className="flex-1">
              <FadeInUp>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 shadow-sm">
                  <Sparkles className="size-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {isFr ? "Profil de langue" : "Language Profile"}
                  </span>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.1}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl drop-shadow-lg">{lang.flag}</span>
                  <div>
                    <h1 className="text-5xl font-black tracking-tight text-foreground lg:text-6xl">
                      {name}
                    </h1>
                    <p className="mt-1 text-base font-semibold text-muted-foreground">
                      {lang.country}
                    </p>
                  </div>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.15}>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-surface px-3 py-1 text-xs font-bold text-foreground">
                    <MapPin className="size-3 text-primary" />
                    {region}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-surface px-3 py-1 text-xs font-bold text-foreground">
                    <Users className="size-3 text-secondary" />
                    {lang.speakers} {isFr ? "locuteurs" : "speakers"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-surface px-3 py-1 text-xs font-bold text-foreground">
                    <Globe className="size-3 text-muted-foreground" />
                    {family}
                  </span>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.2}>
                <p className="text-base leading-relaxed text-muted-foreground max-w-xl">
                  {description}
                </p>
              </FadeInUp>

              <FadeInUp delay={0.3}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/${locale}/app`}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
                  >
                    <span>{isFr ? `Apprendre le ${name}` : `Learn ${name}`}</span>
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <StoreBadges />
                </div>
                <div className="mt-4 flex items-center gap-5 text-xs font-semibold text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Check className="size-4 text-emerald-600" />
                    {isFr ? "100% Gratuit" : "100% Free"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="size-4 text-emerald-600" />
                    {isFr ? "Mode Hors-ligne" : "Offline Mode"}
                  </span>
                </div>
              </FadeInUp>
            </div>

            {/* Right — Curiosity card */}
            <FadeInUp delay={0.2} className="shrink-0 w-full max-w-sm">
              <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-surface p-7 shadow-xl">
                <div
                  className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full opacity-15 blur-3xl"
                  style={{ background: lang.colorHex }}
                />
                <div className="relative">
                  <span className="text-3xl">💡</span>
                  <p className="mt-3 text-xs font-bold uppercase tracking-widest text-primary">
                    {isFr ? "Le savais-tu ?" : "Did you know?"}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground font-medium">
                    {curiosity}
                  </p>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* ── PHRASES ESSENTIELLES ────────────────────────────────── */}
      <section className="bg-surface border-y border-foreground/10 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeInUp>
            <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  <Volume2 className="size-3.5" />
                  {isFr ? "Phrases essentielles" : "Essential phrases"}
                </span>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                  {isFr ? `6 premières expressions en ${name}` : `6 first phrases in ${name}`}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isFr
                    ? "Cliquez sur ▶ pour écouter la prononciation guidée"
                    : "Click ▶ to hear guided pronunciation"}
                </p>
              </div>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lang.phrases.map((p) => (
              <FadeInUpChild key={p.phrase}>
                <HoverCard className="h-full">
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-foreground/10 bg-background p-5 shadow-sm">
                    <div>
                      <h3 className="text-xl font-black text-foreground">
                        « {p.phrase} »
                      </h3>
                      <p className="mt-1 font-mono text-xs font-semibold text-primary">
                        {p.phonetic}
                      </p>
                      <div className="my-3 h-px w-full bg-foreground/10" />
                      <p className="text-sm font-bold text-foreground">
                        {isFr ? p.translation_fr : p.translation_en}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSpeak(p.phrase)}
                      className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-foreground/10 bg-surface py-2.5 text-xs font-bold text-foreground transition-all hover:bg-primary hover:text-white"
                    >
                      <Volume2
                        className={`size-3.5 ${activePhrase === p.phrase ? "animate-bounce" : ""}`}
                      />
                      <span>
                        {activePhrase === p.phrase
                          ? isFr ? "Écoute..." : "Listening..."
                          : isFr ? "Écouter" : "Listen"}
                      </span>
                    </button>
                  </div>
                </HoverCard>
              </FadeInUpChild>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── PHONÉTIQUE ──────────────────────────────────────────── */}
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeInUp>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary/20 bg-secondary/5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-secondary">
              <Headphones className="size-3.5" />
              {isFr ? "Guide phonétique" : "Phonetic guide"}
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              {isFr ? `Sons caractéristiques du ${name}` : `Characteristic sounds of ${name}`}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              {isFr
                ? "Ces sons distinguent cette langue et peuvent être inhabituels pour un locuteur français ou anglais."
                : "These sounds distinguish this language and may be unusual for a French or English speaker."}
            </p>
          </FadeInUp>

          <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-3">
            {lang.sounds.map((s, i) => (
              <FadeInUpChild key={s.letter}>
                <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-surface p-7 shadow-sm">
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full opacity-10 blur-2xl"
                    style={{ background: lang.colorHex }}
                  />
                  <div className="relative">
                    <div className="mb-4 flex items-center justify-between">
                      <span
                        className="text-4xl font-black"
                        style={{ color: lang.colorHex }}
                      >
                        {s.letter}
                      </span>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-bold text-primary">
                        {s.phonetic}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {isFr ? s.hint_fr : s.hint_en}
                    </p>
                  </div>
                </div>
              </FadeInUpChild>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── APERÇU DES LEÇONS ───────────────────────────────────── */}
      <section className="bg-surface border-y border-foreground/10 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeInUp>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <BookOpen className="size-3.5" />
              {isFr ? "Contenu disponible" : "Available content"}
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              {isFr
                ? `Ce que vous apprendrez en ${name}`
                : `What you will learn in ${name}`}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              {isFr
                ? "Aperçu des modules disponibles. Les leçons gratuites sont accessibles sans inscription."
                : "Preview of available modules. Free lessons are accessible without registration."}
            </p>
          </FadeInUp>

          <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lang.lessonPreviews.map((lesson, i) => (
              <FadeInUpChild key={lesson.title_fr}>
                <HoverCard className="h-full">
                  <Link
                    href={`/${locale}/app`}
                    className="flex h-full flex-col justify-between rounded-2xl border border-foreground/10 bg-background p-5 shadow-sm transition-all hover:border-primary/30"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-3xl">{lesson.icon}</span>
                        {lesson.isFree ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600">
                            <Zap className="size-2.5" />
                            {isFr ? "Gratuit" : "Free"}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                            <Lock className="size-2.5" />
                            {isFr ? "Avancé" : "Advanced"}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-4 text-sm font-extrabold text-foreground leading-tight">
                        {isFr ? lesson.title_fr : lesson.title_en}
                      </h3>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-primary">
                      <span>{isFr ? "Commencer" : "Start"}</span>
                      <ArrowRight className="size-3" />
                    </div>
                  </Link>
                </HoverCard>
              </FadeInUpChild>
            ))}
          </StaggerContainer>

          {/* CTA block */}
          <FadeInUp delay={0.2}>
            <div className="mt-14 flex flex-col items-center gap-5 rounded-3xl border border-foreground/10 bg-background p-10 text-center shadow-sm">
              <span className="text-4xl">🚀</span>
              <h3 className="text-xl font-black text-foreground">
                {isFr
                  ? `Prêt à parler ${name} ?`
                  : `Ready to speak ${name}?`}
              </h3>
              <p className="max-w-md text-sm text-muted-foreground">
                {isFr
                  ? "Accédez à toutes les leçons, l'audio natif et le mode hors-ligne dans l'application Koraa."
                  : "Access all lessons, native audio and offline mode in the Koraa app."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`/${locale}/app`}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
                >
                  <span>
                    {isFr ? "Ouvrir l'application" : "Open the app"}
                  </span>
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <StoreBadges />
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ── LANGUES CONNEXES ────────────────────────────────────── */}
      {relatedLangs.length > 0 && (
        <section className="bg-background py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <FadeInUp>
              <h2 className="text-xl font-black tracking-tight text-foreground sm:text-2xl mb-8">
                {isFr ? "Langues connexes à explorer" : "Related languages to explore"}
              </h2>
            </FadeInUp>

            <StaggerContainer className="grid gap-4 sm:grid-cols-3">
              {relatedLangs.map((related) => (
                <FadeInUpChild key={related.id}>
                  <HoverCard className="h-full">
                    <Link
                      href={`/${locale}/languages/${related.id}`}
                      className="flex h-full flex-col justify-between rounded-2xl border border-foreground/10 bg-surface p-5 shadow-sm transition-all hover:border-primary/30"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-3xl">{related.flag}</span>
                          <span className="rounded-full border border-foreground/10 bg-background px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                            {related.speakers} {isFr ? "locuteurs" : "speakers"}
                          </span>
                        </div>
                        <h3 className="text-lg font-extrabold text-foreground">
                          {related.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {isFr ? related.region_fr : related.region_en}
                        </p>
                      </div>
                      <div className="mt-5 flex items-center gap-1 text-[11px] font-bold text-primary">
                        <span>{isFr ? "Découvrir" : "Discover"}</span>
                        <ArrowRight className="size-3" />
                      </div>
                    </Link>
                  </HoverCard>
                </FadeInUpChild>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
