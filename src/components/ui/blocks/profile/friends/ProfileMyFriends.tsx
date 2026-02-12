"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/card";
import { AddFriendModal } from "../modals/AddFriendModal";
import { FriendList } from "./FriendsList";
import { useGetFriendsRequests } from "@/hooks/api/queries/useGetFriendsRequests";
import { Button } from "@/components/ui/shared/buttons/button";
import { normalizeFriend } from "@/utils/functions/normalizeFriend";
import { ListState } from "@/components/ui/shared/listState";
import { UserI } from "@/interfaces/user";
import { useGetUser } from "@/hooks/api/queries/useGetUser";

export default function ProfileMyFriends({ user }: { user: UserI }) {
  const { data: ownUser } = useGetUser();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetFriendsRequests();

  const allFriends = data?.pages.flat() ?? [];

  const acceptedFriends = allFriends
    .filter((f) => f.status === "accepted")
    .map((f) => normalizeFriend(f, user?.id));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Друзья</CardTitle>
        {ownUser?.id === user.id && <AddFriendModal />}
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground space-y-3">
        <ListState
          isLoading={isLoading}
          isError={isError}
          isEmpty={!isLoading && acceptedFriends.length === 0}
          onRetry={refetch}
          emptyFallback={
            <p className="text-sm text-muted-foreground">
              У вас пока нет друзей
            </p>
          }
        >
          <>
            <FriendList
              friends={acceptedFriends}
              getKey={(f) => f.id}
              getName={(f) => f.name}
              getCover={(f) => f.cover}
              getHref={(f) => `/profile/${f.friend_id}`}
            />

            {hasNextPage && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchNextPage()}
                isLoading={isFetchingNextPage}
              >
                Загрузить ещё
              </Button>
            )}
          </>
        </ListState>
      </CardContent>
    </Card>
  );
}
