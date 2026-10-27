"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "cn";

/**
 * MobileMenuButton - Hamburger/Close button for mobile navigation
 * Animated transition between menu and close states
 */
const MobileMenuButton = forwardRef(function MobileMenuButton(
  { isOpen, onClick, "aria-label": ariaLabel, className, ...props },
  ref
) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || (isOpen ? "Close navigation" : "Open navigation")}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
      className={cn(
        "relative p-2 rounded-md transition-colors",
        "hover:bg-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      initial={false}
      animate={{
        rotate: isOpen ? (reducedMotion ? 0 : 90) : 0,
      }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...props}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 0 : 1,
          rotate: isOpen ? (reducedMotion ? 0 : -90) : 0,
          scale: isOpen ? 0.8 : 1,
        }}
        transition={{
          duration: reducedMotion ? 0.01 : 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <Menu className="size-6 stroke-[1.5]" aria-hidden="true" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          rotate: isOpen ? (reducedMotion ? 0 : 90) : -90,
          scale: isOpen ? 1 : 0.8,
        }}
        transition={{
          duration: reducedMotion ? 0.01 : 0.2,
          delay: reducedMotion ? 0 : 0.05,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <X className="size-6 stroke-[1.5]" aria-hidden="true" />
      </motion.div>
    </motion.button>
  );
});

MobileMenuButton.displayName = "MobileMenuButton";

export { MobileMenuButton };