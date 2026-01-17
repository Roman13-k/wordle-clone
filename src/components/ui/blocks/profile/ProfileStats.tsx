"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shared/card";
import { BookOpen, Trophy, Users } from "lucide-react";
import { UserStatisticsI } from "@/interfaces/user";

export default function ProfileStats({userStats}:{userStats:UserStatisticsI}) {

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
          <span className="text-2xl font-bold">{userStats?.wins}</span>
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
          <span className="text-2xl font-bold">{userStats?.plays}</span>
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
          <span className="text-2xl font-bold">{userStats?.friends_count}</span>
        </CardContent>
      </Card>
    </div>
  );
}
