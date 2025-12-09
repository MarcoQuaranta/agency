'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaAd, FaChartLine, FaCheckCircle, FaEnvelope, FaFacebook, FaGoogle, FaInstagram, FaSearch, FaTiktok, FaTimes } from 'react-icons/fa';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function ServiziPage() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const services = [
    {
      id: 'google-ads',
      title: 'Google Ads',
      icon: <FaGoogle className="text-4xl" />,
      color: 'from-blue-500 via-green-500 to-yellow-500',
      borderColor: 'border-blue-500/30',
      description: 'Campagne pubblicitarie su Google Search, Display e YouTube per raggiungere clienti nel momento esatto in cui cercano i tuoi prodotti.',
      features: [
        'Campagne Search per keyword strategiche',
        'Display Network per brand awareness',
        'YouTube Ads per engagement video',
        'Shopping Ads per e-commerce',
        'Remarketing avanzato',
        'Ottimizzazione ROI continua'
      ],
      stats: { label: 'ROI medio', value: '+320%' }
    },
    {
      id: 'meta-ads',
      title: 'Meta Ads',
      icon: <FaFacebook className="text-4xl" />,
      color: 'from-blue-600 to-purple-600',
      borderColor: 'border-blue-600/30',
      description: 'Pubblicità su Facebook e Instagram per raggiungere il tuo pubblico ideale con creatività coinvolgenti.',
      features: [
        'Targeting avanzato per interessi e comportamenti',
        'Campagne di conversione ottimizzate',
        'Stories e Reels Ads',
        'Catalog Ads per e-commerce',
        'Lead Generation Forms',
        'A/B Testing creatività'
      ],
      stats: { label: 'Conversioni', value: '+450%' }
    },
    {
      id: 'tiktok-ads',
      title: 'TikTok Ads',
      icon: <FaTiktok className="text-4xl" />,
      color: 'from-pink-500 via-purple-500 to-cyan-500',
      borderColor: 'border-pink-500/30',
      description: 'Raggiungi la Gen Z e i Millennials con contenuti virali e campagne performance-driven.',
      features: [
        'In-Feed Ads nativi',
        'TopView per massima visibilità',
        'Branded Hashtag Challenges',
        'Spark Ads con contenuti UGC',
        'Targeting per interessi e creator',
        'TikTok Shop integration'
      ],
      stats: { label: 'Engagement', value: '+680%' }
    },
    {
      id: 'seo',
      title: 'SEO',
      icon: <FaSearch className="text-4xl" />,
      color: 'from-green-500 to-teal-500',
      borderColor: 'border-green-500/30',
      description: 'Ottimizzazione per i motori di ricerca per aumentare la visibilità organica e il traffico qualificato.',
      features: [
        'Audit SEO tecnico completo',
        'Keyword research strategica',
        'On-page optimization',
        'Link building di qualità',
        'Local SEO e Google My Business',
        'Content strategy SEO-driven'
      ],
      stats: { label: 'Traffico organico', value: '+280%' }
    },
    {
      id: 'email-marketing',
      title: 'Email Marketing',
      icon: <FaEnvelope className="text-4xl" />,
      color: 'from-orange-500 to-red-500',
      borderColor: 'border-orange-500/30',
      description: 'Strategie di email marketing per nutrire i lead, fidelizzare i clienti e aumentare le vendite.',
      features: [
        'Email automation workflows',
        'Segmentazione avanzata',
        'A/B testing contenuti',
        'Carrelli abbandonati recovery',
        'Newsletter personalizzate',
        'Analisi e ottimizzazione KPI'
      ],
      stats: { label: 'Open rate', value: '45%' }
    },
    {
      id: 'social-media',
      title: 'Social Media',
      icon: <FaInstagram className="text-4xl" />,
      color: 'from-pink-500 to-yellow-500',
      borderColor: 'border-pink-500/30',
      description: 'Gestione professionale dei social media per costruire una community engaged e aumentare la brand awareness.',
      features: [
        'Piano editoriale strategico',
        'Creazione contenuti professionali',
        'Community management',
        'Influencer marketing',
        'Social listening',
        'Report e analytics mensili'
      ],
      stats: { label: 'Follower growth', value: '+520%' }
    },
    {
      id: 'consulenza',
      title: 'Consulenza',
      icon: <FaChartLine className="text-4xl" />,
      color: 'from-indigo-500 to-purple-600',
      borderColor: 'border-indigo-500/30',
      description: 'Consulenza strategica personalizzata per definire la migliore strategia di crescita digitale.',
      features: [
        'Analisi mercato e competitor',
        'Definizione strategia digitale',
        'Audit canali esistenti',
        'Piano di crescita personalizzato',
        'KPI e obiettivi misurabili',
        'Supporto decisionale continuo'
      ],
      stats: { label: 'Crescita business', value: '+400%' }
    }
  ];

  const activeServiceData = services.find(s => s.id === activeService);

  // Auto-close after 12 seconds (average reading time for the content)
  useEffect(() => {
    if (activeService && !isClosing) {
      const timer = setTimeout(() => {
        handleClose();
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [activeService, isClosing]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveService(null);
      setIsClosing(false);
    }, 300);
  };

  const handleServiceClick = (serviceId: string) => {
    if (activeService === serviceId) {
      handleClose();
    } else {
      setActiveService(serviceId);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {activeService && activeServiceData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={handleClose}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.5
              }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gray-950 border border-white/10 p-8 md:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <FaTimes className="text-white" />
              </button>

              {/* Progress bar */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 12, ease: "linear" }}
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-3xl"
              />

              {/* Content */}
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left side - Icon and Title */}
                <div className="flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0.5, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1, type: "spring", damping: 15 }}
                    className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br ${activeServiceData.color} p-1`}
                  >
                    <div className="w-full h-full rounded-2xl bg-gray-950 flex items-center justify-center text-white text-5xl md:text-6xl">
                      {activeServiceData.icon}
                    </div>
                  </motion.div>
                </div>

                {/* Right side - Content */}
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {activeServiceData.title}
                    </h2>
                    <div className={`text-lg font-semibold bg-gradient-to-r ${activeServiceData.color} bg-clip-text text-transparent mb-4`}>
                      {activeServiceData.stats.label}: {activeServiceData.stats.value}
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 text-lg mb-6"
                  >
                    {activeServiceData.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="space-y-3"
                  >
                    <h3 className="text-lg font-semibold text-white mb-3">Cosa include:</h3>
                    {activeServiceData.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <FaCheckCircle className="text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8"
                  >
                    <Link
                      href="/?openForm=true"
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${activeServiceData.color} text-white font-semibold hover:scale-105 transition-transform shadow-lg`}
                    >
                      <FaEnvelope />
                      Richiedi Info
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background - molto più scuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>

        {/* Subtle glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <FaAd className="text-purple-400" />
              <span className="text-gray-300 text-sm font-medium">I Nostri Servizi</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Soluzioni di{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Marketing Digitale
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Strategie personalizzate e campagne performance-driven per far crescere il tuo business online.
              Investiamo nei tuoi risultati.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => handleServiceClick(service.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`h-full p-6 rounded-2xl bg-gray-950/80 border ${service.borderColor} hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm`}>
                  {/* Icon and Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full rounded-xl bg-gray-950 flex items-center justify-center text-white">
                        {service.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                      <div className={`text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                        {service.stats.label}: {service.stats.value}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Click hint */}
                  <div className="text-sm text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Clicca per maggiori dettagli →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-gray-950/50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Come{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Lavoriamo
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Un processo collaudato per garantire risultati misurabili
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Analisi', desc: 'Studiamo il tuo business, mercato e competitor per definire la strategia migliore' },
              { step: '02', title: 'Strategia', desc: 'Definiamo obiettivi chiari, KPI misurabili e il piano d\'azione' },
              { step: '03', title: 'Esecuzione', desc: 'Implementiamo le campagne e monitoriamo i risultati in tempo reale' },
              { step: '04', title: 'Ottimizzazione', desc: 'Analizziamo i dati e ottimizziamo continuamente per massimizzare il ROI' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-purple-400/30 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-500/30 to-transparent -translate-x-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-black relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-purple-500/20 backdrop-blur-sm"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Pronto a far crescere il tuo business?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Candidati ora per scoprire se il tuo progetto è idoneo al nostro modello di partnership.
            </p>
            <Link
              href="/?openForm=true"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-purple-500/25"
            >
              <FaEnvelope />
              Candidati Ora
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
