import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const VARIANT_CLASS = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  danger: "btn-danger",
};

/**
 * App-wide button. Every primary action in the portal renders through
 * this component so hover/press feedback and disabled/loading states
 * stay perfectly consistent.
 *
 * @param {"primary"|"secondary"|"danger"} variant
 * @param {boolean} isLoading - shows a spinner and disables the button
 */
const Button = ({
  children,
  variant = "primary",
  isLoading = false,
  disabled = false,
  className = "",
  type = "button",
  ...rest
}) => {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.97 }}
      disabled={disabled || isLoading}
      className={`${VARIANT_CLASS[variant]} ${className}`}
      {...rest}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  );
};

export default Button;
