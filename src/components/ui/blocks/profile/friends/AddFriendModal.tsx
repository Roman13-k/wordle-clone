"use client";

import { useState } from "react";
import { UserPlus, Search } from "lucide-react";
import { Button } from "@/components/ui/shared/buttons/button";
import { Input } from "@/components/ui/shared/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shared/dialog";
import { useDebounce } from "@/hooks/useDebounce";
import { useToastStore } from "@/stores/toastStore";
import { useSearchUsers } from "@/hooks/api/queries/useSearchUsers";
import { useSendFriendRequest } from "@/hooks/api/mutations/usePostFriendRequest";
import { FriendList } from "../friends/FriendsList";
import { ListState } from "@/components/ui/shared/listState";

export function AddFriendModal() {
  const [searchText, setSearchText] = useState("");
  const debouncedText = useDebounce(searchText, 500);

  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useSearchUsers(debouncedText);
  const sendRequest = useSendFriendRequest();
  const addToast = useToastStore((s) => s.addToast);

  const handleSendRequest = (id: string) => {
    sendRequest.mutate(id, {
      onSuccess: () => {
        addToast(
          "Заявка отправлена",
          "Вы успешно отправили заявку в друзья",
          "success",
        );
      },
      onError: (err) => {
        addToast(
          "Ошибка",
          err.message ?? "Не удалось отправить заявку",
          "error",
        );
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <UserPlus className="h-4 w-4" />
          Добавить друга
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md ">
        <DialogHeader>
          <DialogTitle>Добавить друга</DialogTitle>
          <DialogDescription>
            Найдите пользователя по ID(кнопка скопировать в профиле) или имени и
            отправьте ему заявку в друзья.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Введите ID или имя пользователя"
              className="pl-8"
            />
          </div>
        </div>

        <ListState
          isLoading={isLoading}
          isError={isError}
          isEmpty={debouncedText.length > 0 && users?.length === 0}
          onRetry={() => refetch()}
        >
          <FriendList
            friends={users ?? []}
            getKey={(u) => u.id}
            getName={(u) => u.name}
            getCover={(u) => u.cover}
            getHref={(u) => `/profile/${u.id}`}
          >
            {(user) => (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSendRequest(user.id)}
                isLoading={sendRequest.isPending}
              >
                Добавить
              </Button>
            )}
          </FriendList>
        </ListState>
      </DialogContent>
    </Dialog>
  );
}
