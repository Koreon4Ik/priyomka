import { defineField, defineType } from 'sanity'



export default defineType({
  name: 'docsPage',
  title: 'Сторінка Документи',
  type: 'document',
  fields: [
    defineField({
      name: 'mainTitle',
      title: 'Головний заголовок',
      type: 'string',
    }),
    defineField({
      name: 'sections',
      title: 'Розділи документів',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'sectionTitle', title: 'Назва розділу', type: 'string' },
            {
              name: 'items',
              title: 'Файли',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Назва документа', type: 'string' },
                    { name: 'file', title: 'Завантажити PDF', type: 'file', options: { accept: '.pdf' } }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }),
  ],
})