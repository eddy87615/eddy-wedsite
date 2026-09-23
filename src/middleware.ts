import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/i18n/translation";

// 依瀏覽器的 Accept-Language 猜使用者想要哪個語言,猜不到就用預設語言
function detectLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language") ?? "";

  for (const locale of locales) {
    // 日文的語言代碼是 "ja",但這個專案的路徑代碼是 "jp",特別對應一下
    const tag = locale === "jp" ? "ja" : locale;
    if (acceptLanguage.toLowerCase().includes(tag)) {
      return locale;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // 排除 /studio、Next.js 內部路徑、以及帶副檔名的靜態檔案(圖片、favicon 等)
  matcher: ["/((?!studio|_next|api|.*\\..*).*)"],
};
