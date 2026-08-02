import type { CampusRanking, Drill, OperatorSnapshot } from "@/types/venator";

export const operator: OperatorSnapshot = {
  handle: "Operator_01",
  level: 42,
  xp: 300,
  streak: "2d",
  coins: 100,
  quests: 2,
};

export const commandCenterResources = {
  markets: [
    { label: "US", flag: "🇺🇸", href: "https://www.opentrade.live/?market=us" },
    { label: "India", flag: "🇮🇳", href: "https://www.opentrade.live/?market=india" },
  ],
  discord: {
    label: "Join Discord",
    href: "https://discord.gg/bt2YuTNcbK",
  },
  disclosure:
    "OpenTrade is a product preview, not investment advice. Investing involves risk, including possible loss of principal.",
  legal: {
    label: "Legal disclosures",
    href: "https://www.opentrade.live/legal",
  },
} as const;

export const drills: Drill[] = [
  {
    id: "higher-lower",
    index: "01",
    title: "Higher / Lower",
    description: "Compare MCA company facts.",
    elo: 1389,
    difficulty: "Easy 1/12",
    icon: "monitoring",
  },
  {
    id: "runway",
    index: "02",
    title: "Runway",
    description: "Trace Indian sector exposure.",
    elo: 1634,
    difficulty: "Easy 2/12",
    icon: "analytics",
  },
  {
    id: "news",
    index: "03",
    title: "News",
    description: "Match headlines to companies.",
    elo: 1500,
    difficulty: "Easy 1/12",
    icon: "newspaper",
  },
  {
    id: "tickerdle",
    index: "04",
    title: "Tickerdle",
    description: "Use state and exchange clues.",
    elo: 1500,
    difficulty: "Easy 1/12",
    icon: "search",
  },
];

export const rankings: CampusRanking[] = [
  { rank: "01", name: "Indian Institute of Technology Madras", interest: "3 interested", score: 30 },
  { rank: "02", name: "Indian Institute of Technology Delhi", interest: "2 interested", score: 20 },
  { rank: "03", name: "dau.ac.in", interest: "1 interested" },
  { rank: "04", name: "Hindu College", interest: "1 interested" },
  { rank: "05", name: "pec.edu.in", interest: "1 interested" },
  { rank: "06", name: "slur.edu", interest: "1 interested" },
  { rank: "07", name: "srcc.edu", interest: "1 interested" },
  { rank: "08", name: "student.unimelb.edu.au", interest: "1 interested" },
  { rank: "09", name: "University of New South Wales", interest: "1 interested" },
];

export const milestones = [
  { name: "Tickerdle", level: 10 },
  { name: "Higher or Lower", level: 20 },
  { name: "Runway", level: 30 },
  { name: "News Reaction", level: 40 },
] as const;
