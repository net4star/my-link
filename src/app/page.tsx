import ProfileImage from "@/components/ProfileImage";

/* ─── EDIT YOUR PROFILE ──────────────────────────────────────────────────── */
const PROFILE = {
  name: "hanstar",
  title: "DEVELOPER",
  bio: "hanyang university vibe coding project",
  racingNumber: "30",
  initials: "HS",
};

const ABOUT = {
  text: "Write a more detailed introduction here. Talk about your background, what drives you, and your approach to work. Keep it authentic and concise.",
  stats: [
    { label: "FOCUS",  value: "Full Stack Dev" },
    { label: "BASE",   value: "Seoul, KR"       },
    { label: "STATUS", value: "Open to Work"    },
  ],
};

const EXPERIENCES = [
  {
    period: "2024 — PRESENT",
    role: "FRONTEND DEVELOPER",
    company: "Company Name",
    description: "Describe your role and key achievements here.",
  },
  {
    period: "2022 — 2024",
    role: "JUNIOR DEVELOPER",
    company: "Previous Company",
    description: "Describe your role and key achievements here.",
  },
  {
    period: "2021 — 2022",
    role: "INTERN",
    company: "Startup Name",
    description: "Describe your role and key achievements here.",
  },
  {
    period: "2020 — 2021",
    role: "FREELANCER",
    company: "Self-Employed",
    description: "Describe your role and key achievements here.",
  },
];

const ACTIVITIES = [
  {
    year: "2025",
    title: "PROJECT NAME",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    description: "Brief description of this project or activity.",
  },
  {
    year: "2024",
    title: "ANOTHER PROJECT",
    tags: ["React", "Node.js"],
    description: "Brief description of this project or activity.",
  },
  {
    year: "2024",
    title: "SIDE PROJECT",
    tags: ["Python", "FastAPI"],
    description: "Brief description of this project or activity.",
  },
  {
    year: "2023",
    title: "OPEN SOURCE CONTRIBUTION",
    tags: ["GitHub", "OSS"],
    description: "Brief description of this project or activity.",
  },
];

const LINKS = [
  { label: "GitHub",      href: "#", description: "@username",        category: "CODE"    },
  { label: "LinkedIn",    href: "#", description: "Connect with me",  category: "CAREER"  },
  { label: "Instagram",   href: "#", description: "@username",        category: "SOCIAL"  },
  { label: "Twitter / X", href: "#", description: "@username",        category: "SOCIAL"  },
  { label: "Email",       href: "mailto:your@email.com", description: "your@email.com", category: "CONTACT" },
  { label: "Website",     href: "#", description: "yourwebsite.com",  category: "WEB"     },
];
/* ──────────────────────────────────────────────────────────────────────────── */

function SectionHeader({ label, count }: { label: string; count?: number }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span
        className="text-[11px] font-bold tracking-[0.35em] text-[#e10600] uppercase flex-shrink-0"
        style={{ fontFamily: "var(--font-barlow)" }}
      >
        {label}
      </span>
      <div className="flex-1 h-px bg-[#1a1a1a]" />
      {count !== undefined && (
        <span
          className="text-[11px] font-bold tracking-[0.2em] text-[#252525] flex-shrink-0"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          {count.toString().padStart(2, "0")}
        </span>
      )}
    </div>
  );
}

