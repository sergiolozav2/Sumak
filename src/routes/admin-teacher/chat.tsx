import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import {
  Send,
  Mic,
  Paperclip,
  Image,
  Plus,
  StopCircle,
  ChevronDown,
} from 'lucide-react'

export const Route = createFileRoute('/admin-teacher/chat')({
  component: RouteComponent,
})

interface ChatMessage {
  id: number
  content: string
  isUser: boolean
  timestamp: Date
  type: 'text' | 'image' | 'file'
  fileUrl?: string
  fileName?: string
}

interface Chat {
  id: number
  title: string
  messages: ChatMessage[]
  lastMessage: string
  updatedAt: Date
}

// Mock data for chats
const mockChats: Chat[] = [
  {
    id: 1,
    title: 'Help with Calculus',
    lastMessage: 'Can you explain derivatives?',
    updatedAt: new Date('2025-09-10T14:30:00'),
    messages: [
      {
        id: 1,
        content: 'Hello! I need help understanding derivatives in calculus.',
        isUser: true,
        timestamp: new Date('2025-09-10T14:25:00'),
        type: 'text',
      },
      {
        id: 2,
        content:
          "I'd be happy to help you with derivatives! A derivative represents the rate of change of a function. Think of it as the slope of a curve at any given point. Would you like me to explain the basic concept or do you have a specific problem you're working on?",
        isUser: false,
        timestamp: new Date('2025-09-10T14:26:00'),
        type: 'text',
      },
      {
        id: 3,
        content: 'Can you explain the power rule?',
        isUser: true,
        timestamp: new Date('2025-09-10T14:30:00'),
        type: 'text',
      },
    ],
  },
  {
    id: 2,
    title: 'Spanish Grammar',
    lastMessage: 'Explain subjunctive mood',
    updatedAt: new Date('2025-09-10T13:15:00'),
    messages: [
      {
        id: 4,
        content: 'I need help with Spanish subjunctive mood.',
        isUser: true,
        timestamp: new Date('2025-09-10T13:10:00'),
        type: 'text',
      },
      {
        id: 5,
        content:
          'The subjunctive mood in Spanish is used to express doubt, emotion, desire, or hypothetical situations. For example: "Espero que tengas un buen día" (I hope you have a good day). The key is recognizing trigger phrases that require subjunctive.',
        isUser: false,
        timestamp: new Date('2025-09-10T13:12:00'),
        type: 'text',
      },
      {
        id: 6,
        content: 'Can you give me more examples with emotions?',
        isUser: true,
        timestamp: new Date('2025-09-10T13:15:00'),
        type: 'text',
      },
    ],
  },
  {
    id: 3,
    title: 'Biology Questions',
    lastMessage: 'How does photosynthesis work?',
    updatedAt: new Date('2025-09-10T12:45:00'),
    messages: [
      {
        id: 7,
        content: 'How does photosynthesis work?',
        isUser: true,
        timestamp: new Date('2025-09-10T12:45:00'),
        type: 'text',
      },
    ],
  },
]

