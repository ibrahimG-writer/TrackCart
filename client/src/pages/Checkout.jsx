
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { orderRepository } from "../services/orderRepository";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  stateProvince: "",
  postalCode: "",
  country: "Pakistan",
};

// Frontend validation rules. The backend must validate these again.
const validators = {
  name(value) {
    const v = value.trim();

    if (!v) return "Please enter your full name.";
    if (v.length < 2) return "Name must contain at least 2 characters.";
    if (v.length > 100) return "Name cannot exceed 100 characters.";
    if (!/^[\p{L}\p{M}][\p{L}\p{M}\s'.’-]*$/u.test(v)) {
      return "Use letters, spaces, apostrophes or hyphens only.";
    }
    if (!/[\p{L}\p{M}]/u.test(v)) {
      return "Please enter a valid name.";
    }

    return "";
  },

  email(value) {
    const v = value.trim();

    if (!v) return "Please enter your email address.";
    if (v.length > 254) return "Email address is too long.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      return "Enter a valid email, e.g. name@example.com.";
    }

    return "";
  },

  phone(value) {
    const v = value.trim();

    if (!v) return "Please enter your phone number.";

    // Accept Pakistani mobile formats:
    // 03001234567, +923001234567, 923001234567
    const normalized = v.replace(/[\s()-]/g, "");

    if (!/^(?:03\d{9}|\+923\d{9}|923\d{9})$/.test(normalized)) {
      return "Enter a valid Pakistan mobile number, e.g. 03001234567 or +923001234567.";
    }

    return "";
  },

  addressLine1(value) {
    const v = value.trim();

    if (!v) return "Please enter your street address.";
    if (v.length < 5) return "Please enter a more complete address.";
    if (v.length > 200) return "Address cannot exceed 200 characters.";
    if (!/[\p{L}\p{N}]/u.test(v)) {
      return "Address must include letters or numbers.";
    }
    if (/[<>]/.test(v)) return "Please remove invalid characters.";

    return "";
  },

  addressLine2(value) {
    const v = value.trim();

    if (v.length > 200) return "Additional address cannot exceed 200 characters.";
    if (/[<>]/.test(v)) return "Please remove invalid characters.";

    return "";
  },

  city(value) {
    const v = value.trim();

    if (!v) return "Please enter your city.";
    if (v.length < 2) return "City name must contain at least 2 characters.";
    if (v.length > 100) return "City name is too long.";
    if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u.test(v)) {
      return "Enter a valid city name.";
    }

    return "";
  },

  stateProvince(value) {
    const v = value.trim();

    if (!v) return "Please enter your province or region.";
    if (v.length < 2) return "Please enter a valid province or region.";
    if (v.length > 100) return "Province or region is too long.";
    if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u.test(v)) {
      return "Enter a valid province or region.";
    }

    return "";
  },

  postalCode(value) {
    const v = value.trim();

    // Optional, but validate when supplied.
    if (!v) return "";
    if (v.length > 20) return "Postal code cannot exceed 20 characters.";
    if (!/^[\p{L}\p{N}\s-]+$/u.test(v)) {
      return "Use letters, numbers, spaces or hyphens only.";
    }

    return "";
  },

  country(value) {
    const v = value.trim();

    if (!v) return "Please enter your country.";
    if (v.length < 2) return "Please enter a valid country.";
    if (v.length > 100) return "Country name is too long.";
    if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u.test(v)) {
      return "Enter a valid country name.";
    }

    return "";
  },
};

const requiredFields = [
  "name",
  "email",
  "phone",
  "addressLine1",
  "city",
  "stateProvince",
  "country",
];

const inputClass =
  "mt-1 w-full rounded-md border border-border bg-card px-3 py-3 text-sm outline-none transition-colors focus:border-primary";

