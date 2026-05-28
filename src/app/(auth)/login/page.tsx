"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Supabase auth
    // const supabase = createClient();
    // const { error } = await supabase.auth.signInWithPassword({ email, password });
    // if (!error) router.push('/dashboard');
    alert("Supabase 연동 후 사용 가능합니다");
  }

  return (
    <div className="w-full max-w-sm">
      <h1
        className="text-3xl font-black text-center mb-8"
        style={{ fontFamily: "var(--font-barlow)" }}
      >
        로그인
      </h1>

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
            className="w-full bg-[#111] border border-[#1e1e1e] px-4 py-3 text-white placeholder-[#333] focus:outline-none focus:border-[#e10600] transition-colors text-sm"
          />
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
            placeholder="••••••••"
            required
            className="w-full bg-[#111] border border-[#1e1e1e] px-4 py-3 text-white placeholder-[#333] focus:outline-none focus:border-[#e10600] transition-colors text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#e10600] hover:bg-[#c00000] text-white font-bold py-3 transition-colors mt-2"
          style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
        >
          로그인
        </button>

        <div className="relative flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-[#1e1e1e]" />
          <span className="text-xs text-[#333]">OR</span>
          <div className="flex-1 h-px bg-[#1e1e1e]" />
        </div>

        <button
          type="button"
          className="w-full border border-[#1e1e1e] hover:border-[#333] text-[#888] hover:text-white py-3 font-bold transition-all flex items-center justify-center gap-2 text-sm"
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

      <p className="text-center text-sm text-[#444] mt-6">
        계정이 없으신가요?{" "}
        <Link href="/signup" className="text-[#e10600] hover:underline font-bold">
          회원가입
        </Link>
      </p>
    </div>
  );
}
