"use client";

import Plates from "@/components/ui/blocks/game/plates/Plates";
import Keys from "@/components/ui/blocks/game/keys/Keys";
import GameWrapper from "./GameWrapper";
import { useTodayWord, useWordByDate } from "@/hooks/api/queries/useWordByDate";
import ResultModal from "./modals/ResultModal";
import ConfirmModal from "./modals/ConfirmModal";
import { useGetUser } from "@/hooks/api/queries/useGetUser";
import { useSaveCurrentGuess } from "@/hooks/useSaveCurrentGuess";
import { useCallback, useEffect } from "react";
import StopwatchContainer from "./StopwatchContainer";
import { useGameStore } from "@/stores/gameStore";

interface GameBoardProps {
  className?: string;
  date?: Date;
}

export function GameBoard({ className, date }: GameBoardProps) {
  const { data: user } = useGetUser();
  const useWordHook = useCallback(() => {
    return date ? useWordByDate(date, user?.id) : useTodayWord(user?.id);
  }, [date, user?.id]);
  const [isConfirmModal, setIsConfirmModal] = useSaveCurrentGuess();
  const resetTimer = useGameStore.getState().resetTimer;

  useEffect(() => {
    if (isConfirmModal === "rejected") {
      resetTimer?.();
    }
  }, [isConfirmModal]);

  return (
    <GameWrapper className={className + "relative"} useWordHook={useWordHook}>
      <Plates />
      <Keys />

      <StopwatchContainer />

      <ResultModal />
      <ConfirmModal
        isConfirmModal={isConfirmModal}
        setIsConfirmModal={setIsConfirmModal}
      />
    </GameWrapper>
  );
}
