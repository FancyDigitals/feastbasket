import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";

import Header from "./components/layout/Header";

import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/ProfilePage";
import Wishlist from "./pages/Wishlist";
import SearchResults from "./pages/SearchResults";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-white">

            <Header />

            <main className="flex-1">
              <Routes>

                {/* HOME */}
                <Route path="/" element={<Home />} />

                {/* PRODUCTS */}
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:slug" element={<ProductDetail />} />

                {/* CATEGORIES */}
                <Route path="/category/:slug" element={<CategoryPage />} />

                {/* CART + CHECKOUT */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />

                {/* USER */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/wishlist" element={<Wishlist />} />

                {/* SEARCH */}
                <Route path="/search" element={<SearchResults />} />

                {/* AUTH */}
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />

                {/* FALLBACK */}
                <Route path="*" element={<NotFound />} />

              </Routes>
            </main>

          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;