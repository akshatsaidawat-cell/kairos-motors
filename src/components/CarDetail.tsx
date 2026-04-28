"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, ShieldCheck, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { showToast } from './Toast';

gsap.registerPlugin(ScrollTrigger);

const CARS = {
  'mustang-1964': { name: 'Ford Mustang', year: '1964', price: '₹70,00,000', category: 'American Muscle', engine: '289 cu in V8', hp: '271 hp', torque: '312 lb-ft', topSpeed: '120 mph', zeroToHundred: '7.3s', transmission: '4-Speed Manual', drivetrain: 'RWD', colors: 'Wimbledon White, Rangoon Red', condition: 'Restored', mileage: '12,500 miles' },
  'camaro-1967': { name: 'Chevrolet Camaro', year: '1967', price: '₹75,000,000', category: 'American Muscle', engine: '350 cu in V8', hp: '295 hp', torque: '380 lb-ft', topSpeed: '125 mph', zeroToHundred: '6.8s', transmission: '4-Speed Manual', drivetrain: 'RWD', colors: 'Tuxedo Black, Rallye Green', condition: 'Original', mileage: '34,200 miles' },
  'corvette-c2-1963': { name: 'Corvette C2 Sting Ray', year: '1963', price: '₹1,20,00,000', category: 'American Muscle', engine: '327 cu in V8', hp: '360 hp', torque: '352 lb-ft', topSpeed: '142 mph', zeroToHundred: '5.8s', transmission: '4-Speed Manual', drivetrain: 'RWD', colors: 'Riverside Red, Sebring Silver', condition: 'Restomod', mileage: '5,000 miles' },
  'bel-air-1955': { name: 'Chevrolet Bel Air', year: '1955', price: '₹65,00,000', category: 'American Muscle', engine: '265 cu in V8', hp: '162 hp', torque: '257 lb-ft', topSpeed: '105 mph', zeroToHundred: '12.9s', transmission: '2-Speed Powerglide', drivetrain: 'RWD', colors: 'Gypsy Red / Shoreline Beige', condition: 'Restored', mileage: '41,000 miles' },
  'charger-1968': { name: 'Dodge Charger', year: '1968', price: '₹95,00,000', category: 'American Muscle', engine: '426 Hemi V8', hp: '425 hp', torque: '490 lb-ft', topSpeed: '150 mph', zeroToHundred: '5.3s', transmission: '4-Speed Manual', drivetrain: 'RWD', colors: 'Plum Crazy, Bright Blue', condition: 'Restored', mileage: '18,300 miles' }
};

