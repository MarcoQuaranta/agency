'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaAward, FaBullseye, FaChartLine, FaEnvelope, FaHandshake, FaLightbulb, FaRocket, FaShieldAlt, FaUsers } from 'react-icons/fa';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

// Animated counter component
function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('it-IT')}{suffix}
    </span>
  );
}

export default function ChiSiamoPage() {
  const values = [
    {
      icon: <FaHandshake className="text-3xl" />,
      title: 'Partnership',
      description: 'Non siamo semplici fornitori, ma partner che investono nel tuo successo condividendo rischi e risultati.'
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: 'Sicurezza',
      description: 'Nessun investimento pubblicitario da parte tua: ci pensiamo noi a finanziare le campagne. Tu non rischi capitali in ads.'
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: 'Risultati',
      description: 'Siamo ossessionati dai numeri e dai KPI. Ogni decisione è guidata dai dati per massimizzare il ROI.'
    },
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: 'Innovazione',
      description: 'Testiamo costantemente nuove strategie e tecnologie per restare sempre un passo avanti alla concorrenza.'
    }
  ];

  const stats = [
    { value: 10, prefix: '€', suffix: 'M+', label: 'Investiti in Ads' },
    { value: 150, prefix: '', suffix: '+', label: 'Progetti Scalati' },
    { value: 95, prefix: '', suffix: '%', label: 'Tasso di Successo' },
    { value: 50, prefix: '€', suffix: 'M+', label: 'Revenue Generata' }
  ];

  const team = [
    {
      name: 'Performance Team',
      role: 'Advertising & Growth',
      description: 'Esperti certificati Google, Meta e TikTok con anni di esperienza nella gestione di budget pubblicitari significativi.',
      icon: <FaRocket className="text-4xl text-purple-400" />
    },
    {
      name: 'Analytics Team',
      role: 'Data & Optimization',
      description: 'Data scientist e analisti che trasformano i dati in insight actionable per ottimizzare ogni campagna.',
      icon: <FaChartLine className="text-4xl text-blue-400" />
    },
    {
      name: 'Creative Team',
      role: 'Content & Design',
      description: 'Designer e copywriter che creano contenuti ad alto impatto per catturare l\'attenzione del tuo pubblico.',
      icon: <FaLightbulb className="text-4xl text-yellow-400" />
    },
    {
      name: 'Strategy Team',
      role: 'Business & Consulting',
      description: 'Strategist che definiscono il percorso di crescita ideale per ogni progetto, dalla A alla Z.',
      icon: <FaBullseye className="text-4xl text-pink-400" />
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
              <FaUsers className="text-purple-400" />
              <span className="text-gray-300 text-sm font-medium">Chi Siamo</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Il Partner che{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Investe in Te
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Siamo SafeScale, l'agenzia di performance marketing che crede talmente tanto nel tuo progetto
              da investire insieme a te. Niente costi fissi, solo risultati condivisi.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gray-950/80 border border-white/10 backdrop-blur-sm overflow-hidden">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-gray-950/50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                La Nostra{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Missione
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                Crediamo che ogni imprenditore con un prodotto di valore meriti la possibilità di scalare,
                senza dover affrontare gli enormi costi delle campagne pubblicitarie. Per questo abbiamo creato un modello unico:
                <strong className="text-white"> siamo noi a coprire tutti gli investimenti in ads</strong>,
                permettendoti di crescere senza rischiare il tuo capitale in advertising.
              </p>
              <p className="text-gray-400 text-lg mb-6">
                Il nostro successo è legato al tuo successo. Non dovrai mai preoccuparti di budget pubblicitari da migliaia di euro:
                ce ne occupiamo noi. Tu porti il prodotto, noi portiamo l'investimento e l'expertise per farlo decollare.
              </p>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <FaAward className="text-3xl text-purple-400" />
                <div>
                  <div className="font-semibold text-white">Certificazioni</div>
                  <div className="text-gray-500 text-sm">Google Partner Premier • Meta Business Partner • TikTok Partner</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gray-950/80 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center p-8">
                  <div className="text-8xl mb-6">🚀</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Zero Investimenti Ads</h3>
                  <p className="text-gray-400">Noi investiamo, tu cresci</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-600/10 rounded-2xl blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-black relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              I Nostri{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Valori
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Principi che guidano ogni nostra decisione
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gray-950/80 border border-white/10 hover:border-purple-500/30 transition-all group backdrop-blur-sm"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-500">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Il Nostro{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Team
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Professionisti dedicati alla tua crescita
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gray-950/80 border border-white/10 hover:border-purple-500/30 transition-all text-center group backdrop-blur-sm"
              >
                <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border border-white/10">
                  {member.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <div className="text-purple-400 text-sm font-medium mb-3">{member.role}</div>
                <p className="text-gray-500 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-black relative">
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
                Funziona
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Il nostro modello di partnership in 3 semplici step
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Candidatura',
                description: 'Compili il form di candidatura e valutiamo insieme il potenziale del tuo progetto.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                step: '02',
                title: 'Partnership',
                description: 'Se il progetto è idoneo, definiamo insieme la strategia e investiamo nelle campagne.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                step: '03',
                title: 'Crescita',
                description: 'Gestiamo tutto noi: ads, e-commerce, logistica. Tu ti concentri sul prodotto, noi sulla crescita.',
                color: 'from-pink-500 to-orange-500'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-8 rounded-2xl bg-gray-950/80 border border-white/10 backdrop-blur-sm"
              >
                <div className={`text-6xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-4`}>
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-500">{item.description}</p>
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
              Vuoi far parte del nostro network?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Candidati ora e scopri se il tuo progetto ha le caratteristiche per una partnership di successo.
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
