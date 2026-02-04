export type LetterState = "correct" | "present" | "absent";
export enum LETTERCOLOR {
  "correct" = "bg-chart-3",
  "present" = "bg-present",
  "absent" = "bg-sidebar-ring",
}

export type GameStatusType = "playing" | "win" | "lose";
export type ResultStatusType = Exclude<GameStatusType, "playing">;

export type GuessRow = {
  letters: string[];
  states: LetterState[];
};

export type KeyType = "letter" | "enter" | "delete";

export type HintsVariantsType =
  | "randomLetter"
  | "vowelCount"
  | "consonantCount"
  | "startsWithLetter"
  | "endsWithLetter";
