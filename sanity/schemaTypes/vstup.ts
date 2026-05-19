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
      name: 'deadlinesSection',
      title: 'Важливі терміни (Права колонка)',
      type: 'array',
      description: 'Важливі дати відображатимуться в правій частині сторінки. Достатньо заповнити в будь-якому одному кроці (наприклад, у першому).',
      of: [
        {
          type: 'object',
          name: 'deadlineItem',
          title: 'Термін / Подія',
          fields: [
            defineField({ name: 'period', title: 'Дата або період', type: 'string', description: 'Наприклад: з 19 липня по 31 липня' }),
            defineField({ name: 'text', title: 'Опис події', type: 'text', rows: 2, description: 'Наприклад: Реєстрація та подання заяв вступників' }),
            defineField({ 
              name: 'type', 
              title: 'Тип картки для дизайну', 
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