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
  Layers
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Banner: Legalitas & Trust */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Vendor Resmi Terdaftar PPN & PKP
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-400">
              PT. Boemi Nusantara Kaya Berkah (Tangerang)
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden md:inline">Layanan Pelatihan Guru & Teknisi SMK</span>
            <div className="flex items-center gap-1.5 text-xs">
              <span className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`}></span>
              <span>{isConfigured ? 'Cloud Serverless Active' : 'Mode Offline / Local DB'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <img 
                src="/logo-boemi.png" 
                alt="Logo PT Boemi Nusantara" 
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  // Fallback visual jika logo gambar belum selesai dirender
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div style={{ display: 'none' }} className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-600 items-center justify-center text-white font-black text-xl shadow-md">
                BN
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-tight">
                  BOEMI NUSANTARA
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 tracking-wider uppercase">
                  Peralatan Praktik SMK & Vokasi
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari alat praktik (contoh: Engine Trainer, PLC, Mesin Bubut, Oven)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100/80 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="#katalog" 
              className="text-sm font-semibold text-slate-700 hover:text-emerald-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition"
            >
              Katalog Alat
            </a>
            
            <a 
              href="#legalitas" 
              className="text-sm font-semibold text-slate-700 hover:text-emerald-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition"
            >
              Profil & Legalitas
            </a>

            {/* Simulasi RAB Button */}
            <button
              onClick={() => setIsRABModalOpen(true)}
              className="relative inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-300/80 hover:bg-emerald-100 font-semibold text-sm px-4 py-2 rounded-xl transition shadow-sm group"
            >
              <Calculator className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>Simulasi RAB</span>
              {totalRABItems > 0 && (
                <span className="bg-emerald-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {totalRABItems}
                </span>
              )}
            </button>

            {/* Konsultasi Pengadaan */}
            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm px-4 py-2 rounded-xl transition shadow-md shadow-emerald-700/20"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Konsultasi Sekolah</span>
            </button>

            {/* Admin Panel Trigger */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              title="Akses Admin Panel"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsRABModalOpen(true)}
              className="relative p-2 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200"
            >
              <Calculator className="w-5 h-5" />
              {totalRABItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalRABItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="lg:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari alat praktik SMK..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg animate-fadeIn">
          <a
            href="#katalog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-2 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
          >
            <Layers className="w-5 h-5 text-emerald-600" />
            <span>Katalog Alat Praktik</span>
          </a>

          <a
            href="#legalitas"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-2 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
          >
            <Building2 className="w-5 h-5 text-emerald-600" />
            <span>Profil & Legalitas Perusahaan</span>
          </a>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsInquiryModalOpen(true);
            }}
            className="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white font-semibold py-2.5 rounded-xl"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Ajukan Konsultasi Sekolah</span>
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsAdminModalOpen(true);
            }}
            className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-medium py-2 rounded-xl text-sm"
          >
            <Settings className="w-4 h-4" />
            <span>Admin Dashboard</span>
          </button>
        </div>
      )}
    </header>
  );
};
