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
  FileCheck2,
  Star,
  Award,
  Globe
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { setIsRABModalOpen, setIsInquiryModalOpen } = useApp();

  const highlights = [
    { icon: FileCheck2, label: 'Legalitas PT · Faktur Pajak PPN', color: 'text-green-400' },
    { icon: GraduationCap, label: 'Pelatihan Gratis Guru & Teknisi', color: 'text-steel-400' },
    { icon: Truck, label: 'Pengiriman & Instalasi se-Indonesia', color: 'text-blue-300' },
  ];

  const jurusanList = [
    { name: 'Teknik Otomotif & Kendaraan Ringan (TKR/TSM)', items: 'Engine Stand · EFI Scanner · Tyre Machine', dot: 'bg-steel-400' },
    { name: 'Teknik Instalasi Tenaga Listrik (TITL)', items: 'Panel Listrik · Wiring Board · PLC Siemens', dot: 'bg-crimson-400' },
    { name: 'Teknik Pemesinan (TP)', items: 'Mesin Bubut CNC · Frais · CMM Presisi', dot: 'bg-ink-400' },
    { name: 'Teknik Audio Video & Elektronika', items: 'Osiloskop · Frequency Counter · Solder SMD', dot: 'bg-blue-400' },
    { name: 'Teknik Otomasi Industri (TOI)', items: 'PLC · HMI · Sensor Industri · Robot Arm', dot: 'bg-navy-400' },
  ];

  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      {/* ── Decorative background grid ── */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      {/* ── Glow blobs ── */}
      <div className="absolute -top-40 -left-20 w-[500px] h-[500px] bg-steel-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-0 w-[400px] h-[400px] bg-crimson-500/8 rounded-full blur-3xl pointer-events-none" />
      {/* ── Navy→dark gradient overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 opacity-90 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20 lg:pt-20 lg:pb-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">

          {/* ── Left Column ── */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">

            {/* Trust badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/5 backdrop-blur border border-white/10 text-ink-300 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Penyedia Resmi · Pengadaan Alat Praktik Vokasi SMK</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.1] text-white">
              Solusi Pengadaan{' '}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-steel-300 via-blue-200 to-steel-400">
                  Laboratorium
                </span>
              </span>
              {' '}&amp;{' '}
              <span className="text-crimson-400">Bengkel SMK</span>
            </h1>

            {/* Sub */}
            <p className="text-base sm:text-lg text-ink-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              <strong className="text-white font-bold">PT. Boemi Nusantara Kaya Berkah</strong> — mitra strategis sekolah kejuruan di Indonesia. Peralatan berstandar industri, legalitas resmi, garansi suku cadang, dan pelatihan intensif.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              {highlights.map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl p-3">
                  <Icon className={`w-5 h-5 shrink-0 ${color}`} />
                  <span className="text-xs font-medium text-ink-200">{label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#katalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-steel-500 hover:bg-steel-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-steel transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Jelajahi Katalog</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsRABModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/8 hover:bg-white/14 text-white border border-white/15 font-semibold px-7 py-3.5 rounded-xl transition-all"
              >
                <Calculator className="w-4 h-4 text-steel-300" />
                <span>Simulasi RAB</span>
              </button>
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-crimson-500 hover:bg-crimson-600 text-white font-bold px-7 py-3.5 rounded-xl shadow-crimsn transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Konsultasi Pengadaan
              </button>
            </div>

            {/* Trust strip */}
            <div className="flex items-center gap-5 pt-2 justify-center lg:justify-start">
              {[
                { icon: Award, text: 'NIB Terdaftar' },
                { icon: ShieldCheck, text: 'Vendor Resmi Kemendikbud' },
                { icon: Globe, text: 'Layanan Seluruh Indonesia' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-ink-500 text-xs font-medium">
                  <Icon className="w-3.5 h-3.5 text-ink-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Column — Feature Card ── */}
          <div className="lg:col-span-5">
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5">
              {/* Card header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-steel-500/20 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-steel-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Standar Pengadaan Vokasi</h3>
                    <p className="text-xs text-ink-400">Sesuai Uji Kompetensi Keahlian (UKK)</p>
                  </div>
                </div>
                <span className="text-[11px] bg-crimson-500/20 text-crimson-300 font-bold px-2.5 py-1 rounded-lg border border-crimson-500/30">
                  Ready 2026
                </span>
              </div>

              {/* Jurusan list */}
              <div className="space-y-3">
                {jurusanList.map((j) => (
                  <div key={j.name} className="flex items-start gap-3 group">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${j.dot}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-ink-200 group-hover:text-white transition-colors leading-tight truncate">{j.name}</p>
                      <p className="text-[11px] text-ink-500 mt-0.5">{j.items}</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-green-500/60 shrink-0 mt-0.5" />
                  </div>
                ))}
              </div>

              {/* Bottom stat */}
              <div className="pt-4 border-t border-white/8 grid grid-cols-3 gap-3 text-center">
                {[
                  { val: '200+', label: 'Produk' },
                  { val: '5 SMK', label: 'Jurusan' },
                  { val: '34', label: 'Provinsi' },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <div className="text-xl font-extrabold text-white">{val}</div>
                    <div className="text-[10px] font-medium text-ink-500 uppercase tracking-wider">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
