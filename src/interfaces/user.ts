export interface UserI {
    id:string;
    name:string;
    email:string;
    cover?:string;
    description?:string;
    streak_date?:string;
    created_at:Date;
    statistics:UserStatisticsI;
}

export interface UserStatisticsI{
    wins:number;
    plays:number;
    friendsCount:number;
}
