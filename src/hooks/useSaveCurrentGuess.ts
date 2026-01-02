"use client";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { ConfirmType } from "@/types";
import { useGameStore } from "@/stores/gameStore";

export function useSaveCurrentGuess() {
  const { guessesMatrix, setMatrix } = useGameStore();
  const [savedGuess, setSavedGuess] = useLocalStorage(
    "guessMatrix",
    guessesMatrix
  );
  const [isConfirmModal, setIsConfirmModal] = useState<
    "close" | "open" | ConfirmType
  >(() => {
    return savedGuess && savedGuess.length ? "open" : "close";
  });

  useEffect(() => {
    const handleBeforeUnload = () => {
      setSavedGuess(guessesMatrix);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [guessesMatrix]);

  useEffect(() => {
    switch (isConfirmModal) {
      case "success": {
        if (savedGuess && savedGuess.length) {
          setMatrix(savedGuess);
        }
        break;
      }
      case "rejected": {
        setSavedGuess([]);
        break;
      }
    }
  }, [isConfirmModal]);

  return [isConfirmModal, setIsConfirmModal] as const;
}
