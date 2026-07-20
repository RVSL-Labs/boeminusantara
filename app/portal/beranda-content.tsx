import Link from "next/link";
import { formatIDR } from "@/lib/format";
import type { PortalQuote, PortalOrder, BuyerProfile } from "@/lib/portal";
import { kelengkapanProfil } from "@/lib/portal";

/**
 * Isi beranda portal: menonjolkan yang BUTUH TINDAKAN lebih dulu.
 * Halaman pertama harus menunjukkan pekerjaan, bukan sekadar sambutan.
 */
export function BerandaContent({
  quotes,
  orders,
  profile,
}: {
  quotes: PortalQuote[];
  orders: PortalOrder[];
  profile: BuyerProfile;
}) {
  const persen = kelengkapanProfil(profile);

  const perluDibalas = quotes.filter((q) => q.status === "negotiating");
  const belumBayar = orders.filter((o) => o.status === "pending");
  const disepakati = quotes.filter((q) => q.status === "agreed");

  const tugas: { teks: string; href: string; mendesak: boolean }[] = [];

  for (const q of perluDibalas) {
    tugas.push({
      teks: `Penawaran ${q.code} menunggu tanggapan harga dari Anda`,
      href: `/portal/penawaran/${q.id}`,
      mendesak: true,
    });
  }
  for (const o of belumBayar) {
    tugas.push({
      teks: `Pesanan ${o.code} menunggu pembayaran`,
      href: `/pesanan/${o.code}`,
      mendesak: true,
    });
  }
  for (const q of disepakati) {
    tugas.push({
      teks: `Harga ${q.code} sudah disepakati — menunggu surat pesanan dari Boemi`,
      href: `/portal/penawaran/${q.id}`,
      mendesak: false,
    });
  }
  if (persen < 100) {
    tugas.push({
      teks: `Lengkapi profil instansi (${persen}%) agar dokumen bisa dibuat otomatis`,
      href: "/portal/profil",
      mendesak: false,
    });
  }

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-mute)]">
        Perlu Tindakan
      </h2>

      {tugas.length === 0 ? (
        <p className="rounded border border-[var(--color-line)] bg-[var(--color-paper)] p-5 text-sm text-[var(--color-mute)]">
          Tidak ada yang perlu dikerjakan sekarang.
        </p>
      ) : (
        <ul className="space-y-2">
          {tugas.map((t, i) => (
            <li key={i}>
              <Link
                href={t.href}
                className={
                  "flex items-center gap-3 rounded border p-4 text-sm transition hover:border-[var(--color-navy)] " +
                  (t.mendesak
                    ? "border-[var(--color-red)]/30 bg-[var(--color-red)]/5"
                    : "border-[var(--color-line)] bg-[var(--color-paper)]")
                }
              >
                <span
                  aria-hidden
                  className={
                    "h-1.5 w-1.5 shrink-0 rounded-full " +
                    (t.mendesak ? "bg-[var(--color-red)]" : "bg-[var(--color-mute)]")
                  }
                />
                <span className="text-[var(--color-ink)]">{t.teks}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["Permintaan penawaran", String(quotes.length)],
          ["Pesanan", String(orders.length)],
          [
            "Nilai transaksi",
            formatIDR(
              quotes.reduce((s, q) => s + q.subtotal, 0) +
                orders.reduce((s, o) => s + o.total, 0),
            ),
          ],
        ].map(([judul, nilai]) => (
          <div
            key={judul}
            className="rounded border border-[var(--color-line)] bg-[var(--color-paper)] p-4"
          >
            <dt className="text-xs uppercase tracking-wide text-[var(--color-mute)]">
              {judul}
            </dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums text-[var(--color-ink)]">
              {nilai}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
