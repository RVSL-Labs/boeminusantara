"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { approveQuote, setQuoteStatus } from "@/lib/admin/quotes";
import { checkAdmin } from "@/lib/admin/auth";
import { addOffer, NegotiationError } from "@/lib/admin/negotiation";
import { listRequestItems } from "@/lib/admin/quotes";

/**
 * Server Action bisa dipanggil langsung lewat HTTP — jadi tiap action
 * memeriksa admin sendiri, tidak menumpang pagar layout.
 */
async function requireAdmin() {
  const gate = await checkAdmin();
  if (!gate.ok) redirect("/masuk?next=/admin/penawaran");
}


export type ApproveState = {
  ok: boolean;
  error?: string;
  preview?: boolean;
  fieldErrors?: Record<string, string>;
};

/**
 * Server Action: ACC permintaan + terbitkan surat. Setelah sukses, redirect
 * ke halaman surat. `requestId` di-bind di page.
 */
export async function approveQuoteAction(
  requestId: string,
  _prev: ApproveState,
  formData: FormData,
): Promise<ApproveState> {
  await requireAdmin();
  const discountRaw = String(formData.get("discount") ?? "").trim();
  const ppnEnabled = formData.get("ppnEnabled") === "on";
  const validUntil = String(formData.get("validUntil") ?? "").trim();
  const terms = String(formData.get("terms") ?? "").trim();
  const approvedBy = String(formData.get("approvedBy") ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  let discount = 0;
  if (discountRaw !== "") {
    discount = Number(discountRaw);
    if (Number.isNaN(discount) || discount < 0) {
      fieldErrors.discount = "Diskon harus angka ≥ 0.";
    }
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  const res = await approveQuote(requestId, {
    discount: Math.round(discount),
    ppnEnabled,
    validUntil: validUntil || null,
    terms: terms || null,
    approvedBy: approvedBy || null,
  });

  if (!res.ok) {
    if (res.error === "no_db") {
      return {
        ok: false,
        preview: true,
        error:
          "Mode preview — belum terhubung database. Surat tidak dapat diterbitkan.",
      };
    }
    return { ok: false, error: `Gagal menerbitkan surat: ${res.error}` };
  }

  revalidatePath("/admin/penawaran");
  revalidatePath(`/admin/penawaran/${requestId}`);
  redirect(`/admin/penawaran/${requestId}/surat`);
}

/** Server Action: tandai status (reviewed/rejected). Dipakai form kecil. */
export async function setStatusAction(
  requestId: string,
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  const status = String(formData.get("status") ?? "").trim();
  if (
    status === "reviewed" ||
    status === "rejected" ||
    status === "pending"
  ) {
    await setQuoteStatus(requestId, status);
    revalidatePath("/admin/penawaran");
    revalidatePath(`/admin/penawaran/${requestId}`);
  }
}

/* ============ NEGOSIASI HARGA ============ */

export type NegotiationState = { ok: boolean; error?: string };

/**
 * Server Action: kirim harga tandingan, terima harga pembeli, atau tolak.
 * `requestId` di-bind di page.
 *
 * Harga diambil dari kolom isian per barang (`harga_<id>`), lalu dicocokkan
 * dengan daftar barang milik permintaan ini — id yang tidak dikenal diabaikan,
 * sehingga kiriman yang diutak-atik tidak bisa menyusupkan barang lain.
 */
export async function negotiateAction(
  requestId: string,
  _prev: NegotiationState,
  formData: FormData,
): Promise<NegotiationState> {
  const gate = await checkAdmin();
  if (!gate.ok) redirect(`/masuk?next=/admin/penawaran/${requestId}`);

  const tindakan = String(formData.get("tindakan") ?? "");
  const catatan = String(formData.get("catatan") ?? "").trim() || null;

  if (!["counter", "accept", "reject"].includes(tindakan))
    return { ok: false, error: "Tindakan tidak dikenal." };

  const daftar = await listRequestItems(requestId);
  if (daftar.length === 0)
    return { ok: false, error: "Permintaan ini tidak punya rincian barang." };

  let items: { requestItemId: string; qty: number; unitPrice: number }[] = [];

  if (tindakan === "counter") {
    items = daftar.map((d) => {
      const raw = String(formData.get(`harga_${d.id}`) ?? "").trim();
      return {
        requestItemId: d.id,
        qty: d.qty,
        unitPrice: Math.max(0, Math.round(Number(raw) || 0)),
      };
    });
    if (items.some((i) => i.unitPrice <= 0))
      return { ok: false, error: "Semua harga harus diisi dengan angka di atas nol." };
  }

  try {
    await addOffer({
      requestId,
      actor: "seller",
      kind: tindakan as "counter" | "accept" | "reject",
      note: catatan,
      createdBy: gate.email,
      items: tindakan === "counter" ? items : undefined,
    });
  } catch (e) {
    if (e instanceof NegotiationError) return { ok: false, error: e.message };
    return { ok: false, error: "Gagal menyimpan balasan. Coba lagi." };
  }

  revalidatePath(`/admin/penawaran/${requestId}`);
  revalidatePath("/admin/penawaran");
  return { ok: true };
}
