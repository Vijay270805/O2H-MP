import { motion } from "framer-motion";
import { ListChecks, CheckCircle2, Clock4, TrendingUp } from "lucide-react";
import { StatCardSkeleton } from "../ui/Skeleton";

const CARD_CONFIG = [
  {
    key: "total",
    label: "Total Tasks",
    icon: ListChecks,
    iconClass: "from-brand-500 to-violet-600",
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircle2,
    iconClass: "from-emerald-400 to-emerald-600",
  },
  {
    key: "pending",
    label: "Pending",
    icon: Clock4,
    iconClass: "from-amber-400 to-amber-600",
  },
  {
    key: "progressPercentage",
    label: "Progress",
    icon: TrendingUp,
    iconClass: "from-sky-400 to-sky-600",
    suffix: "%",
  },
];

/** Row of glassmorphism KPI cards summarizing the whole task collection. */
const StatsCards = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {CARD_CONFIG.map((c) => (
          <StatCardSkeleton key={c.key} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {CARD_CONFIG.map((card, index) => {
        const Icon = card.icon;
        const value = stats[card.key] ?? 0;
        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            whileHover={{ y: -3 }}
            className="glass-card group p-5 transition-shadow hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${card.iconClass} shadow-sm transition-transform group-hover:scale-110`}
              >
                <Icon className="h-4 w-4 text-white" />
              </div>
            </div>
            <p className="mt-3 font-mono text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              {value}
              {card.suffix ?? ""}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;
