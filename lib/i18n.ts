export type Locale = "fr" | "en"

export const locales:Locale[] = ["fr", "en"]
export const defaultLocale:Locale = "fr"

export function isValidLocale(value:string):value is Locale{
    return locales.includes(value as Locale)
}

const dictionaries = {

    fr:{
        nav:{
            features:"Fonctionnalités",
            screenshots:"Aperçu",
            download:"Télécharger",
            openApp: "Ouvrir l'app",
        },
        footer:{
            tagline:"Apprend ta langue avec koraa",
            links:"Liens",
            privacy:"Politique de confidentialité",
            madeWith:"Fait avec ❤️ au Cameroun",
            by:"Par",
            rights:"© 2026 Koraa. Tous droits réservés."
        }


    },
    en:{
        nav:{
            features:"Features",
            screenshots:"Screenshots",
            download:"Download",
            openApp: "Open app",
        },
        footer:{
            tagline:"Learn your language with koraa !",
            links:"Links",
            privacy:"Privacy Policy",
            madeWith:"Made with ❤️ in Cameroon",
            by:"By",
            rights:"© 2026 Koraa. All rights reserved."
        }
    }

}

type Dictionaries  = typeof dictionaries

export type Dictionary = Dictionaries[Locale]

export function getDictionary(locale:Locale):Dictionary{
    return dictionaries[locale]
}

