import { createClient } from 'next-sanity'
import { projectId, dataset } from '../env' // перевір шлях до env

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false, // ставимо false, щоб бачити оновлення миттєво
})