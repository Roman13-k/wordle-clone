"use client";
import { useGetUser } from "@/hooks/api/queries/useGetUser";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shared/card";

export default function ProfileAbout() {
  const { data: user } = useGetUser();

  if (!user) return;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Обо мне</CardTitle>
        <CardDescription>
          {user.description ?? "Вы ничего о себе не написали("}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Здесь позже можно добавить описание профиля, любимые слова и т.д.
      </CardContent>
    </Card>
  );
}
