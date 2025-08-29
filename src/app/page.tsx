'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FC } from "react";
import { CheckCircle, Settings, FileText, BarChart2, Gauge } from "lucide-react";
import { 
  FaEnvelope, 
  FaRocket, 
  FaLock, 
  FaEuroSign, 
  FaPhone, 
  FaChartBar, 
  FaSearch, 
  FaLightbulb, 
  FaPalette, 
  FaBolt, 
  FaBullseye, 
  FaClipboardList, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaExclamationTriangle,
  FaChartLine,
  FaStar,
  FaHeart,
  FaUser,
  FaUserTie,
  FaUserGraduate,
  FaRunning,
  FaBriefcase,
  FaUserCheck,
  FaMusic,
  FaComment,
  FaShare
} from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
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
export default function HomePage() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const features: FeatureCard[] = [
  { icon: <Settings className="w-5 h-5 text-gray-700" />, title: "Flexible workflows for every team" },
  { icon: <FileText className="w-5 h-5 text-gray-700" />, title: "Tasks, docs, spreadsheets, and more" },
  { icon: <Gauge className="w-5 h-5 text-gray-700" />, title: "Resource and workload optimization" },
  { icon: <BarChart2 className="w-5 h-5 text-gray-700" />, title: "Dashboards and insights" },
];
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

const pauseAutoPlay = (ms?: number) => {
  setAutoPlay(false);
  clearTimers();
  if (typeof ms === 'number' && ms > 0) {
    resumeTimeoutRef.current = setTimeout(() => {
      setAutoPlay(true);
    }, ms);
  }
};

const [autoPlayDelay, setAutoPlayDelay] = useState(3500); // ms
const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
const carouselContainerRef = useRef<HTMLDivElement | null>(null);
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
  const [activeStep, setActiveStep] = useState(1);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Dati delle icone circolari - disposizione uniforme ogni 45°
  const circularIcons = [
    { id: 'phone', icon: FaPhone, color: 'text-blue-600', tooltip: '+39 123 456 7890', angle: 0 },
    { id: 'chart', icon: FaChartBar, color: 'text-green-600', tooltip: 'Analytics & Reporting', angle: 45 },
    { id: 'search', icon: FaSearch, color: 'text-purple-600', tooltip: 'SEO Optimization', angle: 90 },
    { id: 'lightbulb', icon: FaLightbulb, color: 'text-yellow-600', tooltip: 'Strategic Consulting', angle: 135 },
    { id: 'palette', icon: FaPalette, color: 'text-pink-600', tooltip: 'Creative Design', angle: 180 },
    { id: 'bolt', icon: FaBolt, color: 'text-orange-600', tooltip: 'Fast Delivery', angle: 225 },
    { id: 'rocket', icon: FaRocket, color: 'text-red-600', tooltip: 'Business Growth', angle: 270 },
    { id: 'bullseye', icon: FaBullseye, color: 'text-indigo-600', tooltip: 'contatti@safescale.it', angle: 315 }
  ];

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

  // Funzione per verificare se le prime 3 sezioni sono complete
  const isFirstThreeSectionsComplete = () => {
    // Sezione 1 - Chi sei (almeno nome brand)
    const section1Complete = questionnaireData.brandName.trim() !== '';
    
    // Sezione 2 - Cosa produci/vendi (almeno production)
    const section2Complete = questionnaireData.production.trim() !== '';
    
    // Sezione 3 - Le tue vendite (almeno onlineSales)
    const section3Complete = questionnaireData.onlineSales.trim() !== '';
    
    return section1Complete && section2Complete && section3Complete;
  };

  // Funzione per inviare questionario incompleto
  const sendIncompleteQuestionnaire = async () => {
    // Non inviare se non sono complete le prime 3 sezioni
    if (!isFirstThreeSectionsComplete()) return;
    
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
        console.log('Questionario incompleto inviato con successo');
      } else {
        console.log('Questionario incompleto già inviato da questo IP');
      }
    } catch (error) {
      console.error('Errore invio questionario incompleto:', error);
    }
  };

  // Generate initial captcha on component mount (client-side only)
  useEffect(() => {
    if (isMounted) {
      generateCaptcha();
    }
  }, [isMounted]);

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

const [active, setActive] = useState<number>(0);

