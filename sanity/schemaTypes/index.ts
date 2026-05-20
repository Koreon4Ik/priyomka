import { type SchemaTypeDefinition } from 'sanity'
import specialty from './specialties'
import contacts from './contacts'
import docsPage from './documents'
import reviews from './reviews'
import vstup from './vstup'
import team from './team'
import pilgyPage from './pilgy'
import homeCard from './homeCards'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contacts, specialty, docsPage, reviews, vstup, team, pilgyPage, homeCard], // Додаємо її в масив
}