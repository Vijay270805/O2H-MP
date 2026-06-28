import { motion } from "framer-motion";
import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";
import Badge from "../ui/Badge";
import { STATUS_STYLES } from "../../utils/constants";
import { formatDate } from "../../utils/validators";

/**
 * A single task. Encapsulates its own hover/entry animation so
 * <TaskList /> only has to worry about layout, not motion details.
 */
const TaskCard = ({ task, isPending, onToggleComplete, onEdit, onDeleteRequest }) => {
  const isCompleted = task.status === "completed";
  const borderClass = STATUS_STYLES[task.status]?.border ?? STATUS_STYLES.pending.border;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -2 }}
      className={`glass-card border-l-4 ${borderClass} p-5 transition-shadow hover:shadow-lg ${
        isPending ? "opacity-60" : ""
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3
          className={`font-display text-base font-semibold leading-snug text-slate-900 dark:text-white ${
            isCompleted ? "text-slate-400 line-through dark:text-slate-500" : ""
          }`}
        >
          {task.title}
        </h3>
        <Badge status={task.status} />
      </div>

      <p className="mb-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {task.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 dark:text-slate-500">
          Created {formatDate(task.createdAt)}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onToggleComplete(task)}
            disabled={isPending}
            title={isCompleted ? "Mark as pending" : "Mark as completed"}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600 disabled:cursor-not-allowed dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
          >
            {isCompleted ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Circle className="h-4 w-4" />}
          </button>
          <button
            onClick={() => onEdit(task)}
            disabled={isPending}
            title="Edit task"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-brand-50 hover:text-brand-600 disabled:cursor-not-allowed dark:hover:bg-brand-500/10 dark:hover:text-brand-400"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDeleteRequest(task)}
            disabled={isPending}
            title="Delete task"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
