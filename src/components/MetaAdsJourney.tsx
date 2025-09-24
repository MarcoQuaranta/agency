'use client';

import { AnimatePresence,motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect,useState } from 'react';

export default function MetaAdsJourney() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showFinger, setShowFinger] = useState(false);
  const [fingerPosition, setFingerPosition] = useState({ x: '50%', y: '50%' });
  const [fingerAction, setFingerAction] = useState<'tap' | 'swipe'>('tap');

  const steps = [
    {
      image: '/images/customerj (1).png',
      duration: 2000,
      fingerDelay: 400,
      fingerPos: { x: '32%', y: '27%' }, // Più a destra e leggermente in basso sull'icona della storia Apple
      action: 'tap' as const,
      description: 'Instagram Home - Touch storia Apple'
    },
    {
      image: '/images/customerj (2).png',
      duration: 2000,
      fingerDelay: 400,
      fingerPos: { x: '65%', y: '50%' }, // Leggermente più a sinistra per lo swipe
      action: 'swipe' as const,
      description: 'Storia Apple - Swipe avanti'
    },
    {
      image: '/images/customerj (3).png',
      duration: 2000,
      fingerDelay: 400,
      fingerPos: { x: '46%', y: '74%' }, // Leggermente a sinistra e più in alto per "Acquista ora"
      action: 'tap' as const,
      description: 'Annuncio - Touch Acquista Ora'
    },
    {
      image: '/images/customerj (4).png',
      duration: 2000,
      fingerDelay: 400,
      fingerPos: { x: '50%', y: '68%' }, // Più in alto e al centro per "Aggiungi al carrello"
      action: 'tap' as const,
      description: 'Shopify - Touch Aggiungi Carrello'
    }
  ];

  // Main animation loop
  useEffect(() => {
    const currentStepData = steps[currentStep];

    // Show finger after delay
    const fingerTimer = setTimeout(() => {
      setShowFinger(true);
      setFingerPosition({
        x: currentStepData.fingerPos.x,
        y: currentStepData.fingerPos.y
      });
      setFingerAction(currentStepData.action);
    }, currentStepData.fingerDelay);

    // Hide finger and move to next step
    const nextStepTimer = setTimeout(() => {
      setShowFinger(false);

      setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          // Final step - show completion and restart
          setTimeout(() => {
            setCurrentStep(0);
          }, 1500);
        }
      }, 200);
    }, currentStepData.duration);

    return () => {
      clearTimeout(fingerTimer);
      clearTimeout(nextStepTimer);
    };
  }, [currentStep]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative aspect-[9/19.5] w-full">
        {/* Images Animation */}
        <AnimatePresence mode="wait">
          {currentStep < 4 ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={steps[currentStep].image}
                alt={steps[currentStep].description}
                fill
                className="object-contain"
                priority
                quality={85}
              />
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center p-8 bg-white/95 rounded-2xl shadow-xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center"
                >
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h4 className="text-2xl font-bold text-green-600 mb-2">Ordine Completato!</h4>
                <p className="text-gray-600">Grazie per il tuo acquisto</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Finger Animation */}
        <AnimatePresence>
          {showFinger && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="absolute pointer-events-none z-50"
              style={{
                left: fingerPosition.x,
                top: fingerPosition.y,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {fingerAction === 'tap' && (
                <motion.div
                  animate={{
                    scale: [1, 0.8, 1],
                    y: [0, 8, 0]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: 1,
                    ease: 'easeInOut'
                  }}
                >
                  <div className="w-12 h-12 bg-white/80 rounded-full shadow-xl border-3 border-blue-500/20 flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-500/90 rounded-full animate-pulse" />
                  </div>
                  {/* Ripple effect */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0.6 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-12 h-12 bg-blue-400 rounded-full"
                  />
                </motion.div>
              )}

              {fingerAction === 'swipe' && (
                <motion.div
                  animate={{
                    x: [40, -40]
                  }}
                  transition={{
                    duration: 1.2,
                    ease: 'easeInOut'
                  }}
                >
                  <div className="w-12 h-12 bg-white/80 rounded-full shadow-xl border-3 border-purple-500/20 flex items-center justify-center">
                    <div className="w-3 h-3 bg-purple-500/90 rounded-full" />
                  </div>
                  {/* Swipe trail */}
                  <motion.div
                    className="absolute top-1/2 left-8 transform -translate-y-1/2"
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: [0, 1, 0], x: -60 }}
                    transition={{ duration: 1.2 }}
                  >
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-purple-400 rounded-full" />
                      <div className="w-1 h-1 bg-purple-400 rounded-full" />
                      <div className="w-1 h-1 bg-purple-400 rounded-full" />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}