"use client";

import { memo, PropsWithChildren, useEffect } from "react";
import { useToastStore } from "@/stores/toastStore";
import { useGameStore } from "@/stores/gameStore";
import { Spinner } from "../../shared/spinner";
import ErrorComponent from "../../shared/error-component";
import { AlreadyPlayedI, DailyWordI } from "@/interfaces/game";
import { usePostGameResult } from "@/hooks/api/mutations/usePostGameResult";
import { useGetUser } from "@/hooks/api/queries/useGetUser";
import { isAlreadyPlayed } from "@/utils/guards/isAlreadyPlayed";
import AlreadyPlayedCard from "./AlreadyPlayedCard";

interface WordHookResult {
  data?: DailyWordI | AlreadyPlayedI;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  errorUpdateCount?: number;
}

type GameWrapperProps = PropsWithChildren<{
  className?: string;
  useWordHook: () => WordHookResult;
}>;

const GameWrapper = memo(
  ({ children, className, useWordHook }: GameWrapperProps) => {
    const {
      data,
      isLoading,
      isError,
      refetch,
      errorUpdateCount = 0,
    } = useWordHook();
    const { mutate } = usePostGameResult();
    const { data: user } = useGetUser();
    const gameStatus = useGameStore((state) => state.gameStatus);
    const guessesMatrix = useGameStore((state) => state.guessesMatrix);
    const setDate = useGameStore((s) => s.setDate);
    const setHintsFromServer = useGameStore((s) => s.setHintsFromServer);
    const addToast = useToastStore((s) => s.addToast);

    const getCompletionTime = useGameStore.getState().getCompletionTime;
    const resetTimer = useGameStore.getState().resetTimer;

    useEffect(() => {
      if (!data || isAlreadyPlayed(data)) return;
      setDate(data.date);
      setHintsFromServer(data.hints);
    }, [data]);

    useEffect(() => {
      if (!data || !user || isAlreadyPlayed(data)) return;

      if (gameStatus === "win" || gameStatus === "lose") {
        const time = getCompletionTime?.() ?? 0;
        mutate({
          is_win: gameStatus === "win",
          game_date: data.date,
          user_id: user.id,
          game_id: data.id,
          num_rows_used: guessesMatrix.length,
          completion_time_sec: time,
        });

        resetTimer?.();
      }
      if (gameStatus === "playing") {
        refetch();
      }
    }, [gameStatus]);

    useEffect(() => {
      if (isError) {
        addToast(
          "Ошибка загрузки данных",
          "Не удалось получить данные с сервера. Проверьте подключение к интернету и попробуйте ещё раз.",
          "error",
        );
      }
    }, [data, isError]);

    if (isLoading && errorUpdateCount < 1)
      return (
        <div className={className}>
          <Spinner className="size-7" />
        </div>
      );

    if (isError || !data)
      return (
        <div className={className}>
          <ErrorComponent isLoading={isLoading} onRetry={() => refetch()} />
        </div>
      );

    if (isAlreadyPlayed(data)) {
      return (
        <div className={className}>
          <AlreadyPlayedCard isWin={data.is_win} />
        </div>
      );
    }

    return <div className={className}>{children}</div>;
  },
);

GameWrapper.displayName = "GameWrapper";
export default GameWrapper;
