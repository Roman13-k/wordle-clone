import { AlreadyPlayedI, DailyWordI } from "@/interfaces/game";

export function isAlreadyPlayed(
  data: DailyWordI | AlreadyPlayedI
): data is AlreadyPlayedI {
  return "alreadyPlayed" in data;
}
