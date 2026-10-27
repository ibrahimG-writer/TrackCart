"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import jk1 from "../../assets/images/jacket-01.jfif";


const products = [
  {
    number: "01",
    name: "TrackCart Leather Jacket",
    category: "Leather / Black",
    price: "$149",
    image: {jk1},
  },
  {
    number: "02",
    name: "TrackCart Bomber",
    category: "Outerwear / Black",
    price: "$129",
    image: {jk2},
  },
  {
    number: "03",
    name: "TrackCart Vintage",
    category: "Vintage / One of One",
    price: "$179",
    image: {jk3},
  },
];

export function NewArrivals() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="new-arrivals"
      className="border-t border-border bg-background"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-36">
        {/* Section heading */}
        <div className="mb-12 flex items-end justify-between border-b border-border pb-5 md:mb-16">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              TrackCart / 002
            </p>

            <h2 className="text-4xl font-medium uppercase tracking-[-0.05em] md:text-6xl lg:text-7xl">
              New Arrivals
            </h2>
          </div>

          <a
            href="/shop/new-arrivals"
            className="group hidden items-center gap-3 border-b border-foreground pb-2 text-[10px] uppercase tracking-[0.2em] md:flex"
          >
            View all

            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </a>
        </div>

        {/* Products */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <motion.a
              key={product.number}
              href={`/product/${product.number}`}
              initial={{
                opacity: 0,
                y: reducedMotion ? 0 : 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-100px",
              }}
              transition={{
                duration: reducedMotion ? 0.01 : 0.7,
                delay: reducedMotion ? 0 : index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group block"
            >
              {/* Product image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  whileHover={
                    reducedMotion
                      ? {}
                      : {
                          scale: 1.035,
                        }
                  }
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />

                {/* Number */}
                <span className="absolute left-4 top-4 text-[9px] uppercase tracking-[0.2em] text-white mix-blend-difference">
                  {product.number}
                </span>

                {/* Hover action */}
                <div className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-white text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowUpRight
                    className="size-4"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* Product information */}
              <div className="flex items-start justify-between gap-4 border-b border-border py-4">
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-[0.08em]">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {product.category}
                  </p>
                </div>

                <span className="text-xs text-muted-foreground">
                  {product.price}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-10 md:hidden">
          <a
            href="/shop/new-arrivals"
            className="inline-flex items-center gap-3 border-b border-foreground pb-2 text-[10px] uppercase tracking-[0.2em]"
          >
            View all

            <ArrowUpRight
              className="size-4"
              strokeWidth={1.5}
            />
          </a>
        </div>
      </div>
    </section>
  );
}