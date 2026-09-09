import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Patrick_Hand } from "next/font/google";
import "./globals.css";
import { DEFAULT_OG_FR, SITE_NAME, SITE_URL } from "@/lib/seo";
import Toaster from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans", 
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-patrick-hand",
});



const metadata:Metadata={
  metadataBase: new URL(SITE_URL),
  applicationName:SITE_NAME,
  title:{
    default:"Koraa - Apprends ta langue maternelle",
    template:"%s - Koraa",
  },
  description:"Apprends le ghomala et d'autres langues maternelles africaines, avec l'anglais comme langue pont. 100% gratuit, 100% hors ligne.",
  openGraph:{
    title:"Koraa - Apprends ta langue maternelle",
    description:"Apprends le ghomala et d'autres langues maternelles africaines, avec l'anglais comme langue pont. 100% gratuit, 100% hors ligne.",
    url:"/",
    siteName:SITE_NAME,
    images:[
      {
        url:DEFAULT_OG_FR,
        width:1200,
        height:630,
        alt:"Koraa - Apprends ta langue maternelle"
      }
    ],
    locale:"fr_FR"
  },
  authors:[{name:"Dev-scott",url:"https:dev-scott.me"}],
  creator:"Dev-scott",
  publisher:SITE_NAME,
  formatDetection:{
    telephone:false,
    email:false,
    address:false,
  },
  icons:{
    icon:[
      {url:"/favicon.ico",sizes:"any"},
      {url:"/brand/logo.png",type:"image/png"},
    ],
    apple:[{url:"/brand/logo.png",sizes:"180x180",type:"image/png"}],
    shortcut:"/favicon.ico"
  },
  manifest:"/manifest.webmanifest",
  robots:{
    index:true,
    follow:true,
    googleBot:{
      index:true,
      follow:true,
       "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates:{
    canonical:"/",
    languages:{
      fr:"/fr",
      en:"/en",
      "x-default":"/fr"
    }
  }
}

export const viewport:Viewport={
  width:"device-with",
  initialScale:1,
  maximumScale:5,
  themeColor:[
   { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ]
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr" suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${patrickHand.variable} ${patrickHand.className}`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster/>
        <Analytics/>
        <SpeedInsights/>
        
        </body>
    </html>
  );
}
