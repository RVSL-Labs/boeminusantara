import "server-only";
import { getAdminSupabase } from "@/lib/admin/supabase-admin";
import { getCompanyProfile, nextDocNumber, profileSiap, type DocType } from "@/lib/admin/company";
import { listOffers, hargaBerlaku, negosiasiSelesai } from "@/lib/admin/negotiation";
import { terbilangRupiah } from "@/lib/terbilang";
import { PPN_RATE } from "@/lib/format";

/**
 * Penerbitan dokumen pengadaan.
 *
 * Seluruh isi surat dibekukan ke dalam `snapshot` saat terbit. Halaman cetak
 * membaca snapshot itu, BUKAN data terkini — supaya surat yang sama, diunduh
 * kapan pun, isinya persis sama. Ini syarat dokumen yang dipakai untuk
 * pertanggungjawaban anggaran.
 */

export type DocItem = {
  nama: string;
  qty: number;
  satuan: string;
  hargaSatuan: number;
  total: number;
};

export type DocSnapshot = {
  jenis: DocType;
  nomor: string;
  tanggal: string;
  tanggalNegosiasi: string | null;
  penerbit: {
    nama: string;
    npwp: string;
    alamat: string;
    kota: string;
    telepon: string;
    email: string;
    penandatangan: string;
    jabatan: string;
  };
  pembeli: {
    instansi: string;
    npwp: string;
    alamat: string;
    kota: string;
    telepon: string;
    email: string;
    pejabat: string;
    nip: string;
    jabatan: string;
    tahunAnggaran: number | null;
    sumberDana: string;
  };
  items: DocItem[];
  subtotal: number;
  ppnRate: number;
  ppn: number;
  pphRate: number;
  pph: number;
  total: number;
  terbilang: string;
  catatan: string | null;
  kodePermintaan: string;
};

export class DocumentError extends Error {}

/**
 * Terbitkan Surat Pesanan dari permintaan penawaran yang harganya SUDAH
 * disepakati. Menolak bila belum sepakat atau identitas penerbit belum lengkap —
 * surat resmi tidak boleh keluar dengan NPWP kosong.
 */
