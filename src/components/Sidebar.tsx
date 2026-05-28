"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/dashboard",   label: "대시보드" },
  { href: "/appearance",  label: "외관"     },
  { href: "/analytics",   label: "통계"     },
  { href: "/settings",    label: "설정"     },
];

interface Props {
  username: string;
}

export default function Sidebar({ username }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="w-52 flex-shrink-0 border-r border-[#1a1a1a] flex flex-col min-h-screen">
      <div className="px-5 py-5 border-b border-[#1a1a1a]">
        <Link
          href="/"
          className="text-xl font-black tracking-tight"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          MY<span className="text-[#e10600]">LINK</span>
        </Link>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 text-sm font-bold transition-colors relative
                ${active
                  ? "text-white bg-[#111] border-l-2 border-[#e10600]"
                  : "text-[#444] hover:text-[#888] border-l-2 border-transparent"
                }`}
              style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.08em" }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-[#1a1a1a] space-y-2">
        {username && (
          <Link
            href={`/${username}`}
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 text-xs text-[#444] hover:text-[#888] transition-colors font-bold"
            style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
          >
            내 페이지 →
          </Link>
        )}
        <button
          className="flex items-center gap-2 w-full px-3 py-2 text-xs text-[#333] hover:text-[#e10600] transition-colors font-bold text-left"
          style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
}
