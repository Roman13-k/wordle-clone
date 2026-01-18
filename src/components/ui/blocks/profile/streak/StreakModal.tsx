"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shared/dialog";
import { Flame } from "lucide-react";
import Streak from "./Streak";
import { UserI } from "@/interfaces/user";
import { Progress } from "@/components/ui/shared/progress";
import { getStreakLevel } from "@/utils/functions/getStreakLevel";

export default function StreakModal({
  current_streak,
  last_played_date,
}: Pick<UserI, "current_streak" | "last_played_date">) {
  const { currentLevel, nextLevel } = getStreakLevel(current_streak);

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

        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <Flame className="h-24 w-24 text-orange-500 z-10 relative" />

            <div className="absolute inset-0 rounded-full animate-pulse bg-orange-400/20 blur-xl" />
          </div>

          <div className="text-2xl font-bold">
            <span className="text-orange-500">{current_streak}</span>
            <span className="text-muted-foreground"> / {nextLevel.min}</span>
          </div>

          <div className="w-full flex items-center gap-2">
            <Progress
              value={(current_streak / nextLevel.min) * 100}
              className="w-[65%]"
            />

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
