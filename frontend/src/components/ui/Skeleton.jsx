/** Shimmering placeholder block. Building block for all other skeletons. */
const Shimmer = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200/70 dark:bg-white/[0.06] ${className}`} />
);

/** Skeleton for a single dashboard stats card. */
export const StatCardSkeleton = () => (
  <div className="glass-card p-5">
    <Shimmer className="mb-3 h-4 w-24" />
    <Shimmer className="h-8 w-16" />
  </div>
);

/** Skeleton for a single task card, mirroring the real TaskCard layout. */
export const TaskCardSkeleton = () => (
  <div className="glass-card border-l-4 border-l-slate-200 p-5 dark:border-l-white/10">
    <div className="mb-3 flex items-start justify-between">
      <Shimmer className="h-5 w-2/3" />
      <Shimmer className="h-5 w-16 rounded-full" />
    </div>
    <Shimmer className="mb-2 h-3.5 w-full" />
    <Shimmer className="mb-4 h-3.5 w-4/5" />
    <div className="flex items-center justify-between">
      <Shimmer className="h-3 w-20" />
      <div className="flex gap-2">
        <Shimmer className="h-8 w-8 rounded-lg" />
        <Shimmer className="h-8 w-8 rounded-lg" />
      </div>
    </div>
  </div>
);

export default Shimmer;
