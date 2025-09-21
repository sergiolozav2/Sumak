import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ChevronDown,
  Image,
  Mic,
  Paperclip,
  Plus,
  Send,
  StopCircle,
  Trash2,
} from 'lucide-react'
import { useMutation, useQuery, keepPreviousData } from '@tanstack/react-query'
import { useSpeechRecognizer } from '@/hooks/use-speech-recognition'
import { useTRPC } from '@/integrations/trpc/react'
import { trpcClient } from '@/integrations/tanstack-query/root-provider'
import {
  StreamingMessage,
  ChatMessage,
} from '@/components/chat/streaming-message'

export const Route = createFileRoute('/admin-teacher/chat')({
  component: RouteComponent,
})

// Updated interfaces to match database schema
interface DatabaseChatMessage {
  id: number
  message: string
  thinkingProcess?: string | null
  fromSystem: boolean
  createdAt: Date
  chatId: number
}

interface Chat {
  id: number
  title: string
  messages: Array<DatabaseChatMessage>
}

function RouteComponent() {
  const trpc = useTRPC()

  // tRPC queries and mutations
  const chatsQuery = useQuery({
    ...trpc.chat.getAll.queryOptions(),
  })
  const createChatWithMessageMutation = useMutation(
    trpc.chat.createWithMessage.mutationOptions({
      onSuccess: (newChat) => {
        if (newChat) {
          setSelectedChatId(newChat.id)
        }
        chatsQuery.refetch()
        setMessageInput('')
      },
    }),
  )

  // We'll handle streaming manually instead of using useMutation

  const deleteChatMutation = useMutation(
    trpc.chat.delete.mutationOptions({
      onSuccess: () => {
        chatsQuery.refetch()
        setSelectedChatId(null)
      },
    }),
  )

  const deleteMessageMutation = useMutation(
    trpc.chat.deleteMessage.mutationOptions({
      onSuccess: () => {
        chatsQuery.refetch()
      },
    }),
  )

  const [selectedChatId, setSelectedChatId] = useState<number | null>(null)
  const [messageInput, setMessageInput] = useState('')
  const [showAttachments, setShowAttachments] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState<AsyncGenerator<
    { chunk: string },
    any,
    unknown
  > | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [optimisticChat, setOptimisticChat] = useState<Chat | null>(null)
  const [isCreatingChat, setIsCreatingChat] = useState(false)

  // Speech recognition hook
  const onSpeechResult = useCallback(
    (result: string) => {
      setMessageInput((old) => old + ' ' + result)
    },
    [setMessageInput],
  )
  const speechRecognition = useSpeechRecognizer({ onResult: onSpeechResult })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chats = chatsQuery.data || []
  const allChats = optimisticChat ? [optimisticChat, ...chats] : chats
  const selectedChat = allChats.find((chat) => chat.id === selectedChatId)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedChat?.messages])

  // Handle new chat - now just unselects current chat
  const handleNewChat = () => {
    setSelectedChatId(null)
    setOptimisticChat(null)
    setIsStreaming(false)
    setStreamingMessage(null)
  }

  // Handle chat selection
  const handleChatSelect = (chat: Chat) => {
    setSelectedChatId(chat.id)
    // Clear optimistic chat when selecting a real chat
    if (optimisticChat && chat.id !== optimisticChat.id) {
      setOptimisticChat(null)
    }
  }

  // Handle delete chat
  const handleDeleteChat = (chatId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Are you sure you want to delete this chat?')) {
      deleteChatMutation.mutate({ id: chatId })
    }
  }

  // Handle delete message
  const handleDeleteMessage = (messageId: number) => {
    if (confirm('Are you sure you want to delete this message?')) {
      deleteMessageMutation.mutate({ messageId })
    }
  }

  // Handle streaming message completion
  const handleStreamingComplete = () => {
    const currentSelectedId = selectedChatId

    // Refresh chats and maintain selection
    chatsQuery.refetch().then(() => {
      // If we had a selected chat, try to keep it selected
      setIsStreaming(false)
      setStreamingMessage(null)
      setOptimisticChat(null)

      if (currentSelectedId && currentSelectedId > 0) {
        setSelectedChatId(currentSelectedId)
      }
    })
  }

  // Handle send message
  const handleSendMessage = async () => {
    if (!messageInput.trim()) return

    // If no chat is selected, create a new chat with the message using streaming
    if (!selectedChatId) {
      if (isCreatingChat || isStreaming) return

      const message = messageInput.trim()
      setMessageInput('')
      setIsCreatingChat(true)
      setIsStreaming(true)

      // Create instant optimistic chat
      const tempTitle =
        message.length > 50 ? message.substring(0, 50) + '...' : message
      const optimisticChatData: Chat = {
        id: -Date.now(), // Use negative timestamp as temporary ID
        title: tempTitle,
        messages: [
          {
            id: -1,
            message: message,
            thinkingProcess: null,
            fromSystem: false,
            createdAt: new Date(),
            chatId: -Date.now(),
          },
        ],
      }

      // Set optimistic chat immediately
      setOptimisticChat(optimisticChatData)
      setSelectedChatId(optimisticChatData.id)

      try {
        // Call the streaming chat creation mutation
        const streamingResponse =
          await trpcClient.chat.createWithMessageStream.mutate({
            message: message,
          })

        // Process the streaming response
        if (
          streamingResponse &&
          typeof streamingResponse[Symbol.asyncIterator] === 'function'
        ) {
          // Create a generator that processes the different message types
          const processedStream = (async function* () {
            for await (const item of streamingResponse) {
              if (item.type === 'chunk') {
                yield { chunk: item.chunk }
              } else if (item.type === 'complete') {
                chatsQuery.refetch().then(() => {
                  setIsCreatingChat(false)
                  setOptimisticChat(null)
                  setSelectedChatId(item.chatId)
                })
              }
            }
          })()

          setStreamingMessage(processedStream)
        }
      } catch (error) {
        console.error('Error creating chat:', error)
        setIsStreaming(false)
        setStreamingMessage(null)
        setOptimisticChat(null)
        setMessageInput(message) // Restore message input on error
        setIsCreatingChat(false)
      }
      return
    }

    // If chat is selected, send message to existing chat
    if (isSending || isStreaming) return

    const message = messageInput.trim()
    setMessageInput('')
    setIsSending(true)
    setIsStreaming(true)

    try {
      // Call the streaming mutation directly from tRPC client
      const streamingResponse = await trpcClient.chat.sendMessage.mutate({
        chatId: selectedChatId,
        message: message,
      })

      // The response should be an AsyncGenerator
      if (
        streamingResponse &&
        typeof streamingResponse[Symbol.asyncIterator] === 'function'
      ) {
        setStreamingMessage(
          streamingResponse as AsyncGenerator<{ chunk: string }, any, unknown>,
        )
      }
      setIsSending(false)
    } catch (error) {
      console.error('Error sending message:', error)
      setIsStreaming(false)
      setStreamingMessage(null)
      setMessageInput(message) // Restore message input on error
      setIsSending(false)
    }
  }

  // Handle voice recording
  const handleToggleSpeechRecognition = () => {
    if (!speechRecognition.isSupported) {
      alert('Speech recognition is not supported in this browser')
      return
    }
    if (speechRecognition.isListening) {
      speechRecognition.stop()
      return
    }
    speechRecognition.start()
  }

  // Handle file upload (simplified for now - could be extended to handle actual file uploads)
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file || !selectedChatId || isSending) return

    setIsSending(true)
    try {
      await trpcClient.chat.sendMessage.mutate({
        chatId: selectedChatId,
        message: `📎 Uploaded file: ${file.name}`,
      })
      chatsQuery.refetch()
    } catch (error) {
      console.error('Error uploading file:', error)
    }
    setIsSending(false)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setShowAttachments(false)
  }

  // Handle image upload (simplified for now)
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file || !selectedChatId || isSending) return

    setIsSending(true)
    try {
      await trpcClient.chat.sendMessage.mutate({
        chatId: selectedChatId,
        message: `🖼️ Uploaded image: ${file.name}`,
      })
      chatsQuery.refetch()
    } catch (error) {
      console.error('Error uploading image:', error)
    }
    setIsSending(false)

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

  // Get last message for display
  const getLastMessage = (chat: Chat) => {
    if (chat.messages.length === 0) return 'No messages yet'
    const lastMessage = chat.messages[chat.messages.length - 1]
    return lastMessage.message.length > 50
      ? lastMessage.message.substring(0, 50) + '...'
      : lastMessage.message
  }

  return (
    <div className="h-full w-full overflow-x-hidden">
      <div className="border-base-300 flex w-full border-b py-4">
        <div className="flex w-full items-center justify-between px-4">
          <h2 className="text-base-content line-clamp-1 overflow-hidden text-xl font-bold text-ellipsis">
            AI Tutor {selectedChat ? `- ${selectedChat.title}` : ''}
          </h2>
          <button onClick={handleNewChat} className="btn btn-primary">
            <Plus size={20} />
            New Chat
          </button>
        </div>
      </div>

      {/* Desktop layout - side by side */}
      <div className="responsive-app-container-height flex h-full w-full flex-col overflow-clip md:max-h-full md:flex-row">
        {/* Chats sidebar - constant width */}
        <div className="border-base-300 flex w-full flex-col md:w-80 md:min-w-80 md:border-r">
          {/* Chats list */}
          <div className="md:collapse-open collapse">
            <input type="checkbox" className="md:hidden" />
            <div className="collapse-title flex gap-1 font-medium md:hidden">
              <ChevronDown size={23} /> Show chat history
            </div>
            <div className="collapse-content w-full text-sm md:pt-4">
              <div className="flex w-full flex-col gap-2 md:gap-3">
                {allChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleChatSelect(chat)}
                    className={`group relative w-full cursor-pointer rounded-lg border p-2 transition-colors md:max-w-72 md:p-4 ${
                      selectedChatId === chat.id
                        ? 'bg-primary/10 border-primary/20'
                        : 'bg-base-200 hover:border-neutral/45 border-neutral/20'
                    } ${chat === optimisticChat ? 'opacity-75' : ''}`}
                  >
                    <div className="relative flex w-full">
                      <div className="w-full min-w-0 flex-1">
                        <h4 className="text-base-content flex w-full items-center gap-2 truncate font-medium">
                          {chat.title}
                          {chat === optimisticChat && (
                            <span className="loading loading-dots loading-xs"></span>
                          )}
                        </h4>
                        <p className="text-base-content/70 line-clamp-1 hidden text-sm md:block">
                          {getLastMessage(chat)}
                        </p>
                      </div>
                      {/* Only show delete button for real chats (positive IDs) */}
                      {chat.id > 0 && (
                        <button
                          onClick={(e) => handleDeleteChat(chat.id, e)}
                          className="btn btn-xs btn-ghost btn-circle absolute -top-2 -right-2 opacity-0 transition-opacity group-hover:opacity-100"
                          title="Delete chat"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {chatsQuery.isLoading && (
                  <span className="loading loading-spinner loading-md mx-auto"></span>
                )}

                {!chatsQuery.isLoading && allChats.length === 0 && (
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
        <div className="relative flex h-full w-full flex-col">
          {selectedChat ? (
            <div className="mb-14 h-full w-full overflow-y-auto px-2 md:p-4">
              {/* Comments area */}
              <div className="mx-auto flex max-w-3xl flex-col text-sm md:text-base">
                {selectedChat.messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    onDelete={handleDeleteMessage}
                  />
                ))}

                {/* Show streaming message if active */}
                {streamingMessage && (
                  <StreamingMessage
                    chunks={streamingMessage}
                    onComplete={handleStreamingComplete}
                  />
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <h3 className="text-base-content/60 text-lg font-medium">
                  Start a new conversation
                </h3>
                <p className="text-base-content/40 mt-2 text-sm">
                  Type a message below to begin a new chat
                </p>
              </div>
            </div>
          )}
          {/* Input area */}
          <div className="border-base-300 bg-base-100 absolute right-0 bottom-0 left-0 border-t p-2">
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
                    value={
                      messageInput +
                      (speechRecognition.isListening
                        ? ' ' + speechRecognition.interimTranscript
                        : '')
                    }
                    onChange={(e) => {
                      setMessageInput(e.target.value)
                    }}
                    onKeyDown={handleKeyPress}
                    placeholder={
                      selectedChatId
                        ? 'Type your message'
                        : 'Start a new conversation...'
                    }
                    className={`textarea textarea-bordered w-full resize-none ${
                      speechRecognition.isListening
                        ? 'border-primary animate-pulse'
                        : ''
                    }`}
                    rows={1}
                    style={{ minHeight: '2.5rem', maxHeight: '10rem' }}
                  />
                </div>

                {/* Voice button */}
                <button
                  type="button"
                  onClick={handleToggleSpeechRecognition}
                  disabled={!speechRecognition.isSupported}
                  className={`btn btn-square ${
                    speechRecognition.isListening
                      ? 'btn-error animate-pulse'
                      : speechRecognition.isSupported
                        ? 'btn-ghost'
                        : 'btn-disabled'
                  }`}
                  title={
                    !speechRecognition.isSupported
                      ? 'Speech recognition not supported'
                      : speechRecognition.isListening
                        ? 'Stop listening'
                        : 'Start voice input'
                  }
                >
                  {speechRecognition.isListening ? (
                    <StopCircle size={20} />
                  ) : (
                    <Mic size={20} />
                  )}
                </button>

                {/* Send button */}
                <button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={
                    !messageInput.trim() ||
                    isSending ||
                    createChatWithMessageMutation.isPending ||
                    isStreaming ||
                    isCreatingChat
                  }
                  className="btn btn-primary btn-square"
                  title={selectedChatId ? 'Send message' : 'Start new chat'}
                >
                  {isSending ||
                  createChatWithMessageMutation.isPending ||
                  isStreaming ||
                  isCreatingChat ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
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
