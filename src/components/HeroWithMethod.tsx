'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaEnvelope } from 'react-icons/fa'

interface Step {
  id: number
  icon: string
  title: string
  subtitle: string
}

const steps: Step[] = [
  {
    id: 1,
    icon: '',
    title: 'Investiamo noi',
    subtitle: 'Zero budget anticipato, zero rischio.'
  },
  {
    id: 2,
    icon: '',
    title: 'Ecosistema completo',
    subtitle: 'E-commerce, logistica, funnel: tutto incluso.'
  },
  {
    id: 3,
    icon: '',
    title: 'Ottimizzazione AI',
    subtitle: 'Creatività e targeting che convertono.'
  },
  {
    id: 4,
    icon: '',
    title: 'Revenue share',
    subtitle: 'Guadagniamo solo se guadagni tu.'
  }
]

interface HeroWithMethodProps {
  scrollToContactForm: () => void
}

export default function HeroWithMethod({ scrollToContactForm }: HeroWithMethodProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentStep, setCurrentStep] = useState(-1)
  const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  })

  // Transform for smooth scrolling
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-100%'])

  // Track current step based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const totalSteps = steps.length + 2 // Hero + Steps + CTA
      const stepSize = 1 / totalSteps
      const currentIndex = Math.floor(value / stepSize) - 1
      setCurrentStep(Math.min(Math.max(currentIndex, -1), steps.length))
    })

    return unsubscribe
  }, [scrollYProgress])

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero-with-method"
      className="relative h-[380vh]"
    >
      {/* Fixed Background Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0A14] via-[#1B1030] to-[#0B0A14]">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          >
            <source src="/video/provolone.mp4" type="video/mp4" />
          </video>

          {/* Dynamic Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            animate={{
              opacity: currentStep >= 0 ? 0.6 : 0.4
            }}
            transition={{ duration: 0.8 }}
          />

        </div>

        {/* Scrollable Content */}
        <motion.div
          style={{ y }}
          className="relative h-[380vh] flex flex-col items-center justify-start"
        >
          {/* Hero Section - Initial View */}
          <div
            className="h-screen flex items-center justify-center px-4"
          >
            <motion.div
              className="text-center max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Hero Title */}
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
                Il Metodo SafeScale
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8">
                Scopri come eliminiamo il rischio dal tuo business
              </p>

              {/* Scroll Hint */}
              <motion.div
                className="mt-16"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-8 h-14 border-2 border-white rounded-full mx-auto">
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full mx-auto mt-3"
                    animate={{ y: [0, 24, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Steps */}
          <div className="w-full">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="h-[60vh] flex items-center justify-center px-4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="relative max-w-4xl w-full"
                >
                  {/* Background Number */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.08 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: false, amount: 0.5 }}
                  >
                    <span className="text-[500px] font-bold text-white/10 leading-none">
                      0{step.id}
                    </span>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Title */}
                    <motion.h3
                      className="text-6xl md:text-8xl font-bold text-white mb-8"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: false, amount: 0.5 }}
                    >
                      {step.title}
                    </motion.h3>

                    {/* Subtitle */}
                    <motion.p
                      className="text-2xl md:text-3xl text-gray-200 max-w-3xl mx-auto font-light"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: false, amount: 0.5 }}
                    >
                      {step.subtitle}
                    </motion.p>

                    {/* Step indicator */}
                    <motion.div
                      className="mt-12"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: false, amount: 0.5 }}
                    >
                      <span className="text-sm text-gray-500 uppercase tracking-[0.3em]">
                        {step.id} / 4
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Final CTA Section with "Noi investiamo, tu guadagni" - Senza spacer */}
          <div className="h-[40vh] flex items-center justify-center px-4">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              {/* Main Title - Noi investiamo, tu guadagni */}
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                <span className="block text-white">Noi investiamo,</span>
                <span className="block text-white">tu guadagni,</span>
                <span className="block text-white font-bold">zero rischi.</span>
              </h2>

              {/* Sub-headline - moved from hero */}
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto">
                Copriamo le spese ads e gestiamo tutto il funnel.
                Tu incassi i risultati.
              </p>

              <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Pronto a scalare senza rischi?
              </p>

              {/* CTA Button */}
              <motion.button
                onClick={scrollToContactForm}
                className="gradient-bg-brand gradient-bg-brand-hover text-white px-12 py-5 rounded-full font-bold transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black text-xl inline-flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaEnvelope className="text-lg" />
                <span>Candidati</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}