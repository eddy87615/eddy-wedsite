import { groq } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { PortableTextBlock } from "next-sanity";
import { client } from "@/sanity/client";
import { projectId, dataset } from "@/sanity/env";
import type { Locale } from "@/i18n/translation";

const builder = imageUrlBuilder({ projectId, dataset });

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

// aboutMe 跟 post 不一樣:全站只有「一份」文件,三種語言的內容
// 分別存在同一份文件的不同欄位裡(nameZh/nameEn/nameJp...),
// 不是靠 tags 分成好幾篇文件,所以查詢不用比對語言、也不用排序。
// 欄位命名統一是「欄位名 + 語言後綴」,後綴固定是 En/Zh/Jp,跟 Locale 字母對齊。
interface AboutMeRaw {
  myImage?: { asset?: { _ref: string }; alt?: string };
  nameZh: string;
  nameEn: string;
  nameJp: string;
  birthdayZh: string;
  birthdayEn: string;
  birthdayJp: string;
  nationalityZh: string;
  nationalityEn: string;
  nationalityJp: string;
  email: string;
  locationZh: string;
  locationEn: string;
  locationJp: string;
  contentZh: PortableTextBlock[];
  contentEn: PortableTextBlock[];
  contentJp: PortableTextBlock[];
}

// "en" -> "En"、"zh" -> "Zh"、"jp" -> "Jp",跟 Sanity 欄位的語言後綴對齊
const LOCALE_SUFFIX: Record<Locale, string> = { en: "En", zh: "Zh", jp: "Jp" };

// 馬賽克要分幾個階段、每階段圖片多寬,由粗到細排列
const MOSAIC_STAGE_WIDTHS = [4, 16, 48];

export interface AboutMe {
  imageUrl: string | null;
  imageMosaicStages: string[];
  imageAlt: string;
  name: string;
  birthday: string;
  nationality: string;
  location: string;
  email: string;
  content: PortableTextBlock[];
}

export async function getAboutMe(lang: Locale): Promise<AboutMe | null> {
  const query = groq`*[_type == "aboutMe"][0]{
    myImage,
    nameZh, nameEn, nameJp,
    birthdayZh, birthdayEn, birthdayJp,
    nationalityZh, nationalityEn, nationalityJp,
    email,
    locationZh, locationEn, locationJp,
    contentZh, contentEn, contentJp
  }`;

  const raw = await client.fetch<AboutMeRaw | null>(query);
  if (!raw) return null;

  const image = raw.myImage;
  const suffix = LOCALE_SUFFIX[lang];

  return {
    imageUrl: image ? builder.image(image).url() : null,
    imageMosaicStages: image
      ? MOSAIC_STAGE_WIDTHS.map((width) =>
          builder.image(image).width(width).url(),
        )
      : [],
    imageAlt: raw.myImage?.alt ?? "",
    name: raw[`name${suffix}` as keyof AboutMeRaw] as string,
    birthday: raw[`birthday${suffix}` as keyof AboutMeRaw] as string,
    nationality: raw[`nationality${suffix}` as keyof AboutMeRaw] as string,
    location: raw[`location${suffix}` as keyof AboutMeRaw] as string,
    email: raw.email,
    content: raw[`content${suffix}` as keyof AboutMeRaw] as PortableTextBlock[],
  };
}

// experience 跟 aboutMe 不一樣:會有「好幾份」文件(每筆是一段工作經驗),
// 所以查詢要回傳陣列,而不是隨便查一份;每份文件裡的多語言欄位命名邏輯,
// 一樣是「欄位名 + En/Zh/Jp」,一樣可以直接用 LOCALE_SUFFIX 算出來。
interface ExperienceRaw {
  _id: string;
  period: string;
  companyZh: string;
  companyEn: string;
  companyJp: string;
  positionZh: string;
  positionEn: string;
  positionJp: string;
  descriptionZh: PortableTextBlock[];
  descriptionEn: PortableTextBlock[];
  descriptionJp: PortableTextBlock[];
}

export interface Experience {
  id: string;
  period: string;
  company: string;
  position: string;
  description: PortableTextBlock[];
}

export async function getExperiences(lang: Locale): Promise<Experience[]> {
  // order 數字越大越前面;還沒填 order 的舊文件排最後,同分再用建立時間排
  const query = groq`*[_type == "experience"] | order(coalesce(order, -1) desc, _createdAt desc){
    _id,
    period,
    companyZh, companyEn, companyJp,
    positionZh, positionEn, positionJp,
    descriptionZh, descriptionEn, descriptionJp
  }`;

  const raw = await client.fetch<ExperienceRaw[]>(query);
  const suffix = LOCALE_SUFFIX[lang];

  return raw.map((item) => ({
    id: item._id,
    period: item.period,
    company: item[`company${suffix}` as keyof ExperienceRaw] as string,
    position: item[`position${suffix}` as keyof ExperienceRaw] as string,
    description: item[
      `description${suffix}` as keyof ExperienceRaw
    ] as PortableTextBlock[],
  }));
}

// 給 footer 用的:每一頁都會透過 root layout 渲染 footer,
// 所以只抓 timezone 這一個欄位,不要抓整份 getAboutMe(圖片、三種語言內容都用不到)。
export async function getTimezone(): Promise<string | null> {
  const query = groq`*[_type == "aboutMe"][0].timezone`;
  const timezone = await client.fetch<string | null>(query);
  return timezone ?? null;
}

export function getLatestUpdate(lang: Locale) {
  return getLatestByLanguage(lang);
}

export function truncate(text: string, maxLength = 50) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}……`;
}
