"use client"

import { useLocal } from "@/lib/locale-context";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen, Globe, Menu, Sparkles, Volume2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const { locale, t, switchLocal } = useLocal()
    const [mobileOpen, setMobileOpen] = useState(false)

    const navItems = [
        { label: t.nav.features, href: "#features" },
        { label: t.nav.languages, href: "#languages" },
        { label: "Méthode", href: "#workflow" },
        { label: t.nav.screenshots, href: "#screenshots" },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                    {/* BLOCK 1: Left Brand Logo Pill */}
                    <Link
                        href={`/${locale}`}
                        className="group flex items-center gap-3 rounded-full border border-foreground/10 bg-surface/90 px-4 py-2.5 shadow-md backdrop-blur-xl transition-all hover:border-primary/40 hover:bg-surface"
                    >
                        <div className="relative overflow-hidden rounded-xl bg-primary p-0.5 shadow-sm">
                            <Image
                                src="/brand/logo.png"
                                alt="Koraa Logo"
                                width={32}
                                height={32}
                                className="rounded-[8px] bg-white object-cover"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-black tracking-tight text-foreground">
                                Koraa
                            </span>
                            <span className="hidden sm:inline-flex items-center rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-bold text-secondary">
                                <Sparkles className="mr-0.5 size-2.5" />
                                Languages
                            </span>
                        </div>
                    </Link>

                    {/* BLOCK 2: Center Segmented Navigation Pills (Desktop) */}
                    <nav className="hidden items-center gap-1 rounded-full border border-foreground/10 bg-surface/90 px-3 py-1.5 shadow-md backdrop-blur-xl md:flex">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="rounded-full px-4 py-1.5 text-xs font-bold text-foreground/80 transition-all hover:bg-primary/10 hover:text-primary"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* BLOCK 3: Right Quick Actions (Desktop & Mobile trigger) */}
                    <div className="flex items-center gap-2">
                        {/* Language Switcher Button */}
                        <button
                            type="button"
                            onClick={switchLocal}
                            className="hidden sm:flex cursor-pointer items-center gap-1.5 rounded-full border border-foreground/10 bg-surface/90 px-3 py-2 text-xs font-bold text-foreground shadow-md backdrop-blur-xl transition-all hover:border-primary/40 hover:text-primary"
                        >
                            <Globe className="size-3.5 text-secondary" />
                            <span className="uppercase">{locale === "fr" ? "EN" : "FR"}</span>
                        </button>

                        {/* Open App CTA Button */}
                        <Link
                            href={`/${locale}/app`}
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
                        >
                            <span>{t.nav.openApp}</span>
                            <ArrowRight className="size-3.5" />
                        </Link>

                        {/* Mobile Drawer Toggle */}
                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="flex size-9 items-center justify-center rounded-full border border-foreground/10 bg-surface/90 text-foreground shadow-md backdrop-blur-xl md:hidden"
                            aria-label="Toggle Menu"
                        >
                            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.2 }}
                        className="mx-4 mt-3 overflow-hidden rounded-3xl border border-foreground/10 bg-surface/95 p-6 shadow-2xl backdrop-blur-2xl md:hidden"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    Navigation Koraa
                                </span>
                                <button
                                    type="button"
                                    onClick={switchLocal}
                                    className="flex items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1 text-xs font-bold text-foreground"
                                >
                                    <Globe className="size-3 text-secondary" />
                                    <span className="uppercase">{locale === "fr" ? "EN" : "FR"}</span>
                                </button>
                            </div>

                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-xl px-4 py-3 text-sm font-bold text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                                >
                                    {item.label}
                                </a>
                            ))}

                            <div className="my-1 h-px w-full bg-foreground/10" />

                            <Link
                                href={`/${locale}/app`}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-center text-sm font-bold text-white shadow-md"
                            >
                                <span>{t.nav.openApp}</span>
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}