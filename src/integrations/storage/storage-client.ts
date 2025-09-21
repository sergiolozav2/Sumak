import { storageClientFactory } from './storage-client-factory'
import { env } from '../common/env'

export const storageClient = storageClientFactory({
  accessKeyId: env.STORAGE_ACCESS_KEY_ID,
  secretAccessKey: env.STORAGE_SECRET_ACCESS_KEY,
  region: env.STORAGE_REGION,
  endpoint: env.STORAGE_ENDPOINT,
  bucketName: 'uploads',
})
