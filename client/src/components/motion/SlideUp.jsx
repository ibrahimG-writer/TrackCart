"use client";

import { motion, useReducedMotion } from "framer-motion";
import { forwardRef } from "react";

/**
 * SlideUp - Vertical slide motion component
 * Respects prefers-reduced-motion
 */
const SlideUp = forwardRef(function SlideUp(
  {
    children,
    as: Component = "div",
    delay = 0,
    distance = 20,
    duration = 0.5,
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
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
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

SlideUp.displayName = "SlideUp";

export { SlideUp };