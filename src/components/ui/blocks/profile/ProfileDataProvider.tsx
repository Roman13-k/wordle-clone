"use client";

import { ReactNode, useEffect } from "react";
import ErrorComponent from "@/components/ui/shared/error-component";
import WideSkeleton from "./skeletons/WideSkeleton";
import StatsSkeleton from "./skeletons/StatsSkeleton";
import HalfSkeleton from "./skeletons/HalfSkeleton";
import { useToastStore } from "@/stores/toastStore";
import { UserI, UserStatisticsI } from "@/interfaces/user";
import { useGetUserProfile } from "@/hooks/api/queries/useGetUserProfile";
import { FriendRequestStatus } from "@/types/user";

type ProfileDataProviderProps = {
  userId?: string;
  children: (
    user: UserI,
    stats: UserStatisticsI,
    relationship: FriendRequestStatus,
  ) => ReactNode;
};

export default function ProfileDataProvider({
  userId,
  children,
}: ProfileDataProviderProps) {
  const { addToast } = useToastStore();
  const { data, isLoading, isError, refetch } = useGetUserProfile(userId);

  useEffect(() => {
    if (isError) {
      addToast(
        "Ошибка загрузки данных",
        "Не удалось получить данные профиля",
        "error",
      );
    }
  }, [isError]);

  if (isLoading && !data) {
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

  if (!data || isError) {
    return (
      <ErrorComponent
        message="Не удалось загрузить профиль"
        onRetry={refetch}
        goHome
      />
    );
  }

  return <>{children(data.user, data.stats, data.relationship)}</>;
}
