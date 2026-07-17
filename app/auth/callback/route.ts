import { NextResponse, type NextRequest } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

/**
 * Callback OAuth (Google) & konfirmasi email.
 * Supabase mengarahkan ke sini dengan ?code=... → tukar jadi session cookie.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // 'next' opsional: ke mana diarahkan setelah login berhasil.
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createServerSupabase();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Gagal / tanpa code → kembali ke halaman masuk dengan penanda error.
  return NextResponse.redirect(`${origin}/masuk?error=auth`);
}
