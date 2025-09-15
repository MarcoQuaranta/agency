'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-blue-50/60 to-blue-100/30 border-t border-blue-100 relative overflow-hidden">

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-blue-300/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-10 left-1/3 w-36 h-36 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-blue-300/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>

        {/* Wave pattern */}
        <svg className="absolute bottom-0 left-0 w-full h-24 opacity-20" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="currentColor" className="text-blue-300" d="M0,50 C320,90 420,10 720,50 C1020,90 1120,10 1440,50 L1440,100 L0,100 Z"></path>
        </svg>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(59, 130, 246, 0.15) 35px, rgba(59, 130, 246, 0.15) 36px),
                             repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(59, 130, 246, 0.15) 35px, rgba(59, 130, 246, 0.15) 36px)`
          }}></div>
        </div>
      </div>

      <div className="w-full max-w-7xl lg:max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Logo centered at top */}
        <div className="flex justify-center mb-12">
          <div className="relative cursor-pointer">
            <div className="absolute -inset-6 bg-gradient-to-r from-blue-200/30 to-blue-300/30 rounded-full blur-xl"></div>
            <Link href="/">
              <Image
                src="/images/logo-2.png"
                alt="SafeScale Agency Logo"
                width={320}
                height={107}
                className="h-20 sm:h-24 w-auto hover:opacity-90 transition-opacity relative z-10"
              />
            </Link>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Navigation Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Navigazione</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/#servizi" className="block text-gray-600 hover:text-blue-600 transition-colors">Servizi</Link>
              <Link href="/#chi-siamo" className="block text-gray-600 hover:text-blue-600 transition-colors">Chi Siamo</Link>
              <Link href="/#contatti" className="block text-gray-600 hover:text-blue-600 transition-colors">Contatti</Link>
              <Link href="/privacy-policy" className="block text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Contatti</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <FaEnvelope className="text-blue-600" />
                <a href="mailto:info@safescaleagency.com" className="hover:text-blue-600 transition-colors">
                  info@safescaleagency.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <FaPhone className="text-blue-600" />
                <a href="tel:+390123456789" className="hover:text-blue-600 transition-colors">
                  +39 012 345 6789
                </a>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Informazioni Legali</h3>
            <div className="space-y-2 text-gray-600">
              <p>P.IVA: 12345678901</p>
              <p>Sede Legale: Milano, Italia</p>
              <Link href="/privacy-policy" className="block text-blue-600 hover:text-blue-700 transition-colors font-medium">
                Informativa Privacy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-200/50 pt-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} SafeScale Agency. Tutti i diritti riservati.
            </p>
            <div className="flex justify-center items-center gap-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-600 hover:text-blue-600 transition-colors">
                Privacy & Cookie Policy
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
                Termini e Condizioni
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}