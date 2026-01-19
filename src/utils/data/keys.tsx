import { KeyType } from "@/types/game";
import { Delete } from "lucide-react";
import { ReactNode } from "react";

export const KEYS: { value: string | ReactNode; type: KeyType }[] = [
  ..."QWERTYUIOP"
    .split("")
    .map((l) => ({ value: l, type: "letter" as KeyType })),
  ..."ASDFGHJKL"
    .split("")
    .map((l) => ({ value: l, type: "letter" as KeyType })),
  { value: "Enter", type: "enter" as KeyType },
  ..."ZXCVBNM".split("").map((l) => ({ value: l, type: "letter" as KeyType })),
  { value: <Delete />, type: "delete" as KeyType },
];
