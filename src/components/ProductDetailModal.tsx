import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  Calculator, 
  ShieldCheck, 
  GraduationCap, 
  FileText,
  PhoneCall,
  Share2
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { activeProductModal, setActiveProductModal, addToRAB, setIsInquiryModalOpen, showToast } = useApp();

  if (!activeProductModal) return null;

  const product = activeProductModal;

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Tautan alat praktik disalin ke clipboard', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-slate-900 text-white font-mono text-xs font-semibold px-2.5 py-1 rounded-md">
              {product.sku}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              {product.jurusan}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Bagikan Alat"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveProductModal(null)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Image */}
            <div className="md:col-span-5">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Guarantees Box */}
              <div className="mt-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2.5">
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Jaminan Layanan PT. Boemi Nusantara
                </h4>
                <ul className="text-xs text-emerald-950 space-y-1.5">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Faktur Pajak & Transaksi Ber-PPN Resmi</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Garansi Suku Cadang & Servis 1 Tahun</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Disertai Bimbingan Teknis Guru & Teknisi</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Info & Specs */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {product.name}
                </h2>
                <div className="mt-2 text-2xl font-black text-emerald-800">
                  {product.price_estimate > 0 ? formatIDR(product.price_estimate) : 'Hubungi Tim Kami'}
                  <span className="text-xs font-semibold text-slate-400 ml-1.5">/{product.unit} (Estimasi RAB)</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Deskripsi & Kegunaan Praktik</h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {product.description}
                </p>
              </div>

              {/* Standard Compliance Tags */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Standar Kepatuhan Kurikulum</h4>
                <div className="flex flex-wrap gap-2">
                  {product.standards.map((std, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 text-xs bg-slate-100 text-slate-800 font-semibold px-3 py-1 rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {std}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Spesifikasi Teknis Alat</h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <tbody>
                      {Object.entries(product.specification).map(([key, val], idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                          <td className="p-2.5 font-bold text-slate-700 w-1/3 border-r border-slate-200">{key}</td>
                          <td className="p-2.5 text-slate-800 font-medium">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 hidden sm:block">
            Ingin modifikasi spek atau demo alat? Hubungi staf ahli kami.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                setActiveProductModal(null);
                setIsInquiryModalOpen(true);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Konsultasi Alat Ini</span>
            </button>

            <button
              onClick={() => {
                addToRAB(product, 1);
                setActiveProductModal(null);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition shadow-md shadow-emerald-700/20"
            >
              <Calculator className="w-4 h-4" />
              <span>+ Masukkan ke Simulasi RAB</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
