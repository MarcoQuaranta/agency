'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaChevronDown } from 'react-icons/fa';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="w-full max-w-7xl lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center cursor-pointer">
            <Image
              src="/images/logo-2.png"
              alt="SafeScale Agency Logo"
              width={240}
              height={80}
              className="h-14 w-auto hover:opacity-90 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-custom-dark hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className="flex items-center gap-1 text-custom-dark hover:text-blue-600 transition-colors font-medium"
              >
                Servizi
                <FaChevronDown className={`text-xs transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/#chi-siamo" className="text-custom-dark hover:text-blue-600 transition-colors font-medium">
              Chi Siamo
            </Link>
            <Link href="/#contatti" className="text-custom-dark hover:text-blue-600 transition-colors font-medium">
              Contatti
            </Link>
          </nav>

          {/* Desktop Button */}
          <button
            onClick={scrollToContactForm}
            className="hidden md:block gradient-bg-brand gradient-bg-brand-hover text-white px-6 py-2 rounded-full transition-all transform hover:scale-105"
          >
            <FaEnvelope className="inline mr-2" /> Candidati
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col space-y-1 p-2"
          >
            <span className={`w-6 h-0.5 bg-gray-800 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-800 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-800 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="px-4 py-4 space-y-3">
          <Link href="/" className="block text-custom-dark hover:text-blue-600 transition-colors font-medium py-2">
            Home
          </Link>

          {/* Mobile Services Dropdown */}
          <div>
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className="flex items-center justify-between w-full text-custom-dark hover:text-blue-600 transition-colors font-medium py-2"
            >
              Servizi
              <FaChevronDown className={`text-xs transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {servicesDropdownOpen && (
              <div className="pl-4 space-y-2 mt-2">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="block text-gray-600 hover:text-blue-600 transition-colors py-1"
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

          <Link href="/#chi-siamo" className="block text-custom-dark hover:text-blue-600 transition-colors font-medium py-2">
            Chi Siamo
          </Link>
          <Link href="/#contatti" className="block text-custom-dark hover:text-blue-600 transition-colors font-medium py-2">
            Contatti
          </Link>

          <button
            onClick={() => {
              scrollToContactForm();
              setMobileMenuOpen(false);
            }}
            className="gradient-bg-brand gradient-bg-brand-hover text-white px-6 py-3 rounded-full transition-all text-center mt-4 transform hover:scale-105 w-full"
          >
            <FaEnvelope className="inline mr-2" /> Candidati
          </button>
        </div>
      </div>
    </header>
  );
}