"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("hanstar");
  const [username, setUsername] = useState("hanstar");
  const [bio, setBio] = useState("hanyang university vibe coding project");
  const [isPublic, setIsPublic] = useState(true);

  return (
    <div className="px-8 py-8 max-w-xl">
      <h1 className="text-2xl font-black mb-8" style={{ fontFamily: "var(--font-barlow)" }}>
        프로필 설정
      </h1>

      <form
        onSubmit={(e) => { e.preventDefault(); alert("Supabase 연동 후 저장 가능합니다"); }}
        className="space-y-6"
      >
        {/* Avatar */}
        <div>
          <div className="text-[11px] font-bold tracking-[0.3em] text-[#e10600] uppercase mb-3"
            style={{ fontFamily: "var(--font-barlow)" }}>
            프로필 사진
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border-2 border-[#e10600] flex items-center justify-center flex-shrink-0">
              <span className="text-[#e10600] font-black text-xl" style={{ fontFamily: "var(--font-barlow)" }}>HS</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="px-4 py-2 border border-[#1e1e1e] hover:border-[#e10600]/40 text-[#888] hover:text-white text-xs font-bold transition-all"
                style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
                onClick={() => alert("Supabase Storage 연동 후 업로드 가능합니다")}
              >
                사진 변경
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-[#1e1e1e] hover:border-[#e10600]/40 text-[#555] hover:text-[#e10600] text-xs font-bold transition-all"
                style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
              >
                삭제
              </button>
            </div>
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
            className="w-full bg-[#0e0e0e] border border-[#1a1a1a] px-4 py-3 text-white focus:outline-none focus:border-[#e10600] transition-colors text-sm"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-[11px] font-bold tracking-[0.2em] text-[#e10600] uppercase mb-1.5"
            style={{ fontFamily: "var(--font-barlow)" }}>
            사용자 ID
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444] text-sm">@</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
              minLength={3}
              maxLength={30}
              className="w-full bg-[#0e0e0e] border border-[#1a1a1a] pl-7 pr-4 py-3 text-white focus:outline-none focus:border-[#e10600] transition-colors text-sm"
            />
          </div>
          <p className="text-[11px] text-[#333] mt-1">
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
            className="w-full bg-[#0e0e0e] border border-[#1a1a1a] px-4 py-3 text-white focus:outline-none focus:border-[#e10600] transition-colors text-sm resize-none"
          />
          <p className="text-[11px] text-[#333] text-right mt-1">{bio.length}/150</p>
        </div>

        {/* Public toggle */}
        <div className="flex items-center justify-between border border-[#1a1a1a] px-4 py-3">
          <div>
            <div className="font-bold text-sm" style={{ fontFamily: "var(--font-barlow)" }}>페이지 공개 여부</div>
            <div className="text-[#444] text-xs mt-0.5">{isPublic ? "공개 중" : "비공개"}</div>
          </div>
          <button
            type="button"
            onClick={() => setIsPublic((v) => !v)}
            className={`w-10 h-5 rounded-full transition-colors relative ${isPublic ? "bg-[#e10600]" : "bg-[#2a2a2a]"}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${isPublic ? "left-[22px]" : "left-0.5"}`} />
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#e10600] hover:bg-[#c00000] text-white font-bold py-3 transition-colors"
          style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
        >
          저장하기
        </button>
      </form>
    </div>
  );
}
