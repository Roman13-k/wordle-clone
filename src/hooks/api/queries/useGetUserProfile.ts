import { useQuery } from "@tanstack/react-query";
import { getUserWithRelationShip } from "@/client/user/getUserWithRelationShip";
import { userKeys } from "../keys";

export const useGetUserProfile = (id?: string) => {
  return useQuery({
    queryKey: userKeys.profile(id),
    queryFn: () => getUserWithRelationShip(id),
  });
};
