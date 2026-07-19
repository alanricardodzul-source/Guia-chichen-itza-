import { Award, MessageSquareText, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyChooseUs() {
  const items = [
    {
      icon: <Award className="w-8 h-8 text-maya-sand" />,
      title: 'Guías Certificados',
      desc: 'Expertos locales autorizados por SECTUR, apasionados por transmitir de manera exacta la astronomía, historia y cultura viva maya.'
    },
    {
      icon: <MessageSquareText className="w-8 h-8 text-maya-sand" />,
      title: 'Sin Intermediarios',
      desc: 'Trato directo con guías de la región. Esto te asegura no solo el mejor precio garantizado, sino una atención 100% personalizada y flexible.'
    },
    {
      icon: <Clock className="w-8 h-8 text-maya-sand" />,
      title: 'Flexibilidad de Horarios',
      desc: 'Elige la hora ideal para iniciar tu recorrido, evitando el calor extremo o las horas pico de afluencia turística en el sitio.'
    }
  ];

  return (
    <section className="bg-maya-green text-white py-20 relative overflow-hidden">
      {/* Decorative Maya-inspired structural lines in background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-maya-sand mb-4">
            ¿Por qué reservar con nosotros?
          </h2>
          <div className="w-16 h-1 bg-maya-terracotta mx-auto mb-6 rounded-full" />
          <p className="text-emerald-100 font-sans text-sm sm:text-base leading-relaxed">
            Nuestra prioridad es entregarte una experiencia arqueológica y cultural honesta, enriquecedora y segura en la península de Yucatán.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Icon Container */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 flex items-center justify-center">
                {item.icon}
              </div>

              {/* Title */}
              <h4 className="font-display font-bold text-xl text-white mb-3">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-emerald-100/85 text-sm font-sans leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
