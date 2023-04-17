import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.scss';

import { Homepage, NotFound, Favorites, Cart, ProductPage } from './pages';
import { Header } from './components';

const queryClient = new QueryClient();

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Header/>}>
          <Route index element={<Homepage />}/>

          <Route path="/:product" element={<ProductPage />}>
            <Route path=':productId' element={<ProductPage />}/>
          </Route>

          <Route path="/cart" element={<Cart />}/>
          <Route path="/favorites" element={<Favorites />}/>

        </Route>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
