import { defineField, defineType, defineArrayMember } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "簡短描述",
      description:
        "用在文章列表、首頁卡片這類需要短摘要的地方,不填的話會自動抓內文開頭代替",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          fields: [
            {
              type: "string",
              name: "alt",
              title: "Alternative Text",
            },
          ],
        },
        {
          type: "code",
          title: "程式碼區塊",
          options: {
            language: "javascript",
            languageAlternatives: [
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
              { title: "HTML", value: "html" },
              { title: "CSS", value: "css" },
              { title: "Python", value: "python" },
              { title: "Java", value: "java" },
              { title: "C++", value: "cpp" },
              { title: "C#", value: "csharp" },
              { title: "PHP", value: "php" },
              { title: "Ruby", value: "ruby" },
              { title: "Go", value: "go" },
              { title: "Rust", value: "rust" },
              { title: "Swift", value: "swift" },
              { title: "Kotlin", value: "kotlin" },
              { title: "SQL", value: "sql" },
              { title: "Bash", value: "bash" },
              { title: "JSON", value: "json" },
              { title: "YAML", value: "yaml" },
              { title: "Markdown", value: "markdown" },
            ],
            withFilename: true,
          },
        },
        defineArrayMember({
          name: "table",
          title: "表格",
          type: "table",
        }),
        defineArrayMember({
          name: "hr",
          title: "分隔線",
          type: "object",
          fields: [
            {
              name: "divider",
              type: "boolean",
              hidden: true,
              initialValue: true,
            },
          ],
          preview: {
            prepare() {
              return {
                title: "━━━━━━━━━━━━━━━",
              };
            },
          },
        }),
        defineArrayMember({
          name: "gallery",
          title: "圖片輪播",
          type: "object",
          fields: [
            {
              name: "images",
              title: "Images",
              type: "array",
              of: [
                {
                  type: "image",
                  fields: [
                    {
                      name: "alt",
                      type: "string",
                      title: "Alternative Text",
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              images: "images",
            },
            prepare({ images }) {
              return {
                title: `圖片輪播 (${images?.length || 0} 張圖片)`,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
    },
  },
});
