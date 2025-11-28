'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <>
      <style jsx>{`
        /* Glass effect layer - più sottile */
        .footer-glass {
          position: absolute;
          inset: 0;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          opacity: 1;
          pointer-events: none;
        }

        /* Dark overlay - molto più scuro */
        .footer-dark {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(10,8,20,.92), rgba(5,4,12,.95));
          pointer-events: none;
        }

        /* Subtle gradient - molto più sottile */
        .subtle-gradient {
          background: linear-gradient(
            135deg,
            rgba(59,130,246,0.03),
            rgba(147,51,234,0.02),
            transparent
          );
        }

        /* Border glow - più sottile */
        .footer-border-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(99,102,241,0.2),
            rgba(99,102,241,0.2),
            transparent
          );
        }

        /* Subtle pattern overlay */
        .pattern-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: radial-gradient(circle at 1px 1px, rgba(99,102,241,0.3) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
      `}</style>

      <footer className="relative py-16 sm:py-20 overflow-hidden bg-gray-950">
        {/* Glass and dark layers */}
        <div className="footer-glass" />
        <div className="footer-dark" />

        {/* Subtle gradient overlay */}
        <div className="subtle-gradient absolute inset-0 pointer-events-none" />

        {/* Pattern overlay */}
        <div className="pattern-overlay" />

        {/* Border glow */}
        <div className="footer-border-glow" />

        <div className="relative z-10 w-full max-w-7xl lg:max-w-[1600px] mx-auto px-6 lg:px-12">
          {/* Logo centered at top */}
          <div className="flex justify-center mb-16">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Link href="/">
                <Image
                  src="/images/logo-4.png"
                  alt="SafeScale Agency Logo"
                  width={320}
                  height={107}
                  className="h-20 sm:h-24 w-auto opacity-90 hover:opacity-100 transition-opacity relative z-10"
                />
              </Link>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Navigation Links */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-white/90 mb-6">Navigazione</h3>
              <div className="space-y-3">
                <Link href="/" className="block text-gray-400 hover:text-white transition-colors duration-200">
                  Home
                </Link>
                <Link href="/#servizi" className="block text-gray-400 hover:text-white transition-colors duration-200">
                  Servizi
                </Link>
                <Link href="/#chi-siamo" className="block text-gray-400 hover:text-white transition-colors duration-200">
                  Chi Siamo
                </Link>
                <Link href="/#contatti" className="block text-gray-400 hover:text-white transition-colors duration-200">
                  Contatti
                </Link>
                <Link href="/privacy-policy" className="block text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center">
              <h3 className="text-lg font-bold text-white/90 mb-6">Contatti</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-gray-400 group">
                  <FaEnvelope className="text-indigo-500/70 group-hover:text-indigo-400 transition-colors" />
                  <a href="mailto:info@safescaleagency.com" className="hover:text-white transition-colors">
                    info@safescaleagency.com
                  </a>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="text-center md:text-right">
              <h3 className="text-lg font-bold text-white/90 mb-6">Informazioni Legali</h3>
              <div className="space-y-3 text-gray-400">
                <p>SMARTUP SRL</p>
                <p>Viale Delle Industrie 36</p>
                <p>81100 Caserta, Italia</p>
                <p>P.IVA: 09227760965</p>
                <Link href="/privacy-policy" className="block text-indigo-500/70 hover:text-indigo-400 transition-colors font-medium">
                  Informativa Privacy
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
            <div className="pt-8">
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-500">
                  © {new Date().getFullYear()} SafeScale Agency. Tutti i diritti riservati.
                </p>
                <p className="text-sm text-gray-500">
                  Powered by SMARTUP SRL
                </p>
                <div className="flex justify-center items-center gap-6 text-sm">
                  <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Privacy & Cookie Policy
                  </Link>
                  <span className="text-gray-700">|</span>
                  <Link href="/terms" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Termini e Condizioni
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}