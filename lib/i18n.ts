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
            screenshots: "Aperçu",
            download: "Télécharger",
            openApp: "Ouvrir l'app",
        },
        hero: {
            badge: "100+ langue dispo",
            title: "L'app qui réveille les langues oubliées",
            subtitle: "Apprenez le ghomala, le duala, le bassa et d'autres langues maternelles africaines. Leçons interactives, prononciation guidée",
        },



        features: {
            sectionLabel: "Fonctionnalités",
            title: "Tout ce qu'il faut pour cuisiner camerounais",
            regionTitle: "Recettes par région",
            regionDesc:
                "Explore les spécialités des 10 régions du Cameroun, du Littoral à l'Extrême-Nord.",
            searchTitle: "Recherche intelligente",
            searchDesc:
                "Filtre par temps de cuisson, niveau de piment et ingrédients populaires.",
            favTitle: "Favoris & Cookbook",
            favDesc:
                "Sauvegarde tes recettes préférées et crée les tiennes dans ton cookbook personnel.",
            offlineTitle: "100% hors ligne",
            offlineDesc:
                "Pas besoin d'internet. Toutes les recettes sont disponibles sans connexion.",
        },
        screenshots: {
            sectionLabel: "Aperçu",
            title: "Un aperçu de Tchopé",
        },
        stats: {
            regions: "Régions du Cameroun",
            languages: "Langues (FR & EN)",
            free: "Gratuit & hors ligne",
        },
        popular: {
            sectionLabel: "Recettes",
            title: "Les grands classiques de la cuisine camerounaise",
            viewAll: "Voir les 140 recettes camerounaises →",
        },
        cta: {
            title: "Prêt à tchoper ?",
            subtitle:
                "Télécharge l'application de recettes camerounaises gratuite et cuisine hors ligne.",
            openWeb: "Ouvrir la version web",
        },



        footer: {
            tagline: "Apprend ta langue avec koraa",
            links: "Liens",
            privacy: "Politique de confidentialité",
            madeWith: "Fait avec ❤️ au Cameroun",
            by: "Par",
            rights: "© 2026 Koraa. Tous droits réservés."
        }


    },
    en: {
        nav: {
            features: "Features",
            screenshots: "Screenshots",
            download: "Download",
            openApp: "Open app",
        },
        hero: {
            badge: "100+ langue dispo",
            title: "The App That Brings Forgotten Languages Back to Life",
            subtitle: "Learn Ghomala, Duala, Bassa and other African mother tongues. Interactive lessons, guided pronunciation, real-life conversations",
        },





        features: {
            sectionLabel: "Features",
            title: "Everything you need to cook Cameroonian",
            regionTitle: "Recipes by region",
            regionDesc:
                "Explore specialties from all 10 regions of Cameroon, from the Coast to the Far North.",
            searchTitle: "Smart search",
            searchDesc:
                "Filter by cooking time, spice level, and popular ingredients.",
            favTitle: "Favorites & Cookbook",
            favDesc:
                "Save your favorite recipes and create your own in your personal cookbook.",
            offlineTitle: "100% offline",
            offlineDesc:
                "No internet needed. All recipes are available without a connection.",
        },
        screenshots: {
            sectionLabel: "Preview",
            title: "A glimpse of Tchopé",
        },
        stats: {
            regions: "Regions of Cameroon",
            languages: "Languages (FR & EN)",
            free: "Free & offline",
        },
        popular: {
            sectionLabel: "Recipes",
            title: "The great classics of Cameroonian cuisine",
            viewAll: "Browse all 140 Cameroonian recipes →",
        },
        cta: {
            title: "Ready to tchoper?",
            subtitle:
                "Download the free Cameroonian recipes app and cook offline.",
            openWeb: "Open web version",
        },





        footer: {
            tagline: "Learn your language with koraa !",
            links: "Links",
            privacy: "Privacy Policy",
            madeWith: "Made with ❤️ in Cameroon",
            by: "By",
            rights: "© 2026 Koraa. All rights reserved."
        }
    }

}

type Dictionaries = typeof dictionaries

export type Dictionary = Dictionaries[Locale]

export function getDictionary(locale: Locale): Dictionary {
    return dictionaries[locale]
}

