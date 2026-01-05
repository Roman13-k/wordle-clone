"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shared/dialog";
import { Button } from "@/components/ui/shared/button";
import { useGameStore } from "@/stores/gameStore";
import { useEffect, useState } from "react";
import { RESULT_CONFIG } from "@/utils/data/resultСonfig";
import { isResultStatus } from "@/utils/guards/isResultStatus";

export default function ResultModal() {
  const { answerWord, resetGame } = useGameStore();
  const gameStatus = useGameStore((s) => s.gameStatus);
  const [open, setOpen] = useState(false);
  const isOpen = isResultStatus(gameStatus);

  useEffect(() => {
    if (!isOpen) {
      setOpen(false);
      return;
    }
    const timer = setTimeout(() => setOpen(isOpen), 700);
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isResultStatus(gameStatus)) return null;

  const config = RESULT_CONFIG[gameStatus];
  const Icon = config.icon;

  return (
    <Dialog open={open} onOpenChange={() => resetGame()}>
      <DialogContent>
        <DialogHeader className="text-center">
          <div
            className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full ${config.iconBg}`}
          >
            <Icon className={config.iconClass} />
          </div>

          <DialogTitle className="text-xl">{config.title}</DialogTitle>

          <DialogDescription className="mt-1">
            {config.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex justify-center">
          <div className="rounded-md border border-border bg-muted px-6 py-2 text-lg font-mono tracking-widest">
            {answerWord.toUpperCase()}
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          {config.hint}
        </div>

        <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-col">
          <Button className="w-full">Зарегистрироваться</Button>
          <Button variant="ghost" className="w-full" onClick={resetGame}>
            Играть снова
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
