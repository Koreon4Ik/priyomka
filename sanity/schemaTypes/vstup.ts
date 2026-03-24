import { defineField, defineType } from 'sanity'



export default defineType({
  name: 'vstup',
  title: 'Вступнику (Кроки)',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Номер кроку',
      type: 'string',
      description: 'Наприклад: 1, 2, 3...',
    }),
    defineField({
      name: 'title',
      title: 'Заголовок кроку',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Контент (що всередині)',
      type: 'array',
      of: [{ type: 'block' }], // Це дозволить писати текст, робити списки тощо
    }),
    defineField({
      name: 'file',
      title: 'Прикріпити документ',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx'
      }
    }),
  ],
})