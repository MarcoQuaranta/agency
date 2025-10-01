'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: number
  text: string
  sender: 'safescale' | 'brand'
  showTypingBefore?: boolean
  typingDuration?: number
  delay: number
  time: string
  delivered?: boolean
  read?: boolean
  hasReaction?: boolean
}

const messages: Message[] = [
  {
    id: 1,
    text: "Ciao 👋 Noi investiamo, tu guadagni.",
    sender: 'safescale',
    delay: 500,
    time: "18:32",
    delivered: true,
    read: true
  },
  {
    id: 2,
    text: "Interessante, come funziona?",
    sender: 'brand',
    showTypingBefore: true,
    typingDuration: 1800,
    delay: 2000,
    time: "18:33"
  },
  {
    id: 3,
    text: "Gestiamo e-commerce, logistica e pubblicità.",
    sender: 'safescale',
    showTypingBefore: true,
    typingDuration: 2000,
    delay: 4500,
    time: "18:33",
    delivered: true,
    read: true
  },
  {
    id: 4,
    text: "Se funziona, dividiamo i guadagni con te.",
    sender: 'safescale',
    showTypingBefore: true,
    typingDuration: 1500,
    delay: 7000,
    time: "18:34",
    delivered: true,
    read: true,
    hasReaction: true
  }
]

const TypingIndicator = () => (
  <div className="inline-flex items-center space-x-1 px-4 py-2">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="block w-2 h-2 bg-gray-500 rounded-full"
        animate={{
          y: [0, -8, 0],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay: i * 0.2,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
)

const CheckMarks = ({ delivered, read }: { delivered?: boolean; read?: boolean }) => {
  if (!delivered) return null

  return (
    <span className="inline-block ml-1">
      {read ? (
        // Double check (read)
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <path
            d="M1.5 5L4 7.5L9 1.5"
            stroke="#53BDEB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.5 5L9 7.5L14.5 1.5"
            stroke="#53BDEB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        // Single check (delivered)
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <path
            d="M4.5 5L7 7.5L12 1.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
        </svg>
      )}
    </span>
  )
}

export default function ChatSection() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [typingStates, setTypingStates] = useState<{ [key: number]: boolean }>({})
  const [isInView, setIsInView] = useState(false)
  const [showReaction, setShowReaction] = useState(false)

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('chat-section')
      if (!section) return

      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (rect.top < windowHeight * 0.7 && rect.bottom > 0 && !isInView) {
        setIsInView(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isInView])

  useEffect(() => {
    if (!isInView) return

    if (prefersReducedMotion) {
      setVisibleMessages([1, 2, 3, 4])
      setShowReaction(true)
      return
    }

    // Animation sequence with proper timing
    messages.forEach((message) => {
      if (message.showTypingBefore) {
        // Show typing indicator
        setTimeout(() => {
          setTypingStates(prev => ({ ...prev, [message.id]: true }))
        }, message.delay - message.typingDuration!)

        // Hide typing and show message
        setTimeout(() => {
          setTypingStates(prev => ({ ...prev, [message.id]: false }))
          setVisibleMessages(prev => [...prev, message.id])

          // Show reaction on last message
          if (message.hasReaction) {
            setTimeout(() => {
              setShowReaction(true)
            }, 800)
          }
        }, message.delay)
      } else {
        setTimeout(() => {
          setVisibleMessages(prev => [...prev, message.id])
        }, message.delay)
      }
    })
  }, [isInView, prefersReducedMotion])

  return (
    <section id="chat-section" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-5">
            Il Metodo{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              SafeScale
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600">
            Una conversazione che cambierà il tuo business
          </p>
        </motion.div>

        {/* Modern Chat Container */}
        <div className="max-w-2xl mx-auto">
          <div className="space-y-3">
            <AnimatePresence mode="sync">
              {messages.map((message) => {
                const isVisible = visibleMessages.includes(message.id)
                const isTyping = typingStates[message.id]
                const isRight = message.sender === 'safescale'

                return (
                  <div key={`message-${message.id}`}>
                    {/* Typing Indicator */}
                    <AnimatePresence>
                      {isTyping && (
                        <motion.div
                          key={`typing-${message.id}`}
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.1 } }}
                          transition={{ duration: 0.2 }}
                          className={`flex ${isRight ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`
                            ${isRight
                              ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20'
                              : 'bg-gray-100'
                            } rounded-2xl
                          `}>
                            <TypingIndicator />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Message Bubble */}
                    {isVisible && !isTyping && (
                      <motion.div
                        key={`bubble-${message.id}`}
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30
                        }}
                        className={`flex ${isRight ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`relative max-w-[85%] md:max-w-[70%]`}>
                          {/* Message Bubble */}
                          <div
                            className={`
                              relative px-4 py-2.5 rounded-2xl
                              ${isRight
                                ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-sm'
                                : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-sm'
                              }
                            `}
                          >
                            {/* Tail using CSS triangles */}
                            <div
                              className={`
                                absolute top-0 w-0 h-0
                                ${isRight
                                  ? 'right-[-6px] border-l-[8px] border-l-purple-600 border-t-[10px] border-t-transparent'
                                  : 'left-[-6px] border-r-[8px] border-r-white border-t-[10px] border-t-transparent'
                                }
                              `}
                              style={{
                                filter: !isRight ? 'drop-shadow(-1px 1px 1px rgba(0,0,0,0.05))' : 'none'
                              }}
                            />

                            {/* Message text */}
                            <p className="text-[15px] leading-relaxed">
                              {message.text}
                            </p>

                            {/* Time and status */}
                            <div className={`flex items-center justify-end mt-1 gap-1 ${
                              isRight ? 'text-white/70' : 'text-gray-500'
                            }`}>
                              <span className="text-[11px]">{message.time}</span>
                              {isRight && <CheckMarks delivered={message.delivered} read={message.read} />}
                            </div>
                          </div>

                          {/* Reaction */}
                          {message.hasReaction && showReaction && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 15,
                                delay: 0.1
                              }}
                              className="absolute -bottom-3 right-4 bg-white rounded-full px-2 py-1 shadow-lg border border-gray-100"
                            >
                              <span className="text-sm">❤️</span>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && visibleMessages.length === messages.length ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-xl text-gray-600 mb-6">
            Zero rischi per te. Cresciamo insieme.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            Inizia la tua trasformazione
          </motion.button>
        </motion.div>
      </div>

      {/* Add custom CSS for better rendering */}
      <style jsx>{`
        @keyframes pulse-heart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </section>
  )
}