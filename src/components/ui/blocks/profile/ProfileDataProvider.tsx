"use client";

import { ReactNode, useEffect } from "react";
import { useGetUser } from "@/hooks/api/queries/useGetUser";
import ErrorComponent from "@/components/ui/shared/error-component";
import { UserI, UserStatisticsI } from "@/interfaces/user";
import WideSkeleton from "./skeletons/WideSkeleton";
import StatsSkeleton from "./skeletons/StatsSkeleton";
import HalfSkeleton from "./skeletons/HalfSkeleton";
import { useGetUserStats } from "@/hooks/api/queries/useGetUserStats";
import { useToastStore } from "@/stores/toastStore";

type ProfileDataProviderProps = {
    children: (user: UserI, userStats: UserStatisticsI) => ReactNode;
};

export default function ProfileDataProvider({
    children,
}: ProfileDataProviderProps) {
    const { data: user, isLoading, isError, refetch, errorUpdateCount } = useGetUser();
    const { data: userStats, isLoading: userStatsLoading, isError: statsError } = useGetUserStats(
        user?.id
    );
    const {addToast}=useToastStore()

     useEffect(() => {
        if (isError ||statsError) {
          addToast(
            "Ошибка загрузки данных",
            "Не удалось получить данные с сервера. Проверьте подключение к интернету и попробуйте ещё раз.",
            "error"
          );
        }
    
      }, [isError]);

    if ((isLoading || userStatsLoading) && errorUpdateCount < 1) {
        return (
            <div className="max-w-5xl mx-auto flex flex-col gap-6 p-4">
                <WideSkeleton />
                <StatsSkeleton />
                <WideSkeleton />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <HalfSkeleton />
                    <HalfSkeleton />
                </div>
            </div>
        );
    }

    if (isError || !user || statsError || !userStats) {
        return (
            <ErrorComponent
                message="Не удалось загрузить профиль"
                onRetry={refetch}
                goHome
                isLoading={isLoading}
            />
        );
    }

    return <>{children(user, userStats)}</>;
}
