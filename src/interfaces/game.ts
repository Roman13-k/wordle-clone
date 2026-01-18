import { HintsVariantsType } from "@/types/game";

export interface KeysI {
  value: string | React.ReactNode;
  onClick: () => void;
}

export interface DailyWordI {
  id: string;
  date: string;
  word: string;
}

export interface AlreadyPlayedI {
  alreadyPlayed: boolean;
  is_win: boolean;
  game_date: string;
}

export interface HintI {
  text: string;
  revealed: boolean;
  variant: HintsVariantsType;
}
