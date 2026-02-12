"use client";

import { Card, CardContent } from "../../shared/card";
import { Mail, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ProfileDeleteModal from "./modals/ProfileDeleteModal";
import UserAvatar from "./UserAvatar";
import { Button } from "../../shared/buttons/button";
import { UserI } from "@/interfaces/user";
import ProfileEditModal from "./modals/ProfileEditModal";
import { useQueryClient } from "@tanstack/react-query";
import StreakModal from "./streak/StreakModal";
import CopyButton from "../../shared/buttons/CopyButton";
import { useGetUser } from "@/hooks/api/queries/useGetUser";
import { useUpdateFriendStatus } from "@/hooks/api/mutations/useUpdateFriendStatus";
import { FriendRequestStatus } from "@/types/user";

export default function ProfileHeader({
  user,
  status,
}: {
  user: UserI;
  status?: FriendRequestStatus;
}) {
  const router = useRouter();
  const { data: authUser } = useGetUser();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useUpdateFriendStatus();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
    queryClient.removeQueries({ queryKey: ["user"] });
  };

  const isOwnProfile = user?.id === authUser?.id;

  return (
    <Card>
      <CardContent className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <UserAvatar className="h-16 w-16" size={32} cover={user?.cover} />
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <h1 className="text-xl font-semibold">{user?.name}</h1>
              <CopyButton text={user?.id} tooltipText="Скопировать id" />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{user?.email}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <StreakModal
              current_streak={user?.current_streak}
              last_played_date={user?.last_played_date}
            />
            <span className="text-sm text-muted-foreground">дней подряд</span>
          </div>

          {isOwnProfile ? (
            <div className="flex items-center gap-2">
              <ProfileEditModal />
              <ProfileDeleteModal id={user.id} />

              <Button
                variant="outline"
                size="icon"
                onClick={handleLogout}
                title="Выйти из аккаунта"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            authUser &&
            status != "none" && (
              <Button
                isLoading={isPending}
                onClick={() =>
                  mutate({
                    userId: authUser.id,
                    friendId: user.id,
                    status: "blocked",
                  })
                }
                variant={"destructive"}
                title="Заблокировать пользователя"
              >
                Заблокировать
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
