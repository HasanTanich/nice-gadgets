import { Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import './App.scss';

import { Homepage, NotFound, Favorites, Cart, ProductDetailsPage, ProductPage } from './pages';
import { Header} from './components';

const queryClient = new QueryClient();

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Header/>}>
          <Route index element={<Homepage />}/>

          <Route path="/:product" element={<ProductPage />}>
            <Route path=':productId' element={<ProductDetailsPage />}/>
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
