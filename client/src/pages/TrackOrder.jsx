
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { orderRepository } from "../services/orderRepository";

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get("orderId") || "");
  const [pin, setPin] = useState(searchParams.get("pin") || "");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (event) => {
    event.preventDefault();
    setError("");
    setOrder(null);
    setLoading(true);

    try {
      const result = await orderRepository.trackOrder(
        orderId.trim(),
        pin.trim()
      );

      if (!result) {
        setError("Order not found. Check your Order ID and Tracking PIN.");
      } else {
        setOrder(result);
      }
    } catch {
      setError("Tracking is temporarily unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "mt-1 w-full rounded-md border border-border bg-card px-3 py-3 text-sm outline-none focus:border-primary";

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 md:py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        TRIZIP · Delivery updates
      </p>
      <h1 className="mt-3 text-3xl font-medium md:text-4xl">
        Track your order
      </h1>
      <p className="mt-3 text-muted-foreground">
        Enter the Order ID and Tracking PIN from your confirmation.
      </p>

      <form
        onSubmit={handleTrack}
        className="mt-8 space-y-5 rounded-lg border border-border p-5 md:p-7"
      >
        <label className="block text-sm">
          Order ID
          <input
            className={inputClass}
            value={orderId}
            onChange={(event) => setOrderId(event.target.value)}
            placeholder="e.g. TRZ-..."
            required
          />
        </label>

        <label className="block text-sm">
          Tracking PIN
          <input
            className={inputClass}
            value={pin}
            onChange={(event) => setPin(event.target.value)}
            inputMode="numeric"
            autoComplete="off"
            placeholder="Enter your PIN"
            required
          />
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary px-5 py-4 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          {loading ? "Checking..." : "Track order"}
        </button>
      </form>

      {order && (
        <section className="mt-8 rounded-lg border border-border p-5 md:p-7">
          {order.isMock && (
            <p className="mb-5 text-sm text-amber-800">
              Mock tracking data — no real shipment is being tracked.
            </p>
          )}

          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Order</p>
              <p className="mt-1 break-all font-medium">{order.orderId}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Current status</p>
              <p className="mt-1 font-medium">{order.currentStatus}</p>
            </div>
          </div>

          <h2 className="mt-8 text-lg font-medium">Tracking history</h2>

          <ol className="mt-5 space-y-6">
            {order.trackingEvents.map((event, index) => (
              <li key={`${event.trackingId}-${index}`} className="flex gap-4">
                <span className="mt-1 size-3 shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="font-medium">{event.status}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {event.location || "Location not provided"}
                  </p>
                  {event.remarks && (
                    <p className="mt-1 text-sm">{event.remarks}</p>
                  )}
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(event.updatedAt).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <Link to="/shop" className="mt-8 inline-block text-sm underline underline-offset-4">
        Return to shop
      </Link>
    </main>
  );
}
