import LinkList from "@/components/dashboard/LinkList";
import { DEMO_LINKS } from "@/lib/mock-data";

function PreviewPane() {
  return (
    <div className="w-72 flex-shrink-0 border-l border-[#1a1a1a] p-6 hidden lg:block">
      <div className="text-[10px] font-bold tracking-[0.3em] text-[#e10600] uppercase mb-4"
        style={{ fontFamily: "var(--font-barlow)" }}>
        미리보기
      </div>
      <div className="border border-[#1e1e1e] bg-[#111] rounded overflow-hidden p-4">
        {/* Mini profile */}
        <div className="text-center mb-4">
          <div className="w-14 h-14 rounded-full bg-[#1a1a1a] border-2 border-[#e10600] mx-auto mb-2 flex items-center justify-center">
            <span className="text-[#e10600] font-black text-lg" style={{ fontFamily: "var(--font-barlow)" }}>HS</span>
          </div>
          <div className="font-bold text-sm" style={{ fontFamily: "var(--font-barlow)" }}>hanstar</div>
          <div className="text-[#444] text-xs mt-0.5">hanyang university vibe coding project</div>
        </div>
        {/* Mini links */}
        <div className="space-y-2">
          {DEMO_LINKS.filter((l) => l.is_active).slice(0, 4).map((link) => (
            <div
              key={link.id}
              className="bg-[#0a0a0a] border border-[#1e1e1e] px-3 py-2 text-xs text-center font-bold"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              {link.title}
            </div>
          ))}
        </div>
      </div>
      <p className="text-[10px] text-[#2a2a2a] text-center mt-3">
        실시간 미리보기는 Supabase 연동 후 적용됩니다
      </p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex h-full">
      {/* Main */}
      <div className="flex-1 px-8 py-8 max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-2xl font-black"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              링크 관리
            </h1>
            <p className="text-[#444] text-sm mt-0.5">드래그하여 순서를 변경하세요</p>
          </div>
          <div className="text-right">
            <div
              className="text-[10px] font-bold tracking-[0.2em] text-[#e10600]/60 uppercase"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              내 링크 주소
            </div>
            <div className="text-xs text-[#444] mt-0.5">mylink.kr/<span className="text-white">hanstar</span></div>
          </div>
        </div>
        <LinkList />
      </div>
      <PreviewPane />
    </div>
  );
}
