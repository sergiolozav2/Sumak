import { useMemo, useRef, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FileText, Search, Upload, X, Check } from 'lucide-react'
import { useTRPC } from '@/integrations/trpc/react'

interface Document {
  id: number
  title: string
  url: string
  mimeType: string
  ocrDescription: string | null
  createdAt: Date
}

interface FilePickerDialogProps {
  isOpen: boolean
  onClose: () => void
  onSelectFile: (fileId: number, fileName: string) => void
  title?: string
  description?: string
}

export function FilePickerDialog({
  isOpen,
  onClose,
  onSelectFile,
  title = 'Select a File',
  description = 'Choose a file from your documents or upload a new one.',
}: FilePickerDialogProps) {
  const trpc = useTRPC()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null)
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

  // Upload mutation
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
    })
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

  const handleSelectDocument = (doc: Document) => {
    setSelectedFileId(doc.id)
  }

  const handleConfirmSelection = () => {
    if (selectedFileId) {
      const selectedDoc = documents.find((doc) => doc.id === selectedFileId)
      if (selectedDoc) {
        onSelectFile(selectedFileId, selectedDoc.title)
        handleClose()
      }
    }
  }

  const handleClose = () => {
    setSelectedFileId(null)
    setSearchQuery('')
    onClose()
  }

  const isImageType = (mimeType: string) => {
    return mimeType.startsWith('image/')
  }

  const imageStorage = (filePath: string) => {
    return `https://idzlwiijsertrxeuzdfs.supabase.co/storage/v1/object/public/uploads/${filePath}`
  }

  if (!isOpen) return null

  return (
    <dialog open={isOpen} className="modal">
      <div className="modal-box w-full max-w-4xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-base-content text-lg font-bold">{title}</h3>
            <p className="text-base-content/60 mt-1 text-sm">{description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="btn btn-primary btn-sm"
            >
              {uploading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <Upload size={16} />
              )}
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
            <button
              onClick={handleClose}
              className="btn btn-ghost btn-sm btn-square"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="text-base-content/40 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pl-10"
            />
          </div>
        </div>

        {/* Content */}
        <div className="mb-4 max-h-96 overflow-y-auto">
          {/* Loading state */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}

          {/* Documents grid */}
          {!isLoading && filteredDocuments.length > 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDocuments.map((doc: Document) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  isSelected={selectedFileId === doc.id}
                  onSelect={handleSelectDocument}
                  formatDate={formatDate}
                  isImageType={isImageType}
                  imageStorage={imageStorage}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && filteredDocuments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <FileText className="text-base-content/20 mb-4 h-12 w-12" />
              <h4 className="text-base-content/60 mb-2 text-lg font-medium">
                {searchQuery ? 'No documents found' : 'No documents yet'}
              </h4>
              <p className="text-base-content/40 text-center text-sm">
                {searchQuery
                  ? 'Try adjusting your search terms'
                  : 'Upload your first document to get started'}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button onClick={handleClose} className="btn btn-ghost">
            Cancel
          </button>
          <button
            onClick={handleConfirmSelection}
            disabled={!selectedFileId}
            className="btn btn-primary"
          >
            <Check size={16} />
            Select File
          </button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  )
}

interface DocumentCardProps {
  document: Document
  isSelected: boolean
  onSelect: (doc: Document) => void
  formatDate: (date: Date) => string
  isImageType: (mimeType: string) => boolean
  imageStorage: (filePath: string) => string
}

function DocumentCard({
  document,
  isSelected,
  onSelect,
  formatDate,
  isImageType,
  imageStorage,
}: DocumentCardProps) {
  return (
    <div
      onClick={() => onSelect(document)}
      className={`group relative cursor-pointer rounded-lg border p-3 transition-all duration-200 hover:shadow-lg ${
        isSelected
          ? 'border-primary bg-primary/10'
          : 'border-base-300 bg-base-100 hover:border-primary/20'
      }`}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-primary text-primary-content rounded-full p-1">
            <Check size={14} />
          </div>
        </div>
      )}

      {/* Document preview/icon */}
      <div className="mb-2 flex justify-center">
        {isImageType(document.mimeType) ? (
          <img
            src={imageStorage(document.url)}
            alt={document.title}
            className="h-20 w-20 rounded object-cover"
          />
        ) : (
          <div className="bg-base-200 flex h-20 w-20 items-center justify-center rounded">
            <FileText className="text-base-content/40 h-8 w-8" />
          </div>
        )}
      </div>

      {/* Document info */}
      <div className="text-center">
        <h4 className="text-base-content mb-1 truncate text-sm font-medium">
          {document.title}
        </h4>
        <p className="text-base-content/60 text-xs">
          {formatDate(document.createdAt)}
        </p>
      </div>
    </div>
  )
}
