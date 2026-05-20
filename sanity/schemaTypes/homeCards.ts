import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homeCard',
  title: 'Картки інфо на Головній',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок картки',
      type: 'string',
      description: 'Наприклад: Графік роботи, Контакти, Приймальна комісія',
    }),
    defineField({
      name: 'description',
      title: 'Основний текст / Інформація',
      type: 'text',
      rows: 3,
      description: 'Наприклад: Пн-Пт: 8:00 - 17:00 або +38 (067) 000-00-00',
    }),
    defineField({
      name: 'iconType',
      title: 'Іконка для відображення',
      type: 'string',
      options: {
        list: [
          { title: 'Годинник (Графік)', value: 'clock' },
          { title: 'Телефон (Контакти)', value: 'phone' },
          { title: 'Мапа / Геолокація', value: 'map' },
          { title: 'Лист / Email', value: 'mail' },
        ],
      },
    }),
    defineField({
      name: 'badgeColor',
      title: 'Стиль іконки (Градієнт)',
      type: 'string',
      initialValue: 'blue',
      options: {
        list: [
          { title: 'Синій (Стандартний)', value: 'blue' },
          { title: 'Фіолетовий (Акцент)', value: 'purple' },
          { title: 'Темний (Суворий)', value: 'dark' },
        ],
      },
    }),
  ],
})