export const dailyWordKeys = {
  all: ["daily-word"] as const,

  today: () => [...dailyWordKeys.all, "today"] as const,

  byDate: (date: Date) =>
    [...dailyWordKeys.all, date.toISOString().slice(0, 10)] as const,
};

export const userKeys = {
  all: ["user"] as const,

  me: () => [...userKeys.all, "me"] as const,

  stats: (userId?: string) => [...userKeys.all, "stats", userId] as const,

  gamesByRange: (userId?: string, startOfRange?: string, endOfRange?: string) =>
    [...userKeys.all, "games", userId, startOfRange, endOfRange] as const,
};
