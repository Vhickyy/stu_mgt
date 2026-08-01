import { cn } from "@/lib/utils";

const Shimmer = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse rounded-md bg-gray-200", className)} />
);

export const OverviewCardsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="rounded-xl border bg-white p-4 space-y-3">
        <Shimmer className="h-10 w-10 rounded-full" />
        <Shimmer className="h-6 w-16" />
        <Shimmer className="h-3 w-24" />
      </div>
    ))}
  </div>
);

export const TableSkeleton = ({ rows = 4 }: { rows?: number }) => (
  <div className="rounded-xl border bg-white p-4 space-y-3">
    <Shimmer className="h-5 w-40" />
    {Array.from({ length: rows }).map((_, i) => (
      <Shimmer key={i} className="h-8 w-full" />
    ))}
  </div>
);

export const SideCardSkeleton = () => (
  <div className="rounded-xl border bg-white p-4 space-y-3">
    <Shimmer className="h-5 w-24" />
    <Shimmer className="h-16 w-full" />
  </div>
);
