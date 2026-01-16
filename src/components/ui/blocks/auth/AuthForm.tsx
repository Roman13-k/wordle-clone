"use client";

import { Mail } from "lucide-react";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { Button } from "../../shared/button";
import { Input } from "@/components/ui/shared/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/shared/form";

import {
  getPasswordStrength,
  passwordSchema,
} from "@/utils/validation/getPasswordStrength";
import { passwordStrengthStyles } from "@/utils/data/passwordStrengthStyles";

import { z } from "zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterOrLogin } from "@/types/auth";
import { useAuthByEmail } from "@/hooks/api/mutations/useAuthByEmail";
import { registerOAuth } from "@/client/user/registerOAuth";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/stores/authStore";

const schema = z.object({
  email: z.string().email("Некорректный email"),
  password: passwordSchema,
});

type FormData = z.infer<typeof schema>;

export function AuthForm({ type }: { type: RegisterOrLogin }) {
  const router = useRouter();
  const { closeModal } = useAuthModal();
  const authMutation = useAuthByEmail();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const password = form.watch("password") ?? "";
  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const style = passwordStrengthStyles[strength.level];

  const onSubmit = (data: FormData) => {
    setSuccessMessage(null);

    authMutation.mutate(
      {
        email: data.email.trim(),
        password: data.password,
        type,
      },
      {
        onSuccess: () => {
          setSuccessMessage(
            type === "login" ? "Вход успешен!" : "Регистрация успешна!"
          );
          form.reset();
          closeModal();

          setTimeout(() => {
            router.push("/profile");
          }, 1000);
        },
      }
    );
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className={
                      type === "register" && password.length > 0
                        ? `${style.ring} ring-1 transition`
                        : ""
                    }
                  />
                </FormControl>
                <FormMessage />

                {type === "register" && password.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all
                            ${strength.score >= i ? style.bar : "bg-muted"}`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs ${style.textClass}`}>{style.text}</p>
                  </div>
                )}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            isLoading={authMutation.isPending}
            className="w-full"
          >
            {type === "login" ? "Войти" : "Зарегистрироваться"}
          </Button>

          {authMutation.error && (
            <p className="text-sm text-destructive">
              {authMutation.error.message}
            </p>
          )}

          {successMessage && (
            <p className="text-sm text-success">{successMessage}</p>
          )}
        </form>
      </Form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">или</span>
        </div>
      </div>

      <div className="space-y-2">
        <Button
          type="button"
          variant="outline"
          className="w-full gap-2"
          onClick={() => registerOAuth("google")}
        >
          <Mail className="h-4 w-4" />
          Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full gap-2"
          onClick={() => registerOAuth("github")}
        >
          <GithubLogoIcon className="h-4 w-4" />
          GitHub
        </Button>
      </div>
    </>
  );
}
