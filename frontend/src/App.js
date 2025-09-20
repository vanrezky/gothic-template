import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderListPage from "./pages/OrderListPage";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <div className="App min-h-screen bg-gray-950 text-gray-100">
      <CartProvider>
        <BrowserRouter>
          <Header />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductListPage />} />
              <Route path="/products/:category" element={<ProductListPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrderListPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;