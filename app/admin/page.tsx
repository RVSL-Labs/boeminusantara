import Link from "next/link";
import { formatIDR } from "@/lib/format";
import { getProductStats, getLowStockProducts } from "@/lib/admin/products";
import { categoryName } from "@/lib/categories";

export const metadata = { title: "Dashboard" };

const LOW_STOCK_THRESHOLD = 10;

export default async function AdminDashboardPage() {
  const stats = await getProductStats(LOW_STOCK_THRESHOLD);
  const lowStock = await getLowStockProducts(LOW_STOCK_THRESHOLD);

  const cards = [
    { label: "Total Produk", value: stats.total.toLocaleString("id-ID") },
    { label: "Produk Aktif", value: stats.active.toLocaleString("id-ID") },
    {
      label: "Stok Menipis",
      value: stats.lowStock.toLocaleString("id-ID"),
      accent: stats.lowStock > 0,
    },
    {
      label: "Stok Habis",
      value: stats.outOfStock.toLocaleString("id-ID"),
      accent: stats.outOfStock > 0,
    },
  ];

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
          Ringkasan katalog &amp; persediaan Boemi Nusantara.
        </p>
      </header>

      {/* Kartu statistik */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-5"
          >
            <div className="text-xs uppercase tracking-wide text-[var(--color-mute)]">
              {c.label}
            </div>
            <div
              className={
                "mt-2 text-2xl font-semibold tabular-nums " +
                (c.accent ? "text-[var(--color-red)]" : "text-[var(--color-ink)]")
              }
            >
              {c.value}
            </div>
          </div>
        ))}
      </div>

      {/* Nilai persediaan */}
      <div className="mt-4 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-5">
        <div className="text-xs uppercase tracking-wide text-[var(--color-mute)]">
          Estimasi Nilai Persediaan (exclude PPN)
        </div>
        <div className="mt-2 text-2xl font-semibold tabular-nums">
          {formatIDR(stats.inventoryValue)}
        </div>
        <p className="mt-1 text-xs text-[var(--color-mute)]">
          Jumlah dari harga dasar × stok seluruh produk.
        </p>
      </div>

      {/* Daftar stok menipis */}
      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">
            Perlu Restock (≤ {LOW_STOCK_THRESHOLD} unit)
          </h2>
          <Link
            href="/admin/stok"
            className="text-xs text-[var(--color-navy)] hover:underline"
          >
            Kelola stok →
          </Link>
        </div>

        {lowStock.length === 0 ? (
          <p className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-5 text-sm text-[var(--color-mute)]">
            Tidak ada produk yang perlu restock. Bagus.
          </p>
        ) : (
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-line)] text-left text-xs uppercase tracking-wide text-[var(--color-mute)]">
                  <th className="px-4 py-3 font-medium">Produk</th>
                  <th className="px-4 py-3 font-medium">Kategori</th>
                  <th className="px-4 py-3 text-right font-medium">Stok</th>
                </tr>
              </thead>
              <tbody>
                {lowStock.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-[var(--color-line-soft)] last:border-0"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/produk/${p.id}`}
                        className="hover:underline"
                      >
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-[var(--color-ink-soft)]">
                      {categoryName(p.category)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      <span
                        className={
                          p.stock <= 0
                            ? "font-semibold text-[var(--color-red)]"
                            : "text-[var(--color-ink)]"
                        }
                      >
                        {p.stock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
