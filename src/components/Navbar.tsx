import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calculator, 
  Search, 
  PhoneCall, 
  ShieldCheck, 
  Settings, 
  Menu, 
  X,
  FileText,
  Building2,
  Layers,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    rabItems, 
    setIsRABModalOpen, 
    setIsInquiryModalOpen, 
    setIsAdminModalOpen, 
    searchQuery, 
    setSearchQuery,
    isConfigured
  } = useApp();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalRABItems = rabItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40">
      {/* ── Top Trust Bar ── */}
      <div className="bg-navy-950 text-ink-300 text-xs py-1.5 px-4 border-b border-navy-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-green-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Vendor Resmi · Faktur Pajak PPN &amp; PKP Terdaftar
            </span>
            <span className="hidden sm:inline text-navy-600">|</span>
            <span className="hidden sm:inline text-ink-400">
              PT. Boemi Nusantara Kaya Berkah · Tangerang
            </span>
          </div>

          <div className="flex items-center gap-4 text-ink-500">
            <span className="hidden md:inline">Layanan Pelatihan Guru &amp; Teknisi SMK</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-green-400' : 'bg-amber-400 animate-pulse'}`} />
              <span className="text-ink-400">{isConfigured ? 'Cloud Active' : 'Mode Offline'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <div className="bg-white/97 backdrop-blur-xl border-b border-ink-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px] gap-6">

            {/* Brand */}
            <a href="#" className="flex items-center gap-3 group shrink-0">
              <div className="w-11 h-11 rounded-xl bg-navy-900 flex items-center justify-center shadow-navy overflow-hidden">
                <img
                  src="/logo-boemi.png"
                  alt="Logo PT Boemi Nusantara"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fb = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fb) fb.style.display = 'flex';
                  }}
                />
                <span style={{ display: 'none' }} className="text-white font-black text-lg">BN</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-lg text-navy-950 tracking-tight group-hover:text-navy-800 transition-colors">
                  BOEMI NUSANTARA
                </span>
                <span className="text-[10px] font-bold text-crimson-500 tracking-widest uppercase">
                  Pengadaan Alat Praktik SMK
                </span>
              </div>
            </a>

            {/* Search Bar (Desktop) */}
            <div className="hidden lg:flex flex-1 max-w-lg">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  type="text"
                  placeholder="Cari alat praktik — Engine Trainer, PLC, Mesin Bubut, Oven..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-ink-50 border border-ink-200 rounded-xl text-ink-800 placeholder-ink-400 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-ink-200 hover:bg-ink-300 rounded-full flex items-center justify-center text-ink-500 text-xs transition"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <a
                href="#katalog"
                className="text-sm font-semibold text-ink-600 hover:text-navy-800 hover:bg-navy-50 px-3 py-2 rounded-xl transition-all"
              >
                Katalog
              </a>
              <a
                href="#legalitas"
                className="text-sm font-semibold text-ink-600 hover:text-navy-800 hover:bg-navy-50 px-3 py-2 rounded-xl transition-all"
              >
                Profil &amp; Legalitas
              </a>

              {/* RAB Button */}
              <button
                onClick={() => setIsRABModalOpen(true)}
                className="relative inline-flex items-center gap-2 bg-ink-50 hover:bg-steel-50 text-navy-800 border border-ink-200 hover:border-steel-300 font-semibold text-sm px-4 py-2.5 rounded-xl transition-all group"
              >
                <Calculator className="w-4 h-4 text-steel-500 group-hover:scale-110 transition-transform" />
                <span>Simulasi RAB</span>
                {totalRABItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-crimson-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-sm">
                    {totalRABItems}
                  </span>
                )}
              </button>

              {/* Konsultasi CTA */}
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-900 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-navy hover:-translate-y-0.5 active:translate-y-0"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Konsultasi</span>
              </button>

              {/* Admin */}
              <button
                onClick={() => setIsAdminModalOpen(true)}
                title="Admin Panel"
                className="p-2.5 text-ink-400 hover:text-navy-700 hover:bg-ink-100 rounded-xl transition"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsRABModalOpen(true)}
                className="relative p-2.5 bg-ink-50 text-navy-800 rounded-xl border border-ink-200"
              >
                <Calculator className="w-5 h-5" />
                {totalRABItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-crimson-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalRABItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 text-ink-600 hover:bg-ink-100 rounded-xl"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
              <input
                type="text"
                placeholder="Cari alat praktik SMK..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-ink-50 border border-ink-200 rounded-xl text-ink-800 placeholder-ink-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-ink-200 bg-white px-4 py-4 space-y-2 shadow-xl animate-fadeIn">
          <a
            href="#katalog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl text-ink-700 font-semibold hover:bg-navy-50 hover:text-navy-800 transition"
          >
            <Layers className="w-5 h-5 text-steel-500" />
            Katalog Alat Praktik
          </a>
          <a
            href="#legalitas"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl text-ink-700 font-semibold hover:bg-navy-50 hover:text-navy-800 transition"
          >
            <Building2 className="w-5 h-5 text-steel-500" />
            Profil &amp; Legalitas
          </a>
          <button
            onClick={() => { setIsMobileMenuOpen(false); setIsInquiryModalOpen(true); }}
            className="w-full flex items-center justify-center gap-2 bg-navy-800 text-white font-bold py-3 rounded-xl shadow-navy transition hover:bg-navy-900"
          >
            <PhoneCall className="w-4 h-4" />
            Ajukan Konsultasi Sekolah
          </button>
          <button
            onClick={() => { setIsMobileMenuOpen(false); setIsAdminModalOpen(true); }}
            className="w-full flex items-center justify-center gap-2 bg-ink-100 hover:bg-ink-200 text-ink-700 font-semibold py-2.5 rounded-xl text-sm transition"
          >
            <Settings className="w-4 h-4" />
            Admin Dashboard
          </button>
        </div>
      )}
    </header>
  );
};
