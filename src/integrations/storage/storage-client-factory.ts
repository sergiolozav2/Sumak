import {
  CreateBucketCommand,
  HeadBucketCommand,
  S3Client,
  S3ServiceException,
} from '@aws-sdk/client-s3'

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

  await ensureBucketExists(client, config.bucketName)

  return client
}

export async function ensureBucketExists(
  client: S3Client,
  bucketName: string,
): Promise<void> {
  try {
    await client.send(new HeadBucketCommand({ Bucket: bucketName }))
    return
  } catch (err: unknown) {
    console.log('ERROR CHECKING BUCKET: ', err)

    if (S3ServiceException.isInstance(err)) {
      if (err.name !== 'NotFound') {
        throw err
      }
    }
  }

  try {
    await client.send(
      new CreateBucketCommand({
        Bucket: bucketName,
      }),
    )
  } catch (err: unknown) {
    console.log('ERROR CREATING BUCKET: ', err)
    if (S3ServiceException.isInstance(err)) {
      if (err.name === 'BucketAlreadyOwnedByYou') {
        return
      }
    }
    throw err
  }
}
