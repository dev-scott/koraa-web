"use client"

import { createContext, ReactNode, useContext, useEffect } from "react"
import { Dictionary, Locale, getDictionary } from "./i18n"
import { usePathname, useRouter } from "next/navigation"

type LocalContextType = {
    locale: Locale
    t: Dictionary
    switchLocal: () => void
}

const LocaleContext = createContext<LocalContextType | null>(null)

export function LocalProvider({ locale, children }: { locale: Locale, children: ReactNode }) {

    const t = getDictionary(locale)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {

        document.documentElement.lang = locale

    }, [locale])

    const switchLocal = () => {
        const nextLocal = locale === "fr" ? "en" : "fr"
        const newPathname = pathname.replace(`${locale}`, nextLocal)
        router.push(newPathname);

    }

    return (
        <LocaleContext value={{ locale, t, switchLocal }}>
            {children}
        </LocaleContext>

    )




}


export function useLocal() {
    const context = useContext(LocaleContext)
    if (!context) {
        throw new Error("useContext must be use inside a LocalProvider")
    }
    return context
}


