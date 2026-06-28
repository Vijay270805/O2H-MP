import { AnimatePresence } from "framer-motion";
import TaskCard from "./TaskCard";
import EmptyState from "../ui/EmptyState";
import { TaskCardSkeleton } from "../ui/Skeleton";

/**
 * Renders exactly one of three states: loading skeletons, an empty
 * state (tailored to whether a search/filter is active), or the
 * actual grid of tasks. Keeping this branching here means <Dashboard />
 * doesn't need to know about any of these edge cases.
 */
const TaskList = ({
  tasks,
  isLoading,
  pendingIds,
  hasActiveFilters,
  onToggleComplete,
  onEdit,
  onDeleteRequest,
  onCreateNew,
  onClearFilters,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return hasActiveFilters ? (
      <EmptyState
        title="No matching tasks"
        description="Try adjusting your search or filter — or clear them to see everything again."
        actionLabel="Clear filters"
        onAction={onClearFilters}
      />
    ) : (
      <EmptyState
        title="No tasks yet"
        description="Your board is clear. Create your first task to start tracking progress."
        actionLabel="Create your first task"
        onAction={onCreateNew}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isPending={pendingIds.has(task.id)}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDeleteRequest={onDeleteRequest}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
