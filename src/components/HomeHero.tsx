"use client";

import { motion } from "motion/react";
import { useTranslation } from "@/i18n/useTranslation";

export default function HomeHero() {
  const t = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col"
    >
      <h1 className="home-title w-full md:w-[70vw]">
        {t.home["home-title01"]}
        <br className="hidden [html[lang^=jp]_&]:block" />
        {t.home["home-title02"]}
      </h1>
      <p className="text-[clamp(1rem,-1.5rem+6.25vw,2.5rem)] font-thin">
        {t.home["home-title03"]}
      </p>
    </motion.div>
  );
}
