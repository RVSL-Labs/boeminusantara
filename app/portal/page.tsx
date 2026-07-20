import Link from "next/link";
import { getPortalUser, listMyQuotes, listMyOrders, getMyProfile } from "@/lib/portal";
import { BerandaContent } from "./beranda-content";

export const metadata = { title: "Beranda" };



export default async function PortalHome() {
  const user = (await getPortalUser())!;
  const [quotes, orders, profile] = await Promise.all([
    listMyQuotes(user),
    listMyOrders(user),
    getMyProfile(user),
  ]);

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">
          {profile.institution || "Beranda"}
        </h1>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
          Ringkasan pengadaan Anda bersama Boemi Nusantara.
        </p>
      </header>

      <BerandaContent quotes={quotes} orders={orders} profile={profile} />

      <p className="text-sm">
        <Link href="/portal/transaksi" className="text-[var(--color-navy)] hover:underline">
          Lihat semua transaksi →
        </Link>
      </p>
    </div>
  );
}
