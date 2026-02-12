"use client";

import { Button } from "@/components/ui/shared/buttons/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shared/card";
import { ShieldX, Unlock } from "lucide-react";

type FriendBlockedProps = {
  userName?: string;
  onUnblock: () => void;
  isLoading?: boolean;
};

export default function FriendBlocked({
  userName,
  onUnblock,
  isLoading,
}: FriendBlockedProps) {
  return (
    <Card className="max-w-md mx-auto border-destructive/40">
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="p-2 rounded-xl bg-destructive/10">
          <ShieldX className="w-6 h-6 text-destructive" />
        </div>

        <CardTitle className="text-lg">Пользователь заблокирован</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          {userName
            ? `Вы заблокировали пользователя ${userName}.`
            : "Вы заблокировали этого пользователя."}
          <br />
          Вы не видите его профиль и взаимодействия ограничены.
        </p>

        <Button
          variant="destructive"
          className="flex items-center gap-2"
          onClick={onUnblock}
          disabled={isLoading}
        >
          <Unlock className="w-4 h-4" />
          Разблокировать
        </Button>
      </CardContent>
    </Card>
  );
}
