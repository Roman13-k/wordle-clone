"use client";
import { useGetUser } from "@/hooks/api/queries/useGetUser";
import {
  Card,
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
          {user.description == ""
            ? "Вы ничего о себе не написали :("
            : user.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
