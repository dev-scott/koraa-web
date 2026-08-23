import { getAllLanguageIds, getLanguageProfile } from "@/lib/languages-data"
import { isValidLocale, locales } from "@/lib/i18n"
import { absoluteUrl, languageAlternates, ogLocale, SITE_TWITTER } from "@/lib/seo"
import { notFound } from "next/navigation"
import LanguageProfileClient from "./client"

// ─── Static Params ────────────────────────────────────────────────
export async function generateStaticParams() {
  const params: { locale: string; langId: string }[] = []
  for (const locale of locales) {
    for (const langId of getAllLanguageIds()) {
      params.push({ locale, langId })
    }
  }
  return params
}

// ─── SEO Metadata ─────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; langId: string }>
}) {
  const { locale, langId } = await params
  const lang = getLanguageProfile(langId)
  if (!lang) return {}

  const isFr = locale !== "en"
  const name = lang.name
  const region = isFr ? lang.region_fr : lang.region_en
  const desc = isFr ? lang.description_fr : lang.description_en

  const title = isFr
    ? `Apprendre le ${name} — Langue africaine de ${region} | Koraa`
    : `Learn ${name} — African language of ${region} | Koraa`

  return {
    title,
    description: desc.slice(0, 160),
    keywords: isFr
      ? [name, region, "langue africaine", "apprendre", "koraa", lang.country]
      : [name, region, "african language", "learn", "koraa", lang.country],
    alternates: {
      canonical: absoluteUrl(isFr ? "fr" : "en", `languages/${langId}`),
      languages: languageAlternates(`languages/${langId}`),
    },
    openGraph: {
      title,
      description: desc.slice(0, 160),
      url: absoluteUrl(isFr ? "fr" : "en", `languages/${langId}`),
      locale: ogLocale(isFr ? "fr" : "en"),
      alternateLocale: isFr ? ["en_US"] : ["fr_FR"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc.slice(0, 160),
      creator: SITE_TWITTER,
      site: SITE_TWITTER,
    },
  }
}

// ─── Page Component (Server) ──────────────────────────────────────
export default async function LanguagePage({
  params,
}: {
  params: Promise<{ locale: string; langId: string }>
}) {
  const { locale, langId } = await params
  console.log("local and langId", locale, langId)

  if (!isValidLocale(locale)) notFound()

  const lang = getLanguageProfile(langId)
  if (!lang) notFound()

  return <LanguageProfileClient lang={lang} locale={locale} />
}
