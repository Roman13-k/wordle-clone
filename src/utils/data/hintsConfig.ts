import { HintsVariantsType } from "@/types/game";

export const HINTS_CONFIG: Record<HintsVariantsType, string> = {
  randomLetter: "В слове есть буква {letter}.",
  vowelCount: "В слове {count} гласных.",
  consonantCount: "В слове {count} согласных.",
  startsWithLetter: "Слово начинается с буквы {letter}.",
  endsWithLetter: "Слово заканчивается на букву {letter}.",
};
