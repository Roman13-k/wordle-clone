import { UserI } from "@/interfaces/user";
import { StreakLevel } from "@/utils/data/streakConfig";
import { getStreakLevel } from "@/utils/functions/getStreakLevel";
import { getUTCToday } from "@/utils/functions/getUTCToday";
import clsx from "clsx";

export default function Streak({
  current_streak,
  last_played_date,
  level,
}: Pick<UserI, "current_streak" | "last_played_date"> & {
  level: StreakLevel;
}) {
  const Icon = level?.Icon;

  const playedToday =
    getUTCToday().toISOString() === new Date(last_played_date).toISOString();

  return (
    <div className="flex items-center gap-0.5 cursor-pointer">
      <Icon
        className={clsx(
          "h-6 w-6 transition-all",
          playedToday ? level.color : "text-muted-foreground opacity-60",
        )}
      />

      <span className={`${playedToday ? level.color : ""} text-lg font-bold`}>
        {current_streak}
      </span>
    </div>
  );
}
