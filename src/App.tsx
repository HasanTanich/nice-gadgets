import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Header } from "./components";
import { CartProvider, FavoritesProvider } from "./core/ContextProviders";
import { Cart, Favorites, Homepage, NotFound, ProductPage } from "./pages";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <FavoritesProvider>
          <Routes>
            <Route element={<Header />}>
              <Route index element={<Homepage />} />

              <Route path="/:product" element={<ProductPage />}>
                <Route path=":productId" element={<ProductPage />} />
              </Route>

              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<Favorites />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </FavoritesProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
