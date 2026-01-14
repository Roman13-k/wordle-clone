"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shared/card";
import { BookOpen, Trophy, Users } from "lucide-react";
import { useGetUser } from "@/hooks/api/queries/useGetUser";

export default function ProfileStats() {
  const { data: user } = useGetUser();

  if (!user) return;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Trophy className="h-4 w-4" />
            Победы
          </CardTitle>
          <CardDescription>Всего выигранных игр</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">
            {user?.statistics?.wins ?? 0}
          </span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4" />
            Слова
          </CardTitle>
          <CardDescription>Сыграно слов</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">
            {user?.statistics?.plays ?? 0}
          </span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            Друзья
          </CardTitle>
          <CardDescription>Добавленные друзья</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">
            {user?.statistics?.friendsCount ?? 0}
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
