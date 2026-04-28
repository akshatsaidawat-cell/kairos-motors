"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function Counter({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60); // Assuming 60fps
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 1000 / 60);
      
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="w-full bg-bg-panel border-y border-white/5 relative overflow-hidden py-32">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Story */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <p className="text-gold text-xs uppercase tracking-widest mb-4">Our Heritage</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
                Preserving <br/> Automotive <span className="italic text-white/50">History.</span>
              </h2>
            </div>
            
            <p className="text-gray-400 font-sans text-lg leading-relaxed max-w-lg font-light">
              The Iron Archive is a premium classic car dealership with a passion for automotive history. 
              Every car in our collection is hand-picked, fully restored, and road ready. 
              Visit our showroom to experience these legends in person.
            </p>

            <button className="w-full sm:w-auto border border-gold text-gold px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-gold hover:text-black transition-colors duration-500">
              Visit Our Showroom
            </button>
          </div>

          {/* Right Side: Animated Stats */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="pl-6 border-l border-gold/30"
              >
                <h3 className="font-serif text-6xl text-white mb-2 tracking-tighter">
                  <Counter end={5} />
                </h3>
                <p className="text-gold text-xs uppercase tracking-widest font-bold">Cars in Collection</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="pl-6 border-l border-gold/30"
              >
                <h3 className="font-serif text-6xl text-white mb-2 tracking-tighter">
                  <Counter end={500} suffix="+" />
                </h3>
                <p className="text-gold text-xs uppercase tracking-widest font-bold">Happy Clients</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pl-6 border-l border-gold/30 sm:col-span-2"
              >
                <h3 className="font-serif text-6xl text-white mb-2 tracking-tighter">
                  <Counter end={20} suffix="+" />
                </h3>
                <p className="text-gold text-xs uppercase tracking-widest font-bold">Years Experience</p>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
