import { useEffect } from 'react';
import { X, Check, Clock, Calendar, Tag } from 'lucide-react';
import type { Product } from '@/lib/supabase';

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

const CATEGORY_LABELS: Record<string, string> = {
  collares: 'Collares',
  pulseras: 'Pulseras',
  anillos: 'Anillos',
  aretes: 'Aretes',
  pines: 'Pines',
};

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2c2820]/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-[#faf8f3] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#5a5040] z-10 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="aspect-square md:aspect-auto bg-[#f0ebe0]">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Tag className="w-16 h-16 text-[#cbb88f]" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#9a7b4f] font-semibold">
              <Tag className="w-3.5 h-3.5" />
              {CATEGORY_LABELS[product.category] ?? product.category}
            </div>

            <h2 className="text-2xl md:text-3xl font-serif text-[#3a3527] leading-tight">
              {product.name}
            </h2>

            <p className="text-3xl font-serif text-[#9a7b4f] font-semibold">
              ${product.price.toFixed(2)}
            </p>

            <div className="flex items-center gap-2">
              {product.available ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-[#e8f0e4] text-[#5c7c4f]">
                  <Check className="w-4 h-4" /> Disponible
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-[#f0e4e0] text-[#b85c4f]">
                  <Clock className="w-4 h-4" /> Agotado
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-sm text-[#5a5040] leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#f0ebe0]">
                <p className="text-[11px] uppercase tracking-wider text-[#9a7b4f] font-semibold mb-1">
                  Material
                </p>
                <p className="text-sm font-medium text-[#3a3527]">
                  {MATERIAL_LABELS[product.material] ?? product.material}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#f0ebe0]">
                <p className="text-[11px] uppercase tracking-wider text-[#9a7b4f] font-semibold mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Temporada
                </p>
                <p className="text-sm font-medium text-[#3a3527]">
                  {SEASON_LABELS[product.season] ?? product.season}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
