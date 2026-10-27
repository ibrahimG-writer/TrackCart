"use client";

import { motion, useReducedMotion } from "framer-motion";
import { forwardRef } from "react";

/**
 * StaggerContainer - Wrapper for staggering child animations
 * Respects prefers-reduced-motion
 */
const StaggerContainer = forwardRef(function StaggerContainer(
  {
    children,
    as: Component = "div",
    stagger = 0.08,
    delayChildren = 0,
    className,
    style,
    ...props
  },
  ref
) {
  const reducedMotion = useReducedMotion();

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : stagger,
        delayChildren: reducedMotion ? 0 : delayChildren,
      },
    },
  };

  if (reducedMotion) {
    return (
      <Component
        ref={ref}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </Component>
    );
  }

  const MotionComponent = motion.create(Component);

  // oxlint-disable-next-line react/static-components
  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </MotionComponent>
  );
});

StaggerContainer.displayName = "StaggerContainer";

export { StaggerContainer };