"use client";

import { Card, CardContent } from "@/components/ui/shared/card";
import { Button } from "@/components/ui/shared/button";
import { Clock, Play, Pause, RefreshCw } from "lucide-react";
import { minSecFormat } from "@/utils/functions/minSecFormat";

type StopwatchProps = {
  time: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  className?: string;
};

export default function Stopwatch({
  time,
  isRunning,
  start,
  pause,
  reset,
  className = "",
}: StopwatchProps) {
  return (
    <Card className={`${className} py-1 w-52 border`}>
      <CardContent className="flex items-center justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="font-mono text-sm text-muted-foreground">
            {minSecFormat(time)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {isRunning ? (
            <Button size="icon" variant="outline" onClick={pause} title="Пауза">
              <Pause className="h-3 w-3" />
            </Button>
          ) : (
            <Button size="icon" variant="outline" onClick={start} title="Старт">
              <Play className="h-3 w-3" />
            </Button>
          )}

          <Button size="icon" variant="outline" onClick={reset} title="Сброс">
            <RefreshCw className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
