"use client";

import { useEffect } from "react";

interface LinkItem {
  id: string;
  title: string;
  url: string;
}

interface ThemeStyle {
  bg: string;
  text: string;
  subtext: string;
  btnColor: string;
  btnRadius: string;
  btnShadow: string;
  font: string;
}

interface Props {
  profileId: string;
  links: LinkItem[];
  theme: ThemeStyle;
}

export default function PublicProfileLinks({ profileId, links, theme }: Props) {
  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId }),
    }).catch(() => {});
  }, [profileId]);

  function trackClick(linkId: string) {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId, linkId }),
    }).catch(() => {});
  }

  return (
    <div className="w-full max-w-sm space-y-2.5">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target={link.url.startsWith("http") ? "_blank" : "_self"}
          rel="noopener noreferrer"
          onClick={() => trackClick(link.id)}
          className="group flex items-center justify-center gap-2 w-full px-6 py-4 font-bold text-[15px] transition-all duration-200 text-white"
          style={{
            background: theme.btnColor,
            borderRadius: theme.btnRadius,
            boxShadow: theme.btnShadow,
            fontFamily: theme.font,
            letterSpacing: "0.05em",
          }}
        >
          {link.title}
          <span
            className="group-hover:translate-x-1 transition-transform text-xs opacity-70"
          >→</span>
        </a>
      ))}
      {links.length === 0 && (
        <p className="text-center text-sm py-8" style={{ color: theme.subtext }}>
          아직 링크가 없습니다
        </p>
      )}
    </div>
  );
}
