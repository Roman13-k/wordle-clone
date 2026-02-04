import { create } from "zustand";
import { useToastStore } from "./toastStore";
import { GameStatusType, GuessRow, LetterState } from "@/types/game";
import { HintI } from "@/interfaces/game";
import { MAX_WORD_LENGTH } from "@/utils/data/gameConfig";

type GameState = {
  guessesMatrix: GuessRow[];
  currentWord: string[];
  hints: HintI[];
  gameTime: number;
  date: string;
  gameStatus: GameStatusType;
  error: string | null;
  isLoading: boolean;
  isInputBlock: boolean;
};

type GameActions = {
  addLetter: (v: string) => void;
  deleteLetter: () => void;
  submitWord: (
    word: string[],
    states: LetterState[],
    status: GameState["gameStatus"],
  ) => void;
  addError: (ms: string) => void;
  setMatrix: (matrix: GameState["guessesMatrix"]) => void;
  setGameStatus: (status: GameState["gameStatus"]) => void;
  setLoading: (v: boolean) => void;
  setDate: (date: string) => void;
  setInputBlock: (isBlock: boolean) => void;
  resetGame: () => void;
  revealHint: (index: number) => void;
  setHintsFromServer: (hints: HintI[]) => void;

  getCompletionTime?: () => number;
  resetTimer?: () => void;
};

const initState: GameState = {
  guessesMatrix: [],
  currentWord: [],
  hints: [],
  date: new Date().toISOString().slice(0, 10),
  gameTime: 0,
  error: null,
  gameStatus: "playing",
  isInputBlock: false,
  isLoading: false,
};

export const useGameStore = create<GameState & GameActions>((set) => ({
  ...initState,

  addLetter: (v) => {
    const { currentWord, addError } = useGameStore.getState();

    if (currentWord.length >= MAX_WORD_LENGTH) {
      addError("Лимит букв");
      return;
    }
    set({ currentWord: [...currentWord, v] });
  },

  deleteLetter: () =>
    set((state) => ({
      currentWord: state.currentWord.slice(0, -1),
    })),

  submitWord: (word, states, status) => {
    const { guessesMatrix } = useGameStore.getState();
    set({
      guessesMatrix: [...guessesMatrix, { letters: word, states }],
      currentWord: [],
      gameStatus: status,
    });
  },

  setHintsFromServer: (hints) =>
    set(() => ({
      hints: hints.map((h) => ({
        ...h,
        revealed: false,
      })),
    })),

  revealHint: (index) =>
    set((state) => ({
      hints: state.hints.map((h, i) =>
        i === index ? { ...h, revealed: true } : h,
      ),
    })),

  addError: (ms) =>
    set(() => {
      setTimeout(() => {
        set({ error: null, isInputBlock: false });
      }, 500);

      useToastStore.getState().showMiniToast(ms);
      return { error: ms, isInputBlock: true };
    }),

  resetGame: () => {
    set(() => ({
      guessesMatrix: [],
      currentWord: [],
      gameStatus: "playing",
      gameTime: 0,
      error: null,
      isInputBlock: false,
    }));
  },

  setMatrix: (matrix) => set(() => ({ guessesMatrix: matrix })),
  setGameStatus: (status) => set(() => ({ gameStatus: status })),
  setInputBlock: (isBlock) => set(() => ({ isInputBlock: isBlock })),
  setLoading: (isLoading) => set(() => ({ isLoading })),
  setDate: (date) => set(() => ({ date })),
}));
