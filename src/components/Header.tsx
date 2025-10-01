'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaChevronDown,FaEnvelope } from 'react-icons/fa';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isHeaderSolid, setIsHeaderSolid] = useState(true); // Sempre solid/liquid
  const dropdownRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number>(0);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

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



  // Header sempre solid/liquid - no scroll detection needed
  // Manteniamo isHeaderSolid = true sempre


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const services = [
    { name: 'Google Ads', href: '/#google-ads' },
    { name: 'Facebook Ads', href: '/#facebook-ads' },
    { name: 'SEO', href: '/#seo' },
    { name: 'Email Marketing', href: '/#email-marketing' },
    { name: 'Social Media', href: '/#social-media' },
    { name: 'Consulenza', href: '/#consulenza' }
  ];

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

      <header className="fixed top-0 w-full z-50">
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

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="flex items-center gap-1 text-white hover:text-purple-300 transition-colors font-medium text-lg"
              >
                Servizi
                <FaChevronDown className={`text-xs text-white transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg py-2" style={{
                    background: 'linear-gradient(135deg, #1a0f2e 0%, #2d1b69 100%)',
                    border: '1px solid rgba(138, 43, 226, 0.3)'
                  }}
                >
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="block px-4 py-2 text-white hover:bg-purple-800/30 transition-colors"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/#chi-siamo"
              className="text-white hover:text-purple-300 transition-colors font-medium text-lg"
            >
              Chi Siamo
            </Link>
            <Link
              href="/#contatti"
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

          {/* Mobile Services Dropdown */}
          <div>
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className="flex items-center justify-between w-full text-white hover:text-purple-300 transition-colors font-medium py-2"
            >
              Servizi
              <FaChevronDown className={`text-xs text-purple-300 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {servicesDropdownOpen && (
              <div className="pl-4 space-y-2 mt-2">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="block text-purple-200 hover:text-purple-100 transition-colors py-1"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setServicesDropdownOpen(false);
                    }}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/#chi-siamo" className="block text-white hover:text-purple-300 transition-colors font-medium py-2">
            Chi Siamo
          </Link>
          <Link href="/#contatti" className="block text-white hover:text-purple-300 transition-colors font-medium py-2">
            Contatti
          </Link>

        </div>
      </div>
      </header>
    </>
  );
}