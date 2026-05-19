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
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'file',
      title: 'Прикріпити документ',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx'
      }
    }),
    
    /* --- НОВИЙ РОЗДІЛ: ЛІВА КОЛОНКА (ПОСИЛАННЯ) --- */
    defineField({
      name: 'linksSection',
      title: 'Корисні посилання (Ліва колонка)',
      type: 'array',
      description: 'Посилання відображатимуться в лівій частині сторінки вступу. Достатньо заповнити в будь-якому одному кроці (наприклад, у першому).',
      of: [
        {
          type: 'object',
          name: 'inlineLink',
          title: 'Посилання',
          fields: [
            defineField({ name: 'label', title: 'Текст посилання', type: 'string', description: 'Наприклад: Електронний кабінет вступника' }),
            defineField({ name: 'url', title: 'Повне посилання (URL)', type: 'url', description: 'Наприклад: https://vstup.edbo.gov.ua/' }),
            defineField({ name: 'isImportant', title: 'Виділити синім акцентом?', type: 'boolean', initialValue: false }),
          ]
        }
      ]
    }),

    /* --- НОВИЙ РОЗДІЛ: ПРАВА КОЛОНКА (ТЕРМІНИ) --- */
    defineField({
  name: 'deadlines9',
  title: 'Важливі терміни (9 класів) — Права колонка',
  type: 'array',
  description: 'Достатньо заповнити в будь-якому одному кроці (наприклад, у першому).',
  of: [
    {
      type: 'object',
      name: 'deadlineItem9',
      title: 'Термін / Подія (9 клас)',
      fields: [
        defineField({ name: 'period', title: 'Дата або період', type: 'string', description: 'Наприклад: з 01 по 14 липня' }),
        defineField({ name: 'text', title: 'Опис події', type: 'text', rows: 2 }),
        defineField({ 
          name: 'type', 
          title: 'Тип картки', 
          type: 'string',
          initialValue: 'default',
          options: {
            list: [
              { title: 'Стандартна (Сіро-біла)', value: 'default' },
              { title: 'Акцентована (Ніжно-синя)', value: 'accent' }
            ]
          }
        }),
      ]
    }
  ]
}),

defineField({
  name: 'deadlines11',
  title: 'Важливі терміни (11 класів) — Права колонка',
  type: 'array',
  description: 'Достатньо заповнити в будь-якому одному кроці (наприклад, у першому).',
  of: [
    {
      type: 'object',
      name: 'deadlineItem11',
      title: 'Термін / Подія (11 клас)',
      fields: [
        defineField({ name: 'period', title: 'Дата або період', type: 'string', description: 'Наприклад: з 19 липня' }),
        defineField({ name: 'text', title: 'Опис події', type: 'text', rows: 2 }),
        defineField({ 
          name: 'type', 
          title: 'Тип картки', 
          type: 'string',
          initialValue: 'default',
          options: {
            list: [
              { title: 'Стандартна (Сіро-біла)', value: 'default' },
              { title: 'Акцентована (Ніжно-синя)', value: 'accent' }
            ]
          }
        }),
      ]
    }
  ]
}),
  ],
})