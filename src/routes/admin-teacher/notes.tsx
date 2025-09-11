import { createFileRoute } from '@tanstack/react-router'
import { useTRPC } from '@/integrations/trpc/react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useState, useEffect, useCallback } from 'react'
import {
  ChevronDown,
  Mic,
  Paperclip,
  Plus,
  Languages,
  HelpCircle,
  BookOpen,
  Eye,
} from 'lucide-react'
import { useSpeechRecognizer } from '@/hooks/use-speech-recognition'

export const Route = createFileRoute('/admin-teacher/notes')({
  component: RouteComponent,
})

function RouteComponent() {
  const trpc = useTRPC()
  const fetchNotes = useQuery(trpc.notes.getAll.queryOptions())

  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const onSpeechResult = useCallback(
    (result: string) => {
      console.log(result)
      setContent((old) => old + ' ' + result)
    },
    [setContent],
  )
  const speechRecognition = useSpeechRecognizer({ onResult: onSpeechResult })

  const notes = fetchNotes.data

  // Mutations
  const createNoteMutation = useMutation(
    trpc.notes.create.mutationOptions({
      onSuccess: (newNote) => {
        setSelectedNoteId(newNote.id)
        setHasUnsavedChanges(false)
        fetchNotes.refetch()
      },
      onSettled: () => {
        setIsSaving(false)
      },
    }),
  )

  const updateNoteMutation = useMutation(
    trpc.notes.update.mutationOptions({
      onSuccess: () => {
        setHasUnsavedChanges(false)
        fetchNotes.refetch()
      },
      onSettled: () => {
        setIsSaving(false)
      },
    }),
  )

  const deleteNoteMutation = useMutation(
    trpc.notes.delete.mutationOptions({
      onSuccess: () => {
        fetchNotes.refetch()
        handleNewNote()
      },
    }),
  )

  // Track changes
  useEffect(() => {
    if (selectedNoteId) {
      const originalNote = notes?.find((note) => note.id === selectedNoteId)
      if (originalNote) {
        const hasChanges =
          title !== originalNote.title || content !== originalNote.content
        setHasUnsavedChanges(hasChanges)
      }
    } else {
      setHasUnsavedChanges(title.trim() !== '' || content.trim() !== '')
    }
  }, [title, content, selectedNoteId, notes])

  // Handle note selection
  const handleNoteSelect = (note: any) => {
    setSelectedNoteId(note.id)
    setTitle(note.title)
    setContent(note.content)
    setHasUnsavedChanges(false)
  }

  // Handle new note
  const handleNewNote = () => {
    setSelectedNoteId(null)
    setTitle('')
    setContent('')
    setHasUnsavedChanges(false)
  }

  // Save note
  const handleSave = async () => {
    setIsSaving(true)
    try {
      if (selectedNoteId) {
        // Update existing note
        updateNoteMutation.mutate({
          id: selectedNoteId,
          title: title.trim() || 'Untitled',
          content: content,
        })
      } else {
        // Create new note
        createNoteMutation.mutate({
          title: title.trim() || 'Untitled',
          content: content,
        })
      }
    } catch (error) {
      console.error('Failed to save note:', error)
      setIsSaving(false)
    }
  }

  // Delete note
  const handleDelete = async () => {
    if (
      !selectedNoteId ||
      !confirm('Are you sure you want to delete this note?')
    )
      return

    try {
      deleteNoteMutation.mutate({ id: selectedNoteId })
    } catch (error) {
      console.error('Failed to delete note:', error)
    }
  }

  // Auto-save on Ctrl+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        if (hasUnsavedChanges) {
          handleSave()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hasUnsavedChanges, handleSave])

  // Action handlers
  const handleTranslate = () => {
    console.log('Translate action', {
      noteId: selectedNoteId,
      title,
      content,
      action: 'translate',
    })
  }

  const handleExplain = () => {
    console.log('Explain action', {
      noteId: selectedNoteId,
      title,
      content,
      action: 'explain',
    })
  }

  const handleStudy = () => {
    console.log('Study action', {
      noteId: selectedNoteId,
      title,
      content,
      action: 'study',
    })
  }

  const handleVisualize = () => {
    console.log('Visualize action', {
      noteId: selectedNoteId,
      title,
      content,
      action: 'visualize',
    })
  }

  const originalNote = notes?.find((note) => note.id === selectedNoteId)

  return (
    <div className="flex h-full w-full flex-col">
      <div className="border-base-300 border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base-content text-xl font-bold">
            Notes {originalNote ? `- ${originalNote.title}` : ''}
          </h2>
          <button onClick={handleNewNote} className="btn btn-primary">
            <Plus size={20} />
            New
          </button>
        </div>
      </div>

      {/* Desktop layout - side by side */}
      <div className="responsive-app-container flex h-full flex-col md:flex-row">
        {/* Notes sidebar - constant width */}
        <div className="border-base-300 flex w-full flex-col md:w-80 md:border-r">
          {/* Sidebar header */}
          {/* Notes list */}
          <div className="md:collapse-open collapse">
            <input type="checkbox" className="md:hidden" />
            <div className="collapse-title flex gap-1 font-medium md:hidden">
              <ChevronDown size={23} /> Show my notes
            </div>
            <div className="collapse-content text-sm md:pt-4">
              <div className="flex flex-col gap-2 md:gap-3">
                {fetchNotes.isLoading && (
                  <span className="loading loading-spinner loading-md mx-auto"></span>
                )}
                {notes?.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => handleNoteSelect(note)}
                    className={`relative cursor-pointer rounded-lg border p-2 transition-colors md:p-4 ${
                      selectedNoteId === note.id
                        ? 'bg-primary/10 border-primary/20'
                        : 'bg-base-200 hover:border-neutral/45 border-neutral/20'
                    }`}
                  >
                    <h4 className="text-base-content truncate font-medium">
                      {note.title || 'Untitled'}
                    </h4>
                    <p className="text-base-content/70 line-clamp-1 hidden text-sm md:block">
                      {note.content?.substring(0, 80)}
                    </p>
                  </div>
                ))}

                {notes?.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-base-content/60">No notes yet</p>
                    <p className="text-base-content/40 text-sm">
                      Create your first note to get started
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Editor area - centered with max width */}
        <div className="flex h-full flex-1">
          <div className="mx-auto max-w-3xl">
            <div className="border-base-200 flex h-full flex-col px-4 md:px-12 md:py-6">
              {/* Editor header with actions */}
              <div className="mb-1 flex items-center justify-between text-sm font-medium md:mb-6">
                <div className="text-base-content/80">
                  {hasUnsavedChanges && (
                    <span className="text-warning">● Unsaved changes</span>
                  )}
                  {!hasUnsavedChanges && selectedNoteId && (
                    <span className="text-success">✓ Saved</span>
                  )}
                </div>
                <div className="flex gap-2">
                  {selectedNoteId && (
                    <button
                      onClick={handleDelete}
                      className="btn btn-sm btn-error btn-outline"
                    >
                      Delete
                    </button>
                  )}
                  <button
                    onClick={handleSave}
                    disabled={isSaving || !hasUnsavedChanges}
                    className="btn btn-sm btn-primary"
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* Title field */}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title..."
                className="placeholder:text-base-content/40 text-base-content mb-2 w-full border-none bg-transparent text-3xl font-semibold outline-none md:mb-6"
              />

              {/* Botón de dictado por voz y subir archivos */}
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className={`btn btn-primary ${speechRecognition.isListening ? 'border-primary animate-pulse' : ''}`}
                  title="Dictar por voz"
                  onClick={() => speechRecognition.start()}
                >
                  <Mic size={20} />
                  <span className="ml-1 hidden md:inline">Voice</span>
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-primary"
                  title="Subir archivo"
                >
                  <Paperclip size={20} />
                  <span className="ml-1 hidden md:inline">Upload</span>
                </button>
              </div>

              {/* Content field */}
              <textarea
                value={
                  content +
                  (speechRecognition.isListening
                    ? ' ' + speechRecognition.interimTranscript
                    : '')
                }
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your thoughts..."
                className="placeholder:text-base-content/50 text-base-content w-full flex-1 resize-none border-none bg-transparent text-lg leading-relaxed outline-none"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              />

              {/* Action buttons */}
              <div className="mt-6 mb-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleTranslate}
                  className="btn btn-outline"
                  disabled={!content.trim()}
                  title="Translate content"
                >
                  <Languages size={20} />
                  <span className="ml-1">Translate</span>
                </button>
                <button
                  type="button"
                  onClick={handleExplain}
                  className="btn btn-outline"
                  disabled={!content.trim()}
                  title="Explain content"
                >
                  <HelpCircle size={20} />
                  <span className="ml-1">Explain</span>
                </button>
                <button
                  type="button"
                  onClick={handleStudy}
                  className="btn btn-outline"
                  disabled={!content.trim()}
                  title="Create study materials"
                >
                  <BookOpen size={20} />
                  <span className="ml-1">Study</span>
                </button>
                <button
                  type="button"
                  onClick={handleVisualize}
                  className="btn btn-outline"
                  disabled={!content.trim()}
                  title="Visualize content"
                >
                  <Eye size={20} />
                  <span className="ml-1">Visualize</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
