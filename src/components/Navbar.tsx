"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { showToast } from './Toast';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Inventory', href: '/#inventory' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'py-4 bg-black/60 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
            : 'py-6 bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="font-serif text-2xl tracking-widest text-gold hover:text-gold-hover transition-colors">
            KAIROS MOTORS
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm uppercase tracking-widest text-white/80 hover:text-gold transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => showToast("Thank you for your interest! This is a demo website.")}
              className="hidden md:block px-6 py-2 border border-gold text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-black transition-all duration-300"
            >
              Book Test Drive
            </button>
            <button 
              className="md:hidden text-white hover:text-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-4 flex flex-col items-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8 w-full">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl uppercase tracking-widest text-white hover:text-gold transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
              <button 
                onClick={() => {
                  showToast("Thank you for your interest! This is a demo website.");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full max-w-xs mt-8 px-6 py-4 border border-gold text-gold text-sm uppercase tracking-widest hover:bg-gold hover:text-black transition-all duration-300"
              >
                Book Test Drive
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
