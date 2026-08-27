import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DepartmentFilter } from './components/DepartmentFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { RABSimulatorModal } from './components/RABSimulatorModal';
import { InquiryForm } from './components/InquiryForm';
import { CompanyProfile } from './components/CompanyProfile';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { 
  Sparkles, 
  Search, 
  Layers, 
  ShieldCheck, 
  Calculator, 
  PhoneCall, 
  Wrench, 
  GraduationCap, 
  CheckCircle2 
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    products, 
    selectedJurusan, 
    searchQuery, 
    setSearchQuery,
    setIsRABModalOpen,
    setIsInquiryModalOpen 
  } = useApp();

  // Filter products by jurusan and search query
  const filteredProducts = products.filter((p) => {
    if (!p.is_active) return false;
    
    // Filter Jurusan
    const matchesJurusan = selectedJurusan === 'all' || p.category_slug === selectedJurusan;
    
    // Filter Search
    const matchesSearch = 
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.jurusan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesJurusan && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-ink-50">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Catalog Section */}
        <section id="katalog" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-ink-200 pb-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-steel-600 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Katalog Alat Praktik Terstandar</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
                Peralatan Praktik Laboratorium &amp; Bengkel SMK
              </h2>
              <p className="text-xs sm:text-sm text-ink-500">
                Pilih bidang kejuruan dan tambahkan alat ke simulasi RAB untuk menghitung estimasi anggaran sekolah.
              </p>
            </div>

            {/* Quick Action */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsRABModalOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-bold bg-white text-navy-800 border border-ink-200 hover:border-steel-300 hover:bg-steel-50 px-4 py-2.5 rounded-xl transition shadow-sm"
              >
                <Calculator className="w-4 h-4 text-steel-500" />
                <span>Kalkulator RAB Pengadaan</span>
              </button>
            </div>
          </div>

          {/* Department Category Filter */}
          <DepartmentFilter />

          {/* Search Result Indicator */}
          {searchQuery && (
            <div className="flex items-center justify-between p-3 bg-steel-50 border border-steel-200 text-steel-800 rounded-xl text-xs">
              <span>
                Hasil pencarian: <strong>"{searchQuery}"</strong> — {filteredProducts.length} alat ditemukan
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="font-bold text-steel-600 hover:text-steel-800 underline"
              >
                Reset
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-2xl border border-ink-200 shadow-card space-y-4">
              <div className="w-16 h-16 rounded-full bg-ink-100 text-ink-400 mx-auto flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-ink-900">Alat Praktik Tidak Ditemukan</h3>
                <p className="text-xs text-ink-500 max-w-md mx-auto">
                  Alat dengan kata kunci "{searchQuery}" belum ada di katalog kami. Anda dapat meminta penawaran kustom ke tim sales engineer.
                </p>
              </div>
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-navy"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Minta Pengadaan Khusus</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Why Choose Boemi Section */}
        <section className="py-16 bg-white border-t border-b border-ink-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-steel-600 uppercase tracking-widest mb-3">
                <Layers className="w-3.5 h-3.5" />
                <span>Keunggulan Kami</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
                Mengapa SMK Memilih PT. Boemi Nusantara?
              </h2>
              <p className="text-xs sm:text-sm text-ink-500">
                Solusi satu atap pengadaan sarpras kejuruan yang aman secara administratif dan optimal secara edukatif.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {[
                { icon: ShieldCheck, color: 'bg-navy-100 text-navy-700', border: 'border-t-navy-600', title: 'Faktur Pajak PPN Resmi', desc: 'Berstatus PKP resmi dengan dokumen perpajakan lengkap untuk pelaporan SPJ dana BOS/DAK.' },
                { icon: Wrench, color: 'bg-steel-100 text-steel-700', border: 'border-t-steel-500', title: 'Instalasi & Kalibrasi', desc: 'Teknisi kami langsung ke bengkel sekolah untuk merakit, menguji, dan memastikan alat siap praktikum.' },
                { icon: GraduationCap, color: 'bg-crimson-100 text-crimson-700', border: 'border-t-crimson-500', title: 'Pelatihan Guru Kejuruan', desc: 'Bimbingan teknis dan modul ajar untuk guru agar kurikulum industri dapat tersampaikan maksimal.' },
                { icon: CheckCircle2, color: 'bg-ink-100 text-ink-700', border: 'border-t-ink-500', title: 'Garansi Resmi 1 Tahun', desc: 'Ketersediaan suku cadang dan respons servis cepat untuk kelancaran belajar mengajar.' },
              ].map(({ icon: Icon, color, border, title, desc }) => (
                <div key={title} className={`p-6 bg-white rounded-2xl border border-ink-200 border-t-4 ${border} shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 space-y-3`}>
                  <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-ink-900 text-sm">{title}</h3>
                  <p className="text-xs text-ink-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Profile & Legalitas Section */}
        <CompanyProfile />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Overlays */}
      <ProductDetailModal />
      <RABSimulatorModal />
      <InquiryForm />
      <AdminPanel />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
