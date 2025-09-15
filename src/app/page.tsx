'use client';

import { BarChart2, CheckCircle, FileText, Gauge, Settings } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { 
  FaBolt,
  FaBriefcase,
  FaBullseye,
  FaChartBar,
  FaChartLine,
  FaCheckCircle,
  FaClipboardList,
  FaEnvelope,
  FaLightbulb,
  FaPalette,
  FaPhone,
  FaRocket,
  FaRunning,
  FaSearch,
  FaUserCheck,
  FaUserGraduate,
  FaUserTie
} from 'react-icons/fa';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import OldAgencyBrokenBox from '@/components/OldAgencyBrokenBox';

interface FeatureCard {
  icon: JSX.Element;
  title: string;
}
interface Testimonial {
  videoUrl: string;
  company: string;
  companyLogo?: string;
  quote: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    videoUrl: "https://www.youtube.com/embed/1MEp8dCrp1w", // Convert More Buyers...
    company: "DIGGS",
    quote: "ClickUp is serving us so we can serve our pet guardians.",
    author: "Samantha Dengate, Sr. Project Manager",
  },
  {
    videoUrl: "https://www.youtube.com/embed/0A7u3plO4io", // Canva Slider example
    company: "Finastra",
    quote: "It's a low-code platform that helps us automate processes.",
    author: "Joerg Klueckmann, VP of Marketing",
  },
  {
    videoUrl: "https://www.youtube.com/embed/tIteRLz7Iac", // Creative Ways display
    company: "Hawke Media",
    quote: "ClickUp is the best thing I've rolled out in the past two years.",
    author: "Lauren Makielski, Chief of Staff",
  },
];
// Custom hook for counting animation
const useCountUp = (end: number, duration = 2000, isVisible = false) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number | null = null;
    const startValue = 0;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation  
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (end - startValue) + startValue);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);
  
  return count;
};

type Item = {
  id: number;
  title: string;
  desc: string;
  image: string;
};

const ITEMS: Item[] = [
  {
    id: 0,
    title: 'Scalabilità immediata',
    desc: 'Più vendi, più investiamo. Più investiamo, più guadagniamo.',
    image: '/images/item1.png',
  },
  {
    id: 1,
    title: 'Zero rischio',
    desc: 'Non metti budget pubblicitario, ci assumiamo noi tutti i rischi.',
    image: '/images/item2.png',
  },
  {
    id: 2,
    title: 'Cashflow sicuro',
    desc: 'Conoscerai da subito i tuoi margini di guadagno e riceverai i profitti netti.',
    image: '/images/item3.png',
  },
];

