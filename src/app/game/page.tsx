import { parseISO, format } from "date-fns";
import { ru } from "date-fns/locale";
import { GameBoard } from "@/components/ui/blocks/game/GameBoard";

interface GamePageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function GamePage({ searchParams }: GamePageProps) {
  const { date: dateParam } = await searchParams;
  const date = dateParam ? new Date(dateParam) : undefined;

  const formattedDate = date
    ? format(date, "d MMMM yyyy", { locale: ru })
    : "сегодня";

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Слово дня</h1>
        <p className="text-sm text-muted-foreground">
          Загаданное слово за {formattedDate}
        </p>
      </div>

      <GameBoard
        date={date}
        className="flex flex-col gap-6 h-full items-center justify-center"
      />
    </div>
  );
}
