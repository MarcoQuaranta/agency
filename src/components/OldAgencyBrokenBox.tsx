'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface CardConfig {
  iconSrc: string;
  title?: string;
  hasRedBadge?: boolean;
  badgeMode?: 'up' | 'down';
  badgeMin?: number;
  badgeMax?: number;
  badgeStep?: number;
  badgeInterval?: number;
  badgeSuffix?: string;
  hasWarning?: boolean;
  isStatic?: boolean;
  staticValue?: string;
}

export default function OldAgencyBrokenBox() {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const containerRef = useRef<HTMLDivElement>(null);

  // Card configurations - Soldi animated, others static
  const cards: CardConfig[] = [
    // Resi - animated from 15% to 65% then stays at 60%
    { iconSrc: '/images/icons/resi-logo.png', title: 'Returns', hasRedBadge: true, isStatic: false, badgeMode: 'up', badgeMin: 15, badgeMax: 65, badgeStep: 1, badgeInterval: 100, badgeSuffix: '% resi' },
    { iconSrc: '/images/icons/seodown-logo.png', title: 'Website', hasRedBadge: false, isStatic: true, staticValue: 'error 404', hasWarning: true },
    { iconSrc: '/images/icons/logo-instagram.png', title: 'Instagram', hasRedBadge: true, isStatic: false, staticValue: 'Ban' },
    { iconSrc: '/images/icons/likes-logo.png', title: 'Ads', hasRedBadge: true, isStatic: true, staticValue: 'E.R. 0,10%' },
    { iconSrc: '/images/icons/email-logo.png', title: 'Spam', hasRedBadge: true, isStatic: true, staticValue: '218 Spam', hasWarning: true },
    // Soldi - animated from -1000€ to -6000€ over 10 seconds
    { iconSrc: '/images/icons/soldi.png', title: 'Money', hasRedBadge: true, isStatic: false, badgeMode: 'down', badgeMin: -6000, badgeMax: -1000, badgeStep: 50, badgeInterval: 100, badgeSuffix: '€' },
    { iconSrc: '/images/icons/money-drop-logo.png', title: 'Analytics', hasRedBadge: true, isStatic: true, staticValue: '-40%' },
    { iconSrc: '/images/icons/domande-logo.png', title: 'Engagement', hasRedBadge: false, isStatic: true, staticValue: '-45%' },
    { iconSrc: '/images/icons/grafico-logo.png', title: 'ROI', hasRedBadge: true, isStatic: true, staticValue: 'ROAS' },
    // Time - animated from +1h to +48h with popup animation
    { iconSrc: '/images/icons/clessidra-logo.png', title: 'Time', hasRedBadge: true, isStatic: false, badgeMode: 'up', badgeMin: 1, badgeMax: 48, badgeStep: 1, badgeInterval: 100, badgeSuffix: 'h' }
  ];

  // Static positions with better spacing for 10 cards
  const generatePositions = () => {
    // Desktop positions - chaotic but organized
    const desktopPositions = [
      { x: 20, y: 25, rotation: -5, zIndex: 5 },   // Top left
      { x: 50, y: 20, rotation: 3, zIndex: 4 },    // Top center
      { x: 80, y: 28, rotation: -7, zIndex: 6 },   // Top right
      { x: 15, y: 50, rotation: 4, zIndex: 7 },    // Mid left
      { x: 40, y: 55, rotation: -2, zIndex: 8 },   // Center left
      { x: 65, y: 52, rotation: 6, zIndex: 5 },    // Center right
      { x: 85, y: 48, rotation: -4, zIndex: 4 },   // Mid right
      { x: 20, y: 80, rotation: 7, zIndex: 6 },    // Bottom left - moved for domande-logo
      { x: 55, y: 78, rotation: -3, zIndex: 7 },   // Bottom center
      { x: 75, y: 72, rotation: 5, zIndex: 5 }     // Bottom right
    ];

    // Mobile positions - increased spacing to prevent overlaps with 65px icons
    const mobilePositions = [
      { x: 20, y: 15, rotation: -3, zIndex: 5 },   // Top left
      { x: 80, y: 15, rotation: 2, zIndex: 4 },    // Top right
      { x: 50, y: 28, rotation: -1, zIndex: 6 },   // Center top
      { x: 15, y: 42, rotation: 3, zIndex: 7 },    // Mid left
      { x: 85, y: 42, rotation: -2, zIndex: 8 },   // Mid right
      { x: 35, y: 56, rotation: 1, zIndex: 5 },    // Center bottom left
      { x: 58, y: 50, rotation: -3, zIndex: 4 },   // Center bottom right - moved up-left for money-drop
      { x: 15, y: 75, rotation: 2, zIndex: 6 },    // Bottom left - moved for domande-logo
      { x: 50, y: 84, rotation: -1, zIndex: 7 },   // Bottom center
      { x: 80, y: 70, rotation: 3, zIndex: 5 }     // Bottom right
    ];

    // Tablet positions - 3 columns
    const tabletPositions = [
      { x: 20, y: 18, rotation: -3, zIndex: 5 },
      { x: 50, y: 16, rotation: 4, zIndex: 4 },
      { x: 80, y: 20, rotation: -5, zIndex: 6 },
      { x: 25, y: 35, rotation: 2, zIndex: 7 },
      { x: 55, y: 38, rotation: -4, zIndex: 8 },
      { x: 75, y: 36, rotation: 5, zIndex: 5 },
      { x: 15, y: 60, rotation: -2, zIndex: 4 },
      { x: 50, y: 58, rotation: 3, zIndex: 6 },
      { x: 80, y: 56, rotation: -3, zIndex: 7 },
      { x: 40, y: 72, rotation: 2, zIndex: 5 }
    ];

    // Return positions based on screen size
    if (screenSize === 'mobile') return mobilePositions;
    if (screenSize === 'tablet') return tabletPositions;
    return desktopPositions;
  };

  const cardPositions = generatePositions();

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target.getAttribute('data-section');
          if (section) {
            setVisibleSections((prev) => {
              if (entry.isIntersecting && !prev.includes(section)) {
                return [...prev, section];
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      data-section="old-agency-broken"
      className="relative h-full min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 sm:p-6 lg:p-8 shadow-sm"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 max-w-full">
        Il vecchio modello di Web Agency non è più sostenibile.
      </h2>
      <p className="mt-2 sm:mt-3 max-w-full sm:max-w-md text-sm sm:text-base text-slate-600">
        Inutile continuare a investire soldi senza garanzie e utilizzando tecniche obsolete, senza conoscere il potenziale reale e rischiando grosse perdite economiche.
      </p>

      {/* Chaos cards container */}
      <div className="relative mt-6 sm:mt-8 h-[380px] sm:h-[440px] lg:h-[480px] overflow-hidden">

        {/* SVG decorative paths - chaotic curved paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="dash" patternUnits="userSpaceOnUse" width="8" height="8">
              <path d="M0,4 L8,4" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4" />
            </pattern>
          </defs>
          {/* Single confusing serpentine path that covers entire box area */}
          <path
            d="M 10,15 
               C 25,10 35,20 50,15 
               Q 65,10 80,18 
               C 90,25 85,35 75,40 
               Q 60,45 45,42 
               C 30,38 20,45 10,48 
               Q 5,50 15,55 
               C 25,60 40,55 55,58 
               Q 70,61 85,56 
               C 95,52 90,65 80,70 
               Q 65,75 50,72 
               C 35,68 25,74 15,77 
               Q 5,80 10,75 
               C 15,70 25,65 35,60 
               Q 45,55 55,60 
               C 65,65 75,58 85,53 
               Q 95,48 90,35 
               C 85,25 70,30 55,38 
               Q 40,45 30,38 
               C 20,30 15,40 20,50 
               Q 25,60 40,65 
               C 55,70 70,65 80,70 
               Q 90,75 85,65 
               C 80,55 70,50 60,45 
               Q 50,40 40,35 
               C 30,30 20,35 10,30 
               Q 5,25 10,15
               
               M 5,10
               C 15,5 30,12 45,8
               Q 60,4 75,10
               C 85,15 90,25 85,35
               Q 80,45 65,50
               C 50,55 35,48 20,52
               Q 10,56 15,65
               C 20,74 35,78 50,82
               Q 65,86 80,83
               C 90,80 95,88 85,92
               Q 70,96 55,90
               C 40,84 25,88 15,90
               Q 5,92 10,85"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="3,2"
            opacity="0.7"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Cards */}
        {cards.map((card, index) => (
          <AnimatedCard
            key={index}
            config={card}
            position={cardPositions[index]}
            isVisible={visibleSections.includes('old-agency-broken')}
            screenSize={screenSize}
          />
        ))}
      </div>
    </div>
  );
}

// Individual card component with animation for specific cards
function AnimatedCard({ 
  config, 
  position, 
  isVisible,
  screenSize 
}: { 
  config: CardConfig; 
  position: { x: number; y: number; rotation: number; zIndex: number };
  isVisible: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
}) {
  const [animatedValue, setAnimatedValue] = useState(config.title === 'Time' ? 0 : config.title === 'Returns' ? 15 : -1000);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupScale, setPopupScale] = useState(0);
  const [warningScale, setWarningScale] = useState(config.hasWarning ? 0 : 1);
  const animationRef = useRef<number>();
  const warningAnimationRef = useRef<number>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Only animate Money, Time, Instagram and Returns cards
    if (config.isStatic) return;
    if (config.title !== 'Money' && config.title !== 'Time' && config.title !== 'Instagram' && config.title !== 'Returns') return;

    // Returns animation - goes from 15% to 60% when visible
    if (config.title === 'Returns') {
      if (!isVisible) {
        // If not visible yet, just show initial state
        setIsPopupVisible(true);
        setPopupScale(1);
        setAnimatedValue(15);
        return;
      }
      
      const animateReturns = () => {
        let startTime: number | null = null;
        const ANIMATION_DURATION = 6000; // 6 seconds to go from 15% to 60% - slower animation
        
        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          
          if (elapsed < ANIMATION_DURATION) {
            const progress = elapsed / ANIMATION_DURATION;
            // Ease out animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = 15 + Math.floor(easedProgress * 45); // From 15 to 60
            setAnimatedValue(currentValue);
            setIsPopupVisible(true);
            setPopupScale(1);
            animationRef.current = requestAnimationFrame(animate);
          } else {
            // Animation complete, stay at 60%
            setAnimatedValue(60);
            setIsPopupVisible(true);
            setPopupScale(1);
          }
        };
        
        // Show initial value immediately
        setIsPopupVisible(true);
        setPopupScale(1);
        setAnimatedValue(15);
        
        // Start animation after a short delay when becomes visible
        setTimeout(() => {
          animationRef.current = requestAnimationFrame(animate);
        }, 500);
      };
      
      // Run when becomes visible
      animateReturns();
      
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }

    // Instagram has a fast blinking animation
    if (config.title === 'Instagram') {
      const blinkAnimation = () => {
        // Fast blinking pattern: on-off-on-off-pause
        setIsPopupVisible(true);
        
        timeoutRef.current = setTimeout(() => {
          setIsPopupVisible(false);
          
          timeoutRef.current = setTimeout(() => {
            setIsPopupVisible(true);
            
            timeoutRef.current = setTimeout(() => {
              setIsPopupVisible(false);
              
              timeoutRef.current = setTimeout(() => {
                setIsPopupVisible(true);
                
                timeoutRef.current = setTimeout(() => {
                  setIsPopupVisible(false);
                  
                  // Pause before restarting
                  timeoutRef.current = setTimeout(() => {
                    blinkAnimation();
                  }, 800);
                }, 400);
              }, 200);
            }, 400);
          }, 200);
        }, 400);
      };
      
      // Start after 1 second delay
      timeoutRef.current = setTimeout(blinkAnimation, 1000);
      
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }

    // Animation phases with smooth transitions for Money and Time cards
    const runAnimationCycle = () => {
      let startTime: number | null = null;
      
      // Phase timings (in ms)
      const POPUP_DURATION = 600;      // Smoother popup
      const COUNT_DURATION = config.title === 'Time' ? 8000 : 10000;    // 8 seconds for Time, 10 for Money
      const POPDOWN_DURATION = 600;    // Smoother close
      const TOTAL_DURATION = POPUP_DURATION + COUNT_DURATION + POPDOWN_DURATION;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        if (elapsed < POPUP_DURATION) {
          // Phase 1: Pop up with easing
          const progress = elapsed / POPUP_DURATION;
          // Ease out cubic for smooth deceleration
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          setPopupScale(easedProgress);
          setIsPopupVisible(true);
          // Set initial value based on card type
          setAnimatedValue(config.title === 'Time' ? 0 : -1000);
        } 
        else if (elapsed < POPUP_DURATION + COUNT_DURATION) {
          // Phase 2: Count animation
          const countElapsed = elapsed - POPUP_DURATION;
          const countProgress = countElapsed / COUNT_DURATION;
          
          if (config.title === 'Time') {
            // For Time card: count from 0 to 40
            const currentValue = Math.floor(countProgress * 40);
            setAnimatedValue(currentValue);
          } else {
            // For Money card: count from -1000 to -6000
            const currentValue = -1000 + (countProgress * -5000);
            setAnimatedValue(currentValue);
          }
          setPopupScale(1);
        } 
        else if (elapsed < TOTAL_DURATION) {
          // Phase 3: Pop down with easing
          const popdownElapsed = elapsed - POPUP_DURATION - COUNT_DURATION;
          const popdownProgress = popdownElapsed / POPDOWN_DURATION;
          // Ease in cubic for smooth acceleration
          const easedProgress = Math.pow(1 - popdownProgress, 3);
          setPopupScale(easedProgress);
          // Set final value based on card type
          setAnimatedValue(config.title === 'Time' ? 40 : -6000);
        } 
        else {
          // Animation complete, hide and restart after delay
          setIsPopupVisible(false);
          setPopupScale(0);
          timeoutRef.current = setTimeout(runAnimationCycle, 2000);
          return;
        }

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start the first cycle after 1 second delay
    timeoutRef.current = setTimeout(runAnimationCycle, 1000);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [config.isStatic, config.title, isVisible]);

  // Warning triangle animation for Website and Spam cards
  useEffect(() => {
    if (!config.hasWarning) return;
    if (config.title !== 'Website' && config.title !== 'Spam') return;
    if (!isVisible) return; // Only animate when visible

    // Delay for Spam animation to start
    const startDelay = config.title === 'Spam' ? 500 : 0;
    
    const timeoutId = setTimeout(() => {
      const animateWarning = () => {
        let startTime: number | null = null;
        
        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
        
        // Same popup animation for both Website and Spam cards
        const period = 3500; // 3.5 seconds per cycle
        const cycleProgress = (elapsed % period) / period;
        
        let scale;
        if (cycleProgress < 0.1) {
          // Popup phase (0-10% of cycle): appear from 0 to 1.2
          const popupProgress = cycleProgress / 0.1;
          scale = popupProgress * 1.2;
        } else if (cycleProgress < 0.2) {
          // Shrink to normal (10-20% of cycle): from 1.2 to 1
          const shrinkProgress = (cycleProgress - 0.1) / 0.1;
          scale = 1.2 - (0.2 * shrinkProgress);
        } else if (cycleProgress < 0.5) {
          // Pulse phase (20-50% of cycle): gentle pulsation
          const pulseProgress = (cycleProgress - 0.2) / 0.3;
          scale = 1 + (0.15 * Math.sin(pulseProgress * Math.PI * 4)); // 2 pulses
        } else if (cycleProgress < 0.85) {
          // Stay at normal size (50-85% of cycle)
          scale = 1;
        } else {
          // Fade out (85-100% of cycle): disappear
          const fadeProgress = (cycleProgress - 0.85) / 0.15;
          scale = 1 - fadeProgress;
        }
        
        setWarningScale(scale);
        
        warningAnimationRef.current = requestAnimationFrame(animate);
      };
      
      warningAnimationRef.current = requestAnimationFrame(animate);
    };

    animateWarning();
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (warningAnimationRef.current) {
        cancelAnimationFrame(warningAnimationRef.current);
      }
    };
  }, [config.title, config.hasWarning, isVisible]);

  const formatValue = (value: number) => {
    if (config.badgeSuffix === '€') {
      // Format without thousands separator to avoid hydration mismatch
      return `${Math.round(value)}€`;
    }
    if (config.badgeSuffix === 'h') {
      // Format hours with +prefix
      return `+${Math.round(value)}h`;
    }
    if (config.badgeSuffix === '% resi') {
      // Format returns percentage
      return `${Math.round(value)}% resi`;
    }
    return `${Math.round(value)}${config.badgeSuffix || ''}`;
  };

  const needsFlip = position.x > 75;
  // Responsive icon sizes - uniform and slightly larger
  const iconSize = config.iconSrc.includes('domande-logo')
    ? (screenSize === 'mobile' ? '85px' : screenSize === 'tablet' ? '90px' : '100px')  // Larger for domande-logo
    : (screenSize === 'mobile' ? '70px' : screenSize === 'tablet' ? '75px' : '85px');  // Normal size for others

  // All icons now have box background
  const hasNoBox = false;

  return (
    <div
      className="chaos-card absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${position.rotation}deg)`,
        zIndex: position.zIndex,
        willChange: 'transform'
      }}
    >
      <div
        className={`relative grid place-items-center ${hasNoBox ? '' : 'bg-white rounded-2xl shadow-lg hover:shadow-2xl'} transition-shadow duration-300`}
        style={{
          width: iconSize,
          height: iconSize,
          padding: hasNoBox ? '0' : screenSize === 'mobile' ? '12px' : '14px'
        }}
      >
        {/* Icon */}
        <div className={`w-full h-full flex items-center justify-center ${screenSize === 'mobile' ? 'scale-125' : (config.iconSrc.includes('domande-logo') && screenSize === 'desktop' ? 'scale-[1.35]' : (config.iconSrc.includes('likes-logo') ? 'scale-125' : ''))}`}>
          <Image
            src={config.iconSrc}
            alt={config.title || 'Icon'}
            width={92}
            height={92}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
        
        {/* Red badge - static or animated with popup effect for Money */}
        {config.hasRedBadge && (
          <span 
            className="absolute inline-flex items-center justify-center bg-red-600 text-white font-semibold"
            style={{
              top: screenSize === 'mobile' ? '-10px' : '-8px',
              [needsFlip ? 'left' : 'right']: screenSize === 'mobile' ? '-10px' : '-8px',
              borderRadius: '9999px',
              padding: screenSize === 'mobile' ? '0 8px' : '0 10px',
              height: screenSize === 'mobile' ? '24px' : '26px',
              minWidth: screenSize === 'mobile' ? '24px' : '26px',
              fontSize: screenSize === 'mobile' ? '12px' : 'clamp(12px, 2vw, 14px)',
              fontWeight: 600,
              zIndex: 20,
              lineHeight: screenSize === 'mobile' ? '24px' : '26px',
              whiteSpace: 'nowrap',
              boxShadow: (config.title === 'Money' || config.title === 'Time') && isPopupVisible 
                ? `0 ${8 * popupScale}px ${16 * popupScale}px -2px rgba(220, 38, 38, ${0.4 * popupScale})` 
                : config.title === 'Instagram' ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transform: (config.title === 'Money' || config.title === 'Time')
                ? `rotate(${-position.rotation}deg) scale(${popupScale})`
                : `rotate(${-position.rotation}deg)`,
              opacity: (config.title === 'Money' || config.title === 'Time' || config.title === 'Instagram' || config.title === 'Returns') ? (isPopupVisible ? 1 : 0) : 1,
              transition: (config.title === 'Money' || config.title === 'Time' || config.title === 'Instagram' || config.title === 'Returns') ? 'none' : 'box-shadow 0.3s',
              willChange: (config.title === 'Money' || config.title === 'Time' || config.title === 'Instagram' || config.title === 'Returns') ? 'transform' : 'auto'
            }}
          >
            {config.title === 'Instagram' ? 'Ban' : (config.isStatic ? config.staticValue : formatValue(animatedValue))}
          </span>
        )}
        
        {/* Yellow warning badge with animation for Website and Spam */}
        {config.hasWarning && (
          <div 
            className="absolute"
            style={{
              bottom: screenSize === 'mobile' ? '-8px' : '-6px',
              left: screenSize === 'mobile' ? '-8px' : '-6px',
              width: screenSize === 'mobile' ? '18px' : '24px',
              height: screenSize === 'mobile' ? '18px' : '24px',
              zIndex: 15,
              transform: (config.title === 'Website' || config.title === 'Spam')
                ? `scale(${warningScale})` 
                : 'scale(1)',
              transformOrigin: 'center center',
              opacity: warningScale < 0.1 ? 0 : 1,
              filter: warningScale > 1.1
                ? `drop-shadow(0 0 ${6 * (warningScale - 1)}px rgba(255, 193, 7, 0.8))`
                : 'none',
              willChange: (config.title === 'Website' || config.title === 'Spam') ? 'transform, opacity, filter' : 'auto'
            }}
          >
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path
                d="M1 21L12 2L23 21H1Z"
                fill="#FFC107"
                stroke="#FFB300"
                strokeWidth="1"
              />
              <text
                x="12"
                y="18"
                textAnchor="middle"
                fill="black"
                fontSize="14"
                fontWeight="bold"
              >
                !
              </text>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}