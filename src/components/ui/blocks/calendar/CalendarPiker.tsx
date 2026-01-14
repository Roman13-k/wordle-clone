"use client";
import { useState } from "react";
import { Calendar } from "../../shared/calendar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/stores/gameStore";

export default function CalendarPiker() {
  const router = useRouter();
  const { FIRST_WORD_DATE } = useGameStore();
  const [date, setDate] = useState<Date | undefined>();

  const handleSelect = (d?: Date) => {
    if (!d) return;

    setDate(d);

    const utcDate = new Date(
      Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
    );

    const formatted = format(utcDate, "yyyy-MM-dd");

    router.push(`/game?date=${formatted}`);
  };
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={handleSelect}
      disabled={(date) => date > new Date() || date < new Date(FIRST_WORD_DATE)}
      className="rounded-md border"
      classNames={{
        day_selected: "bg-primary text-primary-foreground hover:bg-primary/90",
        day_today: "border border-primary text-primary font-semibold",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-40",
      }}
    />
  );
}
