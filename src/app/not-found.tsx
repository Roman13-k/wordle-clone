"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/shared/button";
import { Card, CardContent, CardHeader } from "@/components/ui/shared/card";
import { ArrowLeft, Ghost } from "lucide-react";
import MainContainer from "@/components/ui/layout/MainContainer";

export default function NotFound() {
  const router = useRouter();

  return (
    <MainContainer>
      <div className="flex justify-center items-center h-full">
        <Card className="w-full max-w-md text-center shadow-lg">
          <CardHeader className="flex flex-col items-center gap-3">
            <Ghost className="h-12 w-12 text-muted-foreground" />

            <h1 className="text-2xl font-bold tracking-tight">
              Страница не найдена
            </h1>

            <p className="text-sm text-muted-foreground">
              Возможно, страница была удалена или вы перешли по неверной ссылке.
            </p>
          </CardHeader>

          <CardContent>
            <Button className="w-full" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Вернуться назад
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainContainer>
  );
}
