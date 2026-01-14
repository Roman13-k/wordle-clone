"use client";

import { PropsWithChildren, useEffect } from "react";
import { useToastStore } from "@/stores/toastStore";
import { useGameStore } from "@/stores/gameStore";
import { Spinner } from "../../shared/spinner";
import ErrorComponent from "../../shared/error-component";

type WordHookResult = {
  data?: { word: string };
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
  const setAnswerWord = useGameStore((s) => s.setAnswerWord);
  const addToast = useToastStore((s) => s.addToast);

  useEffect(() => {
    if (isError) {
      addToast(
        "Ошибка загрузки данных",
        "Не удалось получить данные с сервера. Проверьте подключение к интернету и попробуйте ещё раз.",
        "error"
      );
    }

    if (data?.word) {
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

  return <div className={className}>{children}</div>;
}
