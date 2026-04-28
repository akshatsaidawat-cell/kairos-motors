"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const INVENTORY = [
  {
    id: 'mustang-1964',
    name: 'Ford Mustang',
    year: '1964',
    price: '₹70,00,000',
    category: 'American Muscle',
    status: 'Available',
    image: '/cars/mustang/ezgif-frame-001.jpg'
  },
  {
    id: 'camaro-1967',
    name: 'Chevrolet Camaro',
    year: '1967',
    price: '₹75,00,000',
    category: 'American Muscle',
    status: 'Reserved',
    image: '/cars/camaro/ezgif-frame-001.jpg'
  },
  {
    id: 'corvette-c2-1963',
    name: 'Corvette C2 Sting Ray',
    year: '1963',
    price: '₹1,20,00,000',
    category: 'American Muscle',
    status: 'Available',
    image: '/cars/corvette/ezgif-frame-001.jpg'
  },
  {
    id: 'bel-air-1955',
    name: 'Chevrolet Bel Air',
    year: '1955',
    price: '₹65,00,000',
    category: 'American Muscle',
    status: 'Available',
    image: '/cars/belair/ezgif-frame-001.jpg'
  },
  {
    id: 'charger-1968',
    name: 'Dodge Charger',
    year: '1968',
    price: '₹95,00,000',
    category: 'American Muscle',
    status: 'Just Added',
    image: '/cars/charger/ezgif-frame-001.jpg'
  }
];

const FILTERS = ['All', 'American Muscle'];

export default function Inventory() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filteredCars = INVENTORY.filter(
    car => activeFilter === 'All' || car.category === activeFilter
  );

  return (
    <section id="inventory" className="w-full max-w-7xl mx-auto px-4 py-24">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-border-subtle pb-6 gap-6">
        <div>
          <h2 className="font-serif text-4xl text-white mb-6">Current Inventory</h2>
          <div className="flex flex-wrap gap-3">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all duration-300 ${
                  activeFilter === filter
                    ? 'border-gold text-black bg-gold'
                    : 'border-border-subtle text-gray-400 hover:border-gold/50 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <span className="text-gold font-sans text-sm tracking-widest uppercase shrink-0">
          {filteredCars.length} Vehicles Available
        </span>
      </div>
      
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredCars.map(car => (
            <motion.div
              key={car.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/cars/${car.id}`} className="group cursor-pointer block h-full">
                <div className="bg-bg-panel overflow-hidden relative aspect-[4/3] mb-4 border border-white/5 group-hover:border-gold/50 transition-all duration-500">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1">
                    <span className={`text-xs uppercase tracking-widest ${
                      car.status === 'Available' ? 'text-green-400' : 
                      car.status === 'Reserved' ? 'text-red-400' : 'text-gold'
                    }`}>
                      {car.status}
                    </span>
                  </div>
                  
                  {/* Year Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="font-serif text-4xl text-white/20 font-bold tracking-tighter">
                      {car.year}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-start px-2">
                  <div>
                    <h3 className="font-serif text-2xl text-gray-100 group-hover:text-gold transition-colors">
                      {car.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 uppercase tracking-wider text-[10px]">
                      {car.category}
                    </p>
                  </div>
                  <div className="text-gold font-sans tracking-wide pt-1">
                    {car.price}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          
          {filteredCars.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center border border-border-subtle bg-bg-panel"
            >
              <h3 className="font-serif text-2xl text-gray-400 mb-2">No Vehicles Found</h3>
              <p className="text-gray-600 font-sans">We are currently sourcing more {activeFilter} models.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
