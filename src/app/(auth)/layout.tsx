import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <div className="h-[3px] bg-[#e10600]" />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <Link
          href="/"
          className="text-2xl font-black mb-10 tracking-tight hover:opacity-80 transition-opacity"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          MY<span className="text-[#e10600]">LINK</span>
        </Link>
        {children}
      </div>
      <div className="h-[3px] bg-[#e10600]" />
    </div>
  );
}
