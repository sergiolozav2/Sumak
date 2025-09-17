import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo, useRef } from 'react'
import { useTRPC } from '@/integrations/trpc/react'
import { useQuery, useMutation } from '@tanstack/react-query'
import {
  Search,
  MoreHorizontal,
  FileText,
  Download,
  Trash2,
  Eye,
  X,
  Plus,
} from 'lucide-react'

export const Route = createFileRoute('/admin-teacher/documents')({
  component: RouteComponent,
})

interface Document {
  id: number
  title: string
  url: string
  mimeType: string
  ocrDescription: string | null
  createdAt: Date
}

function RouteComponent() {
  const trpc = useTRPC()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null,
  )
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Fetch documents
  const {
    data: documentsData,
    isLoading,
    refetch,
  } = useQuery(
    trpc.files.getAll.queryOptions({
      limit: 100,
      offset: 0,
      ...(searchQuery.trim() && { search: searchQuery }),
    }),
  )

  const documents = documentsData?.files || []

  // Mutations
  const uploadMutation = useMutation(
    trpc.files.upload.mutationOptions({
      onSuccess: () => {
        refetch()
        setUploading(false)
      },
      onError: (error) => {
        console.error('Upload failed:', error)
        alert('Failed to upload file. Please try again.')
        setUploading(false)
      },
    }),
  )

  const deleteMutation = useMutation(
    trpc.files.delete.mutationOptions({
      onSuccess: () => {
        refetch()
        if (selectedDocument) {
          setSelectedDocument(null)
          setIsDrawerOpen(false)
        }
      },
      onError: (error) => {
        console.error('Delete failed:', error)
        alert('Failed to delete file. Please try again.')
      },
    }),
  )

  // Filter documents based on search query
  const filteredDocuments = useMemo(() => {
    if (!searchQuery.trim()) return documents

    return documents.filter(
      (doc: Document) =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.ocrDescription &&
          doc.ocrDescription.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }, [documents, searchQuery])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleViewDetails = (doc: Document) => {
    setSelectedDocument(doc)
    setIsDrawerOpen(true)
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    const title = file.name.replace(/\.[^/.]+$/, '') // Remove file extension

    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('performOcr', 'true') // Enable OCR by default

    try {
      uploadMutation.mutate(formData)
    } catch (error) {
      console.error('Upload error:', error)
      setUploading(false)
    }

    // Reset the input
    event.target.value = ''
  }

  const handleDownload = async (doc: Document) => {
    try {
      await downloadFile(doc, getFileExtension)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to download file. Please try again.')
    }
  }

  const handleDelete = (doc: Document) => {
    if (confirm(`Are you sure you want to delete "${doc.title}"?`)) {
      deleteMutation.mutate({
        id: doc.id,
        fileKey: doc.url,
      })
    }
  }

  const isImageType = (mimeType: string) => {
    return mimeType.startsWith('image/')
  }

  const getFileExtension = (mimeType: string): string => {
    const mimeToExt: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'image/svg+xml': 'svg',
      'application/pdf': 'pdf',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        'docx',
      'text/plain': 'txt',
      'application/vnd.ms-excel': 'xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        'xlsx',
      'application/vnd.ms-powerpoint': 'ppt',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        'pptx',
    }

    return mimeToExt[mimeType] || 'bin'
  }

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <div className="border-base-300 border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base-content text-xl font-bold">Documents</h2>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="btn btn-primary"
          >
            {uploading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <Plus size={20} />
            )}
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Main content with drawer */}
      <div className="drawer drawer-end">
        <input
          id="document-details-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={(e) => setIsDrawerOpen(e.target.checked)}
        />

        {/* Main documents content */}
        <div className="drawer-content flex flex-1 flex-col p-4 md:p-6">
          {/* Search bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="text-base-content/40 absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
            </div>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="flex flex-1 items-center justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}

          {/* Documents grid */}
          {!isLoading && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
              {filteredDocuments.map((doc: Document) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  onViewDetails={handleViewDetails}
                  onDownload={handleDownload}
                  onDelete={handleDelete}
                  formatDate={formatDate}
                  isImageType={isImageType}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && filteredDocuments.length === 0 && (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <FileText className="text-base-content/20 mx-auto mb-4 h-16 w-16" />
                <h3 className="text-base-content/60 mb-2 text-lg font-medium">
                  {searchQuery ? 'No documents found' : 'No documents yet'}
                </h3>
                <p className="text-base-content/40 text-sm">
                  {searchQuery
                    ? 'Try adjusting your search terms'
                    : 'Upload your first document to get started'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Drawer side */}
        <div className="drawer-side z-20">
          <label
            htmlFor="document-details-drawer"
            className="drawer-overlay"
          ></label>
          <div className="bg-base-100 flex h-full w-96 flex-col">
            {selectedDocument && (
              <>
                {/* Drawer header */}
                <div className="border-base-300 flex items-center justify-between border-b p-4">
                  <h3 className="text-base-content text-lg font-semibold">
                    Document Details
                  </h3>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="btn btn-ghost btn-sm btn-square"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Drawer content */}
                <div className="flex-1 overflow-y-auto p-4">
                  {/* Document icon/image */}
                  <div className="mb-4 flex justify-center">
                    {isImageType(selectedDocument.mimeType) ? (
                      <img
                        src={imageStorage(selectedDocument.url)}
                        alt={selectedDocument.title}
                        className="h-32 w-32 rounded-lg object-cover shadow-md"
                      />
                    ) : (
                      <div className="bg-base-200 flex h-32 w-32 items-center justify-center rounded-lg shadow-md">
                        <FileText className="text-base-content/40 h-12 w-12" />
                      </div>
                    )}
                  </div>

                  {/* Document info */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-base-content/60 text-sm font-medium">
                        Name
                      </label>
                      <p className="text-base-content mt-1">
                        {selectedDocument.title}
                      </p>
                    </div>

                    <div>
                      <label className="text-base-content/60 text-sm font-medium">
                        Type
                      </label>
                      <p className="text-base-content mt-1 capitalize">
                        {selectedDocument.mimeType}
                      </p>
                    </div>

                    <div>
                      <label className="text-base-content/60 text-sm font-medium">
                        Created
                      </label>
                      <p className="text-base-content mt-1">
                        {formatDate(selectedDocument.createdAt)}
                      </p>
                    </div>

                    <div>
                      <label className="text-base-content/60 text-sm font-medium">
                        OCR Content
                      </label>
                      <div className="bg-base-200 mt-2 rounded-lg p-3">
                        <p className="text-base-content/80 text-sm leading-relaxed whitespace-pre-line">
                          {selectedDocument.ocrDescription ||
                            'No OCR content available'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Drawer actions */}
                <div className="border-base-300 border-t p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(selectedDocument)}
                      className="btn btn-primary flex-1"
                    >
                      <Download size={16} />
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(selectedDocument)}
                      className="btn btn-error btn-outline flex-1"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface DocumentCardProps {
  document: Document
  onViewDetails: (doc: Document) => void
  onDownload: (doc: Document) => void
  onDelete: (doc: Document) => void
  formatDate: (date: Date) => string
  isImageType: (mimeType: string) => boolean
}

function DocumentCard({
  document,
  onViewDetails,
  onDownload,
  onDelete,
  formatDate,
  isImageType,
}: DocumentCardProps) {
  return (
    <div className="bg-base-100 group border-base-300 hover:border-primary/20 relative isolate rounded-lg border p-4 transition-all duration-200 hover:shadow-lg">
      {/* Document preview/icon */}
      <div className="mb-3 flex justify-center">
        {isImageType(document.mimeType) ? (
          <img
            src={imageStorage(document.url)}
            alt={document.title}
            className="h-32 w-32 rounded-lg object-cover shadow-md"
          />
        ) : (
          <div className="bg-base-200 flex h-32 w-32 items-center justify-center rounded-md">
            <FileText className="text-base-content/40 h-8 w-8" />
          </div>
        )}
      </div>

      {/* Document info */}
      <div className="mb-3">
        <h3 className="text-base-content mb-1 leading-tight font-medium">
          {document.title}
        </h3>
        <p className="text-base-content/60 text-sm">
          {formatDate(document.createdAt)}
        </p>
      </div>

      {/* Actions dropdown */}
      <div className="absolute top-2 right-2 isolate">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-sm btn-square opacity-0 transition-opacity group-hover:opacity-100"
          >
            <MoreHorizontal size={16} />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box border-base-300 z-[1] w-52 border p-2 shadow-lg"
          >
            <li>
              <button
                onClick={() => onViewDetails(document)}
                className="text-sm"
              >
                <Eye size={16} />
                View Details
              </button>
            </li>
            <li>
              <button onClick={() => onDownload(document)} className="text-sm">
                <Download size={16} />
                Download
              </button>
            </li>
            <li>
              <button
                onClick={() => onDelete(document)}
                className="text-error text-sm"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function imageStorage(filePath: string) {
  return `https://idzlwiijsertrxeuzdfs.supabase.co/storage/v1/object/public/uploads/${filePath}`
}

async function downloadFile(
  doc: Document,
  getFileExtension: (mimeType: string) => string,
) {
  const response = await fetch(imageStorage(doc.url))
  const blob = await response.blob()
  const url = window.URL.createObjectURL(blob)

  const fileExtension = getFileExtension(doc.mimeType)
  const fileName = `${doc.title}.${fileExtension}`

  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}
