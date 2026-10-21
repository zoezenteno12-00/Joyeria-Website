import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  material: string;
  price: number;
  available: boolean;
  season: string;
  image_url: string | null;
  featured: boolean;
  created_at: string;
};

export const CATEGORIES = [
  { key: 'collares', label: 'Collares', icon: 'Necklace' },
  { key: 'pulseras', label: 'Pulseras', icon: 'Watch' },
  { key: 'anillos', label: 'Anillos', icon: 'Ring' },
  { key: 'aretes', label: 'Aretes', icon: 'Earring' },
  { key: 'pines', label: 'Pines', icon: 'Pin' },
] as const;

export const MATERIALS = [
  { key: 'oro', label: 'Oro' },
  { key: 'plata', label: 'Plata' },
  { key: 'platino', label: 'Platino' },
  { key: 'piedras', label: 'Piedras' },
  { key: 'madera', label: 'Madera' },
  { key: 'fantasia', label: 'Fantasía' },
] as const;

export const SEASONS = [
  { key: 'primavera', label: 'Primavera' },
  { key: 'verano', label: 'Verano' },
  { key: 'otono', label: 'Otoño' },
  { key: 'invierno', label: 'Invierno' },
  { key: 'todas', label: 'Todas' },
] as const;
