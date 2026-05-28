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
  onClose?: () => void;
}

export default function Sidebar({ username, onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="w-52 flex-shrink-0 border-r border-[#e8e8e8] bg-white flex flex-col min-h-screen">
      <div className="px-5 py-5 border-b border-[#e8e8e8] flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-black tracking-tight text-[#111]"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          MY<span className="text-[#e10600]">LINK</span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-[#bbb] hover:text-[#111] transition-colors"
            aria-label="메뉴 닫기"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="2" y1="2" x2="14" y2="14" />
              <line x1="14" y1="2" x2="2" y2="14" />
            </svg>
          </button>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-2.5 px-3 py-2.5 text-sm font-bold transition-colors relative
                ${active
                  ? "text-[#e10600] bg-red-50 border-l-2 border-[#e10600]"
                  : "text-[#777] hover:text-[#111] hover:bg-[#f8f8f8] border-l-2 border-transparent"
                }`}
              style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.08em" }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-[#e8e8e8] space-y-1">
        {username && (
          <Link
            href={`/${username}`}
            target="_blank"
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-2 text-xs text-[#777] hover:text-[#111] transition-colors font-bold"
            style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
          >
            내 페이지 →
          </Link>
        )}
        <button
          className="flex items-center gap-2 w-full px-3 py-2 text-xs text-[#bbb] hover:text-[#e10600] transition-colors font-bold text-left"
          style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
}
