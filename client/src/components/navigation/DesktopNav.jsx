
"use client";

import { useCart } from "../../context/CartContext";
import { NavLink } from "./NavLink";
import { IconButton } from "./IconButton";
import { Search, User, ShoppingBag } from "lucide-react";
import { cn } from "cn";
import { Link } from "react-router-dom";

export function DesktopNav({ className, wordmarkHref = "/" }) {
  const { itemCount } = useCart();

  const navigation = [
    { label: "Shop", href: "/shop" },
    { label: "New Arrivals", href: "/shop" },
    { label: "Outerwear", href: "/shop" },
    { label: "Vintage", href: "/shop" },
    { label: "Collections", href: "/shop" },
  ];

  const utilities = [
    { icon: Search, label: "Search", href: "/search" },
    { icon: User, label: "Account", href: "/account" },
  ];

  return (
    <nav
      className={cn(
        "flex items-center justify-between w-full px-6 md:px-10 lg:px-16",
        "py-6 md:py-8",
        "gap-8 md:gap-12",
        className
      )}
      aria-label="Main navigation"
    >
      {/* Wordmark */}
      <div className="flex-shrink-0">
        <Link
          to={wordmarkHref}
          className="text-foreground hover:text-foreground focus-visible:outline-none"
          aria-label="TRIZIP Home"
        >
          <span className="font-sans tracking-[0.25em] text-[0.75rem] uppercase leading-none">
            TRIZIP
          </span>
        </Link>
      </div>

      {/* Main navigation */}
      <div
        className="hidden md:flex items-center justify-center flex-1 gap-10"
        role="navigation"
        aria-label="Product categories"
      >
        {navigation.map((item) => (
          <NavLink key={item.label} href={item.href}>
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Utility icons */}
      <div className="flex items-center gap-2 md:gap-4">
        {utilities.map((item) => (
          <IconButton
            key={item.label}
            aria-label={item.label}
            as="a"
            href={item.href}
          >
            <item.icon
              className="size-5 stroke-[1.5]"
              aria-hidden="true"
            />
          </IconButton>
        ))}

        <Link
          to="/bag"
          aria-label={`Shopping bag, ${itemCount} items`}
          className="relative flex size-10 items-center justify-center"
        >
          <ShoppingBag className="size-5 stroke-[1.5]" aria-hidden="true" />

          {itemCount > 0 && (
            <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] text-primary-foreground">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
