import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Klien Supabase untuk operasi ADMIN (server-only).
 *
 * - Kalau `SUPABASE_SERVICE_ROLE_KEY` tersedia → pakai service role (bypass RLS)
 *   supaya admin bisa tulis produk/stok. Key ini WAJIB server-only, jangan
 *   pernah bocor ke client bundle.
 * - Kalau tidak ada service role tapi anon key ada → jatuh ke anon (read jalan,
 *   write mungkin ditolak RLS — itu wajar, tinggal set service role nanti).
 * - Kalau env kosong sama sekali → null → data layer jatuh ke SEED_PRODUCTS
 *   (mode "preview / belum terhubung DB").
 */
let cached: SupabaseClient | null | undefined;

export function getAdminSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const key = serviceKey || anonKey;

  cached =
    url && key
      ? createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
        })
      : null;
  return cached;
}

/** True kalau ada koneksi DB apa pun (service role atau anon). */
export const isAdminDbConnected = () =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  );

/** True kalau bisa TULIS aman (punya service role). Dipakai untuk peringatan UI. */
export const hasServiceRole = () =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