function ArrowRight() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">

      {/* ── Top stripe: h-4(16px) = background-size(16px) → 네모 안짤림 ── */}
      <div className="h-4 bg-[#e10600] flex-shrink-0 relative overflow-hidden">
        <div className="absolute inset-0 checkered" />
      </div>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <header className="hero-grid relative overflow-hidden flex-shrink-0">
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#e10600]" />
        <div
          className="absolute -right-4 top-1/2 -translate-y-1/2 text-[14rem] md:text-[18rem] font-black leading-none select-none pointer-events-none text-white"
          style={{ fontFamily: "var(--font-barlow)", opacity: 0.07 }}
        >
          {PROFILE.racingNumber}
        </div>

        <div className="relative max-w-4xl mx-auto px-8 md:px-12 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="ring-pulse flex-shrink-0">
              <ProfileImage initials={PROFILE.initials} name={PROFILE.name} size={156} />
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="block w-1.5 h-1.5 rounded-full bg-[#e10600] animate-pulse" />
                <span
                  className="text-[11px] font-bold tracking-[0.35em] text-[#e10600] uppercase"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  {PROFILE.title}
                </span>
              </div>
              <h1
                className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black tracking-tight leading-[0.88] mb-5"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                {PROFILE.name}
              </h1>
              <div className="flex items-center gap-2 mb-5 justify-center md:justify-start">
                <div className="h-[2px] w-14 bg-[#e10600]" />
                <div className="h-[2px] w-5 bg-[#2a2a2a]" />
                <div className="h-[2px] w-2 bg-[#1e1e1e]" />
              </div>
              <p className="text-[#666] text-[15px] leading-relaxed max-w-[420px]">
                {PROFILE.bio}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto w-full px-8 md:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-[#e10600]/50 to-transparent" />
      </div>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-8 md:px-12 py-14 space-y-16">

        {/* ABOUT */}
        <section>
          <SectionHeader label="ABOUT" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <p className="md:col-span-2 text-[#777] text-[15px] leading-[1.85]">
              {ABOUT.text}
            </p>
            <div className="flex md:flex-col gap-6 md:gap-6 flex-wrap">
              {ABOUT.stats.map((s) => (
                <div key={s.label}>
                  <div
                    className="text-[9px] font-bold tracking-[0.3em] text-[#e10600]/60 uppercase mb-1"
                    style={{ fontFamily: "var(--font-barlow)" }}
                  >
                    {s.label}
                  </div>
                  <div
                    className="text-white font-bold text-[15px]"
                    style={{ fontFamily: "var(--font-barlow)" }}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section>
          <SectionHeader label="EXPERIENCE" count={EXPERIENCES.length} />
          <div className="grid sm:grid-cols-2 gap-3">
            {EXPERIENCES.map((exp, i) => (
              <div
                key={i}
                className="group relative border border-[#1a1a1a] bg-[#0e0e0e] px-5 py-5
                           hover:border-[#e10600]/40 transition-colors duration-200 overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#e10600] origin-center scale-y-0 group-hover:scale-y-100 transition-transform duration-200" />
                <div
                  className="text-[10px] font-bold tracking-[0.2em] text-[#e10600]/55 mb-3"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  {exp.period}
                </div>
                <div
                  className="text-white font-black text-lg leading-tight mb-1"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  {exp.role}
                </div>
                <div
                  className="text-[#444] text-sm font-bold tracking-wider mb-3"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  {exp.company}
                </div>
                <p className="text-[#3a3a3a] text-xs leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ACTIVITIES */}
        <section>
          <SectionHeader label="ACTIVITIES" count={ACTIVITIES.length} />
          <div className="space-y-3">
            {ACTIVITIES.map((act, i) => (
              <div
                key={i}
                className="group relative flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6
                           border border-[#1a1a1a] bg-[#0e0e0e] px-5 py-4
                           hover:border-[#e10600]/40 transition-colors duration-200 overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#e10600] origin-center scale-y-0 group-hover:scale-y-100 transition-transform duration-200" />

                {/* Index + Year */}
                <div className="flex sm:flex-col gap-3 sm:gap-1 flex-shrink-0 sm:w-10">
                  <span
                    className="text-[11px] font-black text-[#252525]"
                    style={{ fontFamily: "var(--font-barlow)" }}
                  >
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span
                    className="text-[11px] font-bold tracking-[0.1em] text-[#e10600]/45"
                    style={{ fontFamily: "var(--font-barlow)" }}
                  >
                    {act.year}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span
                      className="text-white font-bold text-[15px] leading-none"
                      style={{ fontFamily: "var(--font-barlow)" }}
                    >
                      {act.title}
                    </span>
                    <div className="flex gap-1.5 flex-wrap">
                      {act.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-bold tracking-[0.15em] text-[#e10600]/65 border border-[#e10600]/20 px-1.5 py-0.5"
                          style={{ fontFamily: "var(--font-barlow)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[#3a3a3a] text-xs leading-relaxed">{act.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LINKS */}
        <section>
          <SectionHeader label="LINKS" count={LINKS.length} />
          <div className="grid sm:grid-cols-2 gap-3">
            {LINKS.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between gap-4
                           border border-[#1a1a1a] bg-[#0e0e0e] px-5 py-4
                           hover:border-[#e10600]/50 hover:bg-[#120000]
                           transition-all duration-200 overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#e10600] origin-center scale-y-0 group-hover:scale-y-100 transition-transform duration-200" />
                <span
                  className="flex-shrink-0 text-[11px] font-black text-[#222] group-hover:text-[#e10600]/35 transition-colors w-5 text-center"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-[9px] font-bold tracking-[0.28em] text-[#e10600]/55 uppercase mb-[3px]"
                    style={{ fontFamily: "var(--font-barlow)" }}
                  >
                    {link.category}
                  </div>
                  <div
                    className="text-white font-bold text-[1.1rem] leading-none truncate"
                    style={{ fontFamily: "var(--font-barlow)" }}
                  >
                    {link.label}
                  </div>
                  <div className="text-[#3a3a3a] text-xs mt-[3px] truncate">{link.description}</div>
                </div>
                <div className="flex-shrink-0 text-[#252525] group-hover:text-[#e10600] group-hover:translate-x-1 transition-all duration-200">
                  <ArrowRight />
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="flex-shrink-0 border-t border-[#111]">
        <div className="max-w-4xl mx-auto px-8 md:px-12 py-5 flex items-center justify-between">
          <span
            className="text-[10px] tracking-[0.25em] text-[#222] uppercase"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            BUILT WITH NEXT.JS
          </span>
          <div className="h-[2px] w-10 bg-[#e10600]" />
        </div>
      </footer>

      {/* ── Bottom stripe ──────────────────────────────────────────────── */}
      <div className="h-4 bg-[#e10600] flex-shrink-0 relative overflow-hidden">
        <div className="absolute inset-0 checkered" />
      </div>
    </div>
  );
}
