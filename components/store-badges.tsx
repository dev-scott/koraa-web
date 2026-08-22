"use client"

import { storeLinks } from "@/lib/store-links"
import { useLocal } from "@/lib/locale-context"

const AndroidIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0">
    <path d="M17.523 15.341A5.45 5.45 0 0 0 18 13.1V10.9a5.45 5.45 0 0 0-.477-2.241L19.4 6.78a.5.5 0 0 0-.2-.68l-.87-.5a.5.5 0 0 0-.68.2l-1.87 1.86A5.47 5.47 0 0 0 13 7H11a5.47 5.47 0 0 0-2.78.66L6.35 5.8a.5.5 0 0 0-.68-.2l-.87.5a.5.5 0 0 0-.2.68l1.877 1.88A5.45 5.45 0 0 0 6 10.9v2.2c0 .8.17 1.56.477 2.241L4.6 17.22a.5.5 0 0 0 .2.68l.87.5a.5.5 0 0 0 .68-.2l1.87-1.86A5.47 5.47 0 0 0 11 17h2a5.47 5.47 0 0 0 2.78-.66l1.87 1.86a.5.5 0 0 0 .68.2l.87-.5a.5.5 0 0 0 .2-.68l-1.877-1.879zM10 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
  </svg>
)

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
  </svg>
)

export function StoreBadges({ className }: { className?: string }) {
  const { locale } = useLocal()

  const isFr = locale === "fr"

  const firebaseAndroid = !!storeLinks.firebaseAndroid
  const githubRelease = !!storeLinks.githubRelease

  if (!firebaseAndroid && !githubRelease) return null

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>
      {firebaseAndroid && (
        <a
          href={storeLinks.firebaseAndroid!}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl border border-[#4CAF50]/30 bg-[#4CAF50]/10 px-4 py-2.5 text-sm font-bold text-[#4CAF50] shadow-sm transition-all duration-300 hover:bg-[#4CAF50]/20 hover:border-[#4CAF50]/60 hover:shadow-[0_0_16px_rgba(76,175,80,0.25)] hover:scale-[1.03] active:scale-95"
        >
          <AndroidIcon />
          <span className="flex flex-col leading-none">
            <span className="text-[9px] font-semibold uppercase tracking-widest opacity-70">
              {isFr ? "Bêta Android" : "Android Beta"}
            </span>
            <span className="text-[13px]">Firebase</span>
          </span>
          {/* Beta badge */}
          <span className="absolute -right-1 -top-1 rounded-full bg-amber-400 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wide text-black shadow">
            BETA
          </span>
        </a>
      )}
      {githubRelease && (
        <a
          href={storeLinks.githubRelease!}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl border border-blue-400/30 bg-blue-400/10 px-4 py-2.5 text-sm font-bold text-blue-400 shadow-sm transition-all duration-300 hover:bg-blue-400/20 hover:border-blue-400/60 hover:shadow-[0_0_16px_rgba(96,165,250,0.25)] hover:scale-[1.03] active:scale-95"
        >
          <AndroidIcon />
          <span className="flex flex-col leading-none">
            <span className="text-[9px] font-semibold uppercase tracking-widest opacity-70">
              {isFr ? "Bêta Android" : "Android Beta"}
            </span>
            <span className="text-[13px]">Github Release</span>
          </span>
          {/* Beta badge */}
          <span className="absolute -right-1 -top-1 rounded-full bg-amber-400 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wide text-black shadow">
            BETA
          </span>
        </a>
      )}
    </div>
  )
}