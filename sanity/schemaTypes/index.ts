import { type SchemaTypeDefinition } from 'sanity'
import specialty from './specialties'
import contacts from './contacts'
import docsPage from './documents'
import reviews from './reviews'
import vstup from './vstup'
import team from './team'
import pilgyPage from './pilgy' // Імпортуємо нову схему пільг

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contacts, specialty, docsPage, reviews, vstup, team, pilgyPage], // Додаємо її в масив
}