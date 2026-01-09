import { signInWithEmail, signUpWithEmail } from "@/client/user/authWithEmail";
import { RegisterOrLogin } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export function useAuthByEmail() {
  return useMutation({
    mutationFn: ({
      email,
      password,
      type,
    }: {
      email: string;
      password: string;
      type: RegisterOrLogin;
    }) =>
      type === "login"
        ? signInWithEmail(email, password)
        : signUpWithEmail(email, password),
  });
}