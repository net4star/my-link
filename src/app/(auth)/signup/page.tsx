"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    if (error) {
      setError(error.message === "User already registered" ? "이미 가입된 이메일입니다" : error.message);
      setLoading(false);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="w-full max-w-sm">
      <h1
        className="text-3xl font-black text-center mb-2 text-[#111]"
        style={{ fontFamily: "var(--font-barlow)" }}
      >
        회원가입
      </h1>
      <p className="text-[#777] text-sm text-center mb-8">5분 안에 나만의 링크 페이지 완성</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-[11px] font-bold tracking-[0.2em] text-[#e10600] uppercase mb-1.5"
            style={{ fontFamily: "var(--font-barlow)" }}>
            이메일
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full bg-white border border-[#e0e0e0] px-4 py-3 text-[#111] placeholder-[#bbb] focus:outline-none focus:border-[#e10600] transition-colors text-sm"
          />
        </div>
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
              placeholder="username"
              required
              minLength={3}
              maxLength={30}
              className="w-full bg-white border border-[#e0e0e0] pl-7 pr-4 py-3 text-[#111] placeholder-[#bbb] focus:outline-none focus:border-[#e10600] transition-colors text-sm"
            />
          </div>
          {username && (
            <p className="text-[11px] text-[#999] mt-1">
              mylink.kr/<span className="text-[#e10600]">{username}</span>
            </p>
          )}
        </div>
        <div>
          <label className="block text-[11px] font-bold tracking-[0.2em] text-[#e10600] uppercase mb-1.5"
            style={{ fontFamily: "var(--font-barlow)" }}>
            비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8자 이상 영문+숫자"
            required
            minLength={8}
            className="w-full bg-white border border-[#e0e0e0] px-4 py-3 text-[#111] placeholder-[#bbb] focus:outline-none focus:border-[#e10600] transition-colors text-sm"
          />
        </div>

        {error && <p className="text-[#e10600] text-xs py-1">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#e10600] hover:bg-[#c00000] disabled:opacity-50 text-white font-bold py-3 transition-colors mt-2"
          style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
        >
          {loading ? "가입 중..." : "무료로 시작하기"}
        </button>

        <div className="relative flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-[#e8e8e8]" />
          <span className="text-xs text-[#bbb]">OR</span>
          <div className="flex-1 h-px bg-[#e8e8e8]" />
        </div>

        <button
          type="button"
          className="w-full border border-[#e0e0e0] hover:border-[#d0d0d0] text-[#777] hover:text-[#111] py-3 font-bold transition-all flex items-center justify-center gap-2 text-sm bg-white"
          style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.08em" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google로 계속하기
        </button>
      </form>

      <p className="text-center text-sm text-[#777] mt-6">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="text-[#e10600] hover:underline font-bold">
          로그인
        </Link>
      </p>
    </div>
  );
}
