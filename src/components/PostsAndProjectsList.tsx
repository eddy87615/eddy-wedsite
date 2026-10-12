"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "@/i18n/useTranslation";
import { defaultLocale, type Locale } from "@/i18n/translation";
// 只 import 型別,不會把 Sanity client 打包進瀏覽器
import type { PostCategory, PostListItem } from "@/sanity/queries";

type Filter = "all" | PostCategory;

export default function PostsAndProjectsList({
  items,
}: {
  items: PostListItem[];
}) {
  const t = useTranslation();
  const params = useParams<{ lang: string }>();
  const lang = (params?.lang as Locale) ?? defaultLocale;
  const [filter, setFilter] = useState<Filter>("all");

  // 按鈕的文字跟著語言走,所以放在元件裡用 t 組出來
  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: t.postsAndProjects.all },
    { value: "post", label: t.postsAndProjects.posts },
    { value: "project", label: t.postsAndProjects.projects },
  ];

  const visibleItems =
    filter === "all" ? items : items.filter((item) => item.category === filter);

  return (
    <section className="flex flex-col gap-10">
      <div
        role="group"
        className="flex items-center justify-center gap-10 uppercase"
      >
        {filters.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
            className={`uppercase ${
              filter === value
                ? "relative bg-eddy-bg text-eddy-text before:absolute before:top-1/2 before:left-[-50%] before:h-1 before:w-1 before:translate-y-[-50%] before:rounded-xl before:bg-eddy-text before:opacity-100 before:transition before:duration-200 before:content-['']"
                : "text-eddy-text-30 before:opacity-0"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {visibleItems.length === 0 ? (
        <p>{t.postsAndProjects.empty}</p>
      ) : (
        <ul className="flex flex-col py-10">
          {visibleItems.map((item) => (
            <li
              key={item.id}
              className="border-b border-eddy-text-30 last:border-0"
            >
              <Link
                href={`/${lang}/posts-and-projects/${item.slug}`}
                className="flex items-center justify-between gap-10 py-6"
              >
                <div className="flex items-center gap-1">
                  <p className="min-w-25 text-sm uppercase">
                    {item.category === "project"
                      ? t.postsAndProjects.projects
                      : t.postsAndProjects.posts}
                  </p>
                  <p>{item.title}</p>
                </div>
                {/* <p className="text-eddy-text-30">{item.excerpt}</p> */}
                <span>→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
