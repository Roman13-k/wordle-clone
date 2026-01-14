"use client";

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Pencil, User, Upload, Image } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../shared/form";

type ProfileFormValues = {
  name: string;
  description: string;
  avatarFile?: FileList;
  avatarPreset?: string;
};

export default function ProfileEditModal() {
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    console.log(values);
  };

  return (
    <Dialog>
      {/* Trigger */}
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
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Avatar */}
            <div className="flex gap-4 items-start">
              <div className="size-20 rounded-full border flex items-center justify-center">
                <User className="size-10 text-muted-foreground" />
              </div>

              <Tabs defaultValue="upload" className="flex-1">
                <TabsList>
                  <TabsTrigger value="upload">
                    <Upload className="size-4 mr-2" />
                    Загрузить
                  </TabsTrigger>
                  <TabsTrigger value="preset">
                    <Image className="size-4 mr-2" />
                    Выбрать
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-3">
                  <FormField
                    control={form.control}
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
                        onClick={() =>
                          form.setValue("avatarPreset", `preset-${i}`)
                        }
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input placeholder="Ваше имя" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Немного о себе"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost">
                Отмена
              </Button>
              <Button type="submit">Сохранить</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
