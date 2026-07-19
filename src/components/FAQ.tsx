import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-maya-light/20 border-t border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-maya-terracotta font-semibold block mb-2">Preguntas Comunes</span>
          <h2 className="font-display font-bold text-3xl text-maya-green mb-4">
            Dudas Frecuentes
          </h2>
          <div className="w-16 h-1 bg-maya-sand mx-auto rounded-full" />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-gray-150 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-5 flex justify-between items-center gap-4 hover:bg-gray-50/50 cursor-pointer focus:outline-none"
                >
                  <span className="font-bold text-sm sm:text-base text-maya-dark flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-maya-sand shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="p-5 pt-0 border-t border-gray-100 text-sm text-gray-600 leading-relaxed font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
