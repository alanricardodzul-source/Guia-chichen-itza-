import { useState } from 'react';
import Hero from './components/Hero';
import TourCard from './components/TourCard';
import BookingPlanner from './components/BookingPlanner';
import WhyChooseUs from './components/WhyChooseUs';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import { TOURS } from './data';
import { MapPin, Calendar, Compass, ShieldAlert, Check, Users, Camera, X, ZoomIn } from 'lucide-react';
import { motion } from 'motion/react';

// Import newly generated images for the custom site gallery
import castilloImg from './assets/images/chichen_castillo_1784424111449.jpg';
import retroImg from './assets/images/chichen_retro_1784424130846.jpg';
import jaguaresImg from './assets/images/chichen_jaguares_1784425802111.jpg';

export default function App() {
  const [selectedTourId, setSelectedTourId] = useState<string>('esencial');
  const [activeImage, setActiveImage] = useState<{ url: string; title: string; desc: string } | null>(null);

  const galleryItems = [
    {
      url: castilloImg,
      title: 'El Castillo (El Templo de Kukulcán)',
      desc: 'La majestuosa pirámide principal bajo un cielo azul vibrante, capturando la iluminación dorada y las sombras perfectas de sus escalinatas talladas.',
      aspect: 'aspect-[3/4]',
    },
    {
      url: jaguaresImg,
      title: 'Plataforma de Águilas y Jaguares',
      desc: 'Detallada perspectiva de los relieves esculpidos en piedra caliza que muestran águilas y jaguares, imponentes guerreros de la cultura maya.',
      aspect: 'aspect-[4/3]',
    },
    {
      url: retroImg,
      title: 'Vestigios de la Época Dorada',
      desc: 'Una cautivadora mirada artística con acabado sepia retro, evocando las primeras exploraciones arqueológicas y la mística de los templos antiguos.',
      aspect: 'aspect-[3/4]',
    }
  ];

  const handleSelectCustomize = (tourId: string) => {
    setSelectedTourId(tourId);
    
    // Smooth scroll to the cotizador section
    const target = document.getElementById('cotizador');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-maya-light/20 text-maya-dark font-sans selection:bg-maya-sand/30">
      
      {/* 1. Hero Header */}
      <Hero />

      {/* 2. Intro Section */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-widest text-maya-terracotta font-semibold block mb-2">Bienvenido a Yucatán</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-maya-green mb-4">
            Experiencias Diseñadas para Ti
          </h2>
          {/* Custom Maya Stone line spacer */}
          <div className="w-16 h-1 bg-maya-sand mx-auto mb-6 rounded-full" />
          
          <p className="text-gray-600 font-sans text-sm sm:text-base max-w-3xl mx-auto leading-relaxed mb-12">
            Evita las filas de turistas y sumérgete en la historia, la cultura y la naturaleza de Yucatán. Nos encargamos de que tu día sea perfecto, educativo y memorable con el respaldo de expertos locales apasionados.
          </p>
        </motion.div>

        {/* Quick Highlights / Mini-cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
          <div className="bg-white p-5 rounded-xl border border-gray-150 shadow-sm flex items-start gap-3.5">
            <span className="p-2.5 rounded-lg bg-maya-green/10 text-maya-green shrink-0">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <h4 className="font-display font-bold text-sm text-maya-dark">Arqueología Viva</h4>
              <p className="text-xs text-gray-500 mt-1">Explicación histórica certificada sin tecnicismos aburridos.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-150 shadow-sm flex items-start gap-3.5">
            <span className="p-2.5 rounded-lg bg-maya-green/10 text-maya-green shrink-0">
              <Calendar className="w-5 h-5" />
            </span>
            <div>
              <h4 className="font-display font-bold text-sm text-maya-dark">Horarios Flexibles</h4>
              <p className="text-xs text-gray-500 mt-1">Llegamos temprano para evitar las peores horas de sol y aglomeraciones.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-150 shadow-sm flex items-start gap-3.5">
            <span className="p-2.5 rounded-lg bg-maya-green/10 text-maya-green shrink-0">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <h4 className="font-display font-bold text-sm text-maya-dark">Grupos Reducidos</h4>
              <p className="text-xs text-gray-500 mt-1">Garantizamos que escuches perfectamente al guía y puedas preguntar todo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Packages Section */}
      <section id="paquetes" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-maya-terracotta font-semibold block mb-2">Planes recomendados</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-maya-green mb-4">
              Nuestros Paquetes
            </h2>
            <div className="w-16 h-1 bg-maya-sand mx-auto rounded-full" />
          </div>

          {/* Grid of tour cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOURS.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onSelectCustomize={handleSelectCustomize}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 4. Why Choose Us (Maya Pattern Background) */}
      <WhyChooseUs />

      {/* 5. Booking Calculator / Quote Generator */}
      <BookingPlanner
        tours={TOURS}
        selectedTourId={selectedTourId}
        onChangeTourId={setSelectedTourId}
      />

      {/* 5.5. Galería Fotográfica Interactiva del Sitio */}
      <section className="py-20 bg-maya-light/10 border-t border-b border-gray-150/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-maya-terracotta font-semibold block mb-2">Galería Real</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-maya-green mb-4">
              Chichén Itzá en Fotos
            </h2>
            <div className="w-16 h-1 bg-maya-sand mx-auto rounded-full mb-6" />
            <p className="text-sm text-gray-600 leading-relaxed font-sans">
              Capturas reales de la zona arqueológica tomadas durante nuestras expediciones guiadas. Haz clic en cualquier imagen para ampliarla y leer sus detalles históricos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {galleryItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 group cursor-pointer flex flex-col h-full"
                onClick={() => setActiveImage(item)}
              >
                <div className={`relative ${item.aspect} overflow-hidden bg-gray-50 shrink-0`}>
                  <img
                    src={item.url}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-3 bg-white/25 backdrop-blur-md rounded-full text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="font-display font-bold text-lg text-maya-green group-hover:text-maya-terracotta transition-colors mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-1.5 text-xs text-maya-terracotta font-semibold uppercase tracking-wider">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Ver Ampliación</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <button 
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
            onClick={() => setActiveImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl w-full bg-maya-dark rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-8 bg-black flex items-center justify-center max-h-[75vh] md:max-h-[80vh] overflow-hidden">
                <img 
                  src={activeImage.url} 
                  alt={activeImage.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain max-h-[70vh] md:max-h-[75vh]"
                />
              </div>
              <div className="md:col-span-4 p-8 flex flex-col justify-center text-white bg-maya-dark">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-maya-sand/15 border border-maya-sand/30 rounded-full text-maya-sand text-xs font-semibold mb-6 w-fit">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Fotografía Real</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-4">
                  {activeImage.title}
                </h3>
                <p className="text-sm text-gray-300 font-sans leading-relaxed">
                  {activeImage.desc}
                </p>
                <button
                  onClick={() => setActiveImage(null)}
                  className="mt-8 px-6 py-3 bg-white/15 hover:bg-white/25 active:scale-95 transition-all rounded-full text-xs font-bold uppercase tracking-wider text-center cursor-pointer w-full"
                >
                  Cerrar Vista
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* 6. FAQs section */}
      <FAQ />

      {/* 7. Beautiful clean footer */}
      <Footer />

      {/* 8. Pulsing interactive Floating WhatsApp button */}
      <WhatsAppFloat />

    </div>
  );
}

