import { Card, CardContent } from "@/components/ui/shared/card";
import { Skeleton } from "@/components/ui/shared/skeleton";

export default function StatsSkeleton() {
  return (
    <Card>
      <CardContent className="grid grid-cols-3 gap-2 p-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
