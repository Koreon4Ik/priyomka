"use client";
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {projectId, dataset} from './sanity/env' // або './env' залежно від того де файл
import {schema} from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'dfkr-admin',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [
    structureTool(), // Залишаємо порожнім, щоб він сам брав схеми
    visionTool(),
  ],

  schema: {
    types: schema.types,
  },
})