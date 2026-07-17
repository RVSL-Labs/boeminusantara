import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuote } from "@/lib/admin/quotes";
import { formatIDR } from "@/lib/format";
import { approveQuoteAction } from "../actions";
import { ApproveForm } from "../_components/ApproveForm";
import { StatusBadge } from "../_components/StatusBadge";

export const metadata = { title: "Tinjau Penawaran" };

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quote = await getQuote(id);
  if (!quote) notFound();

  const items = quote.quote_request_items ?? [];
  const subtotal = items.reduce((s, it) => s + Number(it.subtotal || 0), 0);
  const alreadyQuoted = quote.status === "quoted";

  const action = approveQuoteAction.bind(null, id);

  return (
    <div>
      <nav className="mb-4 text-sm text-[var(--color-mute)]">
        <Link href="/admin/penawaran" className="hover:text-[var(--color-ink)]">
          Penawaran
        </Link>
        <span className="mx-2">/</span>
        <span>{quote.code}</span>
      </nav>

      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{quote.code}</h1>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            Permintaan penawaran masuk.
          </p>
        </div>
        <StatusBadge status={quote.status} />
      </header>

      {alreadyQuoted && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-[var(--radius-card)] border border-[var(--color-navy)]/20 bg-[var(--color-navy)]/5 px-4 py-3 text-sm">
          <span className="text-[var(--color-ink-soft)]">
            Surat penawaran sudah diterbitkan untuk permintaan ini.
          </span>
          <Link
            href={`/admin/penawaran/${id}/surat`}
            className="shrink-0 font-medium text-[var(--color-navy)] hover:underline"
          >
            Lihat / Cetak Surat →
          </Link>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Kiri: data + item */}
        <div className="space-y-6">
          <section className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-mute)]">
              Data Pemohon
            </h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              <dt className="text-[var(--color-mute)]">Nama</dt>
              <dd className="text-[var(--color-ink)]">{quote.customer_name}</dd>
              <dt className="text-[var(--color-mute)]">Email</dt>
              <dd className="text-[var(--color-ink)]">{quote.customer_email}</dd>
              {quote.customer_phone && (
                <>
                  <dt className="text-[var(--color-mute)]">Telepon</dt>
                  <dd className="text-[var(--color-ink)]">
                    {quote.customer_phone}
                  </dd>
                </>
              )}
              {quote.institution && (
                <>
                  <dt className="text-[var(--color-mute)]">Instansi</dt>
                  <dd className="text-[var(--color-ink)]">
                    {quote.institution}
                  </dd>
                </>
              )}
              {quote.note && (
                <>
                  <dt className="text-[var(--color-mute)]">Catatan</dt>
                  <dd className="text-[var(--color-ink)]">{quote.note}</dd>
                </>
              )}
            </dl>
          </section>

          <section className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)]">
            <h2 className="border-b border-[var(--color-line)] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-mute)]">
              Item Diminta
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-line)] text-left text-xs uppercase tracking-wide text-[var(--color-mute)]">
                  <th className="px-4 py-2 font-medium">Nama</th>
                  <th className="px-4 py-2 text-right font-medium">Qty</th>
                  <th className="px-4 py-2 text-right font-medium">
                    Harga (exPPN)
                  </th>
                  <th className="px-4 py-2 text-right font-medium">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-6 text-center text-[var(--color-mute)]"
                    >
                      Tidak ada item.
                    </td>
                  </tr>
                ) : (
                  items.map((it) => (
                    <tr
                      key={it.id}
                      className="border-b border-[var(--color-line-soft)] last:border-0"
                    >
                      <td className="px-4 py-2 text-[var(--color-ink)]">
                        {it.name}
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums">
                        {it.qty}
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums">
                        {formatIDR(it.price)}
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums">
                        {formatIDR(it.subtotal)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr className="border-t border-[var(--color-line)]">
                  <td
                    colSpan={3}
                    className="px-4 py-3 text-right text-[var(--color-mute)]"
                  >
                    Subtotal (exPPN)
                  </td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-[var(--color-ink)]">
                    {formatIDR(subtotal)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </section>
        </div>

        {/* Kanan: ACC */}
        <div>
          <section className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--color-mute)]">
              Setujui &amp; Terbitkan
            </h2>
            <ApproveForm action={action} disabled={alreadyQuoted} />
          </section>
        </div>
      </div>
    </div>
  );
}
