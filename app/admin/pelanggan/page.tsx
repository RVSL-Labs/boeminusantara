export const metadata = { title: "Pelanggan" };

export default function AdminCustomersPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight">Pelanggan</h1>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
          Data pelanggan &amp; instansi (sekolah).
        </p>
      </header>

      <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-left text-xs uppercase tracking-wide text-[var(--color-mute)]">
              <th className="px-4 py-3 font-medium">Nama</th>
              <th className="px-4 py-3 font-medium">Instansi</th>
              <th className="px-4 py-3 font-medium">Telepon</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={3}
                className="px-4 py-10 text-center text-sm text-[var(--color-mute)]"
              >
                Belum ada data pelanggan. Modul pelanggan segera hadir (butuh
                integrasi Supabase Auth dari agent AUTH).
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
