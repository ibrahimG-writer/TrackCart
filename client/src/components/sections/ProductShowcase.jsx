
"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Reveal } from "../motion";
import { ProductGrid } from "../products";
import { Section } from "../layout";
import { getNewArrivals } from "../../services/productService";

export function ProductShowcase() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getNewArrivals()
      .then((products) => {
        if (!cancelled) {
          setFeaturedProducts(products.slice(0, 4));
        }
      })
      .catch((err) => {
        console.error("Failed to load featured products:", err);

        if (!cancelled) {
          setError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Section variant="spacious" aria-label="Featured products">
      <div className="mb-12 md:mb-16">
        <Reveal>
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:text-xs">
            Featured
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-sans text-[clamp(2rem,5vw,3.5rem)] font-medium uppercase leading-tight tracking-[-0.03em]">
            New Arrivals
          </h2>
        </Reveal>
      </div>

      {loading ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          Loading new arrivals...
        </p>
      ) : error ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          Unable to load products right now.
        </p>
      ) : featuredProducts.length > 0 ? (
        <ProductGrid
          products={featuredProducts}
          columns={4}
          gap="gap-8"
          staggerDelay={0.08}
        />
      ) : (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No new arrivals available right now.
        </p>
      )}

      <div className="mt-10 flex justify-center">
        <Link
          to="/shop"
          className="border-b border-current pb-1 text-xs uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
        >
          Explore All Products
        </Link>
      </div>
    </Section>
  );
}
