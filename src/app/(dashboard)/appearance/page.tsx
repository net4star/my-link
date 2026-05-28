"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const CHECKER_BG = "repeating-conic-gradient(#ffffff 0% 25%, #ededed 0% 50%) 0 0 / 16px 16px";

const THEMES = [
  { id: "dark",     label: "다크",       bg: "#0a0a0a", btn: "#e10600", swatch: "#0a0a0a" },
  { id: "light",    label: "라이트",     bg: "#f5f5f5", btn: "#111111", swatch: "#f5f5f5" },
  { id: "checker",  label: "체커키",     bg: "#ffffff", btn: "#111111", swatch: "repeating-conic-gradient(#ffffff 0% 25%, #ededed 0% 50%) 0 0 / 8px 8px" },
  { id: "gradient", label: "그라디언트", bg: "#0f172a", btn: "#6366f1", swatch: "#0f172a" },
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
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadTheme() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("profiles").select("theme").eq("id", user.id).single();
      if (data?.theme && typeof data.theme === "object") {
        const t = data.theme as Record<string, string>;
        if (t.themeId) setTheme(t.themeId);
        if (t.buttonStyle) setBtnStyle(t.buttonStyle);
        if (t.font) setFont(t.font);
        if (t.buttonColor) setBtnColor(t.buttonColor);
      }
    }
    loadTheme();
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ theme: { themeId: theme, buttonStyle: btnStyle, font, buttonColor: btnColor } })
      .eq("id", user.id);
    setSaving(false);
    setMessage(error ? `오류: ${error.message}` : "저장되었습니다!");
    setTimeout(() => setMessage(""), 3000);
  }

  const selected = THEMES.find((t) => t.id === theme)!;
  const btnRadius = btnStyle === "rounded" ? "9999px" : "0px";
  const btnShadow = btnStyle === "shadow" ? "4px 4px 0 rgba(0,0,0,0.15)" : "none";
  const isLightBg = selected.id === "light" || selected.id === "checker";
  const previewText = isLightBg ? "#111" : "#fff";

  return (
    <div className="flex flex-col lg:flex-row lg:h-full">

      {/* Preview: sticky top on mobile / right column on desktop */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#e8e8e8] px-4 py-4
                      lg:static lg:border-b-0 lg:border-l lg:w-72 lg:flex-shrink-0 lg:p-6 lg:order-2">
        <div className="text-[10px] font-bold tracking-[0.3em] text-[#e10600] uppercase mb-3"
          style={{ fontFamily: "var(--font-barlow)" }}>
          실시간 미리보기
        </div>
        <div
          className="border border-[#e8e8e8] p-4 lg:p-5 overflow-hidden"
          style={{ background: selected.id === "checker" ? CHECKER_BG : selected.bg }}
        >
          <div className="text-center mb-3">
            <div
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-full mx-auto mb-2 flex items-center justify-center border-2"
              style={{ background: isLightBg ? "#e8e8e8" : "#1a1a1a", borderColor: btnColor }}
            >
              <span className="font-black text-base lg:text-lg" style={{ color: btnColor }}>MY</span>
            </div>
            <div className="font-bold text-sm" style={{ fontFamily: font, color: previewText }}>username</div>
            <div className="text-xs mt-0.5 opacity-50" style={{ color: previewText }}>나만의 링크 페이지</div>
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

      {/* Settings (scrollable) */}
      <div className="flex-1 px-4 sm:px-8 py-6 sm:py-8 lg:max-w-xl lg:order-1">
        <h1 className="text-2xl font-black mb-8 text-[#111]" style={{ fontFamily: "var(--font-barlow)" }}>
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
                onClick={() => { setTheme(t.id); setBtnColor(t.btn); }}
                className={`flex items-center gap-3 px-4 py-3 border transition-colors text-left
                  ${theme === t.id ? "border-[#e10600] bg-red-50" : "border-[#e8e8e8] bg-white hover:border-[#d0d0d0]"}`}
              >
                <div className="w-5 h-5 rounded-full border border-[#e0e0e0] flex-shrink-0" style={{ background: t.swatch }} />
                <span className={`text-sm font-bold ${theme === t.id ? "text-[#e10600]" : "text-[#555]"}`}
                  style={{ fontFamily: "var(--font-barlow)" }}>{t.label}</span>
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
              className="w-12 h-10 cursor-pointer bg-white border border-[#e8e8e8] p-1"
            />
            <span className="text-sm text-[#999] font-mono">{btnColor}</span>
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
                  ${btnStyle === s.id ? "border-[#e10600] text-[#e10600] bg-red-50" : "border-[#e8e8e8] text-[#777] bg-white hover:border-[#d0d0d0]"}`}
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
            className="w-full bg-white border border-[#e8e8e8] px-4 py-3 text-[#111] text-sm focus:outline-none focus:border-[#e10600] transition-colors appearance-none"
          >
            {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        {message && (
          <p className={`text-xs mb-3 ${message.startsWith("오류") ? "text-[#e10600]" : "text-green-600"}`}>
            {message}
          </p>
        )}

        <button
          disabled={saving}
          className="w-full bg-[#e10600] hover:bg-[#c00000] disabled:opacity-50 text-white font-bold py-3 transition-colors"
          style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
          onClick={handleSave}
        >
          {saving ? "저장 중..." : "저장하기"}
        </button>
      </div>
    </div>
  );
}
