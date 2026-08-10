"use client"

import { useLocal } from "@/lib/locale-context";
import { ArrowRight, Globe, Heart, Languages, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const { t, locale } = useLocal()

    return (
        <footer className="relative bg-[#0e0c1f] text-white border-t border-white/10">
            {/* LEVEL 1: Top Community Banner Box */}
            <div className="border-b border-white/10 bg-[#14112b] py-10">
                <div className="mx-auto max-w-6xl px-6 flex flex-col items-center justify-between gap-6 md:flex-row text-center md:text-left">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-3 py-1 text-xs font-bold text-secondary">
                            <Sparkles className="size-3" />
                            <span>Mission Patrimoine</span>
                        </div>
                        <h3 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
                            {t.footer.communityTitle}
                        </h3>
                        <p className="mt-1 max-w-xl text-xs text-white/70">
                            {t.footer.communityDesc}
                        </p>
                    </div>

                    <Link
                        href={`/${locale}/app`}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-secondary px-6 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-secondary/90 hover:scale-105"
                    >
                        <span>Transmettre mon savoir</span>
                        <ArrowRight className="size-3.5" />
                    </Link>
                </div>
            </div>

            {/* LEVEL 2: Main Grid Footer */}
            <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-8">
                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
                    {/* Column 1: Brand Info */}
                    <div className="sm:col-span-1">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-white/10 p-1">
                                <Image
                                    src="/brand/logo.png"
                                    alt="Koraa"
                                    width={36}
                                    height={36}
                                    className="rounded-[8px]"
                                />
                            </div>
                            <span className="text-xl font-black tracking-tight text-white">
                                Koraa
                            </span>
                        </div>
                        <p className="mt-3 text-xs leading-relaxed text-white/70">
                            {t.footer.tagline}
                        </p>
                    </div>

                    {/* Column 2: Langues Populaires */}
                    <div className="flex flex-col gap-2.5">
                        <p className="text-xs font-black uppercase tracking-widest text-secondary">
                            Langues Phares
                        </p>
                        <span className="text-xs text-white/70">Ghomala' (Ouest)</span>
                        <span className="text-xs text-white/70">Duala (Littoral)</span>
                        <span className="text-xs text-white/70">Bassa (Centre-Littoral)</span>
                        <span className="text-xs text-white/70">Ewondo (Centre-Sud)</span>
                        <span className="text-xs text-white/70">Fulfulde & Swahili</span>
                    </div>

                    {/* Column 3: Navigation Quick Links */}
                    <div className="flex flex-col gap-2.5">
                        <p className="text-xs font-black uppercase tracking-widest text-secondary">
                            {t.footer.links}
                        </p>
                        <a href="#features" className="text-xs text-white/70 transition-colors hover:text-white">
                            {t.nav.features}
                        </a>
                        <a href="#languages" className="text-xs text-white/70 transition-colors hover:text-white">
                            {t.footer.languagesLink}
                        </a>
                        <a href="#workflow" className="text-xs text-white/70 transition-colors hover:text-white">
                            Méthode
                        </a>
                        <a href="#screenshots" className="text-xs text-white/70 transition-colors hover:text-white">
                            {t.nav.screenshots}
                        </a>
                        <Link href={`/${locale}/privacy`} className="text-xs text-white/70 transition-colors hover:text-white">
                            {t.footer.privacy}
                        </Link>
                    </div>

                    {/* Column 4: Author & Legal */}
                    <div className="flex flex-col gap-2.5">
                        <p className="text-xs font-black uppercase tracking-widest text-secondary">
                            Projet & Crédits
                        </p>
                        <p className="text-xs text-white/80">{t.footer.madeWith}</p>
                        <div className="mt-1 flex flex-col text-xs">
                            <span className="text-white/50">{t.footer.by}</span>
                            <a
                                href="https://dev-scott.me"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-0.5 inline-flex items-center gap-1 font-bold text-secondary hover:underline"
                            >
                                dev-scott.me
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Rights */}
                <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row text-xs text-white/50">
                    <p>{t.footer.rights}</p>
                    <div className="flex items-center gap-4">
                        <span>Plateforme éducative pour les langues africaines</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}