import {defineType, defineField} from 'sanity'
import {LANGUAGES} from './languages'

export default defineType({
  name: 'i18nString',
  title: 'i18n String',
  type: 'object',
  fields: LANGUAGES.map((lang) => defineField({name: lang.id, title: lang.title, type: 'string'})),
})
