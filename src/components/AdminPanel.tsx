import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, JurusanKey } from '../types';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Package, 
  Inbox, 
  FileText, 
  Server, 
  Key, 
  CheckCircle2, 
  Lock, 
  LogOut,
  ExternalLink,
  Phone,
  Mail,
  Building2
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { 
    isAdminModalOpen, 
    setIsAdminModalOpen, 
    isAdminLoggedIn, 
    setIsAdminLoggedIn,
    products,
    inquiries,
    quotations,
    updateInquiryStatus,
    addProduct,
    deleteProduct,
    isConfigured,
    showToast
  } = useApp();

  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'inquiries' | 'quotations' | 'supabase'>('inquiries');

  // New Product Form State
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdSku, setNewProdSku] = useState('');
  const [newProdJurusan, setNewProdJurusan] = useState('Teknik Kendaraan Ringan (TKR)');
  const [newProdCategorySlug, setNewProdCategorySlug] = useState<JurusanKey>('tkr-otomotif');
  const [newProdDescription, setNewProdDescription] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(15000000);
  const [newProdUnit, setNewProdUnit] = useState('Unit');
  const [newProdImageUrl, setNewProdImageUrl] = useState('https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80');

  if (!isAdminModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123' || passwordInput === 'boemi2026') {
      setIsAdminLoggedIn(true);
      showToast('Login Administrator Berhasil', 'success');
    } else {
      showToast('PIN / Password salah. Coba gunakan: admin123', 'error');
    }
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdSku) return;

    addProduct({
      name: newProdName,
      sku: newProdSku,
      category_id: 'cat-custom',
      jurusan: newProdJurusan,
      category_slug: newProdCategorySlug,
      description: newProdDescription,
      specification: {
        'Standar Uji': 'UKK & Industri Standar',
        'Kapasitas': 'Spesifikasi Lab SMK Standar'
      },
      standards: ['Standar Industri', 'Kurikulum Merdeka'],
      price_estimate: Number(newProdPrice),
      unit: newProdUnit,
      image_url: newProdImageUrl,
      is_featured: false,
      is_active: true
    });

    setIsAddingProduct(false);
    setNewProdName('');
    setNewProdSku('');
    setNewProdDescription('');
  };

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Admin Portal — PT. Boemi Nusantara</h2>
              <p className="text-xs text-slate-400">Manajemen Katalog, Leads SMK, & Serverless Supabase</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdminLoggedIn && (
              <button
                onClick={() => setIsAdminLoggedIn(false)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 flex-1 text-xs">
          {!isAdminLoggedIn ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-12 space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-700 mx-auto flex items-center justify-center">
                <Lock className="w-8 h-8 text-emerald-700" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Akses Pengelola Boemi Nusantara</h3>
                <p className="text-slate-500 text-xs">
                  Masukkan PIN / Password admin untuk mengelola katalog alat & penawaran masuk dari sekolah.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-3">
                <input
                  type="password"
                  required
                  placeholder="Masukkan Password (default: admin123)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full p-3 text-center text-sm font-mono tracking-widest bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition shadow-md shadow-emerald-700/20"
                >
                  Buka Admin Dashboard
                </button>
                <p className="text-[11px] text-slate-400">Default PIN: <code className="font-bold text-slate-700">admin123</code></p>
              </form>
            </div>
          ) : (
            /* Admin Dashboard Content */
            <div className="space-y-6">
              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition ${
                    activeTab === 'inquiries'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Inbox className="w-4 h-4" />
                  <span>Leads & Konsultasi SMK ({inquiries.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('quotations')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition ${
                    activeTab === 'quotations'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Dokumen RAB Terbit ({quotations.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('products')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition ${
                    activeTab === 'products'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>Kelola Katalog Alat ({products.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('supabase')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition ${
                    activeTab === 'supabase'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Server className="w-4 h-4" />
                  <span>Konfigurasi Supabase Serverless</span>
                </button>
              </div>

              {/* TAB 1: INQUIRIES */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 text-sm">Daftar Permintaan Penawaran & Konsultasi Masuk</h3>
                    <span className="text-slate-500">Diperbarui secara real-time</span>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
                      Belum ada pesan konsultasi masuk.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.map((inq) => (
                        <div key={inq.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 hover:border-slate-300 transition">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <h4 className="font-extrabold text-slate-900 text-sm">{inq.school_name}</h4>
                              <p className="text-slate-600 font-medium">
                                PIC: {inq.contact_person} ({inq.role_title || 'Guru Kejuruan'}) — {inq.city_province || 'Lokasi tidak dicantumkan'}
                              </p>
                            </div>

                            {/* Status Selector */}
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-500">Status:</span>
                              <select
                                value={inq.status}
                                onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                                className="p-1.5 bg-white border border-slate-300 rounded-lg font-semibold text-slate-800"
                              >
                                <option value="new">Baru (New)</option>
                                <option value="contacted">Sudah Dihubungi</option>
                                <option value="quoted">Sudah Diberi Penawaran (Quoted)</option>
                                <option value="negotiation">Negosiasi / Revisi RAB</option>
                                <option value="closed_won">Deal Pengadaan (Won)</option>
                                <option value="closed_lost">Batal / Lost</option>
                              </select>
                            </div>
                          </div>

                          <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                            <div className="flex flex-wrap gap-1.5">
                              {inq.jurusan_target?.map((j, idx) => (
                                <span key={idx} className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                                  {j}
                                </span>
                              ))}
                              {inq.budget_range && (
                                <span className="bg-amber-50 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200">
                                  Anggaran: {inq.budget_range}
                                </span>
                              )}
                            </div>
                            <p className="text-slate-700 leading-relaxed italic">"{inq.message}"</p>
                          </div>

                          {/* Contact Shortcuts */}
                          <div className="flex items-center gap-4 text-[11px] text-slate-600">
                            <a
                              href={`https://wa.me/${inq.phone_number.replace(/^0/, '62').replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:underline"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>Hubungi via WhatsApp ({inq.phone_number})</span>
                            </a>
                            {inq.email && (
                              <a href={`mailto:${inq.email}`} className="inline-flex items-center gap-1 text-slate-600 hover:underline">
                                <Mail className="w-3.5 h-3.5" />
                                <span>{inq.email}</span>
                              </a>
                            )}
                            <span className="text-slate-400 ml-auto">
                              Waktu: {new Date(inq.created_at).toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: QUOTATIONS */}
              {activeTab === 'quotations' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 text-sm">Daftar Dokumen Estimasi RAB yang Diterbitkan</h3>
                  </div>

                  {quotations.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
                      Belum ada dokumen estimasi RAB yang diterbitkan.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {quotations.map((q) => (
                        <div key={q.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-mono font-bold text-emerald-700">{q.quote_number}</span>
                              <h4 className="font-bold text-slate-900 text-sm">{q.school_name}</h4>
                              <p className="text-slate-600">Kontak: {q.contact_name} ({q.contact_phone})</p>
                            </div>
                            <div className="text-right">
                              <span className="text-slate-400 text-[10px] block">Grand Total (Inc. PPN):</span>
                              <span className="font-black text-sm text-slate-900">{formatIDR(q.grand_total)}</span>
                            </div>
                          </div>

                          <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                            <span className="font-bold text-slate-600 block mb-1">Rincian Item ({q.items.length} Barang):</span>
                            <ul className="space-y-1">
                              {q.items.map((it, idx) => (
                                <li key={idx} className="flex justify-between text-[11px] text-slate-700">
                                  <span>{idx + 1}. {it.name} ({it.qty} {it.unit})</span>
                                  <span className="font-semibold">{formatIDR(it.subtotal)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: PRODUCTS */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 text-sm">Katalog Alat Praktik SMK</h3>
                    <button
                      onClick={() => setIsAddingProduct(!isAddingProduct)}
                      className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3.5 py-2 rounded-xl transition"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isAddingProduct ? 'Tutup Form' : 'Tambah Alat Baru'}</span>
                    </button>
                  </div>

                  {/* Add Product Form Drawer */}
                  {isAddingProduct && (
                    <form onSubmit={handleAddProductSubmit} className="p-4 bg-slate-50 border border-slate-300 rounded-2xl space-y-3">
                      <h4 className="font-bold text-slate-900">Form Tambah Alat Praktik Baru</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Nama Alat *</label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Mesin Balance 3D"
                            value={newProdName}
                            onChange={(e) => setNewProdName(e.target.value)}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Kode SKU *</label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: BN-OTO-BAL-04"
                            value={newProdSku}
                            onChange={(e) => setNewProdSku(e.target.value)}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Kategori Jurusan</label>
                          <select
                            value={newProdCategorySlug}
                            onChange={(e) => {
                              const val = e.target.value as JurusanKey;
                              setNewProdCategorySlug(val);
                              if (val === 'tkr-otomotif') setNewProdJurusan('Teknik Kendaraan Ringan (TKR)');
                              if (val === 'listrik-mekatronika') setNewProdJurusan('Teknik Listrik & Mekatronika');
                              if (val === 'multimedia-dkv') setNewProdJurusan('Multimedia & DKV');
                              if (val === 'tata-boga-hotel') setNewProdJurusan('Tata Boga & Kuliner');
                              if (val === 'pemesinan-las') setNewProdJurusan('Teknik Pemesinan & Pengelasan');
                            }}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                          >
                            <option value="tkr-otomotif">Teknik Otomotif (TKR/TSM)</option>
                            <option value="listrik-mekatronika">Listrik & Mekatronika</option>
                            <option value="multimedia-dkv">Multimedia & DKV</option>
                            <option value="tata-boga-hotel">Tata Boga & Kuliner</option>
                            <option value="pemesinan-las">Pemesinan & Pengelasan</option>
                          </select>
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Estimasi Harga (RAB)</label>
                          <input
                            type="number"
                            value={newProdPrice}
                            onChange={(e) => setNewProdPrice(Number(e.target.value))}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Satuan</label>
                          <input
                            type="text"
                            value={newProdUnit}
                            onChange={(e) => setNewProdUnit(e.target.value)}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">URL Gambar Foto</label>
                          <input
                            type="text"
                            value={newProdImageUrl}
                            onChange={(e) => setNewProdImageUrl(e.target.value)}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Deskripsi Alat & Kegunaan Praktik</label>
                        <textarea
                          rows={2}
                          value={newProdDescription}
                          onChange={(e) => setNewProdDescription(e.target.value)}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingProduct(false)}
                          className="px-3 py-1.5 bg-slate-200 rounded-lg font-semibold"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-emerald-700 text-white font-bold rounded-lg"
                        >
                          Simpan ke Katalog
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Products Table */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-slate-100 text-slate-700 font-bold">
                        <tr>
                          <th className="p-3">SKU</th>
                          <th className="p-3">Nama Alat Praktik</th>
                          <th className="p-3">Jurusan</th>
                          <th className="p-3 text-right">Harga Estimasi (RAB)</th>
                          <th className="p-3 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((p) => (
                          <tr key={p.id} className="border-t border-slate-200 bg-white hover:bg-slate-50">
                            <td className="p-3 font-mono font-bold text-slate-600">{p.sku}</td>
                            <td className="p-3 font-bold text-slate-900">{p.name}</td>
                            <td className="p-3 text-slate-600">{p.jurusan}</td>
                            <td className="p-3 text-right font-semibold">{formatIDR(p.price_estimate)}</td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => {
                                  if (confirm(`Hapus alat "${p.name}" dari katalog?`)) {
                                    deleteProduct(p.id);
                                  }
                                }}
                                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                                title="Hapus Produk"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: SUPABASE SERVERLESS CONFIG */}
              {activeTab === 'supabase' && (
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Panduan Menghubungkan Supabase Serverless (Beda Email)</h3>
                      <p className="text-slate-500">Anda dapat menggunakan akun & project Supabase baru secara gratis dan terisolasi.</p>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-3 h-3 rounded-full ${isConfigured ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                      <div>
                        <strong className="text-slate-900 block">Status Koneksi Database:</strong>
                        <span className="text-slate-500">
                          {isConfigured
                            ? 'Terhubung ke Supabase Cloud Serverless'
                            : 'Berjalan dalam mode Local Storage Mock Database (100% Berfungsi di Komputer Anda)'}
                        </span>
                      </div>
                    </div>

                    <span className={`font-bold px-3 py-1 rounded-full text-[11px] ${
                      isConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {isConfigured ? 'CONNECTED' : 'LOCAL FALLBACK'}
                    </span>
                  </div>

                  {/* Step by Step */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800">Langkah Menghubungkan ke Supabase Cloud:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-slate-700 bg-white p-4 rounded-xl border border-slate-200">
                      <li>Buka <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold underline">supabase.com</a> dan buat akun baru dengan email khusus <code>boeminusantara</code>.</li>
                      <li>Buat project baru (misal: <code>boemi-nusantara-db</code>).</li>
                      <li>Buka menu <strong>SQL Editor</strong> di dashboard Supabase, lalu jalankan file skema yang sudah kami siapkan di: <br/><code className="bg-slate-100 px-2 py-0.5 rounded font-mono font-bold text-emerald-800">supabase/migrations/20260813_init_boemi.sql</code></li>
                      <li>Buka <strong>Project Settings → API</strong>, salin <code>Project URL</code> dan <code>Anon Public Key</code>.</li>
                      <li>Masukkan ke file <code className="bg-slate-100 px-2 py-0.5 rounded font-mono font-bold text-emerald-800">.env.local</code> di folder project ini:
                        <pre className="mt-1 p-2 bg-slate-900 text-emerald-300 rounded font-mono text-[11px]">
VITE_SUPABASE_URL=https://your-new-project.supabase.co&#10;VITE_SUPABASE_ANON_KEY=your-new-anon-key
                        </pre>
                      </li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
