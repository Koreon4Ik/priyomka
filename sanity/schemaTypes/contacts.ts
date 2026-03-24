import { defineField, defineType } from 'sanity'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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