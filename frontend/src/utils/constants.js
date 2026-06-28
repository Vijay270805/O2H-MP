export const TASK_STATUS = {
  ALL: "all",
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
};

export const FILTERS = [
  { label: "All", value: TASK_STATUS.ALL },
  { label: "Pending", value: TASK_STATUS.PENDING },
  { label: "In Progress", value: TASK_STATUS.IN_PROGRESS },
  { label: "Completed", value: TASK_STATUS.COMPLETED },
];

// Centralized style mapping so every badge/dot/border across the app
// uses the exact same color for a given status.
export const STATUS_STYLES = {
  pending: {
    label: "Pending",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    border: "border-l-amber-500",
  },
  "in-progress": {
    label: "In Progress",
    dot: "bg-sky-500",
    badge: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
    border: "border-l-sky-500",
  },
  completed: {
    label: "Completed",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    border: "border-l-emerald-500",
  },
};

export const DESCRIPTION_MIN_LENGTH = 20;
