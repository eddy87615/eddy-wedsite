import MainLayout from "@/components/MainLayout";
import ProgressiveImage from "@/components/ProgressiveImage";
import Introduction from "@/components/Introduction";
import { getAboutMe, getExperiences } from "@/sanity/queries";
import { translations, defaultLocale, type Locale } from "@/i18n/translation";
import PageHeader from "@/components/PageHeader";
import HomeHero from "@/components/HomeHero";

export default async function AboutMe({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang as Locale) ?? defaultLocale;
  const [aboutMe, experiences] = await Promise.all([
    getAboutMe(locale),
    getExperiences(locale),
  ]);
  const t = translations[locale];

  return (
    <MainLayout>
      <PageHeader
        title="about me"
        verticalText="陳品叡"
        subText={aboutMe?.birthday}
      />
      <HomeHero />

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
      <div className="flex flex-col gap-50 py-50">
        {aboutMe && (
          <Introduction
            title={t.aboutMe["about-me-title"]}
            content={aboutMe.content}
            type="introduction"
          />
        )}
        {experiences.length > 0 && (
          <Introduction
            title={t.aboutMe.experiences}
            type="experiences"
            experiences={experiences}
          />
        )}
      </div>
    </MainLayout>
  );
}
