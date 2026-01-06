import { HintsVariantsType } from "@/types/game";
import { HINTS_CONFIG } from "../data/hintsConfig";
import { useGameStore } from "@/stores/gameStore";

export function generateHint() {
  const { answerWord, hints } = useGameStore.getState();
  if (!answerWord) return null;

  const allVariants = Object.keys(HINTS_CONFIG) as HintsVariantsType[];
  const availableVariants = allVariants.filter(
    (variant) => !hints.find((h)=>h.variant===variant)
  );

  const variant =
    availableVariants[
      Math.floor(Math.random() * availableVariants.length)
    ];
  const template = HINTS_CONFIG[variant];
  let text = "";

  switch (variant) {
    case "randomLetter": {
      const randomLetter =
        answerWord[Math.floor(Math.random() * answerWord.length)];
      text = template.replace("{letter}", randomLetter.toUpperCase());
      break;
    }

    case "vowelCount": {
      const vowels = answerWord.match(/[aeiouy]/gi)?.length ?? 0;
      text = template.replace("{count}", vowels.toString());
      break;
    }

    case "consonantCount": {
      const consonants = answerWord.match(/[^aeiouy]/gi)?.length ?? 0;
      text = template.replace("{count}", consonants.toString());
      break;
    }

    case "startsWithLetter":
      text = template.replace("{letter}", answerWord[0].toUpperCase());
      break;

    case "endsWithLetter":
      text = template.replace(
        "{letter}",
        answerWord[answerWord.length - 1].toUpperCase()
      );
      break;
  }

  return {
    variant,
    text,
  };
}