function RouteComponent() {
  const [chats, setChats] = useState<Chat[]>(mockChats)
  const [selectedChatId, setSelectedChatId] = useState<number | null>(1)
  const [messageInput, setMessageInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showAttachments, setShowAttachments] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const selectedChat = chats.find((chat) => chat.id === selectedChatId)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedChat?.messages])

  // Handle recording timer
  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
      }
      setRecordingTime(0)
    }

    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
      }
    }
  }, [isRecording])

  // Handle new chat
  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now(),
      title: 'New Chat',
      messages: [],
      lastMessage: '',
      updatedAt: new Date(),
    }
    setChats((prev) => [newChat, ...prev])
    setSelectedChatId(newChat.id)
  }

  // Handle chat selection
  const handleChatSelect = (chat: Chat) => {
    setSelectedChatId(chat.id)
  }

  // Handle send message
  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChatId) return

    const newMessage: ChatMessage = {
      id: Date.now(),
      content: messageInput.trim(),
      isUser: true,
      timestamp: new Date(),
      type: 'text',
    }

    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === selectedChatId) {
          const updatedMessages = [...chat.messages, newMessage]
          return {
            ...chat,
            messages: updatedMessages,
            lastMessage: messageInput.trim(),
            updatedAt: new Date(),
            title:
              chat.title === 'New Chat'
                ? messageInput.trim().substring(0, 30) + '...'
                : chat.title,
          }
        }
        return chat
      }),
    )

    setMessageInput('')

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: Date.now() + 1,
        content:
          'I understand your question. Let me help you with that. This is a mock response for demonstration purposes.',
        isUser: false,
        timestamp: new Date(),
        type: 'text',
      }

      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id === selectedChatId) {
            return {
              ...chat,
              messages: [...chat.messages, aiResponse],
              lastMessage: aiResponse.content,
              updatedAt: new Date(),
            }
          }
          return chat
        }),
      )
    }, 1000)
  }

  // Handle voice recording
  const handleStartRecording = () => {
    setIsRecording(true)
    // Here you would implement actual voice recording logic
    console.log('Starting voice recording...')
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    // Here you would implement stopping recording and converting to text
    console.log('Stopping voice recording...')

    // Mock: Add the "transcribed" text to input
    setMessageInput(
      (prev) => prev + 'This is mock transcribed text from voice recording.',
    )
  }

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !selectedChatId) return

    const newMessage: ChatMessage = {
      id: Date.now(),
      content: `Uploaded file: ${file.name}`,
      isUser: true,
      timestamp: new Date(),
      type: 'file',
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
    }

    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === selectedChatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: `File: ${file.name}`,
            updatedAt: new Date(),
          }
        }
        return chat
      }),
    )

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

    setShowAttachments(false)
  }

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !selectedChatId) return

    const newMessage: ChatMessage = {
      id: Date.now(),
      content: `Uploaded image: ${file.name}`,
      isUser: true,
      timestamp: new Date(),
      type: 'image',
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
    }

    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === selectedChatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: `Image: ${file.name}`,
            updatedAt: new Date(),
          }
        }
        return chat
      }),
    )

    // Reset image input
    if (imageInputRef.current) {
      imageInputRef.current.value = ''
    }

    setShowAttachments(false)
  }

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="h-full w-full">
      <div className="border-base-300 h-full border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base-content text-xl font-bold">
            AI Chat {selectedChat ? `- ${selectedChat.title}` : ''}
          </h2>
          <button onClick={handleNewChat} className="btn btn-primary">
            <Plus size={20} />
            New Chat
          </button>
        </div>
      </div>

      {/* Desktop layout - side by side */}
      <div className="flex h-[calc(100vh-127px)] min-h-[calc(100vh-127px)] flex-col overflow-clip md:max-h-full md:flex-row">
        {/* Chats sidebar - constant width */}
        <div className="border-base-300 flex w-full flex-col md:w-80 md:border-r">
          {/* Chats list */}
          <div className="md:collapse-open collapse">
            <input type="checkbox" className="md:hidden" />
            <div className="collapse-title flex gap-1 font-medium md:hidden">
              <ChevronDown size={23} /> Show chat history
            </div>
            <div className="collapse-content text-sm md:pt-4">
              <div className="flex flex-col gap-3">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleChatSelect(chat)}
                    className={`relative cursor-pointer rounded-lg border p-4 transition-colors ${
                      selectedChatId === chat.id
                        ? 'bg-primary/10 border-primary/20'
                        : 'bg-base-200 hover:border-neutral/45 border-neutral/20'
                    }`}
                  >
                    <h4 className="text-base-content mb-1 truncate font-medium">
                      {chat.title}
                    </h4>
                    <p className="text-base-content/70 line-clamp-1 text-sm">
                      {chat.lastMessage || 'No messages yet'}
                    </p>
                  </div>
                ))}

                {chats.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-base-content/60">No chats yet</p>
                    <p className="text-base-content/40 text-sm">
                      Start a new conversation
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex h-full flex-col">
          {selectedChat ? (
            <>
              {/* Messages area */}
              <div className="h-full overflow-y-auto p-4">
                <div className="mx-auto h-full max-w-3xl space-y-4">
                  {selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`chat ${message.isUser ? 'chat-end' : 'chat-start'}`}
                    >
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img
                            alt="Avatar"
                            src={
                              message.isUser
                                ? 'https://img.daisyui.com/images/profile/demo/anakeen@192.webp'
                                : 'https://img.daisyui.com/images/profile/demo/kenobee@192.webp'
                            }
                          />
                        </div>
                      </div>
                      <div className="chat-bubble">
                        {message.type === 'image' && message.fileUrl && (
                          <div className="mb-2">
                            <img
                              src={message.fileUrl}
                              alt={message.fileName}
                              className="max-w-xs rounded-lg"
                            />
                          </div>
                        )}
                        {message.type === 'file' && (
                          <div className="mb-2 flex items-center gap-2">
                            <Paperclip size={16} />
                            <span className="text-sm">{message.fileName}</span>
                          </div>
                        )}
                        {message.content}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input area */}
              <div className="border-base-300 border-t p-4">
                <div className="mx-auto max-w-3xl">
                  <div className="flex items-center gap-2">
                    {/* Attachment button */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowAttachments(!showAttachments)}
                        className="btn btn-ghost btn-sm btn-square"
                        title="Attach files"
                      >
                        <Plus size={20} />
                      </button>

                      {/* Attachment dropdown */}
                      {showAttachments && (
                        <div className="bg-base-100 border-base-300 absolute bottom-full left-0 mb-2 flex flex-col gap-1 rounded-lg border p-2 shadow-lg">
                          <button
                            type="button"
                            onClick={() => imageInputRef.current?.click()}
                            className="btn btn-ghost btn-sm flex items-center gap-2"
                          >
                            <Image size={16} />
                            Image
                          </button>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="btn btn-ghost btn-sm flex items-center gap-2"
                          >
                            <Paperclip size={16} />
                            File
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Text input */}
                    <div className="flex-1">
                      <textarea
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="textarea textarea-bordered w-full resize-none"
                        rows={1}
                        style={{ minHeight: '2.5rem', maxHeight: '10rem' }}
                      />
                    </div>

                    {/* Voice button */}
                    <button
                      type="button"
                      onClick={
                        isRecording ? handleStopRecording : handleStartRecording
                      }
                      className={`btn btn-square ${isRecording ? 'btn-error' : 'btn-ghost'}`}
                      title={
                        isRecording ? 'Stop recording' : 'Start voice recording'
                      }
                    >
                      {isRecording ? (
                        <StopCircle size={20} />
                      ) : (
                        <Mic size={20} />
                      )}
                    </button>

                    {/* Send button */}
                    <button
                      type="button"
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className="btn btn-primary btn-square"
                      title="Send message"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // No chat selected state
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <h3 className="text-base-content/60 text-lg font-medium">
                  Select a chat to start messaging
                </h3>
                <p className="text-base-content/40 mt-2 text-sm">
                  Choose from your chat history or create a new chat
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileUpload}
        className="hidden"
        accept="*/*"
      />
      <input
        ref={imageInputRef}
        type="file"
        onChange={handleImageUpload}
        className="hidden"
        accept="image/*"
      />
    </div>
  )
}
