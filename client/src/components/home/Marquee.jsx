"use client";

import { motion } from "framer-motion";

const items = [
  "TrackCart",
  "OUTERWEAR",
  "BUILT FOR THE OUTSIDE",
  "TrackCart",
  "OUTERWEAR",
  "BUILT FOR THE OUTSIDE",
];

export function Marquee() {
  return (
    <section
      id="discover"
      className="overflow-hidden border-y border-border bg-background py-5"
      aria-label="TrackCart brand statement"
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex w-max"
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center whitespace-nowrap"
          >
            <span className="px-8 text-[11px] uppercase tracking-[0.22em] text-muted-foreground md:px-12">
              {item}
            </span>

            <span
              aria-hidden="true"
              className="text-[8px] text-muted-foreground/50"
            >
              ✦
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}