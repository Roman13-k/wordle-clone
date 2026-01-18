"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shared/dialog";
import Streak from "./Streak";
import { UserI } from "@/interfaces/user";
import { Progress } from "@/components/ui/shared/progress";
import { getStreakLevel } from "@/utils/functions/getStreakLevel";
import FlameWaveProgress from "./FlameWaveProgress";

export default function StreakModal({
  current_streak,
  last_played_date,
}: Pick<UserI, "current_streak" | "last_played_date">) {
  const { currentLevel, nextLevel } = getStreakLevel(current_streak);
  const progress = (current_streak / nextLevel.min) * 100;

  return (
    <Dialog>
      <DialogTrigger>
        <Streak
          level={currentLevel}
          current_streak={current_streak}
          last_played_date={last_played_date}
        />
      </DialogTrigger>

      <DialogContent className="min-w-130">
        <DialogHeader>
          <DialogTitle className="text-center">Серия дней</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-2">
          <FlameWaveProgress color={currentLevel.color} percent={progress} />

          <div className="text-2xl font-bold">
            <span className={currentLevel.twColor}>{current_streak}</span>
            <span className="text-muted-foreground"> / {nextLevel.min}</span>
          </div>

          <div className="w-full flex items-center gap-2">
            <Progress value={progress} className="w-[65%]" />

            <div className="text-right text-sm">
              <p className="font-medium">Следующий уровень</p>
              <p className="text-muted-foreground">
                Осталось {nextLevel.min - current_streak} дня
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Играйте каждый день, чтобы усиливать огонь
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
