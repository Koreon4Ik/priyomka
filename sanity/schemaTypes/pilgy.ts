import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pilgyPage',
  title: 'Сторінка пільг',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Головний заголовок сторінки',
      type: 'string',
      initialValue: 'Пільгові категорії',
    }),
    defineField({
      name: 'subtitle',
      title: 'Підзаголовок сторінки',
      type: 'string',
      initialValue: 'Інформація про умови вступу та пільги для окремих категорій громадян',
    }),
    defineField({
      name: 'content',
      title: 'Текстовий блок (форматований)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Тут ви можете детально розписати всі категорії, умови, закони, списки документів тощо.',
    }),
  ],
})