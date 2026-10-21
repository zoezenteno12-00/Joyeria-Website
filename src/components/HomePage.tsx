import { useEffect, useState } from 'react';
import { Link, Watch, Circle, Droplet, Pin, ArrowRight, Sparkles } from 'lucide-react';
import { supabase, type Product, CATEGORIES } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  collares: Link,
  pulseras: Watch,
  anillos: Circle,
  aretes: Droplet,
  pines: Pin,
};

type HomePageProps = {
  onSelectProduct: (p: Product) => void;
  onNavigate: (view: { type: 'category'; category: string }) => void;
};

export default function HomePage({ onSelectProduct, onNavigate }: HomePageProps) {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });
      setFeatured(data ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f7f4ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex flex-col gap-5">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9a7b4f] font-semibold">
                <Sparkles className="w-4 h-4" />
                Joyería artesanal
              </span>
              <h1 className="text-4xl md:text-6xl font-serif text-[#3a3527] leading-[1.1]">
                Discreta, divertida,<br />
                <span className="text-[#9a7b4f]">hecha para brillar</span>
              </h1>
              <p className="text-base md:text-lg text-[#5a5040] leading-relaxed max-w-md">
                Collares, pulseras, anillos, aretes y pines en oro, plata, platino,
                piedras, madera y fantasía. Encuentra la pieza perfecta para cada
                temporada y cada momento.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate({ type: 'category', category: 'collares' })}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#9a7b4f] text-white text-sm font-medium hover:bg-[#856a3f] transition-colors"
                >
                  Ver colección
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate({ type: 'category', category: 'anillos' })}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#e0d8c8] text-[#3a3527] text-sm font-medium hover:bg-[#efe9dd] transition-colors"
                >
                  Explorar anillos
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/4155251/pexels-photo-4155251.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Collares de oro"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg mt-8">
                  <img
                    src="https://images.pexels.com/photos/8306529/pexels-photo-8306529.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Anillo de diamante"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 md:w-32 md:h-32 rounded-full bg-white shadow-xl flex items-center justify-center hidden md:flex">
                <div className="text-center">
                  <p className="text-2xl font-serif text-[#9a7b4f] font-bold">25+</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#5a5040]">Piezas únicas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-serif text-[#3a3527] mb-2">
            Explora por categoría
          </h2>
          <p className="text-sm text-[#7a705c]">
            Encuentra el accesorio perfecto para tu estilo
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.key] ?? Sparkles;
            return (
              <button
                key={cat.key}
                onClick={() => onNavigate({ type: 'category', category: cat.key })}
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-[#e8e2d6] hover:border-[#9a7b4f] hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-[#f0ebe0] flex items-center justify-center group-hover:bg-[#9a7b4f] transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#9a7b4f] group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-sm font-medium text-[#3a3527]">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-[#3a3527] mb-1">
              Piezas destacadas
            </h2>
            <p className="text-sm text-[#7a705c]">Nuestras selecciones favoritas</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-[#f0ebe0] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} onClick={() => onSelectProduct(p)} />
            ))}
          </div>
        )}
      </section>

      {/* Materials banner */}
      <section className="bg-[#f0ebe0] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-serif text-[#3a3527] mb-2">
              Materiales que cuentan historias
            </h2>
            <p className="text-sm text-[#7a705c] max-w-xl mx-auto">
              Desde el brillo atemporal del oro hasta la calidez de la madera,
              cada material tiene su carácter.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['Oro', 'Plata', 'Platino', 'Piedras', 'Madera', 'Fantasía'].map((m) => (
              <span
                key={m}
                className="px-5 py-2.5 rounded-full bg-white border border-[#e0d8c8] text-sm font-medium text-[#5a5040] hover:border-[#9a7b4f] hover:text-[#9a7b4f] transition-colors cursor-default"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
