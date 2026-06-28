import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import StatsCards from "../components/tasks/StatsCards";
import SearchBar from "../components/tasks/SearchBar";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskList from "../components/tasks/TaskList";
import TaskForm from "../components/tasks/TaskForm";
import Modal from "../components/ui/Modal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import Button from "../components/ui/Button";
import useTasks from "../hooks/useTasks";
import useDebounce from "../hooks/useDebounce";
import { TASK_STATUS } from "../utils/constants";

const Dashboard = () => {
  const {
    tasks,
    stats,
    isLoading,
    statusFilter,
    setStatusFilter,
    searchTerm,
    setSearchTerm,
    pendingIds,
    addTask,
    editTask,
    toggleComplete,
    removeTask,
  } = useTasks();

  // Local input state is separate from the debounced value that
  // actually triggers a fetch, so typing feels instant.
  const [searchInput, setSearchInput] = useState(searchTerm);
  const debouncedSearch = useDebounce(searchInput, 400);

  // Sync the debounced value into the hook that drives the API call.
  useEffect(() => {
    setSearchTerm(debouncedSearch);
  }, [debouncedSearch, setSearchTerm]);

  const [formModal, setFormModal] = useState({ isOpen: false, task: null });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openCreateModal = () => setFormModal({ isOpen: true, task: null });
  const openEditModal = (task) => setFormModal({ isOpen: true, task });
  const closeFormModal = () => setFormModal({ isOpen: false, task: null });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      if (formModal.task) {
        await editTask(formModal.task.id, values);
      } else {
        await addTask(values);
      }
      closeFormModal();
    } catch {
      // Errors are already surfaced via toast inside the hook.
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await removeTask(deleteTarget.id);
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const clearFilters = () => {
    setStatusFilter(TASK_STATUS.ALL);
    setSearchInput("");
  };

  const hasActiveFilters = statusFilter !== TASK_STATUS.ALL || searchTerm.trim() !== "";

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Signature ambient gradient blobs — subtle, slow-drifting, theme-aware */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 animate-blob rounded-full bg-brand-400/20 blur-3xl dark:bg-brand-600/20" />
        <div className="absolute right-0 top-1/3 h-96 w-96 animate-blob rounded-full bg-violet-400/20 blur-3xl [animation-delay:4s] dark:bg-violet-600/15" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 animate-blob rounded-full bg-sky-400/15 blur-3xl [animation-delay:8s] dark:bg-sky-600/10" />
      </div>

      <Navbar />

      <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 animate-fade-in">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Hello , Welcomeee
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Let's get things done! Manage your tasks and stay productive with ease.
          </p>
        </div>

        <div className="mb-8">
          <StatsCards stats={stats} isLoading={isLoading} />
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <TaskFilters activeFilter={statusFilter} onChange={setStatusFilter} />
            <SearchBar value={searchInput} onChange={setSearchInput} />
          </div>
          <Button onClick={openCreateModal} className="w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        </div>

        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          pendingIds={pendingIds}
          hasActiveFilters={hasActiveFilters}
          onToggleComplete={toggleComplete}
          onEdit={openEditModal}
          onDeleteRequest={setDeleteTarget}
          onCreateNew={openCreateModal}
          onClearFilters={clearFilters}
        />
      </main>

      <Modal
        isOpen={formModal.isOpen}
        onClose={closeFormModal}
        title={formModal.task ? "Edit Task" : "Create New Task"}
      >
        <TaskForm
          initialValues={formModal.task}
          onSubmit={handleSubmit}
          onCancel={closeFormModal}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete this task?"
        description={`"${deleteTarget?.title}" will be permanently removed. This action cannot be undone.`}
      />
    </div>
  );
};

export default Dashboard;
