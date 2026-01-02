import { LetterState } from "@/types/game";

export function checkWord(guess: string, answerWord: string): LetterState[] {
  const result: LetterState[] = Array(guess.length).fill("absent");
  const answerArr = answerWord.split("");

  for (let i = 0; i < guess.length; i++) {
    if (guess[i].toLowerCase() === answerArr[i]) {
      result[i] = "correct";
      answerArr[i] = "";
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (result[i] === "correct") continue;

    const idx = answerArr.indexOf(guess[i]);
    if (idx != -1) {
      result[i] = "present";
      answerArr[i] = "";
    }
  }

  return result;
}
