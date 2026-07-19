import { motion } from 'motion/react';
import { ArrowDown, MapPin, Compass, ShieldCheck } from 'lucide-react';
import heroBg from '../assets/images/chichen_castillo_1784424111449.jpg';

export default function Hero() {
  return (
    <header className="relative h-[85vh] min-h-[550px] w-full overflow-hidden flex items-center justify-center text-center px-4">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000 scale-105"
        style={{ 
          backgroundImage: `linear-gradient(rgba(15, 35, 16, 0.5), rgba(15, 35, 16, 0.7)), url('${heroBg}')` 
        }}
      />

      {/* Decorative Top Border Style (Maya Pattern Accent) */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-maya-sand via-maya-terracotta to-maya-sand z-10" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Certification Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-maya-sand text-sm font-medium mb-6"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Guías Locales Certificados por SECTUR</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-tight tracking-tight mb-6"
        >
          Descubre la Magia de <span className="text-maya-sand block sm:inline">Chichén Itzá</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-200 text-lg sm:text-xl max-w-2xl font-sans font-light leading-relaxed mb-10"
        >
          Reserva un guía profesional certificado por SECTUR para tu visita a Chichén Itzá. Explicación profunda y privada de la gran ciudad maya a tu propio ritmo.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#paquetes"
            className="px-8 py-4 bg-maya-terracotta hover:bg-opacity-90 active:scale-95 text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-maya-terracotta/20 flex items-center gap-2 group"
          >
            Ver Modalidades de Guía
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </a>
          <a
            href="#cotizador"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/30 text-white font-semibold rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            Reservar Ahora
          </a>
        </motion.div>

        {/* Highlight features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl border-t border-white/10 pt-8 w-full"
        >
          <div className="flex flex-col items-center text-white">
            <div className="p-2 rounded-full bg-maya-sand/15 mb-2">
              <Compass className="w-5 h-5 text-maya-sand" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-300">Historia y Astronomía</span>
          </div>
          <div className="flex flex-col items-center text-white">
            <div className="p-2 rounded-full bg-maya-sand/15 mb-2">
              <ShieldCheck className="w-5 h-5 text-maya-sand" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-300">Guías Oficiales</span>
          </div>
          <div className="flex flex-col items-center text-white">
            <div className="p-2 rounded-full bg-maya-sand/15 mb-2">
              <svg className="w-5 h-5 text-maya-sand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-300">Tiempos Flexibles</span>
          </div>
        </motion.div>
      </div>

      {/* Subtle bottom wave accent */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-maya-light to-transparent" />
    </header>
  );
}
