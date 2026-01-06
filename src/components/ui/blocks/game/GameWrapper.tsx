"use client";
import { useTodayWord } from "@/hooks/api/queries/useWordByDate";
import { useGameStore } from "@/stores/gameStore";
import { PropsWithChildren, useEffect } from "react";
import { Spinner } from "../../shared/spinner";
import { useToastStore } from "@/stores/toastStore";
import ErrorComponent from "../../shared/error-component";

export default function GameWrapper({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const { data, isLoading, isError, errorUpdateCount, refetch } =
    useTodayWord();
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
