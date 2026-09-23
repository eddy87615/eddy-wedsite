"use client";

import Image from "next/image";
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

type NavLink = {
  href: string;
  labelKey: keyof Omit<Translations["navigation"], "logo-alt">;
};

const navigationLinks: NavLink[] = [
  { href: "about-me", labelKey: "about-me" },
  { href: "post-and-projects", labelKey: "post-and-projects" },
];

export default function Navigation() {
  const t = useTranslation();
  const params = useParams<{ lang: string }>();
  const lang = (params?.lang as Locale) ?? defaultLocale;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <motion.nav
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="uppercase fixed z-50 top-0 left-0 p-(--universal-padding) w-full max-md:h-0 max-md:p-0"
    >
      <div className="md:flex hidden justify-between items-center">
        <Link href={`/${lang}`} aria-label={t.navigation["logo-alt"]}>
          <Image
            src="/EC-logo.svg"
            alt={t.navigation["logo-alt"]}
            height={40}
            width={94}
            className="h-10 w-auto"
          />
        </Link>
        <div className="flex gap-8 sm:gap-12">
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
      </div>
      <div className="md:hidden fixed z-50 top-0 left-0 w-full p-5 flex justify-between">
        <Link
          href={`/${lang}`}
          aria-label={t.navigation["logo-alt"]}
          className="md:hidden block"
        >
          <Image
            src="/EC-logo.svg"
            alt={t.navigation["logo-alt"]}
            height={60}
            width={94}
            className="h-10 w-auto md:h-15"
          />
        </Link>
        <button
          aria-label={
            isOpen ? t.navigation["close-menu"] : t.navigation["open-menu"]
          }
          className="md:hidden flex flex-col justify-center items-end gap-2 w-10 h-10"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block w-full h-px bg-eddy-black"></span>
          <span
            className={`block h-px bg-eddy-black transition-[width] duration-500 ${isOpen ? "w-1/2" : "w-full"}`}
          ></span>
          <span
            className={`block h-px bg-eddy-black transition-[width] duration-500 ${isOpen ? "w-full" : "w-1/2"}`}
          ></span>
        </button>
        <div
          inert={!isOpen}
          className={`md:hidden flex flex-col justify-start p-5 pt-30 w-full z-[-1] h-screen absolute top-0 left-0 bg-eddy-bg transition-all duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
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
              >
                {t.navigation[link.labelKey]}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
