import HomeHero from "@/components/HomeHero";
import MainLayout from "@/components/MainLayout";
import ProgressiveImage from "@/components/ProgressiveImage";
import Introduction from "@/components/Introduction";
import { getAboutMe } from "@/sanity/queries";
import { translations, defaultLocale, type Locale } from "@/i18n/translation";
import ScrollDown from "@/components/ScrollDown";

export default async function AboutMe({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang as Locale) ?? defaultLocale;
  const aboutMe = await getAboutMe(locale);
  const t = translations[locale];

  return (
    <MainLayout>
      <header className="relative min-h-[calc(100dvh-200px)]">
        <ScrollDown />
        <div className="mb-20 flex min-h-[15vh] justify-between">
          <p className="text-sm uppercase">about me</p>
          <div className="flex flex-col items-end justify-between">
            <p className="[writing-mode:vertical-rl]">
              <small className="tracking-[10px]">陳品叡</small>
            </p>
            <p className="">
              <small className="">{aboutMe?.birthday}</small>
            </p>
          </div>
        </div>
        <HomeHero />
      </header>

      {/* Sanity 裡還沒建立 aboutMe 文件時,getAboutMe 會回傳 null,
          這裡先不顯示這個區塊,而不是讓畫面噴錯或顯示一堆 undefined */}
      {aboutMe && (
        <>
          {aboutMe.imageUrl && (
            <ProgressiveImage
              src={aboutMe.imageUrl}
              alt={aboutMe.imageAlt}
              widthClassName="w-full sm:w-[500px]"
              mosaicStages={aboutMe.imageMosaicStages}
            />
          )}
        </>
      )}
      {aboutMe && (
        <Introduction
          title={t.aboutMe["about-me-title"]}
          content={aboutMe.content}
        />
      )}
    </MainLayout>
  );
}
