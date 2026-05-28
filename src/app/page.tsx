import Link from "next/link";

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const FEATURES = [
  { title: "간편 설정",       desc: "5분 안에 나만의 링크 페이지 완성" },
  { title: "무료",            desc: "기본 기능은 모두 무료로 제공"     },
  { title: "모바일 최적화",   desc: "어떤 기기에서도 완벽하게 표시"   },
];

const HOW_TO = [
  { step: "01", title: "가입하기",    desc: "이메일 또는 Google로 30초 만에 가입" },
  { step: "02", title: "링크 추가",   desc: "SNS, 포트폴리오, 연락처 등 원하는 링크 추가" },
  { step: "03", title: "공유하기",    desc: "mylink.kr/@나의아이디를 SNS 바이오에 붙여넣기" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#111] flex flex-col">

      {/* Top stripe */}
      <div className="h-[3px] bg-[#e10600]" />

      {/* Nav */}
      <nav className="max-w-5xl mx-auto w-full px-6 md:px-10 py-5 flex items-center justify-between">
        <span
          className="text-2xl font-black text-[#111] tracking-tight"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          MY<span className="text-[#e10600]">LINK</span>
        </span>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-[#777] hover:text-[#111] transition-colors px-4 py-2"
            style={{ fontFamily: "var(--font-barlow)", fontWeight: 700, letterSpacing: "0.1em" }}
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="text-sm font-bold bg-[#e10600] hover:bg-[#c00000] text-white px-5 py-2 transition-colors"
            style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
          >
            시작하기
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-grid relative overflow-hidden flex-1 flex items-center border-t border-[#f0f0f0]">
        <div
          className="absolute left-0 top-0 bottom-0 w-5"
          style={{
            background: "repeating-conic-gradient(#111111 0% 25%, #ffffff 0% 50%) 0 0 / 10px 10px",
          }}
        />
        <div
          className="absolute right-0 bottom-0 font-black leading-none select-none pointer-events-none text-[#111] opacity-[0.025]"
          style={{ fontFamily: "var(--font-barlow)", fontSize: "clamp(4rem, 20vw, 22rem)" }}
        >
          HS30
        </div>
        <div className="relative max-w-5xl mx-auto w-full pl-8 pr-6 sm:px-8 md:px-10 py-16 sm:py-24 md:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e10600] animate-pulse" />
              <span
                className="text-[11px] font-bold tracking-[0.35em] text-[#e10600] uppercase"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                링크트리 클론 서비스
              </span>
            </div>
            <h1
              className="font-black leading-[0.95] tracking-tight mb-5 sm:mb-6 text-[#111]"
              style={{ fontFamily: "var(--font-barlow)", fontSize: "clamp(1.9rem, 8vw, 4.5rem)" }}
            >
              나만의 링크 페이지를
              <br />
              <span className="text-[#e10600]">지금 바로</span> 만들어보세요
            </h1>
            <p className="text-[#777] text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg">
              여러 SNS에 흩어진 링크를 하나의 URL로 통합하세요.
              크리에이터, 프리랜서, 소상공인 모두를 위한 링크 페이지.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-[#e10600] hover:bg-[#c00000] text-white font-bold px-6 py-3.5 sm:px-8 sm:py-4 transition-colors text-base sm:text-lg"
                style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.05em" }}
              >
                무료로 시작하기
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 border border-[#e0e0e0] hover:border-[#e10600]/40 text-[#777] hover:text-[#111] px-6 py-3.5 sm:px-8 sm:py-4 transition-all text-base sm:text-lg font-bold bg-white"
                style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.05em" }}
              >
                데모 보기 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <div className="border-t border-b border-[#ebebeb] bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-6 grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#ebebeb]">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-center gap-3 px-0 sm:px-8 py-4 sm:py-0 first:pl-0 last:pr-0">
              <span className="text-[#e10600]"><CheckIcon /></span>
              <div>
                <span
                  className="font-bold text-[#111] text-base"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  {f.title}
                </span>
                <span className="text-[#777] text-sm ml-2">{f.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section className="max-w-5xl mx-auto w-full px-6 md:px-10 py-24">
        <div className="flex items-center gap-4 mb-12">
          <span
            className="text-[11px] font-bold tracking-[0.35em] text-[#e10600] uppercase flex-shrink-0"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            HOW IT WORKS
          </span>
          <div className="flex-1 h-px bg-[#ebebeb]" />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {HOW_TO.map((h) => (
            <div
              key={h.step}
              className="border border-[#ebebeb] bg-white px-6 py-6 relative overflow-hidden hover:border-[#e10600]/30 transition-colors"
            >
              <div
                className="absolute right-4 top-2 text-6xl font-black text-[#111] select-none"
                style={{ fontFamily: "var(--font-barlow)", opacity: 0.04 }}
              >
                {h.step}
              </div>
              <div
                className="text-[#e10600] font-black text-4xl mb-3"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                {h.step}
              </div>
              <div
                className="text-[#111] font-bold text-xl mb-2"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                {h.title}
              </div>
              <p className="text-[#777] text-sm leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="border-t border-[#ebebeb] bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 text-center">
          <h2
            className="text-4xl md:text-5xl font-black mb-4 text-[#111]"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            지금 바로 시작하세요
          </h2>
          <p className="text-[#777] mb-8">5분 안에 나만의 링크 페이지 완성</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-[#e10600] hover:bg-[#c00000] text-white font-bold px-10 py-4 transition-colors text-lg"
            style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.05em" }}
          >
            무료로 시작하기
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#ebebeb]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          <span
            className="text-[11px] tracking-[0.25em] text-[#bbb] uppercase font-bold"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            MYLINK © 2026
          </span>
          <div className="h-[2px] w-8 bg-[#e10600]" />
        </div>
      </footer>
      <div className="h-[3px] bg-[#e10600]" />
    </div>
  );
}
