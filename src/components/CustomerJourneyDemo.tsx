'use client';

import { AnimatePresence,motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect,useState } from 'react';

const CustomerJourneyDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fingerPosition, setFingerPosition] = useState({ x: 0, y: 0 });

  const steps = [
    {
      screen: '/images/home.png',
      action: 'click',
      fingerTarget: { x: 195, y: 180 }, // Posizione storia Apple
      duration: 2500,
      description: 'Instagram Home'
    },
    {
      screen: '/images/story.png',
      action: 'swipe',
      fingerTarget: { x: 200, y: 400 },
      swipeEnd: { x: 50, y: 400 },
      duration: 3000,
      description: 'Story Apple'
    },
    {
      screen: '/images/sponsor.png',
      action: 'click',
      fingerTarget: { x: 195, y: 520 }, // Pulsante "Acquista ora"
      duration: 2500,
      description: 'Story sponsorizzata'
    },
    {
      screen: '/images/shop.png',
      action: 'click',
      fingerTarget: { x: 195, y: 480 }, // Pulsante "Aggiungi al carrello"
      duration: 2500,
      description: 'Shopify Store'
    },
    {
      screen: 'order-confirmation',
      action: 'none',
      duration: 3000,
      description: 'Ordine completato'
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsPlaying(false);
        setTimeout(() => {
          setCurrentStep(0);
          setIsPlaying(true);
        }, 1500);
      }
    }, steps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying]);

  useEffect(() => {
    const step = steps[currentStep];
    if (step.action === 'click' && step.fingerTarget) {
      setFingerPosition(step.fingerTarget);
    } else if (step.action === 'swipe' && step.fingerTarget) {
      setFingerPosition(step.fingerTarget);
      setTimeout(() => {
        if (step.swipeEnd) {
          setFingerPosition(step.swipeEnd);
        }
      }, 500);
    }
  }, [currentStep]);

  const handlePlayDemo = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Customer Journey: Da Instagram a Shopify
        </h2>
        <p className="text-gray-400 mb-6">
          Scopri come i tuoi clienti passano dalla scoperta all'acquisto
        </p>

        {/* Play Button */}
        <button
          onClick={handlePlayDemo}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {isPlaying ? '⏸️ Pausa Demo' : '▶️ Avvia Demo'}
        </button>
      </div>

      {/* Demo Container */}
      <div className="relative flex items-center justify-center">
        {/* Phone Mockup Frame */}
        <div className="relative w-[390px] h-[844px] bg-black rounded-[40px] p-4 shadow-2xl">
          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10"></div>

          {/* Screen Container */}
          <div className="relative w-full h-full bg-white rounded-[30px] overflow-hidden">
            <AnimatePresence mode="wait">
              {steps[currentStep].screen === 'order-confirmation' ? (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white p-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6"
                  >
                    <span className="text-white text-5xl">✓</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Ordine Completato!
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    Il tuo ordine #12345 è stato confermato
                  </p>
                  <div className="w-full bg-gray-100 rounded-lg p-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Prodotto:</span>
                      <span className="font-semibold">Apple Watch</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Quantità:</span>
                      <span className="font-semibold">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Totale:</span>
                      <span className="font-bold text-green-600">€399,00</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    Riceverai una email di conferma a breve
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: currentStep > 0 ? 100 : 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={steps[currentStep].screen}
                    alt={steps[currentStep].description}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Animated Finger */}
            {isPlaying && steps[currentStep].action !== 'none' && (
              <motion.div
                className="absolute pointer-events-none z-50"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  x: fingerPosition.x,
                  y: fingerPosition.y
                }}
                transition={{
                  duration: steps[currentStep].action === 'swipe' ? 1.5 : 0.5,
                  ease: "easeInOut"
                }}
              >
                {/* Finger Icon */}
                <div className="relative">
                  <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full shadow-lg flex items-center justify-center">
                    <span className="text-2xl">👆</span>
                  </div>
                  {/* Click Animation */}
                  {steps[currentStep].action === 'click' && (
                    <motion.div
                      className="absolute inset-0 bg-white rounded-full"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    />
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Step Indicator */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <motion.div
                className={`w-3 h-3 rounded-full ${
                  index === currentStep
                    ? 'bg-purple-600'
                    : index < currentStep
                    ? 'bg-green-500'
                    : 'bg-gray-600'
                }`}
                animate={{
                  scale: index === currentStep ? [1, 1.2, 1] : 1
                }}
                transition={{
                  duration: 0.5,
                  repeat: index === currentStep ? Infinity : 0,
                  repeatDelay: 1
                }}
              />
              <span className="text-xs text-gray-400 mt-2 text-center max-w-[80px]">
                {step.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mt-24 text-center">
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-semibold text-white mb-2">
            {steps[currentStep].description}
          </h3>
          <p className="text-gray-300">
            {currentStep === 0 && "L'utente naviga su Instagram e vede la storia del tuo brand"}
            {currentStep === 1 && "Scorre le storie e trova contenuti interessanti"}
            {currentStep === 2 && "Incontra la tua storia sponsorizzata con call-to-action"}
            {currentStep === 3 && "Atterra sul tuo store Shopify pronto all'acquisto"}
            {currentStep === 4 && "Completa l'acquisto con successo! 🎉"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerJourneyDemo;