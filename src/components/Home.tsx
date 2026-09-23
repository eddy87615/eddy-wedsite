import { translations, type Locale } from "@/i18n/translation";
import { getLatestPost, getLatestProject, truncate } from "@/sanity/queries";
import UpdateCard from "@/components/UpdateCard";
import HomeHero from "@/components/HomeHero";

export default async function Home({ lang }: { lang: Locale }) {
  const t = translations[lang];

  const [latestPost, latestProject] = await Promise.all([
    getLatestPost(lang),
    getLatestProject(lang),
  ]);

  return (
    <section className="relative flex h-[calc(100vh-var(--universal-padding)*2-var(--footer-height))] flex-col justify-center gap-8">
      <HomeHero />
      {(latestPost || latestProject) && (
        <div className="absolute right-0 bottom-5 flex w-full flex-col gap-4 sm:max-w-100">
          {latestPost && (
            <UpdateCard
              href={`/${lang}/posts-and-projects/${latestPost.slug}`}
              label={t.updates["new-post"]}
              title={latestPost.title}
              description={truncate(latestPost.excerpt)}
            />
          )}
          {/* {latestProject && (
            <UpdateCard
              href={`/${lang}/posts-and-projects/${latestProject.slug}`}
              label={t.updates["new-project"]}
              title={latestProject.title}
              description={truncate(latestProject.excerpt)}
            />
          )} */}
        </div>
      )}
    </section>
  );
}
