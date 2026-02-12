"use client";

import { useEffect, useMemo } from "react";
import { Bell } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shared/dialog";
import { Button } from "@/components/ui/shared/buttons/button";
import { useGetFriendsRequests } from "@/hooks/api/queries/useGetFriendsRequests";
import { useGetUser } from "@/hooks/api/queries/useGetUser";
import { normalizeFriend } from "@/utils/functions/normalizeFriend";
import { ListState } from "../../shared/listState";
import { FriendList } from "../../blocks/profile/friends/FriendsList";
import { useUpdateFriendStatus } from "@/hooks/api/mutations/useUpdateFriendStatus";
import { supabase } from "@/lib/supabaseClient";
import { useTemporaryFlag } from "@/hooks/useTemporaryFlag";
import { useQueryClient } from "@tanstack/react-query";
import { friendKeys } from "@/hooks/api/keys";

export function NotificationsDialog() {
  const queryClient = useQueryClient();
  const { data: user } = useGetUser();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetFriendsRequests();
  const { mutate } = useUpdateFriendStatus();
  const { value, trigger } = useTemporaryFlag(1000);

  const pendingRequests = useMemo(() => {
    if (!user?.id || !data) return [];

    return data.pages
      .flat()
      .filter((r) => r.status === "pending" && r.friend_id === user.id)
      .map((r) => normalizeFriend(r, user.id));
  }, [data, user]);

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel(`friends-requests-user-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "user_friends",
          filter: `friend_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.new.status !== "pending") return;

          queryClient.invalidateQueries({
            queryKey: friendKeys.requests(),
          });
          trigger();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "user_friends",
          filter: `friend_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.new.status !== "pending") return;
          queryClient.invalidateQueries({
            queryKey: friendKeys.requests(),
          });
          trigger();
        },
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  if (!user) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`${value ? "error_animation" : ""} relative cursor-pointer hover:opacity-80 transition`}
        >
          <Bell size={30} />

          {pendingRequests.length > 0 && (
            <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-semibold border-2 border-background leading-none">
              {pendingRequests.length > 99 ? "99+" : pendingRequests.length}
            </span>
          )}
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Заявки в друзья</DialogTitle>
        </DialogHeader>

        <ListState
          isLoading={isLoading}
          isError={isError}
          isEmpty={!isLoading && pendingRequests.length === 0}
          emptyFallback={
            <p className="text-sm text-muted-foreground">Нет новых заявок</p>
          }
          errorFallback={
            <p className="text-sm text-red-500">Ошибка загрузки заявок</p>
          }
        >
          <>
            <FriendList
              friends={pendingRequests}
              getKey={(f) => f.id}
              getName={(f) => f.name}
              getCover={(f) => f.cover}
              getHref={(f) => `/profile/${f.friend_id}`}
            >
              {(friend) => (
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      mutate({
                        userId: friend.user_id,
                        friendId: friend.friend_id,
                        status: "accepted",
                      })
                    }
                  >
                    Принять
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      mutate({
                        userId: friend.user_id,
                        friendId: friend.friend_id,
                        status: "rejected",
                      })
                    }
                  >
                    Отклонить
                  </Button>
                </div>
              )}
            </FriendList>

            {hasNextPage && (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => fetchNextPage()}
                isLoading={isFetchingNextPage}
              >
                Загрузить ещё
              </Button>
            )}
          </>
        </ListState>
      </DialogContent>
    </Dialog>
  );
}
