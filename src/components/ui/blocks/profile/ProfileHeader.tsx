"use client";

import { Card, CardContent } from "../../shared/card";
import { Mail, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ProfileDeleteModal from "./modals/ProfileDeleteModal";
import UserAvatar from "./UserAvatar";
import Streak from "./streak/Streak";
import { Button } from "../../shared/button";
import { UserI } from "@/interfaces/user";
import ProfileEditModal from "./modals/ProfileEditModal";
import { useQueryClient } from "@tanstack/react-query";
import StreakModal from "./streak/StreakModal";

export default function ProfileHeader({user}:{user:UserI}) {
  const router = useRouter();
  const queryClient =useQueryClient()

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
    queryClient.removeQueries({ queryKey: ["user"] });
  };

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

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
           <StreakModal current_streak={user.current_streak} last_played_date={user.last_played_date}/>
            <span className="text-sm text-muted-foreground">дней подряд</span>
          </div>

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
        </div>
      </CardContent>
    </Card>
  );
}
