"use client"

import Footer from "@/components/footer";
import Header from "@/components/header";
import { FadeInUp, FadeInUpChild, FloatAnimation, HoverCard, ScaleIn, StaggerContainer } from "@/components/motion-wrapper";
import { ScreenshotLightbox } from "@/components/screenshot-lightbox";
import { StoreBadges } from "@/components/store-badges";
import { useLocal } from "@/lib/locale-context";
import {
    ArrowRight,
    BookOpen,
    Check,
    Compass,
    Globe,
    Headphones,
    Heart,
    Languages,
    LucideIcon,
    Map,
    MessageCircle,
    Search,
    ShoppingBag,
    Sparkles,
    Users,
    Volume2,
    WifiOff,
    Zap
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const screenshots = [
    { src: "/mockups/learning.png", alt: "Accueil de l'application Koraa : choix des langues maternelles et leçons" },
    { src: "/mockups/listening.png", alt: "Les leçons de langue guidées par des locuteurs natifs" },
    { src: "/mockups/setting.png", alt: "Réglages de l'application Koraa : choix de la langue pont et mode hors-ligne" },
    { src: "/mockups/auth.png", alt: "page d'authentification par lien magique" },
    { src: "/mockups/pronunciation.png", alt: "Guide de prononciation audio guidé par des locuteurs natifs" },
    { src: "/mockups/onboarding.png", alt: "Réglages de l'application Koraa : choix de la langue pont et mode hors-ligne" },
]

// Studio Phrasebook Thématiques
const THEMATIC_STUDIO = [
    {
        categoryKey: "catGreetings",
        icon: MessageCircle,
        phrases: [
            { lang: "Ghomala'", phrase: "O Sango", phonetic: "[Oh San-goh]", transFr: "Bonjour / Bienvenue", transEn: "Hello / Welcome", region: "Ouest" },
            { lang: "Duala", phrase: "Mussango", phonetic: "[Moo-san-goh]", transFr: "Paix sur toi / Bonjour", transEn: "Peace be with you", region: "Littoral" },
            { lang: "Ewondo", phrase: "Mbembe Kiris", phonetic: "[M-bem-beh Kee-rees]", transFr: "Bon matin", transEn: "Good morning", region: "Centre" },
            { lang: "Swahili", phrase: "Jambo / Habari", phonetic: "[Jahm-boh]", transFr: "Salut / Comment ça va?", transEn: "Hello / How are you?", region: "Est" },
        ]
    },
    {
        categoryKey: "catFamily",
        icon: Users,
        phrases: [
            { lang: "Bassa", phrase: "Mèbôk mù mut", phonetic: "[Meh-bohk moo moot]", transFr: "Salutations à la famille", transEn: "Greetings to the family", region: "Centre-Littoral" },
            { lang: "Ghomala'", phrase: "Mankaa / Tsé", phonetic: "[Mahn-kah]", transFr: "Maman / Papa", transEn: "Mother / Father", region: "Ouest" },
            { lang: "Swahili", phrase: "Familia / Ndugu", phonetic: "[Fah-mee-lee-ah]", transFr: "Famille / Frère", transEn: "Family / Sibling", region: "Est" },
            { lang: "Lingala", phrase: "Baninga na ngai", phonetic: "[Bah-neen-gah]", transFr: "Mes amis / Ma communauté", transEn: "My friends / Community", region: "Centrale" },
        ]
    },
    {
        categoryKey: "catTravel",
        icon: Compass,
        phrases: [
            { lang: "Swahili", phrase: "Karibu sana", phonetic: "[Kah-ree-boo sah-nah]", transFr: "Soyez le bienvenu", transEn: "You are very welcome", region: "Est" },
            { lang: "Fulfulde", phrase: "Jam Bandu", phonetic: "[Jahm Bahn-doo]", transFr: "Voyage en paix", transEn: "Travel in peace", region: "Nord" },
            { lang: "Duala", phrase: "Na we ma?", phonetic: "[Nah weh mah]", transFr: "Où vas-tu?", transEn: "Where are you going?", region: "Littoral" },
            { lang: "Ewondo", phrase: "Ke wa ke?", phonetic: "[Keh wah keh]", transFr: "Bon voyage à toi", transEn: "Safe travels", region: "Centre" },
        ]
    },
    {
        categoryKey: "catLove",
        icon: Heart,
        phrases: [
            { lang: "Duala", phrase: "Na Tondi Oa", phonetic: "[Nah Ton-dee Oh-ah]", transFr: "Je t'aime tendrement", transEn: "I love you dearly", region: "Littoral" },
            { lang: "Lingala", phrase: "Nalingi yo mingi", phonetic: "[Nah-leen-gee yoh]", transFr: "Je t'aime beaucoup", transEn: "I love you so much", region: "Centrale" },
            { lang: "Ghomala'", phrase: "A mbo shwe", phonetic: "[Ah mboh shweh]", transFr: "Tu es dans mon cœur", transEn: "You are in my heart", region: "Ouest" },
            { lang: "Swahili", phrase: "Nakupenda", phonetic: "[Nah-koo-pen-dah]", transFr: "Je t'aime", transEn: "I love you", region: "Est" },
        ]
    },
    {
        categoryKey: "catMarket",
        icon: ShoppingBag,
        phrases: [
            { lang: "Bassa", phrase: "Nje i yé?", phonetic: "[N-jeh ee yeh]", transFr: "Combien cela coûte-t-il?", transEn: "How much is this?", region: "Littoral" },
            { lang: "Swahili", phrase: "Ni kiasi gani?", phonetic: "[Nee kee-ah-see]", transFr: "Quel est le prix?", transEn: "What is the price?", region: "Est" },
            { lang: "Ewondo", phrase: "Kusu ne?", phonetic: "[Koo-soo neh]", transFr: "Donne-moi le bon prix", transEn: "Give me a good price", region: "Centre" },
            { lang: "Fulfulde", phrase: "No foti?", phonetic: "[Noh foh-tee]", transFr: "C'est combien?", transEn: "How much?", region: "Nord" },
        ]
    }
]

const BENTO_LANGUAGES = [
    { id: "ghomala", name: "Ghomala'", region: "Ouest Cameroun", speakers: "1M+", flag: "🇨🇲", featured: true, sample: "O Sango" },
    { id: "swahili", name: "Swahili", region: "Afrique de l'Est", speakers: "100M+", flag: "🌍", featured: true, sample: "Jambo" },
    { id: "duala", name: "Duala", region: "Littoral", speakers: "500K+", flag: "🇨🇲", featured: true, sample: "Mussango" },
    { id: "bassa", name: "Bassa", region: "Centre & Littoral", speakers: "800K+", flag: "🇨🇲", featured: false, sample: "Mèbôk" },
    { id: "ewondo", name: "Ewondo", region: "Centre & Sud", speakers: "1.2M+", flag: "🇨🇲", featured: false, sample: "Mbembe Kiris" },
    { id: "fulfulde", name: "Fulfulde", region: "Nord & Sahel", speakers: "15M+", flag: "🌍", featured: false, sample: "Jam Bandu" },
    { id: "lingala", name: "Lingala", region: "Afrique Centrale", speakers: "20M+", flag: "🌍", featured: false, sample: "Mbote" },
    { id: "wolof", name: "Wolof", region: "Afrique de l'Ouest", speakers: "12M+", flag: "🌍", featured: false, sample: "Nanga def" },
]

export default function Home() {
    const { locale, t } = useLocal()
    const [lightbox, setLightbox] = useState<{ src: string, alt: string } | null>(null)
    const [activeStudioTab, setActiveStudioTab] = useState(0)
    const [activeAudioPhrase, setActiveAudioPhrase] = useState<string | null>(null)

    const isFr = locale === "fr"
    const currentStudio = THEMATIC_STUDIO[activeStudioTab]

    const handlePlaySpeech = (text: string) => {
        setActiveAudioPhrase(text)
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.rate = 0.9
            utterance.onend = () => setActiveAudioPhrase(null)
            utterance.onerror = () => setActiveAudioPhrase(null)
            window.speechSynthesis.speak(utterance)
        } else {
            setTimeout(() => setActiveAudioPhrase(null), 1200)
        }
    }

    return (
        <div className="relative overflow-x-hidden bg-background text-foreground">
            <Header />

            {/* HERO SECTION — Dual Column Asymmetric Layout */}
            <section className="relative bg-background pt-28 pb-20 lg:pt-36 lg:pb-28">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 lg:flex-row lg:gap-14">
                    {/* Left Column: Headline & Hero Phrase Widget */}
                    <div className="flex-1 text-center lg:text-left">
                        <FadeInUp>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 shadow-sm">
                                <Sparkles className="size-4 text-primary" />
                                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                                    {t.hero.badge}
                                </span>
                            </div>
                        </FadeInUp>

                        <FadeInUp delay={0.1}>
                            <h1 className="text-[2.5rem] font-black leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                {isFr ? (
                                    <>
                                        Transmettez la langue <br className="hidden sm:inline" />
                                        <span className="text-primary">de votre terre</span>
                                    </>
                                ) : (
                                    <>
                                        Pass on the Language <br className="hidden sm:inline" />
                                        <span className="text-primary">of Your Roots</span>
                                    </>
                                )}
                            </h1>
                        </FadeInUp>

                        <FadeInUp delay={0.2}>
                            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
                                {t.hero.subtitle}
                            </p>
                        </FadeInUp>

                        {/* Integrated Hero Phrase Card */}
                        <FadeInUp delay={0.25}>
                            <div className="mx-auto mt-6 max-w-md rounded-2xl border border-foreground/10 bg-surface p-4 shadow-sm lg:mx-0">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-secondary">
                                        💡 Phrase du jour • Ghomala'
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handlePlaySpeech("O Sango")}
                                        className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary hover:bg-primary hover:text-white transition-colors"
                                    >
                                        <Volume2 className="size-3" />
                                        <span>Écouter</span>
                                    </button>
                                </div>
                                <p className="mt-2 text-lg font-black text-foreground">
                                    « O Sango » <span className="text-xs font-medium text-muted-foreground">[Oh San-goh]</span>
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Traduction: <span className="font-semibold text-foreground">Bonjour / Paix à toi</span>
                                </p>
                            </div>
                        </FadeInUp>

                        <FadeInUp delay={0.3}>
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                                <Link
                                    href={`/${locale}/app`}
                                    className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
                                >
                                    <span>{t.hero.startLearning}</span>
                                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                                </Link>

                                <StoreBadges />
                            </div>

                            <div className="mt-6 flex items-center justify-center gap-6 text-xs font-semibold text-muted-foreground lg:justify-start">
                                <span className="flex items-center gap-1.5">
                                    <Check className="size-4 text-emerald-600" /> 100% Gratuit
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Check className="size-4 text-emerald-600" /> Mode Hors-ligne
                                </span>
                            </div>
                        </FadeInUp>
                    </div>

                    {/* Right Column: Offset Dual Phone Composition & Live Hub */}
                    <FadeInUp delay={0.2} className="relative shrink-0">
                        <div className="relative mx-auto w-[300px] sm:w-[350px] lg:w-[420px]">
                            {/* Main Phone Frame */}
                            <div className="overflow-hidden rounded-[2.8rem] border-4 border-foreground/10 bg-surface shadow-2xl">
                                <Image
                                    src="/mockups/learning.png"
                                    alt="Koraa App Home"
                                    width={380}
                                    height={740}
                                    className="h-auto w-full object-cover"
                                    priority
                                />
                            </div>

                            {/* Secondary Offset Phone Frame */}
                            <div className="absolute -bottom-8 -right-6 hidden w-[210px] overflow-hidden rounded-[2.2rem] border-4 border-foreground/10 bg-surface shadow-2xl sm:block">
                                <Image
                                    src="/mockups/pronunciation.png"
                                    alt="Koraa Vocab Search"
                                    width={210}
                                    height={420}
                                    className="h-auto w-full object-cover"
                                />
                            </div>
                        </div>
                    </FadeInUp>
                </div>
            </section>

            {/* SECTION 1: STUDIO PHRASEBOOK THÉMATIQUE (Nouvelle disposition) */}
            <section id="studio" className="bg-surface py-20 lg:py-28 border-y border-foreground/10">
                <div className="mx-auto max-w-6xl px-6">
                    <FadeInUp>
                        <div className="text-center">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                                <BookOpen className="size-3.5" />
                                {t.studio.sectionLabel}
                            </span>
                            <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                                {t.studio.title}
                            </h2>
                            <p className="mx-auto mt-2 max-w-xl text-base text-muted-foreground">
                                {t.studio.subtitle}
                            </p>
                        </div>
                    </FadeInUp>

                    {/* Category Navigation Pills */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                        {THEMATIC_STUDIO.map((cat, idx) => {
                            const IconComponent = cat.icon
                            const label = (t.studio as Record<string, string>)[cat.categoryKey] || cat.categoryKey
                            return (
                                <button
                                    key={cat.categoryKey}
                                    type="button"
                                    onClick={() => setActiveStudioTab(idx)}
                                    className={`cursor-pointer inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all ${activeStudioTab === idx
                                            ? "bg-primary text-white shadow-md scale-105"
                                            : "bg-background text-foreground/70 hover:bg-foreground/5 border border-foreground/10"
                                        }`}
                                >
                                    <IconComponent className="size-3.5" />
                                    <span>{label}</span>
                                </button>
                            )
                        })}
                    </div>

                    {/* Studio Phrases Cards */}
                    <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {currentStudio.phrases.map((item) => (
                            <FadeInUpChild key={item.lang + item.phrase}>
                                <HoverCard className="h-full">
                                    <div className="flex h-full flex-col justify-between rounded-2xl border border-foreground/10 bg-background p-5 shadow-sm">
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <span className="rounded-full bg-secondary/15 px-2.5 py-0.5 text-[10px] font-bold text-secondary">
                                                    {item.lang}
                                                </span>
                                                <span className="text-[10px] font-medium text-muted-foreground">
                                                    {item.region}
                                                </span>
                                            </div>

                                            <h4 className="mt-4 text-xl font-black text-foreground">
                                                « {item.phrase} »
                                            </h4>
                                            <p className="mt-1 text-xs font-mono text-primary font-semibold">
                                                {item.phonetic}
                                            </p>

                                            <div className="my-3 h-px w-full bg-foreground/10" />

                                            <p className="text-sm font-bold text-foreground">
                                                {isFr ? item.transFr : item.transEn}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handlePlaySpeech(item.phrase)}
                                            className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-surface border border-foreground/10 py-2.5 text-xs font-bold text-foreground transition-all hover:bg-primary hover:text-white"
                                        >
                                            <Volume2 className={`size-3.5 ${activeAudioPhrase === item.phrase ? "animate-bounce" : ""}`} />
                                            <span>{activeAudioPhrase === item.phrase ? "Écoute..." : t.demo.listenBtn}</span>
                                        </button>
                                    </div>
                                </HoverCard>
                            </FadeInUpChild>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* SECTION 2: WORKFLOW EN 3 ÉTAPES (Nouvelle disposition) */}
            <section id="workflow" className="bg-background py-20 lg:py-28">
                <div className="mx-auto max-w-6xl px-6">
                    <FadeInUp>
                        <p className="text-center text-xs font-bold uppercase tracking-widest text-primary">
                            {t.workflow.sectionLabel}
                        </p>
                        <h2 className="mt-2 text-center text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                            {t.workflow.title}
                        </h2>
                        <p className="mx-auto mt-2 max-w-xl text-center text-base text-muted-foreground">
                            {t.workflow.subtitle}
                        </p>
                    </FadeInUp>

                    <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-3">
                        <FadeInUpChild>
                            <div className="flex h-full flex-col items-center rounded-3xl border border-foreground/10 bg-surface p-8 text-center shadow-sm">
                                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
                                    <Compass className="size-7" />
                                </div>
                                <h3 className="mt-6 text-xl font-extrabold text-foreground">
                                    {t.workflow.step1Title}
                                </h3>
                                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                                    {t.workflow.step1Desc}
                                </p>
                            </div>
                        </FadeInUpChild>

                        <FadeInUpChild>
                            <div className="flex h-full flex-col items-center rounded-3xl border border-primary/30 bg-primary/5 p-8 text-center shadow-sm">
                                <div className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-white shadow-md">
                                    <Headphones className="size-7" />
                                </div>
                                <h3 className="mt-6 text-xl font-extrabold text-foreground">
                                    {t.workflow.step2Title}
                                </h3>
                                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                                    {t.workflow.step2Desc}
                                </p>
                            </div>
                        </FadeInUpChild>

                        <FadeInUpChild>
                            <div className="flex h-full flex-col items-center rounded-3xl border border-foreground/10 bg-surface p-8 text-center shadow-sm">
                                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
                                    <WifiOff className="size-7" />
                                </div>
                                <h3 className="mt-6 text-xl font-extrabold text-foreground">
                                    {t.workflow.step3Title}
                                </h3>
                                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                                    {t.workflow.step3Desc}
                                </p>
                            </div>
                        </FadeInUpChild>
                    </StaggerContainer>
                </div>
            </section>

            {/* SECTION 3: BENTO GRID DES LANGUES (Nouvelle disposition asymétrique) */}
            <section id="languages" className="bg-surface py-20 lg:py-28 border-t border-foreground/10">
                <div className="mx-auto max-w-6xl px-6">
                    <FadeInUp>
                        <p className="text-center text-xs font-bold uppercase tracking-widest text-primary">
                            {t.languages.sectionLabel}
                        </p>
                        <h2 className="mt-2 text-center text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                            {t.languages.title}
                        </h2>
                        <p className="mx-auto mt-2 max-w-xl text-center text-base text-muted-foreground">
                            {t.languages.subtitle}
                        </p>
                    </FadeInUp>

                    {/* Bento Grid Container */}
                    <StaggerContainer className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {BENTO_LANGUAGES.map((lang) => (
                            <FadeInUpChild
                                key={lang.id}
                                className={lang.featured ? "sm:col-span-1 lg:col-span-1" : ""}
                            >
                                <HoverCard className="h-full">
                                    <div
                                        className={`flex h-full flex-col justify-between rounded-3xl border p-6 shadow-sm transition-all ${lang.featured
                                                ? "border-primary/30 bg-background"
                                                : "border-foreground/10 bg-background"
                                            }`}
                                    >
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-3xl">{lang.flag}</span>
                                                <span className="rounded-full border border-foreground/10 bg-surface px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                                                    {lang.speakers} locuteurs
                                                </span>
                                            </div>

                                            <h3 className="mt-4 text-xl font-extrabold text-foreground">
                                                {lang.name}
                                            </h3>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {lang.region}
                                            </p>

                                            <div className="mt-4 rounded-xl bg-surface border border-foreground/5 p-3">
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase">
                                                    Exemple
                                                </span>
                                                <p className="text-sm font-bold text-foreground">
                                                    « {lang.sample} »
                                                </p>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/${locale}/languages/${lang.id}`}
                                            className="mt-6 flex items-center justify-between text-xs font-bold text-primary hover:text-secondary"
                                        >
                                            <span>Découvrir la langue</span>
                                            <ArrowRight className="size-3.5" />
                                        </Link>
                                    </div>
                                </HoverCard>
                            </FadeInUpChild>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* SECTION 4: FONCTIONNALITÉS EN SPLIT-VIEW (Nouvelle disposition) */}
            <section id="features" className="bg-background py-20 lg:py-28">
                <div className="mx-auto max-w-6xl px-6">
                    <FadeInUp>
                        <p className="text-center text-xs font-bold uppercase tracking-widest text-primary">
                            {t.features.sectionLabel}
                        </p>
                        <h2 className="mt-2 text-center text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                            {t.features.title}
                        </h2>
                    </FadeInUp>

                    <div className="mt-16 flex flex-col gap-16">
                        {/* Split Row 1 */}
                        <div className="flex flex-col items-center gap-10 lg:flex-row">
                            <div className="flex-1">
                                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary text-white font-bold">
                                    01
                                </span>
                                <h3 className="mt-4 text-2xl font-black text-foreground">
                                    {t.features.audioTitle}
                                </h3>
                                <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                                    {t.features.audioDesc}
                                </p>
                                <ul className="mt-4 flex flex-col gap-2 text-xs font-bold text-foreground">
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4 text-emerald-600" /> Enregistré par des natifs du Cameroun & d'Afrique
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4 text-emerald-600" /> Repères phonétiques guidés pas à pas
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-foreground/10 bg-surface shadow-xl">
                                <Image
                                    src="/mockups/learning.png"
                                    alt="Prononciation Audio Koraa"
                                    width={450}
                                    height={350}
                                    className="h-auto w-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Split Row 2 */}
                        <div className="flex flex-col items-center gap-10 lg:flex-row-reverse">
                            <div className="flex-1">
                                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-secondary text-white font-bold">
                                    02
                                </span>
                                <h3 className="mt-4 text-2xl font-black text-foreground">
                                    {t.features.interactiveTitle}
                                </h3>
                                <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                                    {t.features.interactiveDesc}
                                </p>
                                <ul className="mt-4 flex flex-col gap-2 text-xs font-bold text-foreground">
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4 text-emerald-600" /> Révision par cartes mémoire (flashcards)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4 text-emerald-600" /> Quiz intelligents de rétention
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-foreground/10 bg-surface shadow-xl">
                                <Image
                                    src="/mockups/pronunciation.png"
                                    alt="Leçons Interactives Koraa"
                                    width={450}
                                    height={350}
                                    className="h-auto w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SCREENSHOTS GALLERY */}
            <section id="screenshots" className="bg-surface py-20 lg:py-28 border-t border-foreground/10">
                <div className="mx-auto max-w-6xl px-6">
                    <FadeInUp>
                        <p className="text-center text-xs font-bold uppercase tracking-widest text-primary">
                            {t.screenshots.sectionLabel}
                        </p>
                        <h2 className="mt-2 text-center text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                            {t.screenshots.title}
                        </h2>
                    </FadeInUp>

                    <StaggerContainer className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6 lg:gap-5">
                        {screenshots.map((m, i) => (
                            <FadeInUpChild key={m.alt}>
                                <button
                                    type="button"
                                    onClick={() => setLightbox(m)}
                                    className="group w-full cursor-pointer overflow-hidden rounded-[1.8rem] border border-foreground/10 bg-background shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                >
                                    <Image
                                        src={m.src}
                                        alt={m.alt}
                                        width={260}
                                        height={520}
                                        className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </button>
                            </FadeInUpChild>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Lightbox Modal */}
            <ScreenshotLightbox
                src={lightbox?.src ?? ""}
                alt={lightbox?.alt ?? ""}
                open={!!lightbox}
                onClose={() => setLightbox(null)}
            />

            {/* IMPACT STATS SECTION */}
            {/* <section className="relative bg-[#0e0c1f] py-20 text-white border-y border-white/10">
                <StaggerContainer className="relative mx-auto flex max-w-5xl flex-col items-center justify-around gap-10 px-6 text-center md:flex-row md:gap-0">
                    {[
                        { value: "100+", label: t.stats.languages },
                        { value: "5,000+", label: t.stats.audioClips },
                        { value: "100%", label: t.stats.free },
                    ].map((stat) => (
                        <FadeInUpChild key={stat.label}>
                            <p className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
                                {stat.value}
                            </p>
                            <p className="mt-2 text-sm font-bold uppercase tracking-wider text-secondary">
                                {stat.label}
                            </p>
                        </FadeInUpChild>
                    ))}
                </StaggerContainer>
            </section> */}

            {/* DOWNLOAD CTA SECTION */}
            {/* <section id="download" className="bg-background py-24">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <ScaleIn>
                        <div className="relative overflow-hidden rounded-[2.5rem] border border-foreground/10 bg-surface px-8 py-16 shadow-xl sm:px-16">
                            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
                                <Globe className="size-7" />
                            </span>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-foreground sm:text-5xl">
                                {t.cta.title}
                            </h2>
                            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
                                {t.cta.subtitle}
                            </p>

                            <div className="mt-10 flex flex-col items-center gap-5">
                                <Link
                                    href={`/${locale}/app`}
                                    className="inline-flex items-center gap-3 rounded-full bg-primary px-9 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
                                >
                                    <span>{t.cta.openWeb}</span>
                                    <ArrowRight className="size-5" />
                                </Link>

                                <StoreBadges />
                            </div>
                        </div>
                    </ScaleIn>
                </div>
            </section> */}

            <Footer />
        </div>
    );
}