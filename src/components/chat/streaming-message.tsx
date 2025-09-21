import { useEffect, useRef, useState } from 'react'
import Markdown from '@/components/common/markdown'
import Logo from '@/components/common/logo'

interface StreamingMessageProps {
  chunks: AsyncGenerator<{ chunk: string }, any, unknown> | undefined
  onComplete?: () => void
}

export function StreamingMessage({
  chunks,
  onComplete,
}: StreamingMessageProps) {
  const [thinkingContent, setThinkingContent] = useState('')

  const response = useRef<string>('')

  const [finalContent, setFinalContent] = useState('')
  const [isThinking, setIsThinking] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  useEffect(() => {
    if (!chunks) return

    let hasFoundEndThink = false

    const processStream = async () => {
      try {
        for await (const { chunk } of chunks) {
          response.current += chunk
          // Check if we've found the </think> tag
          if (!hasFoundEndThink && response.current?.includes('</think>')) {
            hasFoundEndThink = true
            setIsThinking(false)

            // Extract thinking content and actual content
            const thinkEndIndex = response.current.indexOf('</think>')
            const thinking = response.current.substring(0, thinkEndIndex + 8)
            const actual = response.current.substring(thinkEndIndex + 8).trim()

            setThinkingContent(thinking)
            console.log(thinking)
            setFinalContent(actual)
          } else if (hasFoundEndThink && response.current) {
            // We're past the thinking phase, update the actual content
            const thinkEndIndex = response.current.indexOf('</think>')
            const thinking = response.current?.substring(0, thinkEndIndex + 8)
            const actual = response.current?.substring(thinkEndIndex + 8).trim()
            setThinkingContent(thinking)
            setFinalContent(actual)
          } else {
            // Still in thinking mode
            setThinkingContent(response.current || '')
          }
        }

        setIsComplete(true)

        // Call onComplete
        if (onComplete) {
          onComplete()
        }
      } catch (error) {
        console.error('Error processing stream:', error)
        setIsComplete(true)
        if (onComplete) {
          onComplete()
        }
      }
    }

    processStream()
  }, [chunks, onComplete])

  return (
    <div className="chat chat-start mb-0 md:mb-2">
      <div className="chat-image avatar">
        <Logo className="rounded-full" />
      </div>
      <div className="chat-bubble relative min-w-0">
        {/* Always show thinking process if it exists */}
        {thinkingContent && (
          <details className="mb-3" open={isThinking && !isComplete}>
            <summary className="text-primary flex cursor-pointer items-center gap-2 text-sm font-medium">
              {isThinking && !isComplete && (
                <span className="loading loading-dots loading-xs"></span>
              )}
              Thinking Process
            </summary>
            <div className="bg-base-200 border-primary/30 mt-2 rounded border-l-2 p-3 font-mono text-xs whitespace-pre-wrap opacity-90">
              <Markdown>{thinkingContent}</Markdown>
              {isThinking && !isComplete && (
                <span className="bg-primary ml-1 inline-block h-3 w-1 animate-pulse rounded-sm"></span>
              )}
            </div>
          </details>
        )}

        {/* Show final content */}
        {finalContent && (
          <div>
            <Markdown>{finalContent}</Markdown>
            {!isComplete && !isThinking && (
              <span className="bg-primary ml-1 inline-block h-4 w-2 animate-pulse rounded-sm"></span>
            )}
          </div>
        )}

        {/* Show loading state when no content yet */}
        {!thinkingContent && !finalContent && !isComplete && (
          <div className="flex items-center gap-2 text-sm opacity-60">
            <span className="loading loading-dots loading-sm"></span>
            <span className="font-medium">AI is starting to think...</span>
          </div>
        )}

        {/* Show error state */}
        {isComplete && !thinkingContent && !finalContent && (
          <div className="text-sm opacity-60">
            <span>No response generated.</span>
          </div>
        )}
      </div>
    </div>
  )
}

interface ChatMessageProps {
  message: {
    id: number
    message: string
    thinkingProcess?: string | null
    fromSystem: boolean
    createdAt: Date
    chatId: number
  }
  onDelete?: (messageId: number) => void
}

export function ChatMessage({ message, onDelete }: ChatMessageProps) {
  return (
    <div
      className={`chat mb-0 md:mb-2 ${!message.fromSystem ? 'chat-end' : 'chat-start'}`}
    >
      <div className="chat-image avatar">
        {message.fromSystem ? (
          <Logo className="rounded-full" />
        ) : (
          <div className="w-10 rounded-full">
            <img
              alt="Avatar"
              src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
            />
          </div>
        )}
      </div>
      <div className="chat-bubble group relative min-w-0">
        {/* Show thinking process if it exists for system messages */}
        {message.fromSystem && message.thinkingProcess && (
          <details className="mb-3">
            <summary className="text-primary flex cursor-pointer items-center gap-2 text-sm font-medium">
              Thinking Process
            </summary>
            <div className="bg-base-200 border-primary/30 mt-2 rounded border-l-2 p-3 font-mono text-xs whitespace-pre-wrap opacity-90">
              <Markdown>{message.thinkingProcess}</Markdown>
            </div>
          </details>
        )}

        {/* Show final message content */}
        <Markdown>{message.message}</Markdown>

        {/* Delete message button */}
        {!message.fromSystem && onDelete && (
          <button
            onClick={() => onDelete(message.id)}
            className="btn btn-xs btn-circle btn-error absolute -top-2 -right-2 opacity-0 transition-opacity group-hover:opacity-100"
            title="Delete message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-3 w-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
