export const metadata = { title: "Pesanan" };

export default function AdminOrdersPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight">Pesanan</h1>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
          Daftar pesanan pelanggan.
        </p>
      </header>

      <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-left text-xs uppercase tracking-wide text-[var(--color-mute)]">
              <th className="px-4 py-3 font-medium">Kode</th>
              <th className="px-4 py-3 font-medium">Pelanggan</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={4}
                className="px-4 py-10 text-center text-sm text-[var(--color-mute)]"
              >
                Belum ada pesanan. Modul pesanan &amp; pembayaran segera hadir.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
