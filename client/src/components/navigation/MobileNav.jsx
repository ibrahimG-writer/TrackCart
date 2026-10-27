"use client";

import { motion, useReducedMotion } from "framer-motion";
import { X, Search, User, ShoppingBag, ChevronRight } from "lucide-react";
import { NavLink } from "./NavLink";
import { cn } from "cn";

/**
 * MobileNav - Full-screen mobile navigation panel
 * Animated with Framer Motion, fully accessible
 */
export function MobileNav({ isOpen, onClose, wordmarkHref = "/" }) {
  const reducedMotion = useReducedMotion();

  const navigation = [
    { label: "New Arrivals", href: "/shop/new-arrivals" },
    { label: "Outerwear", href: "/shop/outerwear" },
    { label: "Vintage", href: "/shop/vintage" },
    { label: "Denim", href: "/shop/denim" },
    { label: "Collections", href: "/shop/collections" },
  ];

  const utilities = [
    { icon: Search, label: "Search", href: "/search" },
    { icon: User, label: "Account", href: "/account" },
    { icon: ShoppingBag, label: "Bag", href: "/bag" },
  ];

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: reducedMotion ? 0 : "100%",
      }}
      transition={{
        type: "tween",
        duration: reducedMotion ? 0.01 : 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="fixed inset-0 z-50 flex flex-col bg-background"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-6 border-b border-border">
        <nav
          as="a"
          href={wordmarkHref}
          className="font-sans tracking-[0.25em] text-[0.75rem] uppercase leading-none text-foreground"
          aria-label="TrackCart Home"
          onClick={onClose}
        >
          TrackCart
        </nav>
        <motion.button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Close navigation"
          whileHover={reducedMotion ? {} : { scale: 1.05 }}
          whileTap={reducedMotion ? {} : { scale: 0.95 }}
          transition={{ duration: 0.15 }}
        >
          <X className="size-6 stroke-[1.5]" aria-hidden="true" />
        </motion.button>
      </header>

      {/* Navigation Links */}
      <nav
        className="flex-1 overflow-y-auto px-6 py-10"
        role="navigation"
        aria-label="Product categories"
      >
        <ul className="space-y-6" aria-label="Main navigation">
          {navigation.map((item, index) => (
            <motion.li
              key={item.label}
              initial={false}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: reducedMotion ? 0 : index * 0.06,
                duration: reducedMotion ? 0.01 : 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <NavLink
                as="a"
                href={item.href}
                className="text-2xl md:text-3xl font-sans uppercase tracking-[0.1em] leading-tight"
                onClick={onClose}
              >
                {item.label}
                <ChevronRight className="inline-block ml-4 size-5 stroke-[1.5] transition-transform" aria-hidden="true" />
              </NavLink>
            </motion.li>
          ))}
        </ul>

        {/* Divider */}
        <div className="my-10 h-[1px] bg-border" aria-hidden="true" />

        {/* Utilities */}
        <div className="flex flex-col gap-4" role="navigation" aria-label="Utilities">
          {utilities.map((item) => (
            <motion.div
              whileHover={reducedMotion ? {} : { scale: 1.05 }}
              whileTap={reducedMotion ? {} : { scale: 0.95 }}
            >
              <Link
                to="/bag"
                className="relative block rounded-md p-2 transition-colors hover:bg-accent"
                aria-label={`Shopping bag, ${itemCount} items`}
              >
                <ShoppingBag
                  className="size-5 stroke-[1.5]"
                  aria-hidden="true"
                />

                {itemCount > 0 && (
                  <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] text-primary-foreground">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Link>
            </motion.div>
                      ))}
                    </div>
                  </nav>
                </motion.div>
  );
}