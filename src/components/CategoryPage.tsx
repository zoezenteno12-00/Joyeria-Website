import { useEffect, useState, useCallback } from 'react';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import { supabase, type Product, CATEGORIES, MATERIALS, SEASONS } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

type CategoryPageProps = {
  category: string | null;
  searchQuery?: string | null;
  onSelectProduct: (p: Product) => void;
  onNavigate: (view: { type: 'category'; category: string }) => void;
};

const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c.label])
);

export default function CategoryPage({ category, searchQuery, onSelectProduct, onNavigate }: CategoryPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filters
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');

  const title = searchQuery
    ? `Resultados: "${searchQuery}"`
    : category
      ? CATEGORY_LABELS[category] ?? 'Todos'
      : 'Todos los productos';

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('products').select('*');

    if (category) {
      query = query.eq('category', category);
    }

    if (searchQuery) {
      query = query.or(
        `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,material.ilike.%${searchQuery}%`
      );
    }

    if (selectedMaterials.length > 0) {
      query = query.in('material', selectedMaterials);
    }

    if (selectedSeasons.length > 0) {
      query = query.in('season', selectedSeasons);
    }

    if (onlyAvailable) {
      query = query.eq('available', true);
    }

    if (sortBy === 'price_asc') {
      query = query.order('price', { ascending: true });
    } else if (sortBy === 'price_desc') {
      query = query.order('price', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data } = await query;
    setProducts(data ?? []);
    setLoading(false);
  }, [category, searchQuery, selectedMaterials, selectedSeasons, onlyAvailable, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const toggleFilter = (value: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const clearFilters = () => {
    setSelectedMaterials([]);
    setSelectedSeasons([]);
    setOnlyAvailable(false);
    setSortBy('newest');
  };

  const hasActiveFilters =
    selectedMaterials.length > 0 ||
    selectedSeasons.length > 0 ||
    onlyAvailable ||
    sortBy !== 'newest';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-6">
        {category && (
          <button
            onClick={() => onNavigate({ type: 'category', category })}
            className="self-start text-xs uppercase tracking-wider text-[#9a7b4f] font-semibold hover:underline"
          >
            {CATEGORY_LABELS[category]}
          </button>
        )}
        <h1 className="text-3xl md:text-4xl font-serif text-[#3a3527]">{title}</h1>
        <p className="text-sm text-[#7a705c]">
          {loading ? 'Cargando...' : `${products.length} ${products.length === 1 ? 'pieza' : 'piezas'}`}
        </p>
      </div>

      <div className="flex gap-6">
        {/* Desktop filters sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <FilterPanel
            selectedMaterials={selectedMaterials}
            selectedSeasons={selectedSeasons}
            onlyAvailable={onlyAvailable}
            sortBy={sortBy}
            onToggleMaterial={(v) => toggleFilter(v, selectedMaterials, setSelectedMaterials)}
            onToggleSeason={(v) => toggleFilter(v, selectedSeasons, setSelectedSeasons)}
            onToggleAvailable={() => setOnlyAvailable(!onlyAvailable)}
            onSortChange={setSortBy}
            onClear={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </aside>

        <div className="flex-1">
          {/* Mobile filter bar */}
          <div className="lg:hidden flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#e0d8c8] text-sm font-medium text-[#5a5040]"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 rounded-full bg-white border border-[#e0d8c8] text-sm text-[#5a5040] focus:outline-none"
            >
              <option value="newest">Más recientes</option>
              <option value="price_asc">Precio: menor a mayor</option>
              <option value="price_desc">Precio: mayor a menor</option>
            </select>
          </div>

          {/* Products grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-[#f0ebe0] animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="w-12 h-12 text-[#cbb88f] mb-4" />
              <p className="text-lg font-medium text-[#5a5040]">No se encontraron piezas</p>
              <p className="text-sm text-[#7a705c] mt-1">
                Prueba ajustando los filtros o buscando otra cosa.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 rounded-full bg-[#9a7b4f] text-white text-sm hover:bg-[#856a3f] transition-colors"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} onClick={() => onSelectProduct(p)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-[#2c2820]/50 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[#faf8f3] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-serif text-[#3a3527]">Filtros</h3>
              <button onClick={() => setShowFilters(false)} className="p-2 rounded-full hover:bg-[#efe9dd]">
                <X className="w-5 h-5 text-[#5a5040]" />
              </button>
            </div>
            <FilterPanel
              selectedMaterials={selectedMaterials}
              selectedSeasons={selectedSeasons}
              onlyAvailable={onlyAvailable}
              sortBy={sortBy}
              onToggleMaterial={(v) => toggleFilter(v, selectedMaterials, setSelectedMaterials)}
              onToggleSeason={(v) => toggleFilter(v, selectedSeasons, setSelectedSeasons)}
              onToggleAvailable={() => setOnlyAvailable(!onlyAvailable)}
              onSortChange={setSortBy}
              onClear={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
            <button
              onClick={() => setShowFilters(false)}
              className="mt-6 w-full px-4 py-3 rounded-full bg-[#9a7b4f] text-white text-sm font-medium"
            >
              Ver {products.length} resultados
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

type FilterPanelProps = {
  selectedMaterials: string[];
  selectedSeasons: string[];
  onlyAvailable: boolean;
  sortBy: 'newest' | 'price_asc' | 'price_desc';
  onToggleMaterial: (v: string) => void;
  onToggleSeason: (v: string) => void;
  onToggleAvailable: () => void;
  onSortChange: (v: 'newest' | 'price_asc' | 'price_desc') => void;
  onClear: () => void;
  hasActiveFilters: boolean;
};

function FilterPanel(props: FilterPanelProps) {
  return (
    <div className="space-y-6">
      {props.hasActiveFilters && (
        <button
          onClick={props.onClear}
          className="text-xs text-[#9a7b4f] font-medium hover:underline"
        >
          Limpiar todo
        </button>
      )}

      {/* Sort */}
      <div>
        <h4 className="text-xs uppercase tracking-wider text-[#9a7b4f] font-semibold mb-3">Ordenar</h4>
        <div className="space-y-2">
          {[
            { v: 'newest', l: 'Más recientes' },
            { v: 'price_asc', l: 'Precio: menor a mayor' },
            { v: 'price_desc', l: 'Precio: mayor a menor' },
          ].map((o) => (
            <label key={o.v} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="sort"
                checked={props.sortBy === o.v}
                onChange={() => props.onSortChange(o.v as FilterPanelProps['sortBy'])}
                className="accent-[#9a7b4f]"
              />
              <span className="text-sm text-[#5a5040] group-hover:text-[#3a3527]">{o.l}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div>
        <h4 className="text-xs uppercase tracking-wider text-[#9a7b4f] font-semibold mb-3">Material</h4>
        <div className="space-y-2">
          {MATERIALS.map((m) => (
            <label key={m.key} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={props.selectedMaterials.includes(m.key)}
                onChange={() => props.onToggleMaterial(m.key)}
                className="rounded accent-[#9a7b4f]"
              />
              <span className="text-sm text-[#5a5040] group-hover:text-[#3a3527]">{m.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Season */}
      <div>
        <h4 className="text-xs uppercase tracking-wider text-[#9a7b4f] font-semibold mb-3">Temporada</h4>
        <div className="space-y-2">
          {SEASONS.map((s) => (
            <label key={s.key} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={props.selectedSeasons.includes(s.key)}
                onChange={() => props.onToggleSeason(s.key)}
                className="rounded accent-[#9a7b4f]"
              />
              <span className="text-sm text-[#5a5040] group-hover:text-[#3a3527]">{s.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="text-xs uppercase tracking-wider text-[#9a7b4f] font-semibold mb-3">Disponibilidad</h4>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={props.onlyAvailable}
            onChange={props.onToggleAvailable}
            className="rounded accent-[#9a7b4f]"
          />
          <span className="text-sm text-[#5a5040] group-hover:text-[#3a3527]">Solo disponibles</span>
        </label>
      </div>
    </div>
  );
}
