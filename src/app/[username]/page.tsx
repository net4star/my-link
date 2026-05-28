import type { Metadata } from "next";
import { DEMO_LINKS } from "@/lib/mock-data";

// TODO: replace with Supabase query
// const supabase = await createClient();
// const { data: profile } = await supabase.from("profiles").select("*").eq("username", username).single();
// const { data: links } = await supabase.from("links").select("*").eq("profile_id", profile.id).eq("is_active", true).order("sort_order");

const DEMO_PROFILE = {
  username: "hanstar",
  display_name: "hanstar",
  bio: "hanyang university vibe coding project",
  initials: "HS",
};

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${username} | MyLink`,
    description: DEMO_PROFILE.bio,
  };
}

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const profile = DEMO_PROFILE;
  const links = DEMO_LINKS.filter((l) => l.is_active);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center px-4 py-12">
      {/* Profile */}
      <div className="w-full max-w-sm text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-[#1a1a1a] border-[3px] border-[#e10600] mx-auto mb-4 flex items-center justify-center ring-pulse">
          <span
            className="text-[#e10600] font-black text-2xl select-none"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            {profile.initials}
          </span>
        </div>
        <h1
          className="text-2xl font-black mb-1"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          {profile.display_name}
        </h1>
        <p className="text-[#555] text-sm leading-relaxed">{profile.bio}</p>
      </div>

      {/* Links */}
      <div className="w-full max-w-sm space-y-2.5">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target={link.url.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 w-full
                       border border-[#1e1e1e] bg-[#0e0e0e] hover:bg-[#120000]
                       hover:border-[#e10600]/40 px-6 py-4
                       font-bold text-[15px] transition-all duration-200"
            style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.05em" }}
          >
            {link.title}
            <span className="text-[#333] group-hover:text-[#e10600] group-hover:translate-x-1 transition-all text-xs">→</span>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
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
