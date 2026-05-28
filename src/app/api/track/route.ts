import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const { profileId, linkId } = await req.json();
  if (!profileId) return NextResponse.json({ error: "missing profileId" }, { status: 400 });

  const supabase = await createClient();
  await supabase.from("click_events").insert({
    profile_id: profileId,
    link_id: linkId ?? null,
    referrer: req.headers.get("referer"),
    user_agent: req.headers.get("user-agent"),
  });

  return NextResponse.json({ ok: true });
}
