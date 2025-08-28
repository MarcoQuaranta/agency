'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    nome: '',
    cognome: '',
    telefono: '',
    email: ''
  });
  const [questionnaireData, setQuestionnaireData] = useState({
    brandName: '',
    website: '',
    instagram: '',
    sector: '',
    sectorOther: '',
    production: '',
    bestSeller: '',
    margin: '',
    availability: '',
    onlineSales: '',
    monthlyOrders: '',
    adInvestment: '',
    salesChannels: [] as string[],
    shipping: '',
    shippingOther: '',
    returns: '',
    countries: '',
    objective: '',
    revenue: '',
    team: '',
    obstacles: ''
  });
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaQuestion, setCaptchaQuestion] = useState({ question: 'Caricamento...', answer: 0 });
  const [questionnaireSubmitted, setQuestionnaireSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Prevent hydration error by rendering only after mount
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Effect per bloccare lo scroll quando il questionario è aperto
  useEffect(() => {
    if (showQuestionnaire) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function per ripristinare lo scroll
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showQuestionnaire]);

  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return;
    
    // Observer standard per le sezioni normali
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId && entry.isIntersecting && !['databrand-box', 'competitors-box'].includes(sectionId)) {
            setVisibleSections(prev => 
              prev.includes(sectionId) ? prev : [...prev, sectionId]
            );
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observer per i box di confronto con threshold più alto
    const boxObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId && entry.isIntersecting && ['databrand-box', 'competitors-box'].includes(sectionId)) {
            setVisibleSections(prev => 
              prev.includes(sectionId) ? prev : [...prev, sectionId]
            );
          }
        });
      },
      { threshold: 0.5 } // Threshold più alto per i box
    );

    // Osserva sezioni normali
    const normalSections = document.querySelectorAll('[data-section]:not([data-section="databrand-box"]):not([data-section="competitors-box"])');
    normalSections.forEach((section) => observer.observe(section));

    // Osserva i box con threshold più alto
    const boxes = document.querySelectorAll('[data-section="databrand-box"], [data-section="competitors-box"]');
    boxes.forEach((box) => boxObserver.observe(box));

    return () => {
      observer.disconnect();
      boxObserver.disconnect();
    };
  }, [isMounted]);

  // Track screen size
  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return;
    
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isMounted]);

  // Reviews data
  const reviews = [
    {
      id: 1,
      name: "Marco Rossi",
      role: "CEO, TechStart",
      rating: 5,
      text: "Grazie a SafeScale abbiamo triplicato il nostro fatturato in soli 6 mesi. Il loro approccio strategico e l'investimento iniziale ci hanno permesso di crescere senza rischi.",
      avatar: "👨‍💼"
    },
    {
      id: 2,
      name: "Sara Bianchi",
      role: "Founder, FashionHub",
      rating: 5,
      text: "Incredibile! Hanno gestito tutto: dall'e-commerce al marketing. Io mi sono concentrata solo sul prodotto mentre loro facevano crescere le vendite ogni giorno.",
      avatar: "👩‍💻"
    },
    {
      id: 3,
      name: "Luca Ferrari",
      role: "Imprenditore",
      rating: 5,
      text: "Non credevo fosse possibile: hanno investito nel mio progetto e gestito tutti i rischi. Ora il mio business genera €50k al mese e continua a crescere.",
      avatar: "🧑‍🚀"
    },
    {
      id: 4,
      name: "Elena Conti",
      role: "Co-founder, GreenLife",
      rating: 5,
      text: "Partnership perfetta! Loro si occupano di marketing e logistica, io della qualità del prodotto. Il risultato? 300% di crescita in un anno.",
      avatar: "👩‍🌾"
    },
    {
      id: 5,
      name: "Andrea Moro",
      role: "CEO, SportMax",
      rating: 5,
      text: "SafeScale ha trasformato la mia idea in un business da 6 cifre. La loro esperienza nel digital marketing è impareggiabile.",
      avatar: "🏃‍♂️"
    },
    {
      id: 6,
      name: "Giulia Neri",
      role: "Founder, BeautyBox",
      rating: 5,
      text: "Finalmente un'agenzia che investe realmente nei tuoi progetti! Hanno coperto tutti i costi iniziali e ora dividiamo i profitti. Geniale!",
      avatar: "💄"
    },
    {
      id: 7,
      name: "Roberto Verdi",
      role: "Imprenditore Digitale",
      rating: 5,
      text: "Collaborazione fantastica! In 8 mesi siamo passati da zero a €30k mensili. La loro strategia di investimento condiviso funziona davvero.",
      avatar: "💼"
    },
    {
      id: 8,
      name: "Francesca Blu",
      role: "CEO, HomeDesign",
      rating: 5,
      text: "Professionalità e risultati concreti. Hanno gestito campagne pubblicitarie da €200k+ e ci hanno fatto diventare leader nel nostro settore.",
      avatar: "🏠"
    },
    {
      id: 9,
      name: "Matteo Gialli",
      role: "Founder, FoodTech",
      rating: 5,
      text: "Incredibile capacità di identificare opportunità di mercato. Con loro abbiamo lanciato 3 prodotti di successo in 12 mesi.",
      avatar: "👨‍🍳"
    },
    {
      id: 10,
      name: "Chiara Rosa",
      role: "CEO, WellnessPlus",
      rating: 5,
      text: "Il sogno di ogni imprenditore: un partner che investe, gestisce tutto e condivide solo i profitti. Risultato: crescita del 400% annuale!",
      avatar: "🧘‍♀️"
    }
  ];


  const nextReview = () => {
    setCurrentReviewIndex((prev) => {
      const maxIndex = isDesktop ? reviews.length - 3 : reviews.length - 1;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => {
      const maxIndex = isDesktop ? reviews.length - 3 : reviews.length - 1;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  // Generate captcha question
  const generateCaptcha = () => {
    if (typeof window === 'undefined') return;
    
    const operations = [
      { op: '+', calc: (a: number, b: number) => a + b },
      { op: '-', calc: (a: number, b: number) => a - b },
      { op: '×', calc: (a: number, b: number) => a * b }
    ];
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    const question = `${num1} ${operation.op} ${num2} = ?`;
    const answer = operation.calc(num1, num2);
    
    setCaptchaQuestion({ question, answer });
  };

  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setContactFormData({
      nome: formData.get('nome') as string,
      cognome: formData.get('cognome') as string,
      telefono: formData.get('telefono') as string,
      email: formData.get('email') as string
    });
    generateCaptcha();
    setShowQuestionnaire(true);
  };

  // Handle questionnaire form submission
  const handleQuestionnaireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (parseInt(captchaAnswer) !== captchaQuestion.answer) {
      alert('Captcha non corretto. Riprova.');
      return;
    }

    try {
      // Invia i dati via email
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactData: contactFormData,
          questionnaireData: questionnaireData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Show thank you message if email sent successfully
        setQuestionnaireSubmitted(true);
      } else {
        alert('Errore nell\'invio della candidatura. Riprova più tardi.');
      }
    } catch (error) {
      console.error('Errore invio candidatura:', error);
      alert('Errore nell\'invio della candidatura. Riprova più tardi.');
    }
  };

  // Generate initial captcha on component mount (client-side only)
  useEffect(() => {
    if (isMounted) {
      generateCaptcha();
    }
  }, [isMounted]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-slate-950 text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-slate-950/95 via-gray-950/95 to-slate-950/95 backdrop-blur-sm border-b border-gray-800">
        <div className="w-full max-w-[2000px] mx-auto px-6 lg:px-12 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">
              <span style={{color: '#EE6622'}}>Data</span>
              <span className="text-blue-600">Brand</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#servizi" className="hover:text-green-400 transition-colors">Servizi</Link>
              <Link href="#chi-siamo" className="hover:text-green-400 transition-colors">Chi Siamo</Link>
              <Link href="#contatti" className="hover:text-green-400 transition-colors">Contatti</Link>
            </nav>
            
            {/* Desktop Button */}
            <button 
              onClick={() => {
                setShowContactForm(true);
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
              className="hidden md:block bg-gradient-to-r from-blue-600 to-green-500 px-6 py-2 rounded-full hover:from-blue-700 hover:to-green-600 transition-all transform hover:scale-105" 
              style={{background: 'linear-gradient(to right, #1e40af, #10b981)'}}
            >
              ✉️ Candidati
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col space-y-1 p-2"
            >
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-slate-950/98 via-gray-950/98 to-slate-950/98 backdrop-blur-md border-b border-gray-800 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
          <div className="container mx-auto px-6 py-6">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="#servizi" 
                className="text-lg hover:text-green-400 transition-colors py-2 border-b border-gray-800/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Servizi
              </Link>
              <Link 
                href="#chi-siamo" 
                className="text-lg hover:text-green-400 transition-colors py-2 border-b border-gray-800/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Chi Siamo
              </Link>
              <Link 
                href="#contatti" 
                className="text-lg hover:text-green-400 transition-colors py-2 border-b border-gray-800/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contatti
              </Link>
              <button 
                className="bg-gradient-to-r from-blue-600 to-green-500 px-6 py-3 rounded-full hover:from-blue-700 hover:to-green-600 transition-all text-center mt-4 transform hover:scale-105"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowContactForm(true);
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
              >
                ✉️ Candidati
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        data-section="hero" 
        className="pt-24 sm:pt-20 pb-8 lg:px-12 min-h-screen flex items-center relative overflow-hidden"
      >
        {/* Gradiente di base scuro */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
        
        {/* Sfumatura arancione marcata */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at top right, rgba(249, 115, 22, 0.4) 0%, rgba(251, 146, 60, 0.2) 40%, transparent 70%)'
        }} />
        
        {/* Strisce eleganti blu che sfumano in arancione */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                135deg,
                transparent 0px,
                transparent 1px,
                rgba(59, 130, 246, 0.4) 1px,
                rgba(59, 130, 246, 0.4) 1.5px,
                transparent 1.5px,
                transparent 25px
              ),
              repeating-linear-gradient(
                135deg,
                transparent 0px,
                transparent 1px,
                rgba(249, 115, 22, 0.3) 1px,
                rgba(249, 115, 22, 0.3) 1.5px,
                transparent 1.5px,
                transparent 25px
              )
            `,
            backgroundPosition: '0 0, 12.5px 12.5px'
          }}
        />
        
        {/* Gradiente che trasforma blu in arancione */}
        <div className="absolute inset-0 opacity-20" style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.15) 50%, rgba(249, 115, 22, 0.25) 100%)'
        }} />

        {/* Overlay dinamico per profondità */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 via-blue-600/5 to-purple-600/6 animate-pulse" style={{animationDuration: '6s'}}></div>
        
        {/* Pattern geometrico sottile */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(249, 115, 22, 0.03) 2px,
              rgba(249, 115, 22, 0.03) 4px
            )`
          }}
        />
        <div className="w-full max-w-[2000px] mx-auto relative z-10 px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 order-1 lg:order-1 lg:col-span-2">
              <div className="inline-block px-3 py-2 bg-gray-800 rounded-full text-xs sm:text-sm">
                Investiamo sul tuo progetto
              </div>
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Noi <span className="text-blue-600">Investiamo</span>
                <br />Tu 
                <span className="text-green-600"> Guadagni</span> 
                <br />
                 <span style={{color: '#EE6622'}}>Zero Rischi</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
                Proponici la tua <span style={{color: '#EE6622'}}>idea di Business</span> con <span className="text-blue-600">E-Commerce</span>: se la riterremo valida, <span style={{color: '#EE6622'}}>creeremo</span> il sistema di consegne, gestiremo il <span className="text-blue-600">marketing</span> e <span style={{color: '#EE6622'}}>investiremo</span> nel progetto con campagne pubblicitarie mirate.  
Tranquillo, <span className="text-blue-600">copriremo eventuali perdite economiche</span> e ci prenderemo tutti i<span style={{color: '#EE6622'}}> rischi</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button 
                  onClick={() => {
                    setShowContactForm(true);
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 100);
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-green-500 px-6 sm:px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-green-600 transition-all text-sm sm:text-base transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  ✉️ Candidati
                </button>
              </div>
            </div>
            
            {/* Circular Design */}
            <div className="relative flex justify-center lg:justify-end order-2 lg:order-2 mb-8 lg:mb-0 lg:col-span-3 lg:pr-4">
              <div className="relative w-full max-w-md aspect-square sm:max-w-[450px] md:max-w-[550px] lg:max-w-[720px] xl:max-w-[820px]">
                {!showContactForm ? (
                  <>
                    {/* Animated outer rings */}
                    <div className="absolute inset-0 rounded-full border border-white/10 animate-spin" style={{animationDuration: '20s'}}></div>
                    <div className="absolute inset-4 sm:inset-8 rounded-full border border-purple-500/30 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
                    <div className="absolute inset-8 sm:inset-16 rounded-full border border-pink-500/30 animate-spin" style={{animationDuration: '10s'}}></div>
                    
                    {/* Connecting lines - Responsive viewBox */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#1e40af" stopOpacity="0.6" />
                          <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#EE6622" stopOpacity="0.6" />
                        </linearGradient>
                      </defs>
                      
                      {/* Curved lines - Adjusted for percentage-based positioning */}
                      <path d="M 50,10 Q 30,20 40,40 Q 44,44 50,50" stroke="url(#lineGradient)" strokeWidth="0.3" fill="none" opacity="0.7" />
                      <path d="M 80,24 Q 70,30 64,40 Q 60,44 50,50" stroke="url(#lineGradient)" strokeWidth="0.3" fill="none" opacity="0.7" />
                      <path d="M 90,50 Q 80,50 70,50 Q 64,50 50,50" stroke="url(#lineGradient)" strokeWidth="0.3" fill="none" opacity="0.7" />
                      <path d="M 80,76 Q 70,70 64,60 Q 60,56 50,50" stroke="url(#lineGradient)" strokeWidth="0.3" fill="none" opacity="0.7" />
                      <path d="M 50,90 Q 60,80 56,64 Q 54,56 50,50" stroke="url(#lineGradient)" strokeWidth="0.3" fill="none" opacity="0.7" />
                      <path d="M 20,76 Q 30,70 36,60 Q 40,56 50,50" stroke="url(#lineGradient)" strokeWidth="0.3" fill="none" opacity="0.7" />
                      <path d="M 10,50 Q 20,50 30,50 Q 36,50 50,50" stroke="url(#lineGradient)" strokeWidth="0.3" fill="none" opacity="0.7" />
                      <path d="M 20,24 Q 30,30 36,40 Q 40,44 50,50" stroke="url(#lineGradient)" strokeWidth="0.3" fill="none" opacity="0.7" />
                    </svg>
                    
                    {/* Main central circle with GIF background */}
                    <div className="absolute inset-10 sm:inset-12 md:inset-16 lg:inset-20 rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
                      {/* GIF background */}
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <img 
                          src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" 
                          alt="Digital marketing animation"
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-green-600/40 to-orange-500/40 rounded-full" style={{background: 'radial-gradient(circle, rgba(30, 64, 175, 0.4) 0%, rgba(16, 185, 129, 0.4) 50%, rgba(238, 102, 34, 0.4) 100%)'}}></div>
                      </div>
                      
                      <div className="relative z-10">
                        <button 
                          onClick={() => {
                            setShowContactForm(true);
                            setTimeout(() => {
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }, 100);
                          }}
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 border border-white/30 text-sm sm:text-base md:text-lg shadow-lg"
                        >
                          Scopri come funziona
                        </button>
                      </div>
                    </div>
                    
                    {/* Orbiting elements with responsive positioning */}
                    <div className="absolute top-1 sm:top-2 md:top-4 left-1/2 transform -translate-x-1/2 animate-bounce hover:animate-pulse" style={{animationDelay: '0s', animationDuration: '3s'}}>
                      <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center border-2 border-white/20 shadow-lg transform hover:scale-125 hover:rotate-12 transition-all duration-300">
                        <span className="text-sm sm:text-lg md:text-xl">📱</span>
                      </div>
                    </div>
                    
                    <div className="absolute top-8 sm:top-12 md:top-16 right-2 sm:right-4 md:right-8 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3s'}}>
                      <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center border-2 border-blue-400/40 shadow-lg">
                        <span className="text-sm sm:text-lg md:text-xl">📊</span>
                      </div>
                    </div>
                    
                    <div className="absolute right-1 sm:right-2 md:right-4 top-1/2 transform -translate-y-1/2 animate-bounce" style={{animationDelay: '1s', animationDuration: '3s'}}>
                      <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center border-2 border-green-400/40 shadow-lg">
                        <span className="text-sm sm:text-lg md:text-xl">🔍</span>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 right-2 sm:right-4 md:right-8 animate-bounce" style={{animationDelay: '1.5s', animationDuration: '3s'}}>
                      <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center border-2 shadow-lg" style={{borderColor: 'rgba(238, 102, 34, 0.4)'}}>
                        <span className="text-sm sm:text-lg md:text-xl">💡</span>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-1 sm:bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce" style={{animationDelay: '2s', animationDuration: '3s'}}>
                      <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center border-2 border-white/20 shadow-lg">
                        <span className="text-sm sm:text-lg md:text-xl">🎨</span>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-2 sm:left-4 md:left-8 animate-bounce" style={{animationDelay: '2.5s', animationDuration: '3s'}}>
                      <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center border-2 border-blue-400/40 shadow-lg">
                        <span className="text-sm sm:text-lg md:text-xl">⚡</span>
                      </div>
                    </div>
                    
                    <div className="absolute left-1 sm:left-2 md:left-4 top-1/2 transform -translate-y-1/2 animate-bounce" style={{animationDelay: '3s', animationDuration: '3s'}}>
                      <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center border-2 border-green-400/40 shadow-lg">
                        <span className="text-sm sm:text-lg md:text-xl">🚀</span>
                      </div>
                    </div>
                    
                    <div className="absolute top-8 sm:top-12 md:top-16 left-2 sm:left-4 md:left-8 animate-bounce" style={{animationDelay: '3.5s', animationDuration: '3s'}}>
                      <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center border-2 border-cyan-400/40 shadow-lg">
                        <span className="text-sm sm:text-lg md:text-xl">🎯</span>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Contact Form - Mobile Responsive */
                  <div className="absolute inset-0 flex items-center justify-center p-0 sm:p-6">
                    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-6 sm:p-6 md:p-8 rounded-2xl border border-blue-600/50 backdrop-blur-sm w-full h-auto sm:max-w-lg shadow-2xl relative">
                      {/* Decorative background elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-full"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-indigo-600/5"></div>
                      <div className="flex justify-between items-center mb-4 sm:mb-6 relative z-10">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">Contattaci</h3>
                        <button 
                          onClick={() => setShowContactForm(false)}
                          className="text-blue-300 hover:text-white transition-colors text-lg sm:text-xl"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <form className="space-y-3 sm:space-y-4 relative z-10" onSubmit={handleContactSubmit}>
                        <div className="grid grid-cols-2 gap-2 sm:gap-4">
                          <div>
                            <label htmlFor="nome" className="block text-xs sm:text-sm font-medium text-blue-200 mb-1 sm:mb-2">
                              Nome
                            </label>
                            <input
                              type="text"
                              id="nome"
                              name="nome"
                              className="w-full px-2 sm:px-3 md:px-4 py-2 bg-blue-800/30 border border-blue-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-sm placeholder-blue-300/50"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="cognome" className="block text-xs sm:text-sm font-medium text-blue-200 mb-1 sm:mb-2">
                              Cognome
                            </label>
                            <input
                              type="text"
                              id="cognome"
                              name="cognome"
                              className="w-full px-2 sm:px-3 md:px-4 py-2 bg-blue-800/30 border border-blue-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-sm placeholder-blue-300/50"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="telefono" className="block text-xs sm:text-sm font-medium text-blue-200 mb-1 sm:mb-2">
                            Telefono
                          </label>
                          <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            className="w-full px-2 sm:px-3 md:px-4 py-2 bg-blue-800/30 border border-blue-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-sm placeholder-blue-300/50"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-blue-200 mb-1 sm:mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-2 sm:px-3 md:px-4 py-2 bg-blue-800/30 border border-blue-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-sm placeholder-blue-300/50"
                            required
                          />
                        </div>
                        
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base shadow-lg"
                        >
                          Invia Richiesta
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* Questionnaire Popup */}
                {showQuestionnaire && (
                  <div 
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center z-[60] p-4 pt-20"
                    onClick={(e) => {
                      if (e.target === e.currentTarget) {
                        setShowQuestionnaire(false);
                        setQuestionnaireSubmitted(false);
                      }
                    }}
                  >
                    <div className="bg-gradient-to-br from-slate-900 via-blue-900/90 to-slate-900 p-6 sm:p-8 rounded-2xl border-2 border-blue-500/30 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto mt-4">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-2">
                            📋 Candidatura SafeScale
                          </h3>
                        </div>
                        <button 
                          onClick={() => {
                            setShowQuestionnaire(false);
                            generateCaptcha();
                          }}
                          className="text-blue-300 hover:text-white transition-colors text-xl"
                        >
                          ✕
                        </button>
                      </div>
                      
                      {!questionnaireSubmitted ? (
                        <form className="space-y-6" onSubmit={handleQuestionnaireSubmit}>
                        {/* Sezione 1 - Chi sei */}
                        <div className="bg-blue-800/20 p-4 rounded-lg">
                          <h4 className="text-lg font-bold text-cyan-300 mb-4">🔹 Sezione 1 – Chi sei</h4>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                1. Nome del tuo brand / azienda
                              </label>
                              <input
                                type="text"
                                value={questionnaireData.brandName}
                                onChange={(e) => setQuestionnaireData({...questionnaireData, brandName: e.target.value})}
                                className="w-full px-3 py-2 bg-blue-800/30 border border-blue-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-sm text-blue-100"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                2. Inserisci il link al tuo sito web
                              </label>
                              <input
                                type="text"
                                value={questionnaireData.website}
                                onChange={(e) => setQuestionnaireData({...questionnaireData, website: e.target.value})}
                                placeholder="https://..."
                                className="w-full px-3 py-2 bg-blue-800/30 border border-blue-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-sm text-blue-100 placeholder-blue-300/50"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                3. Inserisci il link al tuo profilo Instagram
                              </label>
                              <input
                                type="text"
                                value={questionnaireData.instagram}
                                onChange={(e) => setQuestionnaireData({...questionnaireData, instagram: e.target.value})}
                                placeholder="https://instagram.com/..."
                                className="w-full px-3 py-2 bg-blue-800/30 border border-blue-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-sm text-blue-100 placeholder-blue-300/50"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                4. In quale settore operi principalmente?
                              </label>
                              <div className="space-y-1">
                                {['Moda & Accessori', 'Beauty & Cosmetica', 'Food & Integratori', 'Home & Lifestyle', 'Altro'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-1 px-2 rounded hover:bg-blue-800/20 transition-colors">
                                    <input
                                      type="radio"
                                      name="sector"
                                      value={option}
                                      checked={questionnaireData.sector === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, sector: e.target.value})}
                                      className="w-4 h-4 text-cyan-500 border-blue-400 focus:ring-cyan-400"
                                      required
                                    />
                                    <span className="text-blue-100 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                              {questionnaireData.sector === 'Altro' && (
                                <input
                                  type="text"
                                  value={questionnaireData.sectorOther}
                                  onChange={(e) => setQuestionnaireData({...questionnaireData, sectorOther: e.target.value})}
                                  placeholder="Specifica..."
                                  className="w-full mt-2 px-3 py-2 bg-blue-800/30 border border-blue-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-sm text-blue-100 placeholder-blue-300/50"
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Sezione 2 - I tuoi prodotti */}
                        <div className="bg-blue-800/20 p-4 rounded-lg">
                          <h4 className="text-lg font-bold text-cyan-300 mb-4">🔹 Sezione 2 – I tuoi prodotti</h4>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                5. Chi produce i tuoi prodotti?
                              </label>
                              <div className="space-y-1">
                                {['Produzione interna', 'Produzione in conto terzi', 'Acquisto stock già pronti', 'Dropshipping'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-1 px-2 rounded hover:bg-blue-800/20 transition-colors">
                                    <input
                                      type="radio"
                                      name="production"
                                      value={option}
                                      checked={questionnaireData.production === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, production: e.target.value})}
                                      className="w-4 h-4 text-cyan-500 border-blue-400 focus:ring-cyan-400"
                                      required
                                    />
                                    <span className="text-blue-100 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                6. Qual è il tuo prodotto best seller e il prezzo medio di vendita?
                              </label>
                              <textarea
                                value={questionnaireData.bestSeller}
                                onChange={(e) => setQuestionnaireData({...questionnaireData, bestSeller: e.target.value})}
                                className="w-full px-3 py-2 bg-blue-800/30 border border-blue-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-sm text-blue-100 resize-none"
                                rows={2}
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                7. Margine medio lordo sui tuoi prodotti (in %)?
                              </label>
                              <div className="space-y-1">
                                {['< 40%', '40–60%', '60–80%', '> 80%'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-1 px-2 rounded hover:bg-blue-800/20 transition-colors">
                                    <input
                                      type="radio"
                                      name="margin"
                                      value={option}
                                      checked={questionnaireData.margin === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, margin: e.target.value})}
                                      className="w-4 h-4 text-cyan-500 border-blue-400 focus:ring-cyan-400"
                                      required
                                    />
                                    <span className="text-blue-100 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                8. Come gestisci la disponibilità del prodotto?
                              </label>
                              <div className="space-y-1">
                                {['Ho stock pronto', 'Produzione just-in-time', 'Misto'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-1 px-2 rounded hover:bg-blue-800/20 transition-colors">
                                    <input
                                      type="radio"
                                      name="availability"
                                      value={option}
                                      checked={questionnaireData.availability === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, availability: e.target.value})}
                                      className="w-4 h-4 text-cyan-500 border-blue-400 focus:ring-cyan-400"
                                      required
                                    />
                                    <span className="text-blue-100 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Sezione 3 - Esperienza di vendita */}
                        <div className="bg-blue-800/20 p-4 rounded-lg">
                          <h4 className="text-lg font-bold text-cyan-300 mb-4">🔹 Sezione 3 – Esperienza di vendita</h4>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                9. Hai già venduto online?
                              </label>
                              <div className="space-y-1">
                                {['Sì, e-commerce proprietario', 'Sì, marketplace (Amazon, Etsy, ecc.)', 'Sì, solo social media (IG, TikTok, WhatsApp)', 'No, mai venduto online'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-1 px-2 rounded hover:bg-blue-800/20 transition-colors">
                                    <input
                                      type="radio"
                                      name="onlineSales"
                                      value={option}
                                      checked={questionnaireData.onlineSales === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, onlineSales: e.target.value})}
                                      className="w-4 h-4 text-cyan-500 border-blue-400 focus:ring-cyan-400"
                                      required
                                    />
                                    <span className="text-blue-100 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                10. Ordini mensili medi attuali
                              </label>
                              <div className="space-y-1">
                                {['0–50', '50–200', '200–500', '500+'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-1 px-2 rounded hover:bg-blue-800/20 transition-colors">
                                    <input
                                      type="radio"
                                      name="monthlyOrders"
                                      value={option}
                                      checked={questionnaireData.monthlyOrders === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, monthlyOrders: e.target.value})}
                                      className="w-4 h-4 text-cyan-500 border-blue-400 focus:ring-cyan-400"
                                      required
                                    />
                                    <span className="text-blue-100 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                11. Quanto hai investito in advertising digitale in passato?
                              </label>
                              <div className="space-y-1">
                                {['Mai', '< 1.000 €/mese', '1.000–5.000 €/mese', '> 5.000 €/mese'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-1 px-2 rounded hover:bg-blue-800/20 transition-colors">
                                    <input
                                      type="radio"
                                      name="adInvestment"
                                      value={option}
                                      checked={questionnaireData.adInvestment === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, adInvestment: e.target.value})}
                                      className="w-4 h-4 text-cyan-500 border-blue-400 focus:ring-cyan-400"
                                      required
                                    />
                                    <span className="text-blue-100 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                12. Canali di vendita attuali (selezione multipla)
                              </label>
                              <div className="space-y-1">
                                {['B2C diretto (e-commerce, social)', 'B2B / rivenditori', 'Offline (negozi fisici, fiere)'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-1 px-2 rounded hover:bg-blue-800/20 transition-colors">
                                    <input
                                      type="checkbox"
                                      value={option}
                                      checked={questionnaireData.salesChannels.includes(option)}
                                      onChange={(e) => {
                                        const newChannels = e.target.checked 
                                          ? [...questionnaireData.salesChannels, option]
                                          : questionnaireData.salesChannels.filter(c => c !== option);
                                        setQuestionnaireData({...questionnaireData, salesChannels: newChannels});
                                      }}
                                      className="w-4 h-4 text-cyan-500 border-blue-400 focus:ring-cyan-400"
                                    />
                                    <span className="text-blue-100 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Sezione 4 - Logistica & operatività */}
                        <div className="bg-blue-800/20 p-4 rounded-lg">
                          <h4 className="text-lg font-bold text-cyan-300 mb-4">🔹 Sezione 4 – Logistica & operatività</h4>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                13. Come gestisci attualmente le spedizioni?
                              </label>
                              <div className="space-y-1">
                                {['Contratti con corrieri', 'Marketplace (es. Amazon FBA)', 'Gestione manuale senza contratti fissi', 'Altro'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-1 px-2 rounded hover:bg-blue-800/20 transition-colors">
                                    <input
                                      type="radio"
                                      name="shipping"
                                      value={option}
                                      checked={questionnaireData.shipping === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, shipping: e.target.value})}
                                      className="w-4 h-4 text-cyan-500 border-blue-400 focus:ring-cyan-400"
                                      required
                                    />
                                    <span className="text-blue-100 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                              {questionnaireData.shipping === 'Altro' && (
                                <input
                                  type="text"
                                  value={questionnaireData.shippingOther}
                                  onChange={(e) => setQuestionnaireData({...questionnaireData, shippingOther: e.target.value})}
                                  placeholder="Specifica..."
                                  className="w-full mt-2 px-3 py-2 bg-blue-800/30 border border-blue-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-sm text-blue-100 placeholder-blue-300/50"
                                />
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                14. % media di resi/mancata consegna (RTO)
                              </label>
                              <div className="space-y-1">
                                {['< 5%', '5–10%', '10–20%', '> 20%'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-1 px-2 rounded hover:bg-blue-800/20 transition-colors">
                                    <input
                                      type="radio"
                                      name="returns"
                                      value={option}
                                      checked={questionnaireData.returns === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, returns: e.target.value})}
                                      className="w-4 h-4 text-cyan-500 border-blue-400 focus:ring-cyan-400"
                                      required
                                    />
                                    <span className="text-blue-100 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                15. In quali Paesi vendi o vorresti vendere?
                              </label>
                              <textarea
                                value={questionnaireData.countries}
                                onChange={(e) => setQuestionnaireData({...questionnaireData, countries: e.target.value})}
                                className="w-full px-3 py-2 bg-blue-800/30 border border-blue-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-sm text-blue-100 resize-none"
                                rows={2}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        {/* Sezione 5 - Potenziale del brand */}
                        <div className="bg-blue-800/20 p-4 rounded-lg">
                          <h4 className="text-lg font-bold text-cyan-300 mb-4">🔹 Sezione 5 – Potenziale del brand</h4>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                16. Obiettivo principale nei prossimi 12 mesi
                              </label>
                              <textarea
                                value={questionnaireData.objective}
                                onChange={(e) => setQuestionnaireData({...questionnaireData, objective: e.target.value})}
                                className="w-full px-3 py-2 bg-blue-800/30 border border-blue-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-sm text-blue-100 resize-none"
                                rows={3}
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                17. Fatturato medio mensile negli ultimi 6 mesi (€)
                              </label>
                              <input
                                type="number"
                                value={questionnaireData.revenue}
                                onChange={(e) => setQuestionnaireData({...questionnaireData, revenue: e.target.value})}
                                className="w-full px-3 py-2 bg-blue-800/30 border border-blue-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-sm text-blue-100"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                18. Composizione del tuo team attuale
                              </label>
                              <div className="space-y-1">
                                {['Solo founder', '2–3 persone', '4–10 persone', '10+ persone'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-1 px-2 rounded hover:bg-blue-800/20 transition-colors">
                                    <input
                                      type="radio"
                                      name="team"
                                      value={option}
                                      checked={questionnaireData.team === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, team: e.target.value})}
                                      className="w-4 h-4 text-cyan-500 border-blue-400 focus:ring-cyan-400"
                                      required
                                    />
                                    <span className="text-blue-100 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                19. Quali sono oggi i principali ostacoli che ti impediscono di crescere?
                              </label>
                              <textarea
                                value={questionnaireData.obstacles}
                                onChange={(e) => setQuestionnaireData({...questionnaireData, obstacles: e.target.value})}
                                className="w-full px-3 py-2 bg-blue-800/30 border border-blue-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-sm text-blue-100 resize-none"
                                rows={3}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        {/* Captcha */}
                        <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                          <label className="block text-sm font-medium text-blue-200 mb-3">
                            🔐 Conferma che sei umano - Risolvi questa operazione:
                          </label>
                          <div className="flex items-center space-x-4" suppressHydrationWarning>
                            {isMounted ? (
                              <>
                                <span className="text-lg font-bold text-cyan-300">{captchaQuestion.question}</span>
                                <input
                                  type="number"
                                  value={captchaAnswer}
                                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                                  className="w-20 px-3 py-2 bg-blue-800/30 border border-blue-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-center"
                                  placeholder="?"
                                  required
                                />
                                <button
                                  type="button"
                                  onClick={generateCaptcha}
                                  className="text-blue-300 hover:text-cyan-300 transition-colors text-sm underline"
                                >
                                  🔄 Nuova domanda
                                </button>
                              </>
                            ) : (
                              <div className="flex items-center space-x-4">
                                <span className="text-lg font-bold text-cyan-300">Caricamento...</span>
                                <div className="w-20 h-10 bg-blue-800/30 border border-blue-500/50 rounded-lg animate-pulse"></div>
                                <div className="w-24 h-6 bg-blue-800/30 rounded animate-pulse"></div>
                              </div>
                            )}
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-base shadow-lg"
                        >
                          🚀 Invia Candidatura
                        </button>
                      </form>
                      ) : (
                        <div className="text-center py-8">
                          <div className="mb-6">
                            <div className="text-6xl mb-4">✅</div>
                            <h3 className="text-2xl font-bold text-green-400 mb-4">
                              Candidatura Inviata con Successo!
                            </h3>
                            <p className="text-blue-200 text-lg leading-relaxed mb-6">
                              Grazie per aver completato il questionario.<br />
                              Se il tuo brand è idoneo, un nostro commerciale ti contatterà entro <span className="text-cyan-400 font-semibold">48 ore</span> per valutare la collaborazione.
                            </p>
                            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6 rounded-xl border border-green-500/30">
                              <p className="text-green-300 font-semibold mb-2">
                                🎯 Prossimi passi:
                              </p>
                              <ul className="text-blue-200 text-left space-y-2">
                                <li>• Analizzeremo il tuo profilo aziendale</li>
                                <li>• Valuteremo il potenziale del tuo brand</li>
                                <li>• Ti contatteremo per un colloquio preliminare</li>
                                <li>• Definiremo insieme la strategia di crescita</li>
                              </ul>
                            </div>
                          </div>
                          <button 
                            onClick={() => {
                              setShowQuestionnaire(false);
                              setQuestionnaireSubmitted(false);
                              setShowContactForm(false);
                              setContactFormData({ nome: '', cognome: '', telefono: '', email: '' });
                              setQuestionnaireData({
                                brandName: '', website: '', instagram: '', sector: '', sectorOther: '', production: '',
                                bestSeller: '', margin: '', availability: '', onlineSales: '', monthlyOrders: '', adInvestment: '',
                                salesChannels: [], shipping: '', shippingOther: '', returns: '', countries: '', objective: '', revenue: '', team: '', obstacles: ''
                              });
                            }}
                            className="bg-gradient-to-r from-green-500 to-blue-600 px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-lg shadow-lg"
                          >
                            Chiudi
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-8 lg:mt-16">
            <div className="bg-gray-900/50 p-4 sm:p-6 rounded-2xl">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="text-2xl sm:text-3xl">📈</div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Maggiore probabilità di successo</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">rispetto a chi opta per una gestione individuale</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900/50 p-4 sm:p-6 rounded-2xl">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="text-2xl sm:text-3xl">✅</div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Riduzione dei rischi al minimo</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">perché copriamo noi tutte le eventuali perdite</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Highlight Section */}
      <section 
        className="py-8 sm:py-12 px-4 sm:px-6 lg:px-12 bg-gradient-to-r from-red-900 to-red-800 relative"
        data-section="problem-highlight"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20"></div>
        <div className="container mx-auto relative z-10">
          <div className={`text-center slide-up-enter ${visibleSections.includes('problem-highlight') ? 'slide-up-visible' : ''}`}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 text-white">
                ⚠️ Il Rischio del sistema di <span className="text-red-200">Web Agency Tradizionale</span>
              </h2>
              <div className="bg-red-800/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-red-400/30">
                <p className="text-lg sm:text-xl text-red-100 leading-relaxed">
               Con il sistema delle <span className="text-yellow-300 font-bold"> Web Agency Tradizionali</span>,
investi <span className="text-red-200 font-semibold"> grossi capitali economici </span>  
senza alcuna <span className="text-white font-bold"> garanzia di guadagno</span>.<br /><br />  

In più, devi gestire <span className="text-yellow-300 font-bold"> logistica </span>,  
<span className="text-red-200 font-semibold"> clienti insoddisfatti </span>,  
<span className="text-yellow-300 font-bold"> resi </span>  
e i <span className="text-white font-bold"> problemi con le spedizioni </span>.<br /><br />  

Noi di <span className="text-white font-bold"> SafeScale </span>  
crediamo che questo <span className="text-red-200 font-semibold"> modello di business </span>  
non sia più <span className="text-yellow-300 font-bold"> sostenibile </span>.  


                </p>
               
              </div>
            </div>
          </div>
        </div>
      </section>

 {/* Comparison Section */}
      <section 
        className="py-16 px-4 sm:px-6 bg-gradient-to-br from-slate-950 via-gray-950 to-blue-950 relative"
        data-section="comparison"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 via-transparent to-green-900/5"></div>
        <div className="container mx-auto relative z-10">
          <div className={`text-center mb-12 slide-up-enter ${visibleSections.includes('comparison') ? 'slide-up-visible' : ''}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Perché scegliere <span className="text-blue-600">SafeScale</span>?
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Confronta il nostro approccio innovativo con quello <span className="text-red-400">tradizionale</span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Competitors Box */}
            <div 
              data-section="competitors-box"
              className={`bg-gradient-to-br from-red-900/20 via-gray-900/40 to-red-800/20 rounded-2xl p-8 border border-red-500/20 transform hover:scale-105 transition-all duration-300 slide-in-left ${visibleSections.includes('competitors-box') ? 'slide-in-visible' : ''}`} 
              style={{transitionDelay: '0.2s'}}>
              <div className="text-center mb-6">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-2xl overflow-hidden border-4 border-red-500/30">
                  <Image
                    src="/images/loro.png"
                    alt="Altre web agency"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-red-400 mb-2">Approccio Tradizionale</h3>
                <p className="text-red-300 italic">"Paghi in anticipo, 0 certezze, massimo rischio."</p>
              </div>
              
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-xl">❌</span>
                  <span>Pagamento anticipato di <strong>migliaia di euro</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-xl">❌</span>
                  <span>Nessuna garanzia sui <strong>risultati</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-xl">❌</span>
                  <span>Tu ti assumi <strong>tutti i rischi</strong> economici</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-xl">❌</span>
                  <span>Costi pubblicitari <strong>a tuo carico</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-xl">❌</span>
                  <span>Supporto limitato nel tempo</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-xl">❌</span>
                  <span>Focus solo su <strong>creazione siti</strong></span>
                </li>
              </ul>
            </div>
            
            {/* Our Box */}
            <div 
              data-section="databrand-box"
              className={`bg-gradient-to-br from-blue-900/20 via-green-900/20 to-blue-800/20 rounded-2xl p-8 border border-green-500/30 transform hover:scale-105 transition-all duration-300 slide-in-right md:slide-in-right slide-in-right-mobile-delay ${visibleSections.includes('databrand-box') ? 'slide-in-visible' : ''} relative overflow-hidden`}>
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-green-500/5 animate-pulse" style={{animationDuration: '3s'}}></div>
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="relative w-48 h-48 mx-auto mb-4 rounded-2xl overflow-hidden border-4 border-green-500/50 shadow-lg shadow-green-500/20">
                    <Image
                      src="/images/noi.png"
                      alt="SafeScale Agency"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-green-400 mb-2">SafeScale Agency</h3>
                  <p className="text-green-300 italic font-medium">"Il primo modello di business dove il rischio è nostro."</p>
                </div>
                
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span><strong>Zero costi iniziali</strong> - Noi investiamo per te</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span><strong>Spedizioni </strong>gestite da noi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span>Noi ci assumiamo <strong>tutti i rischi</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span>Budget pubblicitario <strong>coperto da noi</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span>Supporto <strong>continuo e dedicato</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span>Sistema completo di <strong>e-commerce</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className={`text-center mt-12 slide-up-enter slide-up-delay-3 ${visibleSections.includes('comparison') ? 'slide-up-visible' : ''}`}>
            <button 
              onClick={() => {
                setShowContactForm(true);
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
              className="bg-gradient-to-r from-green-500 to-blue-600 px-8 py-4 rounded-full font-semibold hover:from-green-600 hover:to-blue-700 transition-all text-lg transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
            >
              🚀 Scopri come funziona
            </button>
          </div>
        </div>
      </section>

      {/* 3 Step, 0 Rischi Section */}
      <section 
        className="py-16 px-0 bg-gradient-to-br from-gray-950 via-slate-950 to-gray-900 relative"
        data-section="three-steps"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/5 via-transparent to-blue-900/5"></div>
        <div className="w-full mx-auto relative z-10 px-6 lg:px-12">
          <div className={`text-center mb-16 slide-up-enter ${visibleSections.includes('three-steps') ? 'slide-up-visible' : ''}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              <span className="text-green-400">3 Step</span>, <span className="text-blue-400">0 Rischi</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Il nostro processo trasparente che <span className="text-green-400">elimina ogni rischio</span> per il tuo business
            </p>
          </div>
          
          {/* 3 Step Boxes */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-16 max-w-7xl mx-auto mb-12">
            {/* Step 1 */}
            <div className={`bg-gradient-to-br from-blue-900/20 via-gray-900/30 to-blue-800/20 rounded-2xl p-8 border border-blue-500/20 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer slide-up-enter slide-up-delay-1 ${visibleSections.includes('three-steps') ? 'slide-up-visible' : ''}`}>
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">1️⃣</div>
                <h3 className="text-xl font-bold text-blue-400 mb-4">Gestione ordini e spedizioni con contrassegno</h3>
                <p className="text-gray-300 leading-relaxed">
                  Riceviamo gli ordini, curiamo la logistica e incassiamo i pagamenti in contrassegno.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className={`bg-gradient-to-br from-green-900/20 via-gray-900/30 to-green-800/20 rounded-2xl p-8 border border-green-500/20 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 cursor-pointer slide-up-enter slide-up-delay-2 ${visibleSections.includes('three-steps') ? 'slide-up-visible' : ''}`}>
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">2️⃣</div>
                <h3 className="text-xl font-bold text-green-400 mb-4">Ripaghiamo le campagne pubblicitarie</h3>
                <p className="text-gray-300 leading-relaxed">
                  Dall'incasso copriamo subito i costi delle ads che abbiamo sostenuto.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className={`bg-gradient-to-br from-orange-900/20 via-gray-900/30 to-orange-800/20 rounded-2xl p-8 border border-orange-500/20 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer slide-up-enter slide-up-delay-3 ${visibleSections.includes('three-steps') ? 'slide-up-visible' : ''}`}>
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">3️⃣</div>
                <h3 className="text-xl font-bold text-orange-400 mb-4">Divisione dei profitti</h3>
                <p className="text-gray-300 leading-relaxed">
                  Il guadagno netto che rimane viene corrisposto al cliente, trattenendo solo la nostra percentuale concordata.
                </p>
              </div>
            </div>
          </div>
          
          {/* Perché Funziona Title */}
          <div className={`text-center mb-12 mt-16 slide-up-enter slide-up-delay-4 ${visibleSections.includes('three-steps') ? 'slide-up-visible' : ''}`}>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              Perché <span className="text-green-400">Funziona</span>
            </h3>
          </div>
          
          {/* Perché Funziona Boxes */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Scalabilità */}
            <div className={`text-center p-6 bg-blue-900/20 rounded-xl border border-blue-500/20 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 slide-up-enter slide-up-delay-5 ${visibleSections.includes('three-steps') ? 'slide-up-visible' : ''}`}>
              <div className="text-3xl mb-3">🚀</div>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-blue-400">Scalabilità immediata</strong> – più vendi, più investiamo.
              </p>
            </div>
            
            {/* Zero Rischio */}
            <div className={`text-center p-6 bg-green-900/20 rounded-xl border border-green-500/20 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 slide-up-enter slide-up-delay-6 ${visibleSections.includes('three-steps') ? 'slide-up-visible' : ''}`}>
              <div className="text-3xl mb-3">🛡️</div>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-green-400">Zero rischio</strong> – non metti budget pubblicitario.
              </p>
            </div>
            
            {/* Cashflow Sicuro */}
            <div className={`text-center p-6 bg-orange-900/20 rounded-xl border border-orange-500/20 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 slide-up-enter slide-up-delay-7 ${visibleSections.includes('three-steps') ? 'slide-up-visible' : ''}`}>
              <div className="text-3xl mb-3">💰</div>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-orange-400">Cashflow sicuro</strong> – ricevi i profitti netti già calcolati.
              </p>
            </div>
          </div>
        </div>
      </section>

     

      {/* Google Ads Section */}
      <section 
        id="servizi" 
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-r from-blue-900/10 via-transparent to-green-900/10 relative"
        data-section="google-ads"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/8 via-slate-950/5 to-gray-950/10 animate-pulse" style={{animationDuration: '6s'}}></div>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`space-y-6 lg:space-y-8 slide-up-enter slide-up-delay-1 ${visibleSections.includes('google-ads') ? 'slide-up-visible' : ''}`}>
              <div className="inline-block px-3 py-2 bg-gray-800 rounded-full text-xs sm:text-sm">
                Google Ads
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Strategie Pubblicitarie Su <span className="text-blue-600">Google Ads</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Gestiamo e investiamo nelle campagne <span style={{color: '#EE6622'}}>Google ADS</span> per aumentare in modo diretto le vendite dei tuoi prodotti.  <br />
Utilizziamo un sistema comprovato per individuare <span className="text-blue-600">keyword vincenti</span> e sviluppare <span style={{color: '#EE6622'}}>creatività</span> coinvolgenti, così da ottenere il massimo delle conversioni al minor costo possibile.  <br />
E se la campagna non raggiunge i risultati attesi, <span className="text-blue-600">copriamo noi le perdite</span>.  

              </p>
              <button 
                onClick={() => {
                  setShowContactForm(true);
                  if (typeof window !== 'undefined') {
                    setTimeout(() => {
                      const heroSection = document.querySelector('[data-section="hero"]');
                      if (heroSection) {
                        heroSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }, 100);
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-green-500 px-6 sm:px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-green-600 transition-all text-sm sm:text-base transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
              >
                ✉️ Contattaci
              </button>
            </div>
            
            <div className={`relative order-first lg:order-last transform hover:scale-105 transition-transform duration-300 slide-up-enter slide-up-delay-2 ${visibleSections.includes('google-ads') ? 'slide-up-visible' : ''}`}>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                {/* Mock Google Ads Interface */}
                <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded flex items-center justify-center text-xs sm:text-sm animate-pulse">G</div>
                  <span className="font-semibold text-sm sm:text-base">Google Ads Dashboard</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-green-500">378.416</div>
                    <div className="text-xs sm:text-sm text-gray-400">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold" style={{color: '#EE6622'}}>€11.456</div>
                    <div className="text-xs sm:text-sm text-gray-400">Spesa</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-green-500">€238.554</div>
                    <div className="text-xs sm:text-sm text-gray-400">Ricavi</div>
                  </div>
                </div>
                
                {/* Mock Chart */}
                <div className="bg-gray-800 p-3 sm:p-4 rounded-lg">
                  <div className="h-24 sm:h-32 flex items-end space-x-1">
                    {[40, 65, 45, 70, 55, 80, 60, 75, 85, 90, 70, 95].map((height, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-green-500 rounded-t transform hover:scale-110 transition-transform duration-300" style={{height: `${height}%`, animationDelay: `${i * 0.1}s`}}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Selection Section */}
      <section 
        className="py-12 px-4 sm:px-6 lg:px-12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)'
        }}
        data-section="brand-selection"
      >
        {/* Animated overlay for extra dynamism */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-red-600/20 animate-pulse" style={{animationDuration: '4s'}}></div>
        
        <div className="w-full max-w-[2000px] mx-auto relative z-10">
          <div className="text-center">
            <div className={`mb-6 slide-up-enter ${visibleSections.includes('brand-selection') ? 'slide-up-visible' : ''}`}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                Selezioniamo solo brand con <span className="text-yellow-200">potenziale</span>.
              </h2>
              <p className="text-lg sm:text-xl text-orange-100 max-w-4xl mx-auto leading-relaxed">
                Investiamo capitali importanti nei progetti in cui crediamo, indi per cui non lavoriamo con chiunque. 
                Se vuoi entrare a far parte del progetto <span className="font-bold text-white">SafeScale</span>, candidati ora.
              </p>
            </div>
            
            <div className={`slide-up-enter slide-up-delay-1 ${visibleSections.includes('brand-selection') ? 'slide-up-visible' : ''}`}>
              <button 
                onClick={() => {
                  setShowContactForm(true);
                  if (typeof window !== 'undefined') {
                    setTimeout(() => {
                      const heroSection = document.querySelector('[data-section="hero"]');
                      if (heroSection) {
                        heroSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }, 100);
                  }
                }}
                className="bg-gradient-to-r from-green-700 to-green-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg transform hover:scale-105 hover:from-green-800 hover:to-green-900 transition-all duration-300 hover:shadow-lg hover:shadow-green-700/40"
              >
                🚀 Candidati ora – Verifica se sei idoneo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Section - COMMENTED OUT 
      <section 
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-r from-slate-950/60 to-blue-950/40"
        data-section="seo"
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`relative order-2 lg:order-1 transform hover:scale-105 transition-transform duration-300 slide-up-enter slide-up-delay-1 ${visibleSections.includes('seo') ? 'slide-up-visible' : ''}`}>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
                <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 rounded flex items-center justify-center text-xs sm:text-sm animate-pulse" style={{animationDelay: '0.5s'}}>SEO</div>
                  <span className="font-semibold text-sm sm:text-base">SEO Analytics</span>
                </div>
                
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm sm:text-base">Organic Traffic</span>
                    <span className="text-green-500 font-bold text-sm sm:text-base">+1,847%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm sm:text-base">Keywords Ranking</span>
                    <span className="text-blue-600 font-bold text-sm sm:text-base">2,653</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm sm:text-base">Backlinks</span>
                    <span className="font-bold text-sm sm:text-base" style={{color: '#EE6622'}}>15,892</span>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-3 sm:p-4 rounded-lg">
                  <div className="text-center mb-2">
                    <span className="text-xl sm:text-2xl font-bold" style={{color: '#EE6622'}}>over 1000%</span>
                  </div>
                  <div className="text-center text-xs sm:text-sm text-gray-400">Traffic Growth</div>
                </div>
              </div>
              
              <div className="absolute -right-4 sm:-right-8 -bottom-4 sm:-bottom-8 w-20 h-36 sm:w-32 sm:h-56 bg-gray-800 rounded-xl sm:rounded-2xl p-1 sm:p-2 border-2 border-gray-600 transform hover:rotate-3 hover:scale-110 transition-all duration-300 hover:border-blue-500/50">
                <div className="bg-gradient-to-br from-slate-950 to-gray-950 rounded-lg sm:rounded-xl h-full p-1 sm:p-2 text-xs">
                  <div className="text-orange-400 font-bold mb-1 text-xs">SEO:</div>
                  <div className="text-white text-xs leading-tight">
                    Nessuno La Capisce Ma Tutti La Vogliono
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`space-y-6 lg:space-y-8 order-1 lg:order-2 slide-up-enter slide-up-delay-2 ${visibleSections.includes('seo') ? 'slide-up-visible' : ''}`}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Ottimizzazione SEO: <br/>
                <span style={{color: '#EE6622'}}>Tecnica</span>, <span className="text-blue-600">On-Page</span> E <span style={{color: '#EE6622'}}>Link Building</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Ottimizzazione del ranking con <span style={{color: '#EE6622'}}>SEO tecnica</span>, ottimizzazione del <span className="text-blue-600">codice HTML</span> e <span style={{color: '#EE6622'}}>link building</span>, aumentando visibilità e traffico organico.
              </p>
              <button 
                onClick={() => {
                  setShowContactForm(true);
                  if (typeof window !== 'undefined') {
                    setTimeout(() => {
                      const heroSection = document.querySelector('[data-section="hero"]');
                      if (heroSection) {
                        heroSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }, 100);
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-green-500 px-6 sm:px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-green-600 transition-all text-sm sm:text-base transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
              >
                ✉️ Contattaci
              </button>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Social Media Section - COMMENTED OUT 
      <section 
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-l from-green-900/10 via-transparent to-blue-900/10 relative"
        data-section="social"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-green-500/5 via-slate-950/3 to-blue-950/5 animate-pulse" style={{animationDuration: '5s'}}></div>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`space-y-6 lg:space-y-8 slide-up-enter slide-up-delay-1 ${visibleSections.includes('social') ? 'slide-up-visible' : ''}`}>
              <div className="inline-block px-3 py-2 bg-gray-800 rounded-full text-xs sm:text-sm">
                Social Media Management
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Gestione Strategica Dei <span className="text-blue-600">Social Media</span>
                <br />Su <span style={{color: '#EE6622'}}>Meta</span>, <span className="text-blue-600">TikTok</span> E <span style={{color: '#EE6622'}}>LinkedIn</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Sviluppo di strategie di <span className="text-blue-600">social media marketing</span> basate su <span style={{color: '#EE6622'}}>data analytics</span>, advertising mirato e <span className="text-blue-600">content curation</span> per ottimizzare l'engagement.
              </p>
              <button 
                onClick={() => {
                  setShowContactForm(true);
                  if (typeof window !== 'undefined') {
                    setTimeout(() => {
                      const heroSection = document.querySelector('[data-section="hero"]');
                      if (heroSection) {
                        heroSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }, 100);
                  }
                }}
                className="bg-gradient-to-r from-green-500 to-blue-600 px-6 sm:px-8 py-3 rounded-full font-semibold hover:from-green-600 hover:to-blue-700 transition-all text-sm sm:text-base transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
              >
                ✉️ Contattaci
              </button>
            </div>
            
            <div className={`relative order-first lg:order-last flex justify-center slide-up-enter slide-up-delay-2 ${visibleSections.includes('social') ? 'slide-up-visible' : ''}`}>
              <div className="w-48 h-80 sm:w-64 sm:h-[480px] bg-gray-800 rounded-[2rem] sm:rounded-[3rem] p-3 sm:p-4 border-4 border-gray-600 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:border-green-600/50">
                <div className="bg-gradient-to-br from-slate-950 to-gray-950 rounded-[1.5rem] sm:rounded-[2.5rem] h-full p-3 sm:p-4 overflow-hidden">
                  <div className="flex justify-between items-center text-xs mb-3 sm:mb-4">
                    <span>17:30</span>
                    <span>🔋 85%</span>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-xs">BA</div>
                      <div>
                        <div className="text-xs font-bold">SafeScale</div>
                        <div className="text-xs text-gray-400">12,344 followers</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-1 sm:gap-2 text-center">
                      <div>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600 rounded-full flex items-center justify-center mx-auto text-xs transform hover:scale-125 hover:rotate-12 transition-all duration-300">🎵</div>
                        <div className="text-xs mt-1">875</div>
                      </div>
                      <div>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-600 rounded-full flex items-center justify-center mx-auto text-xs transform hover:scale-125 hover:rotate-12 transition-all duration-300">❤️</div>
                        <div className="text-xs mt-1">2.1K</div>
                      </div>
                      <div>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-xs transform hover:scale-125 hover:rotate-12 transition-all duration-300">💬</div>
                        <div className="text-xs mt-1">156</div>
                      </div>
                      <div>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto text-xs transform hover:scale-125 hover:rotate-12 transition-all duration-300">📤</div>
                        <div className="text-xs mt-1">89</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-1 sm:gap-2 mt-3 sm:mt-4">
                      <div className="bg-gradient-to-br from-purple-600 to-pink-600 aspect-square rounded-lg"></div>
                      <div className="bg-gradient-to-br from-blue-600 to-purple-600 aspect-square rounded-lg"></div>
                      <div className="bg-gradient-to-br from-orange-600 to-red-600 aspect-square rounded-lg"></div>
                      <div className="bg-gradient-to-br from-green-600 to-blue-600 aspect-square rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* About Section */}
      <section 
        id="chi-siamo" 
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-r from-blue-950/30 to-slate-950/40"
        data-section="about"
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`space-y-6 lg:space-y-8 slide-up-enter slide-up-delay-1 ${visibleSections.includes('about') ? 'slide-up-visible' : ''}`}>
              <div className="inline-block px-3 py-2 bg-gray-800 rounded-full text-xs sm:text-sm">
                SafeScale
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-green-500">Risultati Concreti Verificabili</span> e <span className="text-blue-600">Massima Trasparenza</span>
              </h2>
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-300 leading-relaxed">
                <p>
                
  Sempre più <span className="text-blue-600"> aziende e imprenditori </span> stanno affidando il loro business al nuovo sistema <span className="text-white font-bold"> SafeScale </span>, per crescere senza rischi e con un modello sostenibile.  
</p>
<p>
  Le nostre <span style={{color: '#EE6622'}}> metodologie proprietarie </span> sono certificate e testate su migliaia di campagne pubblicitarie. Monitoriamo ogni KPI in tempo reale attraverso <span className="text-blue-600"> dashboard personalizzate </span> che garantiscono la massima trasparenza sui risultati ottenuti.  
</p>
<p className="hidden sm:block">
  <span className="text-green-400 font-semibold"> Trasparenza totale: </span> riceverai report dettagliati con metriche verificabili, analisi competitive e proiezioni di crescita basate su dati reali di mercato. <br />In più avrai libero accesso a vendite, spedizioni e guadagni in tempo reale.

 </p>
              </div>
              
              
              {/* Reviews */}
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const reviewsSection = document.querySelector('[data-section="reviews"]');
                    reviewsSection?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105 cursor-pointer group w-full text-left"
              >
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-green-500 rounded-full border-2 border-gray-800 animate-pulse transform group-hover:scale-110 transition-all duration-300" style={{animationDelay: '0s'}}></div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full border-2 border-gray-800 animate-pulse transform group-hover:scale-110 transition-all duration-300" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-800 animate-pulse transform group-hover:scale-110 transition-all duration-300" style={{background: 'linear-gradient(to right, #EE6622, #dc2626)', animationDelay: '1s'}}></div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full border-2 border-gray-800 animate-pulse transform group-hover:scale-110 transition-all duration-300" style={{animationDelay: '1.5s'}}></div>
                </div>
                <div>
                  <div className="font-bold text-sm sm:text-base group-hover:text-green-400 transition-colors">180+ recensioni</div>
                  <div className="flex space-x-1">
                    {[1,2,3,4,5].map((star) => (
                      <span key={star} className="text-yellow-400 text-sm">⭐</span>
                    ))}
                  </div>
                </div>
              </button>
              
              {/* CTA Button - Candidati */}
              <div className="pt-4">
                <button 
                  onClick={() => {
                    setShowContactForm(true);
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 100);
                  }}
                  className="bg-gradient-to-r from-green-500 to-blue-600 px-6 sm:px-8 py-3 rounded-full font-semibold hover:from-green-600 hover:to-blue-700 transition-all text-sm sm:text-base transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
                >
                  ✉️ Candidati
                </button>
              </div>
            </div>
            
            <div className={`grid grid-cols-2 gap-3 sm:gap-4 order-first lg:order-last group slide-up-enter slide-up-delay-2 ${visibleSections.includes('about') ? 'slide-up-visible' : ''}`}>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-6 aspect-square transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 relative overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/box1.png"
                    alt="Business Proof 1"
                    width={200}
                    height={200}
                    className="w-4/5 h-4/5 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    priority={true}
                    quality={100}
                    onClick={() => setSelectedImage('/images/box1.png')}
                  />
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-green-500 rounded-xl sm:rounded-2xl p-6 aspect-video transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-500 hover:shadow-lg hover:shadow-green-500/30 relative overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/box2.png"
                    alt="Business Proof 2"
                    width={220}
                    height={140}
                    className="w-4/5 h-4/5 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    priority={true}
                    quality={100}
                    onClick={() => setSelectedImage('/images/box2.png')}
                  />
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
                <div className="rounded-xl sm:rounded-2xl p-6 aspect-video transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-400 hover:shadow-lg relative overflow-hidden flex items-center justify-center" style={{background: 'linear-gradient(135deg, #EE6622, #dc2626)', boxShadow: 'hover:0 10px 20px rgba(238, 102, 34, 0.3)'}}>
                  <Image
                    src="/images/box3.png"
                    alt="Business Proof 3"
                    width={220}
                    height={140}
                    className="w-4/5 h-4/5 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    priority={true}
                    quality={100}
                    onClick={() => setSelectedImage('/images/box3.png')}
                  />
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-xl sm:rounded-2xl p-6 aspect-square transform group-hover:scale-105 group-hover:-rotate-2 transition-all duration-600 hover:shadow-lg hover:shadow-blue-500/30 relative overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/box4.png"
                    alt="Business Proof 4"
                    width={200}
                    height={200}
                    className="w-4/5 h-4/5 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    priority={true}
                    quality={100}
                    onClick={() => setSelectedImage('/images/box4.png')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section 
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-r from-blue-950/20 to-green-950/20"
        data-section="reviews"
      >
        <div className="container mx-auto">
          <div className={`text-center mb-8 lg:mb-12 slide-up-enter slide-up-delay-1 ${visibleSections.includes('reviews') ? 'slide-up-visible' : ''}`}>
            <div className="inline-block px-3 py-2 bg-gray-800 rounded-full text-xs sm:text-sm mb-4">
              Recensioni Clienti
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Cosa Dicono i Nostri <span className="text-green-500">Partner</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
              Testimonianze di imprenditori che hanno trasformato le loro idee in business di successo con noi
            </p>
          </div>
          
          {/* Reviews Carousel */}
          <div className={`slide-up-enter slide-up-delay-2 ${visibleSections.includes('reviews') ? 'slide-up-visible' : ''}`}>
            <div className="reviews-container">
              <div 
                className="reviews-track"
                style={{
                  transform: `translateX(-${currentReviewIndex * (isDesktop ? 100 / 3 : 100)}%)`,
                }}
              >
                {reviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 transform hover:scale-105 h-full">
                      <div className="flex items-center mb-4">
                        <div className="text-3xl mr-3">{review.avatar}</div>
                        <div>
                          <h4 className="font-semibold text-white">{review.name}</h4>
                          <p className="text-sm text-gray-400">{review.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-lg">⭐</span>
                        ))}
                      </div>
                      
                      <p className="text-gray-300 text-sm leading-relaxed">
                        "{review.text}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation arrows */}
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevReview}
                className="bg-gradient-to-r from-blue-600 to-green-500 p-3 rounded-full hover:from-blue-700 hover:to-green-600 transition-all transform hover:scale-110"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Desktop indicators */}
              <div className="hidden md:flex items-center space-x-2">
                {Array.from({ length: reviews.length - 2 }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentReviewIndex ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              
              {/* Mobile indicators */}
              <div className="md:hidden flex items-center space-x-2">
                {reviews.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentReviewIndex ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextReview}
                className="bg-gradient-to-r from-blue-600 to-green-500 p-3 rounded-full hover:from-blue-700 hover:to-green-600 transition-all transform hover:scale-110"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 bg-gradient-to-r from-slate-950 via-gray-950 to-slate-950 footer-geometric">
        {/* Geometric Elements */}
        <div className="geometric-triangles"></div>
        <div className="geometric-squares"></div>
        <div className="geometric-circles"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 md:col-span-1 space-y-3 sm:space-y-4">
              <div className="text-xl sm:text-2xl font-bold">
                <span style={{color: '#EE6622'}}>Data</span>
                <span className="text-blue-600">Brand</span>
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                La tua agenzia di marketing digitale a 360 gradi per crescere online.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Servizi</h4>
              <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                <li><Link href="#" className="hover:text-green-400 transition-colors">Google Ads</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">SEO</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Social Media</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Web Design</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Azienda</h4>
              <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                <li><Link href="#" className="hover:text-green-400 transition-colors">Chi Siamo</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Case Studies</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Carriere</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Contatti</h4>
              <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                <li>info@safescale.com</li>
                <li>+39 123 456 7890</li>
                <li>Milano, Italia</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="text-sm sm:text-base">&copy; 2025 SafeScale Agency. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Chiudi"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={selectedImage}
              alt="Business Proof - Fullscreen"
              width={800}
              height={800}
              className="max-w-full max-h-[90vh] object-contain"
              quality={100}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}