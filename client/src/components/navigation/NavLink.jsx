"use client";

import { motion, useReducedMotion } from "framer-motion";
import { forwardRef } from "react";

/**
 * NavLink - Navigation link with subtle hover animation
 * Respects prefers-reduced-motion
 */
const NavLink = forwardRef(function NavLink(
  {
    children,
    href,
    isActive = false,
    className,
    "aria-current": ariaCurrent,
    ...props
  },
  ref
) {
  const reducedMotion = useReducedMotion();

  const baseClasses =
    "relative font-sans text-sm uppercase tracking-[0.15em] transition-colors duration-200 ease-out";
  const activeClasses = "text-foreground";
  const inactiveClasses = "text-muted-foreground hover:text-foreground";

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-current={isActive ? "page" : ariaCurrent}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className || ""}`}
      initial={false}
      animate={{}}
      whileHover={reducedMotion ? {} : { x: 2 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
      {!isActive && (
        <motion.span
          className="absolute bottom-[-4px] left-0 right-0 h-[1px] bg-current scale-x-0 origin-left"
          initial={false}
          animate={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left center" }}
          aria-hidden="true"
        />
      )}
    </motion.a>
  );
});

NavLink.displayName = "NavLink";

export { NavLink };