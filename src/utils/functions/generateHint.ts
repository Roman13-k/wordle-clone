import { HintsVariantsType } from "@/types/game";
import { HINTS_CONFIG } from "../data/hintsConfig";

export function generateHint(word: string) {
  const variants = Object.keys(HINTS_CONFIG) as HintsVariantsType[];
  const variant = variants[Math.floor(Math.random() * variants.length)];
  const template = HINTS_CONFIG[variant];

  switch (variant) {
    case "randomLetter":
      const randomLetter = word[Math.floor(Math.random() * word.length)];
      return template.replace("{letter}", randomLetter.toUpperCase());

    case "vowelCount":
      const vowels = word.match(/[aeiouy]/gi)?.length ?? 0;
      return template.replace("{count}", vowels.toString());

    case "consonantCount":
      const consonants = word.match(/[^aeiouy]/gi)?.length ?? 0;
      return template.replace("{count}", consonants.toString());

    case "startsWithLetter":
      return template.replace("{letter}", word[0].toUpperCase());

    case "endsWithLetter":
      return template.replace("{letter}", word[word.length - 1].toUpperCase());

    default:
      return "";
  }
}
