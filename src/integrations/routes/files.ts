import { TRPCRouterRecord } from '@trpc/server'
import { prisma } from '../prisma/prisma'
import { publicProcedure } from '../trpc/init'
import { z } from 'zod'
import { storageClient } from '../storage/storage-client'
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  GetObjectCommandOutput,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const BUCKET_NAME = 'uploads'
const EXPIRATION_TIME = 3600 // 1 hour in seconds

export const filesRouter = {
  // Get all files with pagination and filtering
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        offset: z.number().min(0).default(0),
        mimeType: z.string().optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { limit, offset, mimeType, search } = input

      const where = {
        ...(mimeType && { mimeType: { contains: mimeType } }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: 'insensitive' as const } },
            {
              ocrDescription: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
          ],
        }),
      }

      const [files, total] = await Promise.all([
        prisma.files.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: offset,
        }),
        prisma.files.count({ where }),
      ])

      return {
        files,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      }
    }),

  // Get a specific file by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const file = await prisma.files.findUnique({
        where: { id: input.id },
      })

      if (!file) {
        throw new Error('File not found')
      }

      return file
    }),

  // Upload a file using FormData
  upload: publicProcedure
    .input(z.instanceof(FormData))
    .mutation(async ({ input }) => {
      const file = input.get('file') as File
      const title = input.get('title') as string
      const performOcr = input.get('performOcr') === 'true'

      if (!file) {
        throw new Error('No file provided')
      }

      if (!title) {
        throw new Error('Title is required')
      }

      try {
        // Generate unique file key for S3
        const timestamp = Date.now()
        const fileExtension = file.name.split('.').pop()
        const fileKey = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`

        // Upload to S3
        const client = await storageClient
        const buffer = await file.arrayBuffer()

        await client.send(
          new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: fileKey,
            Body: new Uint8Array(buffer),
            ContentType: file.type,
            Metadata: {
              originalName: file.name,
              uploadedAt: new Date().toISOString(),
            },
          }),
        )

        // Process OCR if requested and file is an image or PDF
        let ocrDescription: string | null = null
        if (
          performOcr &&
          (file.type.startsWith('image/') || file.type === 'application/pdf')
        ) {
          try {
            ocrDescription = await processOCR(buffer, file.type)
          } catch (ocrError) {
            console.warn('OCR processing failed:', ocrError)
            // Continue without OCR if it fails
          }
        }

        // Save file metadata to database
        const savedFile = await prisma.files.create({
          data: {
            title,
            url: fileKey,
            createdAt: new Date(),
            mimeType: file.type,
            ocrDescription,
          },
        })

        return savedFile
      } catch (error) {
        console.error('File upload error:', error)
        throw new Error('Failed to upload file. Please try again.')
      }
    }),

  // Get a presigned URL for downloading a file
  getDownloadUrl: publicProcedure
    .input(
      z.object({
        fileId: z.number(),
        fileKey: z.string(), // S3 key for the file
      }),
    )
    .query(async ({ input }) => {
      // Verify file exists in database
      const file = await prisma.files.findUnique({
        where: { id: input.fileId },
      })

      if (!file) {
        throw new Error('File not found')
      }

      try {
        const client = await storageClient

        // Generate presigned URL for download
        const command = new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: input.fileKey,
        })

        const signedUrl = await getSignedUrl(client, command, {
          expiresIn: EXPIRATION_TIME,
        })

        return {
          downloadUrl: signedUrl,
          fileName: file.title,
          mimeType: file.mimeType,
          expiresIn: EXPIRATION_TIME,
        }
      } catch (error) {
        console.error('Error generating download URL:', error)
        throw new Error('Failed to generate download URL')
      }
    }),

  // Get file content as stream (for direct access)
  getContent: publicProcedure
    .input(
      z.object({
        fileId: z.number(),
        fileKey: z.string(),
      }),
    )
    .query(async ({ input }) => {
      // Verify file exists in database
      const file = await prisma.files.findUnique({
        where: { id: input.fileId },
      })

      if (!file) {
        throw new Error('File not found')
      }

      try {
        const client = await storageClient

        const command = new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: input.fileKey,
        })

        const response: GetObjectCommandOutput = await client.send(command)

        if (!response.Body) {
          throw new Error('File content not found')
        }

        // Convert the stream to buffer for tRPC response
        const buffer = await streamToBuffer(response.Body)

        return {
          content: Array.from(buffer), // Convert to array for JSON serialization
          mimeType: file.mimeType,
          fileName: file.title,
        }
      } catch (error) {
        console.error('Error getting file content:', error)
        throw new Error('Failed to retrieve file content')
      }
    }),

  // Update file metadata
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1, 'Title is required').optional(),
        ocrDescription: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input

      // Remove undefined values
      const filteredData = Object.fromEntries(
        Object.entries(updateData).filter(([_, value]) => value !== undefined),
      )

      if (Object.keys(filteredData).length === 0) {
        throw new Error('No valid fields to update')
      }

      return await prisma.files.update({
        where: { id },
        data: filteredData,
      })
    }),

  // Delete a file
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
        fileKey: z.string(), // S3 key for the file
      }),
    )
    .mutation(async ({ input }) => {
      try {
        // Delete from S3 first
        const client = await storageClient
        await client.send(
          new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: input.fileKey,
          }),
        )

        // Then delete from database
        const deletedFile = await prisma.files.delete({
          where: { id: input.id },
        })

        return {
          success: true,
          deletedFile,
        }
      } catch (error) {
        console.error('Error deleting file:', error)
        throw new Error('Failed to delete file')
      }
    }),

  // Process OCR on existing file
  processOcr: publicProcedure
    .input(
      z.object({
        fileId: z.number(),
        fileKey: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const file = await prisma.files.findUnique({
        where: { id: input.fileId },
      })

      if (!file) {
        throw new Error('File not found')
      }

      // Check if file type supports OCR
      if (
        !file.mimeType.startsWith('image/') &&
        file.mimeType !== 'application/pdf'
      ) {
        throw new Error('OCR is only supported for images and PDF files')
      }

      try {
        // Get file content from S3
        const client = await storageClient
        const command = new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: input.fileKey,
        })

        const response = await client.send(command)

        if (!response.Body) {
          throw new Error('File content not found')
        }

        // Convert stream to buffer
        const buffer = await streamToBuffer(response.Body)

        // Process OCR
        const ocrDescription = await processOCR(
          buffer.buffer as ArrayBuffer,
          file.mimeType,
        )

        // Update database with OCR results
        const updatedFile = await prisma.files.update({
          where: { id: input.fileId },
          data: { ocrDescription },
        })

        return {
          success: true,
          file: updatedFile,
          ocrDescription,
        }
      } catch (error) {
        console.error('OCR processing error:', error)
        throw new Error('Failed to process OCR')
      }
    }),

  // Search files by OCR content
  searchByContent: publicProcedure
    .input(
      z.object({
        query: z.string().min(1, 'Search query is required'),
        limit: z.number().min(1).max(50).default(20),
      }),
    )
    .query(async ({ input }) => {
      const files = await prisma.files.findMany({
        where: {
          ocrDescription: {
            contains: input.query,
            mode: 'insensitive',
          },
        },
        orderBy: { createdAt: 'desc' },
        take: input.limit,
      })

      return {
        query: input.query,
        results: files,
        count: files.length,
      }
    }),

  // Get file statistics
  getStats: publicProcedure.query(async () => {
    const [totalFiles, totalWithOcr, mimeTypeStats, recentFiles] =
      await Promise.all([
        prisma.files.count(),
        prisma.files.count({
          where: {
            ocrDescription: {
              not: null,
            },
          },
        }),
        prisma.files.groupBy({
          by: ['mimeType'],
          _count: true,
          orderBy: {
            _count: {
              mimeType: 'desc',
            },
          },
          take: 10,
        }),
        prisma.files.findMany({
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: {
            id: true,
            title: true,
            mimeType: true,
            createdAt: true,
          },
        }),
      ])

    return {
      totalFiles,
      totalWithOcr,
      ocrPercentage:
        totalFiles > 0 ? Math.round((totalWithOcr / totalFiles) * 100) : 0,
      mimeTypeDistribution: mimeTypeStats.map((stat) => ({
        mimeType: stat.mimeType,
        count: stat._count,
      })),
      recentFiles,
    }
  }),
} satisfies TRPCRouterRecord

// Helper function to convert AWS SDK stream to buffer
async function streamToBuffer(stream: any): Promise<Uint8Array> {
  // Handle different stream types (ReadableStream, Node.js streams, etc.)
  if (typeof stream?.getReader === 'function') {
    // Web ReadableStream
    const chunks: Uint8Array[] = []
    const reader = stream.getReader()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
    }

    const buffer = new Uint8Array(
      chunks.reduce((acc, chunk) => acc + chunk.length, 0),
    )
    let offset = 0
    for (const chunk of chunks) {
      buffer.set(chunk, offset)
      offset += chunk.length
    }
    return buffer
  } else if (stream?.pipe) {
    // Node.js stream
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = []
      stream.on('data', (chunk: Buffer) => chunks.push(chunk))
      stream.on('end', () => resolve(new Uint8Array(Buffer.concat(chunks))))
      stream.on('error', reject)
    })
  } else if (stream instanceof Uint8Array) {
    return stream
  } else {
    throw new Error('Unsupported stream type')
  }
}

// Mock OCR processing function - replace with actual OCR service
async function processOCR(
  buffer: ArrayBuffer,
  mimeType: string,
): Promise<string> {
  // This is a mock implementation
  // In a real application, you would integrate with an OCR service like:
  // - AWS Textract
  // - Google Vision API
  // - Azure Computer Vision
  // - Tesseract.js for client-side OCR

  if (mimeType.startsWith('image/')) {
    return `OCR processed image content - detected text from image file (${Math.floor(buffer.byteLength / 1024)}KB). This would contain the actual extracted text from the image.`
  }

  if (mimeType === 'application/pdf') {
    return `OCR processed PDF content - extracted text from PDF document (${Math.floor(buffer.byteLength / 1024)}KB). This would contain the actual text content from the PDF file.`
  }

  return 'No text content detected'
}
