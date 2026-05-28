import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LinkList from "@/components/dashboard/LinkList";
import type { Link } from "@/types";

interface Profile {
  username: string;
  display_name: string | null;
  bio: string | null;
}

function PreviewPane({ profile, links }: { profile: Profile; links: Link[] }) {
  const initials = (profile.display_name || profile.username || "?")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="w-72 flex-shrink-0 border-l border-[#e8e8e8] p-6 hidden lg:block bg-white">
      <div className="text-[10px] font-bold tracking-[0.3em] text-[#e10600] uppercase mb-4"
        style={{ fontFamily: "var(--font-barlow)" }}>
        미리보기
      </div>
      <div className="border border-[#e8e8e8] bg-[#f8f8f8] rounded overflow-hidden p-4">
        <div className="text-center mb-4">
          <div className="w-14 h-14 rounded-full bg-white border-2 border-[#e10600] mx-auto mb-2 flex items-center justify-center">
            <span className="text-[#e10600] font-black text-lg" style={{ fontFamily: "var(--font-barlow)" }}>{initials}</span>
          </div>
          <div className="font-bold text-sm text-[#111]" style={{ fontFamily: "var(--font-barlow)" }}>{profile.display_name || profile.username}</div>
          {profile.bio && <div className="text-[#999] text-xs mt-0.5">{profile.bio}</div>}
        </div>
        <div className="space-y-2">
          {links.filter((l) => l.is_active).slice(0, 4).map((link) => (
            <div
              key={link.id}
              className="bg-white border border-[#e8e8e8] px-3 py-2 text-xs text-center font-bold text-[#111]"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              {link.title}
            </div>
          ))}
          {links.filter((l) => l.is_active).length === 0 && (
            <div className="text-[#ccc] text-xs text-center py-2">링크 없음</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name, bio")
    .eq("id", user.id)
    .single();

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("profile_id", user.id)
    .order("sort_order");

  const safeProfile = profile ?? { username: "", display_name: null, bio: null };
  const safeLinks: Link[] = (links ?? []) as Link[];

  return (
    <div className="flex h-full">
      <div className="flex-1 px-8 py-8 max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-[#111]" style={{ fontFamily: "var(--font-barlow)" }}>
              링크 관리
            </h1>
            <p className="text-[#999] text-sm mt-0.5">드래그하여 순서를 변경하세요</p>
          </div>
          {safeProfile.username && (
            <div className="text-right">
              <div className="text-[10px] font-bold tracking-[0.2em] text-[#e10600]/70 uppercase"
                style={{ fontFamily: "var(--font-barlow)" }}>
                내 링크 주소
              </div>
              <div className="text-xs text-[#999] mt-0.5">
                mylink.kr/<span className="text-[#111] font-bold">{safeProfile.username}</span>
              </div>
            </div>
          )}
        </div>
        <LinkList initialLinks={safeLinks} profileId={user.id} />
      </div>
      <PreviewPane profile={safeProfile} links={safeLinks} />
    </div>
  );
}
