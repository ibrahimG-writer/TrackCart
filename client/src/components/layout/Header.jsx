"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DesktopNav, MobileNav, MobileMenuButton } from "../navigation";
import { ShoppingBag } from "lucide-react";
import { cn } from "cn";
import { useCart } from "../../context/CartContext"; 

/**
 * Header - Global TrackCart header with scroll-aware behavior
 * Desktop: Full navigation with wordmark, categories, utilities
 * Mobile: Wordmark, Bag, Menu button with full-screen panel
 * Smoothly transitions between expanded and compact states on scroll
 */
export function Header({ className }) {
  const { itemCount } = useCart();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  // Scroll handler with passive listener for performance
  const handleScroll = useCallback(() => {
    const threshold = 20;
    setIsScrolled(window.scrollY > threshold);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 w-full",
        "bg-background/80 backdrop-blur-sm",
        "border-b border-border/50",
        "transition-all duration-400 ease-out",
        isScrolled && "bg-background/95 border-border shadow-[0_1px_0_var(--border)]",
        className
      )}
      role="banner"
    >
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <DesktopNav />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between px-4 py-4 gap-4">
          {/* Wordmark */}
          <nav
            as="a"
            href="/"
            className="flex-shrink-0 font-sans tracking-[0.25em] text-[0.75rem] uppercase leading-none text-foreground"
            aria-label="TrackCart Home"
          >
            TrackCart
          </nav>

          {/* Right: Bag + Menu */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <motion.a
              href="/bag"
              className="relative p-2 rounded-md hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              whileHover={reducedMotion ? {} : { scale: 1.05 }}
              whileTap={reducedMotion ? {} : { scale: 0.95 }}
              aria-label={`Shopping bag, ${itemCount} items`}
            >
              <ShoppingBag className="size-5 stroke-[1.5]" aria-hidden="true" />
               {itemCount > 0 && (
            <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] text-primary-foreground">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
               )}
            </motion.a>
            <MobileMenuButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-1"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        id="mobile-navigation"
      />
    </motion.header>
  );
}