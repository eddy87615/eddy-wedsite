"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "@/i18n/useTranslation";
import {
  defaultLocale,
  type Locale,
  type Translations,
} from "@/i18n/translation";
import Logo from "@/components/Logo";

type NavLink = {
  href: string;
  labelKey: keyof Omit<Translations["navigation"], "logo-alt">;
};

const navigationLinks: NavLink[] = [
  { href: "about-me", labelKey: "about-me" },
  { href: "posts-and-projects", labelKey: "post-and-projects" },
];

export default function Navigation() {
  const t = useTranslation();
  const params = useParams<{ lang: string }>();
  const lang = (params?.lang as Locale) ?? defaultLocale;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <motion.nav
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 z-50 flex w-full items-center justify-between p-4 uppercase sm:p-(--universal-padding)"
    >
      <Link
        href={`/${lang}`}
        aria-label={t.navigation["logo-alt"]}
        className="hidden xs:block"
      >
        <Logo className="h-8 w-auto text-eddy-text mix-blend-difference" />
      </Link>
      <div className="hidden gap-4 text-eddy-text mix-blend-difference xs:flex sm:gap-12">
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={`/${lang}/${link.href}`}
            aria-label={t.navigation[link.labelKey]}
          >
            {t.navigation[link.labelKey]}
          </Link>
        ))}
      </div>
      <div className="fixed top-0 left-0 z-50 flex w-full justify-between p-4 xs:hidden">
        <Link
          href={`/${lang}`}
          aria-label={t.navigation["logo-alt"]}
          className="flex items-center"
        >
          <Logo className="h-8 w-auto text-eddy-text mix-blend-difference" />
        </Link>
        <button
          aria-label={
            isOpen ? t.navigation["close-menu"] : t.navigation["open-menu"]
          }
          className="flex h-10 w-10 flex-col items-end justify-center gap-2 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block h-px w-full bg-eddy-text mix-blend-difference"></span>
          <span
            className={`block h-px bg-eddy-text mix-blend-difference transition-[width] duration-500 ${isOpen ? "w-1/2" : "w-full"}`}
          ></span>
          <span
            className={`block h-px bg-eddy-text mix-blend-difference transition-[width] duration-500 ${isOpen ? "w-full" : "w-1/2"}`}
          ></span>
        </button>
      </div>
      <div
        inert={!isOpen}
        className={`absolute top-0 left-0 z-[-1] flex h-screen w-full flex-col justify-start bg-eddy-bg p-5 pt-30 transition-all duration-500 md:hidden ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        {navigationLinks.map((link, index) => (
          <motion.div
            key={link.href}
            initial={false}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{
              duration: 0.3,
              delay: isOpen ? 0.15 + index * 0.08 : 0,
            }}
          >
            <Link
              href={`/${lang}/${link.href}`}
              aria-label={t.navigation[link.labelKey]}
              className="block py-4"
              onClick={() => setIsOpen(false)}
            >
              {t.navigation[link.labelKey]}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.nav>
  );
}
