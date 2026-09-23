import { defineField, defineType } from "sanity";

export default defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "標籤名稱",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "標籤代碼",
      type: "slug",
      description: "用於 URL 和程式碼，例如：zh-version, study-notes",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameZh",
      title: "中文名稱",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameJp",
      title: "日文名稱",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameEng",
      title: "英文名稱",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "slug.current",
    },
  },
});
