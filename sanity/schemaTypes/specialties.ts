import { defineField, defineType } from 'sanity'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default defineType({
  name: 'specialty',
  title: 'Спеціальність',
  type: 'document',
  fields: [
    // 1. ПЕРШЕ ПОЛЕ ЗАГОЛОВКА (ОСНОВНЕ)
    defineField({ 
      name: 'title', 
      title: 'Назва спеціальності (основна)', 
      type: 'string',
      description: 'Наприклад: Електронні комунікації та радіотехніка'
    }),

    // 2. ДРУГЕ ПОЛЕ ЗАГОЛОВКА (ДОДАТКОВЕ/СПЕЦІАЛІЗАЦІЯ)
    defineField({ 
      name: 'subtitle', 
      title: 'Додаткова назва або Спеціалізація', 
      type: 'string',
      description: 'Додатковий рядок тексту, який буде під або над основною назвою'
    }),

    // 3. КОД СПЕЦІАЛЬНОСТІ
    defineField({ 
      name: 'code', 
      title: 'Код спеціальності', 
      type: 'string',
      description: 'Наприклад: 172' //
    }),

    defineField({
      name: 'slug',
      title: 'Унікальне посилання',
      type: 'slug',
      options: { source: 'title' }
    }),

    defineField({
      name: 'shortDescription',
      title: 'Короткий опис (для картки)',
      type: 'text',
      description: 'Цей текст буде видно на загальній сторінці всіх спеціальностей',
    }),

    defineField({
      name: 'content',
      title: 'Повний опис (для сторінки)',
      type: 'array', 
      of: [{ type: 'block' }], 
      description: 'Детальна інформація, яка відобразиться на окремій сторінці',
    }),

    defineField({
      name: 'icon',
      title: 'Іконка (Lucide)',
      type: 'string',
      description: 'Назва іконки з бібліотеки Lucide (наприклад: Cpu, Terminal, Zap)'
    }),

    defineField({
      name: 'benefits',
      title: 'Переваги навчання',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  // Налаштування прев'ю в адмінці, щоб було зручно бачити обидва поля
  preview: {
    select: {
      title: 'title',
      subtitle: 'code',
    },
  },
})