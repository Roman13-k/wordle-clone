"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/shared/dialog";
import { Button } from "@/components/ui/shared/buttons/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { createWordSchema } from "@/utils/validation/createWordSchema";
import CreateWordHeader from "./CreateWordHeader";
import CreateWordForm from "./CreateWordForm";
import { useCreateWord } from "@/hooks/api/mutations/useCreateWord";
import { useGetUser } from "@/hooks/api/queries/useGetUser";

type FormValues = z.infer<typeof createWordSchema>;

export default function CreateWordModal() {
  const [open, setOpen] = useState(false);
  const { data: ownUser } = useGetUser();
  const { mutate } = useCreateWord();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(createWordSchema),
    defaultValues: {
      word: "",
      max_tries: 6,
      access: "public",
      difficulty: "easy",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!ownUser) return;

    const normalized = {
      ...data,
      word: data.word.toLowerCase(),
      creator_id: ownUser.id,
    };

    mutate(normalized);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          <Plus className="h-4 w-4" />
          Добавить слово
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <CreateWordHeader />

        <CreateWordForm
          register={register}
          handleSubmit={handleSubmit}
          setValue={setValue}
          watch={watch}
          errors={errors}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
