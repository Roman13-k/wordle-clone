"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shared/card";
import { BookOpen, Trophy, Users, ListChecks, Clock } from "lucide-react";
import { UserStatisticsI } from "@/interfaces/user";
import { minSecFormat } from "@/utils/functions/minSecFormat";

export default function ProfileStats({
  userStats,
}: {
  userStats: UserStatisticsI;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Trophy className="h-4 w-4" />
            Победы
          </CardTitle>
          <CardDescription>Всего выигранных игр</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
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
        <CardContent className="mt-auto">
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
        <CardContent className="mt-auto">
          <span className="text-2xl font-bold">{userStats?.friends_count}</span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <ListChecks className="h-4 w-4" />
            Строк использовано
          </CardTitle>
          <CardDescription>Среднее кол-во строк для угадывания</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <span className="text-2xl font-bold">
            {userStats?.avg_rows_used === 0
              ? "-"
              : userStats.avg_rows_used.toFixed(1)}
          </span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            Время
          </CardTitle>
          <CardDescription>Среднее время прохождения слова</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <span className="text-2xl font-bold">
            {userStats?.avg_time_used
              ? minSecFormat(userStats.avg_time_used)
              : "-"}
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
