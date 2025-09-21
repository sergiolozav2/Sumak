import { useEffect, useState } from 'react'
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
  const [displayText, setDisplayText] = useState('')
  const [isThinking, setIsThinking] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  console.log(chunks)
  useEffect(() => {
    if (!chunks) return

    let fullText = ''
    let hasFoundEndThink = false

    const processStream = async () => {
      try {
        for await (const { chunk } of chunks) {
          fullText += chunk
          console.log(chunk)
          // Check if we've found the </think> tag
          if (!hasFoundEndThink && fullText.includes('</think>')) {
            hasFoundEndThink = true
            setIsThinking(false)

            // Extract thinking content and actual content
            const thinkEndIndex = fullText.indexOf('</think>')
            const actual = fullText.substring(thinkEndIndex + 8).trim()

            setDisplayText(actual)
          } else if (hasFoundEndThink) {
            // We're past the thinking phase, update the actual content
            const thinkEndIndex = fullText.indexOf('</think>')
            const actual = fullText.substring(thinkEndIndex + 8).trim()
            setDisplayText(actual)
          } else {
            // Still in thinking mode
            setDisplayText(fullText)
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
        {isThinking && !isComplete && (
          <div className="mb-2 text-sm opacity-60">
            <div className="flex items-center gap-2">
              <span className="loading loading-dots loading-sm"></span>
              <span className="font-medium">AI is thinking...</span>
            </div>
            {displayText && (
              <details className="mt-2">
                <summary className="cursor-pointer text-xs underline">
                  View thinking process
                </summary>
                <div className="bg-base-200 border-primary/30 mt-1 flex w-full rounded border-l-2 p-2 font-mono text-xs whitespace-pre-wrap opacity-80">
                  <Markdown>{displayText}</Markdown>
                </div>
              </details>
            )}
          </div>
        )}

        {(!isThinking || isComplete) && (
          <div>
            <Markdown>{displayText}</Markdown>
            {!isComplete && (
              <span className="bg-primary ml-1 inline-block h-4 w-2 animate-pulse rounded-sm"></span>
            )}
          </div>
        )}

        {isComplete && isThinking && !displayText && (
          <div className="text-sm opacity-60">
            <span>Thinking complete, but no response generated.</span>
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
