
"use client";

import { forwardRef } from "react";

const Wordmark = forwardRef(function Wordmark(
  {
    className,
    as: Component = "a",
    "aria-label": ariaLabel = "TRIZIP Home",
    ...props
  },
  ref
) {
  return (
    <Component
      ref={ref}
      className={className}
      aria-label={ariaLabel}
      {...props}
    >
      <span className="font-sans tracking-[0.25em] text-[0.75rem] uppercase leading-none">
        TRIZIP
      </span>
    </Component>
  );
});

Wordmark.displayName = "Wordmark";

export { Wordmark };
