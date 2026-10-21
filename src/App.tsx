import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/components/HomePage';
import CategoryPage from '@/components/CategoryPage';
import ProductModal from '@/components/ProductModal';
import type { Product } from '@/lib/supabase';

type View =
  | { type: 'home' }
  | { type: 'category'; category: string }
  | { type: 'search'; query: string };

function App() {
  const [view, setView] = useState<View>({ type: 'home' });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const handleNavigate = (newView: View) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (newView.type === 'search') {
      setSearchQuery(newView.query);
    } else {
      setSearchQuery(null);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (view.type !== 'search') {
      setSearchQuery(null);
    }
  }, [view]);

  return (
    <div className="min-h-screen bg-[#faf8f3] flex flex-col">
      <Header onNavigate={handleNavigate} onSearch={handleSearch} />

      <main className="flex-1">
        {view.type === 'home' ? (
          <HomePage
            onSelectProduct={setSelectedProduct}
            onNavigate={handleNavigate}
          />
        ) : (
          <CategoryPage
            category={view.type === 'category' ? view.category : null}
            searchQuery={view.type === 'search' ? searchQuery : null}
            onSelectProduct={setSelectedProduct}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <Footer />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}

export default App;
