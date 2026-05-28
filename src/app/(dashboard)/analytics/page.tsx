"use client";

import { MOCK_ANALYTICS } from "@/lib/mock-data";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useState } from "react";

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<7 | 30>(7);
  const data = MOCK_ANALYTICS;

  return (
    <div className="px-8 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black" style={{ fontFamily: "var(--font-barlow)" }}>
          통계
        </h1>
        <div className="flex gap-1">
          {([7, 30] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 text-xs font-bold transition-colors border
                ${period === p ? "bg-[#e10600] border-[#e10600] text-white" : "border-[#1a1a1a] text-[#444] hover:border-[#2a2a2a]"}`}
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
          { label: "총 조회수",  value: data.totalViews.toLocaleString(),  sub: "페이지 방문" },
          { label: "총 클릭수",  value: data.totalClicks.toLocaleString(), sub: "링크 클릭"   },
          { label: "CTR",        value: `${((data.totalClicks / data.totalViews) * 100).toFixed(1)}%`, sub: "클릭률" },
          { label: "활성 링크",  value: "4",   sub: "개"                },
        ].map((s) => (
          <div key={s.label} className="border border-[#1a1a1a] bg-[#0e0e0e] px-5 py-4">
            <div className="text-[10px] font-bold tracking-[0.25em] text-[#e10600]/60 uppercase mb-1"
              style={{ fontFamily: "var(--font-barlow)" }}>
              {s.label}
            </div>
            <div className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-barlow)" }}>
              {s.value}
            </div>
            <div className="text-[#333] text-xs mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Line chart */}
      <div className="mb-10">
        <div className="text-[11px] font-bold tracking-[0.3em] text-[#e10600] uppercase mb-4"
          style={{ fontFamily: "var(--font-barlow)" }}>
          날짜별 조회수
        </div>
        <div className="border border-[#1a1a1a] bg-[#0e0e0e] p-4">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data.daily}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
              <XAxis dataKey="date" stroke="#333" tick={{ fill: "#444", fontSize: 11 }} />
              <YAxis stroke="#333" tick={{ fill: "#444", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 0 }}
                labelStyle={{ color: "#888" }}
              />
              <Line type="monotone" dataKey="views" stroke="#e10600" strokeWidth={2} dot={false} name="조회수" />
              <Line type="monotone" dataKey="clicks" stroke="#ff6666" strokeWidth={2} dot={false} strokeDasharray="4 4" name="클릭수" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar chart */}
      <div>
        <div className="text-[11px] font-bold tracking-[0.3em] text-[#e10600] uppercase mb-4"
          style={{ fontFamily: "var(--font-barlow)" }}>
          링크별 클릭 수
        </div>
        <div className="border border-[#1a1a1a] bg-[#0e0e0e] p-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.byLink} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" horizontal={false} />
              <XAxis type="number" stroke="#333" tick={{ fill: "#444", fontSize: 11 }} />
              <YAxis type="category" dataKey="title" stroke="#333" tick={{ fill: "#888", fontSize: 11 }} width={80} />
              <Tooltip
                contentStyle={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 0 }}
                cursor={{ fill: "rgba(225,6,0,0.05)" }}
              />
              <Bar dataKey="clicks" fill="#e10600" name="클릭수" radius={0} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
