import { motion } from 'motion/react';
import { Tour } from '../types';
import { Check, MessageSquare, Settings2 } from 'lucide-react';

interface TourCardProps {
  key?: string;
  tour: Tour;
  onSelectCustomize: (tourId: string) => void;
}

export default function TourCard({ tour, onSelectCustomize }: TourCardProps) {
  const waLink = `https://wa.me/529858588987?text=${encodeURIComponent(tour.waText)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 flex flex-col h-full group"
      id={`tour-card-${tour.id}`}
    >
      {/* Tour Image with Hover Zoom */}
      <div className="relative h-64 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url('${tour.image}')` }}
        />
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-65" />
        
        {/* Tag on image */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-maya-green font-display font-semibold text-xs tracking-wider uppercase py-1.5 px-3 rounded-full shadow-sm">
          {tour.id === 'esencial' ? 'Estándar y Familiar' : tour.id === 'grupal' ? 'Grupos de 25-50' : 'Servicio Especial'}
        </div>
      </div>

      {/* Tour Content */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-display font-bold text-2xl text-maya-green mb-3 group-hover:text-maya-terracotta transition-colors">
            {tour.title}
          </h3>
          <p className="text-gray-600 text-sm font-sans leading-relaxed mb-6">
            {tour.description}
          </p>

          {/* Highlights Checklist */}
          <div className="space-y-2 mb-6">
            {tour.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="p-0.5 rounded-full bg-maya-green/10 text-maya-green mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price & CTA Actions */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">Modalidad</span>
            <span className="text-sm font-bold text-maya-dark">{tour.priceDetail}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Direct WhatsApp RSVP */}
            <a
              href={waLink}
              target="_blank"
              referrerPolicy="no-referrer"
              className="py-3 px-4 bg-maya-terracotta hover:bg-opacity-95 text-white text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              Reservar Ya
            </a>

            {/* Custom Interactive Planner Scroll */}
            <button
              onClick={() => onSelectCustomize(tour.id)}
              className="py-3 px-4 bg-gray-50 hover:bg-gray-100 text-maya-dark text-xs font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 border border-gray-200 active:scale-95 cursor-pointer"
            >
              <Settings2 className="w-4 h-4" />
              Personalizar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
