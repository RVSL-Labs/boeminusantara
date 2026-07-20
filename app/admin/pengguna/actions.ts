"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addStaff, removeStaff } from "@/lib/admin/staff";
import { checkAdmin } from "@/lib/admin/auth";

export type StaffFormState = { ok: boolean; error?: string; success?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function requireAdmin() {
  const gate = await checkAdmin();
  if (!gate.ok) redirect("/masuk?next=/admin/pengguna");
  return gate;
}

export async function addStaffAction(
  _prev: StaffFormState,
  formData: FormData,
): Promise<StaffFormState> {
  const gate = await requireAdmin();

  const email = String(formData.get("email") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();

  if (!EMAIL_RE.test(email)) return { ok: false, error: "Email tidak valid." };
  if (!name) return { ok: false, error: "Nama wajib diisi." };

  try {
    await addStaff({ email, name, addedBy: gate.ok ? gate.email : "" });
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Gagal menambah admin." };
  }

  revalidatePath("/admin/pengguna");
  return {
    ok: true,
    success: `${name} ditambahkan. Minta yang bersangkutan mendaftar di /daftar memakai email ${email}.`,
  };
}

export async function removeStaffAction(formData: FormData): Promise<void> {
  const gate = await requireAdmin();

  const email = String(formData.get("email") ?? "").trim();
  if (!email) return;

  // Jangan biarkan admin mencabut akses dirinya sendiri lalu terkunci di luar.
  if (gate.ok && email.toLowerCase() === gate.email.toLowerCase()) return;

  await removeStaff(email);
  revalidatePath("/admin/pengguna");
}
