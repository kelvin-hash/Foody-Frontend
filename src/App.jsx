import React from 'react';
import Home from './pages/home';
import RestaurantDetails from './pages/restaurantDetails';
import Restaurant from './pages/restaurants';
import Checkout from './pages/checkout';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import { Cartprovider } from './context/cartContext';
import { AuthProvider } from './context/AuthContext';
import { RestaurantProvider } from './context/restaurantContext';
function App() {
  return (
    <AuthProvider>
      <RestaurantProvider>
        <Cartprovider>
          <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/restaurant' element={<Restaurant />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/restaurant/:id' element={<RestaurantDetails />} />
          </Routes>
        </BrowserRouter>
      </Cartprovider>
      </RestaurantProvider>
    </AuthProvider>
  );
}
export default App;