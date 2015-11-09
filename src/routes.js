import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import VendorLoginPage from './pages/VendorLoginPage';
import VendorLogoutPage from './pages/VendorLogoutPage';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='shop' component={ShopPage} />
    <Route path='cart' component={CartPage} />
    <Route path='payment' component={PaymentPage} />
    <Route path='vendor/login' component={VendorLoginPage} />
    <Route path='vendor/logout' component={VendorLogoutPage} />
  </Route>
);
