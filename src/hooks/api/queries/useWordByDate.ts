import { getWordByDate } from "@/client/words/getWordByDate";
import { useQuery } from "@tanstack/react-query";
import { dailyWordKeys } from "../keys";
import { getUTCToday } from "@/utils/functions/getUTCToday";
import { msUntilNextUTCDay } from "@/utils/functions/msUntilNextUTCDay";

export const useWordByDate = (date: Date) =>
  useQuery({
    queryKey: dailyWordKeys.byDate(date),
    queryFn: () => getWordByDate(date),
    staleTime: Infinity,
  });

export const useTodayWord = () => {
  return useQuery({
    queryKey: dailyWordKeys.today(),
    queryFn: () => getWordByDate(getUTCToday()),
    staleTime: msUntilNextUTCDay(),
  });
};
