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
import { CheckCircle2 } from "lucide-react";
import { useGameStore } from "@/stores/gameStore";
import { useEffect, useState } from "react";

export default function ResultModal() {
  const { answerWord, setGameStatus } = useGameStore();
  const isWin = useGameStore((s) => s.gameStatus === "win");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isWin) {
      setOpen(false);
      return;
    }
    const timer = setTimeout(() => setOpen(isWin), 700);
    return () => clearTimeout(timer);
  }, [isWin]);

  return (
    <Dialog open={open} onOpenChange={() => setGameStatus("playing")}>
      <DialogContent className="sm:max-w-96">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
            <CheckCircle2 className="text-emerald-500" />
          </div>

          <DialogTitle className="text-xl">Поздравляем! 🎉</DialogTitle>

          <DialogDescription className="mt-1">
            Вы успешно отгадали слово
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex justify-center">
          <div className="rounded-md border border-border bg-muted px-6 py-2 text-lg font-mono tracking-widest">
            {answerWord.toUpperCase()}
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Хотите сохранить результат и следить за статистикой игр?
        </div>

        <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-col">
          <Button className="w-full">Зарегистрироваться</Button>

          <Button variant="ghost" className="w-full">
            Продолжить без регистрации
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
