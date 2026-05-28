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
import { createClient } from "@/lib/supabase/client";

interface Props {
  initialLinks: Link[];
  profileId: string;
}

export default function LinkList({ initialLinks, profileId }: Props) {
  const [links, setLinks] = useState<Link[]>(initialLinks);
  const [editingLink, setEditingLink] = useState<Link | null | undefined>(undefined);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const reordered = arrayMove(
      links,
      links.findIndex((i) => i.id === active.id),
      links.findIndex((i) => i.id === over.id)
    ).map((item, idx) => ({ ...item, sort_order: idx + 1 }));
    setLinks(reordered);
    const supabase = createClient();
    await Promise.all(
      reordered.map((l) =>
        supabase.from("links").update({ sort_order: l.sort_order }).eq("id", l.id)
      )
    );
  }

  async function handleSave(data: { title: string; url: string }) {
    const supabase = createClient();
    if (editingLink?.id) {
      const { data: updated } = await supabase
        .from("links")
        .update({ title: data.title, url: data.url })
        .eq("id", editingLink.id)
        .select()
        .single();
      if (updated) setLinks((prev) => prev.map((l) => (l.id === editingLink.id ? (updated as Link) : l)));
    } else {
      const { data: inserted } = await supabase
        .from("links")
        .insert({ profile_id: profileId, title: data.title, url: data.url, sort_order: links.length + 1 })
        .select()
        .single();
      if (inserted) setLinks((prev) => [...prev, inserted as Link]);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("삭제하시겠어요?")) return;
    const supabase = createClient();
    await supabase.from("links").delete().eq("id", id);
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  async function handleToggle(id: string, active: boolean) {
    const supabase = createClient();
    await supabase.from("links").update({ is_active: active }).eq("id", id);
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, is_active: active } : l)));
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
