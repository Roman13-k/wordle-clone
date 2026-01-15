import { STREAK_LEVELS } from "../data/streakConfig";

export function getStreakLevel(streak: number) {
  return (
    [...STREAK_LEVELS]
      .reverse()
      .find((level) => streak >= level.min) ?? STREAK_LEVELS[0]
  );
}
