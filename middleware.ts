import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refresh session cookie di setiap request (pola resmi Supabase SSR).
 * Kalau env Supabase kosong, lewati saja → app tetap jalan tanpa auth.
 */
/**
 * Subdomain internal = pintu staf. Tidak menampilkan etalase/portal sekolah:
 * apa pun di luar area admin & alur login langsung diarahkan ke /admin
 * (yang lalu meminta login). Path yang tetap boleh: aset build & alur auth.
 */
function internalGate(request: NextRequest): NextResponse | null {
  const host = (
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    ""
  ).toLowerCase();
  if (!host.startsWith("internal.")) return null;

  const p = request.nextUrl.pathname;
  const boleh =
    p.startsWith("/admin") ||
    p.startsWith("/masuk") ||
    p.startsWith("/auth") ||
    p.startsWith("/atur-sandi") ||
    p.startsWith("/lupa-sandi") ||
    p.startsWith("/_next") ||
    p === "/favicon.ico";

  if (boleh) return null;

  const ke = request.nextUrl.clone();
  ke.pathname = "/admin";
  ke.search = "";
  return NextResponse.redirect(ke);
}

export async function middleware(request: NextRequest) {
  const gerbangInternal = internalGate(request);
  if (gerbangInternal) return gerbangInternal;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let supabaseResponse = NextResponse.next({ request });

  if (!url || !key) {
    // Tanpa Supabase, session tidak bisa diverifikasi → area berlogin ditutup.
    if (
      request.nextUrl.pathname.startsWith("/admin") ||
      request.nextUrl.pathname.startsWith("/portal")
    ) {
      return new NextResponse("Admin dinonaktifkan: autentikasi belum dikonfigurasi.", {
        status: 503,
      });
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: { name: string; value: string; options: CookieOptions }[],
      ) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // WAJIB: jangan sisipkan logika di antara createServerClient dan getUser().
  // Memicu refresh token & sinkron cookie session.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Gerbang /admin lapis-1: WAJIB sudah login. Middleware hanya mengurus
  // "siapa kamu", bukan "kamu berhak apa" — daftar admin ada di database dan
  // middleware (edge runtime) tidak boleh menyentuh DB.
  //
  // Lapis-2 di app/admin/layout.tsx yang memeriksa hak akses sesungguhnya
  // (pemilik dari env + staf dari tabel admin_users), fail-closed.
  // Portal klien: cukup sudah login. Yang membatasi bukan siapa dia, tapi data
  // mana yang tampil — penyaringan per pemakai ada di lib/portal.ts.
  if (
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.startsWith("/portal")
  ) {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/masuk";
      loginUrl.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Cocokkan semua path KECUALI:
     * - _next/static, _next/image (aset build)
     * - favicon.ico, file gambar
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
