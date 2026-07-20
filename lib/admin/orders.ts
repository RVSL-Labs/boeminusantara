import "server-only";
import { getAdminSupabase } from "@/lib/admin/supabase-admin";

/** Ringkasan pesanan untuk tabel admin. */
export type OrderSummary = {
  id: string;
  code: string;
  status: string;
  total: number;
  createdAt: string;
  buyerName: string;
  buyerInstitution: string | null;
  itemCount: number;
};

export async function listOrders(limit = 100): Promise<OrderSummary[]> {
  const sb = getAdminSupabase();
  if (!sb) return [];

  const { data, error } = await sb
    .from("orders")
    .select("id, code, status, total, created_at, address, order_items(count)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  return (
    data as {
      id: string;
      code: string;
      status: string;
      total: number;
      created_at: string;
      address: { name?: string; institution?: string } | null;
      order_items: { count: number }[] | null;
    }[]
  ).map((o) => ({
    id: o.id,
    code: o.code,
    status: o.status,
    total: o.total,
    createdAt: o.created_at,
    buyerName: o.address?.name ?? "—",
    buyerInstitution: o.address?.institution ?? null,
    itemCount: o.order_items?.[0]?.count ?? 0,
  }));
}
