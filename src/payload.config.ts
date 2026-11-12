import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { openapi, swaggerUI } from 'payload-oapi'
import * as global from './globals'
import * as collection from './collections'
// 1
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const { EmailMessages, EmailSubscribe, Donors, ...rest } = collection
export default buildConfig({
  admin: {
    user: collection.Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // serverURL: 'http://localhost:3000',
  serverURL: 'https://backend-rho-sage-84.vercel.app',
  cors: [
    'https://backend-rho-sage-84.vercel.app',
    'http://localhost:3001',
    'http://192.168.0.109:3001',
    'https://www.armid.am',
    'https://armid.am',
  ],
  globals: Object.values(global) as any[],
  collections: [...(Object.values(rest) as any[]), EmailSubscribe, EmailMessages, Donors],
  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Russian',
        code: 'ru',
      },
      {
        label: 'Armenian',
        code: 'hy',
      },
    ],
    defaultLocale: 'hy',
    fallback: true,
  },
  plugins: [
    openapi({
      openapiVersion: '3.0',
      metadata: {
        title: 'My API',
        version: '0.0.1',
      },
    }),
    swaggerUI({}),
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
