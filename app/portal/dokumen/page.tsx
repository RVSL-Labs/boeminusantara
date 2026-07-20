import Link from "next/link";

export const metadata = { title: "Dokumen" };

/**
 * Tempat dokumen pengadaan. Mesinnya belum dibangun, jadi halaman ini jujur
 * mengatakan apa yang akan ada dan apa yang belum — bukan halaman kosong yang
 * membuat orang mengira sistemnya rusak.
 */
const RENCANA = [
  ["Surat Pesanan", "Terbit setelah harga disepakati"],
  ["Riwayat Negosiasi", "Rekaman tawar-menawar, siap dilampirkan ke berkas pengadaan"],
  ["Invoice", "Tagihan resmi ber-PPN"],
  ["Surat Jalan", "Menyertai barang saat dikirim"],
  ["Berita Acara Serah Terima", "Ditandatangani saat barang diterima"],
  ["Kwitansi", "Bukti pembayaran"],
  ["Surat Pernyataan PDN / Non-TKDN", "Untuk kelengkapan pengadaan"],
  ["Faktur Pajak", "Diunggah tim Boemi setelah terbit dari Coretax"],
];

export default function PortalDokumen() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">
          Dokumen
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-[var(--color-ink-soft)]">
          Seluruh dokumen pengadaan Anda akan tersedia di sini, tersusun per
          transaksi dan per tahun anggaran.
        </p>
      </header>

      <div className="rounded border border-[var(--color-line)] bg-[var(--color-paper)] p-5">
        <p className="text-sm text-[var(--color-ink-soft)]">
          Bagian ini sedang disiapkan. Dokumen yang akan tersedia:
        </p>
        <ul className="mt-4 space-y-2.5 text-sm">
          {RENCANA.map(([nama, ket]) => (
            <li key={nama} className="flex flex-col gap-0.5">
              <span className="font-medium text-[var(--color-ink)]">{nama}</span>
              <span className="text-xs text-[var(--color-mute)]">{ket}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs text-[var(--color-mute)]">
          Sementara ini, dokumen dikirim tim kami lewat email. Pertanyaan:{" "}
          <a
            href="mailto:info@boeminusantara.com"
            className="text-[var(--color-navy)] hover:underline"
          >
            info@boeminusantara.com
          </a>
        </p>
      </div>

      <Link href="/portal" className="inline-block text-sm text-[var(--color-navy)] hover:underline">
        ← Transaksi Saya
      </Link>
    </div>
  );
}
