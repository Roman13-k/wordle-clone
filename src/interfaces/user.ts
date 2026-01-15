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
}
