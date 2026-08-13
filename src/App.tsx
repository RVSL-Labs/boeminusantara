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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Catalog Section */}
        <section id="katalog" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Katalog Alat Praktik Terstandar</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Peralatan Praktik Laboratorium & Bengkel SMK
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Pilih bidang kejuruan dan tambahkan alat ke simulasi RAB untuk menghitung estimasi anggaran sekolah.
              </p>
            </div>

            {/* Quick Action Badges */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsRABModalOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 px-4 py-2.5 rounded-xl hover:bg-emerald-100 transition shadow-sm"
              >
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span>Kalkulator RAB Pengadaan</span>
              </button>
            </div>
          </div>

          {/* Department Category Filter */}
          <DepartmentFilter />

          {/* Search Result Indicator */}
          {searchQuery && (
            <div className="flex items-center justify-between p-3 bg-emerald-50 text-emerald-900 rounded-xl text-xs">
              <span>
                Menampilkan hasil pencarian untuk: <strong>"{searchQuery}"</strong> ({filteredProducts.length} alat ditemukan)
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="font-bold underline hover:text-emerald-700"
              >
                Reset Pencarian
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800">Alat Praktik Tidak Ditemukan</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Alat dengan kata kunci "{searchQuery}" belum ada di katalog kami. Anda dapat meminta penawaran kustom langsung ke tim sales engineer.
                </p>
              </div>
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition"
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
        <section className="py-16 bg-white border-t border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Mengapa SMK Memilih PT. Boemi Nusantara?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Solusi satu atap pengadaan sarpras kejuruan yang aman secara administratif dan optimal secara edukatif.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Faktur Pajak PPN Resmi</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Perusahaan berstatus Pengusaha Kena Pajak (PKP) resmi dengan kelengkapan dokumen perpajakan lengkap untuk pelaporan SPJ dana BOS/DAK.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Instalasi & Kalibrasi</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Teknisi kami terjun langsung ke bengkel sekolah untuk merakit, menguji fungsi, dan memastikan alat siap digunakan praktikum siswa.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Pelatihan Guru Kejuruan</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bimbingan teknis dan modul ajar praktis untuk guru pengampu agar materi kurikulum industri dapat tersampaikan dengan maksimal.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Garansi Resmi 1 Tahun</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Jaminan ketersediaan suku cadang dan respon servis cepat demi kelancaran kegiatan belajar mengajar di laboratorium kejuruan.
                </p>
              </div>
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
