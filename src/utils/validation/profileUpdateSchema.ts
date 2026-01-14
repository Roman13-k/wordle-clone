import z from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const profileUpdateSchema = z.object({
  name: z
    .string()
    .min(3, "Минимум 3 символа")
    .max(20, "Максимум 20 символов")
    .optional(),
  description: z.string().max(250, "Максимум 250 символов").optional(),
  avatarFile: z
    .any()
    .refine(
      (files) =>
        !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
      `Файл не должен превышать 2 МБ`
    )
    .optional(),
  avatarPreset: z.string().optional(),
});
