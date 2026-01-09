import { PasswordStrengthType } from "@/types/auth";

export const passwordStrengthStyles:Record<PasswordStrengthType,{
    text: string,
    textClass: string,
    ring: string,
    bar: string,
  }> = {
  weak: {
    text: "Слабый пароль",
    textClass: "text-destructive",
    ring: "ring-destructive",
    bar: "bg-destructive",
  },
  medium: {
    text: "Средний пароль",
    textClass: "text-present",
    ring: "ring-present",
    bar: "bg-present",
  },
  strong: {
    text: "Сильный пароль",
    textClass: "text-primary",
    ring: "ring-primary",
    bar: "bg-primary",
  },
};
