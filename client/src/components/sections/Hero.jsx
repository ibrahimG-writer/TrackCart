"use client";

import { Reveal, SlideUp } from "../motion";
import { ChevronRight } from "lucide-react";

const heroData = {
  category: "New Collection",
  tagline: "Spring / Summer 2026",
  headline: [
    "WHERE",
    "FORM MEETS",
    "FUNCTION."
  ],
  description: "Contemporary outerwear designed with intention. Precision tailoring meets technical innovation for the modern wardrobe.",
  ctaText: "Explore Collection",
  ctaHref: "/shop/collections"
};

export function Hero() {
  return (
    <section
      aria-label="TRIZIP homepage hero"
      className="relative flex min-h-[calc(100vh-104px)] flex-col overflow-hidden border-x border-border/70"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, #E8D5C4 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 100% 100%, #D4C4B0 0%, transparent 50%), radial-gradient(ellipse 40% 30% at 0% 0%, #F5E6D3 0%, transparent 40%)"
        }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"
        }} />
      </div>

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-4" aria-hidden="true">
        <div className="border-r border-border/50" />
        <div className="border-r border-border/50" />
        <div className="border-r border-border/50" />
        <div />
      </div>

      <div className="relative z-10 flex flex-1 flex-col px-6 md:px-10 lg:px-16">
        {/* Top metadata bar */}
        <Reveal>
          <div className="grid grid-cols-3 border-b border-border py-5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:text-xs">
            <span>TRIZIP / SS26</span>
            <span className="text-center">{heroData.tagline}</span>
            <span className="text-right">{heroData.category}</span>
          </div>
        </Reveal>

        {/* Content: starts right under the bar, no centering, no big padding */}
        <div className="pt-8 pb-12 md:pt-10 lg:pt-12">
          <Reveal delay={0.12}>
            <div className="mb-6 h-0.5 w-24 bg-gradient-to-r from-primary via-primary/60 to-transparent" aria-hidden="true" />
          </Reveal>

          <div className="overflow-hidden">
            <SlideUp delay={0.15}>
              <h1 className="max-w-full font-sans text-[clamp(2.5rem,5.5vw,6rem)] font-medium uppercase leading-[0.85] tracking-[-0.05em] text-foreground">
                {heroData.headline.map((line, i) => (
                  <span key={i} className="block whitespace-nowrap">{line}</span>
                ))}
              </h1>
            </SlideUp>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 border-t border-border pt-8 md:grid-cols-2 md:items-end">
            <Reveal delay={0.3}>
              <p className="max-w-md text-sm leading-7 text-muted-foreground md:text-base">
                {heroData.description}
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex justify-start md:justify-end">
                <a
                  href={heroData.ctaHref}
                  className="group inline-flex items-center gap-3 bg-primary px-6 py-4 text-[10px] uppercase tracking-[0.25em] text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_8px_30px_-8px_rgba(111,78,55,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {heroData.ctaText}
                  <ChevronRight className="size-4 stroke-[1.5] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Footer pinned to bottom */}
        <Reveal delay={0.5}>
          <div className="mt-auto grid grid-cols-2 border-t border-border py-5 text-[9px] uppercase tracking-[0.25em] text-muted-foreground md:text-[10px]">
            <span>{heroData.category}</span>
            <span className="text-right">Scroll to Discover</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
