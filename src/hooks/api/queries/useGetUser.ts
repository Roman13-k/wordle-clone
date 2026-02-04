import { getUser } from "@/client/user/getUser";
import { useQuery } from "@tanstack/react-query";
import { userKeys } from "../keys";

export const useGetUser = () => {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: getUser,
    staleTime: 5 * 60 * 1000,
  });
};
