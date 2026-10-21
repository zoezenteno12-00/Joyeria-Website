import { Gem, Instagram, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2c2820] text-[#d8d0c0] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Gem className="w-6 h-6 text-[#c4a368]" />
              <span className="text-xl font-serif text-white">Lumen</span>
            </div>
            <p className="text-sm text-[#a99e85] leading-relaxed max-w-xs">
              Joyería discreta y divertida. Piezas únicas en oro, plata, platino,
              piedras, madera y fantasía para lucir en cualquier ocasión.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#c4a368] mb-4">
              Colecciones
            </h4>
            <ul className="space-y-2 text-sm text-[#a99e85]">
              <li>Collares</li>
              <li>Pulseras</li>
              <li>Anillos</li>
              <li>Aretes</li>
              <li>Pines</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#c4a368] mb-4">
              Conecta con nosotros
            </h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-[#3a3527] hover:bg-[#9a7b4f] transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#3a3527] hover:bg-[#9a7b4f] transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#3a3527] hover:bg-[#9a7b4f] transition-colors" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#3a3527] text-center text-xs text-[#7a705c]">
          © {new Date().getFullYear()} Lumen Joyería. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
