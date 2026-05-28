"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Link } from "@/types";

interface Props {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, active: boolean) => void;
}

export default function LinkCard({ link, onEdit, onDelete, onToggle }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-3 border bg-white px-4 py-3 transition-colors
        ${isDragging ? "border-[#e10600]/40" : "border-[#e8e8e8] hover:border-[#d0d0d0]"}
        ${!link.is_active ? "opacity-50" : ""}
      `}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="flex-shrink-0 text-[#ccc] hover:text-[#999] cursor-grab active:cursor-grabbing touch-none"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/>
          <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
          <circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/>
        </svg>
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div
          className="text-[#111] font-bold text-sm truncate"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          {link.title}
        </div>
        <div className="text-[#bbb] text-xs truncate">{link.url}</div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => onToggle(link.id, !link.is_active)}
          className={`w-8 h-4 rounded-full transition-colors relative flex-shrink-0 ${
            link.is_active ? "bg-[#e10600]" : "bg-[#e0e0e0]"
          }`}
        >
          <span
            className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${
              link.is_active ? "left-[18px]" : "left-0.5"
            }`}
          />
        </button>

        <button
          onClick={() => onEdit(link)}
          className="text-[#bbb] hover:text-[#666] transition-colors text-xs font-bold px-1"
          style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
        >
          수정
        </button>
        <button
          onClick={() => onDelete(link.id)}
          className="text-[#bbb] hover:text-[#e10600] transition-colors text-xs font-bold px-1"
          style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
