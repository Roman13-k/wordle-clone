"use client";

import { PropsWithChildren, useEffect } from "react";
import { useToastStore } from "@/stores/toastStore";
import { useGameStore } from "@/stores/gameStore";
import { Spinner } from "../../shared/spinner";
import ErrorComponent from "../../shared/error-component";
import { AlreadyPlayedI, DailyWordI } from "@/interfaces/game";
import { usePostGameResult } from "@/hooks/api/mutations/usePostGameResult";
import { useGetUser } from "@/hooks/api/queries/useGetUser";
import { isAlreadyPlayed } from "@/utils/guards/isAlreadyPlayed";
import AlreadyPlayedCard from "./AlreadyPlayedCard";

type WordHookResult = {
  data?: DailyWordI | AlreadyPlayedI;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  errorUpdateCount?: number;
};

type GameWrapperProps = PropsWithChildren<{
  className?: string;
  useWordHook: () => WordHookResult;
}>;

export default function GameWrapper({
  children,
  className,
  useWordHook,
}: GameWrapperProps) {
  const {
    data,
    isLoading,
    isError,
    refetch,
    errorUpdateCount = 0,
  } = useWordHook();
  const { mutate } = usePostGameResult();
  const { data: user } = useGetUser();
  const setAnswerWord = useGameStore((s) => s.setAnswerWord);
  const gameStatus = useGameStore((s) => s.gameStatus);
  const addToast = useToastStore((s) => s.addToast);

  useEffect(() => {
    if (!data || !user || isAlreadyPlayed(data)) return;

    if (gameStatus === "win" || gameStatus === "lose") {
      mutate({
        is_win: gameStatus === "win",
        game_date: data.date,
        user_id: user.id,
        game_id: data.id,
      });
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
        "error"
      );
    }

    if (data && !isAlreadyPlayed(data) && data?.word) {
      setAnswerWord(data.word);
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
}
