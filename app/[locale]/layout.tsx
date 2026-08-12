import { isValidLocale, Locale, locales } from "@/lib/i18n";
import { LocalProvider } from "@/lib/locale-context";
import { DEFAULT_OG_EN, DEFAULT_OG_FR, languageAlternates, ogLocale, organizationJsonLd, SITE_TWITTER, SITE_URL, websiteJsonLd } from "@/lib/seo";
import { notFound } from "next/navigation";


export async function generateStaticParams (){
    return locales.map((locale)=>({locale}))
}



export async function generateMetadata({params}: {params:Promise<{locale:string}>}){
  const {locale} = await params

 const isFr = locale !=="en"

 const title = isFr ? "Koraa - Apprends ta langue maternelle":"Koraa - Learn your mother tongue"

 const description = isFr ? "Apprends le ghomala et d'autres langues maternelles africaines, avec l'anglais comme langue pont. 100% gratuit, 100% hors ligne.":"Learn Ghomala and other African mother tongues with English as the bridge language. 100% free, 100% offline."

 const shortDescription = isFr ? "Apprends le ghomala et d'autres langues maternelles africaines, avec l'anglais comme langue pont. 100% gratuit, 100% hors ligne.":"Learn Ghomala and other African mother tongues with English as the bridge language. 100% free, 100% offline."
 const ogImage = isFr ? DEFAULT_OG_FR : DEFAULT_OG_EN


  return {

    title:{},
    description,
    keywords:isFr ?["languee africaines","patois" , "langue","village","afrique","apprendre les lanues","ghomala"]:["African languages","dialect", "language","village","africa","learn languages","ghomala"],
    alternates:{
        canonical:`${locale}`,
        languages:languageAlternates("")
    },
    openGraph:{
        title:title,
        description:description,
        url:`${SITE_URL}/${locale}`,
        locale:ogLocale(locale==="en"?"en":"fr"),
      alternateLocale: isFr ? ["en_US"] : ["fr_FR"],
        type:"website",
        images:[
            {
                url:ogImage,
            with:1536,
            height:1024,
            alt:title,
            }
        ],
    },

    twitter:{
         card: "summary_large_image",
      title,
      description: shortDescription,
      images: [ogImage],
      creator: SITE_TWITTER,
      site: SITE_TWITTER,
    }
    
  }


}



export default async function LocaleLayout({children,params}: {children: React.ReactNode , params:Promise<{locale:string}>}) {

    

    const {locale} = await params
    if(!isValidLocale(locale)) {
        notFound()
    }

    const typedLocale = locale as Locale

    return (
        <LocalProvider locale={typedLocale}>

            <script
              id="ld-website"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(websiteJsonLd(typedLocale)),
              }}
            />
            <script
              id="ld-organization"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationJsonLd()),
              }}
            />
        
            {children}
        </LocalProvider>
    );
}