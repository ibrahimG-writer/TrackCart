"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "cn";
import { Link } from "react-router-dom";
/**
 * ProductCard - Editorial product card for grid display
 * Clean, frameless design with subtle hover interactions
 */
const ProductCard = forwardRef(function ProductCard(
  {
    product,
    aspectRatio = "3/4",
    className,
    ...props
  },
  ref
) {
  const reducedMotion = useReducedMotion();
  const { name, category, price, image, colors = [], isNew = false } = product;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.article
      ref={ref}
      className={cn(
        "group relative flex flex-col",
        "bg-background",
        "transition-colors duration-300",
        className
      )}
      initial={false}
      whileHover={reducedMotion ? {} : { y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {/* Image wrapper */}
      
      <div className="relative overflow-hidden" style={{ aspectRatio }}>
        <Link
        to={`/product/${product.id}`}
        className="block"
        aria-label={`View ${name}`}
      >
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          initial={false}
          animate={{ opacity: 1 }}
          loading="lazy"
        />
        
        
        {/* Color indicators */}
        {colors.length > 0 && (
          <div
            className="absolute bottom-3 left-3 flex gap-1"
            aria-label="Available colors"
          >
            {colors.slice(0, 4).map((color, i) => (
              <span
                key={i}
                className="size-2 rounded-full border border-border/50 shadow-sm"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
            ))}
            {colors.length > 4 && (
              <span
                className="size-2 rounded-full border border-border/50 bg-background text-[8px] flex items-center justify-center text-foreground"
                aria-hidden="true"
              >
                +{colors.length - 4}
              </span>
            )}
          </div>
        )}

        {/* New badge */}
        {isNew && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-[9px] uppercase tracking-[0.2em] bg-foreground text-background">
              New
            </span>
          </div>
        )}
        </Link>

        {/* Quick add button */}
        <motion.button
          className="
            absolute bottom-3 right-3
            p-2 rounded-full bg-background/90 backdrop-blur-sm
            border border-border
            opacity-0 translate-y-2
            transition-all duration-300 ease-out
            hover:bg-foreground hover:text-background
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
            group-hover:opacity-100 group-hover:translate-y-0
          "
          aria-label={`Add ${name} to bag`}
          whileTap={reducedMotion ? {} : { scale: 0.9 }}
          transition={{ duration: 0.15 }}
        >
          <ShoppingBag className="size-4 stroke-[1.5]" aria-hidden="true" />
        </motion.button>

        {/* Focus visible state for keyboard navigation */}
        <div
          className="
            absolute inset-0
            border-2 border-ring
            opacity-0
            pointer-events-none
            focus-within:opacity-100
          "
          aria-hidden="true"
        />
      </div>

      {/* Product info */}
      <div className="mt-4 flex flex-col flex-1">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
            {category}
          </p>
          <h3 className="
            font-sans text-sm font-medium uppercase tracking-[0.05em]
            leading-snug text-foreground
            group-hover:text-primary transition-colors
          ">
            <Link to={`/product/${product.id}`}>
              {name}
            </Link>
          </h3>
        </div>
        <div className="mt-auto pt-3 border-t border-border/50">
          <p className="font-sans text-sm font-medium text-foreground">
            {formatPrice(price)}
          </p>
        </div>
      </div>
    </motion.article>
  );
});

ProductCard.displayName = "ProductCard";

export { ProductCard };