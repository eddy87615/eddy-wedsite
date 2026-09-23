import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Noto_Sans,
  Noto_Sans_JP,
  Noto_Sans_TC,
  Geist_Mono,
} from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";

// 英文一律用 PP Mori,不管切到哪個語言都排在字型堆疊最前面(見 globals.css 的 --font-dynamic)
const ppMori = localFont({
  src: [
    {
      path: "../../../public/font/PPMori-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/font/PPMori-ExtralightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../../public/font/PPMori-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/font/PPMori-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/font/PPMori-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/font/PPMori-SemiBoldItalic.otf",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-pp-mori",
  display: "swap",
});
import Navigation from "@/components/Navigation";
import LanguageSelector from "@/components/LanguageSelector";
import { locales, type Locale } from "@/i18n/translation";
import Footer from "@/components/Footer";

const notoSans = Noto_Sans({
  variable: "--font-en",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-jp",
  subsets: ["latin"],
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-zh",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EDDY'S WEBSITE",
  description: "This is Eddy's personal website.",
};

// 讓 en/zh/jp 三個語言頁面在 build 時就先產生好
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// 這是整個網站唯一的 root layout(有 <html>、<body>),
// /studio 是完全獨立的另一個 root layout,見 app/studio/layout.tsx
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // 網址不是 en/zh/jp 之一,直接顯示 404,而不是渲染出錯的畫面
  if (!locales.includes(lang as Locale)) {
    notFound();
  }

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${ppMori.variable} ${notoSans.variable} ${notoSansJP.variable} ${notoSansTC.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full min-w-full p-4 text-eddy-text sm:p-(--universal-padding)"
      >
        <Navigation />
        <LanguageSelector />
        {children}
        <Footer />
      </body>
    </html>
  );
}
