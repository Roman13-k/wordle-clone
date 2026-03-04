import { AccessType, DifficultType } from "@/types/word";
import { Globe, Lock, Users } from "lucide-react";

interface DifficultI {
  value: AccessType;
  label: string;
  Icon?: React.ElementType;
}

export const difficultiesArray: DifficultType[] = ["easy", "medium", "hard"];
export const accessiesArray: DifficultI[] = [
  { value: "public", label: "Public", Icon: Globe },
  {
    value: "friend_only",
    label: "Friends only",
    Icon: Users,
  },
  { value: "private", label: "Private", Icon: Lock },
];
