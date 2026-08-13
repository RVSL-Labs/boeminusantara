import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  Printer, 
  Send, 
  Plus, 
  Minus, 
  Building2, 
  FileCheck2, 
  CheckCircle2, 
  Calculator,
  ShieldCheck
} from 'lucide-react';

export const RABSimulatorModal: React.FC = () => {
  const { 
    isRABModalOpen, 
    setIsRABModalOpen, 
    rabItems, 
    updateRABQuantity, 
    removeFromRAB, 
    clearRAB,
    submitQuotation 
  } = useApp();

  const [schoolName, setSchoolName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteGenerated, setQuoteGenerated] = useState<any | null>(null);

  if (!isRABModalOpen) return null;

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const subtotal = rabItems.reduce(
    (sum, item) => sum + item.product.price_estimate * item.quantity,
    0
  );
  const ppn = subtotal * 0.11;
  const grandTotal = subtotal + ppn;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolName || !contactName || !phone) {
      alert('Mohon lengkapi Nama Sekolah, Nama Kontak, dan Nomor HP');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitQuotation({
        name: schoolName,
        contact: contactName,
        phone,
        email
      });
      if (res) {
        setQuoteGenerated(res);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Simulasi RAB & Draft Penawaran SMK</h2>
              <p className="text-xs text-slate-500">Estimasi Anggaran Pengadaan Alat Praktik Vokasi Terdaftar PPN</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {rabItems.length > 0 && !quoteGenerated && (
              <button
                onClick={clearRAB}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold px-3 py-1.5 rounded-lg hover:bg-rose-50 transition"
              >
                Kosongkan
              </button>
            )}
            <button
              onClick={() => {
                setIsRABModalOpen(false);
                setQuoteGenerated(null);
              }}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {quoteGenerated ? (
            /* Success State with Printable Quotation */
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-emerald-950 text-sm">Dokumen Draft RAB Berhasil Diterbitkan!</h3>
                  <p className="text-xs text-emerald-800">
                    Nomor Referensi: <span className="font-mono font-bold text-slate-900">{quoteGenerated.quote_number}</span>. Dokumen ini telah disimpan ke sistem dan tim sales engineer PT. Boemi Nusantara akan segera menyiapkan berkas penawaran resmi berstempel dan bertanda tangan.
                  </p>
                </div>
              </div>

              {/* Official Quotation Sheet Preview */}
              <div className="p-6 bg-slate-50 border border-slate-300 rounded-2xl space-y-6 print:m-0 print:p-0 print:border-none print:bg-white text-slate-900 text-xs">
                {/* Header Sheet */}
                <div className="flex justify-between items-start border-b border-slate-300 pb-4">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">PT. BOEMI NUSANTARA KAYA BERKAH</h2>
                    <p className="text-[11px] text-slate-600">Penyedia Peralatan Praktik Kejuruan & Pelatihan Guru SMK</p>
                    <p className="text-[11px] text-slate-600">Jl. Hasyim Ashari No. 34 C-D, Cipondoh, Tangerang, Banten</p>
                    <p className="text-[11px] text-slate-600">Vendor Terdaftar PPN / PKP</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-emerald-800">ESTIMASI RAB / QUOTATION</div>
                    <div className="font-mono font-bold text-xs">{quoteGenerated.quote_number}</div>
                    <div className="text-[11px] text-slate-500">Tanggal: {new Date(quoteGenerated.created_at).toLocaleDateString('id-ID')}</div>
                  </div>
                </div>

                {/* School Client Destination */}
                <div className="grid grid-cols-2 gap-4 bg-white p-3.5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Ditujukan Kepada:</span>
                    <p className="font-bold text-slate-900">{quoteGenerated.school_name}</p>
                    <p className="text-slate-600">Attn: {quoteGenerated.contact_name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Kontak:</span>
                    <p className="text-slate-700">{quoteGenerated.contact_phone}</p>
                    <p className="text-slate-700">{quoteGenerated.contact_email || '-'}</p>
                  </div>
                </div>

                {/* Table Items */}
                <table className="w-full text-left border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-200/80 text-slate-800 font-bold">
                      <th className="p-2 border border-slate-300 w-10">No</th>
                      <th className="p-2 border border-slate-300">Deskripsi Alat Praktik</th>
                      <th className="p-2 border border-slate-300 w-16 text-center">Qty</th>
                      <th className="p-2 border border-slate-300 text-right">Harga Satuan</th>
                      <th className="p-2 border border-slate-300 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quoteGenerated.items.map((it: any, idx: number) => (
                      <tr key={idx} className="bg-white">
                        <td className="p-2 border border-slate-200 text-center">{idx + 1}</td>
                        <td className="p-2 border border-slate-200">
                          <span className="font-bold block">{it.name}</span>
                          <span className="text-[10px] font-mono text-slate-500">SKU: {it.sku}</span>
                        </td>
                        <td className="p-2 border border-slate-200 text-center font-bold">{it.qty} {it.unit}</td>
                        <td className="p-2 border border-slate-200 text-right">{formatIDR(it.price)}</td>
                        <td className="p-2 border border-slate-200 text-right font-bold">{formatIDR(it.subtotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-100 font-semibold">
                      <td colSpan={4} className="p-2 border border-slate-300 text-right">Subtotal Estimasi Pengadaan:</td>
                      <td className="p-2 border border-slate-300 text-right">{formatIDR(quoteGenerated.total_estimated_amount)}</td>
                    </tr>
                    <tr className="bg-slate-100 font-semibold">
                      <td colSpan={4} className="p-2 border border-slate-300 text-right">PPN 11% (Faktur Pajak):</td>
                      <td className="p-2 border border-slate-300 text-right">{formatIDR(quoteGenerated.ppn_amount)}</td>
                    </tr>
                    <tr className="bg-emerald-100/80 font-black text-emerald-950 text-sm">
                      <td colSpan={4} className="p-2.5 border border-slate-300 text-right">TOTAL ESTIMASI RAB (Termasuk PPN):</td>
                      <td className="p-2.5 border border-slate-300 text-right">{formatIDR(quoteGenerated.grand_total)}</td>
                    </tr>
                  </tfoot>
                </table>

                {/* Terms & Notes */}
                <div className="border-t border-slate-200 pt-3 text-[10px] text-slate-500 space-y-1">
                  <p>1. Harga sudah termasuk PPN 11% dan sertifikat garansi resmi suku cadang 1 tahun.</p>
                  <p>2. Sudah termasuk pengiriman, instalasi alat di bengkel/lab sekolah, dan bimbingan teknis untuk guru pengampu.</p>
                  <p>3. Penawaran ini berlaku 30 hari kalender sejak tanggal penerbitan.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition shadow"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak / Simpan PDF</span>
                </button>
                <button
                  onClick={() => {
                    setIsRABModalOpen(false);
                    setQuoteGenerated(null);
                    clearRAB();
                  }}
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition"
                >
                  <span>Selesai</span>
                </button>
              </div>
            </div>
          ) : rabItems.length === 0 ? (
            /* Empty State */
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Calculator className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800">Daftar Simulasi RAB Masih Kosong</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Silakan jelajahi katalog alat praktik SMK kami dan klik tombol <strong>"+ Ke RAB"</strong> pada alat-alat yang ingin dihitung estimasi anggarannya.
                </p>
              </div>
              <button
                onClick={() => setIsRABModalOpen(false)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition"
              >
                Buka Katalog Alat
              </button>
            </div>
          ) : (
            /* Form & Item List */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Items */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Daftar Alat Dipilih ({rabItems.length} Jenis)
                </h3>

                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {rabItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 hover:border-slate-300 transition"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-900 text-xs truncate" title={item.product.name}>
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] text-emerald-700 font-semibold block">
                            {formatIDR(item.product.price_estimate)} /{item.product.unit}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{item.product.sku}</span>
                        </div>
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() => updateRABQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-slate-500 hover:bg-slate-100 transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateRABQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-slate-500 hover:bg-slate-100 transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromRAB(item.product.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculation Summary Box */}
                <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2.5">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Subtotal Estimasi:</span>
                    <span className="font-bold text-white">{formatIDR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>PPN 11% (Faktur Pajak Resmi):</span>
                    <span className="font-bold text-emerald-400">{formatIDR(ppn)}</span>
                  </div>
                  <div className="border-t border-slate-700 pt-2 flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-200 uppercase">Total Estimasi RAB:</span>
                    <span className="text-base sm:text-lg font-black text-amber-400">{formatIDR(grandTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: School Information Form */}
              <div className="lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Data Sekolah Pemohon</h3>
                  <p className="text-xs text-slate-500">Untuk penerbitan draft penawaran & berkas RAB resmi</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Nama SMK / Instansi *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: SMKN 1 Tangerang"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Nama Kontak / Kepala Program *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Drs. Bambang Sutrisno"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">No. HP / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0812xxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Email Sekolah</label>
                      <input
                        type="email"
                        placeholder="smk@sekolah.sch.id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition shadow-md shadow-emerald-700/20"
                    >
                      <FileCheck2 className="w-4 h-4" />
                      <span>{isSubmitting ? 'Memproses...' : 'Terbitkan Draft RAB Resmi'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center leading-tight">
                    Faktur pajak PPN dan garansi resmi akan otomatis dilampirkan dalam penawaran resmi.
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
