import { updateUser } from "@/client/user/updateUser";
import { UpdateUserPayload } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      data: UpdateUserPayload;
      id: string;
    }) => updateUser(payload.data, payload.id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

