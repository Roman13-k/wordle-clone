import z from "zod";
import { accessiesArray, difficultiesArray } from "../data/createWordConfig";

export const createWordSchema = z.object({
  word: z
    .string()
    .min(4, "Минимум 4 буквы")
    .max(15, "Максимум 15 букв")
    .regex(/^[a-zA-Zа-яА-ЯёЁ]+$/, "Только русские или английские буквы"),
  max_tries: z.number().min(3).max(10),
  access: z.enum(accessiesArray.map((a) => a.value)),
  difficulty: z.enum(difficultiesArray),
});
