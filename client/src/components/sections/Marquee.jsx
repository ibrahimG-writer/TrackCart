"use client";

const marqueeItems = [
  "TRIZIP",
  "✦",
  "Where Form Meets Function",
  "✦",
  "Spring Summer 2026",
  "✦",
  "TRIZIP",
  "✦",
  "Where Form Meets Function",
  "✦",
  "Spring Summer 2026",
  "✦"
];

export function Marquee() {
  return (
    <div
      className="overflow-hidden border-y border-border py-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      aria-hidden="true"
    >
      <div className="flex min-w-max gap-12 whitespace-nowrap animate-[marquee_20s_linear_infinite]">
        {marqueeItems.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}