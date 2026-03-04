import { HintsVariantsType } from "@/types/game";
import { AccessType, DifficultType } from "@/types/word";

export interface KeysI {
  value: string | React.ReactNode;
  onClick: () => void;
}

export interface DailyWordI {
  id: string;
  date: string;
  hints: HintI[];
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

export interface CustomWordI {
  id: string;
  creator_id: string;
  word: string;
  word_length: number;
  access: AccessType;
  max_tries: number;
  created_at: string;
  updated_at: string;
  difficulty: DifficultType;
}
