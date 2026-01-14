"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/shared/dialog";
import { Input } from "@/components/ui/shared/input";
import { Textarea } from "@/components/ui/shared/textarea";
import { Button } from "@/components/ui/shared/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/shared/tabs";
import { Pencil, Upload, Image } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../shared/form";
import { profileUpdateSchema } from "@/utils/validation/profileUpdateSchema";
import UserAvatar from "./UserAvatar";
import { useUpdateUser } from "@/hooks/api/mutations/useUpdateUser";
import { useToastStore } from "@/stores/toastStore";
import { useGetUser } from "@/hooks/api/queries/useGetUser";

type ProfileFormValues = z.infer<typeof profileUpdateSchema>;

export default function ProfileEditModal() {
  const { data: user } = useGetUser();
  const { mutate, isPending, isError, isSuccess } = useUpdateUser();
  const { addToast } = useToastStore();
  const [preview, setPreview] = useState<string | undefined>();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { handleSubmit, control, watch, setValue, formState } = form;
  const values = watch();

  const onSubmit = (data: ProfileFormValues) => {
    if (!user) return;

    mutate({
      data: {
        name: data.name,
        description: data.description,
        cover: preview,
      },
      id: user.id,
    });
  };

  useEffect(() => {
    if (isError) {
      addToast(
        "Ошибка",
        "Не удалось применить изменения. Попробуйте позже.",
        "error"
      );
    } else if (isSuccess) {
      addToast("Готово", "Профиль успешно изменён.", "success");
    }
  }, [isError, isSuccess, addToast]);

  useEffect(() => {
    const fileList = values.avatarFile;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(undefined);
    }
  }, [values.avatarFile]);

  const isDisabled =
    !values.name &&
    !values.description &&
    (!values.avatarFile || values.avatarFile.length === 0) &&
    !values.avatarPreset;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label="Редактировать профиль"
          variant="outline"
          size="icon"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Редактирование профиля</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex gap-4 items-start">
              <UserAvatar cover={preview} size={32} className="h-16 w-16" />

              <Tabs defaultValue="upload" className="flex-1">
                <TabsList>
                  <TabsTrigger value="upload">
                    <Upload className="size-4 mr-2" /> Загрузить
                  </TabsTrigger>
                  <TabsTrigger value="preset">
                    <Image className="size-4 mr-2" /> Выбрать
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-3">
                  <FormField
                    control={control}
                    name="avatarFile"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => field.onChange(e.target.files)}
                          />
                        </FormControl>
                        <FormMessage>
                          {formState.errors.avatarFile?.message?.toString()}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="preset" className="mt-3">
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        className="aspect-square rounded-full border hover:ring-2"
                        onClick={() => setValue("avatarPreset", `preset-${i}`)}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <FormField
              control={control}
              name="name"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input placeholder="Ваше имя" {...field} />
                  </FormControl>
                  <FormMessage>{formState.errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="description"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Немного о себе"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {formState.errors.description?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-2">
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Отмена
                </Button>
              </DialogClose>

              <Button isLoading={isPending} type="submit" disabled={isDisabled}>
                Сохранить
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
