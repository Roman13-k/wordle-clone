"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shared/card";

export default function ProfileMyFriends() {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Друзья</CardTitle>
        <CardDescription>Социальные функции (в разработке)</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Здесь будет список друзей, приглашения и сравнение статистики
      </CardContent>
    </Card>
  );
}
