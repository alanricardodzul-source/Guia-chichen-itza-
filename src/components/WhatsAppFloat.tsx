import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 2.5 seconds for engaging call to action
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const defaultWaLink = "https://wa.me/529858588987?text=Hola!%20Me%20gustaría%20recibir%20más%20información%20sobre%20los%20tours%20a%20Chichén%20Itzá";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 font-sans">
      {/* Interactive Tooltip Chat Prompt */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="bg-white text-gray-800 p-3.5 rounded-2xl shadow-xl border border-gray-100 max-w-[240px] text-xs font-medium relative flex flex-col gap-1.5"
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-white text-gray-400 hover:text-gray-600 shadow border border-gray-100 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Bubble content */}
            <div className="font-bold text-maya-green text-[13px]">
              ¡Hola! ¿Tienes dudas?
            </div>
            <p className="text-gray-500 font-normal leading-relaxed">
              Platica directo con un guía certificado para armar tu plan.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Pulsing Floating WhatsApp Button */}
      <motion.a
        href={defaultWaLink}
        target="_blank"
        referrerPolicy="no-referrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#25d366] text-white p-4 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group transition-all duration-300 relative"
      >
        {/* Glow Ring Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25d366] opacity-35 animate-ping -z-10" />

        <MessageSquare className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 ease-in-out text-sm font-bold whitespace-nowrap">
          ¿Dudas? Chatea con nosotros
        </span>
      </motion.a>
    </div>
  );
}
