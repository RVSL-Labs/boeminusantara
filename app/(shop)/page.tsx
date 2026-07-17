import CategoryNav from "@/components/CategoryNav";
import ProductGrid from "@/components/ProductGrid";
import ProductToolbar from "@/components/ProductToolbar";
import Pagination from "@/components/Pagination";
import {
  getProducts,
  DEFAULT_PAGE_SIZE,
  type SortKey,
} from "@/lib/products";

function parseSort(v?: string): SortKey {
  return v === "price_asc" || v === "price_desc" ? v : "name";
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const sort = parseSort(sp.sort);
  const page = Math.max(1, Number(sp.page) || 1);
  const { products, total } = await getProducts({ sort, page });

  return (
    <>
      {/* Hero tipis, teks-first, dengan motif pita Merah-Putih halus */}
      <section className="relative overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-paper-dim)]">
        {/* Motif pita diagonal tipis (nod ke logo Merah-Putih) — halus, tidak ramai */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 sm:block"
          style={{
            background:
              "linear-gradient(115deg, transparent 62%, color-mix(in srgb, var(--color-red) 8%, transparent) 62%, color-mix(in srgb, var(--color-red) 8%, transparent) 66%, transparent 66%, transparent 70%, color-mix(in srgb, var(--color-navy) 8%, transparent) 70%, color-mix(in srgb, var(--color-navy) 8%, transparent) 74%, transparent 74%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <span
            aria-hidden
            className="mb-4 block h-1 w-12 rounded-full bg-[var(--color-red)]"
          />
          <h1 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-[var(--color-navy)] sm:text-4xl">
            Perlengkapan praktik SMK, dari satu vendor tepercaya.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-[var(--color-ink-soft)] sm:text-base">
            Alat otomotif, kelistrikan, elektronika, multimedia, tata boga, dan
            lainnya. Transaksi resmi, ber-PPN, pengiriman langsung.
          </p>
        </div>
      </section>

      <CategoryNav />

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-lg font-medium tracking-tight">
          Produk Terbaru
        </h2>
        <ProductToolbar total={total} sort={sort} />
        <ProductGrid products={products} />
        <Pagination
          page={page}
          total={total}
          pageSize={DEFAULT_PAGE_SIZE}
          basePath="/"
          query={{ sort: sort !== "name" ? sort : undefined }}
        />
      </section>
    </>
  );
}
