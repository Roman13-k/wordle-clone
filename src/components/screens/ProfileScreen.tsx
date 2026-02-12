"use client";
import ProfileAbout from "@/components/ui/blocks/profile/ProfileAbout";
import ProfileDataProvider from "@/components/ui/blocks/profile/ProfileDataProvider";
import ProfileHeader from "@/components/ui/blocks/profile/ProfileHeader";
import ProfileStats from "@/components/ui/blocks/profile/ProfileStats";
import ProfileMyWords from "../ui/blocks/profile/ProfileMyWords";
import ProfileMyFriends from "../ui/blocks/profile/friends/ProfileMyFriends";
import FriendBlocked from "../ui/blocks/profile/friends/FriendBlocked";
import { useDeleteFriendRelation } from "@/hooks/api/mutations/useDeleteFriendRelation";
import { useGetUser } from "@/hooks/api/queries/useGetUser";

export default function ProfileScreen({ id }: { id?: string }) {
  const { mutate, isPending } = useDeleteFriendRelation();
  const { data: user, isLoading } = useGetUser();

  return (
    <ProfileDataProvider userId={id}>
      {(friend, friendStats, relationship) => (
        <div className="max-w-6xl mx-auto flex flex-col gap-6 p-4">
          {relationship === "blocked" ? (
            <FriendBlocked
              userName={friend.name}
              isLoading={isLoading || isPending}
              onUnblock={() =>
                mutate({ userId: user?.id ?? "", friendId: friend.id })
              }
            />
          ) : (
            <>
              <ProfileHeader user={friend} />
              <ProfileStats userStats={friendStats} />
              <ProfileAbout user={friend} />
            </>
          )}

          {relationship === "accepted" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProfileMyWords user={friend} />
              <ProfileMyFriends user={friend} />
            </div>
          )}
        </div>
      )}
    </ProfileDataProvider>
  );
}
