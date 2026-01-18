"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shared/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shared/tooltip";
import { useGameStore } from "@/stores/gameStore";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";

export default function HintModal() {
  const { hints, revealHint, generateHints, answerWord, resetHints } =
    useGameStore();
  const hintsCount = hints.length;
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  useEffect(() => {
    if (hints) resetHints();
    if (!answerWord) return;

    generateHints();
  }, [answerWord, generateHints, resetHints]);

  if (!hints || hintsCount === 0) return null;

  return (
    <Dialog>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <button className="cursor-pointer hover:opacity-80 transition">
                <Lightbulb size={30} />
              </button>
            </DialogTrigger>
          </TooltipTrigger>

          <TooltipContent side="bottom">
            <span>Подсказка</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-105">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>
              Подсказка {currentHintIndex + 1} / {hintsCount}
            </span>

            <div className="flex gap-2 mr-10">
              <button
                disabled={currentHintIndex === 0}
                onClick={() =>
                  setCurrentHintIndex((prev) => (prev === 0 ? prev : prev - 1))
                }
                className="p-1 cursor-pointer disabled:cursor-auto rounded-md hover:bg-muted transition disabled:opacity-40"
                aria-label="Предыдущая подсказка"
              >
                <ChevronLeft />
              </button>
              <button
                disabled={currentHintIndex === hintsCount - 1}
                onClick={() =>
                  setCurrentHintIndex((prev) =>
                    prev === hintsCount - 1 ? prev : prev + 1,
                  )
                }
                className="p-1 cursor-pointer disabled:cursor-auto rounded-md hover:bg-muted transition disabled:opacity-40"
                aria-label="Следующая подсказка"
              >
                <ChevronRight />
              </button>
            </div>
          </DialogTitle>

          <DialogDescription>
            Подсказка поможет, если застряли, но используйте с умом 😉
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <button
            onClick={() => revealHint(currentHintIndex)}
            disabled={hints[currentHintIndex].revealed}
            className="
      relative w-full rounded-lg border border-border p-4 text-left transition bg-muted/40 hover:bg-muted/60 cursor-pointer disabled:cursor-default"
          >
            <p
              className={`select-none text-sm leading-relaxed transition-all duration-300
                        ${
                          hints[currentHintIndex].revealed
                            ? "blur-0"
                            : "blur-sm"
                        }`}
            >
              {hints[currentHintIndex].text}
            </p>

            {!hints[currentHintIndex].revealed && (
              <div
                className="
          absolute inset-0 flex items-center justify-center
          text-xs text-muted-foreground
          pointer-events-none
        "
              >
                Нажмите, чтобы открыть подсказку
              </div>
            )}
          </button>
        </div>

        <DialogFooter className="mt-4">
          <span className="text-xs text-muted-foreground">
            Использование подсказок снижает сложность игры
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
