import {defineType, defineField, defineArrayMember} from 'sanity'
import {LANGUAGES} from './languages'

const blockContent = [
  defineArrayMember({type: 'block'}),
  defineArrayMember({
    type: 'image',
    options: {hotspot: true},
    fields: [defineField({name: 'caption', title: 'Подпись', type: 'string'})],
  }),
]

export default defineType({
  name: 'i18nBlockContent',
  title: 'i18n Block Content',
  type: 'object',
  fields: LANGUAGES.map((lang) =>
    defineField({name: lang.id, title: lang.title, type: 'array', of: blockContent}),
  ),
})
