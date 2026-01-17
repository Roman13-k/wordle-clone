import { getUser } from "@/client/user/getUser";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 5 * 60 * 1000,
  });
};
