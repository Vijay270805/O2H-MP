import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as taskService from "../services/taskService";
import { TASK_STATUS } from "../utils/constants";

const INITIAL_STATS = { total: 0, completed: 0, pending: 0, inProgress: 0, progressPercentage: 0 };

/**
 * Single source of truth for all task data on the dashboard.
 *
 * Encapsulates fetching, filtering, searching and CRUD mutations
 * behind a small, predictable API so <Dashboard /> stays focused
 * on layout instead of data-fetching plumbing. The task list is
 * automatically re-fetched after every successful mutation, so the
 * UI never shows stale data without the user having to refresh.
 */
const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState(TASK_STATUS.ALL);
  const [searchTerm, setSearchTerm] = useState("");

  // Tracks per-task "busy" state so only the row being acted on
  // disables its buttons, instead of freezing the whole list.
  const [pendingIds, setPendingIds] = useState(new Set());
  const setRowPending = (id, isPending) => {
    setPendingIds((prev) => {
      const next = new Set(prev);
      isPending ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const loadTasks = useCallback(async ({ silent = false } = {}) => {
    if (!silent) setIsLoading(true);
    setError(null);
    try {
      const res = await taskService.fetchTasks({ status: statusFilter, search: searchTerm });
      setTasks(res.data);
      setStats(res.stats);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (payload) => {
    const created = await taskService.createTask(payload);
    toast.success("Task created successfully");
    await loadTasks({ silent: true });
    return created;
  };

  const editTask = async (id, payload) => {
    setRowPending(id, true);
    try {
      const updated = await taskService.updateTask(id, payload);
      toast.success("Task updated successfully");
      await loadTasks({ silent: true });
      return updated;
    } finally {
      setRowPending(id, false);
    }
  };

  const toggleComplete = async (task) => {
    const nextStatus = task.status === "completed" ? "pending" : "completed";
    setRowPending(task.id, true);
    try {
      await taskService.updateTask(task.id, { status: nextStatus });
      toast.success(
        nextStatus === "completed" ? "Task marked as completed 🎉" : "Task moved back to pending"
      );
      await loadTasks({ silent: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setRowPending(task.id, false);
    }
  };

  const removeTask = async (id) => {
    setRowPending(id, true);
    try {
      await taskService.deleteTask(id);
      toast.success("Task deleted");
      await loadTasks({ silent: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setRowPending(id, false);
    }
  };

  return {
    tasks,
    stats,
    isLoading,
    error,
    statusFilter,
    setStatusFilter,
    searchTerm,
    setSearchTerm,
    pendingIds,
    addTask,
    editTask,
    toggleComplete,
    removeTask,
    refresh: loadTasks,
  };
};

export default useTasks;
