import { supabase } from "@/lib/supabaseClient";
import { UpdateUserPayload } from "@/types/user";

export async function updateUser(payload:UpdateUserPayload,userId:string) {
  const { error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", userId);

  if (error) throw error;
  return true;
}
