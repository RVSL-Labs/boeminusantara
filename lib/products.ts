import "server-only";
import type { Product } from "@/lib/types";

// FE tidak menyentuh DB langsung — semua data lewat backend sub-server (boemi-api).
// Dev: http://localhost:4700 · Prod: di-proxy nginx ke /api (set BOEMI_API_URL).
const API = process.env.BOEMI_API_URL || "http://localhost:4700";

export type SortKey = "name" | "price_asc" | "price_desc";

export type ProductQuery = {
  category?: string;
  search?: string;
  sort?: SortKey;
  /** Halaman 1-based. */
  page?: number;
  /** Item per halaman. Default 24. */
  pageSize?: number;
};

export type ProductResult = { products: Product[]; total: number };

export const DEFAULT_PAGE_SIZE = 24;

/**
 * Ambil katalog dengan sort + paginasi (SSR-friendly via query param).
 * Resilient: bila API error → { products: [], total: 0 }.
 */
export async function getProducts(q: ProductQuery = {}): Promise<ProductResult> {
  const pageSize = q.pageSize && q.pageSize > 0 ? q.pageSize : DEFAULT_PAGE_SIZE;
  const page = q.page && q.page > 0 ? q.page : 1;
  const offset = (page - 1) * pageSize;

  const qs = new URLSearchParams();
  if (q.category) qs.set("category", q.category);
  if (q.search) qs.set("search", q.search);
  if (q.sort) qs.set("sort", q.sort);
  qs.set("limit", String(pageSize));
  qs.set("offset", String(offset));

  try {
    const res = await fetch(`${API}/products?${qs.toString()}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return { products: [], total: 0 };
    const data = (await res.json()) as { products: Product[]; total?: number };
    const products = data.products ?? [];
    return { products, total: data.total ?? products.length };
  } catch {
    return { products: [], total: 0 };
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API}/products/${encodeURIComponent(slug)}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { product: Product };
    return data.product ?? null;
  } catch {
    return null;
  }
}
