import { motion } from "framer-motion";

/**
 * Original, lightweight illustration (no external assets) depicting
 * an empty checklist — keeps the empty state on-brand instead of a
 * generic icon-and-text block.
 */
const ChecklistIllustration = () => (
  <svg width="180" height="150" viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="boardGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#818cf8" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>
    <rect x="30" y="14" width="120" height="124" rx="14" className="fill-slate-100 dark:fill-white/[0.06]" />
    <rect x="62" y="4" width="56" height="22" rx="8" fill="url(#boardGradient)" />
    <rect x="48" y="42" width="20" height="20" rx="6" className="fill-white dark:fill-white/10" stroke="#a78bfa" strokeWidth="2" />
    <rect x="78" y="47" width="64" height="10" rx="5" className="fill-slate-200 dark:fill-white/10" />
    <rect x="48" y="76" width="20" height="20" rx="6" className="fill-white dark:fill-white/10" stroke="#cbd5e1" strokeWidth="2" />
    <rect x="78" y="81" width="50" height="10" rx="5" className="fill-slate-200 dark:fill-white/10" />
    <rect x="48" y="110" width="20" height="20" rx="6" className="fill-white dark:fill-white/10" stroke="#cbd5e1" strokeWidth="2" />
    <rect x="78" y="115" width="40" height="10" rx="5" className="fill-slate-200 dark:fill-white/10" />
    <path d="M52 52L57 57L65 47" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Friendly empty state for: no tasks yet, or no tasks matching the
 * current search/filter. The action button (if provided) lets the
 * user immediately do something about it instead of staring at a wall.
 */
const EmptyState = ({ title, description, actionLabel, onAction }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card flex flex-col items-center justify-center px-6 py-16 text-center"
  >
    <ChecklistIllustration />
    <h3 className="mt-6 font-display text-lg font-semibold text-slate-800 dark:text-slate-100">
      {title}
    </h3>
    <p className="mt-1.5 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
    {actionLabel && onAction && (
      <button onClick={onAction} className="btn-primary mt-6">
        {actionLabel}
      </button>
    )}
  </motion.div>
);

export default EmptyState;
