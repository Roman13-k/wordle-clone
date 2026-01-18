import { STREAK_LEVELS } from "../data/streakConfig";

export function getStreakLevel(streak: number) {
  const levels = [...STREAK_LEVELS];

  const currentIndex = levels
    .map((level) => streak >= level.min)
    .lastIndexOf(true);

  const currentLevel = currentIndex !== -1 ? levels[currentIndex] : levels[0];
  const nextLevel = levels[currentIndex + 1] ?? null;

  return {
    currentLevel,
    nextLevel,
  };
}
