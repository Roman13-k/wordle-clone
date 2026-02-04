"use client";
import { memo } from "react";
import { useGameStore } from "@/stores/gameStore";
import PlateCell from "./PlateCell";
import { MAX_WORD_LENGTH } from "@/utils/data/gameConfig";
import { Skeleton } from "@/components/ui/shared/skeleton";

const CurrentRow = memo(() => {
  const currentWord = useGameStore((state) => state.currentWord);
  const error = useGameStore((state) => state.error);
  const isLoading = useGameStore((state) => state.isLoading);

  return (
    <div className={`${error ? "error_animation" : ""} grid grid-cols-5 gap-1`}>
      {Array.from({ length: MAX_WORD_LENGTH }, (_, colIndex) => {
        if (isLoading) {
          return (
            <Skeleton
              key={colIndex}
              className="w-15.5 h-15.5 rounded-lg bg-black/40 dark:bg-white/40"
            />
          );
        }

        const letter = currentWord[colIndex] ?? "";

        return (
          <PlateCell
            key={colIndex}
            letter={letter}
            color={undefined}
            flip={false}
            delay={0}
          />
        );
      })}
    </div>
  );
});

CurrentRow.displayName = "CurrentRow";
export default CurrentRow;
