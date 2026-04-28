"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORE_DATA = {
  name: "Kairos Motors",
  location: "Vintage Auto Park, South Bombay, Mumbai 400001, India",
  timings: "10am to 8pm Monday to Saturday",
  cars: [
    { name: 'Ford Mustang', year: '1964', price: '₹70,00,000', engine: '289 cu in V8', status: 'Available', features: 'Iconic pony car, Restored' },
    { name: 'Chevrolet Camaro', year: '1967', price: '₹75,00,000', engine: '350 cu in V8', status: 'Reserved', features: 'Aggressive styling, Original' },
    { name: 'Corvette C2 Sting Ray', year: '1963', price: '₹1,20,00,000', engine: '327 cu in V8', status: 'Available', features: 'Split-window coupe, Restomod' },
    { name: 'Chevrolet Bel Air', year: '1955', price: '₹65,00,000', engine: '265 cu in V8', status: 'Available', features: '1950s American icon, Restored' },
    { name: 'Dodge Charger', year: '1968', price: '₹95,00,000', engine: '426 Hemi V8', status: 'Just Added', features: 'Muscle car era king, Restored' }
  ]
};

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: `Welcome to ${STORE_DATA.name}. I am your personal concierge. How may I assist you today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    // Store Info
    if (q.includes('location') || q.includes('where') || q.includes('address')) {
      return `We are located in ${STORE_DATA.location}. Please visit us to view our collection in person.`;
    }
    if (q.includes('time') || q.includes('hours') || q.includes('open') || q.includes('close')) {
      return `Our showroom hours are ${STORE_DATA.timings}.`;
    }
    if (q.includes('name') || q.includes('who are you')) {
      return `We are ${STORE_DATA.name}, the pinnacle of automotive luxury.`;
    }
    if (q.includes('test drive') || q.includes('book') || q.includes('appointment') || q.includes('buy') || q.includes('purchase')) {
      return `This is a demo website. No real transactions are available.`;
    }
    
    // Inventory
    if (q.includes('all cars') || q.includes('inventory') || q.includes('list') || q.includes('what do you have')) {
      const available = STORE_DATA.cars.filter(c => c.status !== 'Reserved').map(c => c.name).join(', ');
      return `We currently have ${STORE_DATA.cars.length} cars in our curated archive. Some available models include: ${available}.`;
    }

    // Specific Cars
    for (const car of STORE_DATA.cars) {
      if (q.includes(car.name.toLowerCase()) || (car.name.includes(' ') && q.includes(car.name.split(' ')[1].toLowerCase()))) {
        return `The ${car.year} ${car.name} is a masterpiece. It features a ${car.engine} engine and is noted for: ${car.features}. Price: ${car.price}. Status: ${car.status}.`;
      }
    }

    if (q.includes('price') || q.includes('cost') || q.includes('how much')) {
      return `Our prices range from $78,000 for our Bel Air up to multi-million dollar investments for exclusive pieces like the GT40. Please ask about a specific model.`;
    }
    
    if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
      return `Hello! How can I help you discover your next luxury vehicle?`;
    }

    return 'Please visit our showroom or contact us directly for more details.';
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateResponse(userMessage.text);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gold rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] z-50 group"
          >
            <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-20"></div>
            <MessageSquare size={24} className="text-black group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full h-full md:w-[400px] md:h-[600px] max-h-screen md:max-h-[70vh] z-50 flex flex-col bg-black/90 backdrop-blur-2xl border-t md:border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] md:rounded-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 bg-black/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center border border-gold/50">
                  <span className="font-serif text-gold text-sm">IA</span>
                </div>
                <div>
                  <h3 className="text-white font-serif tracking-widest text-sm">Concierge</h3>
                  <p className="text-green-400 text-[10px] uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors p-1">
                  <Minus size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] p-3 ${
                      msg.sender === 'user' 
                        ? 'bg-gold text-black rounded-l-xl rounded-tr-xl' 
                        : 'bg-white/10 text-gray-200 rounded-r-xl rounded-tl-xl border border-white/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-4 rounded-r-xl rounded-tl-xl border border-white/5 flex gap-1">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-gold rounded-full"></motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gold rounded-full"></motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gold rounded-full"></motion.div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/50">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our inventory..."
                  className="w-full bg-black/50 border border-white/10 rounded-full px-4 py-3 text-white text-sm focus:outline-none focus:border-gold transition-colors pr-12"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim()}
                  className="absolute right-2 p-2 bg-gold text-black rounded-full disabled:opacity-50 hover:bg-gold-hover transition-colors"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
