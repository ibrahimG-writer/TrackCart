
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "cn";

const IconButton = forwardRef(function IconButton(
  {
    children,
    "aria-label": ariaLabel,
    className,
    as: Component = "button",
    ...props
  },
  ref
) {
  const reducedMotion = useReducedMotion();

  const motionProps = {
    ...props,
    ref,
    type: Component === "button" ? "button" : undefined,
    "aria-label": ariaLabel,
    className: cn(
      "relative p-2 rounded-md transition-colors duration-200 ease-out",
      "hover:bg-accent",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "active:scale-[0.96]",
      className
    ),
    initial: false,
    animate: reducedMotion ? {} : { scale: 1 },
    whileHover: reducedMotion ? {} : { scale: 1.05 },
    whileTap: reducedMotion ? {} : { scale: 0.96 },
    transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
  };

  if (Component === "a") {
    return <motion.a {...motionProps}>{children}</motion.a>;
  }

  if (Component === "button") {
    return <motion.button {...motionProps}>{children}</motion.button>;
  }

  return <motion.div {...motionProps}>{children}</motion.div>;
});

IconButton.displayName = "IconButton";

export { IconButton };
