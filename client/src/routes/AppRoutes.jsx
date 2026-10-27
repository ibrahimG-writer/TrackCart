
import { Routes, Route } from "react-router-dom";

import {
  Hero,
  Marquee,
  ProductShowcase,
  Collections,
  Newsletter,
} from "../components/sections";

import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderConfirmation from "../pages/OrderConfirmation";
import TrackOrder from "../pages/TrackOrder";

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ProductShowcase />
      <Collections />
      <Newsletter />
    </>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/bag" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route
        path="/order-confirmation/:orderId"
        element={<OrderConfirmation />}
      />
      <Route path="/track-order" element={<TrackOrder />} />
      <Route
        path="*"
        element={<div className="px-6 py-20 text-center">404 — Page not found</div>}
      />
    </Routes>
  );
}
