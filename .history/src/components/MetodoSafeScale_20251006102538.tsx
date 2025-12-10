'use client'

// VERSION: Video Metal Fluid
// Fixed background video with scrolling text overlay
// Large minimal text, no icons, centered background numbers

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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

export default function MetodoSafeScale() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentStep, setCurrentStep] = useState(-1)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  })

  // Transform for smooth scrolling
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-100%'])

  // Track current step based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const totalSteps = steps.length + 2 // Title + Steps + CTA
      const stepSize = 1 / totalSteps
      const currentIndex = Math.floor(value / stepSize) - 1
      setCurrentStep(Math.min(Math.max(currentIndex, -1), steps.length - 1))
    })

    return unsubscribe
  }, [scrollYProgress])

  return (
    <section
      ref={sectionRef}
      id="metodo-safescale"
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
          className="relative h-[380vh] flex flex-col items-center justify-start pt-32"
        >
          {/* Title Section */}
          <div className="h-[80vh] flex items-center justify-center px-4">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h2 className="text-6xl md:text-8xl font-bold text-white mb-6">
                Il Metodo SafeScale
              </h2>
              <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
                Scopri come eliminiamo il rischio dal tuo business
              </p>

              {/* Scroll Hint - Larger and white */}
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

          {/* Steps - Mobile Timeline Version */}
          <div className="w-full md:hidden px-4">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex">
                {/* Timeline Line - Left Side */}
                <div className="flex flex-col items-center mr-6">
                  {/* Circle Badge */}
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center z-10"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: false, amount: 0.8 }}
                  >
                    <span className="text-xl font-bold text-white">{step.id}</span>
                  </motion.div>

                  {/* Vertical Line - only if not last step */}
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-full min-h-[200px] bg-gradient-to-b from-white/30 to-white/10 mt-2" />
                  )}
                </div>

                {/* Content Box - Right Side */}
                <motion.div
                  className="flex-1 pb-12 pt-1"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-3xl font-bold text-white mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-200 font-light leading-relaxed">
                    {step.subtitle}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Steps - Desktop Version */}
          <div className="w-full hidden md:block">
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
                  {/* Background Number - Larger and more visible */}
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

                  {/* Content - Minimal and larger */}
                  <div className="relative z-10 text-center">
                    {/* Title - Much larger */}
                    <motion.h3
                      className="text-8xl font-bold text-white mb-8"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: false, amount: 0.5 }}
                    >
                      {step.title}
                    </motion.h3>

                    {/* Subtitle - Larger */}
                    <motion.p
                      className="text-3xl text-gray-200 max-w-3xl mx-auto font-light"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: false, amount: 0.5 }}
                    >
                      {step.subtitle}
                    </motion.p>

                    {/* Simple step number - minimal */}
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

          {/* Spacer between last step and CTA */}
          <div className="h-[40vh]"></div>

          {/* CTA Section */}
          <div className="h-[40vh] flex items-center justify-center px-4">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Pronto a scalare senza rischi?
              </h3>

              <motion.button
                className="group relative px-10 py-5 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl" />
                <div className="absolute inset-0 rounded-2xl border border-white/10" />

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-600/30"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <span className="relative z-10 text-white font-semibold text-lg">
                  Verifica la tua idoneità →
                </span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}