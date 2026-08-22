export type Locale = "fr" | "en"
// text transalation
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
        },


        privacy: {
            title: "Politique de Confidentialité",
            lastUpdated: "Dernière mise à jour : 12 août 2026",
            developer: "Développeur : Dev-scott —",
            sections: {
                intro: {
                    title: "1. Introduction",
                    content:
                        "Koraa est une application mobile d'apprentissage des langues maternelles africaines. Votre vie privée est importante pour nous. Cette politique explique comment l'application gère vos données.",
                    summary:
                        "En résumé : Koraa ne collecte aucune donnée personnelle identifiable sans votre consentement. Vos données de progression et préférences sont stockées sur votre appareil. Certaines fonctionnalités (prononciation, transcription vocale) nécessitent d'envoyer des données audio à notre serveur pour traitement (voir section 4). L'application utilise Supabase pour gérer votre compte et synchroniser votre progression (voir section 7).",
                },
                data: {
                    title: "2. Collecte de données",
                    intro:
                        "Koraa collecte uniquement les données strictement nécessaires au bon fonctionnement de l'application :",
                    items: [
                        "Votre adresse e-mail : uniquement si vous créez un compte, pour l'authentification",
                        "Votre progression d'apprentissage : leçons complétées, scores, statistiques de pratique",
                        "Vos préférences : langue d'interface, thème visuel, langue(s) en cours d'apprentissage",
                        "N'utilise aucun service d'analytics ou de tracking publicitaire",
                        "Permet de consulter les leçons de base entièrement hors ligne — seules les fonctionnalités de reconnaissance vocale et de synchronisation nécessitent une connexion",
                        "Ne collecte aucune donnée bancaire ou financière",
                    ],
                },
                camera: {
                    title: "3. Caméra et Photos",
                    content:
                        "Koraa ne demande pas l'accès à votre caméra ou à votre galerie photo. L'application n'utilise aucune fonctionnalité nécessitant des images provenant de votre appareil.",
                },
                microphone: {
                    title: "4. Microphone et Reconnaissance vocale",
                    intro:
                        "Koraa utilise le microphone de votre appareil pour les exercices de prononciation, qui constituent le cœur de l'expérience d'apprentissage.",
                    items: [
                        "Activation explicite : le microphone n'est activé que lorsque vous appuyez sur le bouton d'enregistrement dans un exercice de prononciation. Il n'est jamais activé en arrière-plan.",
                        "Traitement serveur : l'audio capté est converti en base64 et envoyé à notre serveur Supabase, qui le transmet à un service de transcription (speech-to-text) pour analyser votre prononciation et vous donner un retour.",
                        "Aucun stockage audio : le fichier audio n'est jamais conservé sur nos serveurs. Seule la transcription textuelle est utilisée pour évaluer votre prononciation et est immédiatement supprimée après traitement.",
                        "Résultat local : le score et le retour sur votre prononciation sont stockés localement sur votre appareil pour suivre votre progression.",
                        "Révocable : vous pouvez révoquer la permission microphone à tout moment dans les paramètres de votre téléphone (Réglages > Koraa > Microphone). Les exercices de prononciation seront alors indisponibles, mais le reste de l'application reste accessible.",
                    ],
                },
                payment: {
                    title: "5. Paiement et Achats",
                    intro:
                        "Koraa est entièrement gratuit dans sa version de base. Certaines langues ou fonctionnalités avancées pourront faire l'objet d'un abonnement optionnel dans une version future.",
                    items: [
                        "Aucune donnée bancaire : Koraa ne collecte, ne stocke et ne traite directement aucune donnée bancaire ou financière. Tout paiement éventuel est géré exclusivement par les plateformes Apple App Store ou Google Play Store, soumises à leurs propres politiques de confidentialité.",
                    ],
                },
                storage: {
                    title: "6. Stockage local",
                    intro:
                        "L'application stocke localement sur votre appareil (via AsyncStorage) les données suivantes :",
                    items: [
                        "Votre session : le token d'authentification Supabase permettant de rester connecté sans ressaisir vos identifiants",
                        "Votre cache de cours : les données de leçons récemment consultées, pour permettre un accès hors ligne",
                        "Vos préférences : la langue d'interface, le thème visuel et vos réglages personnels",
                    ],
                    dataInfo: [
                        "Sont stockées sur votre appareil",
                        "Le cache de cours peut être effacé depuis les paramètres de l'application",
                        "Peuvent être entièrement supprimées en désinstallant l'application ou en supprimant votre compte",
                    ],
                },
                account: {
                    title: "7. Compte et Synchronisation (Supabase)",
                    intro:
                        "Koraa utilise Supabase comme infrastructure backend pour gérer les comptes utilisateurs et synchroniser la progression. Lorsque vous créez un compte ou utilisez l'application en ligne, les données suivantes sont stockées sur les serveurs Supabase :",
                    items: [
                        "Votre adresse e-mail : utilisée uniquement pour l'authentification et la récupération de compte",
                        "Votre progression : leçons complétées, scores obtenus, statistiques hebdomadaires de pratique (minutes parlées, minutes écoutées)",
                        "Vos identifiants de session : tokens d'accès sécurisés permettant de maintenir votre connexion",
                        "Aucun mot de passe en clair : les mots de passe sont hashés et sécurisés par Supabase Auth, Koraa n'y a pas accès",
                        "Serveurs : les données sont hébergées sur les serveurs de Supabase, dont les infrastructure sont situées en Europe (UE). Supabase est conforme au RGPD.",
                        "Suppression : vous pouvez demander la suppression complète de votre compte et de toutes vos données associées depuis les paramètres de l'application ou en nous contactant directement.",
                    ],
                },
                thirdParty: {
                    title: "8. Services tiers",
                    intro:
                        "Koraa intègre les services tiers suivants, chacun soumis à sa propre politique de confidentialité :",
                    items: [
                        "Supabase (base de données et authentification) : stockage sécurisé de votre compte et de votre progression — supabase.com/privacy",
                        "Service de transcription vocale (speech-to-text) : traitement temporaire de vos enregistrements audio pour évaluer votre prononciation — les données ne sont pas conservées après traitement",
                        "Expo / React Native : framework mobile open-source, ne collecte aucune donnée utilisateur",
                    ],
                },
                rights: {
                    title: "9. Vos droits",
                    intro:
                        "Conformément au Règlement Général sur la Protection des Données (RGPD) et aux lois applicables, vous disposez des droits suivants :",
                    items: [
                        "Droit d'accès : vous pouvez demander une copie de toutes les données que nous détenons sur vous",
                        "Droit de rectification : vous pouvez corriger vos informations directement depuis les paramètres de l'application",
                        "Droit à l'effacement : vous pouvez supprimer votre compte et toutes vos données associées à tout moment",
                        "Droit à la portabilité : vous pouvez demander l'export de vos données de progression dans un format lisible",
                        "Droit d'opposition : vous pouvez vous opposer à tout traitement de vos données en supprimant votre compte",
                    ],
                },
                changes: {
                    title: "10. Modifications",
                    content:
                        "Cette politique de confidentialité peut être mise à jour occasionnellement pour refléter l'évolution de l'application ou des obligations légales. Toute modification sera reflétée par la date de mise à jour en haut de ce document. En cas de modification substantielle, vous serez notifié dans l'application. Nous vous encourageons à consulter cette page régulièrement.",
                },
                contact: {
                    title: "11. Contact",
                    intro:
                        "Pour toute question concernant cette politique de confidentialité, pour exercer vos droits ou pour demander la suppression de vos données :",
                },
            },
        },


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
        },

        privacy: {
            title: "Privacy Policy",
            lastUpdated: "Last updated: August 12, 2026",
            developer: "Developer: Dev-sott —",
            sections: {
                intro: {
                    title: "1. Introduction",
                    content:
                        "Koraa is a mobile app for learning African mother tongues. Your privacy matters to us. This policy explains how the app handles your data.",
                    summary:
                        "In short: Koraa does not collect any personally identifiable data without your consent. Your progress and preferences are stored on your device. Some features (pronunciation, voice transcription) require sending audio data to our server for processing (see section 4). The app uses Supabase to manage your account and sync your progress (see section 7).",
                },
                
                data: {
                    title: "2. Data Collection",
                    intro:
                        "Koraa only collects data strictly necessary for the app to function properly:",
                    items: [
                        "Your email address: only if you create an account, for authentication purposes",
                        "Your learning progress: completed lessons, scores, practice statistics",
                        "Your preferences: interface language, visual theme, language(s) you are learning",
                        "No analytics or advertising tracking services are used",
                        "Basic lessons can be accessed entirely offline — only voice recognition and sync features require a connection",
                        "No banking or financial data is collected",
                    ],
                },
                camera: {
                    title: "3. Camera and Photos",
                    content:
                        "Koraa does not request access to your camera or photo gallery. The app does not use any feature requiring images from your device.",
                },
                microphone: {
                    title: "4. Microphone and Voice Recognition",
                    intro:
                        "Koraa uses your device's microphone for pronunciation exercises, which are at the heart of the learning experience.",
                    items: [
                        "Explicit activation: the microphone is only activated when you press the record button inside a pronunciation exercise. It is never activated in the background.",
                        "Server-side processing: the captured audio is converted to base64 and sent to our Supabase server, which forwards it to a speech-to-text transcription service to analyze your pronunciation and provide feedback.",
                        "No audio storage: the audio file is never stored on our servers. Only the text transcription is used to evaluate your pronunciation and is immediately deleted after processing.",
                        "Local result: your pronunciation score and feedback are stored locally on your device to track your progress.",
                        "Revocable: you can revoke microphone permission at any time in your phone settings (Settings > Koraa > Microphone). Pronunciation exercises will then be unavailable, but the rest of the app remains accessible.",
                    ],
                },
                payment: {
                    title: "5. Payment and Purchases",
                    intro:
                        "Koraa is entirely free in its base version. Certain languages or advanced features may be offered as an optional subscription in a future version.",
                    items: [
                        "No banking data: Koraa does not directly collect, store or process any banking or financial data. Any future payment is handled exclusively by Apple App Store or Google Play Store, subject to their own privacy policies.",
                    ],
                },
                storage: {
                    title: "6. Local Storage",
                    intro:
                        "The app stores the following data locally on your device (via AsyncStorage):",
                    items: [
                        "Your session: the Supabase authentication token allowing you to stay logged in without re-entering your credentials",
                        "Your course cache: recently viewed lesson data, to allow offline access",
                        "Your preferences: interface language, visual theme and personal settings",
                    ],
                    dataInfo: [
                        "Are stored on your device",
                        "The course cache can be cleared from the app settings",
                        "Can be fully deleted by uninstalling the app or deleting your account",
                    ],
                },
                account: {
                    title: "7. Account and Sync (Supabase)",
                    intro:
                        "Koraa uses Supabase as its backend infrastructure to manage user accounts and sync progress. When you create an account or use the app online, the following data is stored on Supabase servers:",
                    items: [
                        "Your email address: used solely for authentication and account recovery",
                        "Your progress: completed lessons, scores, weekly practice statistics (minutes spoken, minutes listened)",
                        "Your session tokens: secure access tokens to maintain your login session",
                        "No plaintext passwords: passwords are hashed and secured by Supabase Auth — Koraa never has access to them",
                        "Servers: data is hosted on Supabase servers, whose infrastructure is located in Europe (EU). Supabase is GDPR-compliant.",
                        "Deletion: you can request full deletion of your account and all associated data from the app settings or by contacting us directly.",
                    ],
                },
                thirdParty: {
                    title: "8. Third-Party Services",
                    intro:
                        "Koraa integrates the following third-party services, each subject to its own privacy policy:",
                    items: [
                        "Supabase (database and authentication): secure storage of your account and progress — supabase.com/privacy",
                        "Voice transcription service (speech-to-text): temporary processing of your audio recordings to evaluate your pronunciation — data is not retained after processing",
                        "Expo / React Native: open-source mobile framework, does not collect any user data",
                    ],
                },
                rights: {
                    title: "9. Your Rights",
                    intro:
                        "In accordance with the General Data Protection Regulation (GDPR) and applicable laws, you have the following rights:",
                    items: [
                        "Right of access: you can request a copy of all data we hold about you",
                        "Right of rectification: you can correct your information directly from the app settings",
                        "Right to erasure: you can delete your account and all associated data at any time",
                        "Right to portability: you can request an export of your progress data in a readable format",
                        "Right to object: you can object to any processing of your data by deleting your account",
                    ],
                },
                changes: {
                    title: "10. Changes",
                    content:
                        "This privacy policy may be updated occasionally to reflect changes in the app or legal requirements. Any changes will be reflected by the update date at the top of this document. In the event of a substantial change, you will be notified within the app. We encourage you to review this page regularly.",
                },
                contact: {
                    title: "11. Contact",
                    intro:
                        "For any questions regarding this privacy policy, to exercise your rights, or to request deletion of your data:",
                },
            },
        },
    }
}

type Dictionaries = typeof dictionaries

export type Dictionary = Dictionaries[Locale]

export function getDictionary(locale: Locale): Dictionary {
    return dictionaries[locale]
}

