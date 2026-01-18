"use client";

import Plates from "@/components/ui/blocks/game/Plates";
import Keys from "@/components/ui/blocks/game/Keys";
import GameWrapper from "./GameWrapper";
import { useTodayWord, useWordByDate } from "@/hooks/api/queries/useWordByDate";
import ResultModal from "./modals/ResultModal";
import ConfirmModal from "./modals/ConfirmModal";
import { useGetUser } from "@/hooks/api/queries/useGetUser";
import Stopwatch from "../../shared/stopwatch";
import { useGameStore } from "@/stores/gameStore";
import { useStopwatch } from "@/hooks/useStopWatch";
import { useSaveCurrentGuess } from "@/hooks/useSaveCurrentGuess";
import { useEffect } from "react";

interface GameBoardProps {
  className?: string;
  date?: Date;
}

export function GameBoard({ className, date }: GameBoardProps) {
  const { data: user } = useGetUser();
  const { gameStatus } = useGameStore();
  const useWordHook = date
    ? () => useWordByDate(date, user?.id)
    : () => useTodayWord(user?.id);
  const { time, isRunning, start, pause, reset } = useStopwatch();
  const [isConfirmModal, setIsConfirmModal] = useSaveCurrentGuess();

  useEffect(() => {
    if (isConfirmModal === "rejected") {
      reset();
    }
  }, [isConfirmModal]);

  return (
    <>
      <GameWrapper
        resetTimer={reset}
        time={time}
        className={className + "relative"}
        useWordHook={useWordHook}
      >
        <Plates />
        <Keys />
        {gameStatus === "playing" && (
          <Stopwatch
            time={time}
            isRunning={isRunning}
            start={start}
            pause={pause}
            reset={reset}
            className="absolute top-22 right-0"
          />
        )}
      </GameWrapper>

      <ResultModal />
      <ConfirmModal
        isConfirmModal={isConfirmModal}
        setIsConfirmModal={setIsConfirmModal}
      />
    </>
  );
}
