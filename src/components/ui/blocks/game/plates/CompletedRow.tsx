"use client";
import { memo } from "react";
import PlateCell from "./PlateCell";
import { LETTERCOLOR, LetterState } from "@/types/game";
import { MAX_WORD_LENGTH } from "@/utils/data/gameConfig";

interface CompletedRowProps {
  row: string[];
  states: LetterState[];
}

const CompletedRow = memo(({ row, states }: CompletedRowProps) => {
  return (
    <div className="grid grid-cols-5 gap-1">
      {Array.from({ length: MAX_WORD_LENGTH }, (_, colIndex) => {
        const letter = row[colIndex] ?? "";
        const color = LETTERCOLOR[states[colIndex]];

        return (
          <PlateCell
            key={colIndex}
            letter={letter}
            color={color}
            flip={true}
            delay={0.1 * colIndex}
          />
        );
      })}
    </div>
  );
});

CompletedRow.displayName = "CompletedRow";
export default CompletedRow;
