import { useGameStore } from "@/stores/gameStore";
import { Delete } from "lucide-react";

export const keysData = [
  // 1 ряд
  ..."QWERTYUIOP".split("").map((letter) => ({
    value: letter,
    onClick: () => useGameStore.getState().addLetter(letter),
  })),

  // 2 ряд
  ..."ASDFGHJKL".split("").map((letter) => ({
    value: letter,
    onClick: () => useGameStore.getState().addLetter(letter),
  })),

  // 3 ряд
  {
    value: "Enter",
    onClick: () => useGameStore.getState().submitWord(),
  },
  ..."ZXCVBNM".split("").map((letter) => ({
    value: letter,
    onClick: () => useGameStore.getState().addLetter(letter),
  })),
  {
    value: <Delete />,
    onClick: () => useGameStore.getState().deleteLetter(),
  },
];
