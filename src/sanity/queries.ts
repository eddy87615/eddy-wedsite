import { groq } from "next-sanity";
import { client } from "@/sanity/client";
import type { Locale } from "@/i18n/translation";

const LANGUAGE_TAG_SLUG: Record<Locale, string> = {
  en: "english-version",
  zh: "chinese-version",
  jp: "japanese-version",
};

export interface LatestUpdate {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
}

async function getLatestByTags(
  categoryTags: string[],
  lang: Locale,
): Promise<LatestUpdate | null> {
  const query = groq`*[
    _type == "post" &&
    count((tags[]->slug.current)[@ in $categoryTags]) > 0 &&
    count((tags[]->slug.current)[@ == $langTag]) > 0
  ] | order(publishedAt desc)[0]{
    title,
    "slug": slug.current,
    "excerpt": coalesce(excerpt, pt::text(content)),
    publishedAt
  }`;

  const result = await client.fetch<LatestUpdate | null>(query, {
    categoryTags,
    langTag: LANGUAGE_TAG_SLUG[lang],
  });

  return result ?? null;
}

export function getLatestProject(lang: Locale) {
  return getLatestByTags(["my-works"], lang);
}

export function getLatestPost(lang: Locale) {
  return getLatestByTags(["post-share", "study-note", "my-works"], lang);
}

// 不比對分類 tag,只看語言,抓該語言版本裡全站最新的一篇
async function getLatestByLanguage(lang: Locale): Promise<LatestUpdate | null> {
  const query = groq`*[
    _type == "post" &&
    count((tags[]->slug.current)[@ == $langTag]) > 0
  ] | order(publishedAt desc)[0]{
    title,
    "slug": slug.current,
    "excerpt": coalesce(excerpt, pt::text(content)),
    publishedAt
  }`;

  const result = await client.fetch<LatestUpdate | null>(query, {
    langTag: LANGUAGE_TAG_SLUG[lang],
  });

  return result ?? null;
}

export function getLatestUpdate(lang: Locale) {
  return getLatestByLanguage(lang);
}

export function truncate(text: string, maxLength = 140) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}……`;
}
