import { create } from "zustand";
import { useToastStore } from "./toastStore";
import { WORDS } from "@/dictionaries/words";
import { GuessRow } from "@/types/game";
import { checkWord } from "@/utils/functions/checkWord";

type GameState = {
  guessesMatrix: GuessRow[];
  currentWord: string[];
  answerWord: string;
  MAX_WORD_LENGTH: 5;
  MAX_TRYS: 6;
  error: string | null;
  isInputBlock: boolean;
};

type GameActions = {
  addLetter: (v: string) => void;
  deleteLetter: () => void;
  submitWord: () => void;
  addError: (ms: string) => void;
  setMatrix: (matrix: GameState["guessesMatrix"]) => void;
};

const initState: GameState = {
  guessesMatrix: [],
  currentWord: [],
  answerWord: "proof",
  MAX_WORD_LENGTH: 5,
  MAX_TRYS: 6,
  error: null,
  isInputBlock: false,
};

export const useGameStore = create<GameState & GameActions>((set) => ({
  ...initState,

  addLetter: (v) => {
    const { currentWord, MAX_WORD_LENGTH, addError } = useGameStore.getState();

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

  submitWord: () => {
    const {
      currentWord,
      MAX_WORD_LENGTH,
      addError,
      guessesMatrix,
      answerWord,
    } = useGameStore.getState();

    const word = currentWord.join("").toLowerCase();
    if (currentWord.length !== MAX_WORD_LENGTH) {
      addError("Недостаточно букв");
      return;
    } else if (!WORDS.has(word)) {
      addError("Слова нет в словаре");
      return;
    }

    const states = checkWord(word, answerWord);
    set({
      guessesMatrix: [...guessesMatrix, { letters: currentWord, states }],
      currentWord: [],
    });
  },

  addError: (ms: string) =>
    set(() => {
      setTimeout(() => {
        set({ error: null, isInputBlock: false });
      }, 500);

      useToastStore.getState().showMiniToast(ms);
      return { error: ms, isInputBlock: true };
    }),

  setMatrix: (matrix) => set(() => ({ guessesMatrix: matrix })),
}));
