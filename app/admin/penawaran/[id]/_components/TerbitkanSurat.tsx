"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { TerbitState } from "../../actions";

type Action = (prev: TerbitState, formData: FormData) => Promise<TerbitState>;

const INITIAL: TerbitState = { ok: false };

export type DokumenRingkas = {
  id: string;
  number: string;
  issuedAt: string;
  issuedBy: string | null;
};

const waktu = (iso: string) =>
  new Date(iso).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export function TerbitkanSurat({
  action,
  bisaTerbit,
  dokumen,
}: {
  action: Action;
  bisaTerbit: boolean;
  dokumen: DokumenRingkas[];
}) {
  const [state, formAction, pending] = useActionState(action, INITIAL);

  return (
    <section className="mt-8 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-5">
      <h2 className="text-sm font-semibold text-[var(--color-ink)]">Dokumen</h2>

      {dokumen.length > 0 && (
        <ul className="mt-3 space-y-2">
          {dokumen.map((d) => (
            <li
              key={d.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded border border-[var(--color-line)] px-3 py-2 text-sm"
            >
              <div>
                <div className="font-medium text-[var(--color-ink)]">
                  Surat Pesanan · {d.number}
                </div>
                <div className="text-xs text-[var(--color-mute)]">
                  {waktu(d.issuedAt)}
                  {d.issuedBy ? ` · ${d.issuedBy}` : ""}
                </div>
              </div>
              <Link
                href={`/dokumen/${d.id}`}
                className="text-[var(--color-navy)] hover:underline"
              >
                Buka &amp; cetak
              </Link>
            </li>
          ))}
        </ul>
      )}

      {state.ok && state.docId && (
        <p className="mt-3 rounded border border-[var(--color-line)] bg-[var(--color-paper-dim)] px-3 py-2 text-sm text-[var(--color-ink-soft)]">
          Surat pesanan {state.nomor} diterbitkan.{" "}
          <Link href={`/dokumen/${state.docId}`} className="text-[var(--color-navy)] hover:underline">
            Buka sekarang
          </Link>
        </p>
      )}

      {state.error && (
        <p className="mt-3 rounded border border-[var(--color-red)] bg-[var(--color-red)]/5 px-3 py-2 text-sm text-[var(--color-red-deep)]">
          {state.error}
        </p>
      )}

      {!bisaTerbit ? (
        <p className="mt-3 text-sm text-[var(--color-mute)]">
          Surat pesanan bisa diterbitkan setelah harga disepakati di bagian
          negosiasi di atas.
        </p>
      ) : dokumen.length === 0 ? (
        <form action={formAction} className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="pphRate"
                className="block text-sm font-medium text-[var(--color-ink)]"
              >
                PPh (%)
              </label>
              <input
                id="pphRate"
                name="pphRate"
                type="number"
                step="0.1"
                min={0}
                defaultValue={0}
                className="mt-1 w-32 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-2 text-sm tabular-nums outline-none focus:border-[var(--color-navy)]"
              />
              <p className="mt-1 text-xs text-[var(--color-mute)]">
                Isi 0 bila tidak dicantumkan.
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="catatanSurat"
              className="block text-sm font-medium text-[var(--color-ink)]"
            >
              Catatan di surat{" "}
              <span className="font-normal text-[var(--color-mute)]">(opsional)</span>
            </label>
            <textarea
              id="catatanSurat"
              name="catatanSurat"
              rows={2}
              className="mt-1 w-full rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-2 text-sm outline-none focus:border-[var(--color-navy)]"
              placeholder="Mis. pengiriman paling lambat 14 hari kerja sejak surat diterbitkan."
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-10 items-center rounded-[var(--radius-card)] bg-[var(--color-navy)] px-4 text-sm font-medium text-[var(--color-paper)] transition hover:opacity-90 disabled:opacity-60"
          >
            {pending ? "Menerbitkan…" : "Terbitkan Surat Pesanan"}
          </button>

          <p className="text-xs text-[var(--color-mute)]">
            Nomor surat diambil berurutan dan isinya dibekukan saat terbit —
            tidak bisa diubah setelahnya.
          </p>
        </form>
      ) : null}
    </section>
  );
}
