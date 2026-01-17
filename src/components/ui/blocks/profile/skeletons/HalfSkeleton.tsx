import { Card, CardContent } from "@/components/ui/shared/card";
import { Skeleton } from "@/components/ui/shared/skeleton";

export default function HalfSkeleton() {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Skeleton className="h-5 w-32" />

        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
