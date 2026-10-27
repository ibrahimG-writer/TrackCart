"use client";

import { motion, useReducedMotion } from "framer-motion";
import { forwardRef } from "react";

/**
 * FadeIn - Simple fade motion component
 * Respects prefers-reduced-motion
 */
const FadeIn = forwardRef(function FadeIn(
  {
    children,
    as: Component = "div",
    delay = 0,
    duration = 0.3,
    className,
    style,
    ...props
  },
  ref
) {
  const reducedMotion = useReducedMotion();

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </MotionComponent>
  );
});

FadeIn.displayName = "FadeIn";

export { FadeIn };