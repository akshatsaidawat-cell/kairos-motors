"use client";

import Inventory from '@/components/Inventory';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="/cars/hero/car.webp" 
            className="w-full h-full object-cover opacity-60"
            alt="Hero Background"
          />
          {/* Dark semi-transparent overlay */}
          <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center"
        >
          <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-light text-white mb-6 tracking-wide drop-shadow-lg leading-tight">
            The Pinnacle of <span className="text-gold italic">Automotive</span> History
          </h1>
          <p className="text-gray-300 text-base md:text-xl font-sans max-w-2xl mb-10 font-light drop-shadow-md">
            Discover a curated collection of the world's most exclusive vintage vehicles. Restored for those who demand excellence.
          </p>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#inventory" 
            className="w-full sm:w-auto border border-gold text-gold px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-gold hover:text-black transition-colors duration-500 text-center"
          >
            View Collection
          </motion.a>
        </motion.div>
      </section>

      {/* Inventory Section */}
      <Inventory />

      {/* About Section */}
      <AboutSection />
      
      {/* Footer / Contact */}
      <Footer />
    </main>
  );
}
