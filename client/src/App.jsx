
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Header } from "./components/layout";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />

        <div aria-hidden="true" className="h-[104px]" />

        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
