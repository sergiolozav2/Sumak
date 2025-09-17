/**
 * Files Router for tRPC
 *
 * This router provides comprehensive file management capabilities including:
 * - File uploads with FormData support
 * - S3 storage integration
 * - OCR processing for images and PDFs
 * - File download via presigned URLs
 * - File search and metadata management
 *
 * Usage Examples:
 *
 * 1. File Upload:
 * ```typescript
 * const formData = new FormData()
 * formData.append('file', fileInput.files[0])
 * formData.append('title', 'My Document')
 * formData.append('performOcr', 'true')
 *
 * const result = await trpc.files.upload.mutate(formData)
 * ```
 *
 * 2. Get Files List:
 * ```typescript
 * const files = await trpc.files.getAll.query({
 *   limit: 10,
 *   offset: 0,
 *   mimeType: 'image/', // optional filter
 *   search: 'document' // optional search
 * })
 * ```
 *
 * 3. Download File:
 * ```typescript
 * const downloadInfo = await trpc.files.getDownloadUrl.query({
 *   fileId: 123,
 *   fileKey: 's3-file-key'
 * })
 * // Use downloadInfo.downloadUrl to download the file
 * ```
 *
 * 4. Search by OCR Content:
 * ```typescript
 * const results = await trpc.files.searchByContent.query({
 *   query: 'invoice',
 *   limit: 20
 * })
 * ```
 *
 * Required Environment Variables:
 * - STORAGE_ACCESS_KEY_ID: S3 access key
 * - STORAGE_SECRET_ACCESS_KEY: S3 secret key
 * - STORAGE_REGION: S3 region
 * - STORAGE_ENDPOINT: S3 endpoint URL
 *
 * Features:
 * - ✅ FormData support for file uploads
 * - ✅ S3 integration with automatic bucket creation
 * - ✅ OCR processing (mock implementation - replace with real service)
 * - ✅ Presigned URLs for secure downloads
 * - ✅ File metadata management
 * - ✅ Search functionality
 * - ✅ File statistics and analytics
 * - ✅ Proper error handling and stream processing
 *
 * Integration Notes:
 * - The tRPC client must be configured with splitLink to support FormData
 * - See /src/integrations/tanstack-query/root-provider.tsx for client config
 * - OCR function is currently mocked - integrate with your preferred OCR service
 */

export {}
