import { create } from "zustand";
import { useToastStore } from "./toastStore";
import { WORDS } from "@/dictionaries/words";
import { GameStatusType, GuessRow, HintsVariantsType } from "@/types/game";
import { checkWord } from "@/utils/functions/checkWord";
import { generateHint } from "@/utils/functions/generateHint";

type GameState = {
  guessesMatrix: GuessRow[];
  currentWord: string[];
  answerWord: string|null;
  hints: { text: string; revealed: boolean,variant:HintsVariantsType }[];
  MAX_WORD_LENGTH: 5;
  MAX_TRYS: 6;
  gameStatus: GameStatusType;
  error: string | null;
  isInputBlock: boolean;
};

type GameActions = {
  addLetter: (v: string) => void;
  deleteLetter: () => void;
  submitWord: () => void;
  addError: (ms: string) => void;
  setMatrix: (matrix: GameState["guessesMatrix"]) => void;
  setGameStatus: (status: GameState["gameStatus"]) => void;
  setAnswerWord:(word:GameState["answerWord"])=>void;
  resetGame: () => void;
  revealHint: (index: number) => void;
  generateHints: (count?: number) => void;
};

const initState: GameState = {
  guessesMatrix: [],
  currentWord: [],
  answerWord: null,
  hints: [],
  MAX_WORD_LENGTH: 5,
  MAX_TRYS: 6,
  error: null,
  gameStatus: "playing",
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
      MAX_TRYS,
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
    if(!answerWord) return;

    const states = checkWord(word, answerWord);
    const status: GameStatusType =
      word === answerWord
        ? "win"
        : guessesMatrix.length + 1 === MAX_TRYS
        ? "lose"
        : "playing";
    set({
      guessesMatrix: [...guessesMatrix, { letters: currentWord, states }],
      currentWord: [],
      gameStatus: status,
    });
  },

  revealHint: (index) =>
    set((state) => {
      const newHints = state.hints.map((h, i) =>
        i === index ? { ...h, revealed: true } : h
      );
      return { hints: newHints };
    }),

  generateHints: (count = 3) =>
    set(() => {
      const generatedHints: GameState["hints"] = [];

      for (let i = 0; i < count; i++) {
      const hint = generateHint();
      if (!hint) break;

      generatedHints.push({
        text: hint.text,
        variant: hint.variant,
        revealed: false,
      });
    }

      return { hints: generatedHints };
    }),

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
      error: null,
      isInputBlock: false,
    }));
  },

  setMatrix: (matrix) => set(() => ({ guessesMatrix: matrix })),
  setGameStatus: (status) => set(() => ({ gameStatus: status })),
  setAnswerWord:(word)=>set(()=>({answerWord:word}))
}));
