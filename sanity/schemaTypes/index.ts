import { type SchemaTypeDefinition } from 'sanity'
import specialty from './specialties'
import contacts from './contacts'
import docsPage from './documents'
import reviews from './reviews'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contacts, specialty, docsPage, reviews],
}