import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { showToast } from "./Toast";

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

export default function Footer() {
  return (
    <div className="w-full bg-black border-t border-border-subtle pt-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Section */}
        <section id="contact" className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left: Contact Info */}
            <div>
              <p className="text-gold text-xs uppercase tracking-widest mb-4">Get in Touch</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-8">Visit Our Showroom.</h2>
              <p className="text-gray-400 font-sans text-sm leading-relaxed mb-10 max-w-md">
                We invite you to experience our collection in person. Please reach out to schedule a private viewing or speak with one of our concierge experts.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-gold mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="text-white text-sm uppercase tracking-widest mb-1">Address</h4>
                    <p className="text-gray-400 text-sm">Vintage Auto Park, South Bombay<br/>Mumbai, Maharashtra 400001, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-gold mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="text-white text-sm uppercase tracking-widest mb-1">Phone</h4>
                    <p className="text-gray-400 text-sm">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-gold mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="text-white text-sm uppercase tracking-widest mb-1">Email</h4>
                    <p className="text-gray-400 text-sm">concierge@kairosmotors.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="text-gold mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="text-white text-sm uppercase tracking-widest mb-1">Working Hours</h4>
                    <p className="text-gray-400 text-sm">10:00 AM - 8:00 PM<br/>Monday to Saturday</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-bg-panel border border-white/5 p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <h3 className="font-serif text-2xl text-white mb-6">Send a Message</h3>
              <form 
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast("Thank you for your interest! This is a demo website.");
                }}
              >
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                  <input type="text" className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Phone Number</label>
                  <input type="tel" className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Message</label>
                  <textarea rows={4} className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" required></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-gold text-black uppercase tracking-widest text-xs font-bold hover:bg-gold-hover transition-colors">
                  Submit Enquiry
                </button>
              </form>
            </div>
            
          </div>
        </section>

      </div>

      {/* Footer Bottom */}
      <footer className="border-t border-white/10 bg-[#050505] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            
            <div className="text-center md:text-left">
              <a href="/" className="font-serif text-2xl tracking-widest text-gold block mb-2 hover:text-gold-hover transition-colors">
                KAIROS MOTORS
              </a>
              <p className="text-gray-500 text-xs uppercase tracking-widest">The Pinnacle of Automotive Luxury.</p>
            </div>

            <div className="flex gap-8 text-xs uppercase tracking-widest text-gray-400">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <Link href="/#inventory" className="hover:text-gold transition-colors">Inventory</Link>
              <Link href="/#about" className="hover:text-gold transition-colors">About</Link>
              <Link href="#contact" className="hover:text-gold transition-colors">Contact</Link>
            </div>

            <div className="flex gap-6">
              <a href="https://www.instagram.com/aksh.vrs/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors"><InstagramIcon size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors"><TwitterIcon size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors"><FacebookIcon size={20} /></a>
            </div>

          </div>
          <div className="text-center mt-12 pt-8 border-t border-white/5 flex flex-col gap-4">
            <p className="text-gray-600 text-[10px] uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Kairos Motors. All rights reserved.
            </p>
            <p className="text-[#666666] text-[10px] text-center max-w-2xl mx-auto tracking-wide">
              This is a concept demonstration website created for educational purposes. Kairos Motors is not a real business and no actual transactions can be made.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
