"use client";
import { useEffect, useState } from "react";
import { Calendar } from "../../shared/calendar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/stores/gameStore";
import { ru } from "date-fns/locale";
import { getUTCToday } from "@/utils/functions/getUTCToday";
import { getCalendarVisibleRange } from "@/utils/functions/getCalendarVisibleRange";
import { useGetUserGamesByRange } from "@/hooks/api/queries/useGetUserGamesByRange";
import { useGetUser } from "@/hooks/api/queries/useGetUser";
import { Skeleton } from "../../shared/skeleton";

export default function CalendarPiker() {
  const router = useRouter();
  const { data: user,isLoading: isUserLoading } = useGetUser();
  const { FIRST_WORD_DATE } = useGameStore();
  const [date, setDate] = useState<Date | undefined>();
  const [month, setMonth] = useState(new Date());
  const [range, setRange] = useState(() => {
    const r = getCalendarVisibleRange(new Date());
    return {
      start: format(r.start, "yyyy-MM-dd"),
      end: format(r.end, "yyyy-MM-dd"),
    };
  });
  const { data,isLoading: isUserGamesLoading } = useGetUserGamesByRange(range.start, range.end, user?.id);

  const handleSelect = (d?: Date) => {
    if (!d) return;

    setDate(d);

    const utcDate = new Date(
      Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
    );
    const formatted = format(utcDate, "yyyy-MM-dd");
    router.push(`/game?date=${formatted}`);
  };

  useEffect(() => {
    const r = getCalendarVisibleRange(month);

    setRange({
      start: format(r.start, "yyyy-MM-dd"),
      end: format(r.end, "yyyy-MM-dd"),
    });
  }, [month]);

  const winDays = new Set(
    data?.filter((g) => g.is_win).map((g) => g.game_date)
  );
  const loseDays = new Set(
    data?.filter((g) => !g.is_win).map((g) => g.game_date)
  );

  if(isUserLoading || isUserGamesLoading) return <Skeleton className="rounded-md w-60 h-60"/>

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={handleSelect}
      locale={ru}
      disabled={(d) =>
        d.setHours(0, 0, 0, 0) > getUTCToday().setHours(0, 0, 0, 0) ||
        d.setHours(0, 0, 0, 0) < new Date(FIRST_WORD_DATE).setHours(0, 0, 0, 0)
      }
      month={month}
      onMonthChange={setMonth}
      className="rounded-md border"
      classNames={{
        day_selected: "bg-primary text-primary-foreground hover:bg-primary/90",
        day_today: "border border-primary text-primary font-semibold",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-40",
        day: "m-0.5",
      }}
      modifiers={{
        win: (d) => winDays.has(format(d, "yyyy-MM-dd")),
        lose: (d) => loseDays.has(format(d, "yyyy-MM-dd")),
      }}
      modifiersClassNames={{
        win: "bg-primary text-white hover:bg-primary/90 rounded-md",
        lose: "bg-red-500 text-white hover:bg-red-600/90 rounded-md",
      }}
    />
  );
}
