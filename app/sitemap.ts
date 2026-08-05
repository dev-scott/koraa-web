import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

const LOCALES = ["fr", "en"] as const

function altLanguages(path: string) {
  return {
    fr: `${SITE_URL}/fr${path}`,
    en: `${SITE_URL}/en${path}`,
    "x-default": `${SITE_URL}/fr${path}`,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const publicStaticPages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
    { path: "/app", priority: 0.9, changeFrequency: "weekly" },
    { path: "/app/search", priority: 0.7, changeFrequency: "weekly" },
    { path: "/app/cookbook", priority: 0.6, changeFrequency: "weekly" },
  ]

  const staticEntries = LOCALES.flatMap((locale) =>
    publicStaticPages.map((page) => ({
      url: `${SITE_URL}/${locale}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages: altLanguages(page.path) },
    }))
  )



  return [...staticEntries, ]
}