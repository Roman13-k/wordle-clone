import { FriendRequestStatus } from "@/types/user";

export interface UserProfileResponse {
  user: UserI;
  stats: UserStatisticsI;
  relationship: FriendRequestStatus;
}

export interface UserI {
  id: string;
  name: string;
  email: string;
  cover?: string;
  description?: string;
  current_streak: number;
  last_played_date: string;
  created_at: Date;
}

export interface UserStatisticsI {
  wins: number;
  plays: number;
  friends_count: number;
  avg_time_used: number;
  avg_rows_used: number;
}

export interface FriendRaw {
  id: string;
  user_id: string;
  friend_id: string;
  status: FriendRequestStatus;
  created_at: string;
  user: {
    id: string;
    name: string;
    cover?: string;
  };
  friend: {
    id: string;
    name: string;
    cover?: string;
  };
}

export interface FriendNormalized {
  id: string;
  user_id: string;
  friend_id: string;
  status: FriendRequestStatus;
  created_at: string;
  name: string;
  cover?: string;
}
