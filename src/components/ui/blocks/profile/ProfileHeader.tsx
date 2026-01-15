"use client";
import { Card, CardContent } from "../../shared/card";
import { Mail } from "lucide-react";
import { useGetUser } from "@/hooks/api/queries/useGetUser";
import ProfileEditModal from "./ProfileEditModal";
import ProfileDeleteModal from "./ProfileDeleteModal";
import UserAvatar from "./UserAvatar";
import Streak from "./Streak";

export default function ProfileHeader() {
  const { data: user } = useGetUser();

  if (!user) return null;

  return (
    <Card>
      <CardContent className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <UserAvatar className="h-16 w-16" size={32} cover={user.cover} />
          <div>
            <h1 className="text-xl font-semibold">{user.name}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Streak
              last_played_date={user.last_played_date}
              current_streak={user.current_streak}
            />
            <span className="text-sm text-muted-foreground">дней подряд</span>
          </div>

          <div className="flex gap-2">
            <ProfileEditModal />
            <ProfileDeleteModal id={user.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
