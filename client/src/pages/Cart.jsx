
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

function formatPrice(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function Cart() {
  const {
    items,
    itemCount,
    subtotal,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-8 sm:px-8 lg:px-12 lg:pt-10">
        <div className="border-b border-border pb-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Your selection
          </p>

          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-medium uppercase tracking-tight sm:text-5xl">
              Your Bag
            </h1>

            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {itemCount} {itemCount === 1 ? "Item" : "Items"}
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Nothing here yet
            </p>

            <h2 className="mt-4 text-2xl uppercase">
              Your bag is empty
            </h2>

            <p className="mt-3 text-sm text-muted-foreground">
              Explore the collection and find your next favourite piece.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground"
            >
              <ArrowLeft size={15} />
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 py-8 lg:grid-cols-[1fr_360px] lg:gap-16">
            {/* Cart items */}
            <section aria-label="Shopping bag items">
              <div className="hidden grid-cols-[1fr_100px_100px] gap-4 border-b border-border pb-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:grid">
                <span>Product</span>
                <span>Quantity</span>
                <span className="text-right">Total</span>
              </div>

              <div className="divide-y divide-border">
                {items.map((item) => (
                  <article
                    key={item.key}
                    className="grid grid-cols-1 gap-5 py-6 sm:grid-cols-[1fr_100px_100px] sm:items-center sm:gap-4"
                  >
                    <div className="flex min-w-0 gap-4">
                      <Link
                        to={`/product/${item.productId}`}
                        className="w-24 shrink-0 overflow-hidden bg-muted sm:w-28"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="aspect-[3/4] w-full object-cover"
                        />
                      </Link>

                      <div className="min-w-0 py-1">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          {item.category}
                        </p>

                        <Link
                          to={`/product/${item.productId}`}
                          className="mt-2 block text-sm font-medium uppercase leading-5 hover:text-primary"
                        >
                          {item.name}
                        </Link>

                        <p className="mt-2 text-sm">
                          {formatPrice(item.price)}
                        </p>

                        {item.size && (
                          <p className="mt-2 text-xs text-muted-foreground">
                            Size: {item.size}
                          </p>
                        )}

                        {item.color && (
                          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                            Color
                            <span
                              className="size-3 rounded-full border border-border"
                              style={{ backgroundColor: item.color }}
                            />
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => removeItem(item.key)}
                          className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 size={13} />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between sm:justify-start">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground sm:hidden">
                        Quantity
                      </span>

                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name} quantity`}
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            updateQuantity(item.key, item.quantity - 1)
                          }
                          className="p-2.5 disabled:opacity-30"
                        >
                          <Minus size={13} />
                        </button>

                        <span className="min-w-7 text-center text-xs tabular-nums">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          aria-label={`Increase ${item.name} quantity`}
                          disabled={item.quantity >= item.stock}
                          onClick={() =>
                            updateQuantity(item.key, item.quantity + 1)
                          }
                          className="p-2.5 disabled:opacity-30"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground sm:hidden">
                        Item total
                      </span>

                      <p className="text-sm font-medium tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest hover:text-primary"
                >
                  <ArrowLeft size={14} />
                  Continue shopping
                </Link>

                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[10px] uppercase tracking-widest text-muted-foreground underline underline-offset-4 hover:text-destructive"
                >
                  Clear bag
                </button>
              </div>
            </section>

            {/* Order summary */}
            <aside className="h-fit border border-border p-6 sm:p-8">
              <h2 className="text-lg uppercase tracking-tight">
                Order Summary
              </h2>

              <div className="mt-7 space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Subtotal ({itemCount} items)
                  </span>
                  <span className="tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-xs text-muted-foreground">
                    Calculated at checkout
                  </span>
                </div>

                <div className="border-t border-border pt-5">
                  <div className="flex justify-between gap-4">
                    <span className="text-xs uppercase tracking-widest">
                      Subtotal
                    </span>
                    <span className="text-lg font-medium tabular-nums">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="mt-8 flex w-full items-center justify-center bg-primary px-5 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Proceed to checkout
              </Link>

              <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
                Shipping costs and final order totals will be confirmed
                during checkout.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
