'use client';

import { BarChart2, CheckCircle, FileText, Gauge, Settings } from "lucide-react";
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { 
  FaBolt,
  FaBriefcase,
  FaBullseye,
  FaChartBar,
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
import MetaAdsJourney from '@/components/MetaAdsJourney';
import OldAgencyBrokenBox from '@/components/OldAgencyBrokenBox';

interface FeatureCard {
  icon: JSX.Element;
  title: string;
}

// Custom hook for countin animation
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

// Questionnaire Form Component
interface ContactData {
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
}

interface QuestionnaireData {
  brandName: string;
  website: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  otherSocial: string;
  sector: string;
  sectorOther: string;
  production: string;
  productionOther: string;
  bestSeller: string;
  margin: string;
  availability: string;
  availabilityOther: string;
  onlineSales: string;
  monthlyOrders: string;
  ticketMedio: string;
  marketingChannels: string[];
  adInvestment: string;
  salesChannels: string[];
  shipping: string;
  shippingOther: string;
  returns: string;
  countries: string;
  objective: string;
  objectiveOther: string;
  revenue: string;
  team: string;
  obstacles: string;
}

const QuestionnaireForm = ({
  _contactData,
  _onClose,
  questionnaireData,
  setQuestionnaireData,
  captchaQuestion,
  captchaAnswer,
  setCaptchaAnswer,
  generateCaptcha,
  handleQuestionnaireSubmit
}: {
  _contactData: ContactData;
  _onClose: () => void;
  questionnaireData: QuestionnaireData;
  setQuestionnaireData: React.Dispatch<React.SetStateAction<QuestionnaireData>>;
  captchaQuestion: { question: string; answer: number };
  captchaAnswer: string;
  setCaptchaAnswer: (answer: string) => void;
  generateCaptcha: () => void;
  handleQuestionnaireSubmit: (e: React.FormEvent) => void;
}) => {
  const [currentSection, setCurrentSection] = useState(1);

  const handleInputChange = (field: string, value: string | string[]) => {
    setQuestionnaireData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setQuestionnaireData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field] || []), value]
        : (prev[field] || []).filter((item: string) => item !== value)
    }));
  };

  return (
    <div className="max-h-[70vh] overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Questionario - Sezione {currentSection} di 6
      </h2>

      <form onSubmit={handleQuestionnaireSubmit} className="space-y-4">
        {/* Sezione 1: Il tuo brand */}
        {currentSection === 1 && (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Il tuo brand</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome del Brand *
              </label>
              <input
                type="text"
                value={questionnaireData.brandName}
                onChange={(e) => handleInputChange('brandName', e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sito Web *
              </label>
              <input
                type="url"
                value={questionnaireData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <input
                type="text"
                value={questionnaireData.instagram}
                onChange={(e) => handleInputChange('instagram', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="@username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Settore *
              </label>
              <select
                value={questionnaireData.sector}
                onChange={(e) => handleInputChange('sector', e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleziona...</option>
                <option value="fashion">Fashion & Abbigliamento</option>
                <option value="beauty">Beauty & Cosmesi</option>
                <option value="tech">Tech & Elettronica</option>
                <option value="food">Food & Beverage</option>
                <option value="home">Home & Living</option>
                <option value="sport">Sport & Fitness</option>
                <option value="pet">Pet & Animali</option>
                <option value="other">Altro</option>
              </select>
            </div>

            {questionnaireData.sector === 'other' && (
              <input
                type="text"
                value={questionnaireData.sectorOther}
                onChange={(e) => handleInputChange('sectorOther', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Specifica il settore"
              />
            )}

            <button
              type="button"
              onClick={() => setCurrentSection(2)}
              className="w-full gradient-bg-brand text-white py-3 rounded-lg font-semibold"
            >
              Avanti
            </button>
          </>
        )}

        {/* Sezione 2: I tuoi prodotti */}
        {currentSection === 2 && (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">I tuoi prodotti</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Produzione
              </label>
              <select
                value={questionnaireData.production}
                onChange={(e) => handleInputChange('production', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleziona...</option>
                <option value="proprietary">Produzione propria</option>
                <option value="dropshipping">Dropshipping</option>
                <option value="private_label">Private Label</option>
                <option value="other">Altro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prodotto più venduto
              </label>
              <input
                type="text"
                value={questionnaireData.bestSeller}
                onChange={(e) => handleInputChange('bestSeller', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Margine medio per prodotto
              </label>
              <select
                value={questionnaireData.margin}
                onChange={(e) => handleInputChange('margin', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleziona...</option>
                <option value="0-20">0-20€</option>
                <option value="20-50">20-50€</option>
                <option value="50-100">50-100€</option>
                <option value="100-200">100-200€</option>
                <option value="200+">200€+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Disponibilità magazzino
              </label>
              <select
                value={questionnaireData.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleziona...</option>
                <option value="immediate">Immediata</option>
                <option value="1-3days">1-3 giorni</option>
                <option value="1week">1 settimana</option>
                <option value="2weeks">2 settimane</option>
                <option value="custom">Su ordinazione</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentSection(1)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold"
              >
                Indietro
              </button>
              <button
                type="button"
                onClick={() => setCurrentSection(3)}
                className="flex-1 gradient-bg-brand text-white py-3 rounded-lg font-semibold"
              >
                Avanti
              </button>
            </div>
          </>
        )}

        {/* Sezione 3: La tua situazione */}
        {currentSection === 3 && (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">La tua situazione</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vendite online mensili
              </label>
              <select
                value={questionnaireData.onlineSales}
                onChange={(e) => handleInputChange('onlineSales', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleziona...</option>
                <option value="0">Non vendo ancora online</option>
                <option value="0-5k">0-5.000€</option>
                <option value="5k-20k">5.000-20.000€</option>
                <option value="20k-50k">20.000-50.000€</option>
                <option value="50k-100k">50.000-100.000€</option>
                <option value="100k+">Oltre 100.000€</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Numero ordini mensili
              </label>
              <input
                type="text"
                value={questionnaireData.monthlyOrders}
                onChange={(e) => handleInputChange('monthlyOrders', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ticket medio
              </label>
              <input
                type="text"
                value={questionnaireData.ticketMedio}
                onChange={(e) => handleInputChange('ticketMedio', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="€"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Canali di marketing attuali
              </label>
              <div className="space-y-2">
                {['Google Ads', 'Facebook Ads', 'Instagram Ads', 'TikTok Ads', 'Email Marketing', 'SEO', 'Influencer'].map(channel => (
                  <label key={channel} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={questionnaireData.marketingChannels?.includes(channel) || false}
                      onChange={(e) => handleCheckboxChange('marketingChannels', channel, e.target.checked)}
                      className="mr-2 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{channel}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget investimento pubblicitario mensile
              </label>
              <select
                value={questionnaireData.adInvestment}
                onChange={(e) => handleInputChange('adInvestment', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleziona...</option>
                <option value="1k-5k">1.000-5.000€</option>
                <option value="5k-10k">5.000-10.000€</option>
                <option value="10k-25k">10.000-25.000€</option>
                <option value="25k-50k">25.000-50.000€</option>
                <option value="50k+">Oltre 50.000€</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Canali di vendita
              </label>
              <div className="space-y-2">
                {['E-commerce proprio', 'Amazon', 'eBay', 'Etsy', 'Marketplace locali', 'Negozi fisici', 'Altro'].map(channel => (
                  <label key={channel} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={questionnaireData.salesChannels?.includes(channel) || false}
                      onChange={(e) => handleCheckboxChange('salesChannels', channel, e.target.checked)}
                      className="mr-2 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{channel}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentSection(2)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold"
              >
                Indietro
              </button>
              <button
                type="button"
                onClick={() => setCurrentSection(4)}
                className="flex-1 gradient-bg-brand text-white py-3 rounded-lg font-semibold"
              >
                Avanti
              </button>
            </div>
          </>
        )}

        {/* Sezione 4: Logistica e operazioni */}
        {currentSection === 4 && (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Logistica e operazioni</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opzioni di spedizione
              </label>
              <select
                value={questionnaireData.shipping}
                onChange={(e) => handleInputChange('shipping', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleziona...</option>
                <option value="standard">Solo spedizione standard</option>
                <option value="express">Standard + Express</option>
                <option value="same-day">Consegna in giornata</option>
                <option value="pickup">Ritiro in negozio</option>
                <option value="multiple">Opzioni multiple</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Politica resi
              </label>
              <select
                value={questionnaireData.returns}
                onChange={(e) => handleInputChange('returns', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleziona...</option>
                <option value="14days">14 giorni</option>
                <option value="30days">30 giorni</option>
                <option value="60days">60 giorni</option>
                <option value="no-returns">Non accetto resi</option>
                <option value="case-by-case">Caso per caso</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Paesi serviti
              </label>
              <select
                value={questionnaireData.countries}
                onChange={(e) => handleInputChange('countries', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleziona...</option>
                <option value="italy-only">Solo Italia</option>
                <option value="eu">Unione Europea</option>
                <option value="europe">Europa</option>
                <option value="worldwide">Mondiale</option>
                <option value="custom">Paesi selezionati</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentSection(3)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold"
              >
                Indietro
              </button>
              <button
                type="button"
                onClick={() => setCurrentSection(5)}
                className="flex-1 gradient-bg-brand text-white py-3 rounded-lg font-semibold"
              >
                Avanti
              </button>
            </div>
          </>
        )}

        {/* Sezione 5: I tuoi obiettivi */}
        {currentSection === 5 && (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">I tuoi obiettivi</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Obiettivo principale
              </label>
              <select
                value={questionnaireData.objective}
                onChange={(e) => handleInputChange('objective', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleziona...</option>
                <option value="increase_sales">Aumentare le vendite</option>
                <option value="launch_brand">Lanciare il brand</option>
                <option value="expand_market">Espandere il mercato</option>
                <option value="improve_roas">Migliorare il ROAS</option>
                <option value="other">Altro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fatturato obiettivo mensile
              </label>
              <select
                value={questionnaireData.revenue}
                onChange={(e) => handleInputChange('revenue', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleziona...</option>
                <option value="10k">10.000€</option>
                <option value="25k">25.000€</option>
                <option value="50k">50.000€</option>
                <option value="100k">100.000€</option>
                <option value="250k">250.000€</option>
                <option value="500k+">Oltre 500.000€</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team attuale
              </label>
              <select
                value={questionnaireData.team}
                onChange={(e) => handleInputChange('team', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleziona...</option>
                <option value="solo">Solo io</option>
                <option value="2-3">2-3 persone</option>
                <option value="4-10">4-10 persone</option>
                <option value="10+">Oltre 10 persone</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ostacoli principali
              </label>
              <textarea
                value={questionnaireData.obstacles}
                onChange={(e) => handleInputChange('obstacles', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Quali sono le tue sfide principali?"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentSection(4)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold"
              >
                Indietro
              </button>
              <button
                type="button"
                onClick={() => {
                  generateCaptcha();
                  setCurrentSection(6);
                }}
                className="flex-1 gradient-bg-brand text-white py-3 rounded-lg font-semibold"
              >
                Avanti
              </button>
            </div>
          </>
        )}

        {/* Sezione 6: Verifica Captcha */}
        {currentSection === 6 && (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Verifica di sicurezza</h3>

            <div className="bg-gray-100 p-6 rounded-lg text-center">
              <p className="text-2xl font-bold text-gray-800 mb-4">
                {captchaQuestion.question}
              </p>
              <input
                type="text"
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                className="w-32 px-4 py-2 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="?"
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentSection(5)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold"
              >
                Indietro
              </button>
              <button
                type="submit"
                className="flex-1 gradient-bg-brand text-white py-3 rounded-lg font-semibold"
              >
                Invia Candidatura
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

const _ITEMS: Item[] = [
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
  const [stepBoxProgress, setStepBoxProgress] = useState(0);
  const [counter95, setCounter95] = useState(0);
  const [expandedGoogleAd, setExpandedGoogleAd] = useState<string | null>(null);
  const [expandedMetaAd, setExpandedMetaAd] = useState<string | null>(null);
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
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData>({
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
  const [_questionnaireSubmitted, setQuestionnaireSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [_activeStep, _setActiveStep] = useState(1);
  const [_activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [, setNeonTime] = useState(0);
  const [_displayedTexts, setDisplayedTexts] = useState<string[]>(['', '', '']);
  const [currentPhase, setCurrentPhase] = useState<'typing' | 'deleting'>('typing');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [deleteCharIndex, setDeleteCharIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInHero, setIsMouseInHero] = useState(false);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  const fullTexts = useMemo(() => [
    'Noi Investiamo',
    'Tu Guadagni', 
    'Zero Rischi'
  ], []);
  
  const _renderTextWithColors = (text: string) => {
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

  // Effect per tracciare il movimento del mouse nella hero section
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroSectionRef.current && isMouseInHero) {
        const rect = heroSectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const handleMouseEnter = () => setIsMouseInHero(true);
    const handleMouseLeave = () => setIsMouseInHero(false);

    const heroElement = heroSectionRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      heroElement.addEventListener('mouseenter', handleMouseEnter);
      heroElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
        heroElement.removeEventListener('mouseenter', handleMouseEnter);
        heroElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isMouseInHero]);

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
    setCurrentReviewIndex((prev: number) => {
      const maxIndex = isDesktop ? reviews.length - 3 : reviews.length - 1;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const _prevReview = () => {
    setCurrentReviewIndex((prev: number) => {
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

  // Animate 95% counter when Google Ads section becomes visible
  useEffect(() => {
    if (visibleSections.includes('google-ads') && counter95 === 0) {
      const start = 0;
      const end = 95;
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        setCounter95(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }
  }, [visibleSections, counter95]);


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

    // Check all optional fields in section 4 (Logistica e operazioni)
    const section4Complete = questionnaireData.shipping &&
                           questionnaireData.returns &&
                           questionnaireData.countries;

    // Check all optional fields in section 5 (I tuoi obiettivi)
    const section5Complete = questionnaireData.objective &&
                           questionnaireData.revenue &&
                           questionnaireData.team &&
                           questionnaireData.obstacles;

    return section2Complete && section3Complete && section4Complete && section5Complete;
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
    
    // Prima controlla nel database se l'IP ha già inviato una candidatura
    try {
      const duplicateCheck = await fetch('/api/check-duplicate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: contactFormData.email
        }),
      });

      const duplicateResult = await duplicateCheck.json();

      if (duplicateResult.success && duplicateResult.isDuplicate) {
        setModalData({
          isOpen: true,
          title: 'Candidatura già inviata',
          message: 'Hai già inviato una candidatura nelle ultime 24 ore. Per favore riprova più tardi.',
          type: 'warning',
          confirmText: 'OK',
          onConfirm: () => setModalData(prev => ({ ...prev, isOpen: false }))
        });
        return;
      }
    } catch (error) {
      // Se il controllo duplicati fallisce, procedi comunque
      // Il controllo sarà fatto anche lato server
    }

    // Controllo duplicati lato client con localStorage (come fallback)
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

    // Show thank you message immediately (solo se non è un duplicato)
    setQuestionnaireSubmitted(true);
    setIncompleteConfirmed(false); // Reset for next time

    // Salva in localStorage per prevenire duplicati
    localStorage.setItem(submissionKey, JSON.stringify({
      email: contactFormData.email,
      timestamp: new Date().toISOString(),
      sessionToken: sessionToken
    }));

    try {
      // Invia i dati via email con session token in background
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
        // Success - already shown thank you message
      } else {
        // Se c'è un errore, mostra il messaggio e rimuovi il thank you
        setQuestionnaireSubmitted(false);

        // Se il server dice che è un duplicato, mantieni in localStorage
        if (!result.message || !result.message.includes('già inviato')) {
          // Se non è un duplicato, rimuovi da localStorage per permettere un nuovo tentativo
          localStorage.removeItem(submissionKey);
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
      // In caso di errore di rete, mantieni il thank you
      // Il messaggio di ringraziamento rimane visibile anche se c'è un errore di rete
      // perché abbiamo già salvato in localStorage e l'utente ha completato la sua parte
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

  const [_active, _setActive] = useState<number>(0);
  const [_expandedMobileItem, _setExpandedMobileItem] = useState<number | null>(null);
  const [_playingVideos, _setPlayingVideos] = useState<{[key: number]: boolean}>({});
  const _videoRefs = useRef<{[key: number]: HTMLVideoElement | null}>({});

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

      {/* Hero Section Premium - Full Bleed */}
      <section
        ref={heroSectionRef}
        id="hero-section"
        data-section="hero"
        className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black"
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #1a0033 75%, #2d1b69 100%)'
        }}
      >
        {/* Background motion sottile */}
        <div className="absolute inset-0 opacity-20">
          {/* Blob sottile 1 */}
          <div
            className="absolute top-0 -left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/20 to-purple-600/10 rounded-full filter blur-[100px]"
            style={{
              animation: 'slowFloat 30s ease-in-out infinite'
            }}
          />
          {/* Blob sottile 2 */}
          <div
            className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-purple-600/20 to-pink-600/10 rounded-full filter blur-[100px]"
            style={{
              animation: 'slowFloat 30s ease-in-out infinite reverse',
              animationDelay: '10s'
            }}
          />
        </div>

        {/* Mouse trail background effect - Layer 1 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isMouseInHero
              ? `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%,
                  rgba(168, 85, 247, 0.4) 0%,
                  rgba(147, 51, 234, 0.25) 10%,
                  rgba(139, 92, 246, 0.15) 25%,
                  rgba(124, 58, 237, 0.08) 40%,
                  transparent 60%)`
              : 'none',
            transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: 0.8
          }}
        />

        {/* Mouse trail background effect - Layer 2 (lighter, larger) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isMouseInHero
              ? `radial-gradient(1000px circle at ${mousePosition.x}% ${mousePosition.y}%,
                  rgba(196, 181, 253, 0.3) 0%,
                  rgba(167, 139, 250, 0.2) 15%,
                  rgba(147, 51, 234, 0.1) 30%,
                  transparent 50%)`
              : 'none',
            mixBlendMode: 'screen',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />

        {/* Trail glow effect - moving light */}
        {isMouseInHero && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(400px circle at ${mousePosition.x}% ${mousePosition.y}%,
                rgba(217, 70, 239, 0.2) 0%,
                rgba(196, 181, 253, 0.15) 20%,
                transparent 40%)`,
              filter: 'blur(60px)',
              animation: 'trailPulse 2s ease-in-out infinite',
              transition: 'all 0.1s ease-out'
            }}
          />
        )}

        {/* Contenuto centrale */}
        <div className="relative z-10 text-center px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto">
          {/* Titolo principale con animazioni */}
          <div className="relative">
            {/* Glow effect blob behind entire title */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                animation: 'fadeIn 1s ease-out 2s both'
              }}
            >
              <div
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-40 blur-[100px] w-[600px] h-[300px]"
                style={{
                  animation: 'glowPulse 3s ease-in-out 2.5s infinite',
                  transform: 'scale(1.2)'
                }}
              />
            </div>

            <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              {/* Riga 1: Fade in con blur */}
              <span
                className="block text-white"
                style={{
                  animation: 'blurFadeIn 2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both'
                }}
              >
                Noi investiamo,
              </span>

              {/* Riga 2: Fade in con blur */}
              <span
                className="block text-white"
                style={{
                  animation: 'blurFadeIn 2s cubic-bezier(0.4, 0, 0.2, 1) 1s both'
                }}
              >
                tu guadagni,
              </span>

              {/* Riga 3: White text */}
              <span
                className="block text-white font-bold"
                style={{
                  animation: 'blurFadeIn 2s cubic-bezier(0.4, 0, 0.2, 1) 1.5s both'
                }}
              >
                zero rischi.
              </span>
            </h1>
          </div>

          {/* Sub-headline */}
          <p
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
            style={{
              animation: 'fadeIn 1.5s ease-out 2.5s both'
            }}
          >
            Copriamo le spese ads e gestiamo tutto il funnel.
            Tu incassi i risultati.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{
              animation: 'fadeIn 1.5s ease-out 3s both'
            }}
          >
            {/* CTA Primario - stesso stile brand del sito */}
            <button
              onClick={scrollToContactForm}
              className="gradient-bg-brand gradient-bg-brand-hover text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black text-lg"
            >
              Candidati
            </button>

            {/* CTA Secondario */}
            <button
              onClick={() => {
                const section = document.querySelector('#three-steps');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group px-8 py-4 rounded-full font-semibold text-white border-2 border-white/30 transition-all duration-300 hover:border-white/60 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
            >
              <span className="relative text-lg">
                Come funziona
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => {
            const nextSection = document.querySelector('#three-steps');
            nextSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            animation: 'fadeIn 1.5s ease-out 3.5s both'
          }}
        >
          <div className="flex flex-col items-center gap-2 group">
            <span className="text-white/60 text-sm">Scroll</span>
            <div className="relative w-6 h-10 border-2 border-white/30 rounded-full group-hover:border-white/60 transition-colors">
              <div
                className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"
                style={{
                  animation: 'scrollBounce 1.5s ease-in-out infinite'
                }}
              />
            </div>
          </div>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowContactForm(false)}>
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
              style={{
                animation: 'slideUpFade 0.3s ease-out'
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setShowContactForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {!showQuestionnaire ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Candidati ora</h2>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome *
                      </label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Il tuo nome"
                      />
                    </div>
                    <div>
                      <label htmlFor="cognome" className="block text-sm font-medium text-gray-700 mb-1">
                        Cognome *
                      </label>
                      <input
                        type="text"
                        id="cognome"
                        name="cognome"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Il tuo cognome"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="tua@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefono
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="+39 123 456 7890"
                      />
                    </div>
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="privacy"
                        checked={privacyAccepted}
                        onChange={(e) => setPrivacyAccepted(e.target.checked)}
                        className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor="privacy" className="ml-2 text-sm text-gray-600">
                        Ho letto e accetto l'<a href="/privacy" target="_blank" className="text-purple-600 underline">informativa sulla privacy</a> *
                      </label>
                    </div>
                    <button
                      type="submit"
                      disabled={!privacyAccepted}
                      className={`w-full py-3 rounded-lg font-semibold transition-all transform ${
                        privacyAccepted
                          ? 'gradient-bg-brand gradient-bg-brand-hover text-white hover:scale-105 cursor-pointer'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Procedi
                    </button>
                  </form>
                </>
              ) : (
                <QuestionnaireForm
                  _contactData={contactFormData}
                  _onClose={() => {
                    setShowContactForm(false);
                    setShowQuestionnaire(false);
                  }}
                  questionnaireData={questionnaireData}
                  setQuestionnaireData={setQuestionnaireData}
                  captchaQuestion={captchaQuestion}
                  captchaAnswer={captchaAnswer}
                  setCaptchaAnswer={setCaptchaAnswer}
                  generateCaptcha={generateCaptcha}
                  handleQuestionnaireSubmit={handleQuestionnaireSubmit}
                />
              )}
            </div>
          </div>
        )}

        {/* CSS per animazioni premium */}
        <style jsx>{`
          @keyframes blurFadeIn {
            0% {
              opacity: 0;
              filter: blur(20px);
              transform: translateY(30px) scale(0.95);
            }
            20% {
              opacity: 0.2;
              filter: blur(15px);
              transform: translateY(20px) scale(0.97);
            }
            40% {
              opacity: 0.4;
              filter: blur(10px);
              transform: translateY(15px) scale(0.98);
            }
            60% {
              opacity: 0.7;
              filter: blur(5px);
              transform: translateY(10px) scale(0.99);
            }
            80% {
              opacity: 0.9;
              filter: blur(2px);
              transform: translateY(5px) scale(0.995);
            }
            100% {
              opacity: 1;
              filter: blur(0);
              transform: translateY(0) scale(1);
            }
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes glowPulse {
            0%, 100% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.6;
            }
          }

          @keyframes trailPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.8;
            }
            50% {
              transform: scale(1.1);
              opacity: 1;
            }
          }

          @keyframes slowFloat {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(30px, -30px) scale(1.05);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.95);
            }
          }

          @keyframes scrollBounce {
            0%, 100% {
              transform: translateY(0) translateX(-50%);
              opacity: 1;
            }
            50% {
              transform: translateY(6px) translateX(-50%);
              opacity: 0.5;
            }
          }

          @keyframes slideUpFade {
            0% {
              transform: translateY(20px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}</style>
      </section>

      {/* --- Comparison Section --- */}
      <section
        id="comparison"
        className="py-16 px-4 sm:px-6 lg:px-8"
        aria-label="Work is broken vs Let's fix it"
      >
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
            <div className={`space-y-3 lg:space-y-8 slide-up-enter slide-up-delay-1 ${visibleSections.includes('google-ads') ? 'slide-up-visible' : ''}`}>
              {/* Titolo con Logo Google Ads */}
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{color: '#1c1a31'}}>
                    Strategie Pubblicitarie Su <span className="font-bold"><span className="bg-gradient-to-r from-[#34A853] from-0% to-[#FBBC04] to-45% bg-clip-text text-transparent">Google</span> <span className="text-[#4285F4]">Ads</span></span>
                  </h2>
                </div>
                {/* Google Ads Logo - grande come il titolo */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100%" height="100%">
                    <polygon fill="#FBBC04" points="30.129,15.75 18.871,9.25 5.871,31.25 17.129,37.75"/>
                    <path fill="#4285F4" d="M31.871,37.75c1.795,3.109,5.847,4.144,8.879,2.379c3.103-1.806,4.174-5.77,2.379-8.879l-13-22 c-1.795-3.109-5.835-4.144-8.879-2.379c-3.106,1.801-4.174,5.77-2.379,8.879L31.871,37.75z"/>
                    <circle cx="11.5" cy="34.5" r="6.5" fill="#34A853"/>
                  </svg>
                </div>
              </div>

              {/* MacBook mockup - visible only on mobile, between title and box */}
              <div className="block lg:hidden">
                <div className={`relative overflow-hidden ${visibleSections.includes('google-ads') ? 'slide-up-visible' : ''}`} style={{ height: '250px' }}>
                  <Image
                    src="/images/macbook-ads.png"
                    alt="Google Ads Dashboard"
                    width={600}
                    height={450}
                    quality={100}
                    priority
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Riquadro Premium Google Ads Strategie con animazione a tendina */}
              <div className="mx-auto max-w-sm sm:max-w-md lg:max-w-none">
                <div
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden relative"
                  style={{
                    background: 'linear-gradient(to right, #4285F4 0%, #34A853 33%, #FBBC04 66%, #4285F4 100%)',
                    padding: '4px',
                    maxHeight: visibleSections.includes('google-ads') ? '800px' : '0px',
                    opacity: visibleSections.includes('google-ads') ? 1 : 0,
                    transform: `translateY(${visibleSections.includes('google-ads') ? '0' : '20px'})`,
                    transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-10 min-h-[240px] sm:min-h-[260px] lg:min-h-[280px]">
                      {/* Container principale con griglia a 3 colonne */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-6 lg:min-h-[140px]">

                        {!expandedGoogleAd ? (
                          <>
                            {/* Stato chiuso: 3 icone nelle loro colonne */}
                            <button
                              role="tab"
                              aria-selected={false}
                              aria-controls="panel-search"
                              tabIndex={0}
                              className="text-center space-y-2 p-2 sm:p-3 lg:p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-[600ms] ease-out hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:ring-offset-2"
                              onClick={() => setExpandedGoogleAd('search')}
                              style={{ transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                            >
                              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto hover:scale-110 transition-transform duration-300 relative group">
                                <Image
                                  src="/images/icons/search-google.png"
                                  alt="Google Search"
                                  width={80}
                                  height={80}
                                  className="w-full h-full object-contain"
                                />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4285F4] to-[#34A853] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                              </div>
                              <h3 className="text-[15px] sm:text-base lg:text-lg text-gray-800 font-semibold">Ricerca Google</h3>
                            </button>

                            <button
                              role="tab"
                              aria-selected={false}
                              aria-controls="panel-display"
                              tabIndex={-1}
                              className="text-center space-y-2 p-2 sm:p-3 lg:p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-[600ms] ease-out hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#FBBC04] focus:ring-offset-2"
                              onClick={() => setExpandedGoogleAd('display')}
                              style={{ transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                            >
                              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto hover:scale-110 transition-transform duration-300 relative group">
                                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                  <rect x="4" y="8" width="40" height="28" rx="2" fill="#E8EAED" stroke="#5F6368" strokeWidth="1.5"/>
                                  <rect x="8" y="12" width="32" height="20" rx="1" fill="#FFFFFF"/>
                                  <rect x="10" y="14" width="12" height="8" rx="0.5" fill="#4285F4"/>
                                  <rect x="24" y="14" width="14" height="3" rx="0.5" fill="#34A853"/>
                                  <rect x="24" y="19" width="14" height="3" rx="0.5" fill="#FBBC04"/>
                                  <rect x="10" y="24" width="28" height="6" rx="0.5" fill="#4285F4"/>
                                  <circle cx="24" cy="40" r="1.5" fill="#5F6368"/>
                                </svg>
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FBBC04] to-[#34A853] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                              </div>
                              <h3 className="text-[15px] sm:text-base lg:text-lg text-gray-800 font-semibold">Display Network</h3>
                            </button>

                            <button
                              role="tab"
                              aria-selected={false}
                              aria-controls="panel-youtube"
                              tabIndex={-1}
                              className="text-center space-y-2 p-2 sm:p-3 lg:p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-[600ms] ease-out hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:ring-offset-2"
                              onClick={() => setExpandedGoogleAd('youtube')}
                              style={{ transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                            >
                              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto hover:scale-110 transition-transform duration-300 relative group">
                                <Image
                                  src="/images/icons/youtubelogo.svg"
                                  alt="YouTube Ads"
                                  width={80}
                                  height={80}
                                  className="w-full h-full object-contain"
                                />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FBBC04] to-[#4285F4] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                              </div>
                              <h3 className="text-[15px] sm:text-base lg:text-lg text-gray-800 font-semibold">YouTube Ads</h3>
                            </button>
                          </>
                        ) : (
                          <>
                            {/* Stato aperto: icona attiva in col1, pannello in col2-3 */}
                            <div className="col-span-3 grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">

                              {/* Colonna 1: icona attiva */}
                              <button
                                role="tab"
                                aria-selected={true}
                                aria-controls={`panel-${expandedGoogleAd}`}
                                tabIndex={0}
                                className="text-center space-y-2 p-2 sm:p-3 lg:p-4 rounded-lg cursor-pointer bg-gradient-to-r from-blue-50/50 to-green-50/50 border-b-2 border-[#4285F4] shadow-sm transition-all duration-[600ms] ease-out hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:ring-offset-2"
                                onClick={() => setExpandedGoogleAd(null)}
                                style={{
                                  gridColumn: '1',
                                  animation: expandedGoogleAd === 'search' ? 'none' : 'slideToLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                                }}
                              >
                                {expandedGoogleAd === 'search' && (
                                  <>
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto transition-transform duration-300 relative group">
                                      <Image
                                        src="/images/icons/search-google.png"
                                        alt="Google Search"
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-contain saturate-125"
                                      />
                                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4285F4] to-[#34A853] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                                    </div>
                                    <h3 className="text-[15px] sm:text-base lg:text-lg text-gray-800 font-bold">Ricerca Google</h3>
                                  </>
                                )}
                                {expandedGoogleAd === 'display' && (
                                  <>
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto transition-transform duration-300 relative group">
                                      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                        <rect x="4" y="8" width="40" height="28" rx="2" fill="#E8EAED" stroke="#5F6368" strokeWidth="1.5"/>
                                        <rect x="8" y="12" width="32" height="20" rx="1" fill="#FFFFFF"/>
                                        <rect x="10" y="14" width="12" height="8" rx="0.5" fill="#4285F4"/>
                                        <rect x="24" y="14" width="14" height="3" rx="0.5" fill="#34A853"/>
                                        <rect x="24" y="19" width="14" height="3" rx="0.5" fill="#FBBC04"/>
                                        <rect x="10" y="24" width="28" height="6" rx="0.5" fill="#4285F4"/>
                                        <circle cx="24" cy="40" r="1.5" fill="#5F6368"/>
                                      </svg>
                                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FBBC04] to-[#34A853] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                                    </div>
                                    <h3 className="text-[15px] sm:text-base lg:text-lg text-gray-800 font-bold">Display Network</h3>
                                  </>
                                )}
                                {expandedGoogleAd === 'youtube' && (
                                  <>
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto transition-transform duration-300 relative group">
                                      <Image
                                        src="/images/icons/youtubelogo.svg"
                                        alt="YouTube Ads"
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-contain saturate-125"
                                      />
                                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FBBC04] to-[#4285F4] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                                    </div>
                                    <h3 className="text-[15px] sm:text-base lg:text-lg text-gray-800 font-bold">YouTube Ads</h3>
                                  </>
                                )}
                              </button>

                              {/* Colonne 2-3: pannello descrizione */}
                              <div
                                role="tabpanel"
                                id={`panel-${expandedGoogleAd}`}
                                className="col-span-2 flex items-center bg-gray-50/50 rounded-lg p-4 shadow-sm"
                                style={{
                                  animation: 'slideInFromLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                                  minHeight: '100px'
                                }}
                              >
                                <div key={expandedGoogleAd} className="w-full">
                                  {expandedGoogleAd === 'search' && (
                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                      <span className="font-bold">Appari tra i primi risultati</span> quando i clienti cercano i tuoi <span className="font-bold">prodotti</span>.
                                    </p>
                                  )}
                                  {expandedGoogleAd === 'display' && (
                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                      <span className="font-bold">Banner</span> e <span className="font-bold">annunci grafici</span> mostrati su siti, blog e portali partner di Google.
                                    </p>
                                  )}
                                  {expandedGoogleAd === 'youtube' && (
                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                      <span className="font-bold">Annunci video</span> prima e durante i contenuti YouTube: ideali per creare <span className="font-bold">brand awareness</span> e aumentare le <span className="font-bold">conversioni</span>.
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Copy centrale (sempre visibile, con trasparenza variabile) */}
                      <div className="text-center pt-3 border-t border-gray-200">
                        <p className={`text-[15px] sm:text-lg lg:text-xl font-semibold text-gray-800 inline-block px-3 transition-opacity duration-600 ease-out ${expandedGoogleAd ? 'opacity-80' : 'opacity-100'}`} style={{ transition: 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
                          👉 Con Google Ads intercetti i clienti giusti, nel posto giusto e al momento giusto.
                        </p>
                      </div>

                      <style jsx>{`
                        @keyframes slideInFromLeft {
                          from {
                            opacity: 0;
                            transform: translateX(-20px);
                          }
                          to {
                            opacity: 1;
                            transform: translateX(0);
                          }
                        }

                        @keyframes slideToLeft {
                          from {
                            transform: translateX(100%);
                            opacity: 0.8;
                          }
                          to {
                            transform: translateX(0);
                            opacity: 1;
                          }
                        }

                        @media (prefers-reduced-motion: reduce) {
                          * {
                            animation-duration: 0.01ms !important;
                            animation-iteration-count: 1 !important;
                            transition-duration: 0.01ms !important;
                          }
                        }
                      `}</style>
                    </div>
                </div>
              </div>

              {/* Paragrafo */}
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Investiamo nelle tue campagne <span className="font-bold">Google Ads</span> con <span className="font-bold">keyword vincenti</span> e <span className="font-bold">creatività ottimizzate</span> per massimizzare le conversioni. <br />
                Se non funziona, <span className="font-bold">copriamo noi le perdite</span>.
              </p>

              {/* Pulsante Candidati */}
              <button
                onClick={scrollToContactForm}
                className="gradient-bg-brand gradient-bg-brand-hover text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all text-sm sm:text-base transform hover:scale-105"
              >
                <FaEnvelope className="inline mr-2" /> Candidati
              </button>
            </div>

            {/* MacBook mockup - colonna destra */}
            <div className="hidden lg:flex lg:items-center lg:justify-center">
              <div className={`relative w-full ${visibleSections.includes('google-ads') ? 'slide-up-visible' : ''}`}>
                <Image
                  src="/images/macbook-ads.png"
                  alt="Google Ads Dashboard"
                  width={600}
                  height={450}
                  quality={100}
                  priority
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Meta Ads Section */}
      <section
        id="meta-ads"
        className="py-16 px-0 bg-gradient-to-br from-purple-50/15 via-white to-pink-50/10 relative overflow-hidden"
        data-section="meta-ads"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/30 via-transparent to-pink-50/30"></div>

        <div className="w-full max-w-7xl mx-auto relative z-10 px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Text content for Meta Ads */}
            <div className={`lg:order-2 space-y-6 lg:space-y-8 slide-up-enter slide-up-delay-1 ${visibleSections.includes('meta-ads') ? 'slide-up-visible' : ''}`}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{color: '#1c1a31'}}>
                Campagne Pubblicitarie su <span className="inline-flex items-center gap-2"><span className="font-bold bg-gradient-to-r from-[#0064e1] to-[#0081fb] bg-clip-text text-transparent">Meta Ads</span>
                <Image
                  src="/images/icons/metavett.svg"
                  alt="Meta"
                  width={48}
                  height={48}
                  className="inline-block w-10 h-10 lg:w-12 lg:h-12"
                /></span>
              </h2>
              
              {/* Mobile Meta Ads Journey - Under title */}
              <div className={`lg:hidden ${visibleSections.includes('meta-ads') ? 'visible' : ''}`}>
                <MetaAdsJourney />
              </div>
              {/* Main KPI Highlight Box - stesso stile del box Google Ads */}
              <div className="mx-auto max-w-sm sm:max-w-md lg:max-w-none">
                <div
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden relative"
                  style={{
                    background: 'linear-gradient(to right, #0064e1 0%, #0081fb 50%, #0064e1 100%)',
                    padding: '4px',
                  }}
                >
                  <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-10 min-h-[240px] sm:min-h-[260px] lg:min-h-[280px]">
                    {/* Container principale con griglia a 3 colonne */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-6 lg:min-h-[140px]">

                      {!expandedMetaAd ? (
                        <>
                          {/* Stato chiuso: 3 icone nelle loro colonne - Ordine: Instagram, Facebook, Messenger */}
                          <button
                            role="tab"
                            aria-selected={false}
                            aria-controls="panel-instagram"
                            tabIndex={0}
                            className="text-center space-y-2 p-2 sm:p-3 lg:p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-[600ms] ease-out hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#E4405F] focus:ring-offset-2"
                            onClick={() => setExpandedMetaAd('instagram')}
                            style={{ transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                          >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto hover:scale-110 transition-transform duration-300 relative group">
                              <svg viewBox="0 0 48 48" className="w-full h-full">
                                <radialGradient id="instagram-gradient" cx="19%" cy="100%" r="100%">
                                  <stop offset="0%" stopColor="#FED576"/>
                                  <stop offset="26%" stopColor="#F47133"/>
                                  <stop offset="61%" stopColor="#BC3081"/>
                                  <stop offset="100%" stopColor="#4F5BD5"/>
                                </radialGradient>
                                <rect width="48" height="48" rx="12" fill="url(#instagram-gradient)"/>
                                <rect x="12" y="12" width="24" height="24" rx="7" fill="none" stroke="white" strokeWidth="2.5"/>
                                <circle cx="24" cy="24" r="5.5" fill="none" stroke="white" strokeWidth="2.5"/>
                                <circle cx="32.5" cy="15.5" r="1.5" fill="white"/>
                              </svg>
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F47133] to-[#BC3081] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-[15px] sm:text-base lg:text-lg text-gray-800 font-semibold">Instagram Ads</h3>
                          </button>

                          <button
                            role="tab"
                            aria-selected={false}
                            aria-controls="panel-facebook"
                            tabIndex={-1}
                            className="text-center space-y-2 p-2 sm:p-3 lg:p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-[600ms] ease-out hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:ring-offset-2"
                            onClick={() => setExpandedMetaAd('facebook')}
                            style={{ transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                          >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto hover:scale-110 transition-transform duration-300 relative group">
                              <svg viewBox="0 0 48 48" className="w-full h-full">
                                <circle cx="24" cy="24" r="24" fill="#1877F2"/>
                                <path d="M36 24c0-6.63-5.37-12-12-12s-12 5.37-12 12c0 5.99 4.39 10.95 10.125 11.85V27.56h-3v-3.56h3v-2.71c0-2.96 1.76-4.59 4.45-4.59 1.29 0 2.64.23 2.64.23v2.91h-1.49c-1.46 0-1.92.91-1.92 1.84V24h3.28l-.52 3.56h-2.76v8.29C31.61 34.95 36 29.99 36 24z" fill="white"/>
                              </svg>
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1877f2] to-[#0064e1] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-[15px] sm:text-base lg:text-lg text-gray-800 font-semibold">Facebook Ads</h3>
                          </button>

                          <button
                            role="tab"
                            aria-selected={false}
                            aria-controls="panel-messenger"
                            tabIndex={-1}
                            className="text-center space-y-2 p-2 sm:p-3 lg:p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-[600ms] ease-out hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#00B2FF] focus:ring-offset-2"
                            onClick={() => setExpandedMetaAd('messenger')}
                            style={{ transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                          >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto hover:scale-110 transition-transform duration-300 relative group">
                              <svg viewBox="0 0 48 48" className="w-full h-full">
                                <linearGradient id="messenger-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="#00B2FF"/>
                                  <stop offset="100%" stopColor="#006AFF"/>
                                </linearGradient>
                                <rect width="48" height="48" rx="24" fill="url(#messenger-gradient)"/>
                                <path d="M24 10C16.268 10 10 15.825 10 23c0 4.091 2.042 7.742 5.234 10.119V38l4.771-2.621c1.274.353 2.619.54 3.995.54 7.732 0 14-5.825 14-13S31.732 10 24 10zm1.39 17.52l-3.572-3.808-6.968 3.808L22.582 19l3.66 3.808 6.88-3.808-7.732 8.52z" fill="white"/>
                              </svg>
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00B2FF] to-[#006AFF] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-[15px] sm:text-base lg:text-lg text-gray-800 font-semibold">Messenger Ads</h3>
                          </button>
                        </>
                      ) : (
                        <>
                          {/* Stato aperto: icona attiva in col1, pannello in col2-3 */}
                          <div className="col-span-3 grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">

                            {/* Colonna 1: icona attiva */}
                            <button
                              role="tab"
                              aria-selected={true}
                              aria-controls={`panel-${expandedMetaAd}`}
                              tabIndex={0}
                              className="text-center space-y-2 p-2 sm:p-3 lg:p-4 rounded-lg cursor-pointer bg-gradient-to-r from-blue-50/50 to-purple-50/50 border-b-2 border-[#0064e1] shadow-sm transition-all duration-[600ms] ease-out hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0064e1] focus:ring-offset-2"
                              onClick={() => setExpandedMetaAd(null)}
                              style={{
                                gridColumn: '1',
                                animation: expandedMetaAd === 'instagram' ? 'none' : 'slideToLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                              }}
                            >
                              {expandedMetaAd === 'instagram' && (
                                <>
                                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto transition-transform duration-300 relative group">
                                    <svg viewBox="0 0 48 48" className="w-full h-full">
                                      <radialGradient id="instagram-gradient-active" cx="19%" cy="100%" r="100%">
                                        <stop offset="0%" stopColor="#FED576"/>
                                        <stop offset="26%" stopColor="#F47133"/>
                                        <stop offset="61%" stopColor="#BC3081"/>
                                        <stop offset="100%" stopColor="#4F5BD5"/>
                                      </radialGradient>
                                      <rect width="48" height="48" rx="12" fill="url(#instagram-gradient-active)"/>
                                      <rect x="12" y="12" width="24" height="24" rx="7" fill="none" stroke="white" strokeWidth="2.5"/>
                                      <circle cx="24" cy="24" r="5.5" fill="none" stroke="white" strokeWidth="2.5"/>
                                      <circle cx="32.5" cy="15.5" r="1.5" fill="white"/>
                                    </svg>
                                  </div>
                                  <h3 className="text-[15px] sm:text-base lg:text-lg text-gray-800 font-bold">Instagram Ads</h3>
                                </>
                              )}
                              {expandedMetaAd === 'facebook' && (
                                <>
                                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto transition-transform duration-300 relative group">
                                    <svg viewBox="0 0 48 48" className="w-full h-full">
                                      <circle cx="24" cy="24" r="24" fill="#1877F2"/>
                                      <path d="M36 24c0-6.63-5.37-12-12-12s-12 5.37-12 12c0 5.99 4.39 10.95 10.125 11.85V27.56h-3v-3.56h3v-2.71c0-2.96 1.76-4.59 4.45-4.59 1.29 0 2.64.23 2.64.23v2.91h-1.49c-1.46 0-1.92.91-1.92 1.84V24h3.28l-.52 3.56h-2.76v8.29C31.61 34.95 36 29.99 36 24z" fill="white"/>
                                    </svg>
                                  </div>
                                  <h3 className="text-[15px] sm:text-base lg:text-lg text-gray-800 font-bold">Facebook Ads</h3>
                                </>
                              )}
                              {expandedMetaAd === 'messenger' && (
                                <>
                                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto transition-transform duration-300 relative group">
                                    <svg viewBox="0 0 48 48" className="w-full h-full">
                                      <linearGradient id="messenger-gradient-active" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#00B2FF"/>
                                        <stop offset="100%" stopColor="#006AFF"/>
                                      </linearGradient>
                                      <rect width="48" height="48" rx="24" fill="url(#messenger-gradient-active)"/>
                                      <path d="M24 10C16.268 10 10 15.825 10 23c0 4.091 2.042 7.742 5.234 10.119V38l4.771-2.621c1.274.353 2.619.54 3.995.54 7.732 0 14-5.825 14-13S31.732 10 24 10zm1.39 17.52l-3.572-3.808-6.968 3.808L22.582 19l3.66 3.808 6.88-3.808-7.732 8.52z" fill="white"/>
                                    </svg>
                                  </div>
                                  <h3 className="text-[15px] sm:text-base lg:text-lg text-gray-800 font-bold">Messenger Ads</h3>
                                </>
                              )}
                            </button>

                            {/* Colonne 2-3: pannello descrizione */}
                            <div
                              role="tabpanel"
                              id={`panel-${expandedMetaAd}`}
                              className="col-span-2 flex items-center bg-gray-50/50 rounded-lg p-4 shadow-sm"
                              style={{
                                animation: 'slideInFromLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                                minHeight: '100px'
                              }}
                            >
                              <div key={expandedMetaAd} className="w-full">
                                {expandedMetaAd === 'facebook' && (
                                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                    <span className="font-bold">2.9 miliardi di utenti</span> attivi. Raggiungi il tuo pubblico con <span className="font-bold">targeting preciso</span> per età, interessi e comportamenti.
                                  </p>
                                )}
                                {expandedMetaAd === 'instagram' && (
                                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                    <span className="font-bold">Stories, Reels e Feed</span>: contenuti visivi che generano <span className="font-bold">engagement</span> e vendite immediate.
                                  </p>
                                )}
                                {expandedMetaAd === 'messenger' && (
                                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                    <span className="font-bold">Conversazioni dirette</span> con i clienti. Automazione e <span className="font-bold">chatbot</span> per vendite 24/7.
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Copy centrale (sempre visibile, con trasparenza variabile) */}
                    <div className="text-center pt-3 border-t border-gray-200">
                      <p className={`text-[15px] sm:text-lg lg:text-xl font-semibold text-gray-800 inline-block px-3 transition-opacity duration-600 ease-out ${expandedMetaAd ? 'opacity-80' : 'opacity-100'}`} style={{ transition: 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
                        💰 Ogni €1 investito = €12,5 di ritorno medio
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Sfruttiamo il potere di Facebook e Instagram per creare <span className="font-bold">campagne mirate</span> e <span className="font-bold">contenuti virali</span>.<br />
                Grazie a strategie di <span className="font-bold">targeting avanzato</span>, portiamo milioni di persone a scoprire e acquistare il tuo brand.<br />
                Con Meta Ads, <span className="font-bold">investiamo sul tuo successo</span> e condividiamo i risultati.
              </p>
              <button 
                onClick={scrollToContactForm}
                className="gradient-bg-brand gradient-bg-brand-hover text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all text-sm sm:text-base transform hover:scale-105"
              >
                <FaEnvelope className="inline mr-2" /> Candidati
              </button>
            </div>
            
            {/* Desktop Meta Ads Journey - left side */}
            <div className={`lg:order-1 hidden lg:block ${visibleSections.includes('meta-ads') ? 'visible' : ''}`}>
              <MetaAdsJourney />
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{color: '#1c1a31'}}>
                Viralità e Vendite con <span className="font-bold bg-gradient-to-r from-[#000000] from-5% to-[#EE1D52] to-60% bg-clip-text text-transparent">TikTok Ads</span>
              </h2>
              
              {/* Dashboard Box - mobile only, under title */}
              <div className={`lg:hidden dashboard-window-drop ${visibleSections.includes('tiktok-ads') ? 'visible' : ''}`}>
                {/* Dashboard Header */}
                <div className="dashboard-header bg-white rounded-t-2xl border border-gray-200 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 p-4 relative">
                  {/* TikTok Logo in Corners */}
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

            {/* Ciaone */}
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

      {/* Image */}
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