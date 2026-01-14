"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/shared/alert-dialog";
import { Button } from "@/components/ui/shared/button";
import { useDeleteUser } from "@/hooks/api/mutations/useDeleteUser";
import { useGetUser } from "@/hooks/api/queries/useGetUser";
import { useToastStore } from "@/stores/toastStore";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileDeleteModal({ id }: { id: string }) {
  const { mutate, isPending, isError, isSuccess } = useDeleteUser(id);
  const { addToast } = useToastStore();
  const router = useRouter();
  const { refetch } = useGetUser();

  useEffect(() => {
    if (isError) {
      addToast(
        "Ошибка",
        "Не удалось удалить профиль. Попробуйте позже.",
        "error"
      );
    } else if (isSuccess) {
      addToast("Готово", "Профиль успешно удалён.", "success");
      router.push("/");
      refetch();
    }
  }, [isError, isSuccess, addToast]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить профиль?</AlertDialogTitle>

          <AlertDialogDescription>
            Профиль будет удалён навсегда. Все данные профиля, включая имя,
            описание и статистику, будут безвозвратно потеряны.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>

          <AlertDialogAction
            onClick={() => mutate()}
            isLoading={isPending}
            variant={"destructive"}
          >
            Удалить профиль
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
