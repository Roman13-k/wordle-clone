import { LetterState } from "@/types/game";

export function checkWord(guess: string, answerWord: string): LetterState[] {
  const result: LetterState[] = Array(guess.length).fill("absent");
  const answerArr = answerWord.split("");

  for (let i = 0; i < guess.length; i++) {
    if (guess[i].toLowerCase() === answerArr[i].toLowerCase()) {
      result[i] = "correct";
      answerArr[i] = "";
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (result[i] === "correct") continue;

    const idx = answerArr.findIndex(
      (l) => l.toLowerCase() === guess[i].toLowerCase()
    );
    if (idx !== -1) {
      result[i] = "present";
      answerArr[idx] = "";
    }
  }

  return result;
}
