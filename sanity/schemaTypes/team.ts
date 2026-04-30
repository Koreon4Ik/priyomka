import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'team',
  title: 'Наша команда',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'ПІБ',
      type: 'string',
    }),
    defineField({
      name: 'position',
      title: 'Посада / Короткий опис',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Фото',
      type: 'image',
      options: {
        hotspot: true, // дозволяє вибирати центр фокусу на фото
      },
    }),
  ],
})