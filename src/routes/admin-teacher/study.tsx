import { createFileRoute } from '@tanstack/react-router'
import { useTRPC } from '@/integrations/trpc/react'
import { useQuery } from '@tanstack/react-query'
import { useState, useRef, useEffect } from 'react'
import {
  RotateCcw,
  Check,
  X,
  Zap,
  Brain,
  ChevronDown,
  BookOpen,
  Target,
  TrendingUp,
} from 'lucide-react'

export const Route = createFileRoute('/admin-teacher/study')({
  component: RouteComponent,
})

interface StudyCard {
  id: number
  question: string
  answer: string
  subject: string
  type: string
}

interface CardState {
  cardId: number
  isFlipped: boolean
  isStudied: boolean
  difficulty: 'again' | 'hard' | 'good' | 'easy' | null
}

function RouteComponent() {
  const trpc = useTRPC()
  const fetchCards = useQuery(trpc.cards.getAll.queryOptions())
  const cards = (fetchCards.data || []) as StudyCard[]

  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [cardStates, setCardStates] = useState<Record<number, CardState>>({})
  const [studyStats, setStudyStats] = useState({
    studied: 0,
    remaining: 0,
    streak: 0,
  })

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Initialize card states
  useEffect(() => {
    if (cards.length > 0) {
      const initialStates: Record<number, CardState> = {}
      cards.forEach((card) => {
        initialStates[card.id] = {
          cardId: card.id,
          isFlipped: false,
          isStudied: false,
          difficulty: null,
        }
      })
      setCardStates(initialStates)
      setStudyStats({
        studied: 0,
        remaining: cards.length,
        streak: 0,
      })
    }
  }, [cards])

  // Get current card
  const currentCard = cards[currentCardIndex]
  const currentCardState = currentCard ? cardStates[currentCard.id] : undefined

  // Handle card flip
  const handleCardFlip = () => {
    if (!currentCard || !currentCardState) return

    setCardStates((prev) => ({
      ...prev,
      [currentCard.id]: {
        ...prev[currentCard.id],
        isFlipped: !prev[currentCard.id].isFlipped,
      },
    }))
  }

  // Handle card action (Anki-style)
  const handleCardAction = (difficulty: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentCard || !currentCardState) return

    // Mark card as studied
    setCardStates((prev) => ({
      ...prev,
      [currentCard.id]: {
        ...prev[currentCard.id],
        isStudied: true,
        difficulty,
      },
    }))

    // Update stats
    setStudyStats((prev) => ({
      studied: prev.studied + 1,
      remaining: Math.max(0, prev.remaining - 1),
      streak:
        difficulty === 'good' || difficulty === 'easy' ? prev.streak + 1 : 0,
    }))

    // Move to next card after a short delay
    setTimeout(() => {
      moveToNextCard()
    }, 500)
  }

  // Move to next card
  const moveToNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1)
      scrollToCard(currentCardIndex + 1)
    }
  }

  // Scroll to specific card
  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardHeight = container.scrollHeight / cards.length
      container.scrollTo({
        top: cardHeight * index,
        behavior: 'smooth',
      })
    }
  }

  // Handle scroll snap
  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const cardHeight = container.scrollHeight / cards.length
    const scrollPosition = container.scrollTop
    const newIndex = Math.round(scrollPosition / cardHeight)

    if (
      newIndex !== currentCardIndex &&
      newIndex >= 0 &&
      newIndex < cards.length
    ) {
      setCurrentCardIndex(newIndex)
    }
  }

  // Get unique subjects for sidebar
  const uniqueSubjects = Array.from(new Set(cards.map((card) => card.subject)))
  if (cards.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <BookOpen size={64} className="text-base-content/20 mx-auto mb-4" />
          <h3 className="text-base-content/60 text-lg font-medium">
            No study cards available
          </h3>
          <p className="text-base-content/40 mt-2 text-sm">
            Cards will appear here when they're created
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col">
      {/* Top progress bar */}
      <div className="border-base-300 bg-base-100 hidden w-full border-b px-4 py-3 md:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-base-content text-xl font-bold">Study Mode</h2>
            <div className="badge badge-primary">
              {currentCardIndex + 1} of {cards.length}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Target size={16} className="text-success" />
              <span className="text-base-content/70">
                Studied: {studyStats.studied}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp size={16} className="text-warning" />
              <span className="text-base-content/70">
                Streak: {studyStats.streak}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <progress
            className="progress progress-primary w-full"
            value={studyStats.studied}
            max={cards.length}
          />
        </div>
      </div>

      <div className="responsive-padding-dock flex h-full flex-col overflow-hidden md:flex-row">
        {/* Subjects sidebar - collapsible on mobile */}
        <div className="border-base-300 flex w-full flex-col md:w-80 md:min-w-80 md:border-r">
          <div className="md:collapse-open collapse">
            <input type="checkbox" className="md:hidden" />
            <div className="collapse-title flex gap-1 font-medium">
              <ChevronDown size={23} /> Study Subjects
            </div>
            <div className="collapse-content w-full">
              <div className="flex w-full flex-col gap-2">
                {uniqueSubjects.map((subject) => {
                  const subjectCards = cards.filter(
                    (card) => card.subject === subject,
                  )
                  const studiedInSubject = subjectCards.filter(
                    (card) => cardStates[card.id]?.isStudied,
                  ).length

                  return (
                    <div
                      key={subject}
                      className="bg-base-200 hover:border-neutral/45 border-neutral/20 hover:bg-base-200 cursor-pointer rounded-lg border p-2 transition-colors md:p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-base-content font-medium">
                          {subject}
                        </h4>
                        <div className="badge badge-sm">
                          {studiedInSubject}/{subjectCards.length}
                        </div>
                      </div>
                      <div className="mt-1">
                        <progress
                          className="progress progress-sm progress-primary w-full"
                          value={studiedInSubject}
                          max={subjectCards.length}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main study area - TikTok style */}
        <div className="relative flex h-full flex-1 overflow-hidden">
          {/* Study cards container */}

          <div className="absolute top-4 z-10 flex w-full px-8">
            <progress
              className="progress progress-primary w-full"
              value={studyStats.studied}
              max={cards.length}
            />
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="h-full w-full snap-y snap-mandatory overflow-y-auto scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {cards.map((card, index) => {
              const cardState = cardStates[card.id]
              const isCurrentCard = index === currentCardIndex

              return (
                <div
                  key={card.id}
                  className="bg-base-300 flex h-full w-full snap-start snap-always items-center justify-center p-4"
                >
                  {/* Study Card */}
                  <div
                    className={`relative h-full max-h-96 w-full max-w-md cursor-pointer transition-all duration-300 ${
                      isCurrentCard ? 'scale-100' : 'scale-95 opacity-70'
                    }`}
                    onClick={handleCardFlip}
                  >
                    <div
                      className={`card card-border bg-base-100 h-full w-full shadow-xl transition-transform duration-500 ${
                        cardState?.isFlipped
                          ? '[transform:rotateY(180deg)]'
                          : ''
                      }`}
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Front side - Question */}
                      <div
                        className="card-body absolute inset-0 flex flex-col items-center justify-center text-center"
                        style={{
                          backfaceVisibility: 'hidden',
                        }}
                      >
                        <div className="badge badge-primary badge-sm mb-4">
                          {card.subject}
                        </div>
                        <Brain size={48} className="text-primary mb-4" />
                        <h3 className="card-title text-base-content text-lg md:text-xl">
                          {card.question}
                        </h3>
                        <p className="text-base-content/60 mt-4 text-sm">
                          Tap to reveal answer
                        </p>
                      </div>

                      {/* Back side - Answer */}
                      <div
                        className="card-body absolute inset-0 flex flex-col items-center justify-center text-center"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        <div className="badge badge-success badge-sm mb-4">
                          Answer
                        </div>
                        <Check size={48} className="text-success mb-4" />
                        <h3 className="card-title text-base-content text-lg md:text-xl">
                          {card.answer}
                        </h3>
                        <p className="text-base-content/60 mt-4 text-sm">
                          How well did you know this?
                        </p>
                      </div>

                      {/* Studied overlay */}
                      {cardState?.isStudied && (
                        <div className="bg-success/20 absolute inset-0 flex [transform:rotateY(180deg)] items-center justify-center rounded-lg">
                          <div className="bg-success text-success-content rounded-full p-4">
                            <Check size={32} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Floating Action Buttons - Anki Style */}
          {currentCard &&
            currentCardState?.isFlipped &&
            !currentCardState.isStudied && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 transform">
                <div className="flex items-center gap-3">
                  {/* Again (Red) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCardAction('again')
                    }}
                    className="btn btn-error btn-circle"
                    title="Again - Study this card again soon"
                  >
                    <X size={20} />
                  </button>

                  {/* Hard (Orange) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCardAction('hard')
                    }}
                    className="btn btn-warning btn-circle"
                    title="Hard - This was difficult"
                  >
                    <RotateCcw size={20} />
                  </button>

                  {/* Good (Green) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCardAction('good')
                    }}
                    className="btn btn-success btn-circle btn-lg"
                    title="Good - I knew this"
                  >
                    <Check size={24} />
                  </button>

                  {/* Easy (Blue) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCardAction('easy')
                    }}
                    className="btn btn-info btn-circle"
                    title="Easy - This was very easy"
                  >
                    <Zap size={20} />
                  </button>
                </div>
              </div>
            )}

          {/* Completion state */}
          {studyStats.studied === cards.length && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-base-100 rounded-xl p-8 text-center shadow-lg">
                <div className="text-success mb-4">
                  <Check size={64} className="mx-auto" />
                </div>
                <h2 className="text-base-content mb-2 text-2xl font-bold">
                  Study Session Complete!
                </h2>
                <p className="text-base-content/70 mb-4">
                  You've studied all {cards.length} cards
                </p>
                <div className="flex flex-col gap-2">
                  <div className="stat">
                    <div className="stat-title">Final Streak</div>
                    <div className="stat-value text-success">
                      {studyStats.streak}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    // Reset all cards
                    const resetStates: Record<number, CardState> = {}
                    cards.forEach((card) => {
                      resetStates[card.id] = {
                        cardId: card.id,
                        isFlipped: false,
                        isStudied: false,
                        difficulty: null,
                      }
                    })
                    setCardStates(resetStates)
                    setCurrentCardIndex(0)
                    setStudyStats({
                      studied: 0,
                      remaining: cards.length,
                      streak: 0,
                    })
                    scrollToCard(0)
                  }}
                  className="btn btn-primary mt-4"
                >
                  Study Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .snap-y {
          scroll-snap-type: y mandatory;
        }
        .snap-start {
          scroll-snap-align: start;
        }
        .snap-always {
          scroll-snap-stop: always;
        }
        /* Hide scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
