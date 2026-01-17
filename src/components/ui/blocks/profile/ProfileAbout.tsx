"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shared/card";
import { UserI } from "@/interfaces/user";

export default function ProfileAbout({user}:{user:UserI}) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Обо мне</CardTitle>
        <CardDescription>
          {!user.description
            ? "Вы ничего о себе не написали :("
            : user.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
