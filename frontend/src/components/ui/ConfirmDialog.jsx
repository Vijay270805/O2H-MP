import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";

/**
 * Confirms a destructive action (deleting a task) before it happens.
 * Reused for any future "are you sure?" moment in the app.
 */
const ConfirmDialog = ({ isOpen, onClose, onConfirm, isLoading, title, description }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-sm">
    <div className="flex items-start gap-3">
      <div className="rounded-full bg-rose-50 p-2 dark:bg-rose-500/10">
        <AlertTriangle className="h-5 w-5 text-rose-500" />
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
    <div className="mt-6 flex justify-end gap-2">
      <Button variant="secondary" onClick={onClose} disabled={isLoading}>
        Cancel
      </Button>
      <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
        Delete
      </Button>
    </div>
  </Modal>
);

export default ConfirmDialog;
