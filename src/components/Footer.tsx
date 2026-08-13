import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  MessageCircle, 
  ArrowUp,
  FileCheck2,
  GraduationCap
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setIsInquiryModalOpen, setIsRABModalOpen, setIsAdminModalOpen } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Pre-footer: Direct WhatsApp CTA for Schools */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-extrabold">
              Butuh Konsultasi Kebutuhan Alat Praktik atau Proposal Pengadaan SMK?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100">
              Tim konsultan sarana prasarana kami siap membantu penyusunan spesifikasi teknis dan RAB resmi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/6281234567890?text=Halo%20PT%20Boemi%20Nusantara,%20kami%20dari%20pihak%20SMK%20ingin%20berkonsultasi%20mengenai%20pengadaan%20alat%20praktik"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-xl transition shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat WhatsApp Resmi</span>
            </a>

            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-5 py-3 rounded-xl transition"
            >
              Formulir Penawaran
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img 
                src="/logo-boemi.png" 
                alt="Logo Boemi Nusantara" 
                className="h-10 w-auto object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span className="font-extrabold text-white text-base">PT. BOEMI NUSANTARA</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Perusahaan spesialis penyedia peralatan dan perlengkapan praktik Sekolah Menengah Kejuruan (SMK), laboratorium vokasi, dan pelatihan kompetensi guru terstandarisasi industri.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Vendor Resmi Terdaftar PPN / PKP</span>
            </div>
          </div>

          {/* Bidang Keahlian */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Bidang Keahlian SMK</h4>
            <ul className="space-y-2">
              <li><a href="#katalog" className="hover:text-emerald-400 transition">Teknik Kendaraan Ringan (TKR) & Otomotif</a></li>
              <li><a href="#katalog" className="hover:text-emerald-400 transition">Teknik Bisnis Sepeda Motor (TBSM)</a></li>
              <li><a href="#katalog" className="hover:text-emerald-400 transition">Teknik Ketenagalistrikan & Mekatronika</a></li>
              <li><a href="#katalog" className="hover:text-emerald-400 transition">Broadcasting, Multimedia & DKV</a></li>
              <li><a href="#katalog" className="hover:text-emerald-400 transition">Tata Boga & Kuliner Perhotelan</a></li>
              <li><a href="#katalog" className="hover:text-emerald-400 transition">Teknik Pemesinan & Pengelasan</a></li>
            </ul>
          </div>

          {/* Layanan & Fasilitas */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Layanan Sekolah</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setIsRABModalOpen(true)} className="hover:text-emerald-400 transition text-left">
                  Simulasi RAB & E-Katalog Pengadaan
                </button>
              </li>
              <li>
                <button onClick={() => setIsInquiryModalOpen(true)} className="hover:text-emerald-400 transition text-left">
                  Permintaan Presentasi & Demo Alat di Sekolah
                </button>
              </li>
              <li><a href="#legalitas" className="hover:text-emerald-400 transition">Program Pelatihan Guru & Teknisi (ToT)</a></li>
              <li><a href="#legalitas" className="hover:text-emerald-400 transition">Instalasi, Kalibrasi & Garansi 1 Tahun</a></li>
              <li>
                <button onClick={() => setIsAdminModalOpen(true)} className="hover:text-emerald-400 transition text-left text-slate-500">
                  Akses Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Kontak & Lokasi */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Kontak & Kantor</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Jl. Hasyim Ashari No. 34 C-D, Cipondoh, Kota Tangerang, Banten</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>0812-3456-7890 (Hunting)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>kontak@boeminusantara.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} PT. Boemi Nusantara Kaya Berkah. Hak Cipta Dilindungi Undang-Undang.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
