export interface Profile {
  id: string;
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string | null;
  is_public: boolean;
  theme: ThemeConfig;
  created_at: string;
}

export interface Link {
  id: string;
  profile_id: string;
  title: string;
  url: string;
  icon_url: string | null;
  is_active: boolean;
  sort_order: number;
  scheduled_at: string | null;
  expires_at: string | null;
  created_at: string;
}

export interface ThemeConfig {
  bg: string;
  buttonStyle: "rounded" | "square" | "shadow";
  buttonColor: string;
  buttonTextColor: string;
  font: string;
}

export interface ClickEvent {
  id: string;
  profile_id: string;
  link_id: string | null;
  referrer: string;
  user_agent: string;
  created_at: string;
}
