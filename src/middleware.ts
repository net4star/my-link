import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED = ["/dashboard", "/appearance", "/analytics", "/settings"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));

  // TODO: replace with Supabase session check after Supabase is connected
  // const supabase = createServerClient(...);
  // const { data: { session } } = await supabase.auth.getSession();
  // if (!session && isProtected) { ... redirect ... }

  if (isProtected) {
    // Temporarily allow all access while Supabase is not configured
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
