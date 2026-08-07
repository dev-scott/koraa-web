"use client"

import { useLocal } from "@/lib/locale-context";
import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";



export default function Header() {


    const { locale, t, switchLocal } = useLocal()
    const [mobileOpen, setMobileOpen] = useState(false)

    const navItems = [
        { label: t.nav.features, href: "/#features" },
        { label: t.nav.screenshots, href: "/#screenshots" },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-10">

            <div className=" mx-auto max-w-6xl px-5 pt-5 bg-primary`">

                <div 
                // className="rounded-xl lg:rounded-full border border-foreground/5 bg-surface p-5 py-5 shadow-lg shadow-foreground/5 backdrop-blur-xl"
                >

                    <div className="flex justify-between items-center">

                        <Link href={`${locale}`} className=" flex items-center gap-2">

                            <Image
                                src="/brand/logo.png"
                                alt="Koraa"
                                width={45}
                                height={45}
                                className="rounded-[8px]"
                            />
                            <div className="">
                                <span className="text-lg font-extrabold tracking-tight text-foreground">Koraa</span>
                            </div>

                        </Link>

                        {/* Desktop nav */}

                        <nav className="hidden lg:flex gap-1 items-center ">
                            {navItems.map((item) => (
                                <a key={item.href} href={item.href} className=" rounded-lg py-2 px-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground">
                                    {item.label}
                                </a>
                            ))}

                            <button onClick={switchLocal} className=" cursor-pointer ml-3 flex items-center gap-2 rounded-full border border-foreground/10 px-2 py-1.5  text-xs font-semibold text-foreground/80 transition-all hover:border-foreground/20 hover:text-primary">
                                <Globe className="size-3" />
                                {locale == "fr" ? "EN" : "FR"}
                            </button>
                            <Link href={`${locale}/app`} className="  rounded-lg bg-secondary px-5 py-2 text-sm font-semibold text-surface transition-all hover:brightness-110 ">

                                {t.nav.openApp}

                            </Link>

                            <a href={`${locale}#download`} className="ml-1 rounded-lg bg-foreground px-5 py-2 text-sm font-semibold text-surface transition-all hover:bg-foreground/90">
                                {t.nav.download}
                            </a>
                        </nav>

                    </div>


                </div>



            </div>


        </header>
    );
}