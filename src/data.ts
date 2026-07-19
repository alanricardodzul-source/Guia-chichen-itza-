import { Tour } from './types';
import castilloImg from './assets/images/chichen_castillo_1784424111449.jpg';
import retroImg from './assets/images/chichen_retro_1784424130846.jpg';
import jaguaresImg from './assets/images/chichen_jaguares_1784425802111.jpg';

export const TOURS: Tour[] = [
  {
    id: 'esencial',
    title: 'Servicio Estándar y Familiar',
    description: 'Servicio de guiado arqueológico privado y exclusivo dentro de Chichén Itzá. Ideal para parejas, familias o grupos de hasta 24 personas que buscan una explicación profunda del Castillo de Kukulcán, Juego de Pelota y Observatorio.',
    priceDetail: '$1,100 MXN (Grupo de 1 a 24 personas)',
    priceMXN: 1100,
    image: castilloImg,
    waText: 'Hola, me interesa reservar el Servicio Estándar y Familiar ($1,100 MXN)',
    highlights: [
      'Guía Certificado por SECTUR (bilingüe)',
      'Para grupos desde 1 hasta 24 personas',
      'Explicación profunda de arqueoastronomía',
      'Duración aproximada: 2.5 horas',
      'Ritmo 100% adaptado a ti'
    ]
  },
  {
    id: 'grupal',
    title: 'Servicio para Grupos Grandes',
    description: 'Guiado especializado y adaptado con excelente organización, acústica y dinámicas para grupos grandes de 25 a 50 personas. Perfecto para excursiones escolares, agencias de viaje o reuniones corporativas.',
    priceDetail: '$2,200 MXN (Grupo de 25 a 50 personas)',
    priceMXN: 2200,
    image: jaguaresImg,
    waText: 'Hola, me interesa reservar el Servicio para Grupos Grandes ($2,200 MXN)',
    highlights: [
      'Atención preferencial para grupos numerosos',
      'Ideal para grupos de 25 a 50 personas',
      'Dinámicas y mitos sobre la cultura maya viva',
      'Duración aproximada: 3 horas',
      'Excelente acústica y organización de grupo'
    ]
  },
  {
    id: 'premium',
    title: 'Aventura Temática o Más de 50 Personas',
    description: 'Diseñado para grupos de más de 50 personas, fotógrafos, investigadores o apasionados de la historia maya que desean un enfoque profundo o recorridos especiales a primera hora del día.',
    priceDetail: 'Desde $3,000 MXN (Atención altamente especializada)',
    priceMXN: 3000,
    image: retroImg,
    waText: 'Hola, quiero reservar una Aventura Temática o Servicio para más de 50 personas',
    highlights: [
      'Guía con conocimientos avanzados en historia y arqueoastronomía',
      'Coordinación para grupos de más de 50 personas',
      'Enfoque especial en fotografía de monumentos',
      'Duración extendida: Hasta 3.5 horas',
      'Itinerario diseñado 100% a tu medida'
    ]
  }
];

export const FAQS = [
  {
    question: '¿Qué incluye el servicio de guía?',
    answer: 'Incluye el guiado privado y profesional de un experto local certificado por la Secretaría de Turismo (SECTUR). Te acompañará durante todo el recorrido dentro de Chichén Itzá explicando a detalle la historia, la arquitectura maya, y los fenómenos astronómicos.'
  },
  {
    question: '¿El servicio incluye las entradas a Chichén Itzá?',
    answer: 'No, las entradas oficiales a la zona arqueológica (tarifa de INAH + Cultur del Estado de Yucatán) se pagan directamente en las taquillas de acceso el día de la visita. Nuestro servicio cubre únicamente la contratación de tu guía certificado privado.'
  },
  {
    question: '¿Dónde y cómo nos reunimos con el guía?',
    answer: 'Nos coordinamos previamente por WhatsApp. El punto de encuentro estándar es en la explanada principal frente a las taquillas oficiales de Chichén Itzá. Tu guía portará visiblemente su credencial oficial de SECTUR para fácil identificación.'
  },
  {
    question: '¿Ofrecen el servicio en otros idiomas?',
    answer: 'Sí, principalmente ofrecemos el servicio de guiado en Español e Inglés de manera fluida. Si requieres guiado en algún otro idioma (como francés, alemán o italiano), por favor coméntanos en la sección de notas para validar disponibilidad de guías autorizados en esa lengua.'
  },
  {
    question: '¿Cómo funciona el pago de los honorarios?',
    answer: 'La cotización se acuerda de forma directa y transparente a través de WhatsApp. El pago se liquida directamente con el guía el día del servicio. No hay intermediarios ni tarifas de comisión ocultas.'
  },
  {
    question: '¿Con cuánta anticipación debo reservar al guía?',
    answer: 'Recomendamos reservar con al menos 48 horas de anticipación para asegurar que un guía certificado esté disponible exclusivamente para tu grupo en el horario deseado, especialmente en fines de semana y temporadas altas.'
  }
];

