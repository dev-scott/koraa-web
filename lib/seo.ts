export const SITE_URL = "https://koraa.dev-scott.me"
export const SITE_NAME="Koraa"
export const SITE_TWITTER = "@koraa_africa"
export const ORG_NAME="Koraa"
export const ORG_LOGO = `${SITE_URL}/brand/logo-with-name.png`
export const DEFAULT_OG_FR=`${SITE_URL}/brand/banner-fr.png`
export const DEFAULT_OG_EN=`${SITE_URL}/brand/banner-en.png`

export const TITLE_FR="Koraa - Apprends ta langue maternelle"
export const TITLE_EN="Koraa - Learn your mother tongue"
export const DESCRIPTION_FR="Apprends le ghomala et d'autres langues maternelles africaines, avec l'anglais comme langue pont. 100% gratuit, 100% hors ligne."
export const DESCRIPTION_EN="Learn Ghomala and other African mother tongues with English as the bridge language. 100% free, 100% offline."


export type AppLocale = "fr"|"en"


export function localePath(locale: AppLocale, path: string = ""): string {
  const clean = path.startsWith("/") ? path : path ? `/${path}` : ""
  return `/${locale}${clean}`
}

export function absoluteUrl(locale: AppLocale, path: string = ""): string {
  return `${SITE_URL}${localePath(locale, path)}`
}

export function languageAlternates(path: string = ""): Record<string, string> {
  return {
    fr: localePath("fr", path),
    en: localePath("en", path),
    "x-default": localePath("fr", path),
  }
}

export function ogLocale(locale: AppLocale): string {
  return locale === "fr" ? "fr_FR" : "en_US"
}

export function htmlLang(locale: AppLocale): string {
  return locale === "fr" ? "fr-FR" : "en-US"
}

export function isoDuration(minutes: number): string {
  if (!minutes || minutes <= 0) return "PT0M"
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours && mins) return `PT${hours}H${mins}M`
  if (hours) return `PT${hours}H`
  return `PT${mins}M`
}





export function websiteJsonLd(locale: AppLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/${locale}/app/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: SITE_URL,
    logo: ORG_LOGO,
    sameAs: [],
  }
}


export function videoListJsonLd(input: {
  recipeName: string
  url: string
  videos: { id: string; title: string }[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.recipeName,
    url: input.url,
    itemListElement: input.videos.map((v, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "VideoObject",
        name: v.title,
        embedUrl: `https://www.youtube.com/embed/${v.id}`,
        contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
        thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
        uploadDate: "2026-01-01",
        description: input.recipeName,
      },
    })),
  }
}