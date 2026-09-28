import {defineType, defineField} from 'sanity'
import {pickTitle} from './languages'

export default defineType({
  name: 'post',
  title: 'Статья',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'i18nString',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL статьи. Пример: posle-50-zhizn-tolko-nachinaetsya',
      options: {
        source: (doc: any) => doc?.title?.en || doc?.title?.ru || doc?.title?.fr,
        maxLength: 96,
      },
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Дата публикации',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'coverImage',
      title: 'Обложка',
      type: 'image',
      options: {hotspot: true},
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Краткий анонс (для списка статей)',
      type: 'i18nText',
    }),

    defineField({
      name: 'content',
      title: 'Текст статьи',
      type: 'i18nBlockContent',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'isFeatured',
      title: 'Показать на главной',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  orderings: [
    {
      title: 'Сначала новые',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],

  preview: {
    select: {title: 'title', media: 'coverImage', date: 'publishedAt', isFeatured: 'isFeatured'},
    prepare(sel: any) {
      const meta = [
        sel.date ? new Date(sel.date).toLocaleDateString('ru-RU') : null,
        sel.isFeatured ? 'НА ГЛАВНОЙ' : null,
      ].filter(Boolean)
      return {title: pickTitle(sel.title), subtitle: meta.join(' • '), media: sel.media}
    },
  },
})
