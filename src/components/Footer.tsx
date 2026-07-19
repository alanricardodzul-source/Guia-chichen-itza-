import { Mail, Phone, MapPin, ExternalLink, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-maya-dark text-white/90 py-12 border-t border-maya-green/30">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8 pb-8 border-b border-white/10">
          
          {/* Column 1: Brand */}
          <div className="space-y-3">
            <h3 className="font-display font-extrabold text-xl text-maya-sand tracking-wide uppercase">
              Chichén Itzá
            </h3>
            <p className="text-xs text-gray-300 font-sans leading-relaxed max-w-xs">
              Servicios profesionales de guiado turístico y experiencias auténticas mayas en Yucatán. Trato directo, honesto y certificado.
            </p>
          </div>

          {/* Column 2: Direct Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-maya-sand">
              Contáctanos
            </h4>
            <div className="space-y-2.5 text-xs font-sans">
              <a 
                href="mailto:alanricardodzul@gmail.com" 
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors w-fit"
              >
                <Mail className="w-4 h-4 text-maya-terracotta shrink-0" />
                <span>alanricardodzul@gmail.com</span>
              </a>
              <a 
                href="tel:+529858588987" 
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors w-fit"
              >
                <Phone className="w-4 h-4 text-maya-terracotta shrink-0" />
                <span>985-858-8987</span>
              </a>
              <a 
                href="https://www.facebook.com/share/1C5Ee9XS9m/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors w-fit font-semibold"
              >
                <Facebook className="w-4 h-4 text-maya-terracotta shrink-0" />
                <span className="underline decoration-maya-terracotta/30 underline-offset-4 hover:decoration-maya-terracotta transition-colors">Mi Facebook</span>
              </a>
              <div className="flex items-center gap-2 text-gray-300 w-fit">
                <MapPin className="w-4 h-4 text-maya-terracotta shrink-0" />
                <span>Pisté, Yucatán, México</span>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-maya-sand">
              Accesos Rápidos
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <a 
                href="#paquetes" 
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors border border-white/10"
              >
                Ver Paquetes
              </a>
              <a 
                href="#cotizador" 
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors border border-white/10"
              >
                Cotizador
              </a>
              <a 
                href="https://www.inah.gob.mx/zonas/117-zona-arqueologica-de-chichen-itza" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors border border-white/10 inline-flex items-center gap-1"
              >
                INAH Oficial <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright notice */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center text-xs text-gray-400">
          <p>&copy; 2026 Chichén Itzá Guías Locales. Todos los derechos reservados.</p>
          <p className="text-[10px] text-gray-500">
            Diseñado para amantes de la cultura e historia prehispánica.
          </p>
        </div>
      </div>
    </footer>
  );
}
