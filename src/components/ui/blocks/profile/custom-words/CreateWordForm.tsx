"use client";

import { z } from "zod";
import type {
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import { Input } from "@/components/ui/shared/input";
import { Slider } from "@/components/ui/shared/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shared/select";
import { Label } from "@/components/ui/shared/label";
import { Badge } from "@/components/ui/shared/badge";
import { Button } from "@/components/ui/shared/buttons/button";
import { AccessType, DifficultType } from "@/types/word";
import {
  accessiesArray,
  difficultiesArray,
} from "@/utils/data/createWordConfig";
import { createWordSchema } from "@/utils/validation/createWordSchema";

type FormValues = z.infer<typeof createWordSchema>;

type Props = {
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
  errors: FieldErrors<FormValues>;
  onSubmit: (data: FormValues) => void;
};

export default function CreateWordForm({
  register,
  handleSubmit,
  setValue,
  watch,
  errors,
  onSubmit,
}: Props) {
  const maxTries = watch("max_tries");
  const difficulty = watch("difficulty");
  const access = watch("access");

  const difficultyColor: Record<DifficultType, string> = {
    easy: "bg-green-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500",
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label>Слово</Label>
        <Input placeholder="Введите слово..." {...register("word")} />
        {errors.word && (
          <p className="text-sm text-red-500">{errors.word.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Количество попыток: {maxTries}</Label>
        <Slider
          min={3}
          max={10}
          step={1}
          defaultValue={[6]}
          onValueChange={(val) => setValue("max_tries", val[0])}
        />
      </div>

      <div className="space-y-2">
        <Label>Доступ</Label>
        <Select
          value={watch("access")}
          onValueChange={(value: AccessType) => {
            setValue("access", value);
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {accessiesArray.map((access) => (
              <SelectItem value={access.value} key={access.value}>
                <div className="flex items-center gap-2">
                  {access.Icon && <access.Icon className="h-4 w-4" />}
                  {access.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p className="text-xs text-muted-foreground">
          {access === "public" && "Публичное — слово видят все пользователи."}
          {access === "friend_only" &&
            "Для друзей — слово видят только ваши друзья."}
          {access === "private" &&
            "Приватное — видите только вы. Только такие слова можно редактировать."}
        </p>
      </div>

      <div className="space-y-3">
        <Label>Сложность</Label>
        <div className="flex gap-3">
          {difficultiesArray.map((color) => (
            <button
              type="button"
              key={color}
              onClick={() => setValue("difficulty", color)}
              className={`h-8 w-8 rounded-full transition-all ${
                difficultyColor[color]
              } ${
                difficulty === color ? "ring-2 ring-offset-2 ring-black" : ""
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2 text-xs">
          <Badge className={difficultyColor.easy}>Лёгкое</Badge>
          <Badge className={difficultyColor.medium}>Среднее</Badge>
          <Badge className={difficultyColor.hard}>Сложное</Badge>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Создать слово
      </Button>
    </form>
  );
}
