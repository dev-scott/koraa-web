"use client"

import { useLocal } from "@/lib/locale-context";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {

    const { t, locale } = useLocal()


    return (
        <footer className="bg-dark text-foreground ">

            <div className="mx-auto max-w-6xl px-5 pt-16 pb-4">
                <div className="grid gap-12 md:grid-cols-3">

                    <div>
                        <div className="flex items-center gap-2.5">
                            <Image
                                src="/brand/logo.png"
                                alt="Koraa"
                                width={30}
                                height={30}
                                className="rounded-[8px]"
                            />

                            <span className="text-lg font-extrabold tracking-tight">
                                Koraa
                            </span>
                        </div>
                        <p className="mt-3 max-w-xs text-sm leading-relaxed text-dark">
                            {t.footer.tagline}
                        </p>
                    </div>


                    <div className="flex flex-col gap-3">

                        <p className=" mb-1 text-sm font-extrabold uppercase tracking-widest text-dark">
                            {t.footer.links}
                        </p>

                        <Link
                            href={`/${locale}/privacy`}
                            className="text-sm text-dark-muted transition-colors hover:text-white"
                        >
                            {t.footer.privacy}
                        </Link>
                        <a
                            href="https://github.com/ln-dev7/tchope"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-dark-muted transition-colors hover:text-white"
                        >
                            GitHub
                        </a>

                    </div>


                    <div className="flex flex-col gap-3 md:items-end">

                        <p className="text-sm text-foreground">{t.footer.madeWith}</p>
                        <p className="text-sm text-foreground">{t.footer.by}</p>
                        <a
                            href="https://lndev.me"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-foreground transition-colors hover:text-primary"
                        >
                            dev-scott.me
                        </a>

                    </div>

                </div>
                <div className="mt-14 border-t border-foreground pt-6 text-center text-xs text-foreground">
                    {t.footer.rights}
                </div>
            </div>

        </footer>
    );
}