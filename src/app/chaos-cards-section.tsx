// Nuovo layout completo per la sezione delle card sparse con badge animati
// DA INSERIRE in page.tsx sostituendo la sezione esistente

export const ChaosCardsSection = () => {
  // Configurazione card - 13 icone totali
  // SOSTITUIRE src CON I LOGHI REALI
  const apps = [
    { src: 'images/icons/business.png', alt: 'Business', badgeMode: 'down', badgeLabel: '73%', hasWarning: false },
    { src: 'images/icons/sitoweb.png', alt: 'Website', badgeMode: 'up', badgeLabel: '404', hasWarning: true },
    { src: 'images/icons/social.png', alt: 'Social', badgeMode: 'down', badgeLabel: '-12%', hasWarning: false },
    { src: 'images/icons/ads.png', alt: 'Ads', badgeMode: 'up', badgeLabel: '+89', hasWarning: false },
    { src: 'images/icons/spam.png', alt: 'Spam', badgeMode: 'up', badgeLabel: '156', hasWarning: true },
    { src: 'images/icons/soldi.png', alt: 'Money', badgeMode: 'down', badgeLabel: '-8k', hasWarning: false },
    { src: 'images/icons/business.png', alt: 'Analytics', badgeMode: 'up', badgeLabel: '42', hasWarning: false },
    { src: 'images/icons/sitoweb.png', alt: 'Errors', badgeMode: 'up', badgeLabel: '31', hasWarning: true },
    { src: 'images/icons/social.png', alt: 'Engagement', badgeMode: 'down', badgeLabel: '-45%', hasWarning: false },
    { src: 'images/icons/ads.png', alt: 'CPC', badgeMode: 'up', badgeLabel: '+2.3', hasWarning: false },
    { src: 'images/icons/spam.png', alt: 'Bounces', badgeMode: 'up', badgeLabel: '78', hasWarning: false },
    { src: 'images/icons/soldi.png', alt: 'ROI', badgeMode: 'down', badgeLabel: '-23%', hasWarning: false },
    { src: 'images/icons/business.png', alt: 'Time', badgeMode: 'up', badgeLabel: '+14h', hasWarning: false }
  ];
  
  // Configurazione badge animati per ogni card
  const badgeConfigs = [
    { min: 60, max: 85, step: 1, interval: 2200, suffix: '%' },
    { min: 400, max: 510, step: 3, interval: 3100, suffix: '' },
    { min: -25, max: -5, step: 1, interval: 2800, suffix: '%' },
    { min: 70, max: 120, step: 2, interval: 2400, suffix: '' },
    { min: 120, max: 200, step: 3, interval: 1900, suffix: '' },
    { min: -12, max: -3, step: 0.5, interval: 3400, suffix: 'k' },
    { min: 30, max: 60, step: 1, interval: 2600, suffix: '' },
    { min: 20, max: 45, step: 1, interval: 2900, suffix: '' },
    { min: -60, max: -30, step: 2, interval: 3200, suffix: '%' },
    { min: 1.5, max: 3.8, step: 0.1, interval: 2700, suffix: '' },
    { min: 50, max: 95, step: 2, interval: 2100, suffix: '' },
    { min: -35, max: -10, step: 1, interval: 3500, suffix: '%' },
    { min: 8, max: 24, step: 1, interval: 2300, suffix: 'h' }
  ];
  
  // Posizioni statiche predefinite con sovrapposizioni leggere
  const cardPositions = [
    { x: 15, y: 20, rotation: -5, zIndex: 5 },   // Top left
    { x: 35, y: 15, rotation: 3, zIndex: 4 },    // Top center
    { x: 70, y: 18, rotation: -7, zIndex: 6 },   // Top right
    { x: 25, y: 40, rotation: 4, zIndex: 7 },    // Mid left
    { x: 50, y: 35, rotation: -2, zIndex: 8 },   // Center
    { x: 75, y: 42, rotation: 6, zIndex: 5 },    // Mid right
    { x: 12, y: 65, rotation: -4, zIndex: 4 },   // Bottom left
    { x: 38, y: 70, rotation: 7, zIndex: 6 },    // Bottom center
    { x: 65, y: 68, rotation: -3, zIndex: 7 },   // Bottom right
    { x: 85, y: 30, rotation: 5, zIndex: 3 },    // Extra right
    { x: 45, y: 55, rotation: -6, zIndex: 9 },   // Extra center
    { x: 20, y: 85, rotation: 2, zIndex: 5 },    // Extra bottom
    { x: 60, y: 85, rotation: -5, zIndex: 4 }    // Extra bottom right
  ];

  return (
    <>
      {apps.map((app, i) => {
        const position = cardPositions[i];
        const iconSize = 'clamp(60px, 9vw, 92px)';
        const _config = badgeConfigs[i];
        const needsFlip = position.x > 75;
        
        return (
          <div
            key={i}
            className="chaos-card absolute"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: `translate(-50%, -50%) rotate(${position.rotation}deg)`,
              zIndex: position.zIndex
            }}
          >
            <div
              className="relative grid place-items-center bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              style={{
                width: iconSize,
                height: iconSize,
                padding: 'clamp(10px, 1.5vw, 16px)'
              }}
            >
              {/* Icona */}
              <img
                src={app.src}
                alt={app.alt}
                width={92}
                height={92}
                className="w-full h-full object-contain"
                loading="lazy"
              />
              
              {/* Badge rosso animato */}
              <span 
                className="animated-badge absolute inline-flex items-center justify-center bg-red-600 text-white font-semibold"
                data-mode={app.badgeMode}
                style={{
                  top: '-8px',
                  [needsFlip ? 'left' : 'right']: '-8px',
                  borderRadius: '9999px',
                  padding: '0 10px',
                  height: '26px',
                  minWidth: '26px',
                  width: 'auto',
                  fontSize: 'clamp(12px, 2vw, 14px)',
                  fontWeight: 600,
                  zIndex: 20,
                  lineHeight: '26px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  transition: 'transform 150ms ease',
                  willChange: 'transform'
                }}
              >
                {app.badgeLabel}
              </span>
              
              {/* Badge giallo warning (solo per alcune card) */}
              {app.hasWarning && (
                <div 
                  className="absolute"
                  style={{
                    bottom: '-6px',
                    left: '-6px',
                    width: '24px',
                    height: '24px',
                    zIndex: 15
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
      })}
    </>
  );
};

// CSS da aggiungere (se necessario)
const _styles = `
  .chaos-card {
    will-change: transform;
  }
  
  .chaos-card:hover {
    z-index: 50 !important;
  }
  
  @keyframes pulse-badge {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.08); }
  }
  
  .animated-badge {
    animation: pulse-badge 150ms ease;
  }
`;