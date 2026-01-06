export function msUntilNextUTCDay() {
  const now = new Date();

  const nextUTCMidnight = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1
  );

  return nextUTCMidnight - now.getTime();
}
