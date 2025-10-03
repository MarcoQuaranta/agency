'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaEnvelope } from 'react-icons/fa'

const steps = [
  {
    id: 1,
    title: 'Investiamo noi',
    subtitle: 'Zero budget anticipato, zero rischio.'
  },
  {
    id: 2,
    title: 'Ecosistema completo',
    subtitle: 'E-commerce, logistica, funnel: tutto incluso.'
  },
  {
    id: 3,
    title: 'Ottimizzazione AI',
    subtitle: 'Creatività e targeting che convertono.'
  },
  {
    id: 4,
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-100%'])

  // Track scroll progress for overlay opacity
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      // Overlay scuro compare subito quando si inizia a scrollare
      setCurrentStep(value > 0.05 ? 1 : -1)
    })

    return unsubscribe
  }, [scrollYProgress])

  return (
    <section
      ref={sectionRef}
      id="hero-with-method"
      className="relative h-[280vh] md:h-[350vh]"
    >
      {/* Fixed Background Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 bg-black">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            style={{ willChange: 'auto' }}
          >
            <source src="/video/provolone.mp4" type="video/mp4" />
          </video>

          {/* Dynamic Overlay */}
          <div
            className="absolute inset-0 bg-black transition-opacity duration-800"
            style={{ opacity: currentStep >= 0 ? 0.3 : 0.2 }}
          />

        </div>

        {/* Scrollable Content */}
        <motion.div
          style={{ y, willChange: 'transform' }}
          className="relative h-[280vh] md:h-[350vh] flex flex-col items-center justify-start"
        >
          {/* Hero Section - Initial View */}
          <div
            className="min-h-screen flex items-center justify-center px-4"
          >
            <motion.div
              className="text-center max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Hero Title */}
              <h1 className="text-7xl sm:text-7xl md:text-8xl font-bold text-white mb-6 px-6 leading-tight">
                Il Metodo SafeScale
              </h1>
              <p className="text-xl sm:text-2xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8 px-6 leading-relaxed">
                Scopri come eliminiamo il rischio dal tuo business
              </p>

              {/* Scroll Hint - only when in view */}
              <motion.div
                className="mt-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 1 }}
              >
                <div className="w-8 h-14 border-2 border-white rounded-full mx-auto relative">
                  <div
                    className="w-2 h-2 bg-white rounded-full mx-auto mt-3 absolute left-1/2 -translate-x-1/2"
                    style={{
                      animation: 'scrollDot 1.5s ease-in-out infinite'
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Steps */}
          <div className="w-full">
            {steps.map((step) => (
              <div
                key={step.id}
                className="h-[50vh] md:h-[60vh] flex items-center justify-center px-4"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-4xl w-full text-center px-6"
                >
                  <h3 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
                    {step.subtitle}
                  </p>
                  <div className="mt-12">
                    <span className="text-sm text-gray-500 uppercase tracking-[0.3em]">
                      {step.id} / 4
                    </span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Final CTA Section */}
          <div className="h-[50vh] md:h-[60vh] flex items-center justify-center px-4">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-[3.5rem] sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 sm:mb-12 leading-[1.15] px-6">
                <span className="block text-white">Noi investiamo,</span>
                <span className="block text-white">tu guadagni,</span>
                <span className="block text-white font-bold">zero rischi.</span>
              </h2>

              <p className="text-2xl sm:text-3xl md:text-4xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto px-6 leading-relaxed">
                Pronto a scalare senza rischi?
              </p>

              <button
                onClick={scrollToContactForm}
                className="gradient-bg-brand gradient-bg-brand-hover text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black text-lg sm:text-xl inline-flex items-center gap-3"
              >
                <FaEnvelope className="text-base sm:text-lg" />
                <span>Candidati</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}