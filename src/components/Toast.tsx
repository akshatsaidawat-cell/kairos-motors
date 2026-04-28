"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function showToast(message: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("show-toast", { detail: message }));
  }
}

export default function Toast() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleShowToast = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setMessage(customEvent.detail);
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    };

    window.addEventListener("show-toast", handleShowToast);
    return () => window.removeEventListener("show-toast", handleShowToast);
  }, []);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 50, x: "-50%" }}
          className="fixed bottom-10 left-1/2 z-[9999] flex items-center gap-3 rounded bg-black/90 border border-gold/30 px-6 py-4 shadow-[0_0_20px_rgba(212,175,55,0.15)] backdrop-blur-md"
        >
          <CheckCircle2 className="text-gold" size={20} />
          <p className="text-gold font-sans text-sm tracking-wide">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
