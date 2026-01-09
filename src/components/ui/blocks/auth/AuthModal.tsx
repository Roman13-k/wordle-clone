"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shared/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/shared/tabs";
import { Button } from "@/components/ui/shared/button";
import { AuthForm } from "./AuthForm";
import { useAuthModal } from "@/stores/authStore";

export default function AuthModal() {
  const { open, closeModal, openModal } = useAuthModal();

  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeModal()}>
      <DialogTrigger asChild>
        <Button onClick={openModal} variant="outline">
          Войти
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-105">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Добро пожаловать
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-4">
            <AuthForm type="login" />
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-4">
            <AuthForm type="register" />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
