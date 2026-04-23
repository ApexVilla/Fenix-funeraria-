import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';

const FloatingContact = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="pointer-events-auto"
        >
          <div className="relative group">
            {/* Tooltip */}
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-xl border border-primary/5 text-primary text-sm font-bold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-whatsapp animate-pulse" />
                Dúvidas? Fale conosco 24h
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white/90" />
              </div>
            </div>

            {/* Pulse Rings */}
            <div className="absolute inset-0 rounded-full bg-whatsapp/20 animate-pulse-ring" />
            <div className="absolute inset-0 rounded-full bg-whatsapp/10 animate-pulse-ring [animation-delay:1s]" />

            {/* Main Button */}
            <motion.a
              href="https://wa.me/556295382038?text=Olá,%20gostaria%20de%20receber%20mais%20informações%20sobre%20os%20planos%20Fênix."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="relative w-16 h-16 bg-whatsapp text-white rounded-full flex items-center justify-center shadow-xl shadow-whatsapp/30 hover:shadow-2xl hover:shadow-whatsapp/40 transition-all z-10"
            >
              <MessageCircle size={32} fill="currentColor" />
            </motion.a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FloatingContact;
