import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PublicProfileLinks from "@/components/PublicProfileLinks";

const THEME_BG: Record<string, string> = {
  dark:     "#0a0a0a",
  light:    "#f5f5f5",
  pastel:   "#fdf4ff",
  gradient: "#0f172a",
};

const THEME_TEXT: Record<string, { text: string; subtext: string }> = {
  dark:     { text: "#ffffff", subtext: "#555555" },
  light:    { text: "#111111", subtext: "#777777" },
  pastel:   { text: "#111111", subtext: "#888888" },
  gradient: { text: "#ffffff", subtext: "#64748b" },
};

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, bio, avatar_url")
    .eq("username", username)
    .eq("is_public", true)
    .single();

  return {
    title: profile ? `${profile.display_name || username} | MyLink` : `${username} | MyLink`,
    description: profile?.bio ?? "",
    openGraph: profile?.avatar_url ? { images: [profile.avatar_url] } : {},
  };
}

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, display_name, bio, is_public, theme, avatar_url")
    .eq("username", username)
    .eq("is_public", true)
    .single();

  if (!profile) notFound();

  const { data: links } = await supabase
    .from("links")
    .select("id, title, url")
    .eq("profile_id", profile.id)
    .eq("is_active", true)
    .order("sort_order");

  // Resolve theme
  const t = (profile.theme ?? {}) as Record<string, string>;
  const themeId = t.themeId ?? "dark";
  const bg = THEME_BG[themeId] ?? "#0a0a0a";
  const { text, subtext } = THEME_TEXT[themeId] ?? { text: "#fff", subtext: "#555" };
  const btnColor  = t.buttonColor ?? "#e10600";
  const btnRadius = t.buttonStyle === "rounded" ? "9999px" : "0px";
  const btnShadow = t.buttonStyle === "shadow"  ? "4px 4px 0 rgba(0,0,0,0.2)" : "none";
  const font      = t.font ? `'${t.font}', var(--font-barlow)` : "var(--font-barlow)";

  const displayName = profile.display_name || profile.username;
  const initials    = displayName.slice(0, 2).toUpperCase();

  const theme = { bg, text, subtext, btnColor, btnRadius, btnShadow, font };

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-12"
      style={{ background: bg, color: text }}
    >
      {/* Profile */}
      <div className="w-full max-w-sm text-center mb-8">
        <div className="w-20 h-20 rounded-full border-[3px] border-[#e10600] mx-auto mb-4 overflow-hidden ring-pulse flex items-center justify-center"
          style={{ background: themeId === "dark" || themeId === "gradient" ? "#1a1a1a" : "#e8e8e8" }}>
          {profile.avatar_url ? (
            <Image src={profile.avatar_url} alt={displayName} width={80} height={80} className="object-cover w-full h-full" />
          ) : (
            <span className="text-[#e10600] font-black text-2xl select-none" style={{ fontFamily: "var(--font-barlow)" }}>
              {initials}
            </span>
          )}
        </div>
        <h1 className="text-2xl font-black mb-1" style={{ fontFamily: "var(--font-barlow)", color: text }}>
          {displayName}
        </h1>
        {profile.bio && (
          <p className="text-sm leading-relaxed" style={{ color: subtext }}>{profile.bio}</p>
        )}
      </div>

      {/* Links (client component — handles click tracking) */}
      <PublicProfileLinks
        profileId={profile.id}
        links={links ?? []}
        theme={theme}
      />

      {/* Footer */}
      <div className="mt-12 text-center">
        <a
          href="/"
          className="text-[11px] tracking-[0.2em] uppercase font-bold transition-colors"
          style={{ color: subtext, fontFamily: "var(--font-barlow)" }}
        >
          MY<span style={{ color: `${btnColor}60` }}>LINK</span>으로 만들기
        </a>
      </div>
    </div>
  );
}
