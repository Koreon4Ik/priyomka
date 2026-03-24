import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision' // <-- Тут не має бути крапки з косою рискою
import { schema } from './schemaTypes'     // <-- Тут залишаємо одну крапку

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default defineConfig({
  name: 'default',
  title: 'dfkr-admin',

  projectId: 'ваш_id_з_файлу', // Залиште той, що там був
  dataset: 'production',

  basePath: '/studio',

  plugins: [
    structureTool(), 
    visionTool(),
  ],

  schema: {
    types: schema.types,
  },
})