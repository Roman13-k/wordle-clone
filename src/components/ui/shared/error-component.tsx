"use client";

import { Button } from "@/components/ui/shared/button";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardFooter } from "./card";

type ErrorComponentProps = {
  message?: string;
  onRetry: () => void;
  isLoading?: boolean;
};

export default function ErrorComponent({
  message = "При загрузке данных произошла ошибка",
  onRetry,
  isLoading = false,
}: ErrorComponentProps) {
  return (
    <Card className="max-w-md mx-auto mt-8 border-red-500">
      <CardContent className="flex flex-col items-center text-center gap-4">
        <AlertCircle className="w-10 h-10 text-red-500" />
        <p className="text-lg font-medium">{message}</p>
        <p className="text-sm text-muted-foreground">
          Нажмите на кнопку ниже, чтобы повторить.
        </p>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button isLoading={isLoading} variant="destructive" onClick={onRetry}>
          Повторить
        </Button>
      </CardFooter>
    </Card>
  );
}
