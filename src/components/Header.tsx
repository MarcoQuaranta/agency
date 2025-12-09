'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  const scrollToContactForm = () => {
    // Check if we're on the home page
    if (window.location.pathname === '/') {
      // If on home page, trigger the contact form opening
      const event = new CustomEvent('openContactForm');
      window.dispatchEvent(event);

      // Scroll to hero section
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // If on another page, redirect to home with a parameter
      window.location.href = '/?openForm=true';
    }
  };

  // Handle scroll to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        setIsHeaderVisible(false);
      } else {
        // Scrolling up
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      <style jsx>{`
        /* Glass layer sempre attivo */
        .hdr-glass {
          position: absolute;
          inset: 0;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          opacity: 1;
          pointer-events: none;
          will-change: contents;
        }

        /* Dark overlay sempre attivo */
        .hdr-dark {
          position: absolute;
          inset: 0;
          background: rgba(10,8,24,.65);
          opacity: 1; /* Sempre visibile */
          pointer-events: none;
        }

        /* Rimuovo height animation per evitare stretching */
        .header-wrapper {
          position: relative;
          z-index: 10;
        }

        /* Border sottile sempre visibile */
        .header-border {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(255,255,255,.08);
          pointer-events: none;
        }

        /* Ombra leggera sempre visibile */
        .header-shadow {
          position: absolute;
          inset: 0;
          box-shadow: 0 4px 12px rgba(0,0,0,.15);
          opacity: 1;
          pointer-events: none;
        }
      `}</style>

      <header className={`fixed top-0 w-full z-50 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="hdr-glass" />
        <div className="hdr-dark" />
        <div className="header-shadow" />
        <div className="header-border" />
        <div className="header-wrapper">
        <div className="w-full max-w-7xl lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer relative z-10">
            <Image
              src="/images/logo-4.png"
              alt="SafeScale Agency Logo"
              width={240}
              height={80}
              className="h-14 w-auto hover:opacity-90 transition-opacity"
            />
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 relative z-10">
            <Link
              href="/"
              className="text-white hover:text-purple-300 transition-colors font-medium text-lg"
            >
              Home
            </Link>

            {/* Services Link */}
            <Link
              href="/servizi"
              className="text-white hover:text-purple-300 transition-colors font-medium text-lg"
            >
              Servizi
            </Link>

            <Link
              href="/chi-siamo"
              className="text-white hover:text-purple-300 transition-colors font-medium text-lg"
            >
              Chi Siamo
            </Link>
            <Link
              href="/contatti"
              className="text-white hover:text-purple-300 transition-colors font-medium text-lg"
            >
              Contatti
            </Link>
          </nav>

          {/* CTA Button */}
          <button
            onClick={scrollToContactForm}
            className="hidden md:flex items-center gap-2 gradient-bg-brand gradient-bg-brand-hover text-white px-6 py-2.5 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl relative z-10"
          >
            <FaEnvelope className="text-sm" />
            <span className="font-medium">Candidati</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col space-y-1 p-2 relative z-10"
          >
            <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
        </div>
        </div>

        {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 shadow-lg transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0f2e 50%, #2d1b69 100%)',
          borderBottom: '1px solid rgba(138, 43, 226, 0.3)'
        }}
      >
        <div className="px-4 py-4 space-y-3">
          <Link href="/" className="block text-white hover:text-purple-300 transition-colors font-medium py-2">
            Home
          </Link>

          {/* Mobile Services Link */}
          <Link
            href="/servizi"
            className="block text-white hover:text-purple-300 transition-colors font-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Servizi
          </Link>

          <Link href="/chi-siamo" className="block text-white hover:text-purple-300 transition-colors font-medium py-2">
            Chi Siamo
          </Link>
          <Link href="/contatti" className="block text-white hover:text-purple-300 transition-colors font-medium py-2">
            Contatti
          </Link>

        </div>
      </div>
      </header>
    </>
  );
}