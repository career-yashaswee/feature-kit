import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function FeatureCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-4 w-full mt-2" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mt-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-14" />
        </div>
      </CardContent>
    </Card>
  );
}

export function KitCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="w-full aspect-[4/3]" />
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-24 mb-2" />
        <Skeleton className="h-4 w-20" />
      </CardHeader>
    </Card>
  );
}

export function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="w-full aspect-[4/3]" />
      <CardHeader>
        <Skeleton className="h-6 w-24 mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
    </Card>
  );
}

export function FeaturePageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Skeleton className="h-10 w-64 mb-4" />
      <Skeleton className="h-5 w-full mb-8" />
      <Skeleton className="aspect-video w-full rounded-lg mb-8" />
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
      <div>
        <Skeleton className="h-7 w-32 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
