import InfoCalendarCard from "@/components/ui/blocks/calendar/InfoCalendarCard";
import { CalendarDays } from "lucide-react";

export default function CalendarPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Архив слов</h1>
        </div>

        <p className="text-muted-foreground max-w-xl">
          Выберите любую прошедшую дату, чтобы сыграть в Wordle со словом,
          которое было загадано в тот день.
        </p>
      </div>
      <InfoCalendarCard />
    </div>
  );
}
