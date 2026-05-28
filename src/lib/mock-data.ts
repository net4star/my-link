import type { Link } from "@/types";

export const DEMO_LINKS: Link[] = [
  { id: "1", profile_id: "demo", title: "GitHub",      url: "#", icon_url: null, is_active: true, sort_order: 1, scheduled_at: null, expires_at: null, created_at: "" },
  { id: "2", profile_id: "demo", title: "LinkedIn",    url: "#", icon_url: null, is_active: true, sort_order: 2, scheduled_at: null, expires_at: null, created_at: "" },
  { id: "3", profile_id: "demo", title: "Instagram",   url: "#", icon_url: null, is_active: true, sort_order: 3, scheduled_at: null, expires_at: null, created_at: "" },
  { id: "4", profile_id: "demo", title: "Twitter / X", url: "#", icon_url: null, is_active: false, sort_order: 4, scheduled_at: null, expires_at: null, created_at: "" },
  { id: "5", profile_id: "demo", title: "Email",       url: "mailto:demo@example.com", icon_url: null, is_active: true, sort_order: 5, scheduled_at: null, expires_at: null, created_at: "" },
];

export const MOCK_ANALYTICS = {
  totalViews: 1240,
  totalClicks: 380,
  daily: [
    { date: "5/22", views: 140, clicks: 45 },
    { date: "5/23", views: 165, clicks: 52 },
    { date: "5/24", views: 132, clicks: 38 },
    { date: "5/25", views: 189, clicks: 61 },
    { date: "5/26", views: 210, clicks: 72 },
    { date: "5/27", views: 198, clicks: 65 },
    { date: "5/28", views: 206, clicks: 47 },
  ],
  byLink: [
    { title: "GitHub",      clicks: 210 },
    { title: "LinkedIn",    clicks: 170 },
    { title: "Instagram",   clicks: 95  },
    { title: "Email",       clicks: 60  },
    { title: "Twitter / X", clicks: 25  },
  ],
};
