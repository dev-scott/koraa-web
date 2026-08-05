import { isValidLocale, Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";



export default async function LocaleLayout({children,params}: {children: React.ReactNode , params:Promise<{locale:string}>}) {


    const {locale} = await params
    if(!isValidLocale(locale)) {
        notFound()
    }

    const typedLocale = locale as Locale

    return (
        <section>
            {children}
        </section>
    );
}