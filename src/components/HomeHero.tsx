"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { useTranslation } from "@/i18n/useTranslation";

export default function HomeHero() {
  const t = useTranslation();
  // 翻譯裡用 \n 標記原本要換行的地方,這裡把它拆開,中間補回原本的 <br>
  const titleLines = t.home["home-title"].split("\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col"
    >
      <h1 className="home-title w-full">
        {titleLines.map((line, i) => (
          <Fragment key={i}>
            {line}
            {i < titleLines.length - 1 && (
              <br className="hidden xl:[html[lang^=jp]_&]:block" />
            )}
          </Fragment>
        ))}
      </h1>
      <p className="text-[clamp(1rem,-1.5rem+6.25vw,2.5rem)] font-thin">
        {t.home["home-title03"]}
      </p>
    </motion.div>
  );
}
