export interface Tour {
  id: string;
  title: string;
  description: string;
  priceDetail: string;
  priceMXN: number; // base price in MXN
  image: string;
  waText: string;
  highlights: string[];
}

export interface BookingState {
  tourId: string;
  adults: number;
  children: number;
  date: string;
  language: 'es' | 'en';
  notes: string;
}
