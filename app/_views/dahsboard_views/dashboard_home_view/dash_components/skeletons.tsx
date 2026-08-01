import { cn } from "@/lib/utils";

const Shimmer = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse rounded-md bg-gray-200", className)} />
);

export const DashboardSkeleton = () => (
  <div className="p-4 md:p-6 space-y-6">
    <div className="space-y-2">
      <Shimmer className="h-6 w-56" />
      <Shimmer className="h-4 w-72" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border bg-white p-4 space-y-3">
          <Shimmer className="h-10 w-10 rounded-full" />
          <Shimmer className="h-6 w-16" />
          <Shimmer className="h-3 w-24" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 rounded-xl border bg-white p-4 space-y-3">
        <Shimmer className="h-5 w-32" />
        <Shimmer className="h-48 w-full" />
      </div>
      <div className="rounded-xl border bg-white p-4 space-y-3">
        <Shimmer className="h-5 w-32" />
        <Shimmer className="h-24 w-full" />
      </div>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Shimmer key={i} className="h-20 w-full rounded-xl" />
      ))}
    </div>
  </div>
);
