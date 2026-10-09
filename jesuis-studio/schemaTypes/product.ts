import {defineType, defineField} from 'sanity'
import {pickTitle} from './languages'

const CATEGORY_OPTIONS = [
  {title: 'Книга', value: 'book'},
  {title: 'Гайд', value: 'guide'},
  {title: 'Игра', value: 'game'},
  {title: 'Притчи и защита', value: 'parable'},
  {title: 'Обучающая программа', value: 'course'},
]

const STATUS_OPTIONS = [
  {title: 'В продаже', value: 'available'},
  {title: 'Скоро', value: 'soon'},
]

const CURRENCY_OPTIONS = [
  {title: 'EUR', value: 'EUR'},
  {title: 'USD', value: 'USD'},
]

export default defineType({
  name: 'product',
  title: 'Материал',
  type: 'document',

  groups: [
    {name: 'main', title: 'Основное', default: true},
    {name: 'sale', title: 'Продажа'},
  ],

  fields: [
    defineField({
      name: 'category',
      title: 'Тип',
      type: 'string',
      group: 'main',
      options: {list: CATEGORY_OPTIONS, layout: 'radio'},
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'title',
      title: 'Название',
      type: 'i18nString',
      group: 'main',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'main',
      description: 'URL материала. Пример: voyna-zhizn-lyubov',
      options: {
        source: (doc: any) => doc?.title?.en || doc?.title?.ru || doc?.title?.fr,
        maxLength: 96,
      },
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'subtitle',
      title: 'Подпись (жанр / формат)',
      type: 'i18nString',
      group: 'main',
      description: 'Пример: Исторический роман-мемуары',
    }),

    defineField({
      name: 'coverImage',
      title: 'Обложка',
      type: 'image',
      group: 'main',
      options: {hotspot: true},
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'coverVideo',
      title: 'Видео-обложка (необязательно)',
      type: 'file',
      group: 'main',
      options: {accept: 'video/mp4,video/webm'},
      description:
        'Короткое зацикленное видео без звука вместо обложки. MP4, до ~8 МБ, лучше вертикальное 4:5. Обложка-картинка всё равно нужна — она показывается, пока видео грузится.',
    }),

    defineField({
      name: 'galleryImages',
      title: 'Дополнительные фото (необязательно)',
      type: 'array',
      group: 'main',
      of: [{type: 'image', options: {hotspot: true}}],
    }),

    defineField({
      name: 'shortDescription',
      title: 'Краткое описание (для карточки)',
      type: 'i18nText',
      group: 'main',
    }),

    defineField({
      name: 'description',
      title: 'Полное описание',
      type: 'i18nBlockContent',
      group: 'main',
    }),

    defineField({
      name: 'order',
      title: 'Порядок в списке',
      type: 'number',
      group: 'main',
      description: 'Необязательно. Меньше = выше.',
    }),

    defineField({
      name: 'isFeatured',
      title: 'Показать на главной',
      type: 'boolean',
      group: 'main',
      initialValue: false,
    }),

    defineField({
      name: 'status',
      title: 'Статус',
      type: 'string',
      group: 'sale',
      options: {list: STATUS_OPTIONS, layout: 'radio'},
      initialValue: 'available',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'price',
      title: 'Цена',
      type: 'number',
      group: 'sale',
      validation: (r) => r.min(0),
    }),

    defineField({
      name: 'currency',
      title: 'Валюта',
      type: 'string',
      group: 'sale',
      options: {list: CURRENCY_OPTIONS, layout: 'radio'},
      initialValue: 'EUR',
    }),

    defineField({
      name: 'buyUrl',
      title: 'Ссылка на оплату (Telegram / Tribute)',
      type: 'url',
      group: 'sale',
      description:
        'Куда ведёт кнопка «Купить». Ссылка на товар в Tribute или на Telegram. Если пусто — на сайте вместо «Купить» показывается «Скоро».',
      validation: (r) => r.uri({scheme: ['https', 'tg']}),
    }),

    defineField({
      name: 'stripePriceId',
      title: 'Stripe Price ID',
      type: 'string',
      group: 'sale',
      description: 'Заполняется после подключения Stripe. Пример: price_1Q...',
    }),
  ],

  orderings: [
    {
      title: 'По порядку',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'},
        {field: '_createdAt', direction: 'desc'},
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      category: 'category',
      status: 'status',
      price: 'price',
      currency: 'currency',
    },
    prepare(sel: any) {
      const category = CATEGORY_OPTIONS.find((c) => c.value === sel.category)?.title
      const meta = [
        category,
        sel.price != null ? `${sel.price} ${sel.currency ?? ''}` : null,
        sel.status === 'soon' ? 'СКОРО' : null,
      ].filter(Boolean)
      return {title: pickTitle(sel.title), subtitle: meta.join(' • '), media: sel.media}
    },
  },
})
