"use client";

import { forwardRef } from "react";
import { cn } from "cn";

/**
 * Section - Base layout section component with consistent spacing
 * Provides responsive padding and max-width constraints
 */
const Section = forwardRef(function Section(
  {
    children,
    as: Component = "section",
    variant = "default",
    className,
    ...props
  },
  ref
) {
  const variants = {
    default: "py-16 md:py-24 lg:py-32",
    compact: "py-10 md:py-16 lg:py-20",
    spacious: "py-24 md:py-32 lg:py-40",
    none: "",
  };

  const containerClasses = "mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16";

  return (
    <Component
      ref={ref}
      className={cn(variants[variant], className)}
      {...props}
    >
      <div className={containerClasses}>
        {children}
      </div>
    </Component>
  );
});

Section.displayName = "Section";

export { Section };