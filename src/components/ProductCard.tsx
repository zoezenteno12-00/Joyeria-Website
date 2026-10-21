import { Link, Watch, Circle, Droplet, Pin, Sparkles } from 'lucide-react';
import type { Product } from '@/lib/supabase';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  collares: Link,
  pulseras: Watch,
  anillos: Circle,
  aretes: Droplet,
  pines: Pin,
};

const MATERIAL_LABELS: Record<string, string> = {
  oro: 'Oro',
  plata: 'Plata',
  platino: 'Platino',
  piedras: 'Piedras',
  madera: 'Madera',
  fantasia: 'Fantasía',
};

const SEASON_LABELS: Record<string, string> = {
  primavera: 'Primavera',
  verano: 'Verano',
  otono: 'Otoño',
  invierno: 'Invierno',
  todas: 'Todo el año',
};

type ProductCardProps = {
  product: Product;
  onClick: () => void;
};

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const Icon = CATEGORY_ICONS[product.category] ?? Sparkles;

  return (
    <button
      onClick={onClick}
      className="group flex flex-col text-left bg-white rounded-2xl overflow-hidden border border-[#e8e2d6] hover:shadow-xl hover:shadow-[#9a7b4f]/10 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#f7f4ee]">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon className="w-12 h-12 text-[#cbb88f]" />
          </div>
        )}
        {/* Availability badge */}
        <div className="absolute top-3 left-3">
          {product.available ? (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/90 text-[#5c7c4f] backdrop-blur-sm">
              Disponible
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/90 text-[#b85c4f] backdrop-blur-sm">
              Agotado
            </span>
          )}
        </div>
        {/* Season badge */}
        {product.season !== 'todas' && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#9a7b4f]/90 text-white backdrop-blur-sm">
              {SEASON_LABELS[product.season] ?? product.season}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#9a7b4f] font-semibold">
          <Icon className="w-3 h-3" />
          {MATERIAL_LABELS[product.material] ?? product.material}
        </div>
        <h3 className="text-sm font-semibold text-[#3a3527] leading-snug line-clamp-2">
          {product.name}
        </h3>
        <p className="text-lg font-serif text-[#9a7b4f] font-semibold">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </button>
  );
}
