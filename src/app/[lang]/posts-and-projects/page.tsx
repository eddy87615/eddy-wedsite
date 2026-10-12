import MainLayout from "@/components/MainLayout";
import PageHeader from "@/components/PageHeader";
import PostsAndProjectsList from "@/components/PostsAndProjectsList";
import {
  getAboutMe,
  getPostsAndProjects,
  truncate,
} from "@/sanity/queries";
import { defaultLocale, type Locale } from "@/i18n/translation";

export default async function PostsAndProjectsOverview({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang as Locale) ?? defaultLocale;
  const [aboutMe, items] = await Promise.all([
    getAboutMe(locale),
    getPostsAndProjects(locale),
  ]);

  return (
    <MainLayout>
      <PageHeader
        title="posts and projects"
        verticalText="陳品叡"
        subText={aboutMe?.birthday}
      />
      {/* 摘要在伺服器先截短,傳給前端的資料比較小 */}
      <PostsAndProjectsList
        items={items.map((item) => ({
          ...item,
          excerpt: truncate(item.excerpt ?? ""),
        }))}
      />
    </MainLayout>
  );
}
