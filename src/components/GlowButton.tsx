'use client';

import React from 'react';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const GlowButton: React.FC<GlowButtonProps> = ({ 
  children, 
  onClick, 
  className = '',
  type = 'button'
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`glow-button-wrapper ${className}`}
    >
      <style jsx>{`
        .glow-button-wrapper {
          position: relative;
          overflow: visible;
        }
        
        .glow-button-wrapper::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          background: conic-gradient(
            from var(--angle, 0deg),
            transparent 0deg,
            transparent 340deg,
            #a855f7 345deg,
            #ec4899 350deg,
            #3b82f6 355deg,
            #ffffff 360deg
          );
          padding: 2px;
          z-index: -1;
          animation: rotate-border 3s linear infinite;
        }
        
        .glow-button-wrapper::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          z-index: -2;
          filter: blur(20px);
          opacity: 0.5;
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        @keyframes rotate-border {
          from {
            --angle: 0deg;
          }
          to {
            --angle: 360deg;
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.8;
          }
        }
        
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        
        /* Moving star effect */
        .glow-button-wrapper .star-trail {
          position: absolute;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, #fff 0%, #a855f7 30%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          filter: blur(2px);
          animation: orbit-path 2.5s linear infinite;
          z-index: 10;
          box-shadow: 
            0 0 20px #a855f7,
            0 0 40px #a855f7,
            0 0 60px #ec4899;
        }
        
        @keyframes orbit-path {
          0% {
            offset-distance: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            offset-distance: 100%;
            opacity: 0;
          }
        }
        
        .glow-button-wrapper .star-trail {
          offset-path: path('M 0,25 Q 50,0 100,25 T 200,25 T 300,25 T 400,25');
          animation: move-along-path 3s linear infinite;
        }
        
        @keyframes move-along-path {
          0% {
            transform: translateX(-50px) translateY(0);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          25% {
            transform: translateX(0) translateY(-15px);
          }
          50% {
            transform: translateX(50px) translateY(0);
          }
          75% {
            transform: translateX(0) translateY(15px);
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateX(-50px) translateY(0);
            opacity: 0;
          }
        }
      `}</style>
      <span className="star-trail"></span>
      {children}
    </button>
  );
};

export default GlowButton;