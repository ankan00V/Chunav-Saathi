export interface Badge {
  emoji: string;
  label: string;
  id: string;
}

export interface QuizQuestion {
  q: string;
  opts: string[];
  ans: number;
  explain: string;
}

export interface PhaseInfo {
  pills: string[];
  body: string;
  steps?: { title: string; desc: string }[];
}

export interface Phase {
  id: string;
  name: string;
  icon: string;
  color: string;
  bg: string;
  shadow: string;
  glow: string;
  xp: number;
  info: PhaseInfo;
  badge: Badge;
  quiz: QuizQuestion[];
}

export interface Rank {
  min: number;
  name: string;
}
