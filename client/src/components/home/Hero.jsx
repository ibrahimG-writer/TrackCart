"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Section } from "../layout";

export function Hero() {
  const reducedMotion = useReducedMotion();

  const ease = [0.16, 1, 0.3, 1];

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-background text-foreground"
      aria-label="TrackCart introduction"
    >
      {/* Editorial grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px)",
          backgroundSize: "25% 100%",
        }}
      />

      <Section
        variant="none"
        className="relative flex min-h-screen flex-col justify-between pt-32 pb-7 md:pt-36 md:pb-9 lg:pt-40"
      >
        {/* Top metadata */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0.01 : 0.6,
            delay: reducedMotion ? 0 : 0.2,
            ease,
          }}
          className="flex items-center justify-between border-b border-border pb-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span>TrackCart / 001</span>

          <span className="hidden md:block">
            Contemporary Outerwear
          </span>

          <span>2026</span>
        </motion.div>

        {/* Main hero */}
        <div className="relative flex flex-1 items-center py-12 md:py-16 lg:py-20">
          {/* Giant background number */}
          <motion.div
            aria-hidden="true"
            initial={{
              opacity: 0,
              scale: reducedMotion ? 1 : 1.08,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: reducedMotion ? 0.01 : 1.2,
              delay: reducedMotion ? 0 : 0.1,
              ease,
            }}
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-[30vw] font-semibold leading-none tracking-[-0.12em] text-foreground/[0.035] md:text-[26vw] lg:text-[22vw]"
          >
            01
          </motion.div>

          <div className="relative z-10 w-full">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0.01 : 0.6,
                delay: reducedMotion ? 0 : 0.35,
                ease,
              }}
              className="mb-5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
            >
              Outerwear / Made to move
            </motion.p>

            {/* Headline */}
            <div className="w-full overflow-visible">
              <motion.h1
                initial={{ y: reducedMotion ? 0 : "105%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: reducedMotion ? 0.01 : 0.9,
                  delay: reducedMotion ? 0 : 0.4,
                  ease,
                }}
                className="
                  w-full
                  text-[clamp(4rem,8.4vw,10rem)]
                  font-medium
                  uppercase
                  leading-[0.79]
                  tracking-[-0.075em]
                "
              >
                <span className="block whitespace-nowrap">
                  BUILT
                </span>

                <span className="block whitespace-nowrap">
                  FOR THE
                </span>

                <span className="block whitespace-nowrap">
                  OUTSIDE.
                </span>
              </motion.h1>
            </div>

            {/* Bottom content */}
            <div className="mt-10 flex flex-col justify-between gap-8 border-t border-border pt-5 md:mt-12 md:flex-row md:items-end">
              <motion.p
                initial={{ opacity: 0, y: reducedMotion ? 0 : 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reducedMotion ? 0.01 : 0.6,
                  delay: reducedMotion ? 0 : 0.9,
                  ease,
                }}
                className="max-w-sm text-sm leading-6 text-muted-foreground"
              >
                Contemporary outerwear with a point of view.
                Pieces designed for the streets, the weather,
                and everywhere in between.
              </motion.p>

              <motion.a
                href="#new-arrivals"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reducedMotion ? 0.01 : 0.6,
                  delay: reducedMotion ? 0 : 1,
                  ease,
                }}
                whileHover={reducedMotion ? {} : { x: 5 }}
                className="group inline-flex w-fit items-center gap-3 border-b border-foreground pb-2 text-[10px] uppercase tracking-[0.2em]"
              >
                Shop new arrivals

                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: reducedMotion ? 0.01 : 0.6,
            delay: reducedMotion ? 0 : 1.25,
          }}
          className="flex items-center justify-between border-t border-border pt-4 text-[9px] uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span>New collection</span>

          <motion.a
            href="#new-arrivals"
            animate={
              reducedMotion
                ? {}
                : {
                    y: [0, 5, 0],
                  }
            }
            transition={
              reducedMotion
                ? {}
                : {
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            aria-label="Scroll to new arrivals"
          >
            <ArrowDownRight size={16} strokeWidth={1.3} />
          </motion.a>

          <span>Scroll to discover</span>
        </motion.div>
      </Section>
    </section>
  );
}