import {defineType, defineField} from 'sanity'

const PROJECT_STATUS_OPTIONS = [
  {title: 'Скоро (кнопка «Скоро»)', value: 'soon'},
  {title: 'Открыт (кнопка «Присоединиться»)', value: 'open'},
]

export default defineType({
  name: 'siteSettings',
  title: 'Настройки сайта',
  type: 'document',

  groups: [
    {name: 'project', title: 'Проект «Я есть»', default: true},
    {name: 'contacts', title: 'Контакты'},
    {name: 'media', title: 'Видео'},
  ],

  fields: [
    defineField({
      name: 'mainProjectStatus',
      title: 'Статус проекта «Я есть — жизнь после 50»',
      type: 'string',
      group: 'project',
      options: {list: PROJECT_STATUS_OPTIONS, layout: 'radio'},
      initialValue: 'soon',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'mainProjectUrl',
      title: 'Ссылка для кнопки «Присоединиться» (Telegram-канал)',
      type: 'url',
      group: 'project',
    }),

    defineField({
      name: 'telegramUrl',
      title: 'Telegram (кнопка «Написать мне»)',
      type: 'url',
      group: 'contacts',
    }),

    defineField({name: 'instagramUrl', title: 'Instagram', type: 'url', group: 'contacts'}),
    defineField({name: 'youtubeUrl', title: 'YouTube', type: 'url', group: 'contacts'}),
    defineField({name: 'email', title: 'Email', type: 'string', group: 'contacts'}),

    defineField({
      name: 'introVideoUrl',
      title: 'Видео-знакомство (ссылка YouTube / Vimeo)',
      type: 'url',
      group: 'media',
    }),
  ],

  preview: {
    prepare: () => ({title: 'Настройки сайта'}),
  },
})
