import Link from "next/link";

const DEMO_LINKS = [
  { id: "1", title: "GitHub", url: "#" },
  { id: "2", title: "포트폴리오", url: "#" },
  { id: "3", title: "LinkedIn", url: "#" },
  { id: "4", title: "유튜브 채널", url: "#" },
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center px-4 py-12">
      {/* Demo badge */}
      <div className="mb-8 px-3 py-1 border border-[#e10600]/40 text-[10px] font-bold tracking-[0.3em] text-[#e10600] uppercase"
        style={{ fontFamily: "var(--font-barlow)" }}>
        DEMO
      </div>

      {/* Profile */}
      <div className="w-full max-w-sm text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-[#1a1a1a] border-[3px] border-[#e10600] mx-auto mb-4 flex items-center justify-center ring-pulse">
          <span className="text-[#e10600] font-black text-2xl select-none" style={{ fontFamily: "var(--font-barlow)" }}>
            ME
          </span>
        </div>
        <h1 className="text-2xl font-black mb-1" style={{ fontFamily: "var(--font-barlow)" }}>
          나의 이름
        </h1>
        <p className="text-[#555] text-sm leading-relaxed">
          개발자 / 크리에이터 · 한양대학교
        </p>
      </div>

      {/* Links */}
      <div className="w-full max-w-sm space-y-2.5">
        {DEMO_LINKS.map((link) => (
          <div
            key={link.id}
            className="group flex items-center justify-center gap-2 w-full bg-[#e10600] px-6 py-4 font-bold text-[15px] text-white cursor-default select-none"
            style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.05em" }}
          >
            {link.title}
            <span className="text-xs opacity-70">→</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 text-center space-y-3">
        <p className="text-[#444] text-sm">나만의 링크 페이지를 만들어보세요</p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 bg-[#e10600] hover:bg-[#c00000] text-white font-bold px-8 py-3 transition-colors text-sm"
          style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
        >
          무료로 시작하기
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-8">
        <a
          href="/"
          className="text-[11px] tracking-[0.2em] text-[#2a2a2a] hover:text-[#444] transition-colors uppercase font-bold"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          MY<span className="text-[#e10600]/40">LINK</span>으로 만들기
        </a>
      </div>
    </div>
  );
}
