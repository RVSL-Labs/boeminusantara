import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Calculator, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToRAB, setActiveProductModal, rabItems } = useApp();

  const isAlreadyInRAB = rabItems.some(item => item.product.id === product.id);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Product Image & Top Badges */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* SKU Badge */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg">
          {product.sku}
        </div>

        {/* Featured Badge */}
        {product.is_featured && (
          <div className="absolute top-3 right-3 bg-amber-500 text-slate-900 text-[11px] font-extrabold px-2.5 py-1 rounded-lg shadow-sm">
            UNGGULAN
          </div>
        )}

        {/* Jurusan Tag */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
          <span className="bg-emerald-950/85 backdrop-blur-md text-emerald-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-emerald-500/30">
            {product.jurusan}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 
            onClick={() => setActiveProductModal(product)}
            className="font-bold text-slate-900 text-base line-clamp-2 hover:text-emerald-700 cursor-pointer transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Standards Checklist preview */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {product.standards.slice(0, 2).map((std, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {std}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Estimasi Harga RAB</span>
              <div className="text-base sm:text-lg font-black text-slate-900">
                {product.price_estimate > 0 ? formatIDR(product.price_estimate) : 'Hubungi Tim'}
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-400">/{product.unit}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveProductModal(product)}
              className="inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2.5 px-3 rounded-xl transition"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>Detail Spek</span>
            </button>

            <button
              onClick={() => addToRAB(product, 1)}
              className={`inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-3 rounded-xl transition shadow-sm ${
                isAlreadyInRAB
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{isAlreadyInRAB ? '+ Tambah Lagi' : '+ Ke RAB'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
