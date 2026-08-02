export type MaterialIconName =
  | "ac_unit"
  | "add_circle"
  | "analytics"
  | "arrow_forward"
  | "bolt"
  | "calendar_today"
  | "campaign"
  | "flight_takeoff"
  | "group"
  | "info"
  | "lock"
  | "login"
  | "logout"
  | "close"
  | "menu"
  | "military_tech"
  | "monitoring"
  | "newspaper"
  | "open_in_new"
  | "person"
  | "public"
  | "search"
  | "settings"
  | "sports_esports"
  | "swords"
  | "wifi_tethering";

export interface Drill {
  id: string;
  index: string;
  title: string;
  description: string;
  elo: number;
  difficulty: string;
  icon: MaterialIconName;
}

export interface ExternalGame {
  id: "news" | "tickerdle";
  index: string;
  title: string;
  description: string;
  elo: number;
  difficulty: string;
  level: string;
  icon: MaterialIconName;
  href: string;
}

export interface HomeResource {
  label: "Games" | "Learn" | "Blog" | "About";
  href: string;
}

export interface CampusRanking {
  rank: string;
  name: string;
  interest: string;
  score?: number;
}

export interface OperatorSnapshot {
  handle: string;
  level: number;
  xp: number;
  streak: string;
  coins: number;
  quests: number;
}
