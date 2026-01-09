import { PasswordStrengthType } from "@/types/auth";
import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Минимум 8 символов");

export function getPasswordStrength(password: string):{level:PasswordStrengthType,score:number} {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  if (password.length >= 10 && score === 3) {
    return { level: "strong", score: 3 };
  }

  if (password.length >= 8 && score >= 2) {
    return { level: "medium", score: 2 };
  }

  return { level: "weak", score: 1 };
}
