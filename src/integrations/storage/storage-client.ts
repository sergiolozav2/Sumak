import { storageClientFactory } from './storage-client-factory'
import { z } from 'zod'

const schema = z.object({
  STORAGE_ACCESS_KEY_ID: z.string().min(1),
  STORAGE_SECRET_ACCESS_KEY: z.string().min(1),
  STORAGE_REGION: z.string().min(1),
  STORAGE_ENDPOINT: z.string().url().min(1),
})

const env = schema.parse(process.env)

export const storageClient = storageClientFactory({
  accessKeyId: env.STORAGE_ACCESS_KEY_ID,
  secretAccessKey: env.STORAGE_SECRET_ACCESS_KEY,
  region: env.STORAGE_REGION,
  endpoint: env.STORAGE_ENDPOINT,
  bucketName: 'uploads',
})
