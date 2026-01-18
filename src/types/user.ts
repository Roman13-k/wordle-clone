import { UserI } from "@/interfaces/user";

export type UpdateUserPayload = Partial<
  Pick<UserI, "name" | "description" | "cover">
>;

export type PostGameResultParams = {
  user_id: string;
  game_id: string;
  is_win: boolean;
  game_date: string;
  num_rows_used: number;
  completion_time_sec: number;
};
