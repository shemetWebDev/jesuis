import {defineType, defineField} from 'sanity'
import {LANGUAGES} from './languages'

export default defineType({
  name: 'i18nText',
  title: 'i18n Text',
  type: 'object',
  fields: LANGUAGES.map((lang) =>
    defineField({name: lang.id, title: lang.title, type: 'text', rows: 4}),
  ),
})
