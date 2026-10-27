"use client";

import { Reveal, StaggerContainer } from "../motion";
import { ChevronRight } from "lucide-react";
import { Section } from "../layout";

const collections = [
  {
    id: "leather",
    name: "Leather",
    description: "Heritage craftsmanship, modern silhouette.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&h=800&fit=crop",
    href: "/shop/leather",
    cta: "Shop Leather"
  },
  {
    id: "outerwear",
    name: "Outerwear",
    description: "Technical fabrics for urban environments.",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1200&h=800&fit=crop",
    href: "/shop/outerwear",
    cta: "Shop Outerwear"
  },
  {
    id: "denim",
    name: "Denim",
    description: "Raw selvedge, refined over time.",
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=1200&h=800&fit=crop",
    href: "/shop/denim",
    cta: "Shop Denim"
  }
];

export function Collections() {
  return (
    <Section variant="none" className="border-y border-border" aria-label="Collections">
      <StaggerContainer stagger={0.12}>
        {collections.map((collection, index) => (
          <Reveal key={collection.id} delay={index * 0.1}>
            <article className="relative min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] flex items-end">
              {/* Background image */}
              <div className="absolute inset-0 z-0" aria-hidden="true">
                <img
                  src={collection.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 w-full px-6 md:px-10 lg:px-16 pb-12 md:pb-16 lg:pb-20">
                <div className="max-w-xl">
                  <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:text-xs">
                    {collection.name}
                  </p>
                  <h3 className="mb-4 font-sans text-[clamp(1.75rem,4vw,3rem)] font-medium uppercase leading-tight tracking-[-0.02em] text-foreground">
                    {collection.description}
                  </h3>
                  <a
                    href={collection.href}
                    className="group inline-flex items-center gap-3 border-b border-foreground pb-2 text-[10px] uppercase tracking-[0.25em] text-foreground transition-opacity hover:opacity-60"
                  >
                    {collection.cta}
                    <ChevronRight
                      className="size-4 stroke-[1.5] transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </StaggerContainer>
    </Section>
  );
}