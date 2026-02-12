import { UserI, UserProfileResponse } from "@/interfaces/user";
import { supabase } from "@/lib/supabaseClient";

export async function getUserWithRelationShip(
  id?: string,
): Promise<UserProfileResponse> {
  const { data, error } = await supabase.rpc(
    "get_user_profile_with_relationship",
    { target_user_id: id },
  );

  if (error) throw error;
  return data;
}