function Field({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  className = "",
  ...inputProps
}) {
  const errorId = `${name}-error`;

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-red-700">*</span>}
      </label>

      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`${inputClass} ${
          error ? "border-red-600 focus:border-red-600" : ""
        }`}
        {...inputProps}
      />

      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(() => {
    const result = {};

    for (const [field, validate] of Object.entries(validators)) {
      result[field] = validate(form[field] ?? "");
    }

    return result;
  }, [form]);

  const formIsValid =
    requiredFields.every((field) => !errors[field]) &&
    !errors.addressLine2 &&
    !errors.postalCode;

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const touchField = (event) => {
    setTouched((current) => ({
      ...current,
      [event.target.name]: true,
    }));
  };

  const showError = (field) =>
    (touched[field] || submitted) ? errors[field] : "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    setError("");

    if (submitting) return;

    if (!items.length) {
      setError("Your shopping bag is empty.");
      return;
    }

    const firstInvalidField = [
      ...requiredFields,
      "addressLine2",
      "postalCode",
    ].find((field) => errors[field]);

    if (firstInvalidField || !formIsValid) {
      setTouched((current) => ({
        ...current,
        ...Object.fromEntries(
          Object.keys(validators).map((field) => [field, true])
        ),
      }));

      document.getElementById(firstInvalidField)?.focus();
      setError("Please correct the highlighted fields before continuing.");
      return;
    }

    setSubmitting(true);

    try {
      const order = await orderRepository.createOrder({
        customer: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          addressLine1: form.addressLine1.trim(),
          addressLine2: form.addressLine2.trim(),
          city: form.city.trim(),
          stateProvince: form.stateProvince.trim(),
          postalCode: form.postalCode.trim(),
          country: form.country.trim(),
        },
        items,
      });

      if (!order?.orderId) {
        throw new Error("Order confirmation could not be created.");
      }

      clearCart();

      navigate(
        `/order-confirmation/${encodeURIComponent(order.orderId)}`
      );
    } catch (err) {
      setError(
        err.message || "We couldn't place your order. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!items.length) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-3xl font-medium">Your bag is empty</h1>
        <p className="mt-3 text-muted-foreground">
          Add some products before checking out.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-md bg-primary px-5 py-3 text-primary-foreground"
        >
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        TRIZIP · Checkout
      </p>

      <h1 className="mt-3 text-3xl font-medium md:text-4xl">
        Delivery information
      </h1>

      <p className="mt-3 text-sm text-muted-foreground">
        Fields marked with * are required.
      </p>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="mt-10 grid items-start gap-10 lg:grid-cols-[1.4fr_0.8fr]"
      >
        <div className="space-y-9">
          <section>
            <h2 className="text-xl font-medium">
              Customer information
            </h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field
                label="Full name"
                name="name"
                value={form.name}
                onChange={updateField}
                onBlur={touchField}
                error={showError("name")}
                autoComplete="name"
                maxLength={100}
                required
              />

              <Field
                label="Email address"
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                onBlur={touchField}
                error={showError("email")}
                autoComplete="email"
                maxLength={254}
                required
              />

              <Field
                label="Phone number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={updateField}
                onBlur={touchField}
                error={showError("phone")}
                autoComplete="tel"
                placeholder="03001234567"
                maxLength={20}
                required
                className="sm:col-span-2"
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium">Shipping address</h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field
                label="Street address"
                name="addressLine1"
                value={form.addressLine1}
                onChange={updateField}
                onBlur={touchField}
                error={showError("addressLine1")}
                autoComplete="address-line1"
                maxLength={200}
                placeholder="House number, street, area"
                required
                className="sm:col-span-2"
              />

              <Field
                label="Apartment, floor or additional details"
                name="addressLine2"
                value={form.addressLine2}
                onChange={updateField}
                onBlur={touchField}
                error={showError("addressLine2")}
                autoComplete="address-line2"
                maxLength={200}
                className="sm:col-span-2"
              />

              <Field
                label="City"
                name="city"
                value={form.city}
                onChange={updateField}
                onBlur={touchField}
                error={showError("city")}
                autoComplete="address-level2"
                maxLength={100}
                required
              />

              <Field
                label="Province / region"
                name="stateProvince"
                value={form.stateProvince}
                onChange={updateField}
                onBlur={touchField}
                error={showError("stateProvince")}
                autoComplete="address-level1"
                maxLength={100}
                required
              />

              <Field
                label="Postal code"
                name="postalCode"
                value={form.postalCode}
                onChange={updateField}
                onBlur={touchField}
                error={showError("postalCode")}
                autoComplete="postal-code"
                maxLength={20}
              />

              <Field
                label="Country"
                name="country"
                value={form.country}
                onChange={updateField}
                onBlur={touchField}
                error={showError("country")}
                autoComplete="country-name"
                maxLength={100}
                required
              />
            </div>
          </section>

          {error && (
            <p
              role="alert"
              className="rounded-md border border-red-300 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <p className="text-xs leading-5 text-muted-foreground">
            Testing mode: this creates a local mock order only. No payment
            is taken and no real shipment is scheduled.
          </p>

          <button
            type="submit"
            disabled={submitting || !formIsValid}
            className="w-full rounded-md bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {submitting ? "Placing test order..." : "Place test order"}
          </button>

          {!formIsValid && (
            <p className="text-xs text-muted-foreground">
              Complete all required fields correctly to enable checkout.
            </p>
          )}
        </div>

        <aside className="h-fit rounded-lg border border-border p-5 md:p-6">
          <h2 className="text-xl font-medium">Order summary</h2>

          <div className="mt-5 space-y-4">
            {items.map((item) => (
              <div
                key={item.key}
                className="flex justify-between gap-4 text-sm"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="mt-1 text-muted-foreground">
                    Qty: {item.quantity}
                    {item.size ? ` · Size ${item.size}` : ""}
                    {item.color ? ` · ${item.color}` : ""}
                  </p>
                </div>

                <p className="shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-right">
                Calculated when backend rules are available
              </span>
            </div>

            <div className="flex justify-between border-t border-border pt-4 text-base font-medium">
              <span>Mock total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </form>
    </main>
  );
}