// --- Banner CTA (prima del return) ---
const ctaHref = '#contact-form'; // cambia con l’anchor o il link che vuoi

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-blue-100/20 text-custom-dark overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="w-full max-w-7xl lg:max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-12 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="SafeScale Agency Logo"
                width={240}
                height={80}
                className="h-14 w-auto"
              />
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#servizi" className="text-custom-dark hover:text-blue-600 transition-colors font-medium">Servizi</Link>
              <Link href="#chi-siamo" className="text-custom-dark hover:text-blue-600 transition-colors font-medium">Chi Siamo</Link>
              <Link href="#contatti" className="text-custom-dark hover:text-blue-600 transition-colors font-medium">Contatti</Link>
            </nav>
            
            {/* Desktop Button */}
            <button 
              onClick={() => {
                setShowContactForm(true);
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
              className="hidden md:block gradient-bg-brand gradient-bg-brand-hover text-white px-6 py-2 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/30"
            >
              <FaEnvelope className="inline mr-2" /> Candidati
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col space-y-1 p-2"
            >
              <div className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="#servizi" 
                className="text-lg text-custom-dark hover:text-blue-600 transition-colors py-2 border-b border-gray-200/50 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Servizi
              </Link>
              <Link 
                href="#chi-siamo" 
                className="text-lg text-custom-dark hover:text-blue-600 transition-colors py-2 border-b border-gray-200/50 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Chi Siamo
              </Link>
              <Link 
                href="#contatti" 
                className="text-lg text-custom-dark hover:text-blue-600 transition-colors py-2 border-b border-gray-200/50 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contatti
              </Link>
              <button 
                className="gradient-bg-brand gradient-bg-brand-hover text-white px-6 py-3 rounded-full transition-all text-center mt-4 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowContactForm(true);
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
              >
                <FaEnvelope className="inline mr-2" /> Candidati
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        data-section="hero" 
        className="pt-24 sm:pt-20 pb-8 lg:px-12 min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-blue-50/20 via-white to-blue-100/15"
      >
        {/* Blue glowing effect - oval shape spanning full width */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-6xl h-[400px] sm:h-[600px] rounded-full blur-3xl animate-pulse" style={{backgroundColor: '#BAD9FE', opacity: 0.8, animationDuration: '4s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-[70%] max-w-4xl h-[300px] sm:h-[500px] rounded-full blur-3xl animate-pulse" style={{backgroundColor: '#BAD9FE', opacity: 0.6, animationDuration: '6s', animationDelay: '2s'}}></div>
        
        {/* Subtle geometric pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(59, 130, 246, 0.05) 20px,
              rgba(59, 130, 246, 0.05) 22px
            )`
          }}
        />
        
        {/* Light gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/30 to-purple-50/50"></div>
        <div className="w-full max-w-7xl lg:max-w-[2000px] mx-auto relative z-10 px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 order-1 lg:order-1 lg:col-span-2">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full text-xs sm:text-sm font-medium gradient-text-brand">
                🚀 Investiamo sul tuo progetto
              </div>
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{color: '#1c1a31'}}>
                <span>Noi</span> <span>Investiamo</span>
                <br /><span>Tu</span> 
                <span> Guadagni</span> 
                <br />
                 <span>Zero Rischi</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-custom-dark leading-relaxed">
                Proponici la tua <span className="font-semibold gradient-text-brand">idea di Business</span> con <span className="font-semibold gradient-text-brand">E-Commerce</span>: se la riterremo valida, <span className="font-semibold gradient-text-brand">creeremo</span> il sistema di consegne, gestiremo il <span className="font-semibold gradient-text-brand">marketing</span> e <span className="font-semibold gradient-text-brand">investiremo</span> nel progetto con campagne pubblicitarie mirate.  
Tranquillo, <span className="font-semibold gradient-text-brand">copriremo eventuali perdite economiche</span> e ci prenderemo tutti i<span className="font-semibold gradient-text-brand"> rischi</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button 
                  onClick={() => {
                    setShowContactForm(true);
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 100);
                  }}
                  className="w-full sm:w-auto gradient-bg-brand gradient-bg-brand-hover text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all text-sm sm:text-base transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
                >
                  <FaEnvelope className="inline mr-2" /> Candidati
                </button>
              </div>
            </div>
            
            {/* Circular Design */}
            <div className="relative flex justify-center lg:justify-end order-2 lg:order-2 mb-8 lg:mb-0 lg:col-span-3 lg:pr-4">
              <div className="relative w-full max-w-sm aspect-square sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                {!showContactForm ? (
                  <>
                    {/* Animated outer rings */}
                    <div className="absolute inset-0 rounded-full border border-blue-200/20 animate-spin" style={{animationDuration: '20s'}}></div>
                    <div className="absolute inset-4 sm:inset-8 rounded-full border border-purple-300/30 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
                    <div className="absolute inset-8 sm:inset-16 rounded-full border border-blue-400/30 animate-spin" style={{animationDuration: '10s'}}></div>
                    
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
                          src="images/cerchio.gif" 
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
                          className="gradient-bg-brand gradient-bg-brand-hover text-white px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base md:text-lg shadow-lg hover:shadow-purple-500/30"
                        >
                          Candidati e scopri se sei idoneo
                        </button>
                      </div>
                    </div>
                    
                    {/* Orbiting elements with organized circular positioning */}
                    {circularIcons.map((iconData, index) => {
                      const IconComponent = iconData.icon;
                      const radius = 180; // Raggio originale in pixel
                      const radiusMobile = 140; // Raggio mobile
                      
                      // Calcola posizione basata sull'angolo
                      const x = Math.cos((iconData.angle * Math.PI) / 180) * (isDesktop ? radius : radiusMobile);
                      const y = Math.sin((iconData.angle * Math.PI) / 180) * (isDesktop ? radius : radiusMobile);
                      
                      return (
                        <div
                          key={iconData.id}
                          className="absolute cursor-pointer circular-icon"
                          style={{
                            left: `${50 + (x / (isDesktop ? 4 : 3))}%`,
                            top: `${50 + (y / (isDesktop ? 4 : 3))}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          onMouseEnter={() => isDesktop ? setActiveTooltip(iconData.id) : null}
                          onMouseLeave={() => isDesktop ? setActiveTooltip(null) : null}
                          onClick={() => !isDesktop ? setActiveTooltip(activeTooltip === iconData.id ? null : iconData.id) : null}
                        >
                          <div className="relative">
                            <div className={`w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white border-2 border-gray-200 shadow-md rounded-full flex items-center justify-center shadow-lg transform hover:scale-125 hover:rotate-12 transition-all duration-300 ${activeTooltip === iconData.id ? 'scale-125 rotate-12' : ''}`}>
                              <IconComponent className={`text-sm sm:text-lg md:text-xl ${iconData.color}`} />
                            </div>
                            
                            {/* Tooltip */}
                            {activeTooltip === iconData.id && (
                              <div className="absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap animate-fade-in"
                                style={{
                                  bottom: iconData.angle >= 90 && iconData.angle <= 270 ? 'auto' : '120%',
                                  top: iconData.angle >= 90 && iconData.angle <= 270 ? '120%' : 'auto',
                                  left: '50%',
                                  transform: 'translateX(-50%)'
                                }}
                              >
                                {iconData.tooltip}
                                <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45"
                                  style={{
                                    top: iconData.angle >= 90 && iconData.angle <= 270 ? '-4px' : 'auto',
                                    bottom: iconData.angle >= 90 && iconData.angle <= 270 ? 'auto' : '-4px',
                                    left: '50%',
                                    transform: 'translateX(-50%) rotate(45deg)'
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
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
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Contattaci</h3>
                        <button 
                          onClick={() => setShowContactForm(false)}
                          className="text-blue-300 hover:text-custom-dark transition-colors text-lg sm:text-xl"
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
                            pattern=".*[0-9].*"
                            placeholder="es: +39 123 456 7890"
                            className="w-full px-2 sm:px-3 md:px-4 py-2 bg-blue-800/30 border border-blue-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-sm placeholder-blue-300/50"
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
                          className="w-full gradient-bg-brand gradient-bg-brand-hover text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base shadow-lg"
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
                        sendIncompleteQuestionnaire();
                        setShowQuestionnaire(false);
                        setQuestionnaireSubmitted(false);
                      }
                    }}
                  >
                    <div className="bg-gradient-to-br from-slate-900 via-blue-900/90 to-slate-900 p-6 sm:p-8 rounded-2xl border-2 border-blue-500/30 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto mt-4">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-2">
                            <FaClipboardList className="inline mr-2" /> Candidatura SafeScale
                          </h3>
                        </div>
                        <button 
                          onClick={() => {
                            sendIncompleteQuestionnaire();
                            setShowQuestionnaire(false);
                            generateCaptcha();
                          }}
                          className="text-blue-300 hover:text-custom-dark transition-colors text-xl"
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
                          className="w-full gradient-bg-brand gradient-bg-brand-hover text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base shadow-lg"
                        >
                          <FaRocket className="inline mr-2" /> Invia Candidatura
                        </button>
                      </form>
                      ) : (
                        <div className="text-center py-8">
                          <div className="mb-6">
                            <div className="text-6xl mb-4"><FaCheckCircle className="text-green-400 mx-auto" /></div>
                            <h3 className="text-2xl font-bold text-green-400 mb-4">
                              Candidatura Inviata con Successo!
                            </h3>
                            <p className="text-blue-200 text-lg leading-relaxed mb-6">
                              Grazie per aver completato il questionario.<br />
                              Se il tuo brand è idoneo, un nostro commerciale ti contatterà entro <span className="text-cyan-400 font-semibold">48 ore</span> per valutare la collaborazione.
                            </p>
                            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6 rounded-xl border border-green-500/30">
                              <p className="text-green-300 font-semibold mb-2">
                                <FaBullseye className="inline mr-2" /> Prossimi passi:
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
                            className="gradient-bg-brand gradient-bg-brand-hover text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-lg shadow-lg"
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
            <div className="bg-blue-600 p-4 sm:p-6 rounded-2xl">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="text-2xl sm:text-3xl"><FaChartLine className="text-white mx-auto" /></div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-white">Maggiore probabilità di successo</h3>
                  <p className="text-white/80 text-xs sm:text-sm">rispetto a chi opta per una gestione individuale</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-600 p-4 sm:p-6 rounded-2xl">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="text-2xl sm:text-3xl"><FaCheckCircle className="text-white mx-auto" /></div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-white">Riduzione dei rischi al minimo</h3>
                  <p className="text-white/80 text-xs sm:text-sm">perché copriamo noi tutte le eventuali perdite</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

{/* --- Comparison Section --- */}
<section
  id="comparison"
  className="py-16 px-4 sm:px-6 lg:px-8"
  aria-label="Work is broken vs Let's fix it"
>
  {(() => {
    const apps = [
      { src: 'images/icons/business.png', alt: 'Word', style: 'top-6 left-10 rotate-3' },
      { src: 'images/icons/sitoweb.png', alt: 'Slack', style: 'top-20 right-10 -rotate-6' },
      { src: 'images/icons/social.png', alt: 'Notion', style: 'top-40 left-4 rotate-2' },
      { src: 'images/icons/ads.png', alt: 'Trello', style: 'bottom-10 left-16 -rotate-3' },
      { src: 'images/icons/spam.png', alt: 'Airtable', style: 'bottom-20 right-6 rotate-6' },
      { src: 'images/icons/soldi.png', alt: 'Dropbox', style: 'top-1/2 right-24 -rotate-2' },
    ];
const labels: { [key: number]: string } = {
  0: '?',
  1: 'Error 404',
  2: 'Ban',
  3: 'Obsoleto',
  4: 'Spam',
  5: '-8.000€'
};
    return (
     <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 items-stretch">
  {/* LEFT – Work is broken */}
  <div className="flex justify-center">
    <div className="w-full max-w-lg">
      <div className="relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-8 shadow-sm">
  
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Il vecchio modello di Web Agency non è più sostenibile.
              </h2>
              <p className="mt-3 max-w-md text-slate-600">
                Inutile continuare a investire soldi senza garanzie e utilizzando tecniche obsolete, senza conoscere il potenziale reale e rischiando grosse perdite economiche.
              </p>

              {/* Cloud di iconcine */}
              <div className="relative mt-8 h-72">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-8 rounded-[48px] border-2 border-dashed border-slate-200" />
                  <div className="absolute inset-16 rounded-[36px] border-2 border-dashed border-slate-100" />
                </div>

                {apps.map((a, i) => (
                  <div
                    key={i}
                    className={`absolute ${a.style} grid place-items-center rounded-2xl bg-white/90 p-3 shadow-md ring-1 ring-slate-200 backdrop-blur transition-transform hover:scale-105`}
                  >
                    <img
                      src={a.src}
                      alt={a.alt}
                      width={36}
                      height={36}
                      className="h-9 w-9 object-contain"
                    />
                    <span className="absolute -top-2 -right-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-rose-500 text-xs font-semibold text-white px-1">
                       {labels[i]}
                       
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT – Let’s fix it */}
       <div className="flex justify-center">
    <div className="w-full max-w-lg">
      <div className="relative h-full overflow-hidden rounded-3xl border border-slate-800/50 bg-slate-950 p-8">
        <div className="pointer-events-none absolute -inset-1 bg-[radial-gradient(1200px_500px_at_80%_20%,rgba(168,85,247,0.25),transparent_60%)]" />
              <h3 className="relative text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Da oggi cambiamo rotta.
              </h3>
              <p className="relative mt-3 max-w-md text-slate-300">
                Con SafeScale investiamo noi nel tuo progetto con strategie già collaudate e vincenti. <br />
                Se funziona, cresciamo insieme. Se non funziona, il rischio è solo nostro.
              </p>

              {/* CTA */}
              <a
                href="#top"
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
              </a>
              <p className="relative mt-2 text-xs text-slate-400">
                Scopri se sei idoneo al progetto SafeScale.
              </p>

              {/* Neon card */}
              <div className="relative mt-8 grid place-items-center">
                <div className="relative aspect-[16/10] w-full max-w-md rounded-3xl border border-fuchsia-500/30 bg-slate-900/50 p-4 shadow-[0_0_80px_rgba(217,70,239,0.25)]">
                  <div className="grid h-full grid-cols-2 grid-rows-2 gap-3">
                    <div className="rounded-2xl border border-fuchsia-400/40 bg-slate-900/60 backdrop-blur-sm grid place-items-center text-center text-sm text-slate-200">
                      Creazione<br />E-Commerce
                    </div>
                    <div className="rounded-2xl border border-fuchsia-400/40 bg-slate-900/60 backdrop-blur-sm grid place-items-center text-center text-sm text-slate-200">
                      Gestione<br />Spedizioni
                    </div>
                    <div className="rounded-2xl border border-fuchsia-400/40 bg-slate-900/60 backdrop-blur-sm grid place-items-center text-center text-sm text-slate-200">
                      Campagne<br />Pubblicitarie
                    </div>
                    <div className="relative rounded-2xl border border-fuchsia-400/60 bg-slate-900/70 backdrop-blur grid place-items-center text-center text-sm font-semibold text-white">
                      Divisione<br />Profitti
                      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-fuchsia-500/40 shadow-[0_0_40px_rgba(217,70,239,0.35)_inset]" />
                    </div>
                  </div>
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


<section id="use-cases" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50/8 via-white to-pink-50/5 relative">
  <div className="absolute inset-0 bg-gradient-to-r from-purple-50/15 via-transparent to-pink-50/15"></div>
<div className="w-full max-w-7xl lg:max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">

    {/* HEADER */}
    <div className="text-center mb-12">
      <p className="text-sm font-semibold text-violet-600">Perché funziona</p>
      <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
        Un innovativo sistema testato e sicuro
      </h2>
      <p className="mt-3 text-slate-600">
        Ecco perché siamo convinti che questo sistema sia funzionale per te e per noi.
      </p>
    </div>

    {/* CONTENUTO */}
    <div className="grid gap-8 md:grid-cols-2 items-stretch min-h-[600px]">
      {/* SINISTRA */}
      <div className="space-y-4 flex flex-col justify-center">
        {ITEMS.map((it, idx) => {
          const isActive = active === idx;
          return (
            <div
              key={it.id}
              onClick={() => setActive(idx)}
              onMouseEnter={() => setActive(idx)}
              className={[
                'rounded-2xl border transition shadow-sm cursor-pointer',
                isActive ? 'border-violet-400 bg-violet-50/60' : 'border-slate-200 bg-white'
              ].join(' ')}
            >
              <div className="relative p-5">
                {/* barra accent */}
                <span
                  className={[
                    'absolute left-0 top-5 h-6 w-1 rounded-r-full',
                    isActive ? 'bg-violet-600' : 'bg-slate-200'
                  ].join(' ')}
                />
                <div className="pl-3">
                  <h3 className={['text-xl sm:text-2xl font-bold', isActive ? 'text-slate-900' : 'text-slate-800'].join(' ')}>
                    {it.title}
                  </h3>

                  {/* PARAGRAFI: su desktop SEMPRE visibili, su mobile solo se attiva */}
                  <p className={['mt-1 text-slate-600', isActive ? 'block' : 'hidden md:block'].join(' ')}>
                    {it.desc}
                  </p>

                  {/* IMMAGINI: solo mobile, e solo se attiva */}
                  <div className={['mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white md:hidden', isActive ? 'block' : 'hidden'].join(' ')}>
                    <img
                      src={it.image}
                      alt={it.title}
                      className="w-full h-48 object-contain"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DESTRA: STAGE DESKTOP */}
      <div className="hidden md:block md:self-stretch">
        <div className="h-full min-h-[600px] rounded-3xl border border-slate-200/70 bg-white shadow-xl overflow-hidden">
          <div className="relative h-full">
            {ITEMS.map((it, idx) => {
              const show = active === idx;
              return (
                <img
                  key={it.id}
                  src={it.image}
                  alt={it.title}
                  className={[
                    'absolute inset-0 h-full w-full object-contain p-6 transition-opacity duration-500',
                    show ? 'opacity-100' : 'opacity-0'
                  ].join(' ')}
                />
              );
            })}
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
<div className="w-full max-w-7xl lg:max-w-[2000px] mx-auto relative z-10 px-6 lg:px-12">

          <div className={`text-center mb-16 slide-up-enter ${visibleSections.includes('three-steps') ? 'slide-up-visible' : ''}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4" style={{color: '#1c1a31'}}>
              <span className="gradient-text-brand">3 Step</span>, <span className="gradient-text-success">0 Rischi</span>
            </h2>
            <p className="text-lg text-custom-dark max-w-3xl mx-auto">
              Il nostro processo trasparente che <span className="font-semibold gradient-text-brand">elimina ogni rischio</span> per il tuo business
            </p>
          </div>
          
          {/* Mobile Tabs + Desktop Grid */}
          <div className="max-w-7xl mx-auto mb-12">
            {/* Mobile Tab Navigation - Attached Colored Tabs */}
            <div className="md:hidden mb-6">
              <div className="relative">
                {/* Tablist container with tabs attached to box */}
                <div 
                  role="tablist" 
                  aria-label="Passaggi del processo"
                  className="relative flex justify-center items-end mb-0"
                >
                  {steps.map((step, index) => {
                    const isActive = activeStep === step.id;
                    // Colori base per ogni step
                    const stepColors = {
                      1: { bg: 'from-[#36a3e3] to-[#2691d9]', border: '#36a3e3', shadow: '#36a3e3' },
                      2: { bg: 'from-[#4f10e8] to-[#3d0bb3]', border: '#4f10e8', shadow: '#4f10e8' },
                      3: { bg: 'from-[#f712c5] to-[#c20e9a]', border: '#f712c5', shadow: '#f712c5' }
                    };
                    const colors = stepColors[step.id as keyof typeof stepColors];
                    
const apps = [
  { src: '/icons/word.png', alt: 'Word', style: 'top-6 left-10 rotate-3' },
  { src: '/icons/slack.png', alt: 'Slack', style: 'top-20 right-10 -rotate-6' },
  { src: '/icons/notion.png', alt: 'Notion', style: 'top-40 left-4 rotate-2' },
  { src: '/icons/trello.png', alt: 'Trello', style: 'bottom-10 left-16 -rotate-3' },
  { src: '/icons/airtable.png', alt: 'Airtable', style: 'bottom-20 right-6 rotate-6' },
  { src: '/icons/dropbox.png', alt: 'Dropbox', style: 'top-1/2 right-24 -rotate-2' },
  { src: '/icons/jira.png', alt: 'Jira', style: 'top-28 left-1/3 rotate-6' },
  { src: '/icons/figma.png', alt: 'Figma', style: 'bottom-24 left-1/2 -rotate-6' },
];



                    return (
                      <button
                        key={step.id}
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`tabpanel-${step.id}`}
                        id={`tab-${step.id}`}
                        onClick={() => setActiveStep(step.id)}
                        className={`
                          relative px-5 py-3 transition-all duration-500 font-bold text-sm text-white
                          rounded-t-3xl border-2 border-b-0
                          bg-gradient-to-br ${colors.bg}
                          transform hover:shadow-md
                          ${index > 0 ? '-ml-4' : ''}
                        `}
                        style={{
                          borderColor: colors.border,
                          height: isActive ? '55px' : '40px',
                          width: '70px',
                          zIndex: isActive ? 30 : 20 - index,
                          marginBottom: '0px',
                          boxShadow: isActive ? `0 -2px 10px ${colors.shadow}40` : 'none'
                        }}
                      >
                        <div className="flex items-center justify-center h-full">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold" style={{color: colors.border}}>
                            {step.id}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Mobile Single Box */}
              <div 
                role="tabpanel"
                id={`tabpanel-${activeStep}`}
                aria-labelledby={`tab-${activeStep}`}
                className={`${steps[activeStep - 1].bgClass} rounded-2xl p-6 border ${steps[activeStep - 1].borderClass} transform hover:scale-105 hover:shadow-lg ${steps[activeStep - 1].hoverClass} transition-all duration-300`}
              >
                <div className="text-center">
                  <div className={`text-3xl mb-4 w-14 h-14 ${steps[activeStep - 1].iconBg} rounded-full flex items-center justify-center mx-auto font-bold`}>
                    {activeStep}
                  </div>
                  <h3 className={`text-lg font-bold ${steps[activeStep - 1].titleColor} mb-4`}>
                    {steps[activeStep - 1].title}
                  </h3>
                  <p className={`${steps[activeStep - 1].descriptionColor || 'text-white/90'} leading-relaxed text-sm`}>
                    {steps[activeStep - 1].description}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Desktop Grid (hidden on mobile) */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-16">
              {steps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`${step.bgClass} rounded-2xl p-8 border ${step.borderClass} transform hover:scale-105 hover:shadow-lg ${step.hoverClass} transition-all duration-300 cursor-pointer slide-up-enter slide-up-delay-${index + 1} ${visibleSections.includes('three-steps') ? 'slide-up-visible' : ''}`}
                >
                  <div className="text-center mb-6">
                    <div className={`text-4xl mb-4 w-16 h-16 ${step.iconBg} rounded-full flex items-center justify-center mx-auto font-bold`}>
                      {step.id}
                    </div>
                    <h3 className={`text-xl font-bold ${step.titleColor} mb-4`}>
                      {step.title}
                    </h3>
                    <p className={`${step.descriptionColor || 'text-white/90'} leading-relaxed`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
                Strategie Pubblicitarie Su <span className="gradient-text-brand">Google Ads</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Gestiamo e investiamo nelle campagne <span className="gradient-text-brand">Google ADS</span> per aumentare in modo diretto le vendite dei tuoi prodotti.  <br />
Utilizziamo un sistema comprovato per individuare <span className="gradient-text-brand">keyword vincenti</span> e sviluppare <span className="gradient-text-brand">creatività</span> coinvolgenti, così da ottenere il massimo delle conversioni al minor costo possibile.  <br />
E se la campagna non raggiunge i risultati attesi, <span className="gradient-text-brand">copriamo noi le perdite</span>.  

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
                className="gradient-bg-brand gradient-bg-brand-hover text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all text-sm sm:text-base transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
              >
                <FaEnvelope className="inline mr-2" /> Contattaci
              </button>
            </div>
            
            <div className={`relative order-first lg:order-last transform hover:scale-105 transition-transform duration-300 slide-up-enter slide-up-delay-2 ${visibleSections.includes('google-ads') ? 'slide-up-visible' : ''}`}>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 text-white">
                {/* Mock Google Ads Interface */}
                <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded flex items-center justify-center text-xs sm:text-sm animate-pulse">G</div>
                  <span className="font-semibold text-sm sm:text-base text-white">Google Ads Dashboard</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-green-500">378.416</div>
                    <div className="text-xs sm:text-sm text-white/70">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold gradient-text-brand">€11.456</div>
                    <div className="text-xs sm:text-sm text-white/70">Spesa</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-green-500">€238.554</div>
                    <div className="text-xs sm:text-sm text-white/70">Ricavi</div>
                  </div>
                </div>
                
                {/* Mock Chart */}
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 p-3 sm:p-4 rounded-lg">
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





      {/* SEO Section - COMMENTED OUT 
      <section 
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-green-50/8 via-white to-emerald-50/5 relative"
        data-section="seo"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-50/12 via-transparent to-emerald-50/12"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`relative order-2 lg:order-1 transform hover:scale-105 transition-transform duration-300 slide-up-enter slide-up-delay-1 ${visibleSections.includes('seo') ? 'slide-up-visible' : ''}`}>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 text-white">
                <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 rounded flex items-center justify-center text-xs sm:text-sm animate-pulse" style={{animationDelay: '0.5s'}}>SEO</div>
                  <span className="font-semibold text-sm sm:text-base text-white">SEO Analytics</span>
                </div>
                
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm sm:text-base">Organic Traffic</span>
                    <span className="text-green-500 font-bold text-sm sm:text-base">+1,847%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm sm:text-base">Keywords Ranking</span>
                    <span className="text-blue-600 font-bold text-sm sm:text-base">2,653</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm sm:text-base">Backlinks</span>
                    <span className="font-bold text-sm sm:text-base gradient-text-brand">15,892</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 p-3 sm:p-4 rounded-lg">
                  <div className="text-center mb-2">
                    <span className="text-xl sm:text-2xl font-bold gradient-text-brand">over 1000%</span>
                  </div>
                  <div className="text-center text-xs sm:text-sm text-custom-dark">Traffic Growth</div>
                </div>
              </div>
              
              <div className="absolute -right-4 sm:-right-8 -bottom-4 sm:-bottom-8 w-20 h-36 sm:w-32 sm:h-56 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 rounded-xl sm:rounded-2xl p-1 sm:p-2 border-2 border-gray-600 transform hover:rotate-3 hover:scale-110 transition-all duration-300 hover:border-blue-500/50">
                <div className="bg-gradient-to-br from-slate-950 to-gray-950 rounded-lg sm:rounded-xl h-full p-1 sm:p-2 text-xs">
                  <div className="text-orange-400 font-bold mb-1 text-xs">SEO:</div>
                  <div className="text-custom-dark text-xs leading-tight">
                    Nessuno La Capisce Ma Tutti La Vogliono
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`space-y-6 lg:space-y-8 order-1 lg:order-2 slide-up-enter slide-up-delay-2 ${visibleSections.includes('seo') ? 'slide-up-visible' : ''}`}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{color: '#1c1a31'}}>
                Ottimizzazione SEO: <br/>
                <span className="gradient-text-brand">Tecnica</span>, <span className="gradient-text-brand">On-Page</span> E <span className="gradient-text-brand">Link Building</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Ottimizzazione del ranking con <span className="gradient-text-brand">SEO tecnica</span>, ottimizzazione del <span className="gradient-text-brand">codice HTML</span> e <span className="gradient-text-brand">link building</span>, aumentando visibilità e traffico organico.
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
                className="gradient-bg-brand gradient-bg-brand-hover text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all text-sm sm:text-base transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
              >
                <FaEnvelope className="inline mr-2" /> Contattaci
              </button>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Social Media Section - COMMENTED OUT 
      <section 
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-l from-blue-50/20 via-transparent to-indigo-50/20 relative"
        data-section="social"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-green-500/5 via-slate-950/3 to-blue-950/5 animate-pulse" style={{animationDuration: '5s'}}></div>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`space-y-6 lg:space-y-8 slide-up-enter slide-up-delay-1 ${visibleSections.includes('social') ? 'slide-up-visible' : ''}`}>
              <div className="inline-block px-3 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 rounded-full text-xs sm:text-sm">
                Social Media Management
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{color: '#1c1a31'}}>
                Gestione Strategica Dei <span className="gradient-text-brand">Social Media</span>
                <br />Su <span className="gradient-text-brand">Meta</span>, <span className="gradient-text-brand">TikTok</span> E <span className="gradient-text-brand">LinkedIn</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Sviluppo di strategie di <span className="gradient-text-brand">social media marketing</span> basate su <span className="gradient-text-brand">data analytics</span>, advertising mirato e <span className="gradient-text-brand">content curation</span> per ottimizzare l'engagement.
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
                className="gradient-bg-brand gradient-bg-brand-hover text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all text-sm sm:text-base transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
              >
                <FaEnvelope className="inline mr-2" /> Contattaci
              </button>
            </div>
            
            <div className={`relative order-first lg:order-last flex justify-center slide-up-enter slide-up-delay-2 ${visibleSections.includes('social') ? 'slide-up-visible' : ''}`}>
              <div className="w-48 h-80 sm:w-64 sm:h-[480px] bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 rounded-[2rem] sm:rounded-[3rem] p-3 sm:p-4 border-4 border-gray-600 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:border-green-600/50">
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
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600 rounded-full flex items-center justify-center mx-auto text-xs transform hover:scale-125 hover:rotate-12 transition-all duration-300"><FaMusic className="text-custom-dark" /></div>
                        <div className="text-xs mt-1">875</div>
                      </div>
                      <div>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-600 rounded-full flex items-center justify-center mx-auto text-xs transform hover:scale-125 hover:rotate-12 transition-all duration-300"><FaHeart className="text-custom-dark" /></div>
                        <div className="text-xs mt-1">2.1K</div>
                      </div>
                      <div>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-xs transform hover:scale-125 hover:rotate-12 transition-all duration-300"><FaComment className="text-custom-dark" /></div>
                        <div className="text-xs mt-1">156</div>
                      </div>
                      <div>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto text-xs transform hover:scale-125 hover:rotate-12 transition-all duration-300"><FaShare className="text-custom-dark" /></div>
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
  className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-green-50/8 via-white to-blue-50/8 relative"
  data-section="about"
>
  <div className="absolute inset-0 bg-gradient-to-r from-green-50/12 via-transparent to-blue-50/12"></div>
  <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div className={`space-y-6 lg:space-y-8 slide-up-enter slide-up-delay-1 order-2 lg:order-2 ${visibleSections.includes('about') ? 'slide-up-visible' : ''}`}>
        <div className="inline-block px-3 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 rounded-full text-xs sm:text-sm">
          SafeScale
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: '#1c1a31' }}>
          <span className="gradient-text-brand">Risultati Concreti Verificabili</span> e <span className="gradient-text-brand">Massima Trasparenza</span>
        </h2>

        <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed">
          <p>
            Sempre più <span className="gradient-text-brand">aziende e imprenditori</span> stanno affidando il loro business al nuovo sistema
            {' '}
            <span className="gradient-text-brand font-bold">SafeScale</span>, per crescere senza rischi e con un modello sostenibile.
          </p>

          <p>
            Le nostre <span className="gradient-text-brand">metodologie proprietarie</span> sono certificate e testate su migliaia di campagne pubblicitarie.
            Monitoriamo ogni KPI in tempo reale attraverso
            {' '}
            <span className="gradient-text-brand">dashboard personalizzate</span> che garantiscono la massima trasparenza sui risultati ottenuti.
          </p>

          <p className="hidden sm:block">
            <span className="gradient-text-brand font-semibold">Trasparenza totale:</span>
            {' '}riceverai report dettagliati con metriche verificabili, analisi competitive e proiezioni di crescita basate su dati reali di mercato.
            <br />In più avrai libero accesso a vendite, spedizioni e guadagni in tempo reale.
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
                className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200/50 rounded-xl hover:bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200/70 transition-all duration-300 transform hover:scale-105 cursor-pointer group w-full text-left"
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
                      <FaStar key={star} className="text-yellow-400 text-sm" />
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
                  className="gradient-bg-brand gradient-bg-brand-hover text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all text-sm sm:text-base transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
                >
                  <FaEnvelope className="inline mr-2" /> Candidati
                </button>
              </div>
            </div>
            
            <div className={`grid grid-cols-2 gap-3 sm:gap-4 order-first lg:order-first group slide-up-enter slide-up-delay-2 ${visibleSections.includes('about') ? 'slide-up-visible' : ''}`}>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-6 aspect-square transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 relative overflow-hidden flex items-center justify-center text-white">
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


<section className="py-12 bg-gray-50">
    {/* Titolo */}
    <div className="max-w-[1200px] mx-auto text-center mb-8 px-4">
      <h2 className="text-3xl font-bold">Don’t just take it from us</h2>
      <p className="text-gray-600">
        Loved by teams. Backed by awards. Trusted worldwide.
      </p>
    </div>

    {/* Box */}
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
      {testimonials.map((t, idx) => (
        <div
          key={idx}
          className="flex flex-col rounded-lg overflow-hidden shadow-lg bg-white"
        >
          {/* Video full width verticale */}
          <div className="w-full relative pb-[177%]">
            <iframe
              className="absolute inset-0 w-full h-full rounded-lg"
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
  </section>



   {/* --- Banner stile ClickUp (singolo blocco) --- */}
   <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-pink-50/8 via-white to-violet-50/5 relative">
     <div className="absolute inset-0 bg-gradient-to-r from-pink-50/12 via-transparent to-violet-50/12"></div>
<div className="relative z-10">
<section
  className="relative mx-auto max-w-6xl rounded-[28px] p-10 sm:p-12"
  aria-label="Call to action"
>
  {/* background gradient + glow */}
  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600" />
  {/* sfumature decorative, senza dividere in due */}
  <div className="pointer-events-none absolute inset-0 rounded-[28px] opacity-70">
    <div className="absolute -left-10 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
    <div className="absolute -right-8 bottom-0 h-72 w-72 rounded-full bg-pink-400/20 blur-3xl" />
    <div className="absolute inset-x-0 top-0 h-24 rounded-t-[28px] bg-white/10 blur-xl" />
  </div>
  {/* inner border soft */}
  <div className="absolute inset-0 rounded-[28px] ring-1 ring-white/20" />

  {/* contenuto */}
  <div className="relative z-10 text-center px-4">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
      Selezioniamo solo brand con <span className="text-yellow-300">potenziale.</span>
    </h2>
    <p className="mt-4 text-white/90 max-w-3xl mx-auto">
      Investiamo capitali importanti nei progetti in cui crediamo, indi per cui non lavoriamo con chiunque.
      <br className="hidden sm:block" />
      Se vuoi entrare a far parte del progetto <span className="font-semibold">SafeScale</span>, candidati ora.
    </p>

    <div className="mt-8">
      <a
        href={ctaHref}
        className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-6 py-3 font-semibold text-slate-900 shadow-lg hover:bg-white transition"
      >
        {/* icona a razzo semplice, inline svg (niente import) */}
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 19l4-1 6-6a3 3 0 10-4-4l-6 6-1 4z" />
          <path d="M14 6l4 4" />
        </svg>
        Candidati ora – Verifica se sei idoneo
      </a>
    </div>
  </div>

  {/* ombra esterna morbida */}
  <div className="pointer-events-none absolute inset-0 -z-10 rounded-[32px] shadow-[0_40px_80px_-20px_rgba(109,40,217,0.45)]" />
</section>
</div>
</section>

  <section className="w-full px-6 py-12">
      <div className="max-w-[1200px] mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left side */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-3">Deliver projects on time, every time</h2>
          <p className="text-gray-600 mb-6">
            Get teams running more efficiently with a complete project management solution.
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <span>Reduce delivery time with custom templates</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <span>Track effort to impact with OKR planning</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <span>Manage complex projects at scale</span>
            </li>
          </ul>

          {/* Testimonial */}
          <div className="flex items-center gap-4">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User"
              className="w-14 h-14 rounded-full"
            />
            <div>
              <p className="text-yellow-500">★★★★★</p>
              <p className="text-sm text-gray-700">
                <strong>“ClickUp brings all of our teams together into one place</strong> so that they can stay on track, collaborate and communicate.” 
              </p>
              <p className="text-xs text-gray-500 mt-1">— Convene</p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-white border-l border-gray-200 flex flex-col justify-between">
          <div className="space-y-4">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                {f.icon}
                <span className="text-gray-800">{f.title}</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button className="w-full py-3 rounded-lg text-white font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition">
              Use this solution →
            </button>
          </div>
        </div>
      </div>
    </section>

      {/* Reviews Section */}
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
              Cosa Dicono i Nostri <span className="text-green-500">Partner</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
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
      <footer className="py-8 sm:py-12 px-4 sm:px-6 bg-gradient-to-br from-blue-50/10 via-white to-blue-100/5 border-t border-gray-200 footer-geometric">
      
        {/* Geometric Elements */}
        <div className="geometric-triangles"></div>
        <div className="geometric-squares"></div>
        <div className="geometric-circles"></div>
        
        <div className="w-full max-w-7xl lg:max-w-[2000px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 md:col-span-1 space-y-3 sm:space-y-4">
              <div className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="SafeScale Agency Logo"
                  width={150}
                  height={50}
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                We risk, you profit. <br />
                La prima agenzia di marketing che investe su di te e sui tuoi progetti.
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
                <li><Link href="#" className="hover:text-green-400 transition-colors">Servizi</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Come funziona</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Contatti</Link></li>
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