export default function HomePage() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [_currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [_isTransitioning, _setIsTransitioning] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [_autoPlay, setAutoPlay] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [stepBoxProgress, setStepBoxProgress] = useState(0);
  const _features: FeatureCard[] = [
  { icon: <Settings className="w-5 h-5 text-gray-700" />, title: "Flexible workflows for every team" },
  { icon: <FileText className="w-5 h-5 text-gray-700" />, title: "Tasks, docs, spreadsheets, and more" },
  { icon: <Gauge className="w-5 h-5 text-gray-700" />, title: "Resource and workload optimization" },
  { icon: <BarChart2 className="w-5 h-5 text-gray-700" />, title: "Dashboards and insights" },
];
  
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const clearTimers = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  const _pauseAutoPlay = (ms?: number) => {
    setAutoPlay(false);
    clearTimers();
    if (typeof ms === 'number' && ms > 0) {
      resumeTimeoutRef.current = setTimeout(() => {
        setAutoPlay(true);
      }, ms);
    }
  };

  const [_autoPlayDelay, _setAutoPlayDelay] = useState(3500); // ms
  const [activeProjectTab, setActiveProjectTab] = useState('marketing');
  const [contentKey, setContentKey] = useState(0);
  const _carouselContainerRef = useRef<HTMLDivElement | null>(null);
  const [contactFormData, setContactFormData] = useState({
    nome: '',
    cognome: '',
    telefono: '',
    email: ''
  });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [incompleteConfirmed, setIncompleteConfirmed] = useState(false);
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    type?: 'error' | 'warning' | 'confirm';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'error'
  });
  const [questionnaireData, setQuestionnaireData] = useState({
    brandName: '',
    website: '',
    instagram: '',
    tiktok: '',
    facebook: '',
    otherSocial: '',
    sector: '',
    sectorOther: '',
    production: '',
    productionOther: '',
    bestSeller: '',
    margin: '',
    availability: '',
    availabilityOther: '',
    onlineSales: '',
    monthlyOrders: '',
    ticketMedio: '',
    marketingChannels: [] as string[],
    adInvestment: '',
    salesChannels: [] as string[],
    shipping: '',
    shippingOther: '',
    returns: '',
    countries: '',
    objective: '',
    objectiveOther: '',
    revenue: '',
    team: '',
    obstacles: ''
  });
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaQuestion, setCaptchaQuestion] = useState({ question: 'Caricamento...', answer: 0 });
  const [questionnaireSubmitted, setQuestionnaireSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [_activeStep, _setActiveStep] = useState(1);
  const [_activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [, setNeonTime] = useState(0);
  const [displayedTexts, setDisplayedTexts] = useState<string[]>(['', '', '']);
  const [currentPhase, setCurrentPhase] = useState<'typing' | 'deleting'>('typing');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [deleteCharIndex, setDeleteCharIndex] = useState(0);
  
  const fullTexts = useMemo(() => [
    'Noi Investiamo',
    'Tu Guadagni', 
    'Zero Rischi'
  ], []);
  
  const renderTextWithColors = (text: string) => {
    const parts = text.split(' ');
    if (parts.length >= 2) {
      const firstWord = parts[0]; // Noi, Tu, Zero
      const restWords = parts.slice(1).join(' '); // Investiamo, Guadagni, Rischi
      return (
        <>
          <span style={{color: '#0F172A'}}>{firstWord}</span>
          {restWords && (
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"> {restWords}</span>
          )}
        </>
      );
    }
    return <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">{text}</span>;
  };

  // Dati delle icone circolari - disposizione uniforme ogni 45°
  const _circularIcons = [
    { id: 'phone', icon: FaPhone, color: 'text-blue-600', tooltip: '+39 123 456 7890', angle: 0 },
    { id: 'chart', icon: FaChartBar, color: 'text-green-600', tooltip: 'Analytics & Reporting', angle: 45 },
    { id: 'search', icon: FaSearch, color: 'text-purple-600', tooltip: 'SEO Optimization', angle: 90 },
    { id: 'lightbulb', icon: FaLightbulb, color: 'text-yellow-600', tooltip: 'Strategic Consulting', angle: 135 },
    { id: 'palette', icon: FaPalette, color: 'text-pink-600', tooltip: 'Creative Design', angle: 180 },
    { id: 'bolt', icon: FaBolt, color: 'text-orange-600', tooltip: 'Fast Delivery', angle: 225 },
    { id: 'rocket', icon: FaRocket, color: 'text-red-600', tooltip: 'Business Growth', angle: 270 },
    { id: 'bullseye', icon: FaBullseye, color: 'text-indigo-600', tooltip: 'contatti@safescale.it', angle: 315 }
  ];

  // Project tabs data for interactive section
  const projectTabs = {
    marketing: {
      title: "Marketing Teams",
      subtitle: "Strategia e campagne su misura per il tuo brand",
      description: "Ottimizza le tue campagne marketing con strumenti avanzati di pianificazione e tracking.",
      features: [
        "Campaign planning e calendario editoriale",
        "Analytics in tempo reale per ROI tracking",
        "Automazione email e social media marketing",
        "A/B testing per ottimizzazione continua"
      ],
      testimonial: {
        name: "Marco Rossi",
        company: "Digital Marketing Manager",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        quote: "SafeScale ha trasformato il nostro approccio al marketing digitale, permettendoci di ottimizzare ogni campagna."
      },
      ctaText: "Scopri la soluzione Marketing"
    },
    ecommerce: {
      title: "E-commerce Solutions",
      subtitle: "Piattaforme complete per vendite online",
      description: "Gestisci il tuo negozio online con strumenti professionali per massimizzare le conversioni.",
      features: [
        "Gestione catalogo e inventory management",
        "Sistema pagamenti sicuri e multi-gateway",
        "Analytics vendite e comportamento clienti",
        "Integrazione con marketplace e social commerce"
      ],
      testimonial: {
        name: "Laura Bianchi",
        company: "E-commerce Manager",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        quote: "Con SafeScale abbiamo aumentato le conversioni del 300% e ottimizzato tutti i processi di vendita online."
      },
      ctaText: "Esplora l'E-commerce Suite"
    },
    seo: {
      title: "SEO & Analytics",
      subtitle: "Visibilità garantita sui motori di ricerca",
      description: "Domina i risultati di ricerca con strategie SEO data-driven e monitoraggio continuo.",
      features: [
        "Audit SEO completo e competitor analysis",
        "Ottimizzazione tecnica e contenuti",
        "Local SEO e Google My Business",
        "Reporting dettagliato e KPI tracking"
      ],
      testimonial: {
        name: "Giuseppe Verde",
        company: "SEO Specialist",
        avatar: "https://randomuser.me/api/portraits/men/28.jpg",
        quote: "Grazie a SafeScale siamo passati dalla seconda alla prima pagina Google per tutte le keyword principali."
      },
      ctaText: "Migliora il tuo SEO"
    },
    development: {
      title: "Web Development",
      subtitle: "Soluzioni tecniche su misura",
      description: "Sviluppiamo applicazioni web scalabili e performanti con tecnologie all'avanguardia.",
      features: [
        "Sviluppo custom con React, Next.js, Node.js",
        "API integration e microservizi",
        "Database design e ottimizzazione",
        "Deploy automatico e monitoring"
      ],
      testimonial: {
        name: "Alice Neri",
        company: "CTO",
        avatar: "https://randomuser.me/api/portraits/women/30.jpg",
        quote: "Il team SafeScale ha sviluppato la nostra piattaforma in tempi record mantenendo la massima qualità del codice."
      },
      ctaText: "Richiedi sviluppo custom"
    }
  };

  // Dati degli step
  const steps = [
    {
      id: 1,
      title: "Creazione E-commerce, gestione ordini e spedizioni",
      description: "Creaiamo il sito di vendita, riceviamo gli ordini, curiamo la logistica e incassiamo i pagamenti in contrassegno.",
      bgClass: "bg-gradient-to-b from-[#36a3e3] via-[#2871a8] to-[#154a85] border border-[#36a3e3]/50 text-white",
      borderClass: "border-[#36a3e3]/50",
      hoverClass: "hover:shadow-[#36a3e3]/30",
      iconBg: "bg-white text-[#36a3e3]",
      titleColor: "text-white",
      descriptionColor: "text-white/90"
    },
    {
      id: 2,
      title: "Ripaghiamo le campagne pubblicitarie",
      description: "Dall'incasso lordo copriamo i costi delle ads che abbiamo sostenuto e paghiamo le tasse.",
      bgClass: "bg-gradient-to-b from-[#4f10e8] via-[#3609a4] to-[#1f0672] border border-[#4f10e8]/50 text-white",
      borderClass: "border-[#4f10e8]/50",
      hoverClass: "hover:shadow-[#4f10e8]/30",
      iconBg: "bg-white text-[#4f10e8]",
      titleColor: "text-white",
      descriptionColor: "text-white/90"
    },
    {
      id: 3,
      title: "Dividiamo i guadagni e ricevi la tua parte",
      description: "Il guadagno netto che rimane viene corrisposto a te, trattenendo solo la nostra percentuale concordata.",
      bgClass: "bg-gradient-to-b from-[#f712c5] via-[#b80c90] to-[#750a5d] border border-[#f712c5]/50 text-white",
      borderClass: "border-[#f712c5]/50",
      hoverClass: "hover:shadow-[#f712c5]/30",
      iconBg: "bg-white text-[#f712c5]",
      titleColor: "text-white",
      descriptionColor: "text-white/90"
    }
  ];

  // Prevent hydration error by rendering only after mount
  const [isMounted, setIsMounted] = useState(false);
  const [userIP, setUserIP] = useState<string>('');
  
  useEffect(() => {
    setIsMounted(true);
    // Rileva IP dell'utente
    fetch('/api/get-ip')
      .then(res => res.json())
      .then(data => {
        setUserIP(data.ip);
        // IP rilevato per debug
      })
      .catch(() => {
        // Errore rilevamento IP
      });
  }, []);

  // Typewriter effect - prima scrive tutto, poi cancella tutto insieme
  useEffect(() => {
    if (!isMounted) return; // Wait for component to mount
    
    const typeSpeed = 80;
    const deleteSpeed = 30; // Velocità di cancellazione più naturale
    const pauseBetweenLines = 800;
    const pauseBeforeDelete = 2000; // Pausa più lunga prima di cancellare
    
    const animate = () => {
      if (currentPhase === 'typing') {
        const currentText = fullTexts[currentTextIndex];
        
        if (currentText && currentCharIndex < currentText.length) {
          // Continua a digitare la linea corrente
          setDisplayedTexts(prev => {
            const newTexts = [...prev];
            newTexts[currentTextIndex] = currentText.slice(0, currentCharIndex + 1);
            return newTexts;
          });
          setCurrentCharIndex(prev => prev + 1);
        } else if (currentText) {
          // Linea corrente completata
          if (currentTextIndex < fullTexts.length - 1) {
            // Passa alla prossima linea
            setTimeout(() => {
              setCurrentTextIndex(prev => prev + 1);
              setCurrentCharIndex(0);
            }, pauseBetweenLines);
          } else {
            // Tutte le linee completate, inizia a cancellare dopo una pausa
            setTimeout(() => {
              setCurrentPhase('deleting');
              const totalChars = fullTexts.reduce((sum, text) => sum + text.length, 0);
              setDeleteCharIndex(totalChars);
            }, pauseBeforeDelete);
          }
        }
      } else {
        // Fase di cancellazione - cancella dall'ultima riga alla prima
        if (deleteCharIndex > 0) {
          const newDeleteIndex = deleteCharIndex - 1;
          setDeleteCharIndex(prev => prev - 1);
          
          // Calcola quale testo mostrare - cancella dall'ultima riga
          const totalCharsToShow = newDeleteIndex;
          const newTexts = [...fullTexts];
          
          // Cancella caratteri partendo dall'ultima riga
          for (let i = fullTexts.length - 1; i >= 0; i--) {
            const textLength = fullTexts[i].length;
            const charsBeforeThisLine = fullTexts.slice(0, i).reduce((sum, text) => sum + text.length, 0);
            
            if (totalCharsToShow <= charsBeforeThisLine) {
              // Questa riga deve essere completamente vuota
              newTexts[i] = '';
            } else if (totalCharsToShow < charsBeforeThisLine + textLength) {
              // Questa riga deve essere parzialmente mostrata
              newTexts[i] = fullTexts[i].slice(0, totalCharsToShow - charsBeforeThisLine);
            }
            // altrimenti la riga rimane completa
          }
          
          setDisplayedTexts(newTexts);
        } else {
          // Tutto cancellato, ricomincia
          setTimeout(() => {
            setCurrentPhase('typing');
            setCurrentTextIndex(0);
            setCurrentCharIndex(0);
            setDisplayedTexts(['', '', '']);
          }, pauseBetweenLines);
        }
      }
    };

    const timer = setTimeout(animate, currentPhase === 'typing' ? typeSpeed : deleteSpeed);
    return () => clearTimeout(timer);
  }, [isMounted, currentPhase, currentTextIndex, currentCharIndex, deleteCharIndex, fullTexts]);

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

  // Handle opening contact form from header or URL parameter
  useEffect(() => {
    // Check for URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('openForm') === 'true') {
      setTimeout(() => {
        scrollToContactForm();
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 500);
    }

    // Listen for custom event from header
    const handleOpenContactForm = () => {
      scrollToContactForm();
    };

    window.addEventListener('openContactForm', handleOpenContactForm);

    return () => {
      window.removeEventListener('openContactForm', handleOpenContactForm);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return;
    
    // Observer standard per le sezioni normali
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId && entry.isIntersecting) {
            // Skip google-ads section (handled by special observer)
            if (sectionId === 'google-ads') return;
            
            // Add delay for comparison-right on mobile
            if (sectionId === 'comparison-right' && window.innerWidth < 768) {
              setTimeout(() => {
                setVisibleSections(prev => 
                  prev.includes(sectionId) ? prev : [...prev, sectionId]
                );
              }, 600); // Delay for mobile
            } else {
              setVisibleSections(prev => 
                prev.includes(sectionId) ? prev : [...prev, sectionId]
              );
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observer semplificato per sezioni con animazione dropdown
    const dropdownObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('data-section');
          if (!sectionId) return;
          
          // Solo quando entra in vista e non è già visibile
          if (entry.isIntersecting && !visibleSections.includes(sectionId)) {
            // Piccolo delay per smooth entry
            setTimeout(() => {
              setVisibleSections(prev => 
                prev.includes(sectionId) ? prev : [...prev, sectionId]
              );
            }, 100);
          }
          // Non fare nulla quando esce dalla vista - rimane aperto
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '0px'
      }
    );

    // Osserva tutte le sezioni normali (non dropdown)
    const normalSections = document.querySelectorAll('[data-section]:not([data-section="google-ads"]):not([data-section="meta-ads"]):not([data-section="tiktok-ads"])');
    normalSections.forEach((section) => observer.observe(section));
    
    // Osserva le sezioni con animazione dropdown
    const dropdownSections = document.querySelectorAll('[data-section="google-ads"], [data-section="meta-ads"], [data-section="tiktok-ads"]');
    dropdownSections.forEach((section) => {
      dropdownObserver.observe(section);
    });

    return () => {
      observer.disconnect();
      dropdownObserver.disconnect();
    };
  }, [isMounted, visibleSections]);

  // Close tooltip when clicking outside on mobile
  useEffect(() => {
    if (!isMounted || isDesktop) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.circular-icon')) {
        setActiveTooltip(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMounted, isDesktop]);

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

  // Progressive scroll animation for three-steps section
  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return;
    
    const handleScroll = () => {
      const threeStepsSection = document.querySelector('[data-section="three-steps"]');
      if (!threeStepsSection) return;
      
      const rect = threeStepsSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress: animation starts when section enters viewport
      const sectionTop = rect.top;
      const _sectionHeight = rect.height;
      
      if (sectionTop <= windowHeight && rect.bottom >= 0) {
        // Animation starts when section enters viewport
        const startPoint = windowHeight * 0.8; // Start when 80% down viewport
        const endPoint = windowHeight * 0.2; // End when 20% down viewport
        
        const rawProgress = (startPoint - sectionTop) / (startPoint - endPoint);
        const progress = Math.max(0, Math.min(1, rawProgress));
        
        setStepBoxProgress(progress);
      } else if (sectionTop > windowHeight) {
        setStepBoxProgress(0);
      } else {
        // Keep boxes fully visible when scrolled past
        setStepBoxProgress(1);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  // Reviews data
  const reviews = [
    {
      id: 1,
      name: "Marco Rossi",
      role: "CEO, TechStart",
      rating: 5,
      text: "Grazie a SafeScale abbiamo triplicato il nostro fatturato in soli 6 mesi. Il loro approccio strategico e l'investimento iniziale ci hanno permesso di crescere senza rischi.",
      avatar: <FaUserTie className="text-2xl text-blue-600" />
    },
    {
      id: 2,
      name: "Sara Bianchi",
      role: "Founder, FashionHub",
      rating: 5,
      text: "Incredibile! Hanno gestito tutto: dall'e-commerce al marketing. Io mi sono concentrata solo sul prodotto mentre loro facevano crescere le vendite ogni giorno.",
      avatar: <FaUserGraduate className="text-2xl text-purple-600" />
    },
    {
      id: 3,
      name: "Luca Ferrari",
      role: "Imprenditore",
      rating: 5,
      text: "Non credevo fosse possibile: hanno investito nel mio progetto e gestito tutti i rischi. Ora il mio business genera €50k al mese e continua a crescere.",
      avatar: <FaRocket className="text-2xl text-green-600" />
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
      avatar: <FaRunning className="text-2xl text-orange-600" />
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
      avatar: <FaBriefcase className="text-2xl text-gray-600" />
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
      avatar: <FaUserCheck className="text-2xl text-teal-600" />
    }
  ];


  const _nextReview = () => {
    setCurrentReviewIndex((prev) => {
      const maxIndex = isDesktop ? reviews.length - 3 : reviews.length - 1;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const _prevReview = () => {
    setCurrentReviewIndex((prev) => {
      const maxIndex = isDesktop ? reviews.length - 3 : reviews.length - 1;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  // Generate captcha question
  const generateCaptcha = () => {
    if (typeof window === 'undefined') return;
    
    const num1 = Math.floor(Math.random() * 9) + 1; // Single digit 1-9
    const num2 = Math.floor(Math.random() * 9) + 1; // Single digit 1-9
    const operation = { op: '+', calc: (a: number, b: number) => a + b };
    
    const question = `${num1} ${operation.op} ${num2} = ?`;
    const answer = operation.calc(num1, num2);
    
    setCaptchaQuestion({ question, answer });
  };

  // Helper function to scroll to contact form and open it
  const scrollToContactForm = () => {
    setShowContactForm(true);
    
    // Immediate scroll to hero section
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // After scrolling to hero, focus on the contact form
      setTimeout(() => {
        const mobileContactCircle = document.getElementById('contact-circle-mobile');
        const desktopContactCircle = document.getElementById('contact-circle');
        
        const contactCircle = mobileContactCircle || desktopContactCircle;
        
        if (contactCircle) {
          // Scroll more precisely to center the form
          const rect = contactCircle.getBoundingClientRect();
          const absoluteTop = rect.top + window.pageYOffset;
          const centerOffset = window.innerHeight / 2 - rect.height / 2;
          
          window.scrollTo({
            top: absoluteTop - centerOffset,
            behavior: 'smooth'
          });
        }
      }, 800); // Give time for the first scroll to complete
    }
  };

  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica che la privacy sia stata accettata
    if (!privacyAccepted) {
      setModalData({
        isOpen: true,
        title: 'Privacy Policy',
        message: 'Devi accettare l\'informativa sulla privacy per procedere.',
        type: 'error',
        confirmText: 'OK',
        onConfirm: () => setModalData(prev => ({ ...prev, isOpen: false }))
      });
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    setContactFormData({
      nome: formData.get('nome') as string,
      cognome: formData.get('cognome') as string,
      telefono: formData.get('telefono') as string,
      email: formData.get('email') as string
    });
    generateCaptcha();
    setShowQuestionnaire(true);
    setPrivacyAccepted(false); // Reset for next time
  };

  // Check if questionnaire is complete (excluding required fields)
  const isQuestionnaireComplete = () => {
    // Check all optional fields in section 2 (I tuoi prodotti)
    const section2Complete = questionnaireData.production &&
                           questionnaireData.bestSeller &&
                           questionnaireData.margin &&
                           questionnaireData.availability;

    // Check all optional fields in section 3 (La tua situazione)
    const section3Complete = questionnaireData.onlineSales &&
                           questionnaireData.monthlyOrders &&
                           questionnaireData.ticketMedio &&
                           questionnaireData.marketingChannels.length > 0 &&
                           questionnaireData.adInvestment &&
                           questionnaireData.salesChannels.length > 0;

    // Check all optional fields in section 4 (I tuoi obiettivi)
    const section4Complete = questionnaireData.shipping &&
                           questionnaireData.returns &&
                           questionnaireData.countries &&
                           questionnaireData.objective &&
                           questionnaireData.revenue &&
                           questionnaireData.team &&
                           questionnaireData.obstacles;

    return section2Complete && section3Complete && section4Complete;
  };

  // Handle questionnaire form submission
  const handleQuestionnaireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (parseInt(captchaAnswer) !== captchaQuestion.answer) {
      setModalData({
        isOpen: true,
        title: 'Verifica Captcha',
        message: 'La risposta al captcha non è corretta. Per favore riprova.',
        type: 'error',
        confirmText: 'OK',
        onConfirm: () => setModalData(prev => ({ ...prev, isOpen: false }))
      });
      return;
    }

    // Check if questionnaire is incomplete and user hasn't confirmed
    if (!isQuestionnaireComplete() && !incompleteConfirmed) {
      setModalData({
        isOpen: true,
        title: 'Questionario Incompleto',
        message: 'Il questionario non è stato compilato completamente. Fornire informazioni dettagliate ci aiuta a valutare meglio il tuo progetto. Desideri procedere comunque con l\'invio?',
        type: 'confirm',
        confirmText: 'Procedi',
        cancelText: 'Completa il questionario',
        onConfirm: () => {
          setModalData(prev => ({ ...prev, isOpen: false }));
          setIncompleteConfirmed(true);
          // Re-submit the form programmatically
          const form = e.target as HTMLFormElement;
          setTimeout(() => form.requestSubmit(), 100);
        },
        onCancel: () => setModalData(prev => ({ ...prev, isOpen: false }))
      });
      return;
    }
    
    // Controllo duplicati lato client con localStorage
    const submissionKey = `safescale_submission_${contactFormData.email.toLowerCase()}`;
    const existingSubmission = localStorage.getItem(submissionKey);
    
    if (existingSubmission) {
      const submissionData = JSON.parse(existingSubmission);
      const submissionDate = new Date(submissionData.timestamp);
      const hoursSinceSubmission = (Date.now() - submissionDate.getTime()) / (1000 * 60 * 60);
      
      // Blocca se l'invio è stato fatto nelle ultime 24 ore
      if (hoursSinceSubmission < 24) {
        setModalData({
          isOpen: true,
          title: 'Candidatura già inviata',
          message: 'Hai già inviato una candidatura con questa email nelle ultime 24 ore. Per favore riprova più tardi.',
          type: 'warning',
          confirmText: 'OK',
          onConfirm: () => setModalData(prev => ({ ...prev, isOpen: false }))
        });
        return;
      }
    }
    
    // Aggiungi un token univoco per questa sessione
    const sessionToken = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      // Invia i dati via email con session token
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactData: contactFormData,
          questionnaireData: questionnaireData,
          sessionToken: sessionToken,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Salva in localStorage per prevenire duplicati
        localStorage.setItem(submissionKey, JSON.stringify({
          email: contactFormData.email,
          timestamp: new Date().toISOString(),
          sessionToken: sessionToken
        }));
        
        // Show thank you message if email sent successfully
        setQuestionnaireSubmitted(true);
        setIncompleteConfirmed(false); // Reset for next time
      } else {
        // Se il server dice che è un duplicato, salva anche in localStorage
        if (result.message && result.message.includes('già inviato')) {
          localStorage.setItem(submissionKey, JSON.stringify({
            email: contactFormData.email,
            timestamp: new Date().toISOString(),
            sessionToken: sessionToken
          }));
        }
        setModalData({
          isOpen: true,
          title: 'Errore',
          message: result.message || 'Errore nell\'invio della candidatura. Riprova più tardi.',
          type: 'error',
          confirmText: 'OK',
          onConfirm: () => setModalData(prev => ({ ...prev, isOpen: false }))
        });
      }
    } catch (error) {
      // Errore invio candidatura
      setModalData({
        isOpen: true,
        title: 'Errore di Connessione',
        message: 'Errore nell\'invio della candidatura. Per favore riprova più tardi.',
        type: 'error',
        confirmText: 'OK',
        onConfirm: () => setModalData(prev => ({ ...prev, isOpen: false }))
      });
    }
  };


  // Funzione per inviare questionario incompleto
  const sendIncompleteQuestionnaire = useCallback(async () => {
    // Non inviare se non ci sono dati del contatto
    if (!contactFormData.email || !contactFormData.nome) {
      return;
    }
    
    // Controlla se già inviato in questa sessione
    const incompleteKey = `safescale_incomplete_${contactFormData.email.toLowerCase()}`;
    if (sessionStorage.getItem(incompleteKey)) {
      return; // Già inviato in questa sessione
    }
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactData: contactFormData,
          questionnaireData: questionnaireData,
          isIncomplete: true,
        }),
      });

      const result = await response.json();
      
      // Il controllo IP è ora gestito lato server
      if (result.success) {
        // Questionario incompleto inviato con successo
        // Salva in sessionStorage per evitare invii multipli nella stessa sessione
        sessionStorage.setItem(incompleteKey, 'sent');
      } else {
        // Questionario incompleto già inviato da questo IP o errore
      }
    } catch (error) {
      // Errore invio questionario incompleto
    }
  }, [contactFormData, questionnaireData]);

  // Funzione sincrona per invio immediato con sendBeacon
  const sendIncompleteQuestionnaireSync = useCallback(() => {
    // Non inviare se non ci sono dati del contatto
    if (!contactFormData.email || !contactFormData.nome) {
      return;
    }
    
    
    const data = JSON.stringify({
      contactData: contactFormData,
      questionnaireData: questionnaireData,
      isIncomplete: true,
    });
    
    // Prova prima, sendBeacon (più affidabile)
    if (navigator.sendBeacon) {
      const blob = new Blob([data], { type: 'application/json' });
      const sent = navigator.sendBeacon('/api/send-email', blob);
      
      if (!sent) {
        // Se sendBeacon fallisce, prova con fetch sincrono
        try {
          fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data,
            keepalive: true // Importante per richieste durante unload 55
          });
        } catch (e) {
          // Fetch fallito
        }
      }
    } else {
      // Fallback per browser senza sendBeacon
      try {
        fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: data,
          keepalive: true
        });
      } catch (e) {
        // Fetch fallito
      }
    }
  }, [contactFormData, questionnaireData]);

  // Generate initial captcha on component mount (client-side only)
  useEffect(() => {
    if (isMounted) {
      generateCaptcha();
    }
  }, [isMounted]);

  // Handle page unload and visibility change to send incomplete questionnaire
  useEffect(() => {
    if (!isMounted) return;

    const handleBeforeUnload = () => {
      if (showQuestionnaire && contactFormData.email && contactFormData.nome) {
        // Usa sendBeacon per beforeunload perché è sincrono
        sendIncompleteQuestionnaireSync();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && showQuestionnaire && contactFormData.email && contactFormData.nome) {
        // Per visibilitychange possiamo usare la versione asincrona
        sendIncompleteQuestionnaire();
      }
    };
    
    // Evento specifico per mobile quando l'utente cambia app
    const handlePageHide = () => {
      if (showQuestionnaire && contactFormData.email && contactFormData.nome) {
        sendIncompleteQuestionnaireSync();
      }
    };
    
    // Evento quando l'utente tocca il pulsante back su mobile
    const handlePopState = () => {
      if (showQuestionnaire && contactFormData.email && contactFormData.nome) {
        sendIncompleteQuestionnaire();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide); // Importante per iOS
    window.addEventListener('popstate', handlePopState); // Per navigazione back
    
    // Per mobile Safari
    window.addEventListener('unload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('unload', handleBeforeUnload);
    };
  }, [isMounted, showQuestionnaire, questionnaireData, contactFormData, sendIncompleteQuestionnaire, sendIncompleteQuestionnaireSync]);


  // Animate neon effect continuously  
  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return;
    
    // Update every 16ms for ~60fps smooth animation
    const intervalId = setInterval(() => {
      setNeonTime(Date.now());
    }, 16);
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isMounted]);

  // Calculate rotating neon glow effect

  const [active, setActive] = useState<number>(0);
  const [_expandedMobileItem, _setExpandedMobileItem] = useState<number | null>(null);
  const [_playingVideos, _setPlayingVideos] = useState<{[key: number]: boolean}>({});
  const videoRefs = useRef<{[key: number]: HTMLVideoElement | null}>({});

  // --- Banner CTA (prima del return) ---
  const _ctaHref = '#contact-form'; // cambia con l'anchor o il link che vuoi

  return (
    <div className="min-h-screen bg-white text-custom-dark overflow-x-hidden">
      {/* IP Indicator - Solo per sviluppo locale */}
      {userIP && (process.env.NODE_ENV === 'development' || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))) && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg z-[100] text-xs font-mono">
          <div className="mb-1">🔍 Il tuo IP: <span className="text-yellow-400">{userIP}</span></div>
          <div className="text-gray-400">Comunica questo IP per test illimitati</div>
        </div>
      )}
      
      <Header />

      {/* Hero Section */}
      <section 
        id="hero-section"
        data-section="hero" 
        className="pt-24 sm:pt-20 pb-8 lg:px-12 min-h-screen flex items-center relative overflow-hidden bg-white"
      >
        <div className="w-full max-w-7xl lg:max-w-[1600px] mx-auto relative z-10 px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 order-1 lg:order-1 lg:col-span-2">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full text-xs sm:text-sm font-medium gradient-text-brand mt-4 sm:mt-0">
                🚀 Investiamo sul tuo progetto
              </div>
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-none sm:leading-tight h-32 sm:h-40 md:h-48 lg:h-56 mb-8" style={{color: '#1c1a31', lineHeight: 'calc(1.1em + 1px)'}}>
                <div className="space-y-2">
                  {displayedTexts.map((text, index) => (
                    <div key={index} className="min-h-[1.2em]">
                      <span className="font-bold">
                        {renderTextWithColors(text)}
                      </span>
                      {currentPhase === 'typing' && currentTextIndex === index && (
                        <span className="animate-pulse text-blue-600 ml-1">|</span>
                      )}
                      {currentPhase === 'deleting' && index === displayedTexts.findIndex((t, i) => i === displayedTexts.length - 1 && t.length > 0) && (
                        <span className="animate-pulse text-blue-600 ml-1">|</span>
                      )}
                    </div>
                  ))}
                </div>
              </h1>
              
              {/* Mobile Icons - shown only on mobile between title and paragraph */}
              <div className="block lg:hidden">
                <div id="contact-circle-mobile" className="relative flex justify-center items-center mb-4 -mt-4 mx-auto" style={{minHeight: showContactForm ? 'auto' : '400px'}}>
                  <div className={`relative w-full max-w-sm sm:max-w-md ${showContactForm ? '' : 'aspect-square'} flex items-center justify-center mx-auto`}>
                    {!showContactForm ? (
                  <>
                    {/* Step-by-Step Circular Rotation Icons Animation */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <style jsx>{`
                        @keyframes expandCard {
                          0% {
                            transform: scale(0.5);
                            opacity: 0;
                          }
                          60% {
                            transform: scale(1.05);
                            opacity: 1;
                          }
                          100% {
                            transform: scale(1);
                            opacity: 1;
                          }
                        }

                        @keyframes gradientShift {
                          0% {
                            background-position: 0% 50%;
                          }
                          50% {
                            background-position: 100% 50%;
                          }
                          100% {
                            background-position: 0% 50%;
                          }
                        }

                        @keyframes pulseSubtle {
                          0%, 100% {
                            transform: scale(1);
                          }
                          50% {
                            transform: scale(1.08);
                          }
                        }
                        
                        /* Mobile distance */
                        @media (max-width: 640px) {
                          @keyframes stepCircular1 {
                            0%, 10% {
                              transform: translate(-50%, -50%) rotate(0deg) translateX(90px) rotate(0deg) scale(1.5);
                              z-index: 3;
                            }
                            15%, 25% {
                              transform: translate(-50%, -50%) rotate(120deg) translateX(90px) rotate(-120deg) scale(0.8);
                              z-index: 1;
                            }
                            30%, 43.33% {
                              transform: translate(-50%, -50%) rotate(120deg) translateX(90px) rotate(-120deg) scale(0.8);
                              z-index: 1;
                            }
                            48.33%, 58.33% {
                              transform: translate(-50%, -50%) rotate(240deg) translateX(90px) rotate(-240deg) scale(0.8);
                              z-index: 1;
                            }
                            63.33%, 76.66% {
                              transform: translate(-50%, -50%) rotate(240deg) translateX(90px) rotate(-240deg) scale(0.8);
                              z-index: 1;
                            }
                            81.66%, 91.66% {
                              transform: translate(-50%, -50%) rotate(360deg) translateX(90px) rotate(-360deg) scale(1.5);
                              z-index: 3;
                            }
                            96.66%, 100% {
                              transform: translate(-50%, -50%) rotate(360deg) translateX(90px) rotate(-360deg) scale(1.5);
                              z-index: 3;
                            }
                          }
                          
                          @keyframes stepCircular2 {
                            0%, 10% {
                              transform: translate(-50%, -50%) rotate(120deg) translateX(90px) rotate(-120deg) scale(0.8);
                              z-index: 1;
                            }
                            15%, 25% {
                              transform: translate(-50%, -50%) rotate(240deg) translateX(90px) rotate(-240deg) scale(0.8);
                              z-index: 1;
                            }
                            30%, 43.33% {
                              transform: translate(-50%, -50%) rotate(240deg) translateX(90px) rotate(-240deg) scale(0.8);
                              z-index: 1;
                            }
                            48.33%, 58.33% {
                              transform: translate(-50%, -50%) rotate(360deg) translateX(90px) rotate(-360deg) scale(1.5);
                              z-index: 3;
                            }
                            63.33%, 76.66% {
                              transform: translate(-50%, -50%) rotate(360deg) translateX(90px) rotate(-360deg) scale(1.5);
                              z-index: 3;
                            }
                            81.66%, 91.66% {
                              transform: translate(-50%, -50%) rotate(480deg) translateX(90px) rotate(-480deg) scale(0.8);
                              z-index: 1;
                            }
                            96.66%, 100% {
                              transform: translate(-50%, -50%) rotate(480deg) translateX(90px) rotate(-480deg) scale(0.8);
                              z-index: 1;
                            }
                          }
                          
                          @keyframes stepCircular3 {
                            0%, 10% {
                              transform: translate(-50%, -50%) rotate(240deg) translateX(90px) rotate(-240deg) scale(0.8);
                              z-index: 1;
                            }
                            15%, 25% {
                              transform: translate(-50%, -50%) rotate(360deg) translateX(90px) rotate(-360deg) scale(1.5);
                              z-index: 3;
                            }
                            30%, 43.33% {
                              transform: translate(-50%, -50%) rotate(360deg) translateX(90px) rotate(-360deg) scale(1.5);
                              z-index: 3;
                            }
                            48.33%, 58.33% {
                              transform: translate(-50%, -50%) rotate(480deg) translateX(90px) rotate(-480deg) scale(0.8);
                              z-index: 1;
                            }
                            63.33%, 76.66% {
                              transform: translate(-50%, -50%) rotate(480deg) translateX(90px) rotate(-480deg) scale(0.8);
                              z-index: 1;
                            }
                            81.66%, 91.66% {
                              transform: translate(-50%, -50%) rotate(600deg) translateX(90px) rotate(-600deg) scale(0.8);
                              z-index: 1;
                            }
                            96.66%, 100% {
                              transform: translate(-50%, -50%) rotate(600deg) translateX(90px) rotate(-600deg) scale(0.8);
                              z-index: 1;
                            }
                          }
                        }
                        
                        /* Desktop distance */
                        @media (min-width: 641px) {
                          @keyframes stepCircular1 {
                          0%, 10% {
                            transform: translate(-50%, -50%) rotate(0deg) translateX(140px) rotate(0deg) scale(1.5);
                            z-index: 3;
                          }
                          15%, 25% {
                            transform: translate(-50%, -50%) rotate(120deg) translateX(140px) rotate(-120deg) scale(0.8);
                            z-index: 1;
                          }
                          30%, 43.33% {
                            transform: translate(-50%, -50%) rotate(120deg) translateX(140px) rotate(-120deg) scale(0.8);
                            z-index: 1;
                          }
                          48.33%, 58.33% {
                            transform: translate(-50%, -50%) rotate(240deg) translateX(140px) rotate(-240deg) scale(0.8);
                            z-index: 1;
                          }
                          63.33%, 76.66% {
                            transform: translate(-50%, -50%) rotate(240deg) translateX(140px) rotate(-240deg) scale(0.8);
                            z-index: 1;
                          }
                          81.66%, 91.66% {
                            transform: translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg) scale(1.5);
                            z-index: 3;
                          }
                          96.66%, 100% {
                            transform: translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg) scale(1.5);
                            z-index: 3;
                          }
                        }
                        
                        @keyframes stepCircular2 {
                          0%, 10% {
                            transform: translate(-50%, -50%) rotate(120deg) translateX(140px) rotate(-120deg) scale(0.8);
                            z-index: 1;
                          }
                          15%, 25% {
                            transform: translate(-50%, -50%) rotate(240deg) translateX(140px) rotate(-240deg) scale(0.8);
                            z-index: 1;
                          }
                          30%, 43.33% {
                            transform: translate(-50%, -50%) rotate(240deg) translateX(140px) rotate(-240deg) scale(0.8);
                            z-index: 1;
                          }
                          48.33%, 58.33% {
                            transform: translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg) scale(1.5);
                            z-index: 3;
                          }
                          63.33%, 76.66% {
                            transform: translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg) scale(1.5);
                            z-index: 3;
                          }
                          81.66%, 91.66% {
                            transform: translate(-50%, -50%) rotate(480deg) translateX(140px) rotate(-480deg) scale(0.8);
                            z-index: 1;
                          }
                          96.66%, 100% {
                            transform: translate(-50%, -50%) rotate(480deg) translateX(140px) rotate(-480deg) scale(0.8);
                            z-index: 1;
                          }
                        }
                        
                        @keyframes stepCircular3 {
                          0%, 10% {
                            transform: translate(-50%, -50%) rotate(240deg) translateX(140px) rotate(-240deg) scale(0.8);
                            z-index: 1;
                          }
                          15%, 25% {
                            transform: translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg) scale(1.5);
                            z-index: 3;
                          }
                          30%, 43.33% {
                            transform: translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg) scale(1.5);
                            z-index: 3;
                          }
                          48.33%, 58.33% {
                            transform: translate(-50%, -50%) rotate(480deg) translateX(140px) rotate(-480deg) scale(0.8);
                            z-index: 1;
                          }
                          63.33%, 76.66% {
                            transform: translate(-50%, -50%) rotate(480deg) translateX(140px) rotate(-480deg) scale(0.8);
                            z-index: 1;
                          }
                          81.66%, 91.66% {
                            transform: translate(-50%, -50%) rotate(600deg) translateX(140px) rotate(-600deg) scale(0.8);
                            z-index: 1;
                          }
                          96.66%, 100% {
                            transform: translate(-50%, -50%) rotate(600deg) translateX(140px) rotate(-600deg) scale(0.8);
                            z-index: 1;
                          }
                        }
                        }
                        
                        @media (max-width: 640px) {
                          .icon-1 {
                            animation: stepCircular1 9s ease-in-out infinite;
                          }
                          
                          .icon-2 {
                            animation: stepCircular2 9s ease-in-out infinite;
                          }
                          
                          .icon-3 {
                            animation: stepCircular3 9s ease-in-out infinite;
                          }
                        }
                        
                        @media (min-width: 641px) {
                          .icon-1 {
                            animation: stepCircular1 9s ease-in-out infinite;
                          }
                          
                          .icon-2 {
                            animation: stepCircular2 9s ease-in-out infinite;
                          }
                          
                          .icon-3 {
                            animation: stepCircular3 9s ease-in-out infinite;
                          }
                        }
                      `}</style>
                      
                      {/* Icons Container */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        {(() => {
                          const icons = [
                            { 
                              Icon: FaRocket, 
                              label: 'Crescita',
                              gradient: 'linear-gradient(135deg, #2563eb, #ec4899, #9333ea, #2563eb)'
                            },
                            { 
                              Icon: FaChartLine, 
                              label: 'Analytics',
                              gradient: 'linear-gradient(135deg, #3b82f6, #d946ef, #8b5cf6, #3b82f6)'
                            },
                            { 
                              Icon: FaBullseye, 
                              label: 'Obiettivi',
                              gradient: 'linear-gradient(135deg, #7c3aed, #2563eb, #ec4899, #7c3aed)'
                            }
                          ];
                          
                          return icons.map((item, index) => {
                            const IconComponent = item.Icon;
                            return (
                              <div
                                key={index}
                                className={`icon-${index + 1} absolute`}
                                style={{
                                  left: '50%',
                                  top: '50%',
                                }}
                              >
                                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 flex items-center justify-center">
                                  {/* Icon container with animated gradient background */}
                                  <div 
                                    className="relative w-full h-full rounded-full shadow-2xl flex items-center justify-center group transition-all hover:shadow-3xl hover:scale-105"
                                    style={{
                                      background: item.gradient,
                                      backgroundSize: '200% 200%',
                                      animation: 'gradientShift 4s ease infinite'
                                    }}>
                                    {/* White icon */}
                                    <IconComponent 
                                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 text-white"
                                    />
                                    
                                    {/* Glow effect on hover */}
                                    <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
                                  </div>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  </>
                ) : (
                  /* Contact Form - Mobile Responsive */
                  <div className="w-full flex items-center justify-center py-4 z-20">
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 backdrop-blur-sm w-full max-w-md shadow-2xl relative">
                      {/* Decorative background elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/20 to-transparent rounded-full"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/20 to-transparent rounded-full"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/5 via-transparent to-purple-50/5"></div>
                      <div className="flex justify-between items-center mb-4 sm:mb-6 relative z-10">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">Contattaci</h3>
                        <button 
                          onClick={() => setShowContactForm(false)}
                          className="text-gray-600 hover:text-gray-800 transition-colors text-lg sm:text-xl"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <form className="space-y-3 sm:space-y-4 relative z-10" onSubmit={handleContactSubmit}>
                        <div className="grid grid-cols-2 gap-2 sm:gap-4">
                          <div>
                            <label htmlFor="nome" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                              Nome
                            </label>
                            <input
                              type="text"
                              id="nome"
                              name="nome"
                              className="w-full px-2 sm:px-3 md:px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="cognome" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                              Cognome
                            </label>
                            <input
                              type="text"
                              id="cognome"
                              name="cognome"
                              className="w-full px-2 sm:px-3 md:px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="telefono" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Telefono
                          </label>
                          <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            pattern=".*[0-9].*"
                            placeholder="es: +39 123 456 7890"
                            className="w-full px-2 sm:px-3 md:px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400"
                            onInput={(e) => {
                              const target = e.target as HTMLInputElement;
                              // Rimuovi caratteri non validi
                              target.value = target.value.replace(/[^0-9+\-\s()]/g, '');
                              
                              // Reset validità personalizzata
                              target.setCustomValidity('');
                              
                              // Controlla se contiene almeno un numero
                              if (target.value.length > 0 && !/\d/.test(target.value)) {
                                target.setCustomValidity('Il telefono deve contenere almeno un numero');
                              }
                            }}
                            onInvalid={(e) => {
                              const target = e.target as HTMLInputElement;
                              if (!target.value) {
                                target.setCustomValidity('Il numero di telefono è obbligatorio');
                              } else if (!/\d/.test(target.value)) {
                                target.setCustomValidity('Il telefono deve contenere almeno un numero');
                              }
                            }}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-2 sm:px-3 md:px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400"
                            required
                          />
                        </div>

                        <div className="bg-blue-50/50 p-2 sm:p-3 rounded-lg border border-blue-200">
                          <label className="flex items-start space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={privacyAccepted}
                              onChange={(e) => setPrivacyAccepted(e.target.checked)}
                              className="mt-0.5 w-4 h-4 min-w-[16px] text-blue-600 border-blue-400 rounded focus:ring-blue-400"
                              required
                            />
                            <span className="text-[11px] sm:text-xs text-gray-700 leading-relaxed">
                              Accetto l'
                              <Link
                                href="/privacy-policy"
                                target="_blank"
                                className="text-blue-600 hover:text-blue-800 underline font-medium"
                                onClick={(e) => e.stopPropagation()}
                              >
                                informativa sulla privacy
                              </Link>
                              {' '}e autorizzo il trattamento dei miei dati personali per le finalità indicate nell'informativa stessa, ai sensi del Regolamento UE 2016/679 (GDPR).
                            </span>
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="w-full gradient-bg-brand gradient-bg-brand-hover text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!privacyAccepted}
                        >
                          Procedi al Questionario
                        </button>
                      </form>
                    </div>
                  </div>
                )}
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:mt-12 lg:mt-16">
                <p className="text-base sm:text-lg lg:text-xl text-custom-dark leading-relaxed">
                  Proponici la tua <span className="font-bold">idea di Business</span> con <span className="font-bold">E-Commerce</span>: se la riterremo valida, <span className="font-bold">creeremo</span> il sistema di consegne, gestiremo il <span className="font-bold">marketing</span> e <span className="font-bold">investiremo</span> nel progetto con campagne pubblicitarie mirate.
  Tranquillo, <span className="font-bold">copriremo eventuali perdite economiche</span> e ci prenderemo tutti i<span className="font-bold"> rischi</span>.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={scrollToContactForm}
                  className="w-full sm:w-auto gradient-bg-brand gradient-bg-brand-hover text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all text-sm sm:text-base transform hover:scale-105"
                >
                  <FaEnvelope className="inline mr-2" /> Candidati
                </button>
              </div>
            </div>
            
            {/* Rotating Icons Animation - Desktop Only */}
            <div id="contact-circle" className="relative hidden lg:flex justify-center lg:justify-end order-2 lg:order-2 mb-8 lg:mb-0 lg:col-span-3 lg:pr-4">
              <div className="relative w-full max-w-sm aspect-square sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                {!showContactForm ? (
                  <>
                    {/* Step-by-Step Circular Rotation Icons Animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <style jsx>{`
                        @keyframes expandCard {
                          0% {
                            transform: scale(0.5);
                            opacity: 0;
                          }
                          60% {
                            transform: scale(1.05);
                            opacity: 1;
                          }
                          100% {
                            transform: scale(1);
                            opacity: 1;
                          }
                        }

                        @keyframes gradientShift {
                          0% {
                            background-position: 0% 50%;
                          }
                          50% {
                            background-position: 100% 50%;
                          }
                          100% {
                            background-position: 0% 50%;
                          }
                        }

                        @keyframes pulseSubtle {
                          0%, 100% {
                            transform: scale(1);
                          }
                          50% {
                            transform: scale(1.08);
                          }
                        }
                        
                        /* Mobile distance */
                        @media (max-width: 640px) {
                          @keyframes stepCircular1 {
                            0%, 10% {
                              transform: translate(-50%, -50%) rotate(0deg) translateX(90px) rotate(0deg) scale(1.5);
                              z-index: 3;
                            }
                            15%, 25% {
                              transform: translate(-50%, -50%) rotate(120deg) translateX(90px) rotate(-120deg) scale(0.8);
                              z-index: 1;
                            }
                            30%, 43.33% {
                              transform: translate(-50%, -50%) rotate(120deg) translateX(90px) rotate(-120deg) scale(0.8);
                              z-index: 1;
                            }
                            48.33%, 58.33% {
                              transform: translate(-50%, -50%) rotate(240deg) translateX(90px) rotate(-240deg) scale(0.8);
                              z-index: 1;
                            }
                            63.33%, 76.66% {
                              transform: translate(-50%, -50%) rotate(240deg) translateX(90px) rotate(-240deg) scale(0.8);
                              z-index: 1;
                            }
                            81.66%, 91.66% {
                              transform: translate(-50%, -50%) rotate(360deg) translateX(90px) rotate(-360deg) scale(1.5);
                              z-index: 3;
                            }
                            96.66%, 100% {
                              transform: translate(-50%, -50%) rotate(360deg) translateX(90px) rotate(-360deg) scale(1.5);
                              z-index: 3;
                            }
                          }
                          
                          @keyframes stepCircular2 {
                            0%, 10% {
                              transform: translate(-50%, -50%) rotate(120deg) translateX(90px) rotate(-120deg) scale(0.8);
                              z-index: 1;
                            }
                            15%, 25% {
                              transform: translate(-50%, -50%) rotate(240deg) translateX(90px) rotate(-240deg) scale(0.8);
                              z-index: 1;
                            }
                            30%, 43.33% {
                              transform: translate(-50%, -50%) rotate(240deg) translateX(90px) rotate(-240deg) scale(0.8);
                              z-index: 1;
                            }
                            48.33%, 58.33% {
                              transform: translate(-50%, -50%) rotate(360deg) translateX(90px) rotate(-360deg) scale(1.5);
                              z-index: 3;
                            }
                            63.33%, 76.66% {
                              transform: translate(-50%, -50%) rotate(360deg) translateX(90px) rotate(-360deg) scale(1.5);
                              z-index: 3;
                            }
                            81.66%, 91.66% {
                              transform: translate(-50%, -50%) rotate(480deg) translateX(90px) rotate(-480deg) scale(0.8);
                              z-index: 1;
                            }
                            96.66%, 100% {
                              transform: translate(-50%, -50%) rotate(480deg) translateX(90px) rotate(-480deg) scale(0.8);
                              z-index: 1;
                            }
                          }
                          
                          @keyframes stepCircular3 {
                            0%, 10% {
                              transform: translate(-50%, -50%) rotate(240deg) translateX(90px) rotate(-240deg) scale(0.8);
                              z-index: 1;
                            }
                            15%, 25% {
                              transform: translate(-50%, -50%) rotate(360deg) translateX(90px) rotate(-360deg) scale(1.5);
                              z-index: 3;
                            }
                            30%, 43.33% {
                              transform: translate(-50%, -50%) rotate(360deg) translateX(90px) rotate(-360deg) scale(1.5);
                              z-index: 3;
                            }
                            48.33%, 58.33% {
                              transform: translate(-50%, -50%) rotate(480deg) translateX(90px) rotate(-480deg) scale(0.8);
                              z-index: 1;
                            }
                            63.33%, 76.66% {
                              transform: translate(-50%, -50%) rotate(480deg) translateX(90px) rotate(-480deg) scale(0.8);
                              z-index: 1;
                            }
                            81.66%, 91.66% {
                              transform: translate(-50%, -50%) rotate(600deg) translateX(90px) rotate(-600deg) scale(0.8);
                              z-index: 1;
                            }
                            96.66%, 100% {
                              transform: translate(-50%, -50%) rotate(600deg) translateX(90px) rotate(-600deg) scale(0.8);
                              z-index: 1;
                            }
                          }
                        }
                        
                        /* Desktop distance */
                        @media (min-width: 641px) {
                          @keyframes stepCircular1 {
                          0%, 10% {
                            transform: translate(-50%, -50%) rotate(0deg) translateX(140px) rotate(0deg) scale(1.5);
                            z-index: 3;
                          }
                          15%, 25% {
                            transform: translate(-50%, -50%) rotate(120deg) translateX(140px) rotate(-120deg) scale(0.8);
                            z-index: 1;
                          }
                          30%, 43.33% {
                            transform: translate(-50%, -50%) rotate(120deg) translateX(140px) rotate(-120deg) scale(0.8);
                            z-index: 1;
                          }
                          48.33%, 58.33% {
                            transform: translate(-50%, -50%) rotate(240deg) translateX(140px) rotate(-240deg) scale(0.8);
                            z-index: 1;
                          }
                          63.33%, 76.66% {
                            transform: translate(-50%, -50%) rotate(240deg) translateX(140px) rotate(-240deg) scale(0.8);
                            z-index: 1;
                          }
                          81.66%, 91.66% {
                            transform: translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg) scale(1.5);
                            z-index: 3;
                          }
                          96.66%, 100% {
                            transform: translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg) scale(1.5);
                            z-index: 3;
                          }
                        }
                        
                        @keyframes stepCircular2 {
                          0%, 10% {
                            transform: translate(-50%, -50%) rotate(120deg) translateX(140px) rotate(-120deg) scale(0.8);
                            z-index: 1;
                          }
                          15%, 25% {
                            transform: translate(-50%, -50%) rotate(240deg) translateX(140px) rotate(-240deg) scale(0.8);
                            z-index: 1;
                          }
                          30%, 43.33% {
                            transform: translate(-50%, -50%) rotate(240deg) translateX(140px) rotate(-240deg) scale(0.8);
                            z-index: 1;
                          }
                          48.33%, 58.33% {
                            transform: translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg) scale(1.5);
                            z-index: 3;
                          }
                          63.33%, 76.66% {
                            transform: translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg) scale(1.5);
                            z-index: 3;
                          }
                          81.66%, 91.66% {
                            transform: translate(-50%, -50%) rotate(480deg) translateX(140px) rotate(-480deg) scale(0.8);
                            z-index: 1;
                          }
                          96.66%, 100% {
                            transform: translate(-50%, -50%) rotate(480deg) translateX(140px) rotate(-480deg) scale(0.8);
                            z-index: 1;
                          }
                        }
                        
                        @keyframes stepCircular3 {
                          0%, 10% {
                            transform: translate(-50%, -50%) rotate(240deg) translateX(140px) rotate(-240deg) scale(0.8);
                            z-index: 1;
                          }
                          15%, 25% {
                            transform: translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg) scale(1.5);
                            z-index: 3;
                          }
                          30%, 43.33% {
                            transform: translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg) scale(1.5);
                            z-index: 3;
                          }
                          48.33%, 58.33% {
                            transform: translate(-50%, -50%) rotate(480deg) translateX(140px) rotate(-480deg) scale(0.8);
                            z-index: 1;
                          }
                          63.33%, 76.66% {
                            transform: translate(-50%, -50%) rotate(480deg) translateX(140px) rotate(-480deg) scale(0.8);
                            z-index: 1;
                          }
                          81.66%, 91.66% {
                            transform: translate(-50%, -50%) rotate(600deg) translateX(140px) rotate(-600deg) scale(0.8);
                            z-index: 1;
                          }
                          96.66%, 100% {
                            transform: translate(-50%, -50%) rotate(600deg) translateX(140px) rotate(-600deg) scale(0.8);
                            z-index: 1;
                          }
                        }
                        }
                        
                        @media (max-width: 640px) {
                          .icon-1 {
                            animation: stepCircular1 9s ease-in-out infinite;
                          }
                          
                          .icon-2 {
                            animation: stepCircular2 9s ease-in-out infinite;
                          }
                          
                          .icon-3 {
                            animation: stepCircular3 9s ease-in-out infinite;
                          }
                        }
                        
                        @media (min-width: 641px) {
                          .icon-1 {
                            animation: stepCircular1 9s ease-in-out infinite;
                          }
                          
                          .icon-2 {
                            animation: stepCircular2 9s ease-in-out infinite;
                          }
                          
                          .icon-3 {
                            animation: stepCircular3 9s ease-in-out infinite;
                          }
                        }
                      `}</style>
                      
                      {/* Icons Container */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        {(() => {
                          const icons = [
                            { 
                              Icon: FaRocket, 
                              label: 'Crescita',
                              gradient: 'linear-gradient(135deg, #2563eb, #ec4899, #9333ea, #2563eb)'
                            },
                            { 
                              Icon: FaChartLine, 
                              label: 'Analytics',
                              gradient: 'linear-gradient(135deg, #3b82f6, #d946ef, #8b5cf6, #3b82f6)'
                            },
                            { 
                              Icon: FaBullseye, 
                              label: 'Obiettivi',
                              gradient: 'linear-gradient(135deg, #7c3aed, #2563eb, #ec4899, #7c3aed)'
                            }
                          ];
                          
                          return icons.map((item, index) => {
                            const IconComponent = item.Icon;
                            return (
                              <div
                                key={index}
                                className={`icon-${index + 1} absolute`}
                                style={{
                                  left: '50%',
                                  top: '50%',
                                }}
                              >
                                <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 flex items-center justify-center">
                                  {/* Icon container with animated gradient background */}
                                  <div 
                                    className="relative w-full h-full rounded-full shadow-2xl flex items-center justify-center group transition-all hover:shadow-3xl hover:scale-105"
                                    style={{
                                      background: item.gradient,
                                      backgroundSize: '200% 200%',
                                      animation: 'gradientShift 4s ease infinite'
                                    }}>
                                    {/* White icon */}
                                    <IconComponent 
                                      className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 xl:w-24 xl:h-24 text-white"
                                    />
                                    
                                    {/* Glow effect on hover */}
                                    <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
                                  </div>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  </>
                ) : (
                  /* Contact Form - Desktop */
                  <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">
                    <div className="bg-white p-5 sm:p-6 md:p-7 rounded-2xl border border-gray-200 backdrop-blur-sm w-full sm:max-w-lg shadow-2xl relative">
                      {/* Decorative background elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/20 to-transparent rounded-full"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/20 to-transparent rounded-full"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/5 via-transparent to-purple-50/5"></div>
                      <div className="flex justify-between items-center mb-4 sm:mb-6 relative z-10">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">Contattaci</h3>
                        <button 
                          onClick={() => setShowContactForm(false)}
                          className="text-gray-600 hover:text-gray-800 transition-colors text-lg sm:text-xl"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <form className="space-y-3 sm:space-y-4 relative z-10" onSubmit={handleContactSubmit}>
                        <div className="grid grid-cols-2 gap-2 sm:gap-4">
                          <div>
                            <label htmlFor="nome" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                              Nome
                            </label>
                            <input
                              type="text"
                              id="nome"
                              name="nome"
                              className="w-full px-2 sm:px-3 md:px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="cognome" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                              Cognome
                            </label>
                            <input
                              type="text"
                              id="cognome"
                              name="cognome"
                              className="w-full px-2 sm:px-3 md:px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="telefono" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Telefono
                          </label>
                          <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            pattern=".*[0-9].*"
                            placeholder="es: +39 123 456 7890"
                            className="w-full px-2 sm:px-3 md:px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400"
                            onInput={(e) => {
                              const target = e.target as HTMLInputElement;
                              // Rimuovi caratteri non validi
                              target.value = target.value.replace(/[^0-9+\-\s()]/g, '');
                              
                              // Reset validità personalizzata
                              target.setCustomValidity('');
                              
                              // Controlla se contiene almeno un numero
                              if (target.value.length > 0 && !/\d/.test(target.value)) {
                                target.setCustomValidity('Il telefono deve contenere almeno un numero');
                              }
                            }}
                            onInvalid={(e) => {
                              const target = e.target as HTMLInputElement;
                              if (!target.value) {
                                target.setCustomValidity('Il numero di telefono è obbligatorio');
                              } else if (!/\d/.test(target.value)) {
                                target.setCustomValidity('Il telefono deve contenere almeno un numero');
                              }
                            }}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-2 sm:px-3 md:px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400"
                            required
                          />
                        </div>

                        <div className="bg-blue-50/50 p-2 sm:p-3 rounded-lg border border-blue-200">
                          <label className="flex items-start space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={privacyAccepted}
                              onChange={(e) => setPrivacyAccepted(e.target.checked)}
                              className="mt-0.5 w-4 h-4 min-w-[16px] text-blue-600 border-blue-400 rounded focus:ring-blue-400"
                              required
                            />
                            <span className="text-[11px] sm:text-xs text-gray-700 leading-relaxed">
                              Accetto l'
                              <Link
                                href="/privacy-policy"
                                target="_blank"
                                className="text-blue-600 hover:text-blue-800 underline font-medium"
                                onClick={(e) => e.stopPropagation()}
                              >
                                informativa sulla privacy
                              </Link>
                              {' '}e autorizzo il trattamento dei miei dati personali per le finalità indicate nell'informativa stessa, ai sensi del Regolamento UE 2016/679 (GDPR).
                            </span>
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="w-full gradient-bg-brand gradient-bg-brand-hover text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!privacyAccepted}
                        >
                          Procedi al Questionario
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Questionnaire Popup */}
      {showQuestionnaire && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start sm:items-center justify-center z-[60] p-2 sm:p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              sendIncompleteQuestionnaire();
              setShowQuestionnaire(false);
              setQuestionnaireSubmitted(false);
              setIncompleteConfirmed(false);
            }
          }}
        >
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto relative my-8 sm:my-4 border border-blue-100">
            {/* Animation styles for questionnaire */}
            <style jsx>{`
              @keyframes pulseButton {
                0%, 100% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.08);
                }
              }

              .pulse-button {
                animation: pulseButton 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
              }
            `}</style>

            {/* Decorative design elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full -z-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-100/40 to-transparent rounded-full -z-10"></div>
            <div className="absolute top-1/2 right-0 w-56 h-56 bg-gradient-to-l from-blue-50/30 to-transparent rounded-full -z-10"></div>

            <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                              <FaClipboardList className="inline mr-2 text-purple-600" /> Candidatura SafeScale
                            </span>
                          </h3>
                          <p className="text-gray-600 text-sm">Raccontaci di più sul tuo progetto</p>
                        </div>
                        <button
                          onClick={() => {
                            sendIncompleteQuestionnaire();
                            setShowQuestionnaire(false);
                            setIncompleteConfirmed(false);
                            generateCaptcha();
                          }}
                          className="text-gray-600 hover:text-gray-800 transition-colors text-xl"
                        >
                          ✕
                        </button>
                      </div>
                      
                      {!questionnaireSubmitted ? (
                        <form className="space-y-6" onSubmit={handleQuestionnaireSubmit}>
                        {/* Sezione 1 - Chi sei */}
                        <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 p-5 rounded-2xl border border-blue-100">
                          <h4 className="text-xl font-bold mb-4 flex items-center">
                            <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full text-white text-sm font-bold mr-3 shadow-lg">1</span>
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                              Chi sei
                            </span>
                          </h4>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                1. Nome del tuo brand / azienda <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={questionnaireData.brandName}
                                onChange={(e) => setQuestionnaireData({...questionnaireData, brandName: e.target.value})}
                                className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 hover:border-blue-300"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                2. Hai già un sito web?
                              </label>
                              <p className="text-xs text-gray-600 mb-2">Inserisci il dominio o il link 👉</p>
                              <input
                                type="text"
                                value={questionnaireData.website}
                                onChange={(e) => setQuestionnaireData({...questionnaireData, website: e.target.value})}
                                placeholder="es: esempio.com o https://esempio.com"
                                className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400 hover:border-blue-300"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                3. Dove possiamo trovarti sui social?
                              </label>
                              <p className="text-xs text-gray-600 mb-3">Condividi i link ai tuoi profili:</p>
                              
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Instagram</label>
                                  <input
                                    type="url"
                                    value={questionnaireData.instagram}
                                    onChange={(e) => setQuestionnaireData({...questionnaireData, instagram: e.target.value})}
                                    placeholder="https://instagram.com/..."
                                    className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400 hover:border-blue-300"
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">TikTok</label>
                                  <input
                                    type="url"
                                    value={questionnaireData.tiktok}
                                    onChange={(e) => setQuestionnaireData({...questionnaireData, tiktok: e.target.value})}
                                    placeholder="https://tiktok.com/..."
                                    className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400 hover:border-blue-300"
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Facebook</label>
                                  <input
                                    type="url"
                                    value={questionnaireData.facebook}
                                    onChange={(e) => setQuestionnaireData({...questionnaireData, facebook: e.target.value})}
                                    placeholder="https://facebook.com/..."
                                    className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400 hover:border-blue-300"
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Altro</label>
                                  <input
                                    type="url"
                                    value={questionnaireData.otherSocial}
                                    onChange={(e) => setQuestionnaireData({...questionnaireData, otherSocial: e.target.value})}
                                    placeholder="Inserisci altro link social..."
                                    className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400 hover:border-blue-300"
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                4. In che settore ti muovi principalmente? <span className="text-red-500">*</span>
                              </label>
                              <p className="text-xs text-gray-600 mb-3">Scegli quello che ti rappresenta meglio:</p>
                              <div className="space-y-1">
                                {['Moda & Accessori', 'Beauty & Cosmetica', 'Food & Integratori', 'Home & Lifestyle', 'Altro'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200">
                                    <input
                                      type="radio"
                                      name="sector"
                                      value={option}
                                      checked={questionnaireData.sector === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, sector: e.target.value})}
                                      className="w-4 h-4 text-blue-600 border-blue-400 focus:ring-blue-400"
                                    />
                                    <span className="text-gray-700 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                              {questionnaireData.sector === 'Altro' && (
                                <input
                                  type="text"
                                  value={questionnaireData.sectorOther}
                                  onChange={(e) => setQuestionnaireData({...questionnaireData, sectorOther: e.target.value})}
                                  placeholder="Scrivi il tuo settore..."
                                  className="w-full mt-2 px-4 py-3 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400 hover:border-blue-300"
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Sezione 2 - I tuoi prodotti */}
                        <div className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 p-5 rounded-2xl border border-purple-100">
                          <h4 className="text-xl font-bold mb-4 flex items-center">
                            <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full text-white text-sm font-bold mr-3 shadow-lg">2</span>
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                              I tuoi prodotti
                            </span>
                          </h4>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                5. Come nascono i tuoi prodotti?
                              </label>
                              <div className="space-y-1">
                                {['Produzione interna', 'Produzione conto terzi', 'Acquisto stock già pronti', 'Altro'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200">
                                    <input
                                      type="radio"
                                      name="production"
                                      value={option}
                                      checked={questionnaireData.production === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, production: e.target.value})}
                                      className="w-4 h-4 text-blue-600 border-blue-400 focus:ring-blue-400"
                                    />
                                    <span className="text-gray-700 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                              {questionnaireData.production === 'Altro' && (
                                <input
                                  type="text"
                                  value={questionnaireData.productionOther}
                                  onChange={(e) => setQuestionnaireData({...questionnaireData, productionOther: e.target.value})}
                                  placeholder="Specifica come nascono i tuoi prodotti..."
                                  className="w-full mt-2 px-4 py-3 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400 hover:border-blue-300"
                                />
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                6. Come gestisci la disponibilità del prodotto?
                              </label>
                              <div className="space-y-1">
                                {['Ho stock pronto in magazzino', 'Produco su richiesta (just-in-time)', 'Altro'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200">
                                    <input
                                      type="radio"
                                      name="availability"
                                      value={option}
                                      checked={questionnaireData.availability === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, availability: e.target.value})}
                                      className="w-4 h-4 text-blue-600 border-blue-400 focus:ring-blue-400"
                                    />
                                    <span className="text-gray-700 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                              {questionnaireData.availability === 'Altro' && (
                                <input
                                  type="text"
                                  value={questionnaireData.availabilityOther}
                                  onChange={(e) => setQuestionnaireData({...questionnaireData, availabilityOther: e.target.value})}
                                  placeholder="Specifica come gestisci la disponibilità..."
                                  className="w-full mt-2 px-4 py-3 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400 hover:border-blue-300"
                                />
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                7. Qual è il tuo prodotto best seller e il prezzo medio di vendita?
                              </label>
                              <input
                                type="text"
                                value={questionnaireData.bestSeller}
                                onChange={(e) => setQuestionnaireData({...questionnaireData, bestSeller: e.target.value})}
                                placeholder="Esempio: Sneakers X – €89"
                                className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400 hover:border-blue-300"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                8. Qual è il margine lordo medio sui tuoi prodotti?
                              </label>
                              <div className="space-y-1">
                                {['<40%', '40–60%', '60–80%', 'Oltre l\'80%'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200">
                                    <input
                                      type="radio"
                                      name="margin"
                                      value={option}
                                      checked={questionnaireData.margin === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, margin: e.target.value})}
                                      className="w-4 h-4 text-blue-600 border-blue-400 focus:ring-blue-400"
                                    />
                                    <span className="text-gray-700 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            
                          </div>
                        </div>

                        {/* Sezione 3 - Esperienza di vendita */}
                        <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 p-5 rounded-2xl border border-blue-100">
                          <h4 className="text-xl font-bold mb-4 flex items-center">
                            <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full text-white text-sm font-bold mr-3 shadow-lg">3</span>
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                              Vendite & Marketing
                            </span>
                          </h4>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                9. Hai già venduto online?
                              </label>
                              <div className="space-y-1">
                                {['Sì, con e-commerce proprietario', 'Sì, su marketplace (Amazon, Etsy, ecc.)', 'Sì, solo tramite social (Instagram, TikTok, WhatsApp)', 'No, mai venduto online'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200">
                                    <input
                                      type="radio"
                                      name="onlineSales"
                                      value={option}
                                      checked={questionnaireData.onlineSales === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, onlineSales: e.target.value})}
                                      className="w-4 h-4 text-blue-600 border-blue-400 focus:ring-blue-400"
                                    />
                                    <span className="text-gray-700 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                10. Quanti ordini ricevi in media ogni mese?
                              </label>
                              <div className="space-y-1">
                                {['0–50', '50–200', '200–500', '500+'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200">
                                    <input
                                      type="radio"
                                      name="monthlyOrders"
                                      value={option}
                                      checked={questionnaireData.monthlyOrders === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, monthlyOrders: e.target.value})}
                                      className="w-4 h-4 text-blue-600 border-blue-400 focus:ring-blue-400"
                                    />
                                    <span className="text-gray-700 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                11. Qual è il valore medio di un ordine (ticket medio)?
                              </label>
                              <div className="space-y-1">
                                {['Meno di €50', '€50–150', '€150–300', 'Oltre €300'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200">
                                    <input
                                      type="radio"
                                      name="ticketMedio"
                                      value={option}
                                      checked={questionnaireData.ticketMedio === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, ticketMedio: e.target.value})}
                                      className="w-4 h-4 text-blue-600 border-blue-400 focus:ring-blue-400"
                                    />
                                    <span className="text-gray-700 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                12. Su quali canali stai già facendo marketing? (puoi selezionare più opzioni)
                              </label>
                              <div className="space-y-1">
                                {['Google Ads', 'Meta Ads (Facebook/Instagram)', 'TikTok Ads', 'SEO / Organico', 'Nessuno'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200">
                                    <input
                                      type="checkbox"
                                      value={option}
                                      checked={questionnaireData.marketingChannels.includes(option)}
                                      onChange={(e) => {
                                        let newChannels;
                                        if (option === 'Nessuno') {
                                          // Se si seleziona "Nessuno", deseleziona tutte le altre opzioni
                                          newChannels = e.target.checked ? ['Nessuno'] : [];
                                        } else {
                                          // Se si seleziona qualsiasi altra opzione, rimuovi "Nessuno"
                                          if (e.target.checked) {
                                            newChannels = [...questionnaireData.marketingChannels.filter(c => c !== 'Nessuno'), option];
                                          } else {
                                            newChannels = questionnaireData.marketingChannels.filter(c => c !== option);
                                          }
                                        }
                                        setQuestionnaireData({...questionnaireData, marketingChannels: newChannels});
                                      }}
                                      className="w-4 h-4 text-blue-600 border-blue-400 focus:ring-blue-400"
                                    />
                                    <span className="text-gray-700 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                13. Quanto hai investito in advertising digitale in passato (circa)?
                              </label>
                              <div className="space-y-1">
                                {['Mai', 'Meno di €1.000 al mese', '€1.000–5.000 al mese', 'Più di €5.000 al mese'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200">
                                    <input
                                      type="radio"
                                      name="adInvestment"
                                      value={option}
                                      checked={questionnaireData.adInvestment === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, adInvestment: e.target.value})}
                                      className="w-4 h-4 text-blue-600 border-blue-400 focus:ring-blue-400"
                                    />
                                    <span className="text-gray-700 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Sezione 4 - Logistica & operatività */}
                        <div className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 p-5 rounded-2xl border border-purple-100">
                          <h4 className="text-xl font-bold mb-4 flex items-center">
                            <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full text-white text-sm font-bold mr-3 shadow-lg">4</span>
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                              Logistica & Operatività
                            </span>
                          </h4>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                14. Come gestisci attualmente le spedizioni?
                              </label>
                              <div className="space-y-1">
                                {['Contratti con corrieri', 'Gestione manuale senza contratti fissi', 'Marketplace (es. Amazon FBA)', 'Altro'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200">
                                    <input
                                      type="radio"
                                      name="shipping"
                                      value={option}
                                      checked={questionnaireData.shipping === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, shipping: e.target.value})}
                                      className="w-4 h-4 text-blue-600 border-blue-400 focus:ring-blue-400"
                                    />
                                    <span className="text-gray-700 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                              {questionnaireData.shipping === 'Altro' && (
                                <input
                                  type="text"
                                  value={questionnaireData.shippingOther}
                                  onChange={(e) => setQuestionnaireData({...questionnaireData, shippingOther: e.target.value})}
                                  placeholder="Specifica come gestisci le spedizioni..."
                                  className="w-full mt-2 px-4 py-3 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400 hover:border-blue-300"
                                />
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                15. % media di resi/mancata consegna (RTO)
                              </label>
                              <div className="space-y-1">
                                {['< 5%', '5–10%', '10–20%', '> 20%'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200">
                                    <input
                                      type="radio"
                                      name="returns"
                                      value={option}
                                      checked={questionnaireData.returns === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, returns: e.target.value})}
                                      className="w-4 h-4 text-blue-600 border-blue-400 focus:ring-blue-400"
                                    />
                                    <span className="text-gray-700 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                16. In quali Paesi vendi o vorresti vendere?
                              </label>
                              <textarea
                                value={questionnaireData.countries}
                                onChange={(e) => setQuestionnaireData({...questionnaireData, countries: e.target.value})}
                                placeholder="Es: Italia, Spagna, Germania..."
                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400 resize-none"
                                rows={2}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Sezione 5 - Potenziale del brand */}
                        <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 p-5 rounded-2xl border border-blue-100">
                          <h4 className="text-xl font-bold mb-4 flex items-center">
                            <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full text-white text-sm font-bold mr-3 shadow-lg">5</span>
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                              Potenziale del Brand
                            </span>
                          </h4>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                17. Qual è il tuo obiettivo principale nei prossimi 12 mesi?
                              </label>
                              <div className="space-y-1">
                                {['Aumentare le vendite', 'Lanciare un nuovo prodotto/brand', 'Espandere all\'estero', 'Migliorare la marginalità', 'Altro'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200">
                                    <input
                                      type="radio"
                                      name="objective"
                                      value={option}
                                      checked={questionnaireData.objective === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, objective: e.target.value})}
                                      className="w-4 h-4 text-blue-600 border-blue-400 focus:ring-blue-400"
                                    />
                                    <span className="text-gray-700 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                              {questionnaireData.objective === 'Altro' && (
                                <input
                                  type="text"
                                  value={questionnaireData.objectiveOther}
                                  onChange={(e) => setQuestionnaireData({...questionnaireData, objectiveOther: e.target.value})}
                                  placeholder="Specifica il tuo obiettivo..."
                                  className="w-full mt-2 px-4 py-3 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-gray-800 placeholder-gray-400 hover:border-blue-300"
                                />
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                18. Fatturato medio mensile
                              </label>
                              <div className="space-y-1">
                                {['0-5.000€', '5.000-10.000€', '10.000-20.000€', '20.000-50.000€', '+50.000€'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200">
                                    <input
                                      type="radio"
                                      name="revenue"
                                      value={option}
                                      checked={questionnaireData.revenue === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, revenue: e.target.value})}
                                      className="w-4 h-4 text-blue-600 border-blue-400 focus:ring-blue-400"
                                    />
                                    <span className="text-gray-700 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                19. Composizione del tuo team attuale
                              </label>
                              <div className="space-y-1">
                                {['Solo founder', '2–3 persone', '4–10 persone', '10+ persone'].map((option) => (
                                  <label key={option} className="flex items-center space-x-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200">
                                    <input
                                      type="radio"
                                      name="team"
                                      value={option}
                                      checked={questionnaireData.team === option}
                                      onChange={(e) => setQuestionnaireData({...questionnaireData, team: e.target.value})}
                                      className="w-4 h-4 text-blue-600 border-blue-400 focus:ring-blue-400"
                                    />
                                    <span className="text-gray-700 text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                20. Quali sono oggi i principali ostacoli che ti impediscono di crescere?
                              </label>
                              <textarea
                                value={questionnaireData.obstacles}
                                onChange={(e) => setQuestionnaireData({...questionnaireData, obstacles: e.target.value})}
                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition-all text-sm text-gray-800 resize-none"
                                rows={3}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Captcha - Sezione Obbligatoria */}
                        <div className="mt-8 bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-50 p-6 rounded-2xl border-2 border-orange-200 shadow-lg">
                          <div className="flex items-start space-x-2 mb-4">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-gray-800">
                                Verifica di Sicurezza <span className="text-red-500">*</span>
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                Conferma che sei umano risolvendo questa semplice operazione
                              </p>
                            </div>
                          </div>

                          <div className="bg-white/70 p-4 rounded-xl border border-orange-100">
                            <div className="flex items-center space-x-4 justify-center" suppressHydrationWarning>
                              {isMounted ? (
                                <>
                                  <span className="text-2xl font-bold text-gray-800 bg-white px-4 py-2 rounded-lg shadow-sm">
                                    {captchaQuestion.question}
                                  </span>
                                  <span className="text-xl text-gray-600">=</span>
                                  <input
                                    type="number"
                                    value={captchaAnswer}
                                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                                    className="w-24 px-4 py-3 bg-white border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all text-center text-xl font-bold text-gray-800 shadow-sm"
                                    placeholder="?"
                                    required
                                  />
                                  <button
                                    type="button"
                                    onClick={generateCaptcha}
                                    className="px-3 py-1 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg transition-colors text-sm font-medium flex items-center gap-1"
                                  >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Cambia
                                  </button>
                                </>
                              ) : (
                                <div className="flex items-center space-x-4 justify-center">
                                  <span className="text-xl font-bold text-gray-400">Caricamento...</span>
                                  <div className="w-24 h-12 bg-orange-100 border border-orange-200 rounded-lg animate-pulse"></div>
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-center text-gray-500 mt-3">
                              <span className="text-orange-600 font-medium">Campo obbligatorio</span> - Inserisci la risposta corretta per procedere
                            </p>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full gradient-bg-brand gradient-bg-brand-hover text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl pulse-button"
                        >
                          <FaRocket className="inline mr-2 text-xl" /> Invia Candidatura
                        </button>
                      </form>
                      ) : (
                        <div className="text-center py-8">
                          <div className="mb-6">
                            <div className="text-6xl mb-4 animate-bounce"><FaCheckCircle className="text-green-500 mx-auto" /></div>
                            <h3 className="text-3xl font-bold mb-4">
                              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                                Candidatura Inviata con Successo!
                              </span>
                            </h3>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                              Grazie per aver completato il questionario.<br />
                              Se il tuo brand è idoneo, un nostro commerciale ti contatterà entro <span className="text-purple-600 font-semibold">48 ore</span> per valutare la collaborazione.
                            </p>
                            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                              <p className="text-green-700 font-semibold mb-2">
                                <FaBullseye className="inline mr-2 text-green-600" /> Prossimi passi:
                              </p>
                              <ul className="text-gray-700 text-left space-y-2">
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
                              setIncompleteConfirmed(false);
                              setShowContactForm(false);
                              setContactFormData({ nome: '', cognome: '', telefono: '', email: '' });
                              setQuestionnaireData({
                                brandName: '', website: '', instagram: '', tiktok: '', facebook: '', otherSocial: '', sector: '', sectorOther: '', production: '', productionOther: '',
                                bestSeller: '', margin: '', availability: '', availabilityOther: '', onlineSales: '', monthlyOrders: '', ticketMedio: '', marketingChannels: [], adInvestment: '',
                                salesChannels: [], shipping: '', shippingOther: '', returns: '', countries: '', objective: '', objectiveOther: '', revenue: '', team: '', obstacles: ''
                              });
                            }}
                            className="gradient-bg-brand gradient-bg-brand-hover text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-lg"
                          >
                            Chiudi
                          </button>
                        </div>
                      )}
          </div>
        </div>
      )}

      {/* --- Comparison Section --- */}
      <section
        id="comparison"
        className="py-16 px-4 sm:px-6 lg:px-8"
        aria-label="Work is broken vs Let's fix it"
      >
  {(() => {
    const _apps = [
      { src: 'images/icons/business.png', alt: 'Word', style: 'top-6 left-10 rotate-3' },
      { src: 'images/icons/sitoweb.png', alt: 'Slack', style: 'top-20 right-10 -rotate-6' },
      { src: 'images/icons/social.png', alt: 'Notion', style: 'top-40 left-4 rotate-2' },
      { src: 'images/icons/ads.png', alt: 'Trello', style: 'bottom-10 left-16 -rotate-3' },
      { src: 'images/icons/spam.png', alt: 'Airtable', style: 'bottom-20 right-6 rotate-6' },
      { src: 'images/icons/soldi.png', alt: 'Dropbox', style: 'top-1/2 right-24 -rotate-2' },
    ];
const _labels: { [key: number]: string } = {
  0: '?',
  1: 'Error 404',
  2: 'Ban',
  3: 'Obsoleto',
  4: 'Spam',
  5: '-8.000€'
};
    return (
     <div className="mx-auto flex flex-col lg:grid lg:grid-cols-2 max-w-5xl gap-6 items-stretch">
  {/* LEFT – Work is broken */}
  <div data-section="comparison-left" className={`flex justify-center slide-in-left ${visibleSections.includes('comparison-left') ? 'slide-in-visible' : ''}`}>
    <div className="w-full lg:max-w-lg">
      <OldAgencyBrokenBox />
    </div>
  </div>

  {/* RIGHT – Let's fix it */}
       <div data-section="comparison-right" className={`flex justify-center slide-in-right ${visibleSections.includes('comparison-right') ? 'slide-in-visible' : ''}`}>
    <div className="w-full lg:max-w-lg">
      <div className="relative h-full min-h-[450px] sm:min-h-[700px] overflow-hidden rounded-3xl border border-slate-800/50 bg-black p-6 sm:p-8">
              <h3 className="relative text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Da oggi cambiamo rotta.
              </h3>
              <p className="relative mt-3 max-w-md text-slate-300">
                Con SafeScale investiamo noi nel tuo progetto con strategie già collaudate e vincenti. <br />
                Se funziona, cresciamo insieme. Se non funziona, il rischio è solo nostro.
              </p>

              {/* CTA */}
              <button
                onClick={scrollToContactForm}
                className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-slate-900 font-semibold shadow hover:shadow-lg active:scale-[0.99] transition"
              >
                <span>Inizia ora</span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </button>
              <p className="relative mt-2 text-xs text-slate-400">
                Scopri se sei idoneo al progetto SafeScale.
              </p>

              {/* Logo with Orbiting Icons */}
              <div className="relative mt-8 sm:mt-12 flex justify-center items-center">
                <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                  
                  {/* Central Logo with Magnetic Field Effect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="relative">
                      {/* Magnetic field layers - behind logo, in front of background */}
                      
                      {/* Outer magnetic ring */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[380px] sm:h-[380px]">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-400/5 via-purple-400/10 to-blue-400/5 blur-3xl animate-[pulse_6s_ease-in-out_infinite]"></div>
                      </div>
                      
                      {/* Middle magnetic ring */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] sm:w-[280px] sm:h-[280px]">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 via-violet-500/15 to-indigo-500/10 blur-2xl animate-[pulse_4s_ease-in-out_infinite]"></div>
                      </div>
                      
                      {/* Inner magnetic ring */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] sm:w-[200px] sm:h-[200px]">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-400/15 via-purple-400/20 to-violet-400/15 blur-xl animate-[pulse_3s_ease-in-out_infinite]"></div>
                      </div>
                      
                      {/* Radial gradient overlay for depth */}
                      <div className="absolute -inset-32 bg-radial-gradient opacity-40">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(139,92,246,0.08)_50%,transparent_70%)]"></div>
                      </div>
                      
                      {/* Core glow - closer to logo */}
                      <div className="absolute -inset-12 bg-gradient-to-r from-fuchsia-500/25 to-purple-500/25 rounded-full blur-2xl animate-[pulse_2s_ease-in-out_infinite]"></div>
                      
                      {/* Orbital field lines effect */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[420px] sm:h-[420px] opacity-30">
                        <svg className="w-full h-full animate-[spin_60s_linear_infinite]" viewBox="0 0 400 400">
                          <defs>
                            <radialGradient id="fieldGradient">
                              <stop offset="0%" stopColor="rgba(168, 85, 247, 0)" />
                              <stop offset="50%" stopColor="rgba(168, 85, 247, 0.3)" />
                              <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
                            </radialGradient>
                          </defs>
                          <circle 
                            cx="200" 
                            cy="200" 
                            r="160" 
                            fill="none" 
                            stroke="url(#fieldGradient)" 
                            strokeWidth="2"
                            strokeDasharray="10 20"
                            opacity="0.5"
                          />
                          <circle 
                            cx="200" 
                            cy="200" 
                            r="120" 
                            fill="none" 
                            stroke="url(#fieldGradient)" 
                            strokeWidth="1.5"
                            strokeDasharray="5 15"
                            opacity="0.4"
                          />
                          <circle 
                            cx="200" 
                            cy="200" 
                            r="80" 
                            fill="none" 
                            stroke="url(#fieldGradient)" 
                            strokeWidth="1"
                            strokeDasharray="3 10"
                            opacity="0.3"
                          />
                        </svg>
                      </div>
                      
                      {/* Logo with heartbeat animation */}
                      <style jsx>{`
                        @keyframes heartbeat {
                          0% {
                            transform: scale(1);
                          }
                          10% {
                            transform: scale(1.06);
                          }
                          20% {
                            transform: scale(1);
                          }
                          30% {
                            transform: scale(1.03);
                          }
                          40% {
                            transform: scale(1);
                          }
                          100% {
                            transform: scale(1);
                          }
                        }
                        
                        .center-logo {
                          animation: heartbeat 2.2s cubic-bezier(0.42, 0, 0.58, 1) infinite;
                          transform-origin: center center;
                          will-change: transform;
                        }
                        
                        @media (prefers-reduced-motion: reduce) {
                          .center-logo {
                            animation: none;
                          }
                        }
                      `}</style>
                      
                      <Image
                        src="/images/logo-4.png"
                        alt="SafeScale Logo"
                        width={400}
                        height={150}
                        className="center-logo relative z-10 h-44 sm:h-52 w-auto"
                      />
                    </div>
                  </div>
                  
                  {/* Orbiting Icons Container */}
                  <div className="absolute inset-0 z-20" style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
                    <style jsx>{`
                      /* Simple orbit animations for 7 icons */
                      @keyframes orbit1 {
                        from { transform: rotate(0deg) translateX(150px) rotate(0deg); }
                        to { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
                      }
                      @keyframes orbit2 {
                        from { transform: rotate(51.4deg) translateX(150px) rotate(-51.4deg); }
                        to { transform: rotate(411.4deg) translateX(150px) rotate(-411.4deg); }
                      }
                      @keyframes orbit3 {
                        from { transform: rotate(102.8deg) translateX(150px) rotate(-102.8deg); }
                        to { transform: rotate(462.8deg) translateX(150px) rotate(-462.8deg); }
                      }
                      @keyframes orbit4 {
                        from { transform: rotate(154.2deg) translateX(150px) rotate(-154.2deg); }
                        to { transform: rotate(514.2deg) translateX(150px) rotate(-514.2deg); }
                      }
                      @keyframes orbit5 {
                        from { transform: rotate(205.6deg) translateX(150px) rotate(-205.6deg); }
                        to { transform: rotate(565.6deg) translateX(150px) rotate(-565.6deg); }
                      }
                      @keyframes orbit6 {
                        from { transform: rotate(257deg) translateX(150px) rotate(-257deg); }
                        to { transform: rotate(617deg) translateX(150px) rotate(-617deg); }
                      }
                      @keyframes orbit7 {
                        from { transform: rotate(308.4deg) translateX(150px) rotate(-308.4deg); }
                        to { transform: rotate(668.4deg) translateX(150px) rotate(-668.4deg); }
                      }
                      
                      @media (max-width: 640px) {
                        @keyframes orbit1 {
                          from { transform: rotate(0deg) translateX(140px) rotate(0deg); }
                          to { transform: rotate(360deg) translateX(140px) rotate(-360deg); }
                        }
                        @keyframes orbit2 {
                          from { transform: rotate(51.4deg) translateX(140px) rotate(-51.4deg); }
                          to { transform: rotate(411.4deg) translateX(140px) rotate(-411.4deg); }
                        }
                        @keyframes orbit3 {
                          from { transform: rotate(102.8deg) translateX(140px) rotate(-102.8deg); }
                          to { transform: rotate(462.8deg) translateX(140px) rotate(-462.8deg); }
                        }
                        @keyframes orbit4 {
                          from { transform: rotate(154.2deg) translateX(140px) rotate(-154.2deg); }
                          to { transform: rotate(514.2deg) translateX(140px) rotate(-514.2deg); }
                        }
                        @keyframes orbit5 {
                          from { transform: rotate(205.6deg) translateX(140px) rotate(-205.6deg); }
                          to { transform: rotate(565.6deg) translateX(140px) rotate(-565.6deg); }
                        }
                        @keyframes orbit6 {
                          from { transform: rotate(257deg) translateX(140px) rotate(-257deg); }
                          to { transform: rotate(617deg) translateX(140px) rotate(-617deg); }
                        }
                        @keyframes orbit7 {
                          from { transform: rotate(308.4deg) translateX(140px) rotate(-308.4deg); }
                          to { transform: rotate(668.4deg) translateX(140px) rotate(-668.4deg); }
                        }
                      }
                    `}</style>
                    
                    
                    {/* Shipping Icon - Position 1 */}
                    <div 
                      className="absolute top-1/2 left-1/2 orbit-icon w-[85px] h-[85px] sm:w-[90px] sm:h-[90px] md:w-[95px] md:h-[95px] -ml-[42.5px] -mt-[42.5px] sm:-ml-[45px] sm:-mt-[45px] md:-ml-[47.5px] md:-mt-[47.5px]" 
                      style={{ 
                        animation: 'orbit1 15s linear infinite'
                      }}>
                      <div className="group relative w-full h-full flex items-center justify-center transition-all cursor-pointer hover:scale-110">
                        <Image
                          src="/images/icons/shipping-logo.png"
                          alt="Shipping"
                          width={80}
                          height={80}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/90 px-3 py-1.5 rounded text-xs text-white font-medium z-50">
                          Shipping
                        </div>
                      </div>
                    </div>
                    
                    {/* Google Ads Icon - Position 2 */}
                    <div 
                      className="absolute top-1/2 left-1/2 orbit-icon w-[85px] h-[85px] sm:w-[90px] sm:h-[90px] md:w-[95px] md:h-[95px] -ml-[42.5px] -mt-[42.5px] sm:-ml-[45px] sm:-mt-[45px] md:-ml-[47.5px] md:-mt-[47.5px]" 
                      style={{ 
                        animation: 'orbit2 15s linear infinite'
                      }}>
                      <div className="group relative w-full h-full flex items-center justify-center transition-all cursor-pointer hover:scale-110">
                        <Image
                          src="/images/icons/googleads-logo.png"
                          alt="Google Ads"
                          width={80}
                          height={80}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/90 px-3 py-1.5 rounded text-xs text-white font-medium z-50">
                          Google Ads
                        </div>
                      </div>
                    </div>
                    
                    {/* Shopify Icon - Position 3 */}
                    <div 
                      className="absolute top-1/2 left-1/2 orbit-icon w-[85px] h-[85px] sm:w-[90px] sm:h-[90px] md:w-[95px] md:h-[95px] -ml-[42.5px] -mt-[42.5px] sm:-ml-[45px] sm:-mt-[45px] md:-ml-[47.5px] md:-mt-[47.5px]" 
                      style={{ 
                        animation: 'orbit3 15s linear infinite'
                      }}>
                      <div className="group relative w-full h-full flex items-center justify-center transition-all cursor-pointer hover:scale-110">
                        <Image
                          src="/images/icons/shopify-logo.png"
                          alt="Shopify"
                          width={80}
                          height={80}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/90 px-3 py-1.5 rounded text-xs text-white font-medium z-50">
                          Shopify
                        </div>
                      </div>
                    </div>
                    
                    {/* SEO Icon - Position 4 */}
                    <div 
                      className="absolute top-1/2 left-1/2 orbit-icon w-[85px] h-[85px] sm:w-[90px] sm:h-[90px] md:w-[95px] md:h-[95px] -ml-[42.5px] -mt-[42.5px] sm:-ml-[45px] sm:-mt-[45px] md:-ml-[47.5px] md:-mt-[47.5px]" 
                      style={{ 
                        animation: 'orbit4 15s linear infinite'
                      }}>
                      <div className="group relative w-full h-full flex items-center justify-center transition-all cursor-pointer hover:scale-110">
                        <Image
                          src="/images/icons/seo-logo.png"
                          alt="SEO"
                          width={80}
                          height={80}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/90 px-3 py-1.5 rounded text-xs text-white font-medium z-50">
                          SEO
                        </div>
                      </div>
                    </div>
                    
                    {/* AI Icon - Position 5 */}
                    <div 
                      className="absolute top-1/2 left-1/2 orbit-icon w-[85px] h-[85px] sm:w-[90px] sm:h-[90px] md:w-[95px] md:h-[95px] -ml-[42.5px] -mt-[42.5px] sm:-ml-[45px] sm:-mt-[45px] md:-ml-[47.5px] md:-mt-[47.5px]" 
                      style={{ 
                        animation: 'orbit5 15s linear infinite'
                      }}>
                      <div className="group relative w-full h-full flex items-center justify-center transition-all cursor-pointer hover:scale-110">
                        <Image
                          src="/images/icons/logo-aibrain.png"
                          alt="AI"
                          width={80}
                          height={80}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/90 px-3 py-1.5 rounded text-xs text-white font-medium z-50">
                          AI Tools
                        </div>
                      </div>
                    </div>
                    
                    {/* TikTok Icon - Position 6 */}
                    <div 
                      className="absolute top-1/2 left-1/2 orbit-icon w-[85px] h-[85px] sm:w-[90px] sm:h-[90px] md:w-[95px] md:h-[95px] -ml-[42.5px] -mt-[42.5px] sm:-ml-[45px] sm:-mt-[45px] md:-ml-[47.5px] md:-mt-[47.5px]" 
                      style={{ 
                        animation: 'orbit6 15s linear infinite'
                      }}>
                      <div className="group relative w-full h-full flex items-center justify-center transition-all cursor-pointer hover:scale-110">
                        <Image
                          src="/images/icons/tiktok-logo.png"
                          alt="TikTok"
                          width={80}
                          height={80}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/90 px-3 py-1.5 rounded text-xs text-white font-medium z-50">
                          TikTok Ads
                        </div>
                      </div>
                    </div>
                    
                    {/* Meta Icon - Position 7 */}
                    <div 
                      className="absolute top-1/2 left-1/2 orbit-icon w-[85px] h-[85px] sm:w-[90px] sm:h-[90px] md:w-[95px] md:h-[95px] -ml-[42.5px] -mt-[42.5px] sm:-ml-[45px] sm:-mt-[45px] md:-ml-[47.5px] md:-mt-[47.5px]" 
                      style={{ 
                        animation: 'orbit7 15s linear infinite'
                      }}>
                      <div className="group relative w-full h-full flex items-center justify-center transition-all cursor-pointer hover:scale-110">
                        <Image
                          src="/images/icons/logo-meta.png"
                          alt="Meta"
                          width={80}
                          height={80}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/90 px-3 py-1.5 rounded text-xs text-white font-medium z-50">
                          Meta Ads
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.15),transparent_65%)] pointer-events-none"></div>
                </div>
              </div>

              {/* decorazioni */}
              <div className="pointer-events-none absolute bottom-4 right-4 hidden gap-2 md:flex">
                <div className="h-8 w-8 rounded-lg bg-slate-800" />
                <div className="h-8 w-8 rounded-lg bg-slate-800" />
                <div className="h-8 w-8 rounded-lg bg-slate-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
        );
      })()}
      </section>

      <section id="use-cases" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50/8 via-white to-pink-50/5 relative" data-section="use-cases">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/15 via-transparent to-pink-50/15"></div>
        <div className="w-full max-w-7xl lg:max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">

    {/* HEADER */}
    <div className={`text-center mb-12 slide-up-enter ${visibleSections.includes('use-cases') ? 'slide-up-visible' : ''}`}>
      <p className="text-sm font-semibold text-violet-600">Perché funziona</p>
      <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight relative">
        <span 
          className={`inline-block ${visibleSections.includes('use-cases') ? 'title-gradient-sweep-active' : 'title-gradient-sweep'}`}
        >
          Un <span className="font-bold">innovativo</span> sistema <span className="font-bold">testato</span> e <span className="font-bold">sicuro</span>
        </span>
      </h2>
      <p className="mt-3 text-slate-600">
        Ecco perché siamo convinti che questo sistema sia funzionale per te e per noi.
      </p>
    </div>

    {/* VERSIONE MOBILE - Simile al desktop ma con iPhone */}
    <div className="block sm:hidden">
      <div className="flex flex-col items-center space-y-6 relative">
        {/* Items list - compatta */}
        <div className="w-full max-w-sm space-y-3">
          {ITEMS.map((it, idx) => {
            const isActive = active === idx;
            return (
              <div
                key={it.id}
                onClick={() => setActive(idx)}
                onMouseEnter={() => setActive(idx)}
                className={[
                  'rounded-2xl border-2 transition-all duration-500 shadow-sm cursor-pointer transform relative',
                  isActive ? 'border-violet-400 bg-gradient-to-r from-violet-50 to-purple-50 shadow-2xl shadow-violet-300/60 scale-[1.08] z-10' : 'border-slate-200 bg-white hover:border-slate-300 hover:scale-[1.02]'
                ].join(' ')}
              >
                {/* Freccia che punta verso l'iPhone quando attivo */}
                {isActive && (
                  <>
                    <div className="absolute left-full top-1/2 -translate-y-1/2 w-16 h-[2px] ml-[-2px] z-20">
                      <div className="w-full h-full bg-gradient-to-r from-violet-400 via-purple-400/50 to-transparent animate-pulse"></div>
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-violet-400 rounded-full animate-ping"></div>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full">
                        <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping"></div>
                      </div>
                    </div>
                    {/* Effetto glow che si espande */}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 w-48 h-20 ml-[-2px] pointer-events-none">
                      <div className="w-full h-full bg-gradient-to-r from-violet-400/20 via-purple-400/10 to-transparent blur-xl"></div>
                    </div>
                  </>
                )}
                
                <div className="relative p-4">
                  <span
                    className={[
                      'absolute left-0 top-4 h-6 w-1 rounded-r-full transition-all duration-300',
                      isActive ? 'bg-gradient-to-b from-violet-500 to-purple-600' : 'bg-slate-200'
                    ].join(' ')}
                  />
                  <div className="pl-4">
                    <h3 className={['text-base font-bold transition-colors duration-300', isActive ? 'text-slate-900' : 'text-slate-700'].join(' ')}>
                      {it.title}
                    </h3>
                    <p className={['mt-1 text-sm text-slate-600 transition-opacity duration-300', isActive ? 'opacity-100' : 'opacity-75'].join(' ')}>
                      {it.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* iPhone mockup - Realistic Design */}
        <div className="w-full flex justify-center mt-8">
          <div className="relative">
            {/* iPhone 14 Pro Style Frame */}
            <div className="relative mx-auto w-[300px] h-[600px]">
              {/* iPhone Body - Same Style as Desktop Tablet */}
              <div className="relative w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-[3rem] p-3 shadow-2xl transition-all duration-500">
                {/* Power button - Same style as tablet */}
                <div className="absolute -right-1.5 top-20 w-1.5 h-12 bg-gradient-to-r from-purple-600 to-blue-800 rounded-r-lg shadow-lg"></div>
                
                {/* Volume buttons - Same style as tablet */}
                <div className="absolute -left-1.5 top-20 w-1.5 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-l-lg shadow-lg"></div>
                <div className="absolute -left-1.5 top-32 w-1.5 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-l-lg shadow-lg"></div>
                
                {/* Screen - Same style as desktop tablet */}
                <div className="bg-black/90 rounded-[2.5rem] p-1 h-full">
                  <div className="bg-white rounded-[2rem] overflow-hidden relative h-full">
                    {/* iPhone Notch - Inside the screen, facing inward */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gradient-to-r from-purple-600 to-blue-800 rounded-b-2xl shadow-lg z-10">
                      {/* Inner notch detail */}
                      <div className="absolute inset-0.5 bg-black/90 rounded-b-xl flex items-center justify-center">
                        {/* Camera lens */}
                        <div className="w-1.5 h-1.5 bg-gray-800 rounded-full mr-1"></div>
                        {/* Speaker grille */}
                        <div className="w-6 h-0.5 bg-gray-700 rounded-full"></div>
                      </div>
                    </div>
                    {/* Video Player */}
                    <video
                      key={active}
                      className="w-full h-full object-cover transition-all duration-500"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={`/video/video${active + 1}.mp4`} type="video/mp4" />
                      {/* Fallback content with brand colors */}
                      <div 
                        className="w-full h-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
                          backgroundSize: '400% 400%',
                          animation: 'gradientShift 8s ease-in-out infinite'
                        }}
                      >
                        <div className="text-center p-6 text-white">
                          <div className="mb-3 text-5xl animate-pulse">🎬</div>
                          <h3 className="text-lg font-semibold mb-2">{ITEMS[active].title}</h3>
                          <p className="text-sm opacity-90">{ITEMS[active].desc}</p>
                        </div>
                      </div>
                    </video>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CSS Animation for Background */}
            <style jsx>{`
              @keyframes gradientShift {
                0% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
                100% {
                  background-position: 0% 50%;
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>

    {/* VERSIONE TABLET - 640px to 1170px (sm to xl) */}
    <div className="hidden sm:block xl:hidden space-y-4">
      {ITEMS.map((it, idx) => {
        const isActive = active === idx;
        return (
          <div
            key={it.id}
            onClick={() => setActive(idx)}
            className={[
              'rounded-2xl border-2 transition-all duration-300 shadow-sm cursor-pointer transform',
              isActive ? 'border-violet-400 bg-gradient-to-r from-violet-50 to-purple-50 shadow-lg' : 'border-slate-200 bg-white'
            ].join(' ')}
          >
            <div className="relative p-4">
              <span
                className={[
                  'absolute left-0 top-4 h-8 w-1 rounded-r-full transition-all duration-300',
                  isActive ? 'bg-gradient-to-b from-violet-500 to-purple-600' : 'bg-slate-200'
                ].join(' ')}
              />
              <div className="pl-4">
                <h3 className={['text-xl sm:text-2xl font-bold transition-colors duration-300', isActive ? 'text-slate-900' : 'text-slate-700'].join(' ')}>
                  {it.title}
                </h3>
                <p className={['mt-2 text-base sm:text-lg text-slate-600 transition-opacity duration-300', isActive ? 'block opacity-100' : 'block opacity-75'].join(' ')}>
                  {it.desc}
                </p>
                
                {/* VIDEO integrato nel box per tablet - proporzioni fisse 4:3 */}
                {isActive && (
                  <div className="mt-4 flex justify-center">
                    <div className="relative w-full max-w-md">
                      {/* Container con aspect ratio 4:3 */}
                      <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                        <div className="absolute inset-0 overflow-hidden rounded-xl border border-slate-200 bg-black">
                          <video
                            className="w-full h-full object-cover"
                            autoPlay={isActive}
                            loop
                            muted
                            playsInline
                          >
                            <source src={`/video/video${idx + 1}.mp4`} type="video/mp4" />
                            <div className="w-full h-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
                              <div className="text-center p-4">
                                <div className="mb-2 text-4xl animate-pulse">🎬</div>
                                <p className="text-base font-semibold text-slate-700">Video {idx + 1}</p>
                                <p className="text-sm text-slate-500 mt-1">{it.title}</p>
                              </div>
                            </div>
                          </video>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* CONTENUTO - Desktop only sopra 1170px (xl) */}
    <div className="hidden xl:grid gap-8 xl:grid-cols-[minmax(300px,420px)_800px] 2xl:grid-cols-[450px_800px] items-center min-h-[550px] justify-center">
      {/* SINISTRA - Più compatta */}
      <div className="space-y-3 flex flex-col justify-center">
        {ITEMS.map((it, idx) => {
          const isActive = active === idx;
          return (
            <div
              key={it.id}
              onClick={() => setActive(idx)}
              onMouseEnter={() => setActive(idx)}
              className={[
                'rounded-2xl border-2 transition-all duration-500 shadow-sm cursor-pointer transform relative',
                isActive ? 'border-violet-400 bg-gradient-to-r from-violet-50 to-purple-50 shadow-2xl shadow-violet-300/60 scale-[1.08] z-10' : 'border-slate-200 bg-white hover:border-slate-300 hover:scale-[1.02]'
              ].join(' ')}
            >
              {/* Effetto di espansione verso destra quando attivo - solo desktop */}
              {isActive && (
                <>
                  <div className="hidden xl:block absolute left-full top-1/2 -translate-y-1/2 w-32 h-[2px] ml-[-2px] z-20">
                    <div className="w-full h-full bg-gradient-to-r from-violet-400 via-purple-400/50 to-transparent animate-pulse"></div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-violet-400 rounded-full animate-ping"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full">
                      <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  {/* Effetto glow che si espande */}
                  <div className="hidden xl:block absolute left-full top-1/2 -translate-y-1/2 w-96 h-32 ml-[-2px] pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-r from-violet-400/20 via-purple-400/10 to-transparent blur-xl"></div>
                  </div>
                </>
              )}
              <div className="relative p-4">
                {/* barra accent */}
                <span
                  className={[
                    'absolute left-0 top-4 h-8 w-1 rounded-r-full transition-all duration-300',
                    isActive ? 'bg-gradient-to-b from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30' : 'bg-slate-200'
                  ].join(' ')}
                />
                <div className="pl-4">
                  <h3 className={['text-lg sm:text-xl font-bold transition-colors duration-300', isActive ? 'text-slate-900' : 'text-slate-700'].join(' ')}>
                    {it.title}
                  </h3>

                  {/* PARAGRAFI: su desktop SEMPRE visibili, su mobile solo se attiva */}
                  <p className={['mt-2 text-sm text-slate-600 transition-opacity duration-300', isActive ? 'block opacity-100' : 'hidden xl:block opacity-75'].join(' ')}>
                    {it.desc}
                  </p>

                  {/* VIDEO: solo mobile, e solo se attiva */}
                  <div className={['mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white xl:hidden', isActive ? 'block' : 'hidden'].join(' ')}>
                    <video
                      className="w-full h-48 object-cover"
                      autoPlay={isActive}
                      loop
                      muted
                      playsInline
                    >
                      <source src={`/video/video${idx + 1}.mp4`} type="video/mp4" />
                      <div className="w-full h-48 bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
                        <div className="text-center p-4">
                          <div className="mb-2 text-3xl animate-pulse">🎬</div>
                          <p className="text-sm font-semibold text-slate-700">Video {idx + 1}</p>
                          <p className="text-xs text-slate-400 mt-1">Video non disponibile</p>
                        </div>
                      </div>
                    </video>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DESTRA: IPHONE DESKTOP - Dimensioni fisse */}
      <div className="hidden xl:block">
        {/* iPhone Container con dimensioni fisse */}
        <div className="relative w-[800px] h-[550px] flex items-center justify-center">
          {/* iPhone Frame - Desktop Size */}
          <div className="relative mx-auto w-[400px] h-[800px] transform scale-75">
            {/* iPhone Body - Same Style as Mobile */}
            <div className="relative w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-[4rem] p-4 shadow-2xl transition-all duration-500">
              {/* Power button - Same style as mobile */}
              <div className="absolute -right-2 top-32 w-2 h-16 bg-gradient-to-r from-purple-600 to-blue-800 rounded-r-lg shadow-lg"></div>
              
              {/* Volume buttons - Same style as mobile */}
              <div className="absolute -left-2 top-32 w-2 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-l-lg shadow-lg"></div>
              <div className="absolute -left-2 top-48 w-2 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-l-lg shadow-lg"></div>
              
              {/* Screen - Same style as desktop tablet */}
              <div className="bg-black/90 rounded-[3.5rem] p-2 h-full">
                <div className="bg-white rounded-[3rem] overflow-hidden relative h-full">
                  {/* iPhone Notch - Inside the screen, facing inward */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-gradient-to-r from-purple-600 to-blue-800 rounded-b-3xl shadow-lg z-10">
                    {/* Inner notch detail */}
                    <div className="absolute inset-1 bg-black/90 rounded-b-2xl flex items-center justify-center">
                      {/* Camera lens */}
                      <div className="w-2 h-2 bg-gray-800 rounded-full mr-2"></div>
                      {/* Speaker grille */}
                      <div className="w-8 h-1 bg-gray-700 rounded-full"></div>
                    </div>
                  </div>
                  {/* Video content */}
                  {ITEMS.map((it, idx) => {
                    const show = active === idx;
                    const videoSources = [
                      '/video/video1.mp4',
                      '/video/video2.mp4', 
                      '/video/video3.mp4'
                    ];
                    
                    return (
                      <div
                        key={it.id}
                        className={[
                          'absolute inset-0 transition-all duration-700 transform origin-center',
                          show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        ].join(' ')}
                      >
                        <div className="relative w-full h-full">
                          <video
                            ref={(el) => { videoRefs.current[idx] = el; }}
                            key={`desktop-iphone-video-${idx}`}
                            className="w-full h-full object-cover"
                            autoPlay={show}
                            loop
                            muted
                            playsInline
                          >
                            <source src={videoSources[idx]} type="video/mp4" />
                            <div 
                              className="w-full h-full flex items-center justify-center"
                              style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
                                backgroundSize: '400% 400%',
                                animation: 'gradientShift 8s ease-in-out infinite'
                              }}
                            >
                              <div className="text-center p-8 text-white">
                                <div className="mb-4 text-6xl animate-pulse">🎬</div>
                                <h3 className="text-2xl font-semibold mb-3">{it.title}</h3>
                                <p className="text-base opacity-90">{it.desc}</p>
                              </div>
                            </div>
                          </video>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* iPhone Home indicator - inside the frame */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-white/40 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>








      {/* 3 Step, 0 Rischi Section */}
      <section 
        className="py-16 px-0 bg-gradient-to-br from-blue-50/15 via-white to-blue-100/10 relative"
        data-section="three-steps"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30"></div>
<div className="w-full max-w-7xl lg:max-w-[1600px] mx-auto relative z-10 px-6 lg:px-12">

          <div className={`text-center mb-16 slide-up-enter ${visibleSections.includes('three-steps') ? 'slide-up-visible' : ''}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4" style={{color: '#1c1a31'}}>
              <span className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">3 Step</span>, <span className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">0 Rischi</span>
            </h2>
            <p className="text-lg text-custom-dark max-w-3xl mx-auto">
              Il nostro processo trasparente che <span className="font-bold">elimina ogni rischio</span> per il tuo business
            </p>
          </div>
          
          {/* Mobile Tabs + Desktop Grid */}
          <div className="max-w-7xl mx-auto mb-12">
            {/* Mobile Vertical Stack - All 3 boxes stacked */}
            <div className="md:hidden space-y-6 mb-6">
              {steps.map((step, index) => {
                // Define gradient styles for mobile - same as desktop
                const gradientStyles = {
                  1: {
                    background: 'linear-gradient(135deg, #36a3e3 0%, #36a3e3 70%, #4f10e8 100%)',
                    boxShadow: '0 10px 30px rgba(54, 163, 227, 0.3)'
                  },
                  2: {
                    background: 'linear-gradient(135deg, #4f10e8 0%, #4f10e8 50%, #f712c5 100%)',
                    boxShadow: '0 10px 30px rgba(79, 16, 232, 0.3)'
                  },
                  3: {
                    background: 'linear-gradient(135deg, #f712c5 0%, #d810b0 30%, #b50d9a 60%, #920a84 100%)',
                    boxShadow: '0 10px 30px rgba(247, 18, 197, 0.2)'
                  }
                };
                const style = gradientStyles[step.id as keyof typeof gradientStyles];
                
                return (
                  <div 
                    key={step.id}
                    className="rounded-tl-3xl rounded-br-3xl p-6 border border-white/20 transform transition-all duration-300"
                    style={{
                      background: style.background,
                      boxShadow: style.boxShadow,
                      // Mobile: each box appears when you scroll to its position
                      opacity: (() => {
                        // Each box appears at different scroll progress through the section
                        const boxThreshold = index * 0.3; // Box 1: 0%, Box 2: 30%, Box 3: 60%
                        return stepBoxProgress >= boxThreshold ? 1 : 0;
                      })(),
                      // Scale effect: normal size when visible
                      scale: (() => {
                        const boxThreshold = index * 0.3;
                        return stepBoxProgress >= boxThreshold ? 1 : 0.95;
                      })(),
                      // Smooth transitions
                      transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), scale 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    } as React.CSSProperties}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-4 w-14 h-14 bg-white/90 backdrop-blur rounded-full flex items-center justify-center mx-auto font-bold"
                           style={{ color: step.id === 1 ? '#36a3e3' : step.id === 2 ? '#4f10e8' : '#f712c5' }}>
                        {step.id}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-4">
                        {step.title}
                      </h3>
                      <p className="text-white/90 leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Desktop Grid (hidden on mobile) */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-16">
              {steps.map((step, index) => {
                // Define gradient styles for each step - gradient flows from first to third box
                const gradientStyles = {
                  1: {
                    background: 'linear-gradient(135deg, #36a3e3 0%, #36a3e3 70%, #4f10e8 100%)',
                    boxShadow: '0 10px 30px rgba(54, 163, 227, 0.3)'
                  },
                  2: {
                    background: 'linear-gradient(135deg, #4f10e8 0%, #4f10e8 50%, #f712c5 100%)',
                    boxShadow: '0 10px 30px rgba(79, 16, 232, 0.3)'
                  },
                  3: {
                    background: 'linear-gradient(135deg, #f712c5 0%, #d810b0 30%, #b50d9a 60%, #920a84 100%)',
                    boxShadow: '0 10px 30px rgba(247, 18, 197, 0.2)'
                  }
                };
                const style = gradientStyles[step.id as keyof typeof gradientStyles];
                
                return (
                  <div 
                    key={step.id} 
                    className="rounded-tl-3xl rounded-br-3xl p-8 border border-white/20 transform hover:scale-105 cursor-pointer transition-transform duration-300"
                    style={{
                      background: style.background,
                      boxShadow: style.boxShadow,
                      // Progressive staggered animation based on scroll
                      // Box 1: 0-40%, Box 2: 25-65%, Box 3: 50-90% (overlapping for smoother effect)
                      opacity: (() => {
                        const boxStart = index * 0.25; // Start points: 0%, 25%, 50%
                        const boxDuration = 0.4; // Each box takes 40% of progress to appear
                        const boxProgress = (stepBoxProgress - boxStart) / boxDuration;
                        const clampedProgress = Math.min(1, Math.max(0, boxProgress));
                        // Apply smooth easing for gradual fade-in
                        return clampedProgress * clampedProgress * (3 - 2 * clampedProgress);
                      })(),
                      // Subtle scale effect during animation
                      scale: (() => {
                        const boxStart = index * 0.25;
                        const boxProgress = (stepBoxProgress - boxStart) / 0.4;
                        const clampedProgress = Math.min(1, Math.max(0, boxProgress));
                        return 0.95 + clampedProgress * 0.05; // Scale from 0.95 to 1.0
                      })(),
                      // Smooth transitions
                      transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), scale 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease'
                    } as React.CSSProperties}
                  >
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-4 w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center mx-auto font-bold"
                           style={{ color: step.id === 1 ? '#36a3e3' : step.id === 2 ? '#4f10e8' : '#f712c5' }}>
                        {step.id}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">
                        {step.title}
                      </h3>
                      <p className="text-white/90 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* CTA Button */}
          <div className={`text-center mt-12 slide-up-enter slide-up-delay-4 ${visibleSections.includes('three-steps') ? 'slide-up-visible' : ''}`}>
            <button 
              onClick={scrollToContactForm}
              className="gradient-bg-brand gradient-bg-brand-hover text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all text-sm sm:text-base transform hover:scale-105"
            >
              <FaRocket className="inline mr-2" /> Proponi il tuo Brand
            </button>
          </div>
        </div>
      </section>

     

      {/* Google Ads Section */}
     <section 
  id="servizi" 
className="py-16 px-0 bg-gradient-to-br from-blue-50/15 via-white to-blue-100/10 relative"
  data-section="google-ads"
>
  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30"></div>
  
  
<div className="w-full max-w-7xl mx-auto relative z-10 px-6 lg:px-12">

    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`space-y-6 lg:space-y-8 slide-up-enter slide-up-delay-1 ${visibleSections.includes('google-ads') ? 'slide-up-visible' : ''}`}>
              <div className="inline-block px-3 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 rounded-full text-xs sm:text-sm">
                Google Ads
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{color: '#1c1a31'}}>
                Strategie Pubblicitarie Su <span className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">Google Ads</span>
              </h2>
              
              {/* Dashboard Box - mobile only, under title */}
              <div className={`lg:hidden dashboard-window-drop bg-white rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 relative ${visibleSections.includes('google-ads') ? 'visible' : ''}`}>
                {/* Dashboard Header - Always visible first */}
                <div className={`dashboard-header p-4 sm:p-6 pb-3 border-b border-gray-100 ${visibleSections.includes('google-ads') ? 'visible' : ''}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm sm:text-base text-gray-800">Google Ads Dashboard</span>
                    {/* Google Ads Logo */}
                    <div className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                        <polygon fill="#ffc107" points="30.129,15.75 18.871,9.25 5.871,31.25 17.129,37.75"/>
                        <path fill="#1e88e5" d="M31.871,37.75c1.795,3.109,5.847,4.144,8.879,2.379c3.103-1.806,4.174-5.77,2.379-8.879l-13-22 c-1.795-3.109-5.835-4.144-8.879-2.379c-3.106,1.801-4.174,5.77-2.379,8.879L31.871,37.75z"/>
                        <circle cx="11.5" cy="34.5" r="6.5" fill="#43a047"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Dashboard Content - Animates after header */}
                <div className={`dashboard-content p-4 sm:p-6 pt-3 ${visibleSections.includes('google-ads') ? 'visible' : ''}`}>
                
                {/* Main Metrics - 2 big boxes */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3">
                  {/* Ricavi - Primary metric in green */}
                  <div className={`metric-box bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-5 rounded-xl border border-green-200 hover:shadow-lg transition-shadow ${visibleSections.includes('google-ads') ? 'visible' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider mb-2">Ricavi</p>
                        <p className="text-2xl sm:text-3xl font-bold text-green-700">€238.554</p>
                      </div>
                      <span className="text-green-500 text-xl sm:text-2xl">📈</span>
                    </div>
                  </div>
                  
                  {/* ROAS - Primary metric in purple gradient */}
                  <div className={`metric-box bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 p-4 sm:p-5 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow ${visibleSections.includes('google-ads') ? 'visible' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider mb-2">ROAS</p>
                        <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">20,8x</p>
                      </div>
                      <span className="text-purple-500 text-xl sm:text-2xl">🚀</span>
                    </div>
                  </div>
                </div>
                
                {/* Secondary Metrics - 2 smaller boxes */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                  {/* Spesa in blue */}
                  <div className={`metric-box bg-blue-50/50 p-3 sm:p-4 rounded-lg border border-blue-100 ${visibleSections.includes('google-ads') ? 'visible' : ''}`}>
                    <span className="text-blue-400 text-sm">💰</span>
                    <p className="text-xs text-gray-600 uppercase tracking-wider mt-1">Spesa Ads</p>
                    <p className="text-lg sm:text-xl font-bold text-blue-700">€11.456</p>
                  </div>
                  
                  {/* Conversioni */}
                  <div className={`metric-box bg-purple-50/50 p-3 sm:p-4 rounded-lg border border-purple-100 ${visibleSections.includes('google-ads') ? 'visible' : ''}`}>
                    <span className="text-purple-400 text-sm">✓</span>
                    <p className="text-xs text-gray-600 uppercase tracking-wider mt-1">Conversioni</p>
                    <p className="text-lg sm:text-xl font-bold text-purple-700">3.951</p>
                  </div>
                </div>
                
                {/* Simplified Message Box */}
                <div className={`chart-box bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6 sm:p-8 rounded-lg ${visibleSections.includes('google-ads') ? 'visible' : ''}`}>
                  <div className="text-center">
                    <p 
                      className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 leading-relaxed"
                      style={{
                        animation: visibleSections.includes('google-ads') ? 'gentle-pulse 2.5s ease-in-out infinite' : 'none',
                        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) 1.2s',
                        opacity: visibleSections.includes('google-ads') ? '1' : '0'
                      }}
                    >
                      👉 Il <span className="font-bold text-green-700">95% del fatturato</span> resta al <span className="font-bold text-green-700">tuo brand</span>.
                    </p>
                    <p 
                      className="text-sm :text-base text-gray-600 mt-3"
                      style={{
                        opacity: visibleSections.includes('google-ads') ? '1' : '0',
                        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) 1.5s'
                      }}
                    >
                      Solo il 5% viene investito in pubblicità per generare il 95% dei tuoi ricavi.
                    </p>
                  </div>
                </div>
                </div>
              </div>
              
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Investiamo nelle tue campagne <span className="font-bold">Google Ads</span> con <span className="font-bold">keyword vincenti</span> e <span className="font-bold">creatività ottimizzate</span> per massimizzare le conversioni. <br />
                Se non funziona, <span className="font-bold">copriamo noi le perdite</span>.
              </p>
              <button 
                onClick={scrollToContactForm}
                className="gradient-bg-brand gradient-bg-brand-hover text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all text-sm sm:text-base transform hover:scale-105"
              >
                <FaEnvelope className="inline mr-2" /> Candidati
              </button>
            </div>
            
            {/* Desktop Dashboard - right side */}
            <div className="hidden lg:block">
              <div className={`dashboard-window-drop bg-white rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 relative ${visibleSections.includes('google-ads') ? 'visible' : ''}`}>
                {/* Dashboard Header - Always visible first */}
                <div className={`dashboard-header p-6 lg:p-8 pb-4 border-b border-gray-100 ${visibleSections.includes('google-ads') ? 'visible' : ''}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg text-gray-800">Google Ads Dashboard</span>
                    {/* Google Ads Logo */}
                    <div className="w-12 h-12 hover:scale-110 transition-transform cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                        <polygon fill="#ffc107" points="30.129,15.75 18.871,9.25 5.871,31.25 17.129,37.75"/>
                        <path fill="#1e88e5" d="M31.871,37.75c1.795,3.109,5.847,4.144,8.879,2.379c3.103-1.806,4.174-5.77,2.379-8.879l-13-22 c-1.795-3.109-5.835-4.144-8.879-2.379c-3.106,1.801-4.174,5.77-2.379,8.879L31.871,37.75z"/>
                        <circle cx="11.5" cy="34.5" r="6.5" fill="#43a047"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Dashboard Content - Animates after header */}
                <div className={`dashboard-content p-6 lg:p-8 pt-4 ${visibleSections.includes('google-ads') ? 'visible' : ''}`}>
                
                {/* Main Metrics - 2 big boxes */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Ricavi - Primary metric in green */}
                  <div className={`metric-box bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200 hover:shadow-lg transition-shadow ${visibleSections.includes('google-ads') ? 'visible' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 uppercase tracking-wider mb-2">Ricavi</p>
                        <p className="text-3xl font-bold text-green-700">€238.554</p>
                      </div>
                      <span className="text-green-500 text-2xl">📈</span>
                    </div>
                  </div>
                  
                  {/* ROAS - Primary metric in purple gradient */}
                  <div className={`metric-box bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 p-5 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow ${visibleSections.includes('google-ads') ? 'visible' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 uppercase tracking-wider mb-2">ROAS</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">20,8x</p>
                      </div>
                      <span className="text-purple-500 text-2xl">🚀</span>
                    </div>
                  </div>
                </div>
                
                {/* Secondary Metrics - 2 smaller boxes */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Spesa in blue */}
                  <div className={`metric-box bg-blue-50/50 p-4 rounded-lg border border-blue-100 ${visibleSections.includes('google-ads') ? 'visible' : ''}`}>
                    <span className="text-blue-400 text-sm">💰</span>
                    <p className="text-xs text-gray-600 uppercase tracking-wider mt-1">Spesa Ads</p>
                    <p className="text-xl font-bold text-blue-700">€11.456</p>
                  </div>
                  
                  {/* Conversioni */}
                  <div className={`metric-box bg-purple-50/50 p-4 rounded-lg border border-purple-100 ${visibleSections.includes('google-ads') ? 'visible' : ''}`}>
                    <span className="text-purple-400 text-sm">✓</span>
                    <p className="text-xs text-gray-600 uppercase tracking-wider mt-1">Conversioni</p>
                    <p className="text-xl font-bold text-purple-700">3.951</p>
                  </div>
                </div>
                
                {/* Simplified Message Box Desktop */}
                <div className={`chart-box bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-8 rounded-lg ${visibleSections.includes('google-ads') ? 'visible' : ''}`}>
                  <div className="text-center">
                    <p 
                      className="text-2xl lg:text-3xl font-semibold text-gray-800 leading-relaxed"
                      style={{
                        animation: visibleSections.includes('google-ads') ? 'gentle-pulse 2.5s ease-in-out infinite' : 'none',
                        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) 1.2s',
                        opacity: visibleSections.includes('google-ads') ? '1' : '0'
                      }}
                    >
                      👉 Il <span className="font-bold text-green-700">95% del fatturato</span> resta al <span className="font-bold text-green-700">tuo brand</span>.
                    </p>
                    <p 
                      className="text-base lg:text-lg text-gray-600 mt-4"
                      style={{
                        opacity: visibleSections.includes('google-ads') ? '1' : '0',
                        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) 1.5s'
                      }}
                    >
                      Solo il 5% viene investito in pubblicità per generare il 95% dei tuoi ricavi.
                    </p>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meta Ads Section */}
      <section 
        id="meta-ads" 
        className="py-16 px-0 bg-gradient-to-br from-purple-50/15 via-white to-pink-50/10 relative"
        data-section="meta-ads"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/30 via-transparent to-pink-50/30"></div>
        
        <div className="w-full max-w-7xl mx-auto relative z-10 px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Text content for Meta Ads */}
            <div className={`lg:order-2 space-y-6 lg:space-y-8 slide-up-enter slide-up-delay-1 ${visibleSections.includes('meta-ads') ? 'slide-up-visible' : ''}`}>
              <div className="inline-block px-3 py-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-full text-xs sm:text-sm">
                Meta Ads
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{color: '#1c1a31'}}>
                Campagne Pubblicitarie Su <span className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">Meta Ads</span>
              </h2>
              
              {/* Dashboard Box - mobile only, under title */}
              <div className={`lg:hidden dashboard-window-drop ${visibleSections.includes('meta-ads') ? 'visible' : ''}`}>
                {/* Dashboard Header */}
                <div className="dashboard-header bg-white rounded-t-2xl border border-gray-200 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 p-4 relative">
                  {/* Meta Logo in Corner */}
                  <div className="absolute top-3 right-3 w-12 h-12 opacity-100 hover:scale-110 transition-transform cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                      <path fill="#0081fb" d="M47,29.36l-2.193,1.663L42.62,29.5c0-0.16,0-0.33-0.01-0.5c0-0.16,0-0.33-0.01-0.5c-0.14-3.94-1.14-8.16-3.14-11.25c-1.54-2.37-3.51-3.5-5.71-3.5c-2.31,0-4.19,1.38-6.27,4.38c-0.06,0.09-0.13,0.18-0.19,0.28c-0.04,0.05-0.07,0.1-0.11,0.16c-0.1,0.15-0.2,0.3-0.3,0.46c-0.9,1.4-1.84,3.03-2.86,4.83c-0.09,0.17-0.19,0.34-0.28,0.51c-0.03,0.04-0.06,0.09-0.08,0.13l-0.21,0.37l-1.24,2.19c-2.91,5.15-3.65,6.33-5.1,8.26C14.56,38.71,12.38,40,9.51,40c-3.4,0-5.56-1.47-6.89-3.69C1.53,34.51,1,32.14,1,29.44l4.97,0.17c0,1.76,0.38,3.1,0.89,3.92C7.52,34.59,8.49,35,9.5,35c1.29,0,2.49-0.27,4.77-3.43c1.83-2.53,3.99-6.07,5.44-8.3l1.37-2.09l0.29-0.46l0.3-0.45l0.5-0.77c0.76-1.16,1.58-2.39,2.46-3.57c0.1-0.14,0.2-0.28,0.31-0.42c0.1-0.14,0.21-0.28,0.31-0.41c0.9-1.15,1.85-2.22,2.87-3.1c1.85-1.61,3.84-2.5,5.85-2.5c3.37,0,6.58,1.95,9.04,5.61c2.51,3.74,3.82,8.4,3.97,13.25c0.01,0.16,0.01,0.33,0.01,0.5C47,29.03,47,29.19,47,29.36z"/>
                      <linearGradient id="metaGrad1" x1="42.304" x2="13.533" y1="24.75" y2="24.75" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#0081fb"/>
                        <stop offset=".995" stopColor="#0064e1"/>
                      </linearGradient>
                      <path fill="url(#metaGrad1)" d="M4.918,15.456C7.195,11.951,10.483,9.5,14.253,9.5c2.184,0,4.354,0.645,6.621,2.493c2.479,2.02,5.122,5.346,8.419,10.828l1.182,1.967c2.854,4.746,4.477,7.187,5.428,8.339C37.125,34.606,37.888,35,39,35c2.82,0,3.617-2.54,3.617-5.501L47,29.362c0,3.095-0.611,5.369-1.651,7.165C44.345,38.264,42.387,40,39.093,40c-2.048,0-3.862-0.444-5.868-2.333c-1.542-1.45-3.345-4.026-4.732-6.341l-4.126-6.879c-2.07-3.452-3.969-6.027-5.068-7.192c-1.182-1.254-2.642-2.754-5.067-2.754c-1.963,0-3.689,1.362-5.084,3.465L4.918,15.456z"/>
                      <linearGradient id="metaGrad2" x1="7.635" x2="7.635" y1="32.87" y2="13.012" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#0081fb"/>
                        <stop offset=".995" stopColor="#0064e1"/>
                      </linearGradient>
                      <path fill="url(#metaGrad2)" d="M14.25,14.5c-1.959,0-3.683,1.362-5.075,3.465C7.206,20.937,6,25.363,6,29.614c0,1.753-0.003,3.072,0.5,3.886l-3.84,2.813C1.574,34.507,1,32.2,1,29.5c0-4.91,1.355-10.091,3.918-14.044C7.192,11.951,10.507,9.5,14.27,9.5L14.25,14.5z"/>
                    </svg>
                  </div>
                  
                  {/* Mock Meta Ads Interface */}
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-sm sm:text-base text-gray-800">Meta Business Suite</span>
                  </div>
                </div>
                
                {/* Dashboard Content */}
                <div className="dashboard-content bg-white rounded-b-2xl border border-t-0 border-gray-200 p-4">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <div className="metric-box text-center bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg">
                      <div className="text-lg sm:text-2xl font-bold text-gray-800">
                        {useCountUp(892341, 2000, visibleSections.includes('meta-ads')).toLocaleString('it-IT')}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Reach</div>
                    </div>
                    <div className="metric-box text-center bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg">
                      <div className="text-lg sm:text-2xl font-bold text-gray-800">
                        €{useCountUp(15234, 2000, visibleSections.includes('meta-ads')).toLocaleString('it-IT')}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Spesa</div>
                    </div>
                    <div className="metric-box text-center bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg">
                      <div className="text-lg sm:text-2xl font-bold text-gray-800">
                        €{useCountUp(312456, 2000, visibleSections.includes('meta-ads')).toLocaleString('it-IT')}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Ricavi</div>
                    </div>
                  </div>
                  
                  {/* Mock Chart */}
                  <div className="chart-box bg-gradient-to-r from-blue-100 to-purple-100 border border-purple-200 p-3 sm:p-4 rounded-lg">
                    <div className="h-24 sm:h-32 flex items-end space-x-1">
                      {[50, 75, 55, 85, 65, 90, 70, 85, 95, 85, 80, 100].map((height, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-purple-600 rounded-t transform hover:scale-110 transition-transform duration-300" style={{height: `${height}%`, animationDelay: `${i * 0.1}s`}}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Sfruttiamo il potere di <span className="font-bold">Facebook e Instagram</span> per raggiungere il tuo pubblico ideale con campagne mirate e altamente personalizzate. <br />
                Il nostro team di esperti crea <span className="font-bold">contenuti virali</span> e <span className="font-bold">strategie di targeting avanzate</span> per massimizzare l'engagement e le conversioni. <br />
                Con Meta Ads, <span className="font-bold">investiamo sul tuo successo</span> e condividiamo i risultati.
              </p>
              <button 
                onClick={scrollToContactForm}
                className="gradient-bg-brand gradient-bg-brand-hover text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all text-sm sm:text-base transform hover:scale-105"
              >
                <FaEnvelope className="inline mr-2" /> Candidati
              </button>
            </div>
            
            {/* Desktop Dashboard - left side */}
            <div className={`lg:order-1 hidden lg:block dashboard-window-drop ${visibleSections.includes('meta-ads') ? 'visible' : ''}`}>
              {/* Dashboard Header */}
              <div className="dashboard-header bg-white rounded-t-2xl border border-gray-200 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 p-6 relative">
                {/* Meta Logo in Corner */}
                <div className="absolute top-4 right-4 w-14 h-14 opacity-100 hover:scale-110 transition-transform cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                    <path fill="#0081fb" d="M47,29.36l-2.193,1.663L42.62,29.5c0-0.16,0-0.33-0.01-0.5c0-0.16,0-0.33-0.01-0.5c-0.14-3.94-1.14-8.16-3.14-11.25c-1.54-2.37-3.51-3.5-5.71-3.5c-2.31,0-4.19,1.38-6.27,4.38c-0.06,0.09-0.13,0.18-0.19,0.28c-0.04,0.05-0.07,0.1-0.11,0.16c-0.1,0.15-0.2,0.3-0.3,0.46c-0.9,1.4-1.84,3.03-2.86,4.83c-0.09,0.17-0.19,0.34-0.28,0.51c-0.03,0.04-0.06,0.09-0.08,0.13l-0.21,0.37l-1.24,2.19c-2.91,5.15-3.65,6.33-5.1,8.26C14.56,38.71,12.38,40,9.51,40c-3.4,0-5.56-1.47-6.89-3.69C1.53,34.51,1,32.14,1,29.44l4.97,0.17c0,1.76,0.38,3.1,0.89,3.92C7.52,34.59,8.49,35,9.5,35c1.29,0,2.49-0.27,4.77-3.43c1.83-2.53,3.99-6.07,5.44-8.3l1.37-2.09l0.29-0.46l0.3-0.45l0.5-0.77c0.76-1.16,1.58-2.39,2.46-3.57c0.1-0.14,0.2-0.28,0.31-0.42c0.1-0.14,0.21-0.28,0.31-0.41c0.9-1.15,1.85-2.22,2.87-3.1c1.85-1.61,3.84-2.5,5.85-2.5c3.37,0,6.58,1.95,9.04,5.61c2.51,3.74,3.82,8.4,3.97,13.25c0.01,0.16,0.01,0.33,0.01,0.5C47,29.03,47,29.19,47,29.36z"/>
                    <linearGradient id="metaGrad3" x1="42.304" x2="13.533" y1="24.75" y2="24.75" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stop-color="#0081fb"/>
                      <stop offset=".995" stop-color="#0064e1"/>
                    </linearGradient>
                    <path fill="url(#metaGrad3)" d="M4.918,15.456C7.195,11.951,10.483,9.5,14.253,9.5c2.184,0,4.354,0.645,6.621,2.493c2.479,2.02,5.122,5.346,8.419,10.828l1.182,1.967c2.854,4.746,4.477,7.187,5.428,8.339C37.125,34.606,37.888,35,39,35c2.82,0,3.617-2.54,3.617-5.501L47,29.362c0,3.095-0.611,5.369-1.651,7.165C44.345,38.264,42.387,40,39.093,40c-2.048,0-3.862-0.444-5.868-2.333c-1.542-1.45-3.345-4.026-4.732-6.341l-4.126-6.879c-2.07-3.452-3.969-6.027-5.068-7.192c-1.182-1.254-2.642-2.754-5.067-2.754c-1.963,0-3.689,1.362-5.084,3.465L4.918,15.456z"/>
                    <linearGradient id="metaGrad4" x1="7.635" x2="7.635" y1="32.87" y2="13.012" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stop-color="#0081fb"/>
                      <stop offset=".995" stop-color="#0064e1"/>
                    </linearGradient>
                    <path fill="url(#metaGrad4)" d="M14.25,14.5c-1.959,0-3.683,1.362-5.075,3.465C7.206,20.937,6,25.363,6,29.614c0,1.753-0.003,3.072,0.5,3.886l-3.84,2.813C1.574,34.507,1,32.2,1,29.5c0-4.91,1.355-10.091,3.918-14.044C7.192,11.951,10.507,9.5,14.27,9.5L14.25,14.5z"/>
                  </svg>
                </div>
                
                {/* Mock Meta Ads Interface */}
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-base text-gray-800">Meta Business Suite</span>
                </div>
              </div>
              
              {/* Dashboard Content */}
              <div className="dashboard-content bg-white rounded-b-2xl border border-t-0 border-gray-200 p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="metric-box text-center bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">
                      {useCountUp(892341, 2000, visibleSections.includes('meta-ads')).toLocaleString('it-IT')}
                    </div>
                    <div className="text-sm text-gray-600">Reach</div>
                  </div>
                  <div className="metric-box text-center bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">
                      €{useCountUp(15234, 2000, visibleSections.includes('meta-ads')).toLocaleString('it-IT')}
                    </div>
                    <div className="text-sm text-gray-600">Spesa</div>
                  </div>
                  <div className="metric-box text-center bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">
                      €{useCountUp(312456, 2000, visibleSections.includes('meta-ads')).toLocaleString('it-IT')}
                    </div>
                    <div className="text-sm text-gray-600">Ricavi</div>
                  </div>
                </div>
                
                {/* Mock Chart */}
                <div className="chart-box bg-gradient-to-r from-blue-100 to-purple-100 border border-purple-200 p-4 rounded-lg">
                  <div className="h-32 flex items-end space-x-1">
                    {[50, 75, 55, 85, 65, 90, 70, 85, 95, 85, 80, 100].map((height, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-purple-600 rounded-t transform hover:scale-110 transition-transform duration-300" style={{height: `${height}%`, animationDelay: `${i * 0.1}s`}}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TikTok Ads Section */}
      <section 
        id="tiktok-ads" 
        className="py-16 px-0 bg-gradient-to-br from-pink-50/15 via-white to-purple-50/10 relative"
        data-section="tiktok-ads"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-50/30 via-transparent to-purple-50/30"></div>
        
        <div className="w-full max-w-7xl mx-auto relative z-10 px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`space-y-6 lg:space-y-8 slide-up-enter slide-up-delay-1 ${visibleSections.includes('tiktok-ads') ? 'slide-up-visible' : ''}`}>
              <div className="inline-block px-3 py-2 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200 rounded-full text-xs sm:text-sm">
                TikTok Ads
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{color: '#1c1a31'}}>
                Viralità e Vendite con <span className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">TikTok Ads</span>
              </h2>
              
              {/* Dashboard Box - mobile only, under title */}
              <div className={`lg:hidden dashboard-window-drop ${visibleSections.includes('tiktok-ads') ? 'visible' : ''}`}>
                {/* Dashboard Header */}
                <div className="dashboard-header bg-white rounded-t-2xl border border-gray-200 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 p-4 relative">
                  {/* TikTok Logo in Corner */}
                  <div className="absolute top-3 right-3 w-12 h-12 opacity-100 hover:scale-110 transition-transform cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="48px" height="48px" fillRule="nonzero">
                    <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="middle">
                      <g transform="scale(5.33333,5.33333)">
                        <path d="M20,37c2.761,0 5,-2.239 5,-5v-1v-1v-23.93h5.208c-0.031,-0.14 -0.072,-0.276 -0.097,-0.419h-0.001c-0.044,-0.248 -0.076,-0.495 -0.099,-0.746v-0.835h-7.011v23.93v1v1c0,2.761 -2.239,5 -5,5c-0.864,0 -1.665,-0.239 -2.375,-0.625c0.848,1.556 2.478,2.625 4.375,2.625z" fill="#3dd9eb"></path>
                        <path d="M33.718,11.407c-0.797,-1.094 -1.364,-2.367 -1.607,-3.756h-0.001c-0.044,-0.248 -0.076,-0.495 -0.099,-0.746v-0.835h-1.803c0.491,2.182 1.761,4.062 3.51,5.337z" fill="#f55376"></path>
                        <path d="M18,25c-2.761,0 -5,2.239 -5,5c0,1.897 1.069,3.527 2.625,4.375c-0.386,-0.71 -0.625,-1.511 -0.625,-2.375c0,-2.761 2.239,-5 5,-5c0.343,0 0.677,0.035 1,0.101v-7.05c-0.331,-0.028 -0.662,-0.051 -1,-0.051c-0.338,0 -0.669,0.023 -1,0.05v5.05c-0.323,-0.065 -0.657,-0.1 -1,-0.1z" fill="#f55376"></path>
                        <path d="M36.257,13.783c0.867,0.541 1.819,0.908 2.806,1.131v-0.376v-0.002v-1.381c-1.7,0.003 -3.364,-0.473 -4.806,-1.373c-0.186,-0.116 -0.361,-0.247 -0.538,-0.376c0.687,0.945 1.544,1.757 2.538,2.377z" fill="#3dd9eb"></path>
                        <path d="M19,20.05v-2c-0.331,-0.027 -0.662,-0.05 -1,-0.05c-6.627,0 -12,5.373 -12,12c0,3.824 1.795,7.222 4.581,9.419c-1.612,-2.042 -2.581,-4.615 -2.581,-7.419c0,-6.29 4.842,-11.44 11,-11.95z" fill="#3dd9eb"></path>
                        <path d="M39.062,14.914v4.733c-3.375,0 -6.501,-1.071 -9.052,-2.894l0.003,13.247l-0.014,-0.018c0,0.006 0.001,0.012 0.001,0.018c0,6.627 -5.373,12 -12,12c-2.804,0 -5.377,-0.969 -7.419,-2.581c2.197,2.786 5.595,4.581 9.419,4.581c6.627,0 12,-5.373 12,-12c0,-0.006 -0.001,-0.012 -0.001,-0.018l0.014,0.018l-0.002,-13.248c2.551,1.823 5.677,2.894 9.052,2.894v-5.108v-0.002v-1.381c-0.678,0.002 -1.346,-0.094 -2.001,-0.241z" fill="#f55376"></path>
                        <path d="M30,30c0,-0.006 -0.001,-0.012 -0.001,-0.018l0.014,0.018l-0.002,-13.248c2.551,1.823 5.677,2.894 9.052,2.894v-4.733c-0.987,-0.223 -1.939,-0.59 -2.806,-1.131c-0.994,-0.62 -1.851,-1.432 -2.538,-2.376c-1.75,-1.275 -3.019,-3.155 -3.51,-5.337h-5.209v23.931v1v1c0,2.761 -2.239,5 -5,5c-1.897,0 -3.527,-1.069 -4.375,-2.625c-1.556,-0.848 -2.625,-2.478 -2.625,-4.375c0,-2.761 2.239,-5 5,-5c0.343,0 0.677,0.035 1,0.101v-5.05c-6.158,0.509 -11,5.659 -11,11.949c0,2.804 0.969,5.377 2.581,7.419c2.042,1.612 4.615,2.581 7.419,2.581c6.627,0 12,-5.373 12,-12z" fill="#000000"></path>
                      </g>
                    </g>
                    </svg>
                  </div>
                  
                  {/* Mock TikTok Ads Interface */}
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-sm sm:text-base text-gray-800">TikTok Ads Manager</span>
                  </div>
                </div>
                
                {/* Dashboard Content */}
                <div className="dashboard-content bg-white rounded-b-2xl border border-t-0 border-gray-200 p-4">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <div className="metric-box text-center bg-gradient-to-br from-pink-50 to-purple-50 p-3 rounded-lg">
                      <div className="text-lg sm:text-2xl font-bold text-gray-800">
                        {useCountUp(1456789, 2000, visibleSections.includes('tiktok-ads')).toLocaleString('it-IT')}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Views</div>
                    </div>
                    <div className="metric-box text-center bg-gradient-to-br from-pink-50 to-purple-50 p-3 rounded-lg">
                      <div className="text-lg sm:text-2xl font-bold text-gray-800">
                        €{useCountUp(8345, 2000, visibleSections.includes('tiktok-ads')).toLocaleString('it-IT')}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Spesa</div>
                    </div>
                    <div className="metric-box text-center bg-gradient-to-br from-pink-50 to-purple-50 p-3 rounded-lg">
                      <div className="text-lg sm:text-2xl font-bold text-gray-800">
                        €{useCountUp(187432, 2000, visibleSections.includes('tiktok-ads')).toLocaleString('it-IT')}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Ricavi</div>
                    </div>
                  </div>
                  
                  {/* Mock Chart */}
                  <div className="chart-box bg-gradient-to-r from-pink-100 to-black/10 border border-pink-200 p-3 sm:p-4 rounded-lg">
                    <div className="h-24 sm:h-32 flex items-end space-x-1">
                      {[60, 80, 70, 95, 85, 100, 90, 85, 75, 90, 95, 85].map((height, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-pink-600 to-black rounded-t transform hover:scale-110 transition-transform duration-300" style={{height: `${height}%`, animationDelay: `${i * 0.1}s`}}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Cavalchiamo l'onda del <span className="font-bold">social più in crescita</span> per portare il tuo brand davanti a milioni di utenti attivi. <br />
                Creiamo <span className="font-bold">contenuti nativi</span> che si integrano perfettamente nel feed, generando <span className="font-bold">viralità organica</span> e conversioni immediate. <br />
                TikTok è il futuro del marketing, e noi <span className="font-bold">investiamo per garantirti risultati concreti</span>.
              </p>
              <button 
                onClick={scrollToContactForm}
                className="gradient-bg-brand gradient-bg-brand-hover text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all text-sm sm:text-base transform hover:scale-105"
              >
                <FaEnvelope className="inline mr-2" /> Candidati
              </button>
            </div>
            
            {/* Desktop Dashboard - right side */}
            <div className={`hidden lg:block dashboard-window-drop ${visibleSections.includes('tiktok-ads') ? 'visible' : ''}`}>
              {/* Dashboard Header */}
              <div className="dashboard-header bg-white rounded-t-2xl border border-gray-200 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 p-6 relative">
                {/* TikTok Logo in Corner */}
                <div className="absolute top-4 right-4 w-14 h-14 opacity-100 hover:scale-110 transition-transform cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="48px" height="48px" fillRule="nonzero">
                    <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="middle">
                      <g transform="scale(5.33333,5.33333)">
                        <path d="M20,37c2.761,0 5,-2.239 5,-5v-1v-1v-23.93h5.208c-0.031,-0.14 -0.072,-0.276 -0.097,-0.419h-0.001c-0.044,-0.248 -0.076,-0.495 -0.099,-0.746v-0.835h-7.011v23.93v1v1c0,2.761 -2.239,5 -5,5c-0.864,0 -1.665,-0.239 -2.375,-0.625c0.848,1.556 2.478,2.625 4.375,2.625z" fill="#3dd9eb"></path>
                        <path d="M33.718,11.407c-0.797,-1.094 -1.364,-2.367 -1.607,-3.756h-0.001c-0.044,-0.248 -0.076,-0.495 -0.099,-0.746v-0.835h-1.803c0.491,2.182 1.761,4.062 3.51,5.337z" fill="#f55376"></path>
                        <path d="M18,25c-2.761,0 -5,2.239 -5,5c0,1.897 1.069,3.527 2.625,4.375c-0.386,-0.71 -0.625,-1.511 -0.625,-2.375c0,-2.761 2.239,-5 5,-5c0.343,0 0.677,0.035 1,0.101v-7.05c-0.331,-0.028 -0.662,-0.051 -1,-0.051c-0.338,0 -0.669,0.023 -1,0.05v5.05c-0.323,-0.065 -0.657,-0.1 -1,-0.1z" fill="#f55376"></path>
                        <path d="M36.257,13.783c0.867,0.541 1.819,0.908 2.806,1.131v-0.376v-0.002v-1.381c-1.7,0.003 -3.364,-0.473 -4.806,-1.373c-0.186,-0.116 -0.361,-0.247 -0.538,-0.376c0.687,0.945 1.544,1.757 2.538,2.377z" fill="#3dd9eb"></path>
                        <path d="M19,20.05v-2c-0.331,-0.027 -0.662,-0.05 -1,-0.05c-6.627,0 -12,5.373 -12,12c0,3.824 1.795,7.222 4.581,9.419c-1.612,-2.042 -2.581,-4.615 -2.581,-7.419c0,-6.29 4.842,-11.44 11,-11.95z" fill="#3dd9eb"></path>
                        <path d="M39.062,14.914v4.733c-3.375,0 -6.501,-1.071 -9.052,-2.894l0.003,13.247l-0.014,-0.018c0,0.006 0.001,0.012 0.001,0.018c0,6.627 -5.373,12 -12,12c-2.804,0 -5.377,-0.969 -7.419,-2.581c2.197,2.786 5.595,4.581 9.419,4.581c6.627,0 12,-5.373 12,-12c0,-0.006 -0.001,-0.012 -0.001,-0.018l0.014,0.018l-0.002,-13.248c2.551,1.823 5.677,2.894 9.052,2.894v-5.108v-0.002v-1.381c-0.678,0.002 -1.346,-0.094 -2.001,-0.241z" fill="#f55376"></path>
                        <path d="M30,30c0,-0.006 -0.001,-0.012 -0.001,-0.018l0.014,0.018l-0.002,-13.248c2.551,1.823 5.677,2.894 9.052,2.894v-4.733c-0.987,-0.223 -1.939,-0.59 -2.806,-1.131c-0.994,-0.62 -1.851,-1.432 -2.538,-2.376c-1.75,-1.275 -3.019,-3.155 -3.51,-5.337h-5.209v23.931v1v1c0,2.761 -2.239,5 -5,5c-1.897,0 -3.527,-1.069 -4.375,-2.625c-1.556,-0.848 -2.625,-2.478 -2.625,-4.375c0,-2.761 2.239,-5 5,-5c0.343,0 0.677,0.035 1,0.101v-5.05c-6.158,0.509 -11,5.659 -11,11.949c0,2.804 0.969,5.377 2.581,7.419c2.042,1.612 4.615,2.581 7.419,2.581c6.627,0 12,-5.373 12,-12z" fill="#000000"></path>
                      </g>
                    </g>
                  </svg>
                </div>
                
                {/* Mock TikTok Ads Interface */}
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-base text-gray-800">TikTok Ads Manager</span>
                </div>
              </div>
              
              {/* Dashboard Content */}
              <div className="dashboard-content bg-white rounded-b-2xl border border-t-0 border-gray-200 p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="metric-box text-center bg-gradient-to-br from-pink-50 to-purple-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">
                      {useCountUp(1456789, 2000, visibleSections.includes('tiktok-ads')).toLocaleString('it-IT')}
                    </div>
                    <div className="text-sm text-gray-600">Views</div>
                  </div>
                  <div className="metric-box text-center bg-gradient-to-br from-pink-50 to-purple-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">
                      €{useCountUp(8345, 2000, visibleSections.includes('tiktok-ads')).toLocaleString('it-IT')}
                    </div>
                    <div className="text-sm text-gray-600">Spesa</div>
                  </div>
                  <div className="metric-box text-center bg-gradient-to-br from-pink-50 to-purple-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">
                      €{useCountUp(187432, 2000, visibleSections.includes('tiktok-ads')).toLocaleString('it-IT')}
                    </div>
                    <div className="text-sm text-gray-600">Ricavi</div>
                  </div>
                </div>
                
                {/* Mock Chart */}
                <div className="chart-box bg-gradient-to-r from-pink-100 to-black/10 border border-pink-200 p-4 rounded-lg">
                  <div className="h-32 flex items-end space-x-1">
                    {[60, 80, 70, 95, 85, 100, 90, 85, 75, 90, 95, 85].map((height, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-pink-600 to-black rounded-t transform hover:scale-110 transition-transform duration-300" style={{height: `${height}%`, animationDelay: `${i * 0.1}s`}}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

<section className="py-12 bg-gray-50" data-section="testimonials">
    {/* Titolo */}
    <div className={`max-w-[1200px] mx-auto text-center mb-12 px-4 slide-up-enter ${visibleSections.includes('testimonials') ? 'slide-up-visible' : ''}`}>
      <p className="text-sm font-semibold text-violet-600">Don't just take it from us</p>
      <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
        Un innovativo sistema <span className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">testato</span> e <span className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">sicuro</span>
      </h2>
      <p className="mt-3 text-slate-600">
        Ecco perché siamo convinti che questo sistema sia funzionale per te e per noi.
      </p>
    </div>

    {/* Desktop: Grid layout */}
    <div className="max-w-[1200px] mx-auto hidden md:grid grid-cols-3 gap-8 px-4">
      {testimonials.map((t, idx) => (
        <div
          key={idx}
          className={`flex flex-col rounded-3xl overflow-hidden shadow-lg bg-white slide-up-enter slide-up-delay-${idx + 1} ${visibleSections.includes('testimonials') ? 'slide-up-visible' : ''}`}
        >
          {/* Video full width verticale */}
          <div className="w-full relative pb-[120%]">
            <iframe
              className="absolute inset-0 w-full h-full rounded-t-3xl"
              src={t.videoUrl}
              title={`Testimonial ${t.company}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Testo sotto */}
          <div className="p-6 flex flex-col justify-between flex-grow text-center">
            <div>
              <p className="uppercase font-semibold text-sm text-gray-500 mb-2">
                {t.company}
              </p>
              <p className="italic mb-2">&ldquo;{t.quote}&rdquo;</p>
            </div>
            <p className="text-sm font-medium">{t.author}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Mobile: Slider layout */}
    <div className="max-w-[1200px] mx-auto md:hidden px-4">
      <div className="relative">
        {/* Slider container */}
        <div className="overflow-hidden rounded-3xl">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentVideoIndex * 100}%)` }}
          >
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="w-full flex-shrink-0"
              >
                <div className="flex flex-col rounded-3xl overflow-hidden shadow-lg bg-white mx-2">
                  {/* Video full width verticale */}
                  <div className="w-full relative pb-[120%]">
                    <iframe
                      className="absolute inset-0 w-full h-full rounded-t-3xl"
                      src={t.videoUrl}
                      title={`Testimonial ${t.company}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  {/* Testo sotto */}
                  <div className="p-6 flex flex-col justify-between flex-grow text-center">
                    <div>
                      <p className="uppercase font-semibold text-sm text-gray-500 mb-2">
                        {t.company}
                      </p>
                      <p className="italic mb-2">&ldquo;{t.quote}&rdquo;</p>
                    </div>
                    <p className="text-sm font-medium">{t.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => setCurrentVideoIndex(prev => prev > 0 ? prev - 1 : testimonials.length - 1)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all z-10"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => setCurrentVideoIndex(prev => prev < testimonials.length - 1 ? prev + 1 : 0)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all z-10"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentVideoIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentVideoIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  </section>



  
  {/* Interactive Project Solutions Section */}
  <section className="w-full px-6 py-12 bg-gradient-to-br from-blue-50/8 via-white to-purple-50/5 relative" data-section="accelera-business">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/12 via-transparent to-purple-50/12"></div>
    <div className="max-w-[1400px] mx-auto relative z-10">
      
      {/* Section Header */}
      <div className={`text-center mb-12 slide-up-enter ${visibleSections.includes('accelera-business') ? 'slide-up-visible' : ''}`}>
        <p className="text-sm font-semibold text-violet-600">Soluzioni Su Misura</p>
        <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-slate-900">
          <span className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">Accelera</span> il tuo <span className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">business</span>, ogni volta
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Soluzioni complete e personalizzate per far crescere la tua azienda con strumenti professionali.
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:justify-center mb-8 bg-white p-3 rounded-2xl shadow-sm border border-gray-200 max-w-2xl mx-auto">
        {Object.entries(projectTabs).map(([key, tab]) => (
          <button
            key={key}
            onClick={() => {
              setActiveProjectTab(key);
              setContentKey(prev => prev + 1);
            }}
            className={`px-4 py-3 md:px-6 rounded-xl font-medium transition-all duration-300 text-sm md:text-base w-full md:w-auto ${
              activeProjectTab === key
                ? 'bg-gradient-bg-brand gradient-text-brand shadow-lg transform scale-105'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {tab.title.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-visible relative">
        <div className="flex flex-col lg:flex-row">

          {/* Mobile Navigation Arrows */}
          <button
            onClick={() => {
              const keys = Object.keys(projectTabs);
              const currentIndex = keys.indexOf(activeProjectTab);
              const prevIndex = currentIndex === 0 ? keys.length - 1 : currentIndex - 1;
              setActiveProjectTab(keys[prevIndex]);
              setContentKey(prev => prev + 1);
            }}
            className="lg:hidden absolute -left-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => {
              const keys = Object.keys(projectTabs);
              const currentIndex = keys.indexOf(activeProjectTab);
              const nextIndex = currentIndex === keys.length - 1 ? 0 : currentIndex + 1;
              setActiveProjectTab(keys[nextIndex]);
              setContentKey(prev => prev + 1);
            }}
            className="lg:hidden absolute -right-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Left Content */}
          <div key={contentKey} className="flex-1 p-6 lg:p-12">
            <div className="mb-4 lg:mb-6 transition-all duration-500 ease-in-out transform">
              <h3 className="text-xl lg:text-3xl font-bold mb-2 text-gray-900 animate-fade-in">
                {projectTabs[activeProjectTab as keyof typeof projectTabs].title}
              </h3>
              <h4 className="text-base lg:text-lg text-blue-600 font-medium mb-3 lg:mb-4 animate-fade-in" style={{animationDelay: '0.1s'}}>
                {projectTabs[activeProjectTab as keyof typeof projectTabs].subtitle}
              </h4>
              <p className="text-gray-600 text-base lg:text-lg animate-fade-in" style={{animationDelay: '0.2s'}}>
                {projectTabs[activeProjectTab as keyof typeof projectTabs].description}
              </p>
            </div>

            {/* Features List */}
            <ul className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
              {projectTabs[activeProjectTab as keyof typeof projectTabs].features.map((feature, idx) => (
                <li 
                  key={idx} 
                  className="flex items-start gap-3 animate-fade-in"
                  style={{animationDelay: `${0.3 + idx * 0.1}s`}}
                >
                  <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm lg:text-base">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 lg:p-6 rounded-xl border border-blue-100 animate-fade-in mb-6 lg:mb-0" style={{animationDelay: '0.7s'}}>
              <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
                <Image
                  src={projectTabs[activeProjectTab as keyof typeof projectTabs].testimonial.avatar}
                  alt="Testimonial"
                  width={48}
                  height={48}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white shadow-sm"
                />
                <div>
                  <div className="text-yellow-500 text-xs lg:text-sm mb-1">★★★★★</div>
                  <p className="font-semibold text-gray-900 text-sm lg:text-base">
                    {projectTabs[activeProjectTab as keyof typeof projectTabs].testimonial.name}
                  </p>
                  <p className="text-xs lg:text-sm text-gray-600">
                    {projectTabs[activeProjectTab as keyof typeof projectTabs].testimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 italic text-sm lg:text-base">
                "{projectTabs[activeProjectTab as keyof typeof projectTabs].testimonial.quote}"
              </p>
            </div>

            {/* Mobile CTA Button */}
            <div className="lg:hidden">
              <button 
                onClick={scrollToContactForm}
                className="w-full py-3 px-6 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <FaRocket className="w-4 h-4" />
                {projectTabs[activeProjectTab as keyof typeof projectTabs].ctaText}
              </button>
              
              <p className="text-center text-xs text-gray-500 mt-3">
                Consulenza gratuita • Setup incluso • Supporto 24/7
              </p>
            </div>
          </div>

          {/* Right Side - Visual/CTA */}
          <div className="hidden lg:flex flex-1 p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-white border-l border-gray-200 flex-col justify-center">
            
            {/* Icon Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FaRocket className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-700">Crescita Rapida</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FaChartBar className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-700">ROI Garantito</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FaBolt className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-700">Automazione</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FaBullseye className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-700">Precisione</p>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              onClick={scrollToContactForm}
              className="w-full py-4 px-6 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaRocket className="w-5 h-5" />
              {projectTabs[activeProjectTab as keyof typeof projectTabs].ctaText}
            </button>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              Consulenza gratuita • Setup incluso • Supporto 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

      {/* Reviews Section 
      <section 
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-indigo-50/8 via-white to-violet-50/5 relative"
        data-section="reviews"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/12 via-transparent to-violet-50/12"></div>
        <div className="container mx-auto relative z-10">
          <div className={`text-center mb-8 lg:mb-12 slide-up-enter slide-up-delay-1 ${visibleSections.includes('reviews') ? 'slide-up-visible' : ''}`}>
            <div className="inline-block px-3 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 rounded-full text-xs sm:text-sm mb-4">
              Recensioni Clienti
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{color: '#1c1a31'}}>
              Cosa Dicono i Nostri <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent font-bold">Partner</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Testimonianze di imprenditori che hanno trasformato le loro idee in business di successo con noi
            </p>
          </div>
          
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
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 transform hover:scale-105 h-full">
                      <div className="flex items-center mb-4">
                        <div className="text-3xl mr-3">{review.avatar}</div>
                        <div>
                          <h4 className="font-semibold text-custom-dark">{review.name}</h4>
                          <p className="text-sm text-gray-500">{review.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 text-lg" />
                        ))}
                      </div>
                      
                      <p className="text-custom-dark text-sm leading-relaxed">
                        "{review.text}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevReview}
                className="bg-gradient-to-r from-blue-600 to-green-500 p-3 rounded-full hover:from-blue-700 hover:to-green-600 transition-all transform hover:scale-110"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
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
      */}

      <Footer />

      {/* Custom Alert/Confirm Modal */}
      {modalData.isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/20 to-transparent rounded-full -z-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/20 to-transparent rounded-full -z-10"></div>

            {/* Icon based on type */}
            <div className="flex justify-center mb-4">
              {modalData.type === 'error' && (
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
              {modalData.type === 'warning' && (
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              )}
              {modalData.type === 'confirm' && (
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-center mb-3 text-gray-800">
              {modalData.title}
            </h3>

            {/* Message */}
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              {modalData.message}
            </p>

            {/* Buttons */}
            <div className="flex gap-3 justify-center">
              {modalData.type === 'confirm' && modalData.onCancel && (
                <button
                  onClick={modalData.onCancel}
                  className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  {modalData.cancelText || 'Annulla'}
                </button>
              )}
              <button
                onClick={modalData.onConfirm || (() => setModalData(prev => ({ ...prev, isOpen: false })))}
                className="px-6 py-2.5 gradient-bg-brand text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                {modalData.confirmText || 'OK'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-custom-dark hover:text-gray-600 transition-colors z-10"
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