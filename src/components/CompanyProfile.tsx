import React from 'react';
import { 
  Building2, 
  FileCheck2, 
  GraduationCap, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Award,
  CheckCircle2,
  Wrench,
  Truck
} from 'lucide-react';

export const CompanyProfile: React.FC = () => {
  return (
    <section id="legalitas" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Legalitas & Rekam Jejak Perusahaan</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            PT. Boemi Nusantara Kaya Berkah
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Perusahaan nasional yang berkomitmen memajukan kualitas pendidikan vokasi di Indonesia melalui penyediaan sarana dan prasarana laboratorium praktik SMK yang unggul, presisi, dan sesuai kurikulum industri terkini.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl space-y-4 hover:border-emerald-500/50 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">1. Alat Praktik Standar Industri</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Seluruh trainer, simulator, dan instrumen diproduksi dengan komponen standar industri nyata (DUDI) untuk memastikan kesiapan siswa menghadapi Uji Kompetensi Keahlian (UKK) dan dunia kerja.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl space-y-4 hover:border-amber-500/50 transition">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">2. Pelatihan Guru & Teknisi</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Kami tidak hanya mengirimkan barang. Setiap paket pengadaan disertai program *Transfer of Technology (ToT)* dan workshop pengoperasian untuk guru pengampu dan teknisi laboratorium sekolah.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl space-y-4 hover:border-teal-500/50 transition">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">3. Garansi & Instalasi Lapangan</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Layanan instalasi lengkap langsung di bengkel sekolah, kalibrasi instrumen, ketersediaan suku cadang terjamin, dan garansi resmi pemeliharaan hingga 1 tahun.
            </p>
          </div>
        </div>

        {/* Legalitas & Office Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-800/50 border border-slate-700 p-6 sm:p-8 rounded-3xl">
          {/* Legal Badges */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-emerald-400" />
              Kelengkapan Dokumen & Legalitas Formal
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Memenuhi seluruh kualifikasi administratif pengadaan barang dan jasa pemerintah maupun yayasan swasta (BOS Kinerja, Dana Alokasi Khusus / DAK Fisik SMK, & Anggaran Sekolah Mandiri):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 bg-slate-900/80 p-3 rounded-xl border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <strong className="text-white block">Nomor Induk Berusaha (NIB)</strong>
                  <span className="text-slate-400 text-[11px]">Terdaftar Resmi OSS RBA</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/80 p-3 rounded-xl border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <strong className="text-white block">Pengusaha Kena Pajak (PKP)</strong>
                  <span className="text-slate-400 text-[11px]">Dapat Menerbitkan Faktur Pajak PPN</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/80 p-3 rounded-xl border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <strong className="text-white block">Akta Pendirian PT Resmi</strong>
                  <span className="text-slate-400 text-[11px]">Disahkan Kemenkumham RI</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/80 p-3 rounded-xl border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <strong className="text-white block">NPWP Perusahaan Terdaftar</strong>
                  <span className="text-slate-400 text-[11px]">KPP Pratama Tangerang</span>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Office */}
          <div className="lg:col-span-5 bg-slate-900/90 p-6 rounded-2xl border border-slate-700 space-y-4">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Kantor & Lokasi Operasional
            </h4>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p>
                  <strong>PT. Boemi Nusantara Kaya Berkah</strong><br />
                  Jl. Hasyim Ashari No. 34 C-D, Cipondoh, Kota Tangerang, Banten
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Layanan Hotline / WhatsApp: 0812-3456-7890</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>info@boeminusantara.com</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-[11px] text-emerald-300">
                📍 Workshop siap dikunjungi untuk sesi demonstrasi alat praktik dan konsultasi sarpras laboratorium sekolah.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
