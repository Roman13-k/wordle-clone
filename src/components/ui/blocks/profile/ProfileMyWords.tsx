"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shared/card";
import { Button } from "../../shared/buttons/button";
import { Plus } from "lucide-react";
import { UserI } from "@/interfaces/user";
import { useGetUser } from "@/hooks/api/queries/useGetUser";

export default function ProfileMyWords({ user }: { user: UserI }) {
  const { data: ownUser } = useGetUser();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Мои слова</CardTitle>
        <CardDescription>Слова, которые вы придумали</CardDescription>
      </CardHeader>
      <CardContent>
        {ownUser?.id === user.id && (
          <Button variant="outline" className="flex gap-2">
            <Plus className="h-4 w-4" />
            Добавить слово
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
