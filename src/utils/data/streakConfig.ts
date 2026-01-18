import { Flame, FlameIcon, Sparkles, Zap } from "lucide-react";

export type StreakLevel = {
  min: number;
  color: string;
  Icon: React.ElementType;
};

export const STREAK_LEVELS: StreakLevel[] = [
  {
    min: 0,
    color: "#F97316",
    Icon: Flame,
  },
  {
    min: 7,
    color: "#EA580C",
    Icon: FlameIcon,
  },
  {
    min: 14,
    color: "#EF4444",
    Icon: Zap,
  },
  {
    min: 30,
    color: "#C026D3",
    Icon: Sparkles,
  },
];
