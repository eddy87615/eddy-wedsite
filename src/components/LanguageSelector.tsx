"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { defaultLocale, type Locale } from "@/i18n/translation";

const languages = [
  {
    code: "en",
    label: "English",
    flag: "/English.svg",
    toggle: "Switch to English",
  },
  {
    code: "jp",
    label: "日本語",
    flag: "/Japanese.svg",
    toggle: "日本語に切り替え",
  },
  { code: "zh", label: "中文", flag: "/Chinese.svg", toggle: "切换到中文" },
] as const;

// 把目前網址的語言段換成另一個語言,其餘路徑(例如 /en/about-me)保留不變
function replaceLocale(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/") || "/";
}

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams<{ lang: string }>();
  const language = (params?.lang as Locale) ?? defaultLocale;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((lang) => lang.code === language);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed right-5 bottom-5 z-5" ref={dropdownRef}>
      <div
        inert={!isOpen}
        className={`absolute right-0 bottom-full mb-2 grid w-full min-w-6 border border-solid border-eddy-black bg-eddy-bg transition-[grid-template-rows,visibility] duration-300 motion-reduce:transition-none ${
          isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="flex flex-col">
            {languages.map((lang) => (
              <li key={lang.code}>
                <Link
                  href={replaceLocale(pathname, lang.code)}
                  className={`flex min-h-6 min-w-6 justify-between gap-4 p-3 ${language === lang.code ? "active" : ""}`}
                  onClick={() => setIsOpen(false)}
                  aria-label={lang.toggle}
                >
                  <Image
                    src={lang.flag}
                    width={20}
                    height={20}
                    alt={`${lang.label} flag`}
                  />
                  {/* <span>{lang.label}</span> */}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        className="flex min-h-6 min-w-6 items-center justify-between gap-1 border border-solid border-eddy-black p-3"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={currentLang?.toggle}
      >
        <Image
          src={currentLang?.flag || "/images/taiwan.png"}
          width={20}
          height={20}
          alt={`${currentLang?.label} flag`}
        />
        {/* <span className="ml-auto">{currentLang?.label}</span> */}
        {/* <svg
          className={`duration-200 ${isOpen ? "rotate-180" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg> */}
      </button>
    </div>
  );
}
