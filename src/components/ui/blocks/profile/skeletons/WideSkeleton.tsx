import { Card, CardContent } from "@/components/ui/shared/card";
import { Skeleton } from "@/components/ui/shared/skeleton";

export default function WideSkeleton() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-1 p-2">
        <div className="flex items-center gap-1">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-56" />
          </div>
        </div>

        <div className="flex gap-1 mt-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-9 w-28 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
