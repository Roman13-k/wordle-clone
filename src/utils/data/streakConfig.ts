import {
  Flame,
  FlameIcon,
  Sparkles,
  Zap,
} from "lucide-react";

export type StreakLevel = {
  min: number;
  color: string;
  Icon: React.ElementType;
};

export const STREAK_LEVELS: StreakLevel[] = [
  {
    min: 0,
    color: "text-orange-400",
    Icon: Flame,
  },
  {
    min: 7,
    color: "text-orange-500",
    Icon: FlameIcon,
  },
  {
    min: 14,
    color: "text-red-500",
    Icon: Zap,
  },
  {
    min: 30,
    color: "text-fuchsia-500",
    Icon: Sparkles,
  },
];
