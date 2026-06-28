import { motion } from "framer-motion";
import { FILTERS } from "../../utils/constants";

/** Segmented filter control: All / Pending / In Progress / Completed. */
const TaskFilters = ({ activeFilter, onChange }) => (
  <div className="flex w-full gap-1.5 overflow-x-auto rounded-xl bg-slate-100 p-1.5 dark:bg-white/5 sm:w-auto">
    {FILTERS.map((filter) => {
      const isActive = activeFilter === filter.value;
      return (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`relative whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
            isActive ? "text-white" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }`}
        >
          {isActive && (
            <motion.span
              layoutId="active-filter-pill"
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-600 to-violet-600 shadow-sm"
              transition={{ type: "spring", duration: 0.4 }}
            />
          )}
          <span className="relative z-10">{filter.label}</span>
        </button>
      );
    })}
  </div>
);

export default TaskFilters;
