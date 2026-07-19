import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookingState, Tour } from '../types';
import { Calendar, Users, MessageSquare, Sparkles, Languages, Ticket, Info, HelpCircle } from 'lucide-react';

interface BookingPlannerProps {
  tours: Tour[];
  selectedTourId: string;
  onChangeTourId: (id: string) => void;
}

export default function BookingPlanner({ tours, selectedTourId, onChangeTourId }: BookingPlannerProps) {
  const [booking, setBooking] = useState<BookingState>({
    tourId: selectedTourId || tours[0].id,
    adults: 2,
    children: 0,
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now default
    language: 'es',
    notes: ''
  });

  const [visitorCategory, setVisitorCategory] = useState<'mexicano' | 'extranjero' | 'yucateco'>('mexicano');

  // Sync state if selectedTourId changes from outside
  useEffect(() => {
    if (selectedTourId) {
      setBooking(prev => ({ ...prev, tourId: selectedTourId }));
    }
  }, [selectedTourId]);

  const currentTour = tours.find(t => t.id === booking.tourId) || tours[0];
  const totalGuests = booking.adults + booking.children;

  // Detect if selected date is a Sunday
  const isSundaySelected = (() => {
    if (!booking.date) return false;
    const d = new Date(`${booking.date}T12:00:00`);
    return d.getDay() === 0;
  })();

  // Calculate ticket cost per adult based on category & Sunday rule
  const getTicketPricePerAdult = () => {
    if (isSundaySelected && (visitorCategory === 'mexicano' || visitorCategory === 'yucateco')) {
      return 0; // Free on Sundays
    }
    if (visitorCategory === 'yucateco') return 0; // Free for Yucatecos
    if (visitorCategory === 'mexicano') return 310;
    return 697; // extranjero
  };

  const ticketPricePerAdult = getTicketPricePerAdult();
  const calculatedTicketsCost = booking.adults * ticketPricePerAdult;

  // Calculate flat-rate pricing based on professional guide service rates
  const calculateEstimate = () => {
    if (booking.tourId === 'esencial') {
      return 1100; // Flat rate 1100 MXN for 1-24 people
    } else if (booking.tourId === 'grupal') {
      return 2200; // Flat rate 2200 MXN for 25-50 people
    } else if (booking.tourId === 'premium') {
      return 3000; // Flat rate 3000 MXN for Premium
    }
    return currentTour.priceMXN;
  };

  const estimatedTotalMXN = calculateEstimate();
  const estimatedTotalUSD = Math.round(estimatedTotalMXN / 18); // approx rate for USD visitors

  // Generate recommendations based on guest count and selected service
  const getRecommendation = () => {
    if (booking.tourId === 'esencial' && totalGuests > 24) {
      return {
        type: 'warning',
        text: '⚠️ Para grupos de más de 24 personas, se recomienda seleccionar el "Servicio para Grupos Grandes (25 a 50 personas)".'
      };
    }
    if (booking.tourId === 'grupal' && totalGuests < 25) {
      return {
        type: 'info',
        text: '💡 Nota: Para grupos de hasta 24 personas, el "Servicio Estándar y Familiar" de $1,100 MXN es más económico.'
      };
    }
    if (booking.tourId === 'grupal' && totalGuests > 50) {
      return {
        type: 'warning',
        text: '⚠️ Para grupos mayores a 50 personas, por favor indícalo en las notas para asignar guías certificados adicionales o cotizar una opción a la medida.'
      };
    }
    return null;
  };

  const recommendation = getRecommendation();

  // Generate WhatsApp message
  const generateWaMessage = () => {
    const serviceName = currentTour.title;
    const langLabel = booking.language === 'es' ? 'Español 🇲🇽' : 'English 🇺🇸';
    const kidsStr = booking.children > 0 ? `, ${booking.children} niños` : '';
    const notesStr = booking.notes.trim() ? `\n📝 Notas/Solicitudes: "${booking.notes.trim()}"` : '';
    const categoryLabel = visitorCategory === 'extranjero' 
      ? 'Extranjeros 🇺🇸🇪🇺' 
      : visitorCategory === 'mexicano' 
        ? 'Nacionales (INE) 🇲🇽' 
        : 'Yucatecos (INE) 🦁';

    const ticketDetail = visitorCategory === 'yucateco' || (isSundaySelected && visitorCategory === 'mexicano')
      ? '¡Entrada Gratis!'
      : `$${calculatedTicketsCost.toLocaleString()} MXN total en taquilla`;

    return `Hola! Me interesa agendar el servicio de guía certificado en Chichén Itzá. 

🗺️ Servicio: *${serviceName}*
📅 Fecha planeada: *${booking.date}* ${isSundaySelected ? '(Domingo)' : ''}
👥 Visitantes: *${booking.adults} adultos (${categoryLabel})${kidsStr}* (Total: ${totalGuests} personas)
🗣️ Idioma del guía: *${langLabel}*${notesStr}

💰 Costo del Servicio (Guía): *$${estimatedTotalMXN.toLocaleString()} MXN* (~$${estimatedTotalUSD} USD)
🎟️ Entradas Estimadas (Taquilla): *${ticketDetail}*

¿Tienen disponibilidad de guía certificado para esta fecha? ¡Gracias!`;
  };

  const handleSendWhatsApp = () => {
    const message = generateWaMessage();
    const link = `https://wa.me/529858588987?text=${encodeURIComponent(message)}`;
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="cotizador" className="py-20 bg-gradient-to-b from-white to-maya-light/40 relative">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-maya-terracotta font-semibold block mb-2">Reserva Directa</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-maya-green mb-4">
            Reserva tu Guía Certificado
          </h2>
          <div className="w-16 h-1 bg-maya-sand mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed">
            Personaliza los detalles de tu visita para cotizar los honorarios fijos de tu guía profesional privado. Sin comisiones de agencias intermediarias.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options - Left */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-150 lg:col-span-7 space-y-6">
            
            {/* Guide Service Selector */}
            <div>
              <label className="block text-sm font-semibold text-maya-dark mb-3">
                1. Selecciona la modalidad de guiado
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {tours.map(t => (
                  <label
                    key={t.id}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      booking.tourId === t.id
                        ? 'border-maya-green bg-maya-green/5'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tourId"
                      value={t.id}
                      checked={booking.tourId === t.id}
                      onChange={() => onChangeTourId(t.id)}
                      className="mt-1 text-maya-green focus:ring-maya-green"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-baseline gap-2 flex-wrap">
                        <span className="font-bold text-sm text-maya-green">{t.title}</span>
                        <span className="text-xs font-bold text-maya-terracotta bg-maya-terracotta/5 px-2 py-0.5 rounded">
                          ${(t.id === 'esencial' ? 1100 : t.id === 'grupal' ? 2200 : 3000).toLocaleString()} MXN
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 block mt-1 leading-normal">{t.description}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Adults Counter */}
              <div>
                <label className="block text-sm font-semibold text-maya-dark mb-2">
                  2. Número de Adultos
                </label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-xl p-1 bg-gray-50/50 justify-between">
                  <button
                    type="button"
                    onClick={() => setBooking(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                    className="w-10 h-10 rounded-lg hover:bg-gray-200 font-bold text-gray-700 flex items-center justify-center cursor-pointer transition-colors"
                  >
                    -
                  </button>
                  <span className="font-bold text-maya-dark text-base">{booking.adults}</span>
                  <button
                    type="button"
                    onClick={() => setBooking(prev => ({ ...prev, adults: prev.adults + 1 }))}
                    className="w-10 h-10 rounded-lg hover:bg-gray-200 font-bold text-gray-700 flex items-center justify-center cursor-pointer transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children Counter */}
              <div>
                <label className="block text-sm font-semibold text-maya-dark mb-2">
                  3. Niños (Acompañantes)
                </label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-xl p-1 bg-gray-50/50 justify-between">
                  <button
                    type="button"
                    onClick={() => setBooking(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                    className="w-10 h-10 rounded-lg hover:bg-gray-200 font-bold text-gray-700 flex items-center justify-center cursor-pointer transition-colors"
                  >
                    -
                  </button>
                  <span className="font-bold text-maya-dark text-base">{booking.children}</span>
                  <button
                    type="button"
                    onClick={() => setBooking(prev => ({ ...prev, children: prev.children + 1 }))}
                    className="w-10 h-10 rounded-lg hover:bg-gray-200 font-bold text-gray-700 flex items-center justify-center cursor-pointer transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Date & Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-maya-dark mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-maya-sand" />
                  4. Fecha de tu visita
                </label>
                <input
                  type="date"
                  value={booking.date}
                  onChange={(e) => setBooking(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl p-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-maya-green"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-maya-dark mb-2 flex items-center gap-1.5">
                  <Languages className="w-4 h-4 text-maya-sand" />
                  5. Idioma del guiado
                </label>
                <div className="grid grid-cols-2 gap-2 border border-gray-200 p-1 rounded-xl bg-gray-50/50">
                  <button
                    type="button"
                    onClick={() => setBooking(prev => ({ ...prev, language: 'es' }))}
                    className={`p-2.5 rounded-lg text-xs font-bold transition-all ${
                      booking.language === 'es' ? 'bg-maya-green text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Español
                  </button>
                  <button
                    type="button"
                    onClick={() => setBooking(prev => ({ ...prev, language: 'en' }))}
                    className={`p-2.5 rounded-lg text-xs font-bold transition-all ${
                      booking.language === 'en' ? 'bg-maya-green text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Recommendation Alert */}
            <AnimatePresence mode="wait">
              {recommendation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                    recommendation.type === 'warning'
                      ? 'bg-amber-50 border-amber-200 text-amber-800'
                      : 'bg-blue-50 border-blue-200 text-blue-800'
                  }`}
                >
                  {recommendation.text}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Additional Info / Special Request */}
            <div>
              <label className="block text-sm font-semibold text-maya-dark mb-2">
                Notas especiales o dudas (Opcional)
              </label>
              <textarea
                value={booking.notes}
                onChange={(e) => setBooking(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Ej. Requerimos acceso preferente con silla de ruedas, nos gustaría empezar a las 8:00 AM, etc."
                className="w-full border border-gray-200 rounded-xl p-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-maya-green h-20 resize-none"
              />
            </div>

          </div>

          {/* Pricing Estimation - Right */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Price Box */}
            <motion.div
              layout
              className="bg-maya-green text-white p-6 sm:p-8 rounded-2xl shadow-md border border-maya-green relative overflow-hidden"
            >
              <div className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-white/5" />

              <div className="flex items-center gap-2 text-maya-sand font-bold text-xs uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Honorarios del Guía</span>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl sm:text-5xl font-display font-extrabold text-white">
                  ${estimatedTotalMXN.toLocaleString()}
                </span>
                <span className="text-xl font-bold text-maya-sand">MXN</span>
              </div>

              <p className="text-xs text-emerald-100 mb-6">
                ~ ${estimatedTotalUSD} USD (Referencia para visitantes extranjeros)
              </p>

              {/* Summary Items */}
              <div className="space-y-3.5 border-t border-emerald-800 pt-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-emerald-100 font-light">Servicio:</span>
                  <span className="font-semibold text-right max-w-[180px] truncate">{currentTour.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-100 font-light">Tamaño del grupo:</span>
                  <span className="font-semibold">
                    {totalGuests} {totalGuests === 1 ? 'persona' : 'personas'} ({booking.adults} Ad. {booking.children > 0 ? `+ ${booking.children} Niñ.` : ''})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-100 font-light">Idioma asignado:</span>
                  <span className="font-semibold capitalize">{booking.language === 'es' ? 'Español' : 'English'}</span>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <button
                onClick={handleSendWhatsApp}
                className="w-full mt-6 py-4 bg-maya-terracotta hover:bg-opacity-95 active:scale-95 text-white font-bold rounded-xl shadow-lg shadow-maya-terracotta/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                Reservar Guía por WhatsApp
              </button>

              <div className="text-center mt-3">
                <span className="text-[10px] text-emerald-200 font-light block">
                  * Trato directo y pago seguro al concluir el recorrido. No incluye entradas al parque.
                </span>
              </div>
            </motion.div>

            {/* Costos de Entrada Card */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-gray-150 relative overflow-hidden">
              <div className="flex items-center gap-2 text-maya-terracotta font-bold text-xs uppercase tracking-wider mb-3">
                <Ticket className="w-4 h-4" />
                <span>Costos de Entrada Oficiales</span>
              </div>
              
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                El costo del guía no incluye el acceso a la zona arqueológica. Selecciona el origen del grupo para ver el desglose en taquilla:
              </p>

              {/* Visitor origin selector buttons */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-xl mb-4">
                {(['mexicano', 'extranjero', 'yucateco'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setVisitorCategory(cat)}
                    className={`py-2 rounded-lg text-[11px] font-bold transition-all capitalize cursor-pointer ${
                      visitorCategory === cat
                        ? 'bg-maya-dark text-white shadow-xs'
                        : 'text-gray-600 hover:text-maya-dark'
                    }`}
                  >
                    {cat === 'mexicano' ? '🇲🇽 Nacional' : cat === 'extranjero' ? '🌐 Extranjero' : '🦁 Yucateco'}
                  </button>
                ))}
              </div>

              {/* Sunday Notification Badge */}
              {isSundaySelected && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-start gap-2 leading-relaxed">
                  <span className="text-base leading-none">🎉</span>
                  <div>
                    <span className="font-bold block">¡Domingo de Entrada Libre!</span>
                    La entrada es gratis este día para Mexicanos y Residentes con identificación.
                  </div>
                </div>
              )}

              {/* Ticket Prices Breakdown */}
              <div className="space-y-3.5 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center gap-1">
                    Adultos ({booking.adults})
                    <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                      {visitorCategory === 'extranjero' ? '$697' : visitorCategory === 'mexicano' ? '$310' : 'Gratis'} c/u
                    </span>
                  </span>
                  <span className="font-bold text-maya-dark">
                    {visitorCategory === 'yucateco' || (isSundaySelected && visitorCategory === 'mexicano') ? (
                      <span className="text-emerald-600 uppercase text-xs tracking-wider">Gratis</span>
                    ) : (
                      `$${calculatedTicketsCost.toLocaleString()} MXN`
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center gap-1">
                    Niños menores de 13 ({booking.children})
                    <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">Gratis</span>
                  </span>
                  <span className="font-bold text-emerald-600 uppercase text-xs tracking-wider">Gratis</span>
                </div>

                {/* Info List Items strictly from user specs */}
                <div className="border-t border-dashed border-gray-150 pt-4 space-y-2">
                  <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Tarifas de Referencia:</span>
                  <ul className="text-[11px] text-gray-500 space-y-1.5 font-sans leading-relaxed list-inside list-disc">
                    <li><strong className="text-gray-700">Extranjeros:</strong> $697 MXN</li>
                    <li><strong className="text-gray-700">Mexicanos (con INE):</strong> $310 MXN</li>
                    <li><strong className="text-gray-700">Yucatecos (con INE):</strong> GRATIS (Para Todos)</li>
                    <li><strong className="text-gray-700">Niños menores de 13 años:</strong> GRATIS (Mexicanos y Extranjeros)</li>
                    <li><strong className="text-gray-700">Domingos:</strong> Entrada GRATIS para Mexicanos y Residentes</li>
                  </ul>
                </div>
              </div>

              {/* Total Tickets Summary */}
              <div className="bg-maya-light/40 border border-maya-sand/20 rounded-xl p-3 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Total Entradas (Taquilla)</span>
                  <span className="text-[10px] text-gray-400">Se paga directo al parque</span>
                </div>
                <span className="text-base font-bold text-maya-dark">
                  ${calculatedTicketsCost.toLocaleString()} MXN
                </span>
              </div>

              {/* Grand Total Travel Budget */}
              <div className="mt-3 p-3 bg-maya-dark text-white rounded-xl flex justify-between items-center shadow-xs">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-300 uppercase tracking-wider font-semibold">Gran Total Estimado</span>
                  <span className="text-[10px] text-emerald-300">Guía + Entradas Estimadas</span>
                </div>
                <span className="text-base font-bold text-maya-sand">
                  ${(estimatedTotalMXN + calculatedTicketsCost).toLocaleString()} MXN
                </span>
              </div>
            </div>

            {/* Message Preview */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-bold block mb-3">
                Vista previa del mensaje de WhatsApp
              </span>
              <div className="bg-white border border-gray-150 rounded-xl p-4 font-mono text-[11px] text-gray-600 shadow-inner whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                {generateWaMessage()}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
