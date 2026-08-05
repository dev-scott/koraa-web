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


    },
    en:{
        nav:{
            features:"Features",
            screenshots:"Screenshots",
            download:"Download",
            openApp: "Open app",
        },
    }

}

type Dictionaries  = typeof dictionaries

export type Dictionary = Dictionaries[Locale]

export function getDictionary(locale:Locale):Dictionary{
    return dictionaries[locale]
}

