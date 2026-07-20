import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDocument } from "@/lib/admin/documents";
import { checkAdmin } from "@/lib/admin/auth";
import { getPortalUser, getMyQuote } from "@/lib/portal";
import { formatIDR } from "@/lib/format";
import { CetakButton } from "./CetakButton";

export const metadata: Metadata = {
  title: "Dokumen",
  robots: { index: false, follow: false },
};

const KLAUSUL = [
  "Penyedia berkewajiban menyediakan barang/jasa sesuai surat pesanan ini dan dalam jangka waktu yang berlaku.",
  "Penyedia berhak memintakan pembayaran sesuai total pembayaran setelah pekerjaan selesai, dibuktikan dengan Berita Acara Serah Terima.",
  "Pemesan berhak mendapatkan barang atau jasa sesuai surat pesanan ini.",
  "Pemesan berhak menolak barang/jasa yang tidak sesuai dengan surat pesanan.",
  "Pemesan berkewajiban menyelesaikan pembayaran sesuai mekanisme yang disepakati.",
  "Segala perselisihan yang timbul diselesaikan antara para pihak sesuai ketentuan yang berlaku.",
];

const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

function tanggalPanjang(iso: string): string {
  const d = new Date(iso);
  return `${HARI[d.getDay()]} ${d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;
}

const tanggalPendek = (iso: string) =>
  new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

/**
 * Halaman cetak dokumen. Isinya dibaca dari snapshot yang dibekukan saat
 * terbit — bukan dari data terkini — sehingga surat yang sama selalu tampil
 * sama, berapa lama pun setelah diterbitkan.
 *
 * Yang boleh membuka: admin Boemi, atau pemilik permintaan penawarannya.
 */
export default async function DokumenPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await getDocument(id);
  if (!doc) notFound();

  const gate = await checkAdmin();
  let boleh = gate.ok;

  if (!boleh && doc.requestId) {
    const user = await getPortalUser();
    if (user) boleh = (await getMyQuote(user, doc.requestId)) !== null;
  }

  // Bukan haknya → 404, bukan "dilarang".
  if (!boleh) notFound();

  const s = doc.snapshot;

  return (
    <div className="mx-auto max-w-[820px] bg-white px-6 py-8 text-[13px] leading-relaxed text-black print:px-0 print:py-0">
      <div className="mb-6 flex items-center justify-between gap-4 print:hidden">
        <a href="/admin/penawaran" className="text-sm text-[#12263f] hover:underline">
          ← Kembali
        </a>
        <CetakButton />
      </div>

      {doc.voidedAt && (
        <p className="mb-4 border border-red-600 bg-red-50 px-3 py-2 text-sm text-red-700">
          Dokumen ini dibatalkan pada {tanggalPendek(doc.voidedAt)}.
        </p>
      )}

      {/* Kop */}
      <header className="border-b-2 border-black pb-3">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-base font-bold uppercase tracking-wide">
              {s.penerbit.nama}
            </h1>
            <p className="mt-1 max-w-sm text-[12px]">{s.penerbit.alamat}</p>
            <p className="text-[12px]">
              {s.penerbit.telepon} · {s.penerbit.email}
            </p>
            <p className="text-[12px]">NPWP: {s.penerbit.npwp}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold uppercase">Surat Pesanan</p>
            <p className="text-[12px]">Nomor: {s.nomor}</p>
          </div>
        </div>
      </header>

      {/* Para pihak */}
      <section className="mt-5 grid grid-cols-2 gap-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-600">
            Kepada
          </p>
          <p className="mt-1 font-semibold">{s.pembeli.instansi}</p>
          {s.pembeli.alamat && <p className="text-[12px]">{s.pembeli.alamat}</p>}
          {s.pembeli.kota && <p className="text-[12px]">{s.pembeli.kota}</p>}
          {s.pembeli.npwp && <p className="text-[12px]">NPWP: {s.pembeli.npwp}</p>}
        </div>
        <div>
          <table className="w-full text-[12px]">
            <tbody>
              <tr>
                <td className="py-0.5 pr-2 text-neutral-600">Tanggal pesanan</td>
                <td className="py-0.5">{tanggalPendek(s.tanggal)}</td>
              </tr>
              {s.tanggalNegosiasi && (
                <tr>
                  <td className="py-0.5 pr-2 text-neutral-600">Tanggal negosiasi</td>
                  <td className="py-0.5">{tanggalPendek(s.tanggalNegosiasi)}</td>
                </tr>
              )}
              <tr>
                <td className="py-0.5 pr-2 text-neutral-600">No. permintaan</td>
                <td className="py-0.5">{s.kodePermintaan}</td>
              </tr>
              {s.pembeli.tahunAnggaran && (
                <tr>
                  <td className="py-0.5 pr-2 text-neutral-600">Tahun anggaran</td>
                  <td className="py-0.5">
                    {s.pembeli.tahunAnggaran}
                    {s.pembeli.sumberDana ? ` · ${s.pembeli.sumberDana}` : ""}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Rincian */}
      <section className="mt-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-600">
          Rincian Pekerjaan
        </p>
        <table className="w-full border-collapse text-[12px]">
          <thead>
            <tr className="border border-black bg-neutral-100">
              <th className="border border-black px-2 py-1.5 text-left font-semibold">No.</th>
              <th className="border border-black px-2 py-1.5 text-left font-semibold">
                Uraian Barang / Jasa
              </th>
              <th className="border border-black px-2 py-1.5 text-right font-semibold">
                Jumlah
              </th>
              <th className="border border-black px-2 py-1.5 text-left font-semibold">
                Satuan
              </th>
              <th className="border border-black px-2 py-1.5 text-right font-semibold">
                Harga Satuan
              </th>
              <th className="border border-black px-2 py-1.5 text-right font-semibold">
                Total Harga
              </th>
            </tr>
          </thead>
          <tbody>
            {s.items.map((it, i) => (
              <tr key={i}>
                <td className="border border-black px-2 py-1.5 align-top">{i + 1}</td>
                <td className="border border-black px-2 py-1.5">
                  {it.nama}
                  <div className="text-[11px] text-neutral-600">Barang Kena PPN</div>
                </td>
                <td className="border border-black px-2 py-1.5 text-right tabular-nums">
                  {it.qty}
                </td>
                <td className="border border-black px-2 py-1.5">{it.satuan}</td>
                <td className="border border-black px-2 py-1.5 text-right tabular-nums">
                  {formatIDR(it.hargaSatuan)}
                </td>
                <td className="border border-black px-2 py-1.5 text-right tabular-nums">
                  {formatIDR(it.total)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className="border border-black px-2 py-1.5 text-right">
                Total sebelum PPN
              </td>
              <td className="border border-black px-2 py-1.5 text-right tabular-nums">
                {formatIDR(s.subtotal)}
              </td>
            </tr>
            <tr>
              <td colSpan={5} className="border border-black px-2 py-1.5 text-right">
                PPN {s.ppnRate}%
              </td>
              <td className="border border-black px-2 py-1.5 text-right tabular-nums">
                {formatIDR(s.ppn)}
              </td>
            </tr>
            <tr>
              <td colSpan={5} className="border border-black px-2 py-1.5 text-right font-semibold">
                Total Pembayaran
              </td>
              <td className="border border-black px-2 py-1.5 text-right font-semibold tabular-nums">
                {formatIDR(s.total)}
              </td>
            </tr>
            {s.pph > 0 && (
              <tr>
                <td colSpan={5} className="border border-black px-2 py-1.5 text-right">
                  PPh {s.pphRate}%
                </td>
                <td className="border border-black px-2 py-1.5 text-right tabular-nums">
                  {formatIDR(s.pph)}
                </td>
              </tr>
            )}
          </tfoot>
        </table>

        <p className="mt-2 text-[12px]">
          <span className="font-semibold">Terbilang: </span>
          {s.terbilang}
        </p>
      </section>

      {s.catatan && (
        <section className="mt-4 text-[12px]">
          <span className="font-semibold">Catatan: </span>
          {s.catatan}
        </section>
      )}

      {/* Klausul */}
      <section className="mt-5">
        <p className="text-[12px] font-semibold">Ketentuan</p>
        <ol className="mt-1 list-decimal space-y-0.5 pl-5 text-[11.5px]">
          {KLAUSUL.map((k, i) => (
            <li key={i}>{k}</li>
          ))}
        </ol>
      </section>

      {/* Tanda tangan — sengaja dikosongkan untuk dicetak & ditandatangani basah */}
      <section className="mt-8">
        <p className="text-right text-[12px]">
          {s.penerbit.kota}, {tanggalPanjang(s.tanggal)}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-8 text-[12px]">
          <div>
            <p>Penyedia,</p>
            <div className="h-20" />
            <p className="font-semibold underline underline-offset-4">
              {s.penerbit.penandatangan}
            </p>
            <p>{s.penerbit.jabatan}</p>
            <p>{s.penerbit.nama}</p>
          </div>
          <div>
            <p>Pemesan,</p>
            <div className="h-20" />
            <p className="font-semibold underline underline-offset-4">
              {s.pembeli.pejabat}
            </p>
            {s.pembeli.jabatan && <p>{s.pembeli.jabatan}</p>}
            {s.pembeli.nip && <p>NIP: {s.pembeli.nip}</p>}
          </div>
        </div>
      </section>

      <footer className="mt-8 border-t border-neutral-300 pt-2 text-[10px] text-neutral-500">
        Diterbitkan melalui boeminusantara.com pada {tanggalPendek(doc.issuedAt)}.
        Dokumen ini dibekukan saat terbit dan tidak berubah.
      </footer>
    </div>
  );
}
