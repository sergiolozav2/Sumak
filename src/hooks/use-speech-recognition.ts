import { useEffect, useState } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

type Props = {
  onResult?: (result: string) => void
}
export function useSpeechRecognizer({ onResult }: Props = {}) {
  const {
    browserSupportsSpeechRecognition,
    interimTranscript,
    listening: isListening,
    finalTranscript,
    transcript,
    resetTranscript,
    isMicrophoneAvailable,
  } = useSpeechRecognition({
    clearTranscriptOnListen: true,
    transcribing: true,
  })

  const [listeningStarted, setListeningStarted] = useState(false)
  useEffect(() => {
    if (isListening) {
      setListeningStarted(true)
    }

    if (!isListening && listeningStarted) {
      setListeningStarted(false)
      onResult?.(finalTranscript)
    }
  }, [isListening, listeningStarted, onResult])

  return {
    transcript: finalTranscript + transcript,
    isMicrophoneAvailable,
    interimTranscript,
    isListening,
    isSupported: browserSupportsSpeechRecognition,
    start: SpeechRecognition.startListening,
    stop: SpeechRecognition.stopListening,
    abort: SpeechRecognition.abortListening,
    reset: resetTranscript,
    getRecognition: SpeechRecognition.getRecognition,
  }
}
