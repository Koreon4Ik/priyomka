import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'review',
  title: 'Відгуки студентів',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Ім’я студента', type: 'string' }),
    defineField({ name: 'specialty', title: 'Спеціальність/Курс', type: 'string' }),
    defineField({ name: 'text', title: 'Текст відгуку', type: 'text' }),
    defineField({ name: 'avatar', title: 'Фото студента', type: 'image', options: { hotspot: true } }),
  ],
})


