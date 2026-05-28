"use client";

import { useState } from "react";

const THEMES = [
  { id: "dark",     label: "다크",     bg: "#0a0a0a", btn: "#e10600" },
  { id: "light",    label: "라이트",   bg: "#f5f5f5", btn: "#111111" },
  { id: "pastel",   label: "파스텔",   bg: "#fdf4ff", btn: "#9333ea" },
  { id: "gradient", label: "그라디언트", bg: "#0f172a", btn: "#6366f1" },
];

const BUTTON_STYLES = [
  { id: "square",  label: "직각" },
  { id: "rounded", label: "둥글게" },
  { id: "shadow",  label: "쉐도우" },
];

const FONTS = ["Barlow Condensed", "Noto Sans KR", "Inter"];

export default function AppearancePage() {
  const [theme, setTheme] = useState("dark");
  const [btnStyle, setBtnStyle] = useState("square");
  const [font, setFont] = useState("Barlow Condensed");
  const [btnColor, setBtnColor] = useState("#e10600");

  const selected = THEMES.find((t) => t.id === theme)!;

  const btnRadius = btnStyle === "rounded" ? "9999px" : "0px";
  const btnShadow = btnStyle === "shadow" ? "4px 4px 0 rgba(0,0,0,0.4)" : "none";

  return (
    <div className="flex h-full">
      {/* Settings */}
      <div className="flex-1 px-8 py-8 max-w-xl">
        <h1 className="text-2xl font-black mb-8" style={{ fontFamily: "var(--font-barlow)" }}>
          외관 설정
        </h1>

        {/* Theme */}
        <div className="mb-8">
          <div className="text-[11px] font-bold tracking-[0.3em] text-[#e10600] uppercase mb-3"
            style={{ fontFamily: "var(--font-barlow)" }}>
            테마 선택
          </div>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex items-center gap-3 px-4 py-3 border transition-colors text-left
                  ${theme === t.id ? "border-[#e10600] bg-[#111]" : "border-[#1a1a1a] hover:border-[#2a2a2a]"}`}
              >
                <div className="w-5 h-5 rounded-full border border-[#333] flex-shrink-0" style={{ background: t.bg }} />
                <span className="text-sm font-bold" style={{ fontFamily: "var(--font-barlow)" }}>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Button color */}
        <div className="mb-8">
          <div className="text-[11px] font-bold tracking-[0.3em] text-[#e10600] uppercase mb-3"
            style={{ fontFamily: "var(--font-barlow)" }}>
            버튼 색상
          </div>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={btnColor}
              onChange={(e) => setBtnColor(e.target.value)}
              className="w-12 h-10 cursor-pointer bg-transparent border border-[#1a1a1a] p-1"
            />
            <span className="text-sm text-[#444] font-mono">{btnColor}</span>
          </div>
        </div>

        {/* Button style */}
        <div className="mb-8">
          <div className="text-[11px] font-bold tracking-[0.3em] text-[#e10600] uppercase mb-3"
            style={{ fontFamily: "var(--font-barlow)" }}>
            버튼 스타일
          </div>
          <div className="flex gap-2">
            {BUTTON_STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setBtnStyle(s.id)}
                className={`flex-1 py-2 text-sm font-bold border transition-colors
                  ${btnStyle === s.id ? "border-[#e10600] text-white bg-[#111]" : "border-[#1a1a1a] text-[#444] hover:border-[#2a2a2a]"}`}
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font */}
        <div className="mb-8">
          <div className="text-[11px] font-bold tracking-[0.3em] text-[#e10600] uppercase mb-3"
            style={{ fontFamily: "var(--font-barlow)" }}>
            폰트
          </div>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="w-full bg-[#0e0e0e] border border-[#1a1a1a] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e10600] transition-colors appearance-none"
          >
            {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        <button
          className="w-full bg-[#e10600] hover:bg-[#c00000] text-white font-bold py-3 transition-colors"
          style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
          onClick={() => alert("Supabase 연동 후 저장 가능합니다")}
        >
          저장하기
        </button>
      </div>

      {/* Preview */}
      <div className="w-72 flex-shrink-0 border-l border-[#1a1a1a] p-6 hidden lg:block">
        <div className="text-[10px] font-bold tracking-[0.3em] text-[#e10600] uppercase mb-4"
          style={{ fontFamily: "var(--font-barlow)" }}>
          실시간 미리보기
        </div>
        <div
          className="border border-[#1e1e1e] p-5 overflow-hidden"
          style={{ background: selected.bg }}
        >
          <div className="text-center mb-4">
            <div className="w-14 h-14 rounded-full bg-[#333] mx-auto mb-2 flex items-center justify-center">
              <span className="font-black text-white text-lg">HS</span>
            </div>
            <div className="font-bold text-sm" style={{ fontFamily: font, color: selected.bg === "#f5f5f5" || selected.bg === "#fdf4ff" ? "#111" : "#fff" }}>hanstar</div>
            <div className="text-xs mt-0.5 opacity-50" style={{ color: selected.bg === "#f5f5f5" || selected.bg === "#fdf4ff" ? "#111" : "#fff" }}>hanyang university</div>
          </div>
          <div className="space-y-2">
            {["GitHub", "LinkedIn", "Instagram"].map((t) => (
              <div
                key={t}
                className="px-4 py-2.5 text-center text-xs font-bold"
                style={{
                  background: btnColor,
                  color: "#fff",
                  borderRadius: btnRadius,
                  boxShadow: btnShadow,
                  fontFamily: font,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
