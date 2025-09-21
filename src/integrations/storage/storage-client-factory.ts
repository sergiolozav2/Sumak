import { S3Client } from '@aws-sdk/client-s3'

type S3ClientConfig = {
  region: string
  endpoint: string
  accessKeyId: string
  secretAccessKey: string
  bucketName: string
}

export const DI_STORAGE_CLIENT = Symbol('ObjectStorageClient')

export async function storageClientFactory(
  config: S3ClientConfig,
): Promise<S3Client> {
  const clientConfig: ConstructorParameters<typeof S3Client>[0] = {
    region: config.region,
    endpoint: config.endpoint,
    forcePathStyle: true,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  }

  const client = new S3Client(clientConfig)
  await client.config.credentials()

  return client
}
