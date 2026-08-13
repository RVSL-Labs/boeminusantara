import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Wrench, 
  GraduationCap, 
  CheckCircle2, 
  Calculator, 
  ArrowRight,
  Truck,
  FileCheck2
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { setIsRABModalOpen, setIsInquiryModalOpen } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-12 pb-20 lg:pt-16 lg:pb-24">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Penyedia Resmi Pengadaan Alat Praktik Vokasi SMK</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Modernisasi Bengkel & Laboratorium <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">Praktik SMK Anda</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              <strong className="text-white">PT. Boemi Nusantara Kaya Berkah</strong> hadir sebagai mitra strategis sekolah kejuruan di Indonesia. Kami menyediakan peralatan praktik berstandar industri dengan legalitas resmi ber-PPN, garansi suku cadang, dan program pelatihan intensif bagi guru serta teknisi sekolah.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-xl">
                <FileCheck2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Legalitas PT & Faktur Pajak PPN</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-xl">
                <GraduationCap className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Free Pelatihan Guru & Teknisi</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-xl col-span-2 sm:col-span-1">
                <Truck className="w-5 h-5 text-teal-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Pengiriman & Instalasi se-Indonesia</span>
              </div>
            </div>

            {/* Buttons CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#katalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
              >
                <span>Jelajahi Katalog Alat SMK</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsRABModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-600 font-semibold px-6 py-3.5 rounded-xl transition"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Simulasi RAB Pengadaan</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Card / Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-tr from-slate-800 to-slate-800/80 p-6 rounded-2xl border border-slate-700/80 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Standar Pengadaan Vokasi</h3>
                    <p className="text-xs text-slate-400">Siap Uji Kompetensi Keahlian (UKK)</p>
                  </div>
                </div>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-md border border-emerald-500/30">
                  Ready 2026
                </span>
              </div>

              {/* Jurusan Quick Badges */}
              <div className="space-y-2.5">
                {[
                  { name: 'Teknik Otomotif & Kendaraan Ringan (TKR/TSM)', count: 'Engine Stand, EFI Scanner, Tyre Machine' },
                  { name: 'Listrik & Mekatronika / Otomasi Industri', count: 'Trainer PLC, Panel Motor 3 Phase, VFD' },
                  { name: 'Multimedia, Broadcasting & DKV', count: 'Studio 4K Multi-Camera, Workstation PC' },
                  { name: 'Tata Boga & Kuliner Perhotelan', count: 'Commercial Deck Oven, Kitchen Stainless Set' },
                  { name: 'Teknik Pemesinan & Pengelasan (Welding)', count: 'Mesin Bubut Logam DRO, Inverter MIG/TIG' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 hover:border-emerald-500/40 transition">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-200">{item.name}</h4>
                      <p className="text-[11px] text-slate-400">{item.count}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Inquiry Trigger on Card */}
              <div className="pt-2">
                <button
                  onClick={() => setIsInquiryModalOpen(true)}
                  className="w-full py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <span>Minta Surat Penawaran Resmi Sekolah</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
