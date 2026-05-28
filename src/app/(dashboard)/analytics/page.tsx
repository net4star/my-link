"use client";

import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface DayData { date: string; views: number; clicks: number; }
interface LinkData { title: string; clicks: number; }
interface Stats {
  totalViews: number;
  totalClicks: number;
  activeLinks: number;
  daily: DayData[];
  byLink: LinkData[];
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<7 | 30>(7);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const since = new Date(Date.now() - period * 24 * 60 * 60 * 1000).toISOString();

      const [{ data: events }, { count: linkCount }] = await Promise.all([
        supabase
          .from("click_events")
          .select("created_at, link_id, links(title)")
          .eq("profile_id", user.id)
          .gte("created_at", since),
        supabase
          .from("links")
          .select("id", { count: "exact", head: true })
          .eq("profile_id", user.id)
          .eq("is_active", true),
      ]);

      const rows = events ?? [];
      const totalViews  = rows.filter((e) => !e.link_id).length;
      const totalClicks = rows.filter((e) =>  e.link_id).length;

      // Daily aggregation
      const dayMap: Record<string, { views: number; clicks: number }> = {};
      for (let i = period - 1; i >= 0; i--) {
        const d = new Date(Date.now() - i * 86400000);
        const key = `${d.getMonth() + 1}/${d.getDate()}`;
        dayMap[key] = { views: 0, clicks: 0 };
      }
      rows.forEach((e) => {
        const d = new Date(e.created_at);
        const key = `${d.getMonth() + 1}/${d.getDate()}`;
        if (!dayMap[key]) return;
        if (e.link_id) dayMap[key].clicks++;
        else dayMap[key].views++;
      });
      const daily: DayData[] = Object.entries(dayMap).map(([date, v]) => ({ date, ...v }));

      // By-link aggregation
      const linkMap: Record<string, { title: string; clicks: number }> = {};
      rows.forEach((e) => {
        if (!e.link_id) return;
        const title = (e.links as unknown as { title: string } | null)?.title ?? e.link_id;
        if (!linkMap[e.link_id]) linkMap[e.link_id] = { title, clicks: 0 };
        linkMap[e.link_id].clicks++;
      });
      const byLink: LinkData[] = Object.values(linkMap).sort((a, b) => b.clicks - a.clicks).slice(0, 8);

      setStats({ totalViews, totalClicks, activeLinks: linkCount ?? 0, daily, byLink });
      setLoading(false);
    }
    fetchStats();
  }, [period]);

  const ctr = stats && stats.totalViews > 0
    ? ((stats.totalClicks / stats.totalViews) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="px-8 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-[#111]" style={{ fontFamily: "var(--font-barlow)" }}>
          통계
        </h1>
        <div className="flex gap-1">
          {([7, 30] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 text-xs font-bold transition-colors border
                ${period === p ? "bg-[#e10600] border-[#e10600] text-white" : "border-[#e8e8e8] bg-white text-[#777] hover:border-[#d0d0d0]"}`}
              style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
            >
              {p}일
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { label: "총 조회수",  value: loading ? "—" : (stats?.totalViews ?? 0).toLocaleString(),  sub: "페이지 방문" },
          { label: "총 클릭수",  value: loading ? "—" : (stats?.totalClicks ?? 0).toLocaleString(), sub: "링크 클릭"   },
          { label: "CTR",        value: loading ? "—" : `${ctr}%`,                                  sub: "클릭률"      },
          { label: "활성 링크",  value: loading ? "—" : String(stats?.activeLinks ?? 0),            sub: "개"          },
        ].map((s) => (
          <div key={s.label} className="border border-[#e8e8e8] bg-white px-5 py-4">
            <div className="text-[10px] font-bold tracking-[0.25em] text-[#e10600]/70 uppercase mb-1"
              style={{ fontFamily: "var(--font-barlow)" }}>
              {s.label}
            </div>
            <div className="text-2xl font-black text-[#111]" style={{ fontFamily: "var(--font-barlow)" }}>
              {s.value}
            </div>
            <div className="text-[#bbb] text-xs mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="text-[#bbb] text-sm text-center py-16">데이터 불러오는 중...</div>
      ) : (
        <>
          {/* Line chart */}
          <div className="mb-10">
            <div className="text-[11px] font-bold tracking-[0.3em] text-[#e10600] uppercase mb-4"
              style={{ fontFamily: "var(--font-barlow)" }}>
              날짜별 조회수
            </div>
            <div className="border border-[#e8e8e8] bg-white p-4">
              {stats!.daily.every((d) => d.views === 0 && d.clicks === 0) ? (
                <div className="h-[200px] flex items-center justify-center text-[#ccc] text-sm">
                  아직 방문 데이터가 없어요.<br />퍼블릭 페이지를 공유해보세요!
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={stats!.daily}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#e0e0e0" tick={{ fill: "#bbb", fontSize: 11 }} />
                    <YAxis stroke="#e0e0e0" tick={{ fill: "#bbb", fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 4 }} labelStyle={{ color: "#999" }} />
                    <Line type="monotone" dataKey="views" stroke="#e10600" strokeWidth={2} dot={false} name="조회수" />
                    <Line type="monotone" dataKey="clicks" stroke="#f87171" strokeWidth={2} dot={false} strokeDasharray="4 4" name="클릭수" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Bar chart */}
          <div>
            <div className="text-[11px] font-bold tracking-[0.3em] text-[#e10600] uppercase mb-4"
              style={{ fontFamily: "var(--font-barlow)" }}>
              링크별 클릭 수
            </div>
            <div className="border border-[#e8e8e8] bg-white p-4">
              {stats!.byLink.length === 0 ? (
                <div className="h-[200px] flex items-center justify-center text-[#ccc] text-sm">
                  아직 링크 클릭 데이터가 없어요
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={Math.max(160, stats!.byLink.length * 40)}>
                  <BarChart data={stats!.byLink} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                    <XAxis type="number" stroke="#e0e0e0" tick={{ fill: "#bbb", fontSize: 11 }} />
                    <YAxis type="category" dataKey="title" stroke="#e0e0e0" tick={{ fill: "#777", fontSize: 11 }} width={90} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 4 }} cursor={{ fill: "rgba(225,6,0,0.04)" }} />
                    <Bar dataKey="clicks" fill="#e10600" name="클릭수" radius={0} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
