"use client";
import { memo } from "react";
import { useGameStore } from "@/stores/gameStore";
import { MAX_TRYS } from "@/utils/data/gameConfig";
import CurrentRow from "./CurrentRow";
import CompletedRow from "./CompletedRow";

const Plates = memo(() => {
  const guessesMatrix = useGameStore((state) => state.guessesMatrix);

  return (
    <section className="grid gap-1">
      {Array.from({ length: MAX_TRYS }, (_, rowIndex) => {
        const isCurrent = guessesMatrix.length === rowIndex;

        if (isCurrent) {
          return <CurrentRow key={rowIndex} />;
        }

        const row = guessesMatrix[rowIndex];
        return (
          <CompletedRow
            key={rowIndex}
            row={row?.letters ?? []}
            states={row?.states ?? []}
          />
        );
      })}
    </section>
  );
});

export default Plates;
