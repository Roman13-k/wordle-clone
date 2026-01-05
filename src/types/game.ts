export type LetterState = "correct" | "present" | "absent";

export type GameStatusType = "playing" | "win" | "lose";
export type ResultStatusType = Exclude<GameStatusType, "playing">;

export type GuessRow = {
  letters: string[];
  states: LetterState[];
};

export enum LETTERCOLOR {
  "correct" = "bg-chart-3",
  "present" = "bg-present",
  "absent" = "bg-sidebar-ring",
}
