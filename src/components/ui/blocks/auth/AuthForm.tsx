"use client";
import { Mail } from "lucide-react";
import { Button } from "../../shared/button";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { Input } from "@/components/ui/shared/input";
import { Label } from "@/components/ui/shared/label";
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

const schema = z.object({
  email: z.email(),
  password: passwordSchema,
});

type FormData = z.infer<typeof schema>;

export function AuthForm({ type }: { type: RegisterOrLogin }) {
  const { watch, register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const authMutation = useAuthByEmail();

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
          reset();
          setTimeout(() => {
            router.push("/profile");
          }, 1000);
        },
      }
    );
  };

  const password = watch("password") ?? "";
  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const style = passwordStrengthStyles[strength.level];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-1">
          <Label>Email</Label>
          <Input {...register("email")} />
        </div>

        <div className="space-y-1">
          <Label>Пароль</Label>
          <Input
            type="password"
            {...register("password")}
            className={`
              transition
              ${
                type === "register"
                  ? `${password.length > 0 ? style.ring + " ring-1" : ""}`
                  : ""
              }
            `}
          />

          {type === "register" && password.length > 0 && (
            <div className="space-y-1 mt-2">
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`
                      h-1 flex-1 rounded-full transition-all duration-300
                      ${strength.score >= i ? style.bar : "bg-muted"}
                    `}
                  />
                ))}
              </div>
              <p className={`text-xs ${style.textClass}`}>{style.text}</p>
            </div>
          )}
        </div>

        <Button isLoading={authMutation.isPending} className="w-full">
          {type === "login" ? "Войти" : "Зарегистрироваться"}
        </Button>
        {authMutation.error && (
          <p className="text-sm text-destructive mt-1">
            {authMutation.error.message}
          </p>
        )}
        {successMessage && (
          <p className="text-sm text-success mt-1">{successMessage}</p>
        )}
      </form>

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
          onClick={() => registerOAuth("google")}
          type="button"
          variant="outline"
          className="w-full gap-2"
        >
          <Mail className="h-4 w-4" />
          Google
        </Button>

        <Button
          onClick={() => registerOAuth("github")}
          type="button"
          variant="outline"
          className="w-full gap-2"
        >
          <GithubLogoIcon className="h-4 w-4" />
          GitHub
        </Button>
      </div>
    </>
  );
}
