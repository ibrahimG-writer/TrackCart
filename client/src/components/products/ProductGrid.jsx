"use client";

import { StaggerContainer } from "../motion";
import { ProductCard } from "./ProductCard";
import { forwardRef } from "react";
import { cn } from "cn";

/**
 * ProductGrid - Responsive product grid with staggered entrance animation
 */
const ProductGrid = forwardRef(function ProductGrid(
  {
    products = [],
    columns = 4,
    gap = "gap-8",
    staggerDelay = 0.08,
    className,
    ...props
  },
  ref
) {
  const columnClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <StaggerContainer
      ref={ref}
      as="div"
      stagger={staggerDelay}
      className={cn(
        "grid",
        columnClasses[columns] || columnClasses[4],
        gap,
        className
      )}
      {...props}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id || index}
          product={product}
          index={index}
        />
      ))}
    </StaggerContainer>
  );
});

ProductGrid.displayName = "ProductGrid";

export { ProductGrid };