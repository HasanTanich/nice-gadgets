import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import './App.scss';

import { Homepage, Phones, Tablets, Accessories, NotFound, Favorites, Cart } from './pages';
import { Header} from './components';

const queryClient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Header/>}>
            <Route index element={<Homepage />}/>
            <Route path="/phones" element={<Phones />}/>
            <Route path="/tablets" element={<Tablets />}/>
            <Route path="/accessories" element={<Accessories />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/favorites" element={<Favorites />}/>
          </Route>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
