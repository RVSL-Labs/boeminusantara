# 📘 Model Bisnis & Arsitektur Fitur Lengkap: PT. Boemi Nusantara Kaya Berkah (`boeminusantara.com`)

Dokumen ini membedah secara komprehensif seluruh model bisnis, target pasar, alur pendapatan (*revenue streams*), kepatuhan pengadaan pemerintah (B2G/B2B), serta seluruh modul dan fitur teknis yang terdapat pada website dan sistem **Boemi Nusantara**.

---

## 1. Ringkasan Eksekutif & Identitas Bisnis

* **Nama Perusahaan**: PT. Boemi Nusantara Kaya Berkah
* **Domain / Platform**: `www.boeminusantara.com`
* **Model Model**: **Single-Vendor B2B & B2G Vertical E-Commerce + Internal ERP/CRM**
* **Spesialisasi**: Penyedia Alat & Perlengkapan Praktik Sekolah Menengah Kejuruan (SMK), Laboratorium Vokasi, dan Pelatihan Kompetensi Guru Terstandar Nasional.
* **Status Legalitas & Pajak**: 
  * Badan Hukum PT Resmi (Pengesahan Kemenkumham RI).
  * Nomor Induk Berusaha (NIB) terdaftar OSS RBA.
  * Berstatus **Pengusaha Kena Pajak (PKP)** resmi yang berhak menerbitkan **Faktur Pajak PPN**.
  * Terdaftar sebagai rekanan pengadaan barang/jasa pendidikan (siap SPJ dana BOS, DAK Fisik SMK, dan APBD/Yayasan).

---

## 2. Model Bisnis & Alur Monetisasi (Revenue Streams)

Berbeda dari e-commerce retail konsumen biasa (B2C), Boemi Nusantara beroperasi pada ceruk pasar **B2B & B2G Vokasi** dengan siklus transaksi bernilai tinggi (*high-ticket transactions*):