export async function issueSuratPesanan(params: {
  requestId: string;
  issuedBy: string;
  pphRate: number; // persen, 0 = tidak dikenakan
  catatan: string | null;
}): Promise<{ id: string; nomor: string }> {
  const sb = getAdminSupabase();
  if (!sb) throw new DocumentError("Database belum terhubung.");

  const penerbit = await getCompanyProfile();
  if (!profileSiap(penerbit))
    throw new DocumentError(
      "Identitas perusahaan belum lengkap. Isi di menu Identitas Perusahaan dulu.",
    );

  const { data: reqRow } = await sb
    .from("quote_requests")
    .select("id, code, user_id, customer_name, customer_email, customer_phone, institution")
    .eq("id", params.requestId)
    .maybeSingle();

  if (!reqRow) throw new DocumentError("Permintaan penawaran tidak ditemukan.");
  const req = reqRow as {
    id: string;
    code: string;
    user_id: string | null;
    customer_name: string;
    customer_email: string;
    customer_phone: string | null;
    institution: string | null;
  };

  const sudahAda = await sb
    .from("documents")
    .select("id, number")
    .eq("request_id", req.id)
    .eq("doc_type", "SP")
    .is("voided_at", null)
    .maybeSingle();

  if (sudahAda.data) {
    const d = sudahAda.data as { id: string; number: string };
    throw new DocumentError(
      `Surat pesanan untuk permintaan ini sudah terbit dengan nomor ${d.number}.`,
    );
  }

  const offers = await listOffers(req.id);
  if (negosiasiSelesai(offers) !== "agreed")
    throw new DocumentError(
      "Harga belum disepakati. Selesaikan negosiasi sebelum menerbitkan surat pesanan.",
    );

  const berlaku = hargaBerlaku(offers);
  if (!berlaku || berlaku.items.length === 0)
    throw new DocumentError("Tidak ada rincian harga yang bisa dipakai.");

  // Tanggal negosiasi = ronde terakhir yang memuat harga. Bidang ini ada di
  // surat pesanan contoh, jadi ikut dicantumkan.
  const tanggalNegosiasi = berlaku.createdAt;

  // Profil instansi pembeli, kalau dia sudah mengisinya di portal.
  let pembeliProfil: Record<string, string | number | null> = {};
  if (req.user_id) {
    const { data: bp } = await sb
      .from("buyer_profiles")
      .select("*")
      .eq("user_id", req.user_id)
      .maybeSingle();
    if (bp) pembeliProfil = bp as Record<string, string | number | null>;
  }

  const items: DocItem[] = berlaku.items.map((i) => ({
    nama: i.name,
    qty: i.qty,
    satuan: "Unit",
    hargaSatuan: i.unitPrice,
    total: i.subtotal,
  }));

  const subtotal = items.reduce((s, i) => s + i.total, 0);
  const ppnRate = PPN_RATE * 100;
  const ppn = Math.round(subtotal * PPN_RATE);
  const pphRate = Number.isFinite(params.pphRate) ? Math.max(0, params.pphRate) : 0;
  const pph = Math.round((subtotal * pphRate) / 100);
  const total = subtotal + ppn;

  const nomor = await nextDocNumber("SP");

  const snapshot: DocSnapshot = {
    jenis: "SP",
    nomor,
    tanggal: new Date().toISOString(),
    tanggalNegosiasi,
    penerbit: {
      nama: penerbit.nama,
      npwp: penerbit.npwp,
      alamat: penerbit.alamat,
      kota: penerbit.kota,
      telepon: penerbit.telepon,
      email: penerbit.email,
      penandatangan: penerbit.penandatangan,
      jabatan: penerbit.jabatan,
    },
    pembeli: {
      instansi:
        String(pembeliProfil.institution ?? "") || req.institution || req.customer_name,
      npwp: String(pembeliProfil.npwp ?? ""),
      alamat: String(pembeliProfil.address ?? ""),
      kota: String(pembeliProfil.city ?? ""),
      telepon: String(pembeliProfil.phone ?? "") || (req.customer_phone ?? ""),
      email: req.customer_email,
      pejabat: String(pembeliProfil.officer_name ?? "") || req.customer_name,
      nip: String(pembeliProfil.officer_nip ?? ""),
      jabatan: String(pembeliProfil.officer_role ?? ""),
      tahunAnggaran: pembeliProfil.budget_year ? Number(pembeliProfil.budget_year) : null,
      sumberDana: String(pembeliProfil.budget_source ?? ""),
    },
    items,
    subtotal,
    ppnRate,
    ppn,
    pphRate,
    pph,
    total,
    terbilang: terbilangRupiah(total),
    catatan: params.catatan,
    kodePermintaan: req.code,
  };

  const { data: docRow, error } = await sb
    .from("documents")
    .insert({
      doc_type: "SP",
      number: nomor,
      request_id: req.id,
      snapshot: snapshot as never,
      issued_by: params.issuedBy,
    })
    .select("id, number")
    .single();

  if (error) throw new DocumentError("Gagal menyimpan dokumen: " + error.message);

  // Permintaan ditandai sudah bersurat.
  await sb.from("quote_requests").update({ status: "quoted" }).eq("id", req.id);

  const d = docRow as { id: string; number: string };
  return { id: d.id, nomor: d.number };
}

export type StoredDocument = {
  id: string;
  docType: DocType;
  number: string;
  requestId: string | null;
  issuedBy: string | null;
  issuedAt: string;
  voidedAt: string | null;
  snapshot: DocSnapshot;
};

export async function getDocument(id: string): Promise<StoredDocument | null> {
  const sb = getAdminSupabase();
  if (!sb) return null;

  const { data, error } = await sb.from("documents").select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;

  const r = data as {
    id: string;
    doc_type: DocType;
    number: string;
    request_id: string | null;
    issued_by: string | null;
    issued_at: string;
    voided_at: string | null;
    snapshot: DocSnapshot;
  };

  return {
    id: r.id,
    docType: r.doc_type,
    number: r.number,
    requestId: r.request_id,
    issuedBy: r.issued_by,
    issuedAt: r.issued_at,
    voidedAt: r.voided_at,
    snapshot: r.snapshot,
  };
}

/** Dokumen milik satu permintaan penawaran. */
export async function listDocumentsForRequest(requestId: string): Promise<StoredDocument[]> {
  const sb = getAdminSupabase();
  if (!sb) return [];

  const { data, error } = await sb
    .from("documents")
    .select("*")
    .eq("request_id", requestId)
    .order("issued_at", { ascending: false });

  if (error || !data) return [];

  return (data as Record<string, unknown>[]).map((r) => ({
    id: String(r.id),
    docType: r.doc_type as DocType,
    number: String(r.number),
    requestId: r.request_id ? String(r.request_id) : null,
    issuedBy: r.issued_by ? String(r.issued_by) : null,
    issuedAt: String(r.issued_at),
    voidedAt: r.voided_at ? String(r.voided_at) : null,
    snapshot: r.snapshot as DocSnapshot,
  }));
}
