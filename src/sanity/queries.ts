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
// 分別存在同一份文件的不同欄位裡(nameZh/nameEng/nameJp...),
// 不是靠 tags 分成好幾篇文件,所以查詢不用比對語言、也不用排序。
interface AboutMeRaw {
  myImage?: { asset?: { _ref: string }; alt?: string };
  nameZh: string;
  nameEng: string;
  nameJp: string;
  birthdayZh: string;
  birthdayEng: string;
  birthdayJp: string;
  nationalityZh: string;
  nationalityEng: string;
  nationalityJp: string;
  email: string;
  locationZh: string;
  locationEng: string;
  locationJp: string;
  zhContent: PortableTextBlock[];
  engContent: PortableTextBlock[];
  jpContent: PortableTextBlock[];
}

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

// 每個語言要去 AboutMeRaw 裡的哪些欄位拿資料——
// 注意 email 沒有語言後綴、content 的字首是小寫,是特意在這裡集中處理掉,
// 不然每次要用的地方都要記這些不一致的命名。
const ABOUT_ME_FIELD_MAP: Record<
  Locale,
  {
    name: keyof AboutMeRaw;
    birthday: keyof AboutMeRaw;
    nationality: keyof AboutMeRaw;
    location: keyof AboutMeRaw;
    content: keyof AboutMeRaw;
  }
> = {
  en: {
    name: "nameEng",
    birthday: "birthdayEng",
    nationality: "nationalityEng",
    location: "locationEng",
    content: "engContent",
  },
  zh: {
    name: "nameZh",
    birthday: "birthdayZh",
    nationality: "nationalityZh",
    location: "locationZh",
    content: "zhContent",
  },
  jp: {
    name: "nameJp",
    birthday: "birthdayJp",
    nationality: "nationalityJp",
    location: "locationJp",
    content: "jpContent",
  },
};

export async function getAboutMe(lang: Locale): Promise<AboutMe | null> {
  const query = groq`*[_type == "aboutMe"][0]{
    myImage,
    nameZh, nameEng, nameJp,
    birthdayZh, birthdayEng, birthdayJp,
    nationalityZh, nationalityEng, nationalityJp,
    email,
    locationZh, locationEng, locationJp,
    zhContent, engContent, jpContent
  }`;

  const raw = await client.fetch<AboutMeRaw | null>(query);
  if (!raw) return null;

  const fields = ABOUT_ME_FIELD_MAP[lang];
  const image = raw.myImage;

  return {
    imageUrl: image ? builder.image(image).url() : null,
    imageMosaicStages: image
      ? MOSAIC_STAGE_WIDTHS.map((width) =>
          builder.image(image).width(width).url(),
        )
      : [],
    imageAlt: raw.myImage?.alt ?? "",
    name: raw[fields.name] as string,
    birthday: raw[fields.birthday] as string,
    nationality: raw[fields.nationality] as string,
    location: raw[fields.location] as string,
    email: raw.email,
    content: raw[fields.content] as PortableTextBlock[],
  };
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
