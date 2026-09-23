"use client";

import { useParams } from "next/navigation";
import { translations, defaultLocale, type Locale } from "@/i18n/translation";

// 語言現在來自網址(/en、/zh、/jp),伺服器與客戶端第一次渲染就已經一致,
// 不再需要水合後才切換,也不再需要 zustand 或 localStorage。
export function useTranslation() {
  const params = useParams<{ lang: string }>();
  const lang = (params?.lang as Locale) ?? defaultLocale;
  return translations[lang] ?? translations[defaultLocale];
}
