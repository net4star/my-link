"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (data) {
        setDisplayName(data.display_name ?? "");
        setUsername(data.username ?? "");
        setBio(data.bio ?? "");
        setIsPublic(data.is_public ?? true);
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName, username, bio, is_public: isPublic })
      .eq("id", user.id);
    setSaving(false);
    setMessage(error ? `오류: ${error.message}` : "저장되었습니다!");
    setTimeout(() => setMessage(""), 3000);
  }

  if (loading) {
    return <div className="px-8 py-8 text-[#999] text-sm">불러오는 중...</div>;
  }

  return (
    <div className="px-8 py-8 max-w-xl">
      <h1 className="text-2xl font-black mb-8 text-[#111]" style={{ fontFamily: "var(--font-barlow)" }}>
        프로필 설정
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar */}
        <div>
          <div className="text-[11px] font-bold tracking-[0.3em] text-[#e10600] uppercase mb-3"
            style={{ fontFamily: "var(--font-barlow)" }}>
            프로필 사진
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-[#e10600] flex items-center justify-center flex-shrink-0">
              <span className="text-[#e10600] font-black text-xl" style={{ fontFamily: "var(--font-barlow)" }}>
                {(displayName || username || "?").slice(0, 2).toUpperCase()}
              </span>
            </div>
            <button
              type="button"
              className="px-4 py-2 border border-[#e8e8e8] hover:border-[#d0d0d0] text-[#777] hover:text-[#111] text-xs font-bold transition-all bg-white"
              style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
            >
              사진 변경 (준비 중)
            </button>
          </div>
        </div>

        {/* Display name */}
        <div>
          <label className="block text-[11px] font-bold tracking-[0.2em] text-[#e10600] uppercase mb-1.5"
            style={{ fontFamily: "var(--font-barlow)" }}>
            표시 이름
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            maxLength={50}
            className="w-full bg-white border border-[#e8e8e8] px-4 py-3 text-[#111] focus:outline-none focus:border-[#e10600] transition-colors text-sm"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-[11px] font-bold tracking-[0.2em] text-[#e10600] uppercase mb-1.5"
            style={{ fontFamily: "var(--font-barlow)" }}>
            사용자 ID
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb] text-sm">@</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
              minLength={3}
              maxLength={30}
              className="w-full bg-white border border-[#e8e8e8] pl-7 pr-4 py-3 text-[#111] focus:outline-none focus:border-[#e10600] transition-colors text-sm"
            />
          </div>
          <p className="text-[11px] text-[#bbb] mt-1">
            mylink.kr/<span className="text-[#e10600]">{username}</span>
          </p>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-[11px] font-bold tracking-[0.2em] text-[#e10600] uppercase mb-1.5"
            style={{ fontFamily: "var(--font-barlow)" }}>
            소개 (Bio)
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={150}
            rows={3}
            className="w-full bg-white border border-[#e8e8e8] px-4 py-3 text-[#111] focus:outline-none focus:border-[#e10600] transition-colors text-sm resize-none"
          />
          <p className="text-[11px] text-[#bbb] text-right mt-1">{bio.length}/150</p>
        </div>

        {/* Public toggle */}
        <div className="flex items-center justify-between border border-[#e8e8e8] bg-white px-4 py-3">
          <div>
            <div className="font-bold text-sm text-[#111]" style={{ fontFamily: "var(--font-barlow)" }}>페이지 공개 여부</div>
            <div className="text-[#999] text-xs mt-0.5">{isPublic ? "공개 중" : "비공개"}</div>
          </div>
          <button
            type="button"
            onClick={() => setIsPublic((v) => !v)}
            className={`w-10 h-5 rounded-full transition-colors relative ${isPublic ? "bg-[#e10600]" : "bg-[#e0e0e0]"}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${isPublic ? "left-[22px]" : "left-0.5"}`} />
          </button>
        </div>

        {message && (
          <p className={`text-xs py-1 ${message.startsWith("오류") ? "text-[#e10600]" : "text-green-600"}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-[#e10600] hover:bg-[#c00000] disabled:opacity-50 text-white font-bold py-3 transition-colors"
          style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
        >
          {saving ? "저장 중..." : "저장하기"}
        </button>
      </form>
    </div>
  );
}
