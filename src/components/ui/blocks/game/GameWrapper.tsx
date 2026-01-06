"use client";
import { useTodayWord } from "@/hooks/api/queries/useWordByDate";
import { useGameStore } from "@/stores/gameStore";
import { PropsWithChildren, useEffect } from "react";

export default function GameWrapper({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const { data, isLoading, isError } = useTodayWord();
  const setAnswerWord = useGameStore((s) => s.setAnswerWord);

  useEffect(() => {
    if (data?.word) {
      setAnswerWord(data.word);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  if (isError || !data) return <div>Error</div>;

  return <div className={className}>{children}</div>;
}