```
                       ┌─────────────────────────────────────────────────────────┐
                       │          SUMBER DANA SEKOLAH / KLIEN                    │
                       │  • Dana BOS Kinerja & Reguler   • Dana Yayasan Swasta   │
                       │  • DAK Fisik SMK (Kemendikbud)  • APBD Dinas Pendidikan │
                       └────────────────────────────┬────────────────────────────┘
                                                    │
                                                    ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        PLATFORM BOEMI NUSANTARA (E-COMMERCE)                           │
│  1. Etalase Produk BSKAP 2026 (TKRO, TITL, TOI, TAV, TSM, TP, K3)                      │
│  2. Pengajuan Draft SPH (Surat Penawaran Harga) & Negosiasi Online                     │
│  3. Transaksi Resmi: Checkout Online (Xendit) / Purchase Order (PO) Invoice             │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                     DELIVERY & NILAI TAMBAH (VALUE ADDED SERVICE)                      │
│  • Pengiriman In-House Aman se-Indonesia                                               │
│  • Instalasi & Kalibrasi Langsung di Bengkel Sekolah                                   │
│  • Pelatihan ToT Guru Kejuruan & Teknisi Lab                                           │
│  • Dokumen Administrasi Lengkap: SPH, Kontrak/SPK, BAST, & Faktur Pajak PPN            │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 4 Pilar Pendapatan Utama:
1. **Direct Margin Penjualan Alat Praktik**: Margin keuntungan dari penjualan alat manufaktur, trainer otomotif, kit mekatronika, oven bakery industri, studio multimedia, dan peralatan bengkel.
2. **Paket Pengadaan Laboratorium Lengkap (Turnkey Lab Solution)**: Pengadaan satu ruangan lab/bengkel utuh (misal: *Smart Factory Lab*, *Studio Podcast Broadcast 4K*, atau *Bengkel Otomotif EFI Standar Industri*).
3. **Bundling Layanan Pelatihan (ToT) & Jasa Kalibrasi**: Program *Transfer of Technology* untuk guru pengampu kejuruan pasca-instalasi alat.
4. **Maintenance Contract & Suku Cadang Purna Jual**: Penyediaan sparepart pengganti dan kontrak servis berkala laboratorium sekolah.

---

## 3. Target Pasar (Audience Segments)

1. **SMK Negeri & Swasta se-Indonesia**: Kepala Sekolah, Wakil Kepala Sekolah Bidang Sarana & Prasarana (Waka Sarpras), dan Kepala Program Keahlian (Kaprog) / Guru Produktif.
2. **Dinas Pendidikan Provinsi / Kabupaten / Kota**: Pengadaan paket alat vokasi melalui alokasi DAK Fisik Pendidikan Kejuruan.
3. **Balai Latihan Kerja (BLK / BBPVP)**: Balai pelatihan kerja di bawah Kemnaker yang membutuhkan simulator industri nyata.
4. **Perguruan Tinggi Vokasi & Politeknik**: Laboratorium teknik mesin, elektro, mekatronika, dan multimedia.
5. **Dunia Usaha & Industri (DUDI)**: Training center internal perusahaan manufaktur.

---

## 4. Bedah Lengkap Fitur Berdasarkan 4 Layer Sistem

Arsitektur aplikasi Boemi Nusantara dibagi menjadi **4 Layer Utama**:

---

### LAYER 1: Storefront Publik (`/` dan `/kategori/...`)

Etalase toko dengan desain **Monochrome Minimalist** yang responsif di smartphone dan desktop:

* **Katalog Berbasis Standar Kurikulum BSKAP 2026**:
  * `TKRO` — Teknik Kendaraan Ringan Otomotif (Engine Stand EFI, Diagnostic Scanner, Tyre Changer, Car Lift, Wheel Balancer).
  * `TITL` — Teknik Instalasi Tenaga Listrik (Panel Motor 3 Phase, VFD Inverter Trainer, Wiring Panel Stand).
  * `TOI` — Teknik Otomasi Industri / Mekatronika (Modular PLC Smart Factory, Sensor Application Kit, Traffic Light PLC).
  * `TAV` — Teknik Audio Video (AM/FM Transceiver Trainer, Analog/Digital Circuit Lab).
  * `TSM` — Teknik Sepeda Motor (Motorcycle Injection Trainer, Chassis Dynamometer, Tools Set).
  * `TP` — Teknik Pemesinan & Fabrikasi (Mesin Bubut Presisi DRO 2-Axis, Mesin Milling, Multi-Process Welder MIG/TIG).
  * `K3` — Keselamatan & Kesehatan Kerja (Safety Lab PPE, Eye Washer, Lemari Bahan Kimia B3).
* **Pencarian Real-Time & Filter Jurusan**: Pencarian cerdas berdasarkan nama alat, SKU, dan kompetensi kejuruan.
* **Transparansi Harga & Kepatuhan Pajak**:
  * Label harga jelas (*Termasuk PPN / Exclude PPN*).
  * Label *Satu Indonesia Free Ongkir* untuk pengiriman in-house.
* **Alur Negosiasi & Request for Quotation (RFQ)**:
  * Sekolah bisa mengajukan penawaran harga khusus (*Bargaining / Request Discount*) untuk pengadaan jumlah banyak.
* **Keranjang Belanja & Checkout Multi-Channel**:
  * Mendukung pembayaran instan via Payment Gateway **Xendit** (Virtual Account, Kartu Kredit, QRIS) atau opsi **Invoice / Purchase Order Sekolah**.
  * Input data instansi, NPSN, dan NPWP Sekolah untuk penerbitan faktur pajak.
* **Halaman Edukasi, Wawasan & Magang**:
  * `/edukasi`: Artikel wawasan sarpras vokasi, standar Teaching Factory (TeFa), dan kurikulum industri.
  * `/magang` & `/pelatihan`: Pendaftaran program magang siswa dan pelatihan sertifikasi guru.
  * `/pengaduan`: Saluran pengaduan purna jual, klaim garansi alat, dan permohonan kunjungan teknisi.

---

### LAYER 2: Portal Klien Sekolah (`/portal`)

Dashboard khusus sekolah/instansi yang sudah terdaftar untuk mengelola seluruh riwayat pengadaan mereka:

* **Ringkasan Aktivitas Sekolah (`/portal`)**: Menampilkan status pesanan aktif, dokumen yang siap diunduh, dan tiket layanan purna jual.
* **Riwayat Transaksi & PO (`/portal/transaksi`)**: Melacak status pesanan dari draft, diverifikasi, diproses pabrikasi, dikirim, hingga selesai.
* **Pusat Arsip Dokumen SPJ (`/portal/dokumen`)**: Tempat sekolah mengunduh berkas administrasi resmi:
  * Surat Penawaran Harga (SPH).
  * Surat Perjanjian Kerja (SPK / Kontrak Pengadaan).
  * Berita Acara Serah Terima (BAST).
  * Faktur Pajak Resmi PPN & Kwitansi Bermaterai.
* **Pelacakan Pengiriman Alat (`/portal/pengiriman`)**: Tracking posisi ekspedisi armada in-house dan konfirmasi serah terima fisik barang di sekolah.
* **Manajemen Aset Laboratorium Sekolah (`/portal/aset`)**: Fitur pencatatan inventaris otomatis untuk seluruh alat yang dibeli dari Boemi Nusantara lengkap dengan nomor seri, masa garansi, dan jadwal servis.
* **Profil Instansi & NPWP (`/portal/profil`)**: Pengaturan data sekolah, NPSN, NPWP, dan kontak penanggung jawab Sarpras.

---

### LAYER 3: Admin Portal & ERP Operasional (`/admin`)

Pusat kendali internal pengelola PT. Boemi Nusantara dengan sistem keamanan **Fail-Closed Dual-Layer Guard** (Role-Based Access Control):

* **Executive Dashboard (`/admin`)**:
  * Metrik pendapatan total (Gross Merchandise Value).
  * Jumlah pesanan baru, penawaran pending, dan komplain aktif.
  * Quick alert stok alat yang menipis di gudang.
* **Manajemen Produk & Katalog (`/admin/produk`)**:
  * Tambah/edit data alat praktik, SKU, spesifikasi teknis, sertifikasi standar (BNSP/Industri), dan multi-foto produk.
* **Kelola Pesanan & Faktur (`/admin/pesanan` & `/admin/transaksi`)**:
  * Verifikasi pembayaran masuk, persetujuan PO sekolah, dan penerbitan nomor invoice.
* **Manajemen Negosiasi & Penawaran (`/admin/penawaran`)**:
  * Meninjau permintaan diskon dari sekolah, menyetujui harga deal, dan otomatis men-generate dokumen SPH resmi.
* **Manajemen Stok & Gudang (`/admin/stok`)**:
  * Pencatatan persediaan stok alat, mutasi barang masuk/keluar, dan monitoring barang inden/impor.
* **CRM Data Pelanggan (`/admin/pelanggan`)**:
  * Database kontak kepala sekolah, guru kejuruan, dan pejabat pengadaan se-Indonesia.
* **Pusat Komplain & Layanan Garansi (`/admin/komplain`)**:
  * Penanganan tiket klaim kerusakan alat, penugasan teknisi lapangan, dan riwayat pergantian suku cadang.
* **CMS Website (`/admin/banner`, `/admin/artikel`, `/admin/halaman`)**:
  * Pengaturan banner promo, publikasi artikel edukasi, dan penyesuaian profil perusahaan.
* **Kelola Pengguna Staf (`/admin/pengguna` & `/admin/pemilik`)**:
  * Manajemen hak akses staf operasional (Sales, Admin Gudang, Keuangan, Manajer).

---

### LAYER 4: Generator Dokumen Administrasi Otomatis (`/dokumen`)

Keunggulan terbesar sistem ini yang menghilangkan beban birokrasi manual:

* **Otomasi SPH (Surat Penawaran Harga)**: Template resmi berkop surat PT. Boemi Nusantara Kaya Berkah, nomor surat otomatis, tabel spesifikasi alat, dan kalkulasi PPN 11%/12%.
* **Otomasi BAST (Berita Acara Serah Terima)**: Format standar penerimaan barang untuk pelaporan dana pemerintah (BOS/DAK).
* **Format Print / PDF Siap Cetak**: Seluruh dokumen telah dilengkapi *print-stylesheet* rapi yang siap dicetak ke kertas A4 berkop atau di-export ke format PDF.

---

## 5. Keunggulan Kompetitif (Competitive Moat)

Mengapa sekolah dan dinas pendidikan memilih bertransaksi melalui Boemi Nusantara dibanding marketplace umum:

| Aspek | Marketplace Umum (Tokopedia/Shopee) | E-Katalog Pemerintah Umum | **Boemi Nusantara** |
|---|---|---|---|
| **Fokus Produk** | Barang retail umum, jarang ada alat lab spesifik | Campuran semua komoditas pemerintah | **100% Khusus Vokasi SMK & Standar BSKAP 2026** |
| **Administrasi Pajak** | Kerap tidak menyediakan faktur pajak resmi | Ada, namun birokrasi lambat | **Faktur Pajak PPN Resmi & SPJ Siap Pakai** |
| **Instalasi & Demo** | Hanya kirim barang lewat kurir umum | Tergantung penyedia pihak ketiga | **Instalasi Langsung oleh Teknisi Ahli di Sekolah** |
| **Pelatihan Guru** | Tidak ada | Jarang disediakan | **Termasuk Program Pelatihan ToT Guru & Modul Ajar** |
| **Konsultasi RAB** | Tidak ada | Tidak melayani konsultasi penyusunan | **Gratis Pendampingan Penyusunan Spek & RAB Sekolah** |

---

## 6. Struktur Arsitektur & Teknologi (Tech Stack)

* **Frontend Framework**: Next.js 15 (App Router, Server-Side Rendering, React 19)
* **Styling**: Tailwind CSS (Monochrome Minimalist Design System)
* **Database & Auth**: Supabase (PostgreSQL, Row Level Security / RLS, Supabase SSR Auth)
* **Payment Gateway**: Xendit (Virtual Account, Credit Card, QRIS, e-Wallet)
* **Email & Notifikasi**: Resend / Nodemailer (Notifikasi PO & Penawaran Masuk)
* **Hosting Deployment**: Vercel / Cloudflare DNS (Serverless Architecture)
