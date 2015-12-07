import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import OrderPlaced from './pages/OrderPlaced';
import VendorLoginPage from './pages/VendorLoginPage/VendorLoginPage';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='shop' component={ShopPage} />
    <Route path='cart' component={CartPage} />
    <Route path='orderplaced' component={OrderPlaced} />
    <Route path='vendor/login' component={VendorLoginPage} />
  </Route>
);
