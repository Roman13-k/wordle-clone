import { Flame, FlameIcon, Sparkles, Zap } from "lucide-react";

export type StreakLevel = {
  min: number;
  color: string;
  twColor: string;
  Icon: React.ElementType;
};

export const STREAK_LEVELS: StreakLevel[] = [
  {
    min: 0,
    color: "oklch(75% 0.183 55.934)",
    twColor: "text-orange-400",
    Icon: Flame,
  },
  {
    min: 7,
    color: "oklch(70.5% 0.213 47.604)",
    twColor: "text-orange-500",
    Icon: FlameIcon,
  },
  {
    min: 14,
    color: "oklch(63.7% 0.237 25.331)",
    twColor: "text-red-500",
    Icon: Zap,
  },
  {
    min: 30,
    color: "oklch(66.7% 0.295 322.15)",
    twColor: "text-fuchsia-500",
    Icon: Sparkles,
  },
];
