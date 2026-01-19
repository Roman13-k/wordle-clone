"use client";
import { useGameStore } from "@/stores/gameStore";
import { LetterState } from "@/types/game";
import { memo, useCallback, useEffect } from "react";
import { KEYS } from "@/utils/data/keys";
import KeyButton from "./KeyButton";

const Keys = memo(() => {
  const { addLetter, submitWord, deleteLetter, isInputBlock, guessesMatrix } =
    useGameStore();

  const handleKeyClick = useCallback(
    (key: (typeof KEYS)[number]) => {
      if (isInputBlock) return;

      if (key.type === "letter" && typeof key.value === "string")
        addLetter(key.value);
      else if (key.type === "enter") submitWord();
      else if (key.type === "delete") deleteLetter();
    },
    [addLetter, submitWord, deleteLetter, isInputBlock],
  );

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
    [addLetter, submitWord, deleteLetter, isInputBlock],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section className="relative flex flex-wrap items-center justify-center max-w-121 gap-2 z-20">
      {KEYS.map((k) => {
        let state: LetterState | null = null;
        if (k.type === "letter" && typeof k.value === "string") {
          for (const row of guessesMatrix) {
            row.letters.forEach((l, i) => {
              if (l === k.value) state = row.states[i];
            });
          }
        }

        return (
          <KeyButton
            key={typeof k.value === "string" ? k.value : k.type}
            value={k.value}
            state={state}
            onClick={() => handleKeyClick(k)}
          />
        );
      })}
    </section>
  );
});

Keys.displayName = "Keys";
export default Keys;
