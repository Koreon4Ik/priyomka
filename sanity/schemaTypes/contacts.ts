import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contacts',
  title: 'Контакти',
  type: 'document',
  fields: [
    defineField({
      name: 'address',
      title: 'Адреса',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Телефон',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
  ],
})