export default function CarDetail({ carId }: { carId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const playhead = useRef({ frame: 1 });
  const images = useRef<HTMLImageElement[]>([]);

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const folderName = carId.includes('mustang') ? 'mustang' :
                     carId.includes('camaro') ? 'camaro' :
                     carId.includes('corvette') ? 'corvette' :
                     carId.includes('bel') ? 'belair' :
                     carId.includes('charger') ? 'charger' : 'mustang';

  useEffect(() => {
    const frameCount = 168;
    let loadedCount = 0;
    
    // Clear array on re-mount
    images.current = [];
    
    const renderFrame = (frameNum: number) => {
      if (!canvasRef.current || !images.current[frameNum - 1]) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      
      const img = images.current[frameNum - 1];
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      const hRatio = canvasRef.current.width / img.width;
      const vRatio = canvasRef.current.height / img.height;
      const ratio = Math.min(hRatio, vRatio);
      const centerShift_x = (canvasRef.current.width - img.width * ratio) / 2;
      const centerShift_y = (canvasRef.current.height - img.height * ratio) / 2;  

      ctx.drawImage(img, 0, 0, img.width, img.height,
                        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);  
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameStr = i.toString().padStart(3, '0');
      img.src = `/cars/${folderName}/ezgif-frame-${frameStr}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          renderFrame(1);
        }
      };
      images.current.push(img);
    }

    const ctxGSAP = gsap.context(() => {
      gsap.to(playhead.current, {
        frame: frameCount,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
        scrub: typeof window !== 'undefined' && window.innerWidth < 768 ? true : 0.5,
        },
        onUpdate: () => renderFrame(playhead.current.frame)
      });
    }, containerRef);

    return () => ctxGSAP.revert();
  }, [folderName]);

  const car = CARS[carId as keyof typeof CARS] || { 
    name: 'Classic Luxury Vehicle', year: '1960s', price: 'Upon Request', category: 'Classic', 
    engine: 'Original Specs', hp: 'N/A', torque: 'N/A', topSpeed: 'N/A', zeroToHundred: 'N/A', 
    transmission: 'Manual', drivetrain: 'RWD', colors: 'Various', condition: 'Unknown', mileage: 'Unknown'
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  const specs = [
    { label: 'Engine', value: car.engine },
    { label: 'Horsepower', value: car.hp },
    { label: 'Torque', value: car.torque },
    { label: 'Top Speed', value: car.topSpeed },
    { label: '0-100 km/h', value: car.zeroToHundred },
    { label: 'Transmission', value: car.transmission },
    { label: 'Drivetrain', value: car.drivetrain },
    { label: 'Colors', value: car.colors },
    { label: 'Condition', value: car.condition },
    { label: 'Mileage', value: car.mileage },
  ];

  return (
    <div ref={containerRef} className="h-[400vh] bg-black text-white relative">
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden pt-24">
        
        <div className="absolute top-28 left-8 z-50">
          <Link href="/#inventory" className="flex items-center gap-2 text-gold hover:text-white transition-colors tracking-widest text-sm uppercase">
            <ArrowLeft size={16} /> Back to Inventory
          </Link>
        </div>

        {/* LEFT SIDE: 3D VIEW */}
        <div ref={leftSideRef} className="w-full md:w-1/2 lg:w-3/5 h-[50vh] md:h-full relative flex items-center justify-center perspective-1000">
          
          {/* Faded Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
            <span className="font-serif text-[12vw] md:text-[8vw] text-white/[0.02] whitespace-nowrap font-bold tracking-tighter select-none">
              {car.name.toUpperCase()}
            </span>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center opacity-50">
            <span className="text-xs uppercase tracking-widest mb-2 font-sans">Scroll to Explode</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent"></div>
          </div>

          <canvas 
            ref={canvasRef} 
            className="w-full h-full object-contain relative z-10 mix-blend-screen"
            width={1920}
            height={1080}
          />
        </div>

        {/* RIGHT SIDE: DETAILS PANEL */}
        <div ref={rightSideRef} className="w-full md:w-1/2 lg:w-2/5 h-[50vh] md:h-full bg-bg-panel border-l border-border-subtle p-6 sm:p-8 md:p-12 overflow-y-auto z-10 flex flex-col justify-start shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-8 pb-20 md:pb-12 pt-8"
          >
            <motion.div variants={fadeInUp}>
              <p className="text-gold text-xs uppercase tracking-widest mb-2">{car.category}</p>
              <h1 className="font-serif text-4xl md:text-5xl mb-2 text-white leading-tight">
                {car.name} <span className="text-white/30 italic text-3xl">{car.year}</span>
              </h1>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {specs.map((spec, idx) => (
                  <div key={idx} className="pl-4 border-l-2 border-gold">
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">{spec.label}</p>
                    <p className="text-white text-sm font-sans">{spec.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="pt-4 border-t border-border-subtle">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Asking Price</p>
              <p className="text-gold font-sans text-4xl font-bold tracking-tight">{car.price}</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4 pt-4">
              <button 
                onClick={() => setActiveModal('Buy Now')}
                className="w-full py-4 bg-gold text-black uppercase tracking-widest text-xs font-bold hover:bg-gold-hover transition-colors"
              >
                Buy Now
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => setActiveModal('Enquire')}
                  className="w-full py-4 sm:py-3 border border-gold text-gold uppercase tracking-widest text-xs sm:text-[10px] font-bold hover:bg-gold hover:text-black transition-colors"
                >
                  Enquire
                </button>
                <button 
                  onClick={() => setActiveModal('Book Test Drive')}
                  className="w-full py-4 sm:py-3 border border-white text-white uppercase tracking-widest text-xs sm:text-[10px] font-bold hover:bg-white hover:text-black transition-colors"
                >
                  Book Test Drive
                </button>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* MODAL OVERLAY */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-lg bg-bg-panel border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="mb-8">
                <h3 className="font-serif text-3xl text-white mb-2">{activeModal}</h3>
                <p className="text-gold text-sm tracking-widest uppercase">{car.name} ({car.year})</p>
              </div>

              <form className="space-y-6" onSubmit={(e) => { 
                e.preventDefault(); 
                showToast("Thank you for your interest! This is a demo website.");
                setActiveModal(null); 
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                    <input type="text" className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                    <input type="email" className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Phone Number</label>
                    <input type="tel" className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" required />
                  </div>
                  
                  {activeModal === 'Book Test Drive' && (
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Preferred Date</label>
                      <input type="date" className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors [color-scheme:dark]" required />
                    </div>
                  )}

                  {activeModal === 'Enquire' && (
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Message</label>
                      <textarea rows={3} className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" required></textarea>
                    </div>
                  )}
                </div>

                <button type="submit" className="w-full py-4 bg-gold text-black uppercase tracking-widest text-xs font-bold hover:bg-gold-hover transition-colors">
                  Submit {activeModal} Request
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
