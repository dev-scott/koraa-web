import { DEFAULT_OG_EN, DEFAULT_OG_FR } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({params}:{params:Promise<{locale: string}>}):Promise<Metadata> {

    const {locale} = await params
    const isFr = locale !=="en"
    const title =isFr ? "Politique de confidentialite":"Privacy policy"
    const description =isFr ? "Comment Koraa gère tes données. Aucun tracking, aucun envoi serveur. Tout reste sur ton appareil. ":"How Koraa handles your data. No tracking, no server. Everything stays on your device."
    const ogImage = isFr ? DEFAULT_OG_FR:DEFAULT_OG_EN
    const path = "/privacy"
    

    return {
        title: isFr ? "Koraa - Politique de confidentialité" : "Koraa - Privacy Policy",
        description: "Politique de confidentialité de Koraa",
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${locale === "en" ? "/en" : ""}${path}`,
        },
        openGraph: {
            title,
            description,
            url: `${process.env.NEXT_PUBLIC_BASE_URL}${locale === "en" ? "/en" : ""}${path}`,
            siteName: "Koraa - Apprendre les langues du Cameroun",
            images: [ogImage],
            locale: locale === "en" ? "en_US" : "fr_FR",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
            creator: "@koraapp",
        },
    }
}


export default function PrivacyLayout({children}: {children: React.ReactNode}) {
    return (
        <>{children}</>
    );
}