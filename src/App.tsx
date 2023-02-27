import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import './App.scss';

import { Homepage, Phones, Tablets, Accessories, NotFound, Favorites, Cart } from './pages';
import { Header} from './components';

const queryClient = new QueryClient();

function App() {

  const [screenSize, setScreenSize] = useState(0);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Header screenSize={screenSize}/>}>
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
