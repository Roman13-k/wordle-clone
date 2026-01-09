"use client";
import { useGameStore } from "@/stores/gameStore";
import { LETTERCOLOR, LetterState } from "@/types/game";
import { keysData } from "@/utils/data/keys";
import { useCallback, useEffect } from "react";

export default function Keys() {
  const { addLetter, submitWord, deleteLetter, isInputBlock, guessesMatrix } =
    useGameStore();

  const handleClick = (onClick: () => void) => {
    if (isInputBlock) return;
    onClick();
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isInputBlock) return;
      if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) return;

      const key = e.key.toUpperCase();

      if (key.length === 1 && key >= "A" && key <= "Z") {
        addLetter(key);
      } else if (e.key === "Enter") {
        submitWord();
      } else if (e.key === "Backspace") {
        deleteLetter();
      }
    },
    [addLetter, submitWord, deleteLetter, isInputBlock]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section className="relative flex flex-wrap items-center justify-center max-w-121 gap-2 z-20">
      {keysData.map((k, i) => {
        let state: LetterState | null = null;

        for (const row of guessesMatrix) {
          row.letters.forEach((l, i) => {
            if (l !== k.value) return;

            state = row.states[i];
          });
        }

        const color = state ? LETTERCOLOR[state] : null;
        return (
          <button
            key={i}
            className={`${
              color ? color : " bg-sidebar-ring/40"
            } font-bold text-xl cursor-pointer p-3 border border-sidebar-border rounded-sm active:translate-y-1 active:scale-95 transition duration-200`}
            onClick={() => handleClick(k.onClick)}
          >
            {k.value}
          </button>
        );
      })}
    </section>
  );
}
