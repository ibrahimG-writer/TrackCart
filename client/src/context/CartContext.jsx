
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "trizip-cart";

function readCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Could not save cart:", error);
    }
  }, [items]);

  const addItem = useCallback(
    (product, options = {}) => {
      if (!product?.id) {
        return { ok: false, reason: "invalid-product" };
      }

      const price = Number(product.price);

      if (!Number.isFinite(price) || price < 0) {
        return { ok: false, reason: "invalid-price" };
      }

      // Use 99 as default stock for mock products without a stock field.
      const stock = Math.max(
        0,
        Number(product.stock ?? 99) || 0
      );

      if (stock < 1) {
        return { ok: false, reason: "out-of-stock" };
      }

      const size = options.size ?? "";
      const color = options.color ?? "";
      const requestedQty = Math.max(
        1,
        Math.floor(Number(options.quantity) || 1)
      );

      // Different sizes or colors of the same product are separate items.
      const key = `${product.id}::${size}::${color}`;
      const existing = items.find((item) => item.key === key);
      const currentQty = existing?.quantity ?? 0;
      const nextQty = Math.min(stock, currentQty + requestedQty);

      if (nextQty <= currentQty) {
        return { ok: false, reason: "stock-limit" };
      }

      let nextItems;

      if (existing) {
        nextItems = items.map((item) =>
          item.key === key
            ? { ...item, quantity: nextQty, stock }
            : item
        );
      } else {
        nextItems = [
          ...items,
          {
            key,
            productId: product.id,
            name: product.name ?? "Product",
            category: product.category ?? "",
            price,
            image: product.image ?? product.images?.[0] ?? "",
            stock,
            size,
            color,
            quantity: Math.min(stock, requestedQty),
          },
        ];
      }

      setItems(nextItems);
      return { ok: true };
    },
    [items]
  );

  const updateQuantity = useCallback((key, quantity) => {
    const requestedQty = Math.floor(Number(quantity));

    setItems((current) =>
      current.map((item) => {
        if (item.key !== key) return item;

        return {
          ...item,
          quantity: Math.max(
            1,
            Math.min(item.stock ?? 99, requestedQty || 1)
          ),
        };
      })
    );
  }, []);

  const removeItem = useCallback((key) => {
    setItems((current) => current.filter((item) => item.key !== key));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
