export type Locale = "fr" | "en"

export const locales: Locale[] = ["fr", "en"]
export const defaultLocale: Locale = "fr"

export function isValidLocale(value: string): value is Locale {
    return locales.includes(value as Locale)
}

const dictionaries = {
    fr: {
        nav: {
            features: "Fonctionnalités",
            languages: "Langues",
            screenshots: "Aperçu",
            download: "Télécharger",
            openApp: "Ouvrir l'app",
        },
        hero: {
            badge: "100+ Langues & Dialectes",
            title: "Réveillez la langue de vos ancêtres",
            subtitle: "Apprenez le Ghomala, le Duala, le Bassa, l'Ewondo et d'autres langues maternelles africaines. Leçons ludiques, audio natif guidé & mode 100% hors-ligne.",
            audioPreview: "Prononciation guidée par des voix natives",
            startLearning: "Commencer à apprendre",
        },
        languages: {
            sectionLabel: "Langues & Régions",
            title: "Des dizaines de langues maternelles à portée de main",
            subtitle: "Découvrez des dialectes riches, leur prononciation exacte et leur vocabulaire de tous les jours.",
            exploreAll: "Explorer toutes les langues →",
        },
        features: {
            sectionLabel: "Fonctionnalités",
            title: "Tout pour maîtriser votre langue maternelle",
            audioTitle: "Audio HD Natif",
            audioDesc: "Écoutez la prononciation exacte enregistrée par des locuteurs natifs de chaque région.",
            interactiveTitle: "Leçons Interactives",
            interactiveDesc: "Apprenez pas à pas avec des mini-jeux, flashcards et exercices de conversation quotidiens.",
            dialectTitle: "Cartographie des Dialectes",
            dialectDesc: "Explorez l'origine géographique et l'histoire culturelle de chaque langue africaine.",
            offlineTitle: "100% Hors-Ligne & Gratuit",
            offlineDesc: "Téléchargez vos leçons et révisez où que vous soyez, même sans connexion internet.",
            favTitle: "Dictionnaire Personnel",
            favDesc: "Sauvegardez vos mots et expressions préférés pour les réviser à tout moment.",
            quizTitle: "Quiz & Défis Vocabulaire",
            quizDesc: "Testez votre mémoire avec des révisions espacées adaptées à votre niveau.",
        },
        demo: {
            sectionLabel: "Démo Interactive",
            title: "Testez vos premiers mots dès maintenant",
            subtitle: "Cliquez sur une carte pour découvrir la traduction et la prononciation.",
            listenBtn: "Écouter",
            tapToFlip: "Cliquer pour traduire",
        },
        studio: {
            sectionLabel: "Studio Phrasebook",
            title: "Explorez le vocabulaire par thématiques",
            subtitle: "Choisissez une thématique de la vie quotidienne et écoutez les expressions essentielles.",
            catGreetings: "Salutations",
            catFamily: "Famille & Proches",
            catTravel: "Voyage & Repères",
            catLove: "Affection & Amour",
            catMarket: "Marché & Échanges",
        },
        workflow: {
            sectionLabel: "Méthode Koraa",
            title: "Apprendre votre langue en 3 étapes simples",
            subtitle: "Une approche ludique pensée pour une mémorisation rapide et une prononciation authentique.",
            step1Title: "1. Choisissez votre dialecte",
            step1Desc: "Parcourez plus de 100 langues africaines et sélectionnez votre langue maternelle ou d'intérêt.",
            step2Title: "2. Écoutez des locuteurs natifs",
            step2Desc: "Entraînez votre oreille avec des voix réelles, des repères phonétiques et des audio HD.",
            step3Title: "3. Pratiquez 100% Hors-ligne",
            step3Desc: "Révisez vos cartes de vocabulaire quotidienne où que vous soyez, même sans internet.",
        },
        screenshots: {
            sectionLabel: "Interface App",
            title: "Une expérience fluide et immersive",
        },
        stats: {
            languages: "Langues & Dialectes",
            audioClips: "Extraits Audio HD",
            free: "Gratuit & 100% Hors-ligne",
            learners: "Apprenants Passionnés",
        },
        popular: {
            sectionLabel: "Langues Phares",
            title: "Parmi les langues les plus demandées sur Koraa",
            viewAll: "Voir toutes les langues disponibles →",
        },
        cta: {
            title: "Prêt à parler votre langue maternelle ?",
            subtitle: "Rejoignez Koraa gratuitement dès aujourd'hui sur web et mobile. Apprenez sans limite et hors-ligne.",
            openWeb: "Lancer la version web",
        },
        footer: {
            communityTitle: "Ensemble, préservons notre patrimoine linguistique",
            communityDesc: "Koraa est un projet engagé pour la transmission des langues africaines. Rejoignez la communauté et transmettez votre savoir.",
            tagline: "Préserver, transmettre et célébrer les langues maternelles d'Afrique avec Koraa.",
            links: "Navigation",
            languagesLink: "Langues",
            privacy: "Politique de confidentialité",
            madeWith: "Fait avec ❤️ au Cameroun pour le monde",
            by: "Conçu par",
            rights: "© 2026 Koraa. Tous droits réservés."
        }
    },
    en: {
        nav: {
            features: "Features",
            languages: "Languages",
            screenshots: "Screenshots",
            download: "Download",
            openApp: "Open app",
        },
        hero: {
            badge: "100+ African Languages",
            title: "Bring Your Ancestral Tongue Back to Life",
            subtitle: "Learn Ghomala, Duala, Bassa, Ewondo and other African mother tongues. Interactive lessons, native audio pronunciation & 100% offline access.",
            audioPreview: "Guided pronunciation recorded by native speakers",
            startLearning: "Start learning now",
        },
        languages: {
            sectionLabel: "Languages & Regions",
            title: "Explore dozens of rich African mother tongues",
            subtitle: "Discover unique dialects, authentic pronunciation, and everyday conversational phrases.",
            exploreAll: "Explore all languages →",
        },
        features: {
            sectionLabel: "Features",
            title: "Everything you need to master your mother tongue",
            audioTitle: "HD Native Audio",
            audioDesc: "Hear precise pronunciations recorded by native speakers from across every region.",
            interactiveTitle: "Interactive Lessons",
            interactiveDesc: "Master vocabulary step-by-step with gamified flashcards and conversation drills.",
            dialectTitle: "Dialect Map & Heritage",
            dialectDesc: "Explore the geographic origins, cultural history, and roots of each African language.",
            offlineTitle: "100% Offline & Free",
            offlineDesc: "Download your study modules and practice anywhere without an internet connection.",
            favTitle: "Personal Dictionary",
            favDesc: "Save your favorite words, expressions, and phrases for quick spaced revision.",
            quizTitle: "Vocabulary Quizzes",
            quizDesc: "Test your retention with smart spaced-repetition quizzes suited to your pace.",
        },
        demo: {
            sectionLabel: "Interactive Demo",
            title: "Try your first words right now",
            subtitle: "Click a card to reveal the translation and phonetic pronunciation.",
            listenBtn: "Listen",
            tapToFlip: "Click to translate",
        },
        studio: {
            sectionLabel: "Phrasebook Studio",
            title: "Explore thematic everyday vocabulary",
            subtitle: "Select a topic from daily life and listen to essential native expressions.",
            catGreetings: "Greetings",
            catFamily: "Family & Relations",
            catTravel: "Travel & Places",
            catLove: "Love & Affection",
            catMarket: "Market & Trade",
        },
        workflow: {
            sectionLabel: "Koraa Method",
            title: "Master your mother tongue in 3 simple steps",
            subtitle: "A joyful approach designed for quick recall and authentic pronunciation.",
            step1Title: "1. Choose your dialect",
            step1Desc: "Browse over 100 African mother tongues and select your ancestral dialect.",
            step2Title: "2. Listen to native voices",
            step2Desc: "Train your ear with authentic recordings, phonetic guides and HD audio clips.",
            step3Title: "3. Practice 100% Offline",
            step3Desc: "Review your vocabulary flashcards daily anywhere, even without internet connection.",
        },
        screenshots: {
            sectionLabel: "App Preview",
            title: "Designed for intuitive & joyful learning",
        },
        stats: {
            languages: "Languages & Dialects",
            audioClips: "HD Audio Tracks",
            free: "100% Free & Offline",
            learners: "Passionate Learners",
        },
        popular: {
            sectionLabel: "Featured Languages",
            title: "Most popular languages on Koraa",
            viewAll: "Browse all supported languages →",
        },
        cta: {
            title: "Ready to speak your mother tongue?",
            subtitle: "Join Koraa for free today on mobile and web. Practice anytime, anywhere offline.",
            openWeb: "Launch web app",
        },
        footer: {
            communityTitle: "Together, let's preserve our African linguistic heritage",
            communityDesc: "Koraa is dedicated to preserving and transmitting mother tongues. Join the movement and pass on your knowledge.",
            tagline: "Preserving, teaching, and celebrating African mother tongues with Koraa.",
            links: "Navigation",
            languagesLink: "Languages",
            privacy: "Privacy Policy",
            madeWith: "Made with ❤️ in Cameroon for the world",
            by: "Designed by",
            rights: "© 2026 Koraa. All rights reserved."
        }
    }
}

type Dictionaries = typeof dictionaries

export type Dictionary = Dictionaries[Locale]

export function getDictionary(locale: Locale): Dictionary {
    return dictionaries[locale]
}

