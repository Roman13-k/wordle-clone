import { deleteUser } from "@/client/user/deleteUser";
import { useMutation } from "@tanstack/react-query";

export function useDeleteUser(id:string) {
  return useMutation({
    mutationFn:()=> deleteUser(id)
})}