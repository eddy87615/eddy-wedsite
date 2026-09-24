import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutMe",
  title: "About Me",
  type: "document",
  fields: [
    defineField({
      name: "myImage",
      title: "My Image",
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
      name: "nameZh",
      title: "中文姓名",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameEng",
      title: "英文姓名",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameJp",
      title: "日文姓名",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "birthdayZh",
      title: "生日（中文）",
      type: "string",
      description: "例如：1990年1月1日",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "birthdayEng",
      title: "生日（英文）",
      type: "string",
      description: "e.g., January 1, 1990",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "birthdayJp",
      title: "生日（日文）",
      type: "string",
      description: "例：1990年1月1日",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nationalityZh",
      title: "國籍（中文）",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nationalityEng",
      title: "國籍（英文）",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nationalityJp",
      title: "國籍（日文）",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "電子郵件",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "locationZh",
      title: "所在地（中文）",
      type: "string",
      description: "例如：台北市，台灣",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "locationEng",
      title: "所在地（英文）",
      type: "string",
      description: "e.g., Taipei, Taiwan",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "locationJp",
      title: "所在地（日文）",
      type: "string",
      description: "例：台北、台湾",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "timezone",
      title: "時區",
      type: "string",
      description:
        "footer 的當地時間會用這個時區顯示,要填 IANA 時區名稱,例如 Asia/Tokyo、Asia/Taipei、America/New_York",
      initialValue: "Asia/Tokyo",
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true;
          try {
            Intl.DateTimeFormat(undefined, { timeZone: value });
            return true;
          } catch {
            return "不是有效的 IANA 時區名稱,格式要像 Asia/Tokyo 這樣";
          }
        }),
    }),
    defineField({
      name: "zhContent",
      title: "關於我（中文）",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "engContent",
      title: "關於我（英文）",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "jpContent",
      title: "關於我（日文）",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "nameEng",
      subtitle: "email",
    },
  },
});
