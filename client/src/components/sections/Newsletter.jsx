"use client";

import { Reveal } from "../motion";
import { ChevronRight } from "lucide-react";
import { Section } from "../layout";

export function Newsletter() {
  return (
    <Section variant="spacious" className="border-t border-border" aria-label="Newsletter">
      <div className="max-w-2xl mx-auto text-center">
        <Reveal>
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:text-xs">
            Stay Updated
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mb-8 font-sans text-[clamp(2rem,5vw,3.5rem)] font-medium uppercase leading-tight tracking-[-0.03em]">
            Join the TRIZIP Collective
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mb-10 max-w-md mx-auto text-base leading-7 text-muted-foreground">
            Early access to new collections, exclusive releases, and editorial content.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <form className="flex flex-col gap-4 sm:flex-row sm:justify-center" action="#" method="POST">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="
                flex-1
                max-w-md
                px-4 py-3
                bg-transparent
                border-b border-border
                text-foreground
                placeholder:text-muted-foreground
                text-sm
                uppercase
                tracking-[0.15em]
                focus:outline-none
                focus:border-foreground
                transition-colors
              "
            />
            <button
              type="submit"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                px-6 py-3
                bg-primary
                text-primary-foreground
                text-[10px]
                uppercase
                tracking-[0.25em]
                transition-opacity
                hover:opacity-70
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
              "
            >
              Subscribe
              <ChevronRight
                className="
                  size-4
                  stroke-[1.5]
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                aria-hidden="true"
              />
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}