import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Send, 
  Building2, 
  PhoneCall, 
  GraduationCap, 
  CheckCircle2, 
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

export const InquiryForm: React.FC = () => {
  const { isInquiryModalOpen, setIsInquiryModalOpen, submitInquiry } = useApp();

  const [schoolName, setSchoolName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [roleTitle, setRoleTitle] = useState('Kepala Program Keahlian');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cityProvince, setCityProvince] = useState('');
  const [budgetRange, setBudgetRange] = useState('Rp 50 Juta – Rp 100 Juta');
  const [selectedJurusan, setSelectedJurusan] = useState<string[]>(['Teknik Kendaraan Ringan (TKR)']);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isInquiryModalOpen) return null;

  const jurusanOptions = [
    'Teknik Kendaraan Ringan (TKR) / Otomotif',
    'Teknik Bisnis Sepeda Motor (TBSM)',
    'Teknik Listrik & Mekatronika',
    'Broadcasting, Multimedia & DKV',
    'Tata Boga & Kuliner Perhotelan',
    'Teknik Pemesinan & Pengelasan (Welding)',
    'Program Pelatihan Guru / Workshop'
  ];

  const toggleJurusan = (j: string) => {
    if (selectedJurusan.includes(j)) {
      setSelectedJurusan(selectedJurusan.filter(item => item !== j));
    } else {
      setSelectedJurusan([...selectedJurusan, j]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolName || !contactPerson || !phone || !message) {
      alert('Mohon isi field bertanda bintang (*) dengan lengkap');
      return;
    }

    setIsSubmitting(true);
    try {
      const ok = await submitInquiry({
        school_name: schoolName,
        contact_person: contactPerson,
        role_title: roleTitle,
        phone_number: phone,
        email,
        city_province: cityProvince,
        jurusan_target: selectedJurusan,
        message,
        budget_range: budgetRange
      });
      if (ok) {
        setIsInquiryModalOpen(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Formulir Konsultasi & Pengadaan Alat SMK</h2>
              <p className="text-xs text-slate-500">Dapatkan pendampingan teknis dan proposal penawaran resmi ber-PPN</p>
            </div>
          </div>

          <button
            onClick={() => setIsInquiryModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 text-xs">
          {/* Trust Banner inside form */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-950">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Layanan konsultasi, survei kebutuhan laboratorium sekolah, dan asistensi penyusunan RAB diberikan <strong>secara gratis (tanpa biaya)</strong> oleh tim PT. Boemi Nusantara.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Nama SMK / Sekolah / Instansi *</label>
              <input
                type="text"
                required
                placeholder="Contoh: SMKN 1 Cipondoh Tangerang"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Nama Kontak / Penanggung Jawab *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Bpk. Ahmad Wahyudi, S.Pd"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Jabatan / Posisi</label>
              <select
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
              >
                <option value="Kepala Sekolah">Kepala Sekolah</option>
                <option value="Wakil Kepala Sekolah Bidang Sarpras">Waka Sarpras</option>
                <option value="Kepala Program Keahlian">Kepala Program Keahlian / Jurusan</option>
                <option value="Guru Kejuruan / Teknisi Lab">Guru Kejuruan / Teknisi Lab</option>
                <option value="Yayasan / Komite Sekolah">Yayasan / Komite Sekolah</option>
                <option value="Dinas Pendidikan / Instansi Terkait">Dinas Pendidikan / Instansi Terkait</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">No. WhatsApp / HP Aktif *</label>
              <input
                type="tel"
                required
                placeholder="0812xxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Email Sekolah / Pribadi</label>
              <input
                type="email"
                placeholder="smk@sekolah.sch.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Kota / Kabupaten & Provinsi</label>
              <input
                type="text"
                placeholder="Contoh: Tangerang, Banten"
                value={cityProvince}
                onChange={(e) => setCityProvince(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
              />
            </div>
          </div>

          {/* Jurusan Selection */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-700 block">Jurusan Target Kebutuhan Pengadaan:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {jurusanOptions.map((j, idx) => {
                const isSelected = selectedJurusan.includes(j);
                return (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => toggleJurusan(j)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${
                      isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected ? '✓' : ''}
                    </div>
                    <span>{j}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Perkiraan Alokasi Anggaran (BOS / DAK / Yayasan)</label>
            <select
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
            >
              <option value="Di bawah Rp 50 Juta">Di bawah Rp 50 Juta</option>
              <option value="Rp 50 Juta – Rp 100 Juta">Rp 50 Juta – Rp 100 Juta</option>
              <option value="Rp 100 Juta – Rp 250 Juta">Rp 100 Juta – Rp 250 Juta</option>
              <option value="Rp 250 Juta – Rp 500 Juta">Rp 250 Juta – Rp 500 Juta</option>
              <option value="Di atas Rp 500 Juta (Paket Lengkap Lab/Workshop)">Di atas Rp 500 Juta (Paket Lengkap Lab/Workshop)</option>
            </select>
          </div>

          {/* Message / Description */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Rincian Kebutuhan & Catatan Khusus *</label>
            <textarea
              required
              rows={3}
              placeholder="Contoh: Kami membutuhkan trainer motor EFI untuk 2 kelas dan pelatihan untuk 2 orang guru kejuruan. Mohon dikirimkan proposal penawaran resmi beserta jadwal presentasi demo alat."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsInquiryModalOpen(false)}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-md shadow-emerald-700/20"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Mengirim Data...' : 'Kirim Permintaan Konsultasi'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
