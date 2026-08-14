"use client"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { FadeInUp } from "@/components/motion-wrapper"
import { useLocal } from "@/lib/locale-context"
import {
  ArrowLeft,
  Calendar,
  Camera,
  CheckCircle2,
  ChevronRight,
  CloudCog,
  CreditCard,
  EyeOff,
  Globe,
  HardDrive,
  Lock,
  Mail,
  Mic,
  RefreshCw,
  Scale,
  Send,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  const { locale, t } = useLocal()
  const s = t.privacy.sections

  const quickNav = [
    { id: "intro", label: locale === "fr" ? "Intro" : "Intro", icon: ShieldCheck },
    { id: "data", label: locale === "fr" ? "Données" : "Data", icon: EyeOff },
    { id: "camera", label: locale === "fr" ? "Caméra" : "Camera", icon: Camera },
    { id: "microphone", label: locale === "fr" ? "Micro" : "Mic", icon: Mic },
    { id: "payment", label: locale === "fr" ? "Paiement" : "Payment", icon: CreditCard },
    { id: "storage", label: locale === "fr" ? "Stockage" : "Storage", icon: HardDrive },
    { id: "account", label: locale === "fr" ? "Compte" : "Account", icon: CloudCog },
    { id: "thirdParty", label: locale === "fr" ? "Tiers" : "Third-Party", icon: Globe },
    { id: "rights", label: locale === "fr" ? "Droits" : "Rights", icon: Scale },
    { id: "changes", label: locale === "fr" ? "Mises à jour" : "Changes", icon: RefreshCw },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const yOffset = -100
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <div className="relative min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      <Header />

      {/* Decorative Ambient Background Lights */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 size-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 size-[500px] rounded-full bg-secondary/10 blur-[140px]" />
        <div className="absolute bottom-10 left-1/4 size-[400px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <main className="relative z-10">
        {/* Hero Banner Section */}
        <section className="relative border-b border-border/40 bg-card/30 pt-28 pb-14 backdrop-blur-md">
          <div className="mx-auto max-w-4xl px-6">
            <FadeInUp>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Link
                  href={`/${locale}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground shadow-xs backdrop-blur-md transition-all hover:border-primary/40 hover:bg-card hover:text-primary hover:shadow-sm"
                >
                  <ArrowLeft className="size-3.5" />
                  {locale === "fr" ? "Retour à l'accueil" : "Back to Home"}
                </Link>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
                  <ShieldCheck className="size-3.5" />
                  <span>Koraa Trust & Safety</span>
                </div>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                {t.privacy.title}
              </h1>

              <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
                {locale === "fr"
                  ? "Transparence totale. Vos données personnelles restent sur votre appareil et sous votre contrôle à 100%."
                  : "Complete transparency. Your personal data stays on your device and 100% under your control."}
              </p>

              {/* Metadata Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
                <div className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/60 px-3 py-1.5 backdrop-blur-xs">
                  <Calendar className="size-3.5 text-primary" />
                  <span>{t.privacy.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/60 px-3 py-1.5 backdrop-blur-xs">
                  <User className="size-3.5 text-secondary" />
                  <span>
                    {t.privacy.developer}{" "}
                    <a
                      href="https://dev-scott.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary underline underline-offset-4 hover:text-secondary"
                    >
                      dev-scott.me
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-emerald-600 dark:text-emerald-400">
                  <Lock className="size-3.5" />
                  <span>{locale === "fr" ? "100% Confidentialité locale" : "100% Local Privacy"}</span>
                </div>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* Quick Navigation Scroll Bar */}
        <div className="sticky top-16 z-30 border-b border-border/40 bg-background/80 backdrop-blur-xl">
          <div className="mx-auto max-w-4xl px-6">
            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto py-3">
              <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">
                {locale === "fr" ? "Sommaire :" : "Contents:"}
              </span>
              {quickNav.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border/50 bg-card/50 px-3 py-1 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary active:scale-95 cursor-pointer"
                  >
                    <Icon className="size-3" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content Section Container */}
        <div className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
          <div className="space-y-10">
            {/* 1. Introduction */}
            <div id="intro">
              <FadeInUp>
                <SectionCard
                  number="01"
                  icon={ShieldCheck}
                  title={s.intro.title}
                  accentColor="primary"
                >
                  <p className="leading-relaxed">{s.intro.content}</p>

                  {/* Summary Highlight Box */}
                  <div className="mt-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent p-5 shadow-xs">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-primary/15 p-2 text-primary">
                        <Sparkles className="size-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">
                          {locale === "fr" ? "L'essentiel en bref" : "At a glance"}
                        </h4>
                        <p className="mt-1 text-sm font-medium leading-relaxed text-foreground/90">
                          {s.intro.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                </SectionCard>
              </FadeInUp>
            </div>

            {/* 2. Collecte de données */}
            <div id="data">
              <FadeInUp>
                <SectionCard
                  number="02"
                  icon={EyeOff}
                  title={s.data.title}
                  accentColor="secondary"
                >
                  <p className="leading-relaxed">{s.data.intro}</p>
                  <div className="mt-5 space-y-2.5">
                    {s.data.items.map((item) => (
                      <BulletItem key={item} text={item} icon={CheckCircle2} />
                    ))}
                  </div>
                </SectionCard>
              </FadeInUp>
            </div>

            {/* 3. Caméra et Photos */}
            <div id="camera">
              <FadeInUp>
                <SectionCard
                  number="03"
                  icon={Camera}
                  title={s.camera.title}
                  accentColor="amber"
                >
                  <p className="leading-relaxed">{s.camera.content}</p>
                </SectionCard>
              </FadeInUp>
            </div>

            {/* 4. Microphone */}
            <div id="microphone">
              <FadeInUp>
                <SectionCard
                  number="04"
                  icon={Mic}
                  title={s.microphone.title}
                  accentColor="violet"
                >
                  <p className="leading-relaxed">{s.microphone.intro}</p>
                  <div className="mt-5 space-y-2.5">
                    {s.microphone.items.map((item) => (
                      <BulletItem key={item} text={item} />
                    ))}
                  </div>
                </SectionCard>
              </FadeInUp>
            </div>

            {/* 5. Paiement et Achats */}
            <div id="payment">
              <FadeInUp>
                <SectionCard
                  number="05"
                  icon={CreditCard}
                  title={s.payment.title}
                  accentColor="emerald"
                >
                  <p className="leading-relaxed">{s.payment.intro}</p>
                  <div className="mt-5 space-y-2.5">
                    {s.payment.items.map((item) => (
                      <BulletItem key={item} text={item} icon={CheckCircle2} />
                    ))}
                  </div>
                </SectionCard>
              </FadeInUp>
            </div>

            {/* 6. Stockage local */}
            <div id="storage">
              <FadeInUp>
                <SectionCard
                  number="06"
                  icon={HardDrive}
                  title={s.storage.title}
                  accentColor="blue"
                >
                  <p className="leading-relaxed">{s.storage.intro}</p>
                  <div className="mt-4 space-y-2.5">
                    {s.storage.items.map((item) => (
                      <BulletItem key={item} text={item} />
                    ))}
                  </div>

                  <div className="mt-6 rounded-xl border border-border/60 bg-muted/30 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {locale === "fr" ? "Garanties de stockage :" : "Storage Guarantees:"}
                    </p>
                    <div className="mt-3 space-y-2">
                      {s.storage.dataInfo.map((item) => (
                        <BulletItem key={item} text={item} icon={Lock} />
                      ))}
                    </div>
                  </div>
                </SectionCard>
              </FadeInUp>
            </div>

            {/* 7. Compte et Synchronisation */}
            <div id="account">
              <FadeInUp>
                <SectionCard
                  number="07"
                  icon={CloudCog}
                  title={s.account.title}
                  accentColor="teal"
                >
                  <p className="leading-relaxed">{s.account.intro}</p>
                  <div className="mt-5 space-y-2.5">
                    {s.account.items.map((item) => (
                      <BulletItem key={item} text={item} />
                    ))}
                  </div>
                </SectionCard>
              </FadeInUp>
            </div>

            {/* 8. Services tiers */}
            <div id="thirdParty">
              <FadeInUp>
                <SectionCard
                  number="08"
                  icon={Globe}
                  title={s.thirdParty.title}
                  accentColor="orange"
                >
                  <p className="leading-relaxed">{s.thirdParty.intro}</p>
                  <div className="mt-5 space-y-2.5">
                    {s.thirdParty.items.map((item) => (
                      <BulletItem key={item} text={item} />
                    ))}
                  </div>
                </SectionCard>
              </FadeInUp>
            </div>

            {/* 9. Vos droits */}
            <div id="rights">
              <FadeInUp>
                <SectionCard
                  number="09"
                  icon={Scale}
                  title={s.rights.title}
                  accentColor="pink"
                >
                  <p className="leading-relaxed">{s.rights.intro}</p>
                  <div className="mt-5 space-y-2.5">
                    {s.rights.items.map((item) => (
                      <BulletItem key={item} text={item} icon={CheckCircle2} />
                    ))}
                  </div>
                </SectionCard>
              </FadeInUp>
            </div>

            {/* 10. Modifications */}
            <div id="changes">
              <FadeInUp>
                <SectionCard
                  number="10"
                  icon={RefreshCw}
                  title={s.changes.title}
                  accentColor="indigo"
                >
                  <p className="leading-relaxed">{s.changes.content}</p>
                </SectionCard>
              </FadeInUp>
            </div>

            {/* 11. Contact Cards */}
            <div id="contact">
              <FadeInUp>
                <SectionCard
                  number="11"
                  icon={Mail}
                  title={s.contact.title}
                  accentColor="primary"
                >
                  <p className="leading-relaxed">{s.contact.intro}</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <ContactCard
                      icon={Mail}
                      label="Email"
                      value="ryan.sado@yahoo.com"
                      href="mailto:ryan.sado@yahoo.com"
                    />
                    <ContactCard
                      icon={Globe}
                      label="Site Web"
                      value="dev-scott.me"
                      href="https://dev-scott.me"
                    />
                    {/* <ContactCard
                      icon={Send}
                      label="Telegram"
                      value="@ln_dev7"
                      href="https://t.me/ln_dev7"
                    /> */}
                  </div>
                </SectionCard>
              </FadeInUp>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function SectionCard({
  number,
  icon: Icon,
  title,
  children,
  accentColor = "primary",
}: {
  number: string
  icon: React.ElementType
  title: string
  children: React.ReactNode
  accentColor?: string
}) {
  const getBadgeStyle = () => {
    switch (accentColor) {
      case "secondary":
        return "bg-secondary/10 text-secondary border-secondary/20"
      case "amber":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      case "violet":
        return "bg-violet-500/10 text-violet-500 border-violet-500/20"
      case "emerald":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "blue":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "teal":
        return "bg-teal-500/10 text-teal-500 border-teal-500/20"
      case "orange":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "pink":
        return "bg-pink-500/10 text-pink-500 border-pink-500/20"
      case "indigo":
        return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
      default:
        return "bg-primary/10 text-primary border-primary/20"
    }
  }

  return (
    <section className="group rounded-3xl border border-border/60 bg-card/70 p-6 sm:p-8 backdrop-blur-xl shadow-xs transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-5">
        <div className="flex items-center gap-3">
          <div
            className={`flex size-10 items-center justify-center rounded-2xl border ${getBadgeStyle()}`}
          >
            <Icon className="size-5" />
          </div>
          <h2 className="text-lg font-bold text-foreground sm:text-xl">
            {title}
          </h2>
        </div>
        <span className="rounded-full border border-border/60 bg-muted/50 px-3 py-1 font-mono text-xs font-semibold text-muted-foreground">
          {number}
        </span>
      </div>

      <div className="mt-5 text-sm leading-relaxed text-foreground/80">
        {children}
      </div>
    </section>
  )
}

function BulletItem({
  text,
  icon: CustomIcon,
}: {
  text: string
  icon?: React.ElementType
}) {
  const Icon = CustomIcon || ChevronRight
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/30 bg-background/50 p-3 transition-colors hover:border-primary/20 hover:bg-card">
      <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-3.5" />
      </div>
      <p className="text-xs font-medium text-foreground/90 sm:text-sm">{text}</p>
    </div>
  )
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType
  label: string
  value: string
  href: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-card/60 p-5 shadow-xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-center justify-between">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
          <Icon className="size-4" />
        </div>
        <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 font-mono text-sm font-bold text-foreground transition-colors group-hover:text-primary">
          {value}
        </p>
      </div>
    </a>
  )
}