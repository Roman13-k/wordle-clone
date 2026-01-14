import { Card, CardContent } from "@/components/ui/shared/card";
import { Gamepad2, Info, ArrowRight } from "lucide-react";
import CalendarPiker from "./CalendarPiker";

export default function InfoCalendarCard() {
  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-xl space-y-4">
        <CardContent className="space-y-6">
          <div className="rounded-md border bg-muted/50 p-3 text-sm">
            <div className="flex gap-2">
              <Info className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <p className="text-muted-foreground">
                Выберите дату в календаре — вы сразу попадёте в игру с тем
                словом, которое было загадано в этот день.
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <CalendarPiker />
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-primary" />
                <span>Выбранная дата</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full border border-primary" />
                <span>Сегодняшний день</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-muted-foreground/40" />
                <span>Недоступные даты (будущее)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-md bg-muted p-3 text-sm">
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4 text-primary" />
              <span>Каждый день — новое слово</span>
            </div>

            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
