import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortalUser, getMyQuote } from "@/lib/portal";
import { listOffers, hargaBerlaku, negosiasiSelesai } from "@/lib/admin/negotiation";
import { formatIDR } from "@/lib/format";
import { PortalNegotiation } from "./_components/PortalNegotiation";
import { portalNegotiateAction } from "../actions";

export const metadata = { title: "Rincian Penawaran" };

export default async function PortalQuoteDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = (await getPortalUser())!;

  // Bukan milik pemakai ini → 404, bukan "dilarang". Pesan "dilarang" sudah
  // membocorkan bahwa datanya ada.
  const quote = await getMyQuote(user, id);
  if (!quote) notFound();

  const offers = await listOffers(id);
  const berlaku = hargaBerlaku(offers);
  const selesai = negosiasiSelesai(offers);
  const terakhir = offers[offers.length - 1];
  const giliranBoemi = terakhir?.actor === "seller" && terakhir.items.length > 0;

  const hargaTerakhir = new Map(
    (berlaku?.items ?? []).map((i) => [i.requestItemId, i.unitPrice]),
  );

  const baris = quote.items.map((i) => ({
    id: i.id,
    name: i.name,
    qty: i.qty,
    hargaKatalog: i.price,
    hargaAwal: hargaTerakhir.get(i.id) ?? i.buyerPrice ?? i.price,
  }));

  const subtotalDaftar = quote.items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="space-y-8">
      <nav className="text-sm text-[var(--color-mute)]">
        <Link href="/portal" className="hover:text-[var(--color-ink)]">
          Transaksi Saya
        </Link>
        <span className="mx-2">/</span>
        <span>{quote.code}</span>
      </nav>

      <header>
        <h1 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">
          {quote.code}
        </h1>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
          {quote.institution ?? "Permintaan penawaran"} ·{" "}
          {new Date(quote.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </header>

      <section className="overflow-x-auto rounded border border-[var(--color-line)] bg-[var(--color-paper)]">
        <table className="w-full min-w-[30rem] text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-left text-xs uppercase tracking-wide text-[var(--color-mute)]">
              <th className="px-4 py-3 font-medium">Barang</th>
              <th className="px-4 py-3 text-right font-medium">Jumlah</th>
              <th className="px-4 py-3 text-right font-medium">Harga daftar</th>
              <th className="px-4 py-3 text-right font-medium">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {quote.items.map((i) => (
              <tr key={i.id} className="border-b border-[var(--color-line-soft)] last:border-0">
                <td className="px-4 py-3 text-[var(--color-ink)]">{i.name}</td>
                <td className="px-4 py-3 text-right tabular-nums">{i.qty}</td>
                <td className="px-4 py-3 text-right tabular-nums text-[var(--color-ink-soft)]">
                  {formatIDR(i.price)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {formatIDR(i.price * i.qty)}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="px-4 py-3 text-right text-[var(--color-ink-soft)]">
                Subtotal harga daftar (belum PPN)
              </td>
              <td className="px-4 py-3 text-right font-semibold tabular-nums">
                {formatIDR(subtotalDaftar)}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {quote.note && (
        <p className="text-sm text-[var(--color-ink-soft)]">
          <span className="font-medium text-[var(--color-ink)]">Catatan Anda: </span>
          {quote.note}
        </p>
      )}

      <PortalNegotiation
        action={portalNegotiateAction.bind(null, id)}
        offers={offers}
        items={baris}
        selesai={selesai}
        giliranBoemi={giliranBoemi}
      />
    </div>
  );
}
