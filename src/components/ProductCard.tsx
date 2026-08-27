import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Calculator, Eye, CheckCircle2, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToRAB, setActiveProductModal, rabItems } = useApp();

  const isAlreadyInRAB = rabItems.some(item => item.product.id === product.id);

  const formatIDR = (val: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="bg-white rounded-2xl border border-ink-200 shadow-card hover:shadow-card-hover hover:border-steel-300/60 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group">

      {/* ── Image ── */}
      <div className="relative aspect-[4/3] bg-ink-100 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* SKU */}
        <div className="absolute top-3 left-3 bg-navy-950/85 backdrop-blur-md text-white text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg">
          {product.sku}
        </div>

        {/* Featured */}
        {product.is_featured && (
          <div className="absolute top-3 right-3 bg-crimson-500 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-lg shadow-sm tracking-wide">
            UNGGULAN
          </div>
        )}

        {/* Jurusan tag */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-950/80 to-transparent px-3 py-3">
          <span className="bg-navy-800/90 backdrop-blur text-ink-200 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-navy-600/40">
            {product.jurusan}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Name */}
          <h3
            onClick={() => setActiveProductModal(product)}
            className="font-bold text-ink-900 text-base line-clamp-2 hover:text-steel-600 cursor-pointer transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-ink-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Standards */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {product.standards.slice(0, 2).map((std, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 text-[10px] bg-ink-100 text-ink-600 font-medium px-2 py-0.5 rounded-md">
                <CheckCircle2 className="w-3 h-3 text-steel-500" />
                {std}
              </span>
            ))}
          </div>
        </div>

        {/* ── Price & Actions ── */}
        <div className="pt-3 border-t border-ink-100 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-ink-400 tracking-wider">Estimasi Harga RAB</span>
              <div className="text-base sm:text-lg font-black text-ink-900 tracking-tight">
                {product.price_estimate > 0 ? formatIDR(product.price_estimate) : 'Hubungi Tim'}
              </div>
            </div>
            <span className="text-xs font-semibold text-ink-400">/{product.unit}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveProductModal(product)}
              className="inline-flex items-center justify-center gap-1.5 bg-ink-50 hover:bg-ink-100 text-ink-700 border border-ink-200 text-xs font-semibold py-2.5 px-3 rounded-xl transition"
            >
              <Eye className="w-3.5 h-3.5 text-ink-500" />
              Detail Spek
            </button>

            <button
              onClick={() => addToRAB(product, 1)}
              className={`inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-3 rounded-xl transition shadow-sm ${
                isAlreadyInRAB
                  ? 'bg-steel-50 text-steel-700 border border-steel-200 hover:bg-steel-100'
                  : 'bg-navy-800 hover:bg-navy-900 text-white shadow-navy'
              }`}
            >
              {isAlreadyInRAB
                ? <><Check className="w-3.5 h-3.5" /> Ditambahkan</>
                : <><Plus className="w-3.5 h-3.5" /> Ke RAB</>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
