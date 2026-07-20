"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { approveQuote, setQuoteStatus } from "@/lib/admin/quotes";
import { checkAdmin } from "@/lib/admin/auth";

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
