"use client";

import Plates from "@/components/ui/blocks/game/Plates";
import Keys from "@/components/ui/blocks/game/Keys";
import GameWrapper from "./GameWrapper";
import { useTodayWord, useWordByDate } from "@/hooks/api/queries/useWordByDate";
import ResultModal from "./modals/ResultModal";
import ConfirmModal from "./modals/ConfirmModal";
import { useGetUser } from "@/hooks/api/queries/useGetUser";

interface GameBoardProps {
  className?: string;
  date?: Date;
}

export function GameBoard({ className, date }: GameBoardProps) {
  const { data: user } = useGetUser();
  const useWordHook = date
    ? () => useWordByDate(date, user?.id)
    : () => useTodayWord(user?.id);

  return (
    <>
      <GameWrapper className={className} useWordHook={useWordHook}>
        <Plates />
        <Keys />
      </GameWrapper>

      <ResultModal />
      <ConfirmModal />
    </>
  );
}
