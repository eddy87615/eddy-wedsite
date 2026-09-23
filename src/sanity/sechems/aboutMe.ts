import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutMe',
  title: 'About Me',
  type: 'document',
  fields: [
    defineField({
      name: 'zhContent',
      title: '關於我（中文）',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'engContent',
      title: '關於我（英文）',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'jpContent',
      title: '關於我（日文）',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Me Content',
      }
    },
  },
})
