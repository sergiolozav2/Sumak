import { useState, useCallback, useRef, useEffect } from 'react'

// Type definitions for better TypeScript support
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

interface SpeechRecognitionResult {
  transcript: string
  confidence: number
  isFinal: boolean
}

interface SpeechRecognitionError {
  error: string
  message: string
}

interface UseSpeechRecognitionOptions {
  /** Whether to continuously listen for speech (default: true) */
  continuous?: boolean
  /** Whether to return interim results while speaking (default: true) */
  interimResults?: boolean
  /** Language code for speech recognition (default: 'en-US') */
  language?: string
  /** Maximum number of alternative transcriptions (default: 1) */
  maxAlternatives?: number
  /** Callback when speech result is received */
  onResult?: (result: SpeechRecognitionResult) => void
  /** Callback when speech recognition error occurs */
  onError?: (error: SpeechRecognitionError) => void
  /** Callback when speech recognition starts */
  onStart?: () => void
  /** Callback when speech recognition ends */
  onEnd?: () => void
}

interface UseSpeechRecognitionReturn {
  /** Whether speech recognition is currently listening */
  isListening: boolean
  /** Whether speech recognition is supported in this browser */
  isSupported: boolean
  /** Current transcript including interim results */
  transcript: string
  /** Interim (temporary) transcript */
  interimTranscript: string
  /** Final (confirmed) transcript */
  finalTranscript: string
  /** Current error message, if any */
  error: string | null
  /** Start listening for speech */
  startListening: () => void
  /** Stop listening for speech */
  stopListening: () => void
  /** Abort speech recognition immediately */
  abortListening: () => void
  /** Reset all transcript values */
  resetTranscript: () => void
}

/**
 * Custom hook for speech recognition using the Web Speech API
 *
 * Provides an easy-to-use interface for speech-to-text functionality
 * with proper error handling and browser compatibility checks.
 *
 * Note: This API requires microphone permissions and an internet connection
 * for most browsers as they use cloud-based speech recognition services.
 *
 * @example
 * ```tsx
 * const { isListening, transcript, startListening, stopListening } = useSpeechRecognition({
 *   onResult: (result) => {
 *     if (result.isFinal) {
 *       console.log('Final transcript:', result.transcript)
 *     }
 *   }
 * })
 *
 * return (
 *   <div>
 *     <button onClick={isListening ? stopListening : startListening}>
 *       {isListening ? 'Stop' : 'Start'} Listening
 *     </button>
 *     <p>{transcript}</p>
 *   </div>
 * )
 * ```
 *
 * @param options Configuration options for speech recognition
 * @returns Object with speech recognition state and controls
 */
export function useSpeechRecognition(
  options: UseSpeechRecognitionOptions = {},
): UseSpeechRecognitionReturn {
  const {
    continuous = true,
    interimResults = true,
    language = 'en-US',
    maxAlternatives = 1,
    onResult,
    onError,
    onStart,
    onEnd,
  } = options

  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [finalTranscript, setFinalTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)

  const recognitionRef = useRef<any>(null)

  // Check if speech recognition is supported
  const isSupported = !!(
    window.SpeechRecognition || window.webkitSpeechRecognition
  )

  // Initialize speech recognition
  useEffect(() => {
    if (!isSupported) return

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    recognitionRef.current = new SpeechRecognition()
    const recognition = recognitionRef.current

    // Configure recognition settings
    recognition.continuous = continuous
    recognition.interimResults = interimResults
    recognition.lang = language
    recognition.maxAlternatives = maxAlternatives

    // Event handlers
    recognition.onstart = () => {
      console.log('STARTED')
      setIsListening(true)
      setError(null)
      onStart?.()
    }

    recognition.onend = () => {
      console.log('ENDED')
      setIsListening(false)
      onEnd?.()
    }

    recognition.onresult = (event: any) => {
      let interimText = ''
      let finalText = ''
      let fullTranscript = ''

      // Process all results
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i]
        const transcript = result[0].transcript

        if (result.isFinal) {
          finalText += transcript
        } else {
          interimText += transcript
        }
        fullTranscript += transcript
      }

      setInterimTranscript(interimText)
      if (finalText) {
        setFinalTranscript((prev) => prev + finalText)
      }
      setTranscript(fullTranscript)

      // Call custom result handler if provided
      if (onResult && event.results.length > 0) {
        const lastResult = event.results[event.results.length - 1]
        onResult({
          transcript: lastResult[0].transcript,
          confidence: lastResult[0].confidence,
          isFinal: lastResult.isFinal,
        })
      }
    }

    recognition.onerror = (event: any) => {
      console.log(event)
      const errorMessage = getErrorMessage(event.error)
      setError(errorMessage)
      setIsListening(false)

      if (onError) {
        onError({
          error: event.error,
          message: errorMessage,
        })
      }
    }

    recognition.onnomatch = () => {
      setError('No speech was recognized')
    }

    recognition.onaudiostart = () => {
      console.log('Audio capturing started')
    }

    recognition.onaudioend = () => {
      console.log('Audio capturing ended')
    }

    recognition.onsoundstart = () => {
      console.log('Sound detected')
    }

    recognition.onsoundend = () => {
      console.log('Sound ended')
    }

    recognition.onspeechstart = () => {
      console.log('Speech detected')
    }

    recognition.onspeechend = () => {
      console.log('Speech ended')
    }

    // Cleanup function
    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [
    continuous,
    interimResults,
    language,
    maxAlternatives,
    onResult,
    onError,
    onStart,
    onEnd,
    isSupported,
  ])

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser')
      return
    }
    if (!recognitionRef.current) return

    // Check if already listening to prevent multiple starts
    if (isListening) return

    try {
      // Reset previous state
      setError(null)
      setTranscript('')
      setInterimTranscript('')

      recognitionRef.current.start()
    } catch (err: any) {
      // Handle the case where recognition is already started
      if (err.name === 'InvalidStateError') {
        setError('Speech recognition is already active')
      } else {
        setError('Failed to start speech recognition')
      }
      console.error('Speech recognition start error:', err)
    }
  }, [isSupported, isListening])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }, [isListening])

  const abortListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.abort()
      setIsListening(false)
    }
  }, [isListening])

  const resetTranscript = useCallback(() => {
    setTranscript('')
    setInterimTranscript('')
    setFinalTranscript('')
    setError(null)
  }, [])

  return {
    isListening,
    isSupported,
    transcript,
    interimTranscript,
    finalTranscript,
    error,
    startListening,
    stopListening,
    abortListening,
    resetTranscript,
  }
}

// Helper function to get user-friendly error messages
function getErrorMessage(error: string): string {
  switch (error) {
    case 'no-speech':
      return 'No speech was detected. Please try speaking again.'
    case 'audio-capture':
      return 'Audio capture failed. Please check your microphone.'
    case 'not-allowed':
      return 'Microphone permission denied. Please allow microphone access.'
    case 'network':
      return 'Network error occurred during speech recognition.'
    case 'service-not-allowed':
      return 'Speech recognition service is not allowed.'
    case 'bad-grammar':
      return 'Grammar compilation failed.'
    case 'language-not-supported':
      return 'Language not supported for speech recognition.'
    case 'aborted':
      return 'Speech recognition was aborted.'
    default:
      return `Speech recognition error: ${error}`
  }
}
