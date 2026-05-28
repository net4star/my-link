"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

interface Props {
  username: string;
  children: React.ReactNode;
}

export default function DashboardShell({ username, children }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#111] flex">
      {/* Dim overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer on mobile / static sidebar on desktop */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:transition-none lg:z-auto lg:flex-shrink-0
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar username={username} onClose={() => setOpen(false)} />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <div className="h-[3px] bg-[#e10600] flex-shrink-0" />

        {/* Mobile header */}
        <header className="lg:hidden flex items-center gap-3 px-4 h-12 bg-white border-b border-[#e8e8e8] flex-shrink-0">
          <button
            onClick={() => setOpen(true)}
            className="p-1.5 text-[#777] hover:text-[#111] transition-colors"
            aria-label="메뉴 열기"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="0" y1="1" x2="20" y2="1" />
              <line x1="0" y1="7" x2="20" y2="7" />
              <line x1="0" y1="13" x2="20" y2="13" />
            </svg>
          </button>
          <span
            className="text-lg font-black tracking-tight text-[#111]"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            MY<span className="text-[#e10600]">LINK</span>
          </span>
        </header>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
