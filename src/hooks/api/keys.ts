export const dailyWordKeys = {
  all: ["daily-word"] as const,
  
  today: () =>
    [...dailyWordKeys.all, "today"] as const,

  byDate: (date: Date) =>
    [...dailyWordKeys.all, date.toISOString().slice(0, 10)] as const,
};
