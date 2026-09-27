import { defineField, defineType } from "sanity";

// 多語言欄位統一用「欄位名 + 語言後綴(En/Zh/Jp)」命名,
// 跟專案裡的 Locale("en" | "zh" | "jp")字母對齊,查詢時才能直接算出欄位名,不用手動對照表
export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "排序",
      type: "number",
      description: "數字越大越前面",
      validation: (Rule) => Rule.required().integer(),
    }),
    defineField({
      name: "period",
      title: "時間",
      type: "string",
      description: "例如：2023 - 2024",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "companyZh",
      title: "公司（中文）",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "companyEn",
      title: "公司（英文）",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "companyJp",
      title: "公司（日文）",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "positionZh",
      title: "職位（中文）",
      type: "string",
      description: "前端工程師",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "positionEn",
      title: "職位（英文）",
      type: "string",
      description: "Frontend Engineer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "positionJp",
      title: "職位（日文）",
      type: "string",
      description: "フロントエンドエンジニア",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descriptionZh",
      title: "經歷描述（中文）",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descriptionEn",
      title: "經歷描述（英文）",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descriptionJp",
      title: "經歷描述（日文）",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "positionZh",
      subtitle: "companyZh",
    },
  },
});
