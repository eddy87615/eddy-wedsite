"use client";

import Link from "next/link";
import { motion } from "motion/react";

interface UpdateCardProps {
  href: string;
  label: string;
  title: string;
  description: string;
}

export default function UpdateCard({
  href,
  label,
  title,
  description,
}: UpdateCardProps) {
  return (
    <motion.a
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      href={href}
      className="group flex flex-col gap-2 bg-eddy-gray sm:p-5 p-4 transition-colors duration-200 hover:bg-eddy-gray-hover focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-eddy-black"
    >
      <p className="font-semibold uppercase">{label}</p>
      <p className="text-lg underline-offset-4 group-hover:underline">
        {title}
      </p>
      <p className="text-eddy-text/70 line-clamp-2">{description}</p>
    </motion.a>
  );
}
