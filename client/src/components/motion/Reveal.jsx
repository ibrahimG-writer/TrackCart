"use client";

import { motion, useReducedMotion } from "framer-motion";
import { forwardRef } from "react";

/**
 * Reveal - Base motion component for scroll-triggered and mount animations
 * Respects prefers-reduced-motion
 */
const Reveal = forwardRef(function Reveal(
  {
    children,
    as: Component = "div",
    initial = { opacity: 0, y: 20 },
    animate = { opacity: 1, y: 0 },
    transition = {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
    whileInView,
    viewport = { once: true, margin: "-100px" },
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
        style={{ ...style, opacity: 1, transform: "none" }}
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
      initial={initial}
      animate={animate}
      transition={transition}
      whileInView={whileInView}
      viewport={viewport}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </MotionComponent>
  );
});

Reveal.displayName = "Reveal";

export { Reveal };