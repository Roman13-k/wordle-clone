"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shared/dialog";
import { Button } from "@/components/ui/shared/button";
import { BookOpen } from "lucide-react";
import { LETTERCOLOR, LetterState } from "@/types/game";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shared/tooltip";

function ExampleRow({
  letters,
  states,
}: {
  letters: string[];
  states: LetterState[];
}) {
  return (
    <div className="flex gap-1 mt-2">
      {letters.map((l, i) => (
        <div
          key={i}
          className={`w-10 h-10 flex items-center justify-center rounded-md border font-bold text-lg ${
            LETTERCOLOR[states[i]]
          }`}
        >
          {l}
        </div>
      ))}
    </div>
  );
}

export default function HowToPlayModal() {
  return (
    <Dialog>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <button className="cursor-pointer hover:opacity-80 transition">
                <BookOpen size={30} />
              </button>
            </DialogTrigger>
          </TooltipTrigger>

          <TooltipContent side="bottom">
            <span>Как играть</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-130">
        <DialogHeader>
          <DialogTitle>Как играть</DialogTitle>
          <DialogDescription>
            Угадайте слово за ограниченное количество попыток.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            У вас есть <b>6 попыток</b>, чтобы угадать загаданное слово из{" "}
            <b>5 букв</b>.
          </p>

          <p>
            После каждой попытки цвет плиток изменится и покажет, насколько вы
            близки к разгадке.
          </p>

          <div>
            <p className="font-medium">Примеры:</p>

            <ExampleRow
              letters={["С", "Л", "О", "В", "О"]}
              states={["correct", "absent", "absent", "absent", "absent"]}
            />
            <p className="text-muted-foreground mt-1">
              Буква <b>С</b> есть в слове и стоит на правильном месте.
            </p>

            <ExampleRow
              letters={["И", "Г", "Р", "А", "Т"]}
              states={["absent", "present", "absent", "absent", "absent"]}
            />
            <p className="text-muted-foreground mt-1">
              Буква <b>Г</b> есть в слове, но стоит в другом месте.
            </p>

            <ExampleRow
              letters={["М", "Ы", "Ш", "К", "А"]}
              states={["absent", "absent", "absent", "absent", "absent"]}
            />
            <p className="text-muted-foreground mt-1">
              Таких букв в загаданном слове нет.
            </p>
          </div>

          <p className="text-muted-foreground">
            Буквы на клавиатуре тоже меняют цвет, чтобы помочь вам.
          </p>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button>Понятно</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
