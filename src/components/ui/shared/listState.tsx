"use client";

import { ReactNode } from "react";
import { Skeleton } from "@/components/ui/shared/skeleton";
import { Button } from "@/components/ui/shared/buttons/button";

interface ListStateProps {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  onRetry?: () => void;

  loadingFallback?: ReactNode;
  emptyFallback?: ReactNode;
  errorFallback?: ReactNode;

  children: ReactNode;
}

export function ListState({
  isLoading,
  isError,
  isEmpty,
  onRetry,
  loadingFallback,
  emptyFallback,
  errorFallback,
  children,
}: ListStateProps) {
  if (isLoading) {
    return (
      <>
        {loadingFallback ?? (
          <>
            <Skeleton className="h-14 w-full rounded-md" />
            <Skeleton className="h-14 w-full rounded-md" />
          </>
        )}
      </>
    );
  }

  if (isError) {
    return (
      <>
        {errorFallback ?? (
          <div className="text-sm text-red-500">
            Не удалось загрузить данные.
            {onRetry && (
              <Button
                variant={"ghost"}
                onClick={onRetry}
                className="cursor-pointer"
              >
                Попробовать снова
              </Button>
            )}
          </div>
        )}
      </>
    );
  }

  if (isEmpty) {
    return (
      <>
        {emptyFallback ?? (
          <p className="text-sm text-muted-foreground">Ничего не найдено</p>
        )}
      </>
    );
  }

  return <>{children}</>;
}
