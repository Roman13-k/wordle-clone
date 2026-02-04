import { useGameStore } from "@/stores/gameStore";
import { getGuessStates } from "@/client/words/getGuessStates";
import { LetterState, GameStatusType } from "@/types/game";
import { MAX_TRYS, MAX_WORD_LENGTH } from "@/utils/data/gameConfig";
import { WORDS } from "@/dictionaries/words";

export const useSubmitWord = () => {
  const {
    currentWord,
    addError,
    guessesMatrix,
    date,
    submitWord,
    isLoading,
    setLoading,
  } = useGameStore.getState();

  return async () => {
    if (isLoading) return;

    const word = currentWord.join("").toLowerCase();

    if (currentWord.length !== MAX_WORD_LENGTH) {
      addError("Недостаточно букв");
      return;
    }

    if (!WORDS.has(word)) {
      addError("Слова нет в словаре");
      return;
    }

    try {
      setLoading(true);

      const states: LetterState[] = await getGuessStates(word, date);

      const isWin = states.every((s) => s === "correct");
      const status: GameStatusType = isWin
        ? "win"
        : guessesMatrix.length + 1 === MAX_TRYS
          ? "lose"
          : "playing";

      submitWord(currentWord, states, status);
    } catch {
      addError("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };
};
