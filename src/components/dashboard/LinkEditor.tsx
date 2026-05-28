"use client";

import { useState, useEffect } from "react";
import type { Link } from "@/types";

interface Props {
  link?: Link | null;
  onSave: (data: { title: string; url: string }) => void;
  onClose: () => void;
}

export default function LinkEditor({ link, onSave, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (link) {
      setTitle(link.title);
      setUrl(link.url);
    } else {
      setTitle("");
      setUrl("");
    }
  }, [link]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    onSave({ title: title.trim(), url: url.trim() });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
      <div className="bg-white border border-[#e8e8e8] w-full max-w-md shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e8e8]">
          <span
            className="font-black text-lg text-[#111]"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            {link ? "링크 수정" : "링크 추가"}
          </span>
          <button onClick={onClose} className="text-[#bbb] hover:text-[#666] transition-colors text-xl">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-[11px] font-bold tracking-[0.2em] text-[#e10600] uppercase mb-1.5"
              style={{ fontFamily: "var(--font-barlow)" }}>
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="YouTube 채널"
              required
              maxLength={50}
              className="w-full bg-[#f8f8f8] border border-[#e8e8e8] px-4 py-3 text-[#111] placeholder-[#bbb] focus:outline-none focus:border-[#e10600] transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold tracking-[0.2em] text-[#e10600] uppercase mb-1.5"
              style={{ fontFamily: "var(--font-barlow)" }}>
              URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/@channel"
              required
              className="w-full bg-[#f8f8f8] border border-[#e8e8e8] px-4 py-3 text-[#111] placeholder-[#bbb] focus:outline-none focus:border-[#e10600] transition-colors text-sm"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-[#e8e8e8] hover:border-[#d0d0d0] text-[#777] hover:text-[#111] py-3 font-bold transition-all text-sm"
              style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.08em" }}
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#e10600] hover:bg-[#c00000] text-white font-bold py-3 transition-colors text-sm"
              style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.08em" }}
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
