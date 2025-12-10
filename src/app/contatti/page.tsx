'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FaCheckCircle, FaClock, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaQuestionCircle } from 'react-icons/fa';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function ContattiPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    messaggio: '',
    tipologia: 'informazioni'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simula invio (puoi collegare a un endpoint API reale)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Traccia evento Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'form_questionario_inviato');
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: 'Email',
      value: 'info@safescaleagency.com',
      link: 'mailto:info@safescaleagency.com'
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: 'Sede',
      value: 'Viale Delle Industrie 36, 81100 Caserta',
      link: null
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: 'Orari',
      value: 'Lun - Ven: 9:00 - 18:00',
      link: null
    }
  ];

  const faqs = [
    {
      question: 'Come funziona il vostro modello di partnership?',
      answer: 'Ci occupiamo noi di tutti gli investimenti pubblicitari e gestiamo l\'intero processo: ads, e-commerce e logistica. Tu ti concentri solo sul tuo prodotto, senza dover sborsare budget per le campagne. I profitti vengono divisi secondo percentuali concordate insieme.'
    },
    {
      question: 'Quali sono i requisiti per candidarsi?',
      answer: 'Cerchiamo progetti con prodotti di qualità, margini sostenibili e potenziale di scalabilità. Compila il form di candidatura e valuteremo insieme il tuo progetto.'
    },
    {
      question: 'Quanto tempo ci vuole per avere una risposta?',
      answer: 'Il nostro team risponde entro 24-48 ore lavorative. Se il progetto è idoneo, organizzeremo una call per approfondire i dettagli.'
    },
    {
      question: 'Devo investire in pubblicità?',
      answer: 'No, non devi preoccuparti degli investimenti pubblicitari. Siamo noi a coprire interamente i costi delle campagne ads. Tu non rischi capitali in advertising: pensiamo a tutto noi, dalla strategia all\'esecuzione.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

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
              <FaEnvelope className="text-purple-400" />
              <span className="text-gray-300 text-sm font-medium">Contattaci</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Parliamo del Tuo{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Progetto
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Hai domande sul nostro modello di partnership o vuoi saperne di più?
              Siamo qui per aiutarti.
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {contactInfo.map((info, index) => (
              <div key={index} className="p-6 rounded-2xl bg-gray-950/80 border border-white/10 text-center hover:border-purple-500/30 transition-all backdrop-blur-sm">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white mx-auto mb-4">
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{info.title}</h3>
                {info.link ? (
                  <a href={info.link} className="text-gray-400 hover:text-purple-400 transition-colors">
                    {info.value}
                  </a>
                ) : (
                  <p className="text-gray-400">{info.value}</p>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & FAQ Section */}
      <section className="py-20 px-6 bg-gray-950/50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">
                Inviaci un{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Messaggio
                </span>
              </h2>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-gray-950/80 border border-green-500/30 text-center backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle className="text-3xl text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Messaggio Inviato!</h3>
                  <p className="text-gray-400 mb-6">
                    Grazie per averci contattato. Ti risponderemo entro 24-48 ore lavorative.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ nome: '', email: '', telefono: '', messaggio: '', tipologia: 'informazioni' });
                    }}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Invia un altro messaggio
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Nome *</label>
                      <input
                        type="text"
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                        placeholder="Il tuo nome"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                        placeholder="La tua email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Telefono</label>
                      <input
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                        placeholder="Il tuo numero"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Tipologia</label>
                      <select
                        value={formData.tipologia}
                        onChange={(e) => setFormData({ ...formData, tipologia: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-white/10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      >
                        <option value="informazioni">Richiesta Informazioni</option>
                        <option value="partnership">Partnership</option>
                        <option value="supporto">Supporto</option>
                        <option value="altro">Altro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Messaggio *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.messaggio}
                      onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                      placeholder="Scrivi il tuo messaggio..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Invio in corso...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Invia Messaggio
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">
                Domande{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Frequenti
                </span>
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-gray-950/80 border border-white/10 hover:border-purple-500/20 transition-all backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-3">
                      <FaQuestionCircle className="text-purple-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-white mb-2">{faq.question}</h3>
                        <p className="text-gray-500 text-sm">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Box */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-purple-500/20 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-2">Pronto per iniziare?</h3>
                <p className="text-gray-400 mb-4">
                  Se vuoi candidarti per una partnership, usa il nostro form di candidatura dedicato.
                </p>
                <Link
                  href="/?openForm=true"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold hover:scale-105 transition-transform shadow-lg shadow-purple-500/25"
                >
                  <FaEnvelope />
                  Candidati Ora
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (placeholder) */}
      <section className="py-20 px-6 bg-black relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden bg-gray-950/80 border border-white/10 h-96 flex items-center justify-center backdrop-blur-sm"
          >
            <div className="text-center">
              <FaMapMarkerAlt className="text-5xl text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">La Nostra Sede</h3>
              <p className="text-gray-400">Viale Delle Industrie 36, 81100 Caserta, Italia</p>
              <p className="text-gray-600 text-sm mt-2">SMARTUP SRL - P.IVA: 09227760965</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
