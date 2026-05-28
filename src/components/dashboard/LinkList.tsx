"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import LinkCard from "./LinkCard";
import LinkEditor from "./LinkEditor";
import type { Link } from "@/types";
import { DEMO_LINKS } from "@/lib/mock-data";

export default function LinkList() {
  const [links, setLinks] = useState<Link[]>(DEMO_LINKS);
  const [editingLink, setEditingLink] = useState<Link | null | undefined>(undefined);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setLinks((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const reordered = arrayMove(items, oldIndex, newIndex).map((item, idx) => ({
        ...item,
        sort_order: idx + 1,
      }));
      // TODO: await supabase update sort_order
      return reordered;
    });
  }

  function handleSave(data: { title: string; url: string }) {
    if (editingLink?.id) {
      setLinks((prev) =>
        prev.map((l) => (l.id === editingLink.id ? { ...l, ...data } : l))
      );
      // TODO: await supabase update
    } else {
      const newLink: Link = {
        id: Date.now().toString(),
        profile_id: "demo",
        title: data.title,
        url: data.url,
        icon_url: null,
        is_active: true,
        sort_order: links.length + 1,
        scheduled_at: null,
        expires_at: null,
        created_at: new Date().toISOString(),
      };
      setLinks((prev) => [...prev, newLink]);
      // TODO: await supabase insert
    }
  }

  function handleDelete(id: string) {
    if (!confirm("삭제하시겠어요?")) return;
    setLinks((prev) => prev.filter((l) => l.id !== id));
    // TODO: await supabase delete
  }

  function handleToggle(id: string, active: boolean) {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, is_active: active } : l)));
    // TODO: await supabase update
  }

  return (
    <>
      <div className="space-y-2">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={links.map((l) => l.id)} strategy={verticalListSortingStrategy}>
            {links.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                onEdit={(l) => setEditingLink(l)}
                onDelete={handleDelete}
                onToggle={handleToggle}
              />
            ))}
          </SortableContext>
        </DndContext>

        {links.length === 0 && (
          <div className="border border-dashed border-[#1e1e1e] py-10 text-center text-[#333] text-sm">
            링크를 추가해보세요
          </div>
        )}

        <button
          onClick={() => setEditingLink(null)}
          className="w-full border border-dashed border-[#1e1e1e] hover:border-[#e10600]/40 text-[#444] hover:text-[#888] py-3 transition-all text-sm font-bold flex items-center justify-center gap-2 mt-2"
          style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
        >
          + 링크 추가
        </button>
      </div>

      {editingLink !== undefined && (
        <LinkEditor
          link={editingLink}
          onSave={handleSave}
          onClose={() => setEditingLink(undefined)}
        />
      )}
    </>
  );
}
