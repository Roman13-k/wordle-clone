"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { parseISO, format } from "date-fns";
import { ru } from "date-fns/locale";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/shared/card";
import { Button } from "@/components/ui/shared/buttons/button";
import { CalendarDays, CheckCircle2, XCircle } from "lucide-react";

export default function AlreadyPlayedCard({ isWin }: { isWin: boolean }) {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");

  const date = dateParam ? parseISO(dateParam) : null;
  const formattedDate = date
    ? format(date, "d MMMM yyyy", { locale: ru })
    : null;

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">
          {date ? `Вы уже играли ${formattedDate}` : "Вы уже играли сегодня"}
        </CardTitle>

        <CardDescription>
          {date
            ? "Слово за эту дату уже было сыграно"
            : "Сегодняшнее слово уже было сыграно"}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          {isWin ? (
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          ) : (
            <XCircle className="h-6 w-6 text-red-500" />
          )}

          <span
            className={`text-lg font-semibold ${
              isWin ? "text-green-500" : "text-red-500"
            }`}
          >
            {isWin ? "Победа" : "Поражение"}
          </span>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          Перейдите в календарь, чтобы выбрать другую дату.
        </p>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button asChild variant="outline">
          <Link href="/calendar" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Открыть календарь
